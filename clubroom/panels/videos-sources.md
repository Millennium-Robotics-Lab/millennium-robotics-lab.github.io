# Featured videos

Checked 2026-11-10. Content is configured in `clubroom/portfolio.js`.

- YouTube channel: https://www.youtube.com/@project-arisu , channel ID `UCMVoEs4AWxaBn-K3Un3XFhQ`.
- Read the public `/videos` and `/shorts` listings with yt-dlp: 13 videos and 10 Shorts. Compared their listed view counts. The largest was Short `nfxeo7wM8Xc` (about 1.4K in the listing); the next Short was about 1.3K. The largest regular video had 52 listed views.
- Selected URL: https://www.youtube.com/shorts/nfxeo7wM8Xc . A separate video-detail read through agent-reach verified the author as Millennium Robotics Lab, publication date 2026-11-09, duration 64 seconds, and 1,473 views at check time. Counts change; the interface does not display a permanent popularity ranking.
- The Chinese card uses https://space.bilibili.com/1161124651 . The owner supplied https://www.bilibili.com/video/BV1cNxs6TE8J , titled `第257话：凯伊新素体`, as the most popular upload. The owner reported 3,666 views, 389 likes, 320 favorites and 10 comments from 2026-11-10 09:09 Beijing time. These counts were not independently verified and are not displayed. Live upload-list access was unavailable (HTTP 412); no further ranking check was attempted.

English shows only the YouTube card. Simplified Chinese shows only the Bilibili card. This selection uses the language setting, not country detection. All profiles remain available in About.

The Bilibili player mounts when Videos opens. YouTube mounts after the visitor selects Load video. Autoplay is disabled. Closing removes the iframe. The page includes one local YouTube thumbnail, with provenance below, and no video or audio files. Original media rights remain with their owners.

## Blank-player correction

The old renderer mounted an iframe immediately and treated its presence as success. A blocked or stalled third-party request left an empty dark rectangle. The regression test exercises provider error callbacks, an iframe that has not reported readiness, and readiness arriving after the former 10-second cutoff.

YouTube now uses its official IFrame Player API (`https://www.youtube.com/iframe_api`) and standard embed host. The local preview remains visible until `onReady`; API and player errors restore recovery controls. A slow-loading notice does not cancel the pending request or destroy the iframe. An iframe `load` event is not used as a readiness signal. The player starts loading only after “Load video” is selected, with autoplay disabled. The direct video link is always available. Closing cancels timers, destroys the player, and ignores late completion.

API reference: https://developers.google.com/youtube/iframe_api_reference . Player parameters: https://developers.google.com/youtube/player_parameters . The UI uses a landscape player viewport with a minimum height of 200 CSS pixels.

`clubroom/assets/youtube-featured.webp` is the original thumbnail downloaded by yt-dlp for `nfxeo7wM8Xc` on 2026-11-10, unchanged, approximately 75 KB. It is served locally when Videos opens. Media rights remain with their owners; caching the thumbnail does not grant rights to its underlying Blue Archive imagery. No video or audio file is included.

Local browser verification observed YouTube readiness, manual playback at state `1` and time `33.18` seconds, followed by completion at `63.641` seconds. This verifies playback in the test browser, not connectivity in every visitor's environment. Provider error recovery and delayed readiness are tested separately.


## Slow-readiness correction

The previous implementation rejected API loading after 8 seconds and destroyed the player after 10 seconds. The regression test failed with `SLOW_PLAYER_CANCELLED` when a provider delivered readiness after 12 seconds. Those hard cutoffs are removed. After 10 seconds the page shows a slow-loading notice and enables Retry while the current request remains valid. Only a provider error, an explicit Retry, a language/category change, or closing ends that player session. Retry explicitly restarts any pending API script. Provider error codes remain in the player element's `data-error` attribute, without being exposed as UI copy.

The shared browser loaded the real YouTube player with its readiness callback deliberately delayed by 12 seconds. It reached the visible ready state at 14,214 milliseconds. This confirms that the actual iframe survives the old cutoff. The automated test covers the same late-readiness pattern and provider error 150 with controlled callbacks; it makes no claim about every visitor's network connectivity.
