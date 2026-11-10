const { test } = require('node:test');
const assert = require('node:assert/strict');
const { promisify } = require('node:util');
const { execFile } = require('node:child_process');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const run = promisify(execFile);

test('blocked and unready YouTube players retain their preview and recovery controls', { timeout: 45000 }, async () => {
  const root = path.resolve(__dirname, '..');
  const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
  const server = createServer(async (req, res) => {
    let name = new URL(req.url, 'http://localhost').pathname;
    if (name.endsWith('/')) name += 'index.html';
    try { const body = await readFile(path.join(root, name)); res.setHeader('Content-Type', types[path.extname(name)] || 'application/octet-stream'); res.end(body); }
    catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const session = 'mrl-player-test-' + process.pid;
  const browser = (...args) => run('agent-browser', ['--session', session, ...args], { timeout: 25000 });
  try {
    await browser('open', `http://127.0.0.1:${server.address().port}/clubroom/`);
    await browser('network', 'route', '**/*youtube*/*', '--abort');
    // Use a single argument, without shell interpolation, for the browser-side assertion.
    const result = await browser('eval', `(async()=>{
      document.querySelector('nav [data-category="videos"]').click();
      const area=document.querySelector('#videos .videos-player');
      const button=area.querySelector('button');
      if(!button || !area.querySelector('img'))throw Error('BLANK_PLAYER: no local preview or load control');
      if(area.querySelector('iframe'))throw Error('Player loads before user request');
      await area.querySelector('img').decode();
      button.click();
      const until=Date.now()+11000;
      while(button.disabled && Date.now()<until)await new Promise(r=>setTimeout(r,100));
      if(button.disabled)throw Error('Loading never recovers');
      if(!area.querySelector('img')?.naturalWidth)throw Error('Missing local preview');
      if(area.querySelector('iframe'))throw Error('Failed iframe remains mounted');
      if(!document.querySelector('#videos .videos-external')?.href.includes('nfxeo7wM8Xc'))throw Error('Missing direct video action');
      if(!document.querySelector('#videos [role="status"]').textContent.trim())throw Error('No failure feedback');
      // A loaded iframe is not proof of a working player. Never emit onReady.
      window.YT={Player: class {
        constructor(host) { this.frame=document.createElement('iframe'); this.frame.src='about:blank'; host.replaceWith(this.frame); }
        destroy() { this.frame.remove(); }
      }};
      button.click();
      await new Promise(r=>setTimeout(r,100));
      if(area.dataset.state==='ready')throw Error('An iframe load was mistaken for readiness');
      const deadline=Date.now()+11000;
      while(button.disabled && Date.now()<deadline)await new Promise(r=>setTimeout(r,100));
      if(button.disabled || area.querySelector('iframe') || !area.querySelector('img').naturalWidth)throw Error('Unready iframe leaves a blank player');
      button.click();
      document.querySelector('#return-room').click();
      await new Promise(r=>setTimeout(r,100));
      if(document.querySelector('#videos iframe'))throw Error('Closing leaves the player mounted');
      return 'PASS: blocked player recovers';
    })()`);
    assert.match(result.stdout, /PASS: blocked player recovers/);
  } finally {
    await browser('close').catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});
