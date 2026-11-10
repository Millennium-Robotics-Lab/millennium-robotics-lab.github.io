(() => {
  'use strict';

  const github = 'https://github.com/Millennium-Robotics-Lab';
  const copy = {
    en: {
      title: 'Tools & open source',
      intro: 'Explore our public code, creative tools, and experiments.',
      source: 'Source', download: 'Downloads & release notes', docs: 'Documentation',
      upstream: 'Upstream project', project: 'Project page', all: 'All repositories on GitHub',
      return: 'Back to the clubroom', newTab: 'opens in a new tab'
    },
    zh: {
      title: '工具与开源项目',
      intro: '查看我们的公开代码、创作工具与实验项目。',
      source: '源代码', download: '下载与发行说明', docs: '使用文档',
      upstream: '上游项目', project: '项目页面', all: '在 GitHub 查看全部仓库',
      return: '返回部室', newTab: '在新标签页打开'
    }
  };

  // Verified public sources and extension fields are documented in tools-sources.md.


  function localized(value, language) {
    if (typeof value === 'string') return value;
    if (!value || typeof value !== 'object') return '';
    const result = value[language] || value.en || value.zh;
    return typeof result === 'string' ? result : '';
  }

  function safeURL(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, location.href);
      if (url.protocol === 'https:' ||
          (url.origin === location.origin && url.protocol === location.protocol)) return url.href;
    } catch { /* Invalid content links are omitted. */ }
    return null;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function link(value, label, context, text) {
    const url = safeURL(value);
    if (!url) return null;
    const anchor = element('a', '', label + ' ↗');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', context + ': ' + label + ', ' + text.newTab);
    return anchor;
  }

  function projects(data) {
    const items = (data?.featuredTools || []).map(item => ({ ...item }));
    const additions = Array.isArray(data?.projects?.tools) ? data.projects.tools : [];
    for (const item of additions) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
      const source = safeURL(item.sourceUrl || item.url);
      const index = items.findIndex(existing =>
        (typeof item.id === 'string' && item.id === existing.id) ||
        (source && source === safeURL(existing.sourceUrl)));
      if (index >= 0) items[index] = { ...items[index], ...item };
      else items.push(item);
    }
    return items;
  }

  function render(section, language, data) {
    if (!section) return;
    const lang = language === 'zh' ? 'zh' : 'en';
    const text = copy[lang];
    const fragment = document.createDocumentFragment();
    fragment.append(element('h2', '', text.title));
    fragment.firstChild.id = 'tools-title';
    fragment.append(element('p', 'tools-intro', text.intro));
    const list = element('div', 'tools-list');
    for (const project of projects(data)) {
      const title = localized(project.title, lang);
      if (!title) continue;
      const article = element('article', 'tools-entry');
      article.append(element('h3', '', title));
      const description = localized(project.description, lang);
      if (description) article.append(element('p', 'tools-description', description));
      const note = localized(project.note, lang);
      if (note) article.append(element('p', 'tools-note', note));
      const actions = element('div', 'tools-actions');
      const urls = new Set();
      for (const [field, label] of [
        ['sourceUrl', text.source], ['downloadUrl', text.download],
        ['documentationUrl', text.docs], ['upstreamUrl', text.upstream], ['url', text.project]
      ]) {
        const anchor = link(project[field], label, title, text);
        if (anchor && !urls.has(anchor.href)) {
          urls.add(anchor.href);
          actions.append(anchor);
        }
      }
      if (actions.childElementCount) article.append(actions);
      list.append(article);
    }
    fragment.append(list);
    const all = element('p', 'tools-all');
    // Keep the verified organization link available even when supplied data is empty or invalid.
    all.append(link(github, text.all, 'GitHub', text));
    fragment.append(all);
    const close = element('a', 'static-close', text.return);
    close.href = '#';
    fragment.append(close);
    section.setAttribute('aria-labelledby', 'tools-title');
    section.replaceChildren(fragment);
  }

  const panel = { render };
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.tools = panel;
})();
