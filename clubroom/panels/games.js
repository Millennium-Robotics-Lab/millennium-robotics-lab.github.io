(() => {
  'use strict';
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.games = {
    render(section, language) {
      const zh = language === 'zh';
      const title = document.createElement('h2');
      title.id = 'games-title';
      title.textContent = zh ? '游戏' : 'Games';
      const empty = document.createElement('p');
      empty.textContent = zh ? '这里还没有已发布的游戏条目。' : 'No published game entries yet.';
      const back = document.createElement('a');
      back.className = 'static-close';
      back.href = '#';
      back.textContent = zh ? '返回部室' : 'Back to the clubroom';
      section.replaceChildren(title, empty, back);
    }
  };
})();
