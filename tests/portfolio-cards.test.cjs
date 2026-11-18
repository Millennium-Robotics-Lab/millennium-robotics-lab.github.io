const { test } = require('node:test');
const assert = require('node:assert/strict');
const { promisify } = require('node:util');
const { execFile } = require('node:child_process');
const { createServer } = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const run = promisify(execFile);

test('Localized portfolio cards and mobile language preferences work in all three languages', { timeout: 30000 }, async () => {
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
      for(let language=0;language<3;language++){
        if(language)document.querySelector('#language').click();
        const zh=language===1, ja=language===2;
        if(document.documentElement.lang!==['en','zh-Hans','ja'][language])throw Error('Incorrect document language');
        if(ja && document.querySelector('nav [data-category="videos"]').textContent!=='動画')throw Error('Japanese navigation missing');
        const aboutTrigger=document.querySelector('nav [data-category="about"]');aboutTrigger.click();
        const profiles=[...document.querySelectorAll('#about .about-profiles a')].map(a=>new URL(a.href).hostname);
        if(JSON.stringify(profiles)!==JSON.stringify(zh?['space.bilibili.com','github.com']:['www.youtube.com','x.com','github.com']))throw Error('Wrong About platforms: '+profiles);
        document.querySelector('#return-room').click();await wait(100);
        for(const anchor of document.querySelectorAll('a[href]')){
          const url=new URL(anchor.href);if(url.origin===location.origin)continue;
          if(zh&&!['www.bilibili.com','space.bilibili.com','github.com','userstyles.world'].includes(url.hostname))throw Error('Foreign platform in Chinese: '+anchor.href);
          if(!zh&&(/bilibili\.com$/.test(url.hostname)||url.hostname==='b23.tv'))throw Error('Bilibili in English');
        }
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
            if(cards[0].querySelectorAll('.mrl-card-links a').length!==(zh?1:3))throw Error('Wrong episode link selection');
            const primary=cards[0].querySelector('.mrl-card-visual').href;
            if(!primary.includes(zh?'BV1MmWC6YEmx':ja?'wQ8USDfF8OI':'2121432139111748059'))throw Error('Thumbnail opens the wrong language');
            if(!section.textContent.includes('264'))throw Error('Episode 264 missing');
          }else if(!cards[0].textContent.includes('BlueX'))throw Error('BlueX missing');
          if(document.querySelector('iframe,video,audio'))throw Error('Media embed is still mounted');
          document.querySelector('#return-room').click();await wait(100);
          if(document.querySelector('#panel').open||document.activeElement!==trigger)throw Error('Close/focus failed');
        }
      }
      if(document.querySelector('#games p').textContent!=='公開済みのゲームはまだありません。')throw Error('Japanese empty state missing');
      if(!document.querySelector('#tools').textContent.includes('テーマをインストール'))throw Error('Japanese tool labels missing');
      if(!document.querySelector('#tools img').alt.includes('テーマ'))throw Error('Japanese image description missing');
      if(!document.querySelector('#about').textContent.includes('許可を得て使用'))throw Error('Japanese credits missing');
      if(performance.getEntriesByType('resource').some(r=>new URL(r.name).origin!==location.origin))throw Error('External player or thumbnail request');
      return 'PASS: consistent local image cards';
    })()`);
    assert.match(result.stdout, /PASS: consistent local image cards/);
    await browser('reload');
    const restored = await browser('eval', `(() => {
      if(document.documentElement.lang!=='ja'||localStorage.getItem('mrl-language')!=='ja')throw Error('Japanese preference not restored');
      document.querySelector('nav [data-category="videos"]').click();
      if(!document.querySelector('#panel').textContent.includes('漫画アニメーション'))throw Error('Japanese panel missing after reload');
      document.querySelector('#close-panel').click();
      document.querySelector('#language').click();
      if(document.documentElement.lang!=='en')throw Error('Language cycle did not return to English');
      return 'PASS: saved Japanese and full language cycle';
    })()`);
    assert.match(restored.stdout, /PASS: saved Japanese and full language cycle/);
    await browser('close');
    await run('agent-browser', ['--session', session, '--user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148', 'open', `http://127.0.0.1:${server.address().port}/`], { timeout: 15000 });
    const mobile = await browser('eval', `(() => {
      if(location.pathname!=='/')throw Error('Mobile homepage redirected');
      const button=document.querySelector('#language');
      for(let i=0;i<3&&document.documentElement.lang!=='ja';i++)button.click();
      if(document.querySelector('.sub').textContent!=='ミレニアムロボット部')throw Error('Mobile Japanese name missing');
      const links=[...document.querySelectorAll('.links a')].filter(a=>getComputedStyle(a).display!=='none');
      if(links.length!==3||links.some(a=>!a.getAttribute('aria-label').includes('新しいタブで開く')))throw Error('Mobile Japanese channels incorrect');
      if(localStorage.getItem('mrl-language')!=='ja')throw Error('Mobile preference not saved');
      return 'PASS: Japanese mobile page';
    })()`);
    assert.match(mobile.stdout, /PASS: Japanese mobile page/);
    await browser('reload');
    const mobileRestored = await browser('eval', `document.documentElement.lang==='ja' && document.querySelector('.sub').lang==='ja'`);
    assert.match(mobileRestored.stdout, /true/);
  } finally {
    await browser('close').catch(() => {});
    await new Promise(resolve => server.close(resolve));
  }
});
