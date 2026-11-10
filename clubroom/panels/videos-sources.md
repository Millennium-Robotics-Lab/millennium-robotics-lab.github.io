# Featured videos and native embeds

Content is configured in `clubroom/portfolio.js`.

## Selected media

- YouTube: https://www.youtube.com/@project-arisu , channel ID `UCMVoEs4AWxaBn-K3Un3XFhQ`. On 2026-11-10 the public listings contained 13 videos and 10 Shorts. `nfxeo7wM8Xc` had the largest listed count, about 1.4K, followed by a Short at about 1.3K. The largest regular video had 52 listed views.
- Selected YouTube URL: https://www.youtube.com/shorts/nfxeo7wM8Xc . A video-detail read through agent-reach confirmed Millennium Robotics Lab as author, publication date 2026-11-09, duration 64 seconds, and 1,473 views at check time. These counts change and are not displayed as permanent rankings.
- Bilibili: https://space.bilibili.com/1161124651 . The owner supplied https://www.bilibili.com/video/BV1cNxs6TE8J , `第257话：凯伊新素体`, as the most popular upload. The owner reported 3,666 views, 389 likes, 320 favorites and 10 comments from 2026-11-10 09:09 Beijing time. Those counts were not independently verified and are not displayed. Public upload-list access returned HTTP 412.

English shows YouTube. Simplified Chinese shows Bilibili. This uses the language setting, not country detection. All profiles remain available in About.

## Loading correction

The removed custom loader required a second Load action, downloaded `iframe_api` and then `www-widgetapi.js` before creating an iframe, and hid the iframe until an API callback arrived. Changing its timeouts did not remove those dependencies. The implementation now inserts a visible standard `https://www.youtube.com/embed/VIDEO_ID` iframe immediately when Videos opens. There is no parent-page YouTube script, custom overlay, callback gate, or loading timer. Referrer policy is set before navigation. Hovering or focusing Videos warms the YouTube and thumbnail-host connections without downloading portfolio media. Closing removes the iframe and stops playback.

Autoplay remains disabled. Media is requested when Videos opens, not during room initialization. The iframe uses `enablejsapi=1` with the exact page origin, allowing browser QA to read player state without a parent API script; no production readiness callback controls visibility. YouTube supplies its own player controls and native error display. A direct video link remains available.

Reference: https://developers.google.com/youtube/player_parameters . No video, audio, or thumbnail file is bundled. The former local thumbnail was removed. Original media remains on the respective platforms and belongs to its rights holders.

## Verification

- The new lifecycle regression failed on the custom loader with `EXTRA_LOADING_GATE`: opening Videos did not start an iframe. It passes on the native embed, including visible iframe configuration, absence of the parent API script and custom button, close cleanup, and Chinese selection.
- A direct YouTube embed on the actual public page reported readiness at 3,771 ms in the test browser, with no parent API scripts. This is a single browser measurement, not a guarantee for other networks or a controlled before/after benchmark.
- Test-time probes are not included in the deployed application. The regression uses the real panel implementation and does not replace YouTube with a fake player or treat a synthetic callback as playback evidence.
- Actual native-player verification in an isolated browser: clicked YouTube's own Play button, observed buffering state `3`, then playing state `1` with current time `13.262852` seconds. The parent document loaded zero YouTube API scripts. No synthetic player callback was used for that check.
