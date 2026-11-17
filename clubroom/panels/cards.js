(() => {
  'use strict';
  const localized = (value, language) => typeof value === 'string' ? value : value?.[language] || value?.en || '';
  function url(value, media = false) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const parsed = new URL(value, location.href);
      if (media) return parsed.origin === location.origin ? parsed.href : null;
      return parsed.protocol === 'https:' || parsed.origin === location.origin ? parsed.href : null;
    } catch { return null; }
  }
  function node(tag, text, className) {
    const result = document.createElement(tag);
    if (text) result.textContent = text;
    if (className) result.className = className;
    return result;
  }
  function external(href, label, title, language) {
    const anchor = node('a', label);
    anchor.href = href; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', title + ': ' + label + ', ' + (language === 'zh' ? '在新标签页打开' : 'opens in a new tab'));
    return anchor;
  }
  function render(section, language, title, items) {
    const heading = node('h2', title); heading.id = section.id + '-title';
    const list = node('div', '', 'mrl-card-list');
    for (const item of items) {
      const name = localized(item.title, language);
      if (!name) continue;
      const links = (item.links || []).map(link => ({ href: url(localized(link.url, language)), label: localized(link.label, language) })).filter(link => link.href && link.label && window.MRL_LINKS.allows(link.href, language));
      const card = node('article', '', 'mrl-card');
      const media = url(localized(item.image, language), true);
      if (media) {
        const preferred = url(localized(item.url, language));
        const primary = preferred && window.MRL_LINKS.allows(preferred, language) ? preferred : links[0]?.href;
        const visual = primary ? external(primary, '', name, language) : node('div');
        visual.className = 'mrl-card-visual';
        if (primary) visual.setAttribute('aria-label', name + ', ' + (language === 'zh' ? '打开作品，在新标签页打开' : 'open project in a new tab'));
        const image = document.createElement('img');
        image.dataset.source = localized(item.image, language);
        image.alt = localized(item.imageAlt, language) || name;
        image.width = 640; image.height = 360; image.decoding = 'async'; image.loading = 'lazy';
        visual.append(image); card.append(visual);
      }
      const body = node('div', '', 'mrl-card-body');
      body.append(node('h3', name));
      for (const [field, className] of [['description', 'mrl-card-description'], ['note', 'mrl-card-note']]) {
        const text = localized(item[field], language);
        if (text) body.append(node('p', text, className));
      }
      const actions = node('div', '', 'mrl-card-links');
      for (const link of links) actions.append(external(link.href, link.label + ' ↗', name, language));
      body.append(actions); card.append(body); list.append(card);
    }
    const back = node('a', language === 'zh' ? '返回部室' : 'Back to the clubroom', 'static-close'); back.href = '#';
    section.setAttribute('aria-labelledby', heading.id); section.replaceChildren(heading, list, back);
  }
  function onOpen(section) {
    section.querySelectorAll('.mrl-card img[data-source]').forEach(image => {
      if (!image.getAttribute('src')) image.src = image.dataset.source;
    });
  }
  window.MRL_CARDS = { render, onOpen };
})();
