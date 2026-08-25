# 23 — Performance Spec

## Tiers
```
TIER A — desktop/laptop, good GPU        → full experience
TIER B — tablet, mid GPU                 → reduced frame counts, full shader
TIER C — mobile, low/mid GPU              → reduced frames, CSS-filter spider-sense, no rain
TIER D — reduced-motion (any device)     → static fallback frames everywhere, no continuous animation loops
```

## Targets
| Metric | Target | Note |
|---|---|---|
| LCP | < 2.5s on Tier A/B, < 3.5s on Tier C | first frame of Scene 01 is the LCP element — keep it small and priority-loaded per `18-ASSET-ARCHITECTURE.md` |
| CLS | < 0.05 | sticky-stage sections have fixed height from first paint (matches existing repo's pattern — no layout shift as canvases size) |
| INP | < 200ms | no heavy synchronous work on any input handler — scroll handler stays a passive listener that only sets a ref, exactly as `useScrollProgress` already does |
| JS bundle | no meaningful increase over current (React 19 + Vite baseline) — zero new runtime deps per `01-ARCHITECTURE-DECISION.md` | |
| FPS during scroll | ≥ 50fps Tier A/B, ≥ 30fps Tier C | profiled per-scene, Swing scene is the risk case flagged in `04-STORYBOARD.md` |
| Frame-sequence memory | bounded to ~1–2 scenes' worth resident at once | falls out of the lazy-mount/unmount strategy in `18-ASSET-ARCHITECTURE.md`, not a manually-managed cache |
| Mobile total asset payload | target < 15MB for the full scroll (Tier C frame counts) | swing sequence is the biggest line item, gets the most aggressive reduction |

## Strategies
Preload (Scene 01 first frame only, eager), lazy-load (all other scenes,
viewport-lookahead), tiered assets (per manifest), device-capability detection
(once, at load), GPU fallback (spider-sense shader → CSS filter), memory
cleanup (falls out of component unmount, no manual eviction system to build
and debug separately).
