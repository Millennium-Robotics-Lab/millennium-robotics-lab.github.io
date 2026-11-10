/* Content is independent of room coordinates and panel behavior. Add verified projects here. */
window.MRL_DATA = {
  schemaVersion: 1,
  featuredTools: [
    {
      id: 'bluecafe', title: 'BlueCafe',
      description: {
        en: 'A desktop cafe layout editor built with Unity.',
        zh: '使用 Unity 制作的桌面咖啡厅布局编辑器。'
      },
      note: {
        en: 'Game assets are supplied separately. No project-wide source license has been selected.',
        zh: '游戏素材需另行提供。项目尚未选定整体源代码许可证。'
      },
      sourceUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe',
      downloadUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe/releases',
      documentationUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe#run'
    },
    {
      id: 'blueoffice', title: 'BlueOffice',
      description: {
        en: 'A planned local, game-like office for AI assistants.',
        zh: '计划为 AI 助手打造的本地游戏式办公室。'
      },
      note: {
        en: 'The main branch is a project baseline, with no runnable app or product release.',
        zh: '主分支目前仅有项目基础结构，没有可运行的应用或产品发行版。'
      },
      sourceUrl: 'https://github.com/Millennium-Robotics-Lab' + '/blueoffice',
      documentationUrl: 'https://github.com/Millennium-Robotics-Lab' + '/blueoffice#readme'
    },
    {
      id: 'momocord', title: 'momocord',
      description: {
        en: 'Our fork of U1805/momotalk, a Blue Archive-style chat generator.',
        zh: '我们从 U1805/momotalk 派生的仓库，用于生成《蔚蓝档案》风格的聊天。'
      },
      sourceUrl: 'https://github.com/Millennium-Robotics-Lab' + '/momocord',
      upstreamUrl: 'https://github.com/U1805/momotalk',
      documentationUrl: 'https://github.com/Millennium-Robotics-Lab' + '/momocord/blob/main/docs/How-to-use.md'
    }
  ],
  projects: { videos: [], games: [], tools: [] },
  links: {
    youtube: { label: 'YouTube', url: 'https://www.youtube.com/@project-arisu' },
    bilibili: { label: 'Bilibili', url: 'https://space.bilibili.com/1161124651' },
    x: { label: 'X / Twitter', url: 'https://x.com/projectarisu' },
    github: { label: 'GitHub', url: 'https://github.com/Millennium-Robotics-Lab' }
  },
  categories: { videos: ['youtube', 'bilibili'], games: [], tools: ['github'], about: ['youtube', 'bilibili', 'x', 'github'] }
};
