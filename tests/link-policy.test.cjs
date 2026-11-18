const { test } = require('node:test');
const assert = require('node:assert/strict');
const { allows } = require('../link-policy.js');

test('Chinese permits Bilibili and technical project/install sites', () => {
  for (const url of ['https://space.bilibili.com/1161124651', 'https://www.bilibili.com/video/BV1MmWC6YEmx/', 'https://b23.tv/example', 'https://github.com/Millennium-Robotics-Lab', 'https://userstyles.world/style/31517/blue-archive-schale-for-x']) assert.equal(allows(url, 'zh'), true, url);
  for (const url of ['https://www.youtube.com/watch?v=test', 'https://youtu.be/test', 'https://x.com/projectarisu', 'https://twitter.com/projectarisu', 'https://www.reddit.com/r/BlueArchive', 'https://instagram.com/example']) assert.equal(allows(url, 'zh'), false, url);
});
test('English and Japanese never permit Bilibili destinations or short links', () => {
  for (const url of ['https://space.bilibili.com/1161124651', 'https://www.bilibili.com/video/example', 'https://player.bilibili.com/player.html', 'https://www.bilibili.tv/en', 'https://b23.tv/example']) for (const language of ['en', 'ja', 'ja-JP']) assert.equal(allows(url, language), false, url);
  for (const url of ['https://www.youtube.com/@project-arisu', 'https://x.com/projectarisu', 'https://github.com/Millennium-Robotics-Lab']) for (const language of ['en', 'ja', 'ja-JP']) assert.equal(allows(url, language), true, url);
});
test('Policy respects language tags and exact domain boundaries', () => {
  assert.equal(allows('https://youtube.com/', 'zh-Hans'), false);
  assert.equal(allows('https://github.com.attacker.test/', 'zh'), false);
  assert.equal(allows('https://evilgithub.com/', 'zh'), false);
  assert.equal(allows('javascript:alert(1)', 'en'), false);
  assert.equal(allows('mailto:test@example.com', 'zh'), false);
});
test('Internal navigation and locally hosted thumbnails work in all languages', () => {
  for (const language of ['en', 'zh', 'ja']) {
    assert.equal(allows('#tools', language), true);
    assert.equal(allows('clubroom/assets/portfolio/bluex.webp', language), true);
  }
});

test('English no-JavaScript clubroom fallback has no Bilibili anchors', () => {
  const html = require('node:fs').readFileSync(require('node:path').join(__dirname, '../clubroom/index.html'), 'utf8');
  assert.doesNotMatch(html, /<a\b[^>]*href="https:\/\/(?:[^/]+\.)?(?:bilibili\.com|b23\.tv)\//);
});
