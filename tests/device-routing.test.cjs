const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { isMobileDevice } = require('../device-routing.js');
const script = fs.readFileSync(require.resolve('../device-routing.js'), 'utf8');

const devices = [
  ['iPhone', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148' }, true],
  ['Android phone', { userAgent: 'Mozilla/5.0 (Linux; Android 15) Chrome/130 Mobile Safari/537.36' }, true],
  ['Android tablet', { userAgent: 'Mozilla/5.0 (Linux; Android 15) Chrome/130 Safari/537.36' }, true],
  ['iPad desktop mode', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', platform: 'MacIntel', maxTouchPoints: 5 }, true],
  ['mobile client hint', { userAgentData: { mobile: true }, userAgent: 'Chromium' }, true],
  ['Linux desktop', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64)', platform: 'Linux x86_64', maxTouchPoints: 0 }, false],
  ['Mac desktop', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', platform: 'MacIntel', maxTouchPoints: 0 }, false],
  ['Windows touchscreen', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', platform: 'Win32', maxTouchPoints: 10 }, false]
];
for (const [name, device, expected] of devices) {
  test(name + ' uses the intended homepage in either orientation', () => {
    assert.equal(isMobileDevice(device), expected);
    assert.equal(isMobileDevice({ ...device, width: 896, height: 414 }), expected);
    assert.equal(isMobileDevice({ ...device, width: 390, height: 844 }), expected);
  });
}

function run(page, device, href) {
  let redirected = null;
  const url = new URL(href);
  vm.runInNewContext(script, {
    URL,
    document: { currentScript: { dataset: { page } } },
    window: { navigator: device, location: { href, search: url.search, hash: url.hash, replace(value) { redirected = value; } } }
  });
  return redirected;
}

test('desktop root routes to artwork and preserves query and panel fragment', () => {
  assert.equal(run('original', devices[5][1], 'https://example.test/?lang=zh#tools'), 'https://example.test/clubroom/?lang=zh#tools');
});
test('mobile root stays on the original page', () => {
  assert.equal(run('original', devices[0][1], 'https://example.test/'), null);
});
test('mobile direct clubroom URL returns to original without a redirect loop', () => {
  const target = run('clubroom', devices[0][1], 'https://example.test/clubroom/#about');
  assert.equal(target, 'https://example.test/#about');
  assert.equal(run('original', devices[0][1], target), null);
});
test('desktop clubroom stays open', () => {
  assert.equal(run('clubroom', devices[5][1], 'https://example.test/clubroom/'), null);
});
test('routing works under a nested Pages project path and with index.html', () => {
  assert.equal(run('original', devices[5][1], 'https://example.test/project/index.html'), 'https://example.test/project/clubroom/');
  assert.equal(run('clubroom', devices[0][1], 'https://example.test/project/clubroom/index.html'), 'https://example.test/project/');
});
