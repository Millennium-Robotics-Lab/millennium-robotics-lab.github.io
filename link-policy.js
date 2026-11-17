(function () {
  'use strict';
  const chineseSites = ['bilibili.com', 'b23.tv', 'github.com', 'github.io', 'userstyles.world'];
  const bilibiliSites = ['bilibili.com', 'bilibili.tv', 'b23.tv'];
  const matches = (host, domain) => host === domain || host.endsWith('.' + domain);
  function allows(value, language, base = globalThis.location?.href || 'https://millennium-robotics-lab.github.io/') {
    if (typeof value !== 'string' || !value.trim()) return false;
    try {
      const link = new URL(value, base), home = new URL(base);
      if (!['https:', 'http:'].includes(link.protocol)) return false;
      if (link.origin === home.origin) return true;
      if (link.protocol !== 'https:') return false;
      if (String(language).toLowerCase().split('-')[0] === 'zh') return chineseSites.some(domain => matches(link.hostname, domain));
      return !bilibiliSites.some(domain => matches(link.hostname, domain));
    } catch { return false; }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { allows };
  if (typeof window !== 'undefined') window.MRL_LINKS = { allows };
})();
