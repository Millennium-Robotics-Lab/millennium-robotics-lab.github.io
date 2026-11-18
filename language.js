(() => {
  'use strict';
  const languages = ['en', 'zh', 'ja'];
  const tags = { en: 'en', zh: 'zh-Hans', ja: 'ja' };
  const names = { en: 'English', zh: '中文', ja: '日本語' };
  const switchLabels = { en: 'Switch to English', zh: '切换到中文', ja: '日本語に切り替える' };
  function saved() {
    try {
      const value = localStorage.getItem('mrl-language');
      if (languages.includes(value)) return value;
    } catch { /* Storage is optional. */ }
    return 'en';
  }
  function apply(language) {
    document.documentElement.lang = tags[language];
    document.documentElement.dataset.lang = language;
  }
  function next(language) { return languages[(languages.indexOf(language) + 1) % languages.length]; }
  function button(node, language) {
    const target = next(language);
    node.textContent = names[target];
    node.setAttribute('aria-label', switchLabels[target]);
  }
  function save(language) {
    try { localStorage.setItem('mrl-language', language); } catch { /* Storage is optional. */ }
  }
  window.MRL_LANGUAGE = { saved, apply, next, button, save };
  apply(saved());
})();
