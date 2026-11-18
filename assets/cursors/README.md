# Arisu cursors

Arisu cursor artwork by ben404. The site owner confirmed permission to use it.
Source: `/home/krisspy/Downloads/FESInstall.rar`.
Nested archive: `FES_Install/Aris/ani.rar`.

Each PNG uses the first 32 × 32 CUR frame embedded in the matching ANI file:
`Normal.ani`, `Link.ani`, and `Text.ani`.
The conversion preserves transparency and the source click position (hotspot).
The source animation is not included in this static implementation.
The About page credits ben404 in English and Simplified Chinese.

| File | Click position (x, y) |
| --- | --- |
| `default.png` | 1, 1 |
| `pointer.png` | 4, 1 |
| `text.png` | 3, 8 |

To replace the artwork, convert its cursor files to transparent
PNGs and replace these three files. Update the click positions in `/cursor.css`
to match those files. Use the actual tip position, measured from the top left.
Change the stylesheet version in both HTML pages when replacing assets.
Update the About credit and these source notes when replacing the artwork.

The shared stylesheet applies custom cursors to mouse input on both pages.
Native cursor keywords provide fallbacks if the images cannot load.
