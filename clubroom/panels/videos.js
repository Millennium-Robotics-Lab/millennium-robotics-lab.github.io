(() => {
  'use strict';
  function render(section, language, data) {
    const zh = language === 'zh';
    const items = [...(data.projects?.videos || [])];
    const featured = data.featuredVideos?.[zh ? 'bilibili' : 'youtube'];
    if (featured) items.push({ ...featured, links: [{ label: zh ? '中文 · 哔哩哔哩' : 'JP · YouTube Short', url: featured.url }] });
    window.MRL_CARDS.render(section, language, zh ? '视频' : 'Videos', items);
  }
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.videos = { render, onOpen: section => window.MRL_CARDS.onOpen(section) };
})();
