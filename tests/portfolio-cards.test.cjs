const { test } = require('node:test');
const assert = require('node:assert/strict');
const { promisify } = require('node:util');
const { execFile } = require('node:child_process');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const run = promisify(execFile);

test('Tools and Videos use image cards without third-party players or requests', { timeout: 20000 }, async () => {
  const root = path.resolve(__dirname, '..');
  const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
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
      if(document.querySelector('.mrl-card img[src]'))throw Error('Portfolio images load before panels open');
      const wait=ms=>new Promise(r=>setTimeout(r,ms));
      for(let language=0;language<2;language++){
        if(language)document.querySelector('#language').click();
        for(const id of ['tools','videos']){
          const trigger=document.querySelector('nav [data-category="'+id+'"]');trigger.click();
          const section=document.querySelector('#'+id),cards=[...section.querySelectorAll('article')];
          if(cards.length!==2||cards.some(c=>!c.matches('.mrl-card')||!c.querySelector('img')))throw Error('Inconsistent or missing visual card');
          for(const card of cards){
            const image=card.querySelector('img');image.scrollIntoView();await image.decode();
            if(!image.naturalWidth||!image.src.includes('/assets/'))throw Error('Local thumbnail failed to load');
            if(!card.querySelector('h3')||!card.querySelector('.mrl-card-links a'))throw Error('Card lacks title or links');
          }
          if(id==='videos'){
            if(cards[0].querySelectorAll('.mrl-card-links a').length!==4)throw Error('Episode 264 links lost');
            if(!section.textContent.includes('264'))throw Error('Episode 264 missing');
          }else if(!cards[0].textContent.includes('BlueX'))throw Error('BlueX missing');
          if(document.querySelector('iframe,video,audio'))throw Error('Media embed is still mounted');
          document.querySelector('#return-room').click();await wait(100);
          if(document.querySelector('#panel').open||document.activeElement!==trigger)throw Error('Close/focus failed');
        }
      }
      if(performance.getEntriesByType('resource').some(r=>new URL(r.name).origin!==location.origin))throw Error('External player or thumbnail request');
      return 'PASS: consistent local image cards';
    })()`);
    assert.match(result.stdout, /PASS: consistent local image cards/);
  } finally {
    await browser('close').catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});
