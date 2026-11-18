/* Content is independent of room coordinates and panel behavior. Add verified projects here. */
window.MRL_DATA = {
  schemaVersion: 1,
  featuredTools: [
    {
      id: 'bluex', title: 'BlueX',
      image: 'assets/portfolio/bluex.webp',
      imageAlt: { en: 'BlueX theme shown in its published X demo.', ja: '公開された X のデモ動画に映る BlueX テーマ。', zh: '公开演示视频中的 BlueX 主题界面。' },
      description: {
        en: 'An unofficial Blue Archive theme for X (Twitter), installed with Stylus.',
        ja: 'Stylus でインストールできる、ブルーアーカイブ風の非公式 X（Twitter）テーマ。',
        zh: '通过 Stylus 安装的非官方《蔚蓝档案》风格 X（Twitter）主题。'
      },
      installUrl: 'https://userstyles.world/style/31517/blue-archive-schale-for-x',
      demoUrl: {
        en: 'https://www.youtube.com/watch?v=kUbBWjOyO1Y',
        ja: 'https://www.youtube.com/watch?v=kUbBWjOyO1Y',
        zh: 'https://www.bilibili.com/video/BV1uJsA6WEi8/'
      },
      announcementUrl: 'https://x.com/projectarisu/status/2122297137480511861'
    },
    {
      id: 'bluecafe', title: 'BlueCafe',
      description: {
        en: 'A desktop cafe layout editor built with Unity.',
        ja: 'Unity 製のデスクトップ用カフェレイアウトエディター。',
        zh: '使用 Unity 制作的桌面咖啡厅布局编辑器。'
      },
      note: {
        en: 'Game assets are supplied separately. No project-wide source license has been selected.',
        ja: 'ゲーム素材は別途用意してください。プロジェクト全体のソースコードライセンスは未定です。',
        zh: '游戏素材需另行提供。项目尚未选定整体源代码许可证。'
      },
      sourceUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe',
      downloadUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe/releases',
      documentationUrl: 'https://github.com/Millennium-Robotics-Lab' + '/bluecafe#run',
      image: 'assets/portfolio/bluecafe.webp',
      imageAlt: { en: 'BlueCafe editor with furniture catalog and a selected gaming area in a cafe layout.', ja: '家具カタログと、カフェ内で選択したゲームエリアが表示された BlueCafe エディター。', zh: 'BlueCafe 编辑器：家具目录与咖啡厅布局中选中的游戏区。' }
    }
  ],
  featuredVideos: {
    youtube: {
      id: 'nfxeo7wM8Xc',
      title: { en: 'Manga animation · Episode 246', ja: '漫画アニメーション · 第246話', zh: '漫画动画 · 第246话' },
      image: 'assets/portfolio/manga-246.webp',
      imageAlt: { en: 'Original thumbnail of the episode 246 Japanese video.', ja: '第246話の日本語動画のオリジナルサムネイル。', zh: '第246话日语视频的原始封面。' },
      url: 'https://www.youtube.com/shorts/nfxeo7wM8Xc',
      format: 'short'
    },
    bilibili: {
      id: 'BV1cNxs6TE8J',
      title: { en: 'Manga animation · Episode 257', ja: '漫画アニメーション · 第257話', zh: '漫画动画 · 第257话：凯伊新素体' },
      image: 'assets/portfolio/manga-257.webp',
      imageAlt: { en: 'Original Bilibili thumbnail of episode 257.', ja: '第257話の Bilibili 動画のオリジナルサムネイル。', zh: '第257话哔哩哔哩视频的原始封面。' },
      url: 'https://www.bilibili.com/video/BV1cNxs6TE8J',
      format: 'video'
    }
  },
  projects: {
    videos: [
      {
        id: 'manga-animation-global-264',
        url: { en: 'https://x.com/projectarisu/status/2121432139111748059', ja: 'https://www.youtube.com/shorts/wQ8USDfF8OI', zh: 'https://www.bilibili.com/video/BV1MmWC6YEmx/' },
        image: 'assets/portfolio/manga-264.webp',
        imageAlt: { en: 'Original thumbnail of the episode 264 Japanese video.', ja: '第264話の日本語動画のオリジナルサムネイル。', zh: '第264话日语视频的原始封面。' },
        title: { en: 'Manga animation · Global episode 264', ja: '漫画アニメーション · グローバル版 第264話', zh: '漫画动画 · 国际服第 264 话' },
        links: [
          { label: { en: 'CN · Bilibili video', ja: '中国語 · Bilibili 動画', zh: '中文 · 哔哩哔哩视频' }, url: 'https://www.bilibili.com/video/BV1MmWC6YEmx/' },
          { label: { en: 'EN · Video reply on X', ja: '英語 · X の動画リプライ', zh: '英文 · X 视频回复' }, url: 'https://x.com/projectarisu/status/2121432139111748059' },
          { label: { en: 'JP · Short post on X', ja: '日本語 · X のショート動画投稿', zh: '日文 · X 短视频动态' }, url: 'https://x.com/projectarisu/status/2121433136890532176' },
          { label: { en: 'JP · YouTube Short', ja: '日本語 · YouTube ショート', zh: '日文 · YouTube Shorts' }, url: 'https://www.youtube.com/shorts/wQ8USDfF8OI' }
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
