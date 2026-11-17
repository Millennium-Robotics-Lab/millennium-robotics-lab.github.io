/* Content is independent of room coordinates and panel behavior. Add verified projects here. */
window.MRL_DATA = {
  schemaVersion: 1,
  featuredTools: [
    {
      id: 'bluex', title: 'BlueX',
      image: 'assets/portfolio/bluex.webp',
      imageAlt: { en: 'BlueX theme shown in its published X demo.', zh: '公开演示视频中的 BlueX 主题界面。' },
      description: {
        en: 'An unofficial Blue Archive theme for X (Twitter), installed with Stylus.',
        zh: '通过 Stylus 安装的非官方《蔚蓝档案》风格 X（Twitter）主题。'
      },
      installUrl: 'https://userstyles.world/style/31517/blue-archive-schale-for-x',
      demoUrl: {
        en: 'https://www.youtube.com/watch?v=kUbBWjOyO1Y',
        zh: 'https://www.bilibili.com/video/BV1uJsA6WEi8/'
      },
      announcementUrl: 'https://x.com/projectarisu/status/2122297137480511861'
    },
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
      image: 'assets/portfolio/bluecafe.webp',
      imageAlt: { en: 'BlueCafe editor with furniture catalog and a selected gaming area in a cafe layout.', zh: 'BlueCafe 编辑器：家具目录与咖啡厅布局中选中的游戏区。' }
    }
  ],
  featuredVideos: {
    youtube: {
      id: 'nfxeo7wM8Xc',
      title: { en: 'Manga animation · Episode 246', zh: '漫画动画 · 第246话' },
      image: 'assets/portfolio/manga-246.webp',
      imageAlt: { en: 'Original thumbnail of the episode 246 Japanese video.', zh: '第246话日语视频的原始封面。' },
      url: 'https://www.youtube.com/shorts/nfxeo7wM8Xc',
      format: 'short'
    },
    bilibili: {
      id: 'BV1cNxs6TE8J',
      title: { en: 'Manga animation · Episode 257', zh: '漫画动画 · 第257话：凯伊新素体' },
      image: 'assets/portfolio/manga-257.webp',
      imageAlt: { en: 'Original Bilibili thumbnail of episode 257.', zh: '第257话哔哩哔哩视频的原始封面。' },
      url: 'https://www.bilibili.com/video/BV1cNxs6TE8J',
      format: 'video'
    }
  },
  projects: {
    videos: [
      {
        id: 'manga-animation-global-264',
        url: { en: 'https://x.com/projectarisu/status/2121432139111748059', zh: 'https://www.bilibili.com/video/BV1MmWC6YEmx/' },
        image: 'assets/portfolio/manga-264.webp',
        imageAlt: { en: 'Original thumbnail of the episode 264 Japanese video.', zh: '第264话日语视频的原始封面。' },
        title: { en: 'Manga animation · Global episode 264', zh: '漫画动画 · 国际服第 264 话' },
        links: [
          { label: { en: 'CN · Bilibili video', zh: '中文 · 哔哩哔哩视频' }, url: 'https://www.bilibili.com/video/BV1MmWC6YEmx/' },
          { label: { en: 'EN · Video reply on X', zh: '英文 · X 视频回复' }, url: 'https://x.com/projectarisu/status/2121432139111748059' },
          { label: { en: 'JP · Short post on X', zh: '日文 · X 短视频动态' }, url: 'https://x.com/projectarisu/status/2121433136890532176' },
          { label: { en: 'JP · YouTube Short', zh: '日文 · YouTube Shorts' }, url: 'https://www.youtube.com/shorts/wQ8USDfF8OI' }
        ]
      }
    ],
    games: [], tools: []
  },
  links: {
    youtube: { label: 'YouTube', url: 'https://www.youtube.com/@project-arisu' },
    bilibili: { label: 'Bilibili', url: 'https://space.bilibili.com/1161124651' },
    x: { label: 'X / Twitter', url: 'https://x.com/projectarisu' },
    github: { label: 'GitHub', url: 'https://github.com/Millennium-Robotics-Lab' }
  },
  categories: { videos: ['youtube', 'bilibili'], games: [], tools: ['github'], about: ['youtube', 'bilibili', 'x', 'github'] }
};
