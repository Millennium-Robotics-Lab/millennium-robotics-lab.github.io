# Arisu cursors

Arisu cursor artwork by ben404. The site owner confirmed permission to use it.
Source: `/home/krisspy/Downloads/FESInstall.rar`.
Nested archive: `FES_Install/Aris/ani.rar`.

Each PNG uses the first 32 × 32 CUR frame embedded in the matching ANI file:
`Normal.ani`, `Link.ani`, `Text.ani`, `Precision.ani`, and `Help.ani`.
The PNGs are enlarged to 48 × 48 using nearest-neighbor scaling for pixel art.
The conversion preserves transparency and scales the source click position (hotspot).
`animation.json` includes all eight source frames for each variant, enlarged
to 48 × 48, with the ANI playback order and frame durations (100 ms).
`cursor.js` preloads these images and cycles the native CSS cursor images.
It pauses when the page is hidden and uses the static PNGs for reduced motion,
without JavaScript, or if animation loading fails.
The About page credits ben404 in English and Simplified Chinese.

| File | Click position (x, y) |
| --- | --- |
| `default.png` | 2, 2 |
| `pointer.png` | 6, 2 |
| `text.png` | 5, 12 |
| `games.png` | 8, 8 |
| `about.png` | 2, 2 |

Games links use the crosshair variant (reference row 2, column 5).
About links use the question-mark variant (reference row 1, column 2).
These mappings apply to both the room hotspots and navigation links.

To replace the artwork, convert its cursor files to transparent
PNGs and replace the matching files. Update the click positions in `/cursor.css`
to match those files. Use the actual tip position, measured from the top left.
Change the stylesheet version in both HTML pages when replacing assets.
Update the About credit and these source notes when replacing the artwork.

The shared stylesheet applies custom cursors to mouse input on both pages.
Native cursor keywords provide fallbacks if the images cannot load.
