# Tools panel sources and integration

Verified on 2026-11-10 through public GitHub pages in the browser. Repository metadata can change. These checks establish published descriptions and link destinations, not runtime quality of the linked software.

## Sources

- Organization: https://github.com/Millennium-Robotics-Lab . Its public list contained BlueCafe, BlueOffice, momocord, and the homepage repository. The panel selects the three tool or experiment repositories; it does not use popularity counts.
- BlueCafe: https://github.com/Millennium-Robotics-Lab/bluecafe . README at observed head `018fcae` describes a Unity desktop cafe layout editor. The Run section requires a separately prepared asset folder. The Notices section says game content is excluded and no project-wide source license has been selected. The panel preserves both limitations.
- BlueCafe releases: https://github.com/Millennium-Robotics-Lab/bluecafe/releases . The page offered `v0.1.1` at `d0540b7` with download instructions and release limitations. The panel links this release listing, not a source archive disguised as an app download. It makes no stable-release, platform-support, or acceptance claim. The README's inline Releases link still used the former Millennium-GDD namespace; the panel uses the verified current namespace.
- BlueCafe documentation: https://github.com/Millennium-Robotics-Lab/bluecafe#run . This is the README's startup and asset setup guidance, not a separate documentation website.
- BlueOffice: https://github.com/Millennium-Robotics-Lab/blueoffice . README at observed head `e291910` describes a planned local, game-like office for AI assistants. It explicitly says main is a clean baseline with no runnable application or product release. The panel links source and README documentation, without a download action.
- momocord: https://github.com/Millennium-Robotics-Lab/momocord . GitHub identifies it as a fork of U1805/momotalk, with observed head `ac9a92b`. Its README describes MomoTalk Editor as a Blue Archive-style web chat generator. The panel identifies the fork and credits its upstream. No fork-specific feature or release claim is made.
- momocord documentation: https://github.com/Millennium-Robotics-Lab/momocord/blob/main/docs/How-to-use.md . The page rendered its usage guide, with file commit `75425cc`.
- momocord upstream: https://github.com/U1805/momotalk . The page resolved as the MomoTalk Editor repository. This link is explicitly labeled as upstream, not a club-hosted app.

No screenshots, game assets, remote embeds, fonts, or downloaded binaries are included. The panel requests no portfolio media or GitHub API data. Links are available in both languages without country detection.

## Data extension

`data.projects.tools` may contain additional project objects. Text fields `title`, `description`, and `note` accept strings or `{ en, zh }` objects. Missing translations fall back to English, then Chinese. Entries without a usable title are omitted.

Links use explicit fields: `sourceUrl`, `downloadUrl`, `documentationUrl`, and `upstreamUrl`. A legacy `url` is labeled “Project page”; it is not assumed to be source or a binary download. Duplicate destinations within one entry are omitted. Supply only verified links. Missing actions remain absent.

The parent stores the initial selection in `portfolio.js` as `featuredTools`, separate from panel rendering. A matching `id` (`bluecafe`, `blueoffice`, or `momocord`) or matching source URL merges an entry into the built-in selection. Other entries append. Merging does not mutate supplied data. To remove an inherited field, explicitly set it to `null`. Text uses `textContent`; unsafe URL schemes are omitted. Local relative links and HTTPS links are supported. Media fields are intentionally not rendered.

The supplied contract names `MRL_toolsS`. This checkout's `app.js` calls `MRL_PANELS`. The module registers the same renderer in both, without changing shared files. There is no `onOpen` hook or media request, so a direct-link open before initial render needs no initialization. All CSS selectors begin with `#tools`.

## Suggested no-JavaScript replacement

The current fallback still shows its placeholder. Parent can replace only the existing tools section with this HTML. It uses the existing English fallback convention. Do not add shared `data-projects`, `data-links`, or `data-copy` attributes to this replacement; the renderer owns its translated children. Parent should update shared asset cache versions when integrating.

