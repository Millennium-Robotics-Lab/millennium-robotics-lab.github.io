(() => {
  'use strict';
  const base = new URL('.', document.currentScript.src);
  const pointer = matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!pointer.matches) return;

  const root = document.documentElement;
  let animations = [];
  let timer;
  let started;

  function stop() {
    clearTimeout(timer);
    timer = undefined;
    for (const animation of animations) {
      root.style.removeProperty(`--cursor-${animation.role}`);
      animation.current = undefined;
    }
  }

  function tick() {
    const elapsed = performance.now() - started;
    let next = Infinity;
    for (const animation of animations) {
      let position = elapsed % animation.duration;
      let index = 0;
      while (position >= animation.frames[index].duration) {
        position -= animation.frames[index++].duration;
      }
      const frame = animation.frames[index];
      if (animation.current !== frame.url) {
        root.style.setProperty(`--cursor-${animation.role}`, `url("${frame.url}")`);
        animation.current = frame.url;
      }
      next = Math.min(next, frame.duration - position);
    }
    timer = setTimeout(tick, Math.max(1, next));
  }

  function update() {
    stop();
    if (!animations.length || document.hidden || reducedMotion.matches || !pointer.matches) return;
    started = performance.now();
    tick();
  }

  fetch(new URL('assets/cursors/animation.json?v=20261118-1', base))
    .then(response => {
      if (!response.ok) throw new Error('Cursor frames unavailable');
      return response.json();
    })
    .then(async data => {
      // Decode and retain each image before replacing the static cursor fallback.
      const decoded = await Promise.all(Object.entries(data).map(async ([role, frames]) => {
        const ready = await Promise.all(frames.map(async frame => {
          const image = new Image();
          image.src = frame.url;
          await image.decode();
          return { ...frame, image };
        }));
        return { role, frames: ready, duration: ready.reduce((total, frame) => total + frame.duration, 0) };
      }));
      animations = decoded;
      pointer.addEventListener('change', update);
      reducedMotion.addEventListener('change', update);
      document.addEventListener('visibilitychange', update);
      window.addEventListener('pagehide', stop);
      window.addEventListener('pageshow', update);
      update();
    })
    .catch(() => { /* Keep native static cursors if loading or decoding fails. */ });
})();
