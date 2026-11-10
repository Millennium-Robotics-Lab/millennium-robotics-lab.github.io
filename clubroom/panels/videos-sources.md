# Videos panel sources

Checked 2026-11-10.

- YouTube: https://www.youtube.com/@project-arisu
- Bilibili: https://space.bilibili.com/1161124651

Both channel URLs are supplied as verified links in the assignment and match
`clubroom/portfolio.js`. The displayed handle and numeric identity come from
those URLs. No channel display name, upload count, video title, thumbnail,
publication date, or video URL is claimed.

Direct web reads returned “Online fetch throttled” for YouTube and “not
accessible via this tool” for Bilibili. Search did not return usable channel
metadata. This does not establish that either channel has no videos.
The panel therefore provides channel discovery and an honest empty local
selection. It makes no external requests and contains no media assets.

Integration: registers the same renderer in the requested `MRL_videosS` and the
checkout's existing `MRL_PANELS` dispatcher. No onOpen hook is needed.
The existing no-JS section can remain as the channel-link fallback.
