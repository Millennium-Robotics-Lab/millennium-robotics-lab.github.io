(() => {
  'use strict';
  window.MRL_PANELS = window.MRL_PANELS || {};
  window.MRL_PANELS.games = {
    render(section, language) {
      const text = window.MRL_COPY[language];
      const title = document.createElement('h2');
      title.id = 'games-title';
      title.textContent = text.games;
      const empty = document.createElement('p');
      empty.textContent = text.gamesEmptyPublished;
      const back = document.createElement('a');
      back.className = 'static-close';
      back.href = '#';
      back.textContent = text.returnRoom;
      section.replaceChildren(title, empty, back);
    }
  };
})();
