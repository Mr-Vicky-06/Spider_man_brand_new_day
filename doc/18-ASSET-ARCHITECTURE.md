# 18 — Asset Architecture

## Folder structure
```
public/
├── frames/
│   ├── city/{tier}/frame-0001.webp ...
│   ├── peter/{tier}/...
│   ├── swing/{tier}/...
│   └── finale/{tier}/...          # tier ∈ {desktop, tablet, mobile}
├── img/
│   ├── mask-unmasked.webp
│   ├── mask-masked.webp
│   └── spidersense-base.webp
├── audio/
│   ├── ambience/
│   └── sfx/
└── fonts/                          # self-hosted Bebas Neue + Inter, OFL-licensed
```

## Naming convention
`{scene}-{descriptor}-{index}.{ext}` for sequences (e.g., `swing-arc-0142.webp`),
zero-padded to 4 digits to sort correctly and match up to 9999 frames headroom.
Static images: `{scene}-{purpose}.webp`. No spaces, no capitals, hyphens only —
matches the existing repo's `monarch-human.webp` / `monarch-awakened.webp`
convention exactly.

## Image specifications
WebP throughout (matches existing repo's format choice, confirmed still
current best practice for broad browser support with strong compression).
Desktop tier: 1920×1080. Tablet: 1280×720. Mobile: 854×480. Quality 80 for
sequences (motion masks compression artifacts), quality 90 for the two static
Mask-scene hero images (held on screen longer, artifacts more visible).

## Frame-sequence specifications
Per-sequence frame counts are a creative/budget decision made once actual
footage/renders exist, not invented here — `19-ASSET-MANIFEST-SPEC.md` defines
the schema that will hold whatever the real numbers turn out to be.

## Asset metadata format
See `19-ASSET-MANIFEST-SPEC.md`.

## Preload / loading strategy
- Scene 01's first frame is eagerly loaded (render-blocking, small, sets the
  initial paint).
- Remaining Scene 01 frames + Scene 02's first frame preload during Scene 01's
  scroll (idle-time fetch, matches `useAtlas`'s existing streaming-safe design
  — draws nearest already-decoded frame while the rest arrive).
- Scenes 03–06 lazy-load on approaching viewport (`IntersectionObserver`
  rootMargin lookahead), not all at once at page load.
- Mobile tier loads mobile-resolution frames only — tier is decided once at
  load by `PerformanceManager`, not switched mid-session.

## Compression / memory management
`pack_frames.py` (existing script) extended to output three tiers instead of
one. Decoded-frame memory is bounded per scene since only the active scene's
sequence stays fully resident — previous scenes' `<img>` objects are eligible
for GC once their component unmounts (this falls out naturally from React
unmounting scenes that scroll out of the lookahead window, not a manual cache
eviction system that needs separate testing).