```html
<section id="tools" class="portfolio-section" aria-labelledby="tools-title">
  <h2 id="tools-title">Tools &amp; open source</h2>
  <p class="tools-intro">Explore our public code, creative tools, and experiments.</p>
  <div class="tools-list">
    <article class="tools-entry">
      <h3>BlueCafe</h3>
      <p class="tools-description">A desktop cafe layout editor built with Unity.</p>
      <p class="tools-note">Game assets are supplied separately. No project-wide source license has been selected.</p>
      <div class="tools-actions">
        <a href="https://github.com/Millennium-Robotics-Lab/bluecafe" target="_blank" rel="noopener noreferrer">Source ↗</a>
        <a href="https://github.com/Millennium-Robotics-Lab/bluecafe/releases" target="_blank" rel="noopener noreferrer">Downloads &amp; release notes ↗</a>
        <a href="https://github.com/Millennium-Robotics-Lab/bluecafe#run" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
      </div>
    </article>
    <article class="tools-entry">
      <h3>BlueOffice</h3>
      <p class="tools-description">A planned local, game-like office for AI assistants.</p>
      <p class="tools-note">The main branch is a project baseline, with no runnable app or product release.</p>
      <div class="tools-actions">
        <a href="https://github.com/Millennium-Robotics-Lab/blueoffice" target="_blank" rel="noopener noreferrer">Source ↗</a>
        <a href="https://github.com/Millennium-Robotics-Lab/blueoffice#readme" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
      </div>
    </article>
    <article class="tools-entry">
      <h3>momocord</h3>
      <p class="tools-description">Our fork of U1805/momotalk, a Blue Archive-style chat generator.</p>
      <div class="tools-actions">
        <a href="https://github.com/Millennium-Robotics-Lab/momocord" target="_blank" rel="noopener noreferrer">Source ↗</a>
        <a href="https://github.com/Millennium-Robotics-Lab/momocord/blob/main/docs/How-to-use.md" target="_blank" rel="noopener noreferrer">Documentation ↗</a>
        <a href="https://github.com/U1805/momotalk" target="_blank" rel="noopener noreferrer">Upstream project ↗</a>
      </div>
    </article>
  </div>
  <p class="tools-all"><a href="https://github.com/Millennium-Robotics-Lab" target="_blank" rel="noopener noreferrer">All repositories on GitHub ↗</a></p>
  <a class="static-close" href="#">Back to the clubroom</a>
</section>
```

## Verification

- `node --check clubroom/panels/tools.js` and `git diff --check` passed.
- Served this worktree on temporary port `39187`. Inspected the actual shared dialog through `/clubroom/#tools`, including the initial direct-link render.
- Visually inspected English at 1280×800 and Simplified Chinese at 896×414 CSS pixels. At 896×414, both languages had no horizontal dialog overflow. The panel remained 640 pixels wide and centered at x=128, y=24. Chinese content scrolled from 0 to 411 pixels, with the final GitHub link reachable.
- Verified 44-pixel minimum action height, hidden JavaScript fallback return link, translated titles and actions, distinct action destinations, and `target="_blank"` with `noopener noreferrer`.
- Verified Escape close, return-control close, restored Tools navigation focus, and Shift+Tab / Tab wrapping between the close and return controls.
- Browser fixture checks passed: additional entries, ID override, repeated English/Chinese render without duplicates, rejected `javascript:` and `data:` links, literal HTML text, and unchanged sibling sections. Fixture content was not saved.
- No panel images, videos, or iframes were mounted. No console errors appeared in the local rendering snapshot.
- No physical-device testing, linked-app runtime testing, binary downloads, or reduced-motion emulation was performed. The panel introduces no motion and leaves shared motion behavior unchanged.

## Parent integration

The merged site uses only `MRL_PANELS`. Initial tool content lives in `portfolio.js` as `featuredTools`. The static Tools fallback and asset cache versions were updated during integration.
