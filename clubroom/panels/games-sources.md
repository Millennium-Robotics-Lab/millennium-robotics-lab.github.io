# Games panel sources and integration

Checked on 2026-11-10. No game entries or media assets were added.

## Source review

The connected GitHub repository search for organization `Millennium-Robotics-Lab` returned four public repositories:

- https://github.com/Millennium-Robotics-Lab/bluecafe
- https://github.com/Millennium-Robotics-Lab/momocord
- https://github.com/Millennium-Robotics-Lab/blueoffice
- https://github.com/Millennium-Robotics-Lab/millennium-robotics-lab.github.io

Primary sources read through the GitHub connector:

- https://github.com/Millennium-Robotics-Lab/bluecafe/blob/main/README.md describes a desktop cafe layout editor built with Unity. It is not presented as a standalone game. The README has a build link; this review did not run a build.
- https://github.com/Millennium-Robotics-Lab/momocord/blob/main/README.md describes a web chat generator and editor. It is not presented as a game.
- https://github.com/Millennium-Robotics-Lab/blueoffice/blob/main/README.md describes a planned local office for AI assistants. It explicitly says the main branch has no runnable application or product release. An archived prototype does not verify a published game.
- The fourth repository is this homepage. Its supplied `projects.games` array is empty.

No playable game was verified from these sources. This is a limited source review, not proof that the club has never made a game.

The following verified profile destinations came from the task and existing `portfolio.js`:

- GitHub: https://github.com/Millennium-Robotics-Lab
- YouTube: https://www.youtube.com/@project-arisu
- Bilibili: https://space.bilibili.com/1161124651
- X / Twitter: https://x.com/projectarisu

Channel-content limitations: public fetch of YouTube was throttled, Bilibili was inaccessible, and X returned HTTP 403. The Agent Reach YouTube read timed out after 25 seconds. Its Bilibili reader accepts individual videos, not profile URLs. Indexed searches did not provide a relevant verified game entry. No channel content, game title, release date, or play URL was inferred from these failures. Profile links stay visible in both languages without country checks.

## Module integration

The requested `MRL_gamesS.games` and the existing shared app's `MRL_PANELS.games` reference the same renderer. Other registry entries remain intact. No `onOpen` hook is needed, so direct-link opening before first render does not request anything.

Future entries use the existing shared project fields:

- `title`: required string or `{ en, zh }`; entries without a usable title are skipped.
- `description`: optional string or `{ en, zh }`.
- `status`: optional `published`, `development`, `prototype`, `demo`, `planned`, or `archived`. Unknown or omitted states produce no status claim.
- `url`: optional HTTPS URL or same-origin URL. The action says “View project”, never “Play”.
- `image`: optional same-origin URL. No image element or image request exists until the visitor activates its load button. External images are omitted, matching the shared app's media policy.
- `imageAlt`: optional string or `{ en, zh }`, with the title as fallback.

Text uses DOM text content. Credentials and unsafe URL schemes are rejected. Images do not autoplay. Language changes rebuild the section and reset any loaded image. Test fixtures were injected only into a temporary browser session, not saved as project data.

## Suggested no-JavaScript fallback

Parent should replace only the existing Games section in `clubroom/index.html` with the markup below. Do not retain the old `data-copy="gamesIntro"` or `data-copy="gamesEmpty"` attributes: their shared translations still describe a development placeholder. This panel commit does not edit shared HTML or shared copy.

```html
<section id="games" class="portfolio-section" aria-labelledby="games-title">
  <h2 id="games-title">Games</h2>
  <div class="games-empty">
    <h3>No published game entries yet.</h3>
    <p>Explore our public repositories and channels in the meantime.</p>
  </div>
  <div class="games-links" role="group" aria-label="Public work and channels">
    <a href="https://github.com/Millennium-Robotics-Lab" target="_blank" rel="noopener noreferrer" aria-label="GitHub, opens in a new tab">GitHub</a>
    <a href="https://www.youtube.com/@project-arisu" target="_blank" rel="noopener noreferrer" aria-label="YouTube, opens in a new tab">YouTube</a>
    <a href="https://space.bilibili.com/1161124651" target="_blank" rel="noopener noreferrer" aria-label="Bilibili, opens in a new tab">Bilibili</a>
    <a href="https://x.com/projectarisu" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter, opens in a new tab">X / Twitter</a>
  </div>
  <a class="static-close" href="#">Back to the clubroom</a>
</section>
```

## Verification

- `node --check clubroom/panels/games.js` and `git diff --check` passed.
- Used a temporary static server on port 18743. Inspected the real shared dialog with the Games module loaded.
- Visually checked English and Simplified Chinese empty states in the shared preview. Confirmed heading/section labels, all four links, and the hidden `.static-close` fallback.
- Confirmed the 640px dialog fits a browser viewport of 896×414. A long temporary entry list scrolls inside the dialog without horizontal overflow.
- In an isolated `agent-browser` session at 896×414, verified future-entry localization, known status labels, malformed-entry skipping, literal rendering of HTML-like titles, and unsafe-link rejection.
- Verified that project images do not exist before activation. After scrolling to the image control and clicking, a same-origin test image loaded. A deliberately missing image produced an announced error and enabled retry.
- Verified Tab wraps from the shared return control to Close. Escape closes the panel. After opening through navigation, focus returns to Games. Browser back closes the panel and forward reopens it.
- Shared-preview click automation timed out on an image control. The isolated browser successfully activated it after scrolling. No test fixtures or screenshots were added to site data.
- Did not test physical devices, run repository application builds, or validate unavailable channel content. No animation, device routing, shared room styling, or autoplay behavior was added or changed.

## Parent integration

The merged site uses only `MRL_PANELS`. The static Games fallback and asset cache versions were updated during integration.
