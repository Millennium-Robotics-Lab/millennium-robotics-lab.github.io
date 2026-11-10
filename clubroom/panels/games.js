(() => {
  'use strict';

  const copy = {
    en: {
      title: 'Games', empty: 'No published game entries yet.',
      next: 'Explore our public repositories and channels in the meantime.',
      links: 'Public work and channels', project: 'View project',
      newTab: 'opens in a new tab', back: 'Back to the clubroom',
      image: 'Load project image', loading: 'Loading image…',
      imageError: 'Image unavailable. Try again',
      statuses: { published: 'Published', development: 'In development', prototype: 'Prototype', demo: 'Demo', planned: 'Planned', archived: 'Archived' }
    },
    zh: {
      title: '游戏', empty: '这里还没有已发布的游戏条目。',
      next: '可以先看看我们的公开仓库和社交平台。',
      links: '公开作品与平台', project: '查看项目',
      newTab: '在新标签页打开', back: '返回部室',
      image: '加载项目图片', loading: '正在加载图片…',
      imageError: '图片暂时无法加载，点击重试',
      statuses: { published: '已发布', development: '开发中', prototype: '原型', demo: '试玩版', planned: '计划中', archived: '已归档' }
    }
  };
  const channels = [
    ['github', 'GitHub', 'https://github.com/Millennium-Robotics-Lab'],
    ['youtube', 'YouTube', 'https://www.youtube.com/@project-arisu'],
    ['bilibili', 'Bilibili', 'https://space.bilibili.com/1161124651'],
    ['x', 'X / Twitter', 'https://x.com/projectarisu']
  ];

  function localized(value, language) {
    if (typeof value === 'string') return value.trim();
    if (!value || typeof value !== 'object') return '';
    const result = value[language] || value.en || value.zh;
    return typeof result === 'string' ? result.trim() : '';
  }

  function safeURL(value, media = false) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, location.href);
      const sameOrigin = url.origin === location.origin && url.protocol === location.protocol;
      if (url.username || url.password || (url.protocol !== 'https:' && !sameOrigin)) return null;
      if (media && !sameOrigin) return null;
      return url.href;
    } catch { return null; }
  }

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function externalLink(url, label, text) {
    const link = node('a', label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', label + ', ' + text.newTab);
    return link;
  }

  function addImage(article, project, language, text, title) {
    const url = safeURL(project.image, true);
    if (!url) return;
    const holder = node('div', '', 'games-media');
    const load = node('button', text.image, 'games-image-load');
    load.type = 'button';
    const feedback = node('span', '', 'games-media-feedback');
    feedback.setAttribute('role', 'status');
    load.setAttribute('aria-label', text.image + ': ' + title);
    load.addEventListener('click', () => {
      load.disabled = true;
      feedback.textContent = text.loading;
      const image = document.createElement('img');
      image.alt = localized(project.imageAlt, language) || title;
      image.decoding = 'async';
      image.onload = () => {
        const restoreFocus = document.activeElement === load;
        holder.append(image);
        load.remove();
        feedback.textContent = '';
        image.tabIndex = -1;
        if (restoreFocus && holder.isConnected) image.focus({ preventScroll: true });
      };
      image.onerror = () => {
        feedback.textContent = text.imageError;
        load.disabled = false;
      };
      image.src = url;
    });
    holder.append(load, feedback);
    article.append(holder);
  }

  function render(section, language, data) {
    if (!section) return;
    const lang = language === 'zh' ? 'zh' : 'en';
    const text = copy[lang];
    section.setAttribute('aria-labelledby', 'games-title');
    const heading = node('h2', text.title);
    heading.id = 'games-title';
    const fragment = document.createDocumentFragment();
    fragment.append(heading);
    const entries = Array.isArray(data?.projects?.games) ? data.projects.games : [];
    const projects = entries.filter(project => project && typeof project === 'object' && localized(project.title, lang));

    if (projects.length) {
      const list = node('div', '', 'games-projects');
      for (const project of projects) {
        const title = localized(project.title, lang);
        const article = node('article', '', 'games-project');
        article.append(node('h3', title));
        if (Object.hasOwn(text.statuses, project.status)) {
          article.append(node('p', text.statuses[project.status], 'games-status'));
        }
        const description = localized(project.description, lang);
        if (description) article.append(node('p', description));
        const url = safeURL(project.url);
        if (url) {
          const link = externalLink(url, text.project, text);
          link.setAttribute('aria-label', text.project + ': ' + title + ', ' + text.newTab);
          article.append(link);
        }
        addImage(article, project, lang, text, title);
        list.append(article);
      }
      fragment.append(list);
    } else {
      const empty = node('div', '', 'games-empty');
      empty.append(node('h3', text.empty), node('p', text.next));
      fragment.append(empty);
    }

    const links = node('div', '', 'games-links');
    links.setAttribute('role', 'group');
    links.setAttribute('aria-label', text.links);
    for (const [key, label, fallback] of channels) {
      const url = safeURL(data?.links?.[key]?.url) || fallback;
      links.append(externalLink(url, label, text));
    }
    const back = node('a', text.back, 'static-close');
    back.href = '#';
    fragment.append(links, back);
    section.replaceChildren(fragment);
  }

  const panel = { render };
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.games = panel;
})();
