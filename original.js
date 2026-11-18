(() => {
  'use strict';
  let language = window.MRL_LANGUAGE.saved();
  const button = document.querySelector('#language');
  function renderLanguage() {
    window.MRL_LANGUAGE.apply(language);
    document.title = language === 'ja' ? 'Millennium Robotics Lab // ミレニアムロボット部' : 'Millennium Robotics Lab // 千禧年机器人部';
    window.MRL_LANGUAGE.button(button, language);
    document.querySelector('.links').setAttribute('aria-label', language === 'zh' ? '社交平台' : language === 'ja' ? '公式アカウント' : 'Channels');
    const subtitle = document.querySelector('[data-i18n="subtitle"]');
    subtitle.textContent = language === 'ja' ? 'ミレニアムロボット部' : '千禧年机器人部';
    subtitle.lang = language === 'ja' ? 'ja' : 'zh-Hans';
    const newTab = language === 'ja' ? '新しいタブで開く' : language === 'zh' ? '在新标签页打开' : 'opens in a new tab';
    document.querySelectorAll('.links a').forEach(link => {
      link.hidden = !window.MRL_LINKS.allows(link.href, language);
      link.setAttribute('aria-label', link.textContent.replace(/[▶]/g, '').trim() + ', ' + newTab);
    });
  }
  button.addEventListener('click', () => {
    language = window.MRL_LANGUAGE.next(language);
    window.MRL_LANGUAGE.save(language);
    renderLanguage();
  });
  renderLanguage(); button.hidden = false;
})();

/* Easter egg: type "hikari" anywhere */
const hk = document.getElementById("hikari"); let buf = ""; let hikariTimer;
function hikari(){ clearTimeout(hikariTimer); hk.classList.remove("on"); hk.querySelector("span").textContent = "Hikari yo!"; void hk.offsetWidth; hk.classList.add("on"); hikariTimer = setTimeout(() => { hk.classList.remove("on"); hk.querySelector("span").textContent = ""; }, 1900); }
window.addEventListener("keydown", e => { if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return; buf = (buf + e.key.toLowerCase()).slice(-6); if (buf === "hikari") hikari(); });
