(() => {
  'use strict';
  const copy = {
    en: { title: 'Videos', channel: 'YouTube', channelLink: 'Open channel', load: 'Load video', retry: 'Retry player', loading: 'Loading player…', slow: 'Still loading. You can wait or watch on YouTube.', failed: 'Player unavailable. You can watch on YouTube.', watch: 'Watch on YouTube', back: 'Back to the clubroom' },
    zh: { title: '视频', channel: '哔哩哔哩', channelLink: '打开主页', load: '加载视频', retry: '重试播放器', loading: '正在加载播放器…', slow: '仍在加载。可以继续等待，或前往哔哩哔哩观看。', failed: '播放器暂时无法加载。可前往哔哩哔哩观看。', watch: '在哔哩哔哩观看', back: '返回部室' }
  };
  const sessions = new WeakMap();
  let youtubeAPI = null, cancelYouTube = null;
  function loadYouTube() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (youtubeAPI) return youtubeAPI;
    youtubeAPI = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const previous = window.onYouTubeIframeAPIReady;
      let settled = false;
      cancelYouTube = () => finish(new Error('Player load restarted'));
      function finish(error) {
        if (settled) return;
        settled = true; cancelYouTube = null;
        if (window.onYouTubeIframeAPIReady === ready) window.onYouTubeIframeAPIReady = previous;
        if (error) { script.remove(); youtubeAPI = null; reject(error); }
        else resolve(window.YT);
      }
      function ready() {
        try { previous?.(); } finally { finish(window.YT?.Player ? null : new Error('Player API unavailable')); }
      }
      window.onYouTubeIframeAPIReady = ready;
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => finish(new Error('Player API blocked'));
      document.head.append(script);
    });
    return youtubeAPI;
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
    const session = sessions.get(section);
    if (session) {
      session.cancelled = true; clearTimeout(session.timer);
      session.api?.destroy(); sessions.delete(section);
    }
    section.querySelectorAll('.videos-host, iframe').forEach(frame => frame.remove());
    const area = section.querySelector('.videos-player');
    if (area) area.dataset.state = 'idle';
    const button = section.querySelector('.videos-load');
    if (button) { button.disabled = false; button.hidden = false; }
    const status = section.querySelector('[role="status"]');
    if (status) status.textContent = '';
  }
  function startYouTube(section, area, video, text) {
    onClose(section);
    if (!window.YT?.Player) cancelYouTube?.();
    const button = area.querySelector('.videos-load');
    const status = section.querySelector('[role="status"]');
    const session = { cancelled: false, api: null, timer: null };
    sessions.set(section, session);
    delete area.dataset.error;
    area.dataset.state = 'loading'; button.disabled = true; status.textContent = text.loading;
    function fail(error) {
      if (session.cancelled) return;
      onClose(section);
      area.dataset.state = 'failed';
      area.dataset.error = String(error?.data || error?.message || 'player-error');
      button.textContent = text.retry; status.textContent = text.failed;
    }
    session.timer = setTimeout(() => {
      if (session.cancelled) return;
      area.dataset.state = 'slow'; button.disabled = false;
      button.textContent = text.retry; status.textContent = text.slow;
    }, 10000);
    loadYouTube().then(YT => {
      if (session.cancelled || !area.isConnected) return;
      const host = node('div', '', 'videos-host'); area.append(host);
      session.api = new YT.Player(host, {
        host: 'https://www.youtube.com', width: '100%', height: '100%', videoId: video.id,
        playerVars: { autoplay: 0, playsinline: 1, rel: 0, origin: location.origin },
        events: {
          onReady() {
            if (session.cancelled) return;
            clearTimeout(session.timer); area.dataset.state = 'ready'; status.textContent = '';
            const focused = document.activeElement === button;
            button.hidden = true;
            const frame = area.querySelector('iframe');
            if (frame) { frame.title = video.title; frame.referrerPolicy = 'strict-origin-when-cross-origin'; if (focused) frame.focus(); }
          },
          onError: fail
        }
      });
    }).catch(fail);
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
      const player = node('div', '', 'videos-player'); player.dataset.platform = platform; player.dataset.state = 'idle';
      if (platform === 'youtube') {
        const poster = document.createElement('img'); poster.className = 'videos-poster';
        poster.dataset.source = video.poster; poster.alt = video.title; poster.width = 1280; poster.height = 720;
        const load = node('button', text.load, 'videos-load'); load.type = 'button';
        load.addEventListener('click', () => startYouTube(section, player, video, text));
        player.append(poster, load);
      }
      const status = node('p', '', 'videos-feedback'); status.setAttribute('role', 'status');
      const watch = link(video.url, text.watch + ' ↗'); watch.className = 'videos-external';
      card.append(player, status, node('p', video.title, 'videos-title'), watch);
    }
    const back = link('#', text.back); back.removeAttribute('target'); back.className = 'static-close';
    section.setAttribute('aria-labelledby', title.id); section.replaceChildren(title, card, back);
  }
  function onOpen(section, language, data) {
    const player = section.querySelector('.videos-player');
    if (!player) return;
    const video = data.featuredVideos?.[player.dataset.platform];
    if (player.dataset.platform === 'youtube') {
      const poster = player.querySelector('img[data-source]');
      if (poster && !poster.getAttribute('src')) poster.src = poster.dataset.source;
    } else if (video && !player.querySelector('iframe') && /^BV[\w]+$/.test(video.id)) {
      const frame = document.createElement('iframe'); frame.title = video.title;
      frame.allow = 'encrypted-media; fullscreen; picture-in-picture'; frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.src = 'https://player.bilibili.com/player.html?bvid=' + video.id + '&page=1&autoplay=0';
      player.append(frame);
    }
  }
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.videos = { render, onOpen, onClose };
})();
