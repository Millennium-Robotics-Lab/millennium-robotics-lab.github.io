# Millennium Robotics Lab

千禧年机器人部 / MRL

Published at https://millennium-robotics-lab.github.io/ using GitHub Pages from `main`, root folder. No build or persistent server is required.

## Homepage selection

Mobile devices use the original link page at `/`. Desktop devices are redirected to the full-screen artwork interface at `/clubroom/`. Mobile visitors opening `/clubroom/` return to the original page. Device classification is independent of viewport size and orientation, and includes iPad desktop mode.

`device-routing.js` runs before page assets and preserves URL queries and fragments. Without JavaScript, `/` remains a usable original link page. YouTube, Bilibili, X, and GitHub are available in every region; no country lookup is performed.

## Edit

- `index.html`: original mobile homepage and channel links.
- `device-routing.js`: mobile/desktop selection.
- `language.js`: shared language selection and saved preference (English → 中文 → 日本語).
- `clubroom/index.html`, `style.css`, `app.js`: desktop artwork, furniture controls, and centered panels.
- `clubroom/portfolio.js`: verified platform links and project data.
- `clubroom/copy.js`: English, Simplified Chinese, and Japanese copy.
- `clubroom/assets/`: only the optimized artwork and small MRL icon required by the website.

The desktop Tools control is on the middle shelf. Furniture labels and hover areas have transparent backgrounds. Individual project arrays remain empty until real entries are supplied.

## Check locally

Both pages load `cursor.css` and `cursor.js` for animated 48-pixel Arisu cursors
with mouse input. Reduced-motion mode uses static cursors.
See `assets/cursors/README.md` for the source, click positions, and replacement
instructions. The About page credits ben404 for the cursor artwork.

```sh
node --test tests/device-routing.test.cjs
uv run --no-project python -m http.server 4173 --bind 127.0.0.1
```

The supplied artwork's source notes are in `clubroom/ASSET-SOURCES.md`. Original attachments, old bluecafe captures, private layout work, and local screenshot evidence are excluded from this deployment.
