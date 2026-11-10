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
      documentationUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe#run',
      image: 'assets/bluecafe-screenshot.png',
      imageAlt: { en: 'BlueCafe editor with furniture catalog and a selected gaming area in a cafe layout.', zh: 'BlueCafe 编辑器：家具目录与咖啡厅布局中选中的游戏区。' }
    }
  ],
  featuredVideos: {
    youtube: {
      id: 'nfxeo7wM8Xc',
      title: '【ブルアカ漫画】「ご主人様」呼びにニッコリなユウカと戸惑うケイ｜第246話・日本語ボイス付き',
      url: 'https://www.youtube.com/shorts/nfxeo7wM8Xc',
      format: 'short'
    },
    bilibili: {
      id: 'BV1cNxs6TE8J',
      title: '第257话：凯伊新素体',
      url: 'https://www.bilibili.com/video/BV1cNxs6TE8J',
      format: 'video'
    }
  },
  projects: { videos: [], games: [], tools: [] },
  links: {
    youtube: { label: 'YouTube', url: 'https://www.youtube.com/@project-arisu' },
    bilibili: { label: 'Bilibili', url: 'https://space.bilibili.com/1161124651' },
    x: { label: 'X / Twitter', url: 'https://x.com/projectarisu' },
    github: { label: 'GitHub', url: 'https://github.com/Millennium-Robotics-Lab' }
  },
  categories: { videos: ['youtube', 'bilibili'], games: [], tools: ['github'], about: ['youtube', 'bilibili', 'x', 'github'] }
};
