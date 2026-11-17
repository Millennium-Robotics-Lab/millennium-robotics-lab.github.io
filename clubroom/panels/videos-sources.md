# Video cards and thumbnail sources

Videos uses the same `cards.js` renderer and `cards.css` layout as Tools: one thumbnail, title, and link group per item. No item is rendered as a special platform panel. There are no iframe, video, audio, YouTube API, preconnect, loading gate, or retry components. Opening a panel requests local thumbnail files only. Links open the actual media platforms in a new tab. The no-JavaScript fallback uses the same cards.

## Content

The owner supplied all four links for manga animation, Global episode 264:

- Chinese Bilibili video: https://www.bilibili.com/video/BV1MmWC6YEmx/
- English video reply on X: https://x.com/projectarisu/status/2121432139111748059
- Japanese short post on X: https://x.com/projectarisu/status/2121433136890532176
- Japanese YouTube Short: https://www.youtube.com/shorts/wQ8USDfF8OI

All four are retained in portfolio data. The English card shows the English/Japanese X and YouTube links. The Chinese card shows only the Chinese Bilibili link. The existing language-specific video is another card in the same list: Japanese episode 246 (`nfxeo7wM8Xc`) in English, Chinese episode 257 (`BV1cNxs6TE8J`) in Chinese. No engagement counts or live popularity claims are displayed.

## Images

Downloaded 2026-11-17, resized to fit 640×360 without cropping, and compressed as WebP with quality 82. Images are not generated or reconstructed.

- `assets/portfolio/manga-264.webp`: https://i.ytimg.com/vi/wQ8USDfF8OI/maxresdefault.jpg . The Japanese episode 264 upload's original thumbnail represents that episode's variants.
- `assets/portfolio/manga-246.webp`: https://i.ytimg.com/vi/nfxeo7wM8Xc/maxresdefault.jpg . Original thumbnail of the existing Japanese upload.
- `assets/portfolio/manga-257.webp`: https://i1.hdslb.com/bfs/archive/9309ac4b3fd48add047881db20e23f984579ecc3.jpg . Obtained from the public Bilibili view metadata for `BV1cNxs6TE8J`, whose owner ID is 1161124651. Original title: `第257话：凯伊新素体`.

The originals remain owned by their respective rights holders. These small portfolio thumbnails do not grant redistribution rights to the underlying Blue Archive artwork or videos. No video or audio files are included.

## Checks

`tests/portfolio-cards.test.cjs` opens both Tools and Videos in English and Chinese. It requires every entry to use the same card structure with a decodable local image, title, and links. It checks all four episode links remain, closing restores focus, and no embeds or third-party resource requests occur. This replaces the obsolete embed tests; it does not simulate successful video playback.


## Language policy

`link-policy.js` centrally filters visible links, including thumbnail destinations. Chinese excludes overseas social/video platforms while retaining Bilibili and technical project/install destinations such as GitHub and Userstyles. English excludes Bilibili and its short links. No country detection is used. About and the original mobile page follow the same policy. The English static fallback has no Bilibili anchors; saved language is applied before paint to prevent the other language's platform links flashing during startup.
