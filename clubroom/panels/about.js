(() => {
 'use strict';
 const copy = {
  en: {
   title: 'About',
   profiles: 'Find us', newTab: 'opens in a new tab',
   note: 'This is an independent homepage inspired by Blue Archive. MRL is not affiliated with or endorsed by its rights holders.',
   back: 'Back to the clubroom',
   descriptions: ['Videos', 'Videos', 'Posts & updates', 'Public repositories']
  },
  zh: {
   title: '关于',
   profiles: '找到我们', newTab: '在新标签页打开',
   note: '这是受《蔚蓝档案》启发的独立主页。MRL 与其权利人无隶属关系，亦未获其背书。',
   back: '返回部室',
   descriptions: ['视频', '视频', '动态与更新', '公开仓库']
  }
 };
 // Public profile destinations retained from the current homepage.
 const profiles = [
  ['YouTube', 'https://www.youtube.com/@project-arisu', '@project-arisu'],
  ['Bilibili', 'https://space.bilibili.com/1161124651', '1161124651'],
  ['X / Twitter', 'https://x.com/projectarisu', '@projectarisu'],
  ['GitHub', 'https://github.com/Millennium-Robotics-Lab', 'Millennium-Robotics-Lab']
 ];
 function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
 }
 const panel = {
  render(section, language, data) {
   const t = copy[language] || copy.en;
   const title = element('h2', t.title);
   title.id = 'about-title';
   const brand = element('p', '', 'about-brand');
   const english = element('span', 'Millennium Robotics Lab');
   english.lang = 'en';
   const chinese = element('span', '千禧年机器人部', 'about-brand-secondary');
   chinese.lang = 'zh-Hans';
   brand.append(english, chinese, element('span', 'MRL', 'about-brand-short'));
   const heading = element('h3', t.profiles);
   heading.id = 'about-profiles-title';
   const links = element('ul', '', 'about-profiles');
   links.setAttribute('aria-labelledby', heading.id);
   profiles.forEach(([name, url, handle], index) => {
    const item = element('li');
    const link = element('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${name}, ${t.newTab}`);
    const icon = document.createElement('img');
    icon.className = 'about-icon';
    icon.src = 'assets/' + ['youtube', 'bilibili', 'x', 'github'][index] + '.svg';
    icon.alt = '';
    icon.width = 28; icon.height = 28;
    const details = element('span', '', 'about-details');
    const label = element('span', name, 'about-platform');
    const arrow = element('span', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    label.append(arrow);
    details.append(label, element('span', handle, 'about-handle'), element('span', t.descriptions[index], 'about-description'));
    link.append(icon, details);
    item.append(link);
    links.append(item);
   });
   const back = element('a', t.back, 'static-close');
   back.href = '#';
   section.setAttribute('aria-labelledby', title.id);
   section.replaceChildren(title, brand, heading, links, element('p', t.note, 'about-unofficial'), back);
  }
 };
 window.MRL_PANELS = window.MRL_PANELS || {};
 window.MRL_PANELS.about = panel;
})();
