(() => {
  'use strict';
  const copy = {
    en: { title: 'Videos', channel: 'YouTube', channelLink: 'Open channel', play: 'Featured YouTube video', watch: 'Watch on YouTube', back: 'Back to the clubroom' },
    zh: { title: '视频', channel: '哔哩哔哩', channelLink: '打开主页', play: '哔哩哔哩精选视频', watch: '在哔哩哔哩观看', back: '返回部室' }
  };
  function node(tag, text, className) {
    const result = document.createElement(tag);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }
  function link(url, label) {
    const result = node('a', label);
    result.href = url;
    result.target = '_blank';
    result.rel = 'noopener noreferrer';
    return result;
  }
  function render(section, language, data) {
    const lang = language === 'zh' ? 'zh' : 'en';
    const text = copy[lang];
    const platform = lang === 'zh' ? 'bilibili' : 'youtube';
    const video = data.featuredVideos?.[platform];
    const title = node('h2', text.title); title.id = 'videos-title';
    const card = node('article', '', 'videos-card');
    const header = node('div', '', 'videos-card-header');
    const icon = document.createElement('img');
    icon.src = 'assets/' + platform + '.svg'; icon.alt = ''; icon.width = 28; icon.height = 28;
    header.append(icon, node('h3', text.channel), link(data.links[platform].url, text.channelLink + ' ↗'));
    card.append(header);
    if (video) {
      const player = node('div', '', 'videos-player' + (video.format === 'short' ? ' videos-short' : ''));
      player.dataset.platform = platform;
      player.setAttribute('aria-label', text.play);
      card.append(player, link(video.url, video.title + ' ↗'));
    }
    const back = link('#', text.back); back.removeAttribute('target'); back.className = 'static-close';
    section.setAttribute('aria-labelledby', title.id);
    section.replaceChildren(title, card, back);
  }
  function onClose(section) {
    section.querySelectorAll('iframe').forEach(frame => frame.remove());
  }
  function onOpen(section, language, data) {
    const player = section.querySelector('.videos-player');
    if (!player || player.querySelector('iframe')) return;
    const platform = player.dataset.platform;
    const video = data.featuredVideos?.[platform];
    if (!video) return;
    const frame = document.createElement('iframe');
    frame.title = video.title;
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    if (platform === 'youtube' && /^[\w-]{11}$/.test(video.id)) {
      frame.src = 'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=0&playsinline=1&rel=0';
    } else if (platform === 'bilibili' && /^BV[\w]+$/.test(video.id)) {
      frame.src = 'https://player.bilibili.com/player.html?bvid=' + video.id + '&page=1&autoplay=0';
    } else return;
    player.append(frame);
  }
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.videos = { render, onOpen, onClose };
})();
