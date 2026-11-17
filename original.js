(() => {
  'use strict';
  let language = 'en';
  try { language = localStorage.getItem('mrl-language') === 'zh' ? 'zh' : 'en'; } catch { /* Storage is optional. */ }
  const button = document.querySelector('#language');
  function renderLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    document.documentElement.dataset.lang = language;
    button.textContent = language === 'zh' ? 'English' : '中文';
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    document.querySelector('.links').setAttribute('aria-label', language === 'zh' ? '社交平台' : 'Channels');
    document.querySelectorAll('.links a').forEach(link => { link.hidden = !window.MRL_LINKS.allows(link.href, language); });
  }
  button.addEventListener('click', () => {
    language = language === 'zh' ? 'en' : 'zh';
    try { localStorage.setItem('mrl-language', language); } catch { /* Storage is optional. */ }
    renderLanguage();
  });
  renderLanguage(); button.hidden = false;
})();

/* Easter egg: type "hikari" anywhere */
const hk = document.getElementById("hikari"); let buf = ""; let hikariTimer;
function hikari(){ clearTimeout(hikariTimer); hk.classList.remove("on"); hk.querySelector("span").textContent = "Hikari yo!"; void hk.offsetWidth; hk.classList.add("on"); hikariTimer = setTimeout(() => { hk.classList.remove("on"); hk.querySelector("span").textContent = ""; }, 1900); }
window.addEventListener("keydown", e => { if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return; buf = (buf + e.key.toLowerCase()).slice(-6); if (buf === "hikari") hikari(); });
