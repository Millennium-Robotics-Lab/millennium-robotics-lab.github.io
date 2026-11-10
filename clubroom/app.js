(() => {
 'use strict';
 const categories = ['videos', 'games', 'tools', 'about'];
 const panel = document.querySelector('#panel');
 const portfolio = document.querySelector('#portfolio');
 const content = document.querySelector('#panel-content');
 const closeButton = document.querySelector('#close-panel');
 const languageButton = document.querySelector('#language');
 const scene = document.querySelector('#scene');
 const image = document.querySelector('#room-image');
 const fallback = document.querySelector('#room-fallback');
 const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
 let panelEntrance = null;
 function clearEntrance() {
  panelEntrance?.cancel();
  panelEntrance = null;
 }
 const sections = Object.fromEntries(categories.map(id => [id, document.getElementById(id)]));
 let language = 'en', imageFailed = false, current = null, returnFocus = null, localEntry = false;
 try { language = localStorage.getItem('mrl-language') === 'zh' ? 'zh' : 'en'; } catch { /* Storage is optional. */ }
 const text = key => window.MRL_COPY[language][key];
 const localized = value => typeof value === 'string' ? value : value?.[language] || value?.en || '';
 function safeURL(value, media = false) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
   const url = new URL(value, location.href);
   if (url.protocol !== 'https:' && !(url.origin === location.origin && url.protocol === location.protocol)) return null;
   if (media && url.origin !== location.origin) return null;
   return url;
  } catch { return null; }
 }
 function renderProjects() {
  document.querySelectorAll('[data-projects]').forEach(container => {
   container.replaceChildren();
   const projects = window.MRL_DATA.projects[container.dataset.projects] || [];
   projects.forEach(project => {
    const article = document.createElement('article'); article.className = 'project-entry';
    const heading = document.createElement('h3'); heading.textContent = localized(project.title); article.append(heading);
    const description = document.createElement('p'); description.textContent = localized(project.description); article.append(description);
    if (project.status !== 'published') { const label = document.createElement('p'); label.className = 'development'; label.textContent = text('development'); article.append(label); }
    const url = safeURL(project.url);
    if (url) { const link = document.createElement('a'); link.href = url.href; link.textContent = text('projectLink') + ' ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', localized(project.title) + ', ' + text('newTab')); article.append(link); }
    const media = safeURL(project.image, true);
    if (media) {
     const load = document.createElement('button'); load.className = 'language'; load.textContent = text('media');
     load.addEventListener('click', () => {
      const img = document.createElement('img'); img.alt = localized(project.imageAlt) || localized(project.title); img.decoding = 'async';
      load.textContent = text('imageLoading'); load.disabled = true;
      img.onload = () => load.replaceWith(img);
      img.onerror = () => { load.textContent = text('imageError'); load.disabled = false; };
      img.src = media.href;
     }); article.append(load);
    }
    container.append(article);
   });
  });
 }
 function applyLanguage() {
  document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
  document.querySelectorAll('[data-copy]').forEach(node => { if (text(node.dataset.copy)) node.textContent = text(node.dataset.copy); });
  document.querySelectorAll('[data-copy-aria]').forEach(node => node.setAttribute('aria-label', text(node.dataset.copyAria)));
  document.querySelectorAll('[data-copy-alt]').forEach(node => { node.alt = text(node.dataset.copyAlt); });
  languageButton.textContent = language === 'en' ? '中文' : 'English';
  languageButton.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
  document.querySelectorAll('[data-links]').forEach(container => {
   container.replaceChildren();
   for (const key of window.MRL_DATA.categories[container.dataset.links]) {
    const item = window.MRL_DATA.links[key], url = safeURL(item.url); if (!url) continue;
    const link = document.createElement('a'); link.href = url.href; link.textContent = item.label + ' ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', item.label + ', ' + text('newTab')); container.append(link);
   }
  });
  renderProjects(); updateArtwork();
 }
 function updateArtwork() {
  scene.classList.toggle('artwork-unavailable', imageFailed);
  fallback.hidden = !imageFailed;
 }
 function failImage() { imageFailed = true; updateArtwork(); }
 image.addEventListener('error', failImage);
 if (image.complete && !image.naturalWidth) failImage();
 languageButton.addEventListener('click', () => { language = language === 'en' ? 'zh' : 'en'; try { localStorage.setItem('mrl-language', language); } catch { /* Storage is optional. */ } applyLanguage(); });
 function categoryFromHash() { const key = location.hash.slice(1); return categories.includes(key) ? key : null; }
 function hidePanel() {
  if (!current) return;
  clearEntrance();
  const section = sections[current]; section.hidden = false; portfolio.append(section);
  current = null; if (panel.open) panel.close(); document.body.classList.remove('modal-open');
  document.querySelectorAll('[data-category]').forEach(link => link.removeAttribute('aria-current'));
  const target = returnFocus?.isConnected ? returnFocus : document.querySelector('nav a'); target.focus({ preventScroll: true });
 }
 function showPanel(category) {
  if (!category) { hidePanel(); return; }
  if (current && current !== category) portfolio.append(sections[current]);
  current = category; content.replaceChildren(sections[category]);
  panel.setAttribute('aria-labelledby', category + '-title');
  document.querySelectorAll('[data-category]').forEach(link => { if (link.dataset.category === category) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  if (!panel.open) {
   clearEntrance();
   panel.showModal();
   if (!reducedMotion.matches && typeof panel.animate === 'function') {
    panelEntrance = panel.animate([
     { opacity: 0, transform: 'translateY(8px) scale(.96)' },
     { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], { duration: 220, easing: 'cubic-bezier(.23, 1, .32, 1)' });
    // Use the document clock so the entrance starts with the open action.
    panelEntrance.startTime = document.timeline.currentTime;
   }
  }
  panel.scrollTop = 0; document.body.classList.add('modal-open'); closeButton.focus({ preventScroll: true });
 }
 function requestClose() {
  if (!current) return;
  if (localEntry) { localEntry = false; history.back(); }
  else { history.replaceState(null, '', location.pathname + location.search); hidePanel(); }
 }
 if (typeof panel.showModal === 'function') {
  document.documentElement.classList.add('js');
  document.querySelectorAll('[data-category]').forEach(link => link.addEventListener('click', event => {
   if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault(); returnFocus = link;
   if (!current) { history.pushState(null, '', '#' + link.dataset.category); localEntry = true; }
   else history.replaceState(null, '', '#' + link.dataset.category);
   showPanel(link.dataset.category);
  }));
  closeButton.addEventListener('click', requestClose);
  document.querySelector('#return-room').addEventListener('click', event => { event.preventDefault(); requestClose(); });
  panel.addEventListener('cancel', event => { event.preventDefault(); requestClose(); });
  panel.addEventListener('click', event => { if (event.target === panel) { const box = panel.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) requestClose(); } });
  // Native dialog makes the page behind it inert. Wrap Tab at the panel edges.
  panel.addEventListener('keydown', event => {
   if (event.key !== 'Tab') return;
   const items = [...panel.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(node => node.getClientRects().length);
   const first = items[0], last = items[items.length - 1];
   if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
   else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  addEventListener('popstate', () => { localEntry = false; showPanel(categoryFromHash()); });
  addEventListener('hashchange', () => showPanel(categoryFromHash()));
  document.querySelector('.skip').addEventListener('click', event => { event.preventDefault(); returnFocus = document.querySelector('.skip'); history.pushState(null, '', '#videos'); localEntry = true; showPanel('videos'); });
  showPanel(categoryFromHash());
 }
 // There is no render loop, autoplay, or audio. Hidden pages do no scene work.
 function visibility() { scene.classList.toggle('page-hidden', document.hidden); }
 document.addEventListener('visibilitychange', visibility); visibility();
 function motion() { document.documentElement.classList.toggle('reduced-motion', reducedMotion.matches); if (reducedMotion.matches) clearEntrance(); }
 reducedMotion.addEventListener('change', motion); motion();
 languageButton.hidden = false; applyLanguage();
})();
