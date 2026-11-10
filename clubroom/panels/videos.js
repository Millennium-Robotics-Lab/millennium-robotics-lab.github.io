(() => {
  'use strict';
  const copy = {
    en: { title: 'Videos', channel: 'YouTube', channelLink: 'Open channel', watch: 'Watch on YouTube', back: 'Back to the clubroom' },
    zh: { title: '视频', channel: '哔哩哔哩', channelLink: '打开主页', watch: '在哔哩哔哩观看', back: '返回部室' }
  };
  const connected = new Set();
  function prepare(language) {
    if (language === 'zh') return;
    for (const origin of ['https://www.youtube.com', 'https://i.ytimg.com']) {
      if (connected.has(origin)) continue;
      const hint = document.createElement('link');
      hint.rel = 'preconnect'; hint.href = origin;
      document.head.append(hint); connected.add(origin);
    }
  }
  function node(tag, text, className) {
    const result = document.createElement(tag);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }
  function link(url, label) {
    const result = node('a', label);
    result.href = url; result.target = '_blank'; result.rel = 'noopener noreferrer';
    return result;
  }
  function onClose(section) {
    section.querySelectorAll('iframe').forEach(frame => frame.remove());
  }
  function render(section, language, data) {
    onClose(section);
    const lang = language === 'zh' ? 'zh' : 'en', text = copy[lang];
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
      const player = node('div', '', 'videos-player'); player.dataset.platform = platform;
      const watch = link(video.url, text.watch + ' ↗'); watch.className = 'videos-external';
      card.append(player, node('p', video.title, 'videos-title'), watch);
    }
    const back = link('#', text.back); back.removeAttribute('target'); back.className = 'static-close';
    section.setAttribute('aria-labelledby', title.id); section.replaceChildren(title, card, back);
  }
  function onOpen(section, language, data) {
    const player = section.querySelector('.videos-player');
    if (!player || player.querySelector('iframe')) return;
    const platform = player.dataset.platform;
    const video = data.featuredVideos?.[platform];
    if (!video) return;
    let source;
    if (platform === 'youtube' && /^[\w-]{11}$/.test(video.id)) {
      source = new URL('https://www.youtube.com/embed/' + video.id);
      source.search = new URLSearchParams({ autoplay: '0', playsinline: '1', rel: '0', enablejsapi: '1', origin: location.origin });
    } else if (platform === 'bilibili' && /^BV[\w]+$/.test(video.id)) {
      source = new URL('https://player.bilibili.com/player.html');
      source.search = new URLSearchParams({ bvid: video.id, page: '1', autoplay: '0' });
    } else return;
    const frame = document.createElement('iframe');
    frame.title = video.title;
    frame.width = 560; frame.height = 315;
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.loading = 'eager';
    frame.src = source.href;
    player.append(frame);
  }
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.videos = { render, prepare, onOpen, onClose };
})();
