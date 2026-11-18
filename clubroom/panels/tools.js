(() => {
  'use strict';
  const labels = {
    en: { installUrl: 'Install theme', demoUrl: 'Demo video', announcementUrl: 'Launch post', sourceUrl: 'Source', downloadUrl: 'Downloads', documentationUrl: 'Documentation', upstreamUrl: 'Upstream project', url: 'Project page' },
    ja: { installUrl: 'テーマをインストール', demoUrl: 'デモ動画', announcementUrl: '公開のお知らせ', sourceUrl: 'ソースコード', downloadUrl: 'ダウンロード', documentationUrl: 'ドキュメント', upstreamUrl: '元のプロジェクト', url: 'プロジェクトページ' },
    zh: { installUrl: '安装主题', demoUrl: '演示视频', announcementUrl: '发布动态', sourceUrl: '源代码', downloadUrl: '下载', documentationUrl: '使用文档', upstreamUrl: '上游项目', url: '项目页面' }
  };
  function render(section, language, data) {
    const text = labels[language] || labels.en;
    const entries = new Map();
    for (const project of [...(data.featuredTools || []), ...(data.projects?.tools || [])]) {
      const key = project.id || project.sourceUrl || project.url || entries.size;
      entries.set(key, { ...entries.get(key), ...project });
    }
    const items = [...entries.values()].map(project => ({ ...project, links: Object.entries(text).filter(([field]) => project[field]).map(([field, label]) => ({ label, url: project[field] })) }));
    window.MRL_CARDS.render(section, language, window.MRL_COPY[language].toolsLong, items);
  }
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.tools = { render, onOpen: section => window.MRL_CARDS.onOpen(section) };
})();
