const { test } = require('node:test');
const assert = require('node:assert/strict');
const { promisify } = require('node:util');
const { execFile } = require('node:child_process');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const run = promisify(execFile);

test('Videos opens a visible native embed without the parent YouTube API loader', { timeout: 20000 }, async () => {
  const root = path.resolve(__dirname, '..');
  const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
  const server = createServer(async (req, res) => {
    let name = new URL(req.url, 'http://localhost').pathname;
    if (name.endsWith('/')) name += 'index.html';
    try { const body = await readFile(path.join(root, name)); res.setHeader('Content-Type', types[path.extname(name)] || 'application/octet-stream'); res.end(body); }
    catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const session = 'mrl-direct-player-' + process.pid;
  const browser = (...args) => run('agent-browser', ['--session', session, ...args], { timeout: 15000 });
  try {
    await browser('open', `http://127.0.0.1:${server.address().port}/clubroom/`);
    const result = await browser('eval', `(async()=>{
      if(document.querySelector('#videos iframe'))throw Error('Media mounted before opening Videos');
      const trigger=document.querySelector('nav [data-category="videos"]');
      trigger.dispatchEvent(new Event('pointerenter'));
      trigger.dispatchEvent(new Event('pointerenter'));
      if(document.querySelectorAll('link[rel="preconnect"][href="https://www.youtube.com"]').length!==1)throw Error('Connection warming is missing or duplicated');
      trigger.click();
      const area=document.querySelector('#videos .videos-player'),frame=area.querySelector('iframe');
      if(!frame)throw Error('EXTRA_LOADING_GATE: opening Videos does not start the embed');
      if(getComputedStyle(frame).visibility!=='visible')throw Error('The native player is hidden');
      if(area.querySelector('button'))throw Error('A custom control covers the native player');
      if([...document.scripts].some(s=>/youtube.com/.test(s.src)))throw Error('Parent iframe API is a loading dependency');
      if(!frame.src.startsWith('https://www.youtube.com/embed/nfxeo7wM8Xc?'))throw Error('Wrong direct embed');
      if(!frame.src.includes('autoplay=0')||frame.referrerPolicy!=='strict-origin-when-cross-origin')throw Error('Embed configuration failed');
      document.querySelector('#return-room').click();await new Promise(r=>setTimeout(r,100));
      if(document.querySelector('#videos iframe'))throw Error('Closing retains the player');
      document.querySelector('#language').click();document.querySelector('nav [data-category="videos"]').click();
      if(!document.querySelector('#videos iframe')?.src.includes('bvid=BV1cNxs6TE8J'))throw Error('Chinese selection regressed');
      return 'PASS: direct player lifecycle';
    })()`);
    assert.match(result.stdout, /PASS: direct player lifecycle/);
  } finally {
    await browser('close').catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});
