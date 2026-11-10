(() => {
  'use strict';

  const copy = {
    en: {
      title: 'Videos',
      intro: 'Choose a channel. Find something to watch.',
      heading: 'Browse the channels',
      youtube: 'Browse videos on YouTube.',
      bilibili: 'Browse videos on Bilibili.',
      open: 'Open channel',
      newTab: 'opens in a new tab',
      selection: 'Selected screenings',
      empty: 'No individual videos are listed here yet. Explore either channel above to choose a video.',
      note: 'Channels open in a new tab. Video and audio load there only after you follow a link.',
      back: 'Back to the clubroom'
    },
    zh: {
      title: '视频',
      intro: '选一个频道，找一部想看的视频。',
      heading: '浏览频道',
      youtube: '在 YouTube 浏览视频。',
      bilibili: '在哔哩哔哩浏览视频。',
      open: '打开频道',
      newTab: '在新标签页打开',
      selection: '精选放映',
      empty: '这里暂未收录单部视频。可以先到上方任一频道挑选视频。',
      note: '频道将在新标签页打开。只有点击链接后，才会在平台加载视频和音频。',
      back: '返回部室'
    }
  };
  const channels = [
    { key: 'youtube', name: 'YouTube', identity: '@project-arisu', url: 'https://www.youtube.com/@project-arisu' },
    { key: 'bilibili', name: 'Bilibili', identity: '1161124651', url: 'https://space.bilibili.com/1161124651' }
  ];

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function render(section, language, data) {
    const text = copy[language] || copy.en;
    const title = node('h2', text.title);
    title.id = 'videos-title';
    section.setAttribute('aria-labelledby', title.id);
    const intro = node('p', text.intro, 'videos-intro');
    const heading = node('h3', text.heading);
    const list = node('ul', '', 'videos-channels');
    for (const channel of channels) {
      const item = node('li');
      const link = node('a', '', 'videos-channel');
      // Keep both supplied, verified destinations visible in every locale.
      link.href = channel.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', channel.name + ': ' + text.open + ', ' + text.newTab);
      const name = node('span', channel.name, 'videos-channel-name');
      const identity = node('span', channel.identity, 'videos-channel-id');
      const description = node('span', text[channel.key], 'videos-channel-description');
      const action = node('span', text.open + ' ↗', 'videos-channel-action');
      link.append(name, identity, description, action);
      item.append(link);
      list.append(item);
    }
    const selection = node('div', '', 'videos-selection');
    selection.append(node('h3', text.selection));
    const projects = node('div');
    projects.dataset.projects = 'videos';
    selection.append(projects);
    if (!data?.projects?.videos?.length) selection.append(node('p', text.empty));
    const note = node('p', text.note, 'videos-note');
    const back = node('a', text.back, 'static-close');
    back.href = '#';
    section.replaceChildren(title, intro, heading, list, selection, note, back);
  }

  const panel = { render };
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.videos = panel;
})();
