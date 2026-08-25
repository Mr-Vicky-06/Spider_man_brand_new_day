# 01 — Repository Analysis
Source: https://github.com/Meghamittal0920/solo-leveling- (cloned and read directly, not assumed)

## Stack
React 19.2 + Vite 8, `oxlint`. **No animation/3D libraries at all** — no GSAP, no
Framer Motion, no Three.js/R3F, no Lenis. Every effect in this repo is hand-built
Canvas 2D or WebGL2. `puppeteer-core` + three scripts (`shot-reveal.mjs`,
`shots.mjs`, `shots-mobile.mjs`) exist purely for taking QA screenshots — not part
of the runtime.

## File-by-file
| File | LOC | What it does | Verdict |
|---|---|---|---|
| `src/App.jsx` | 156 | 3 sections (`AwakenSection`, `MonarchSection`, `RevealSection`) composed in `<main>`, each a sticky-scroll stage | **Replace** — content and section list are Solo-Leveling-specific, but the *composition pattern* (section → sticky stage → progress ref → canvas + UI overlay) is exactly right and should be kept |
| `src/lib/useInView.js` | 76 | `useInView` (IntersectionObserver), `useScrollProgress` (rAF-measured 0–1 scroll fraction via `getBoundingClientRect`, never touches React state in the scroll handler), `useSampled` (coarse-samples a progress ref into state for UI that needs to re-render, e.g. a meter) | **Keep as-is.** This is the load-bearing primitive for the whole site and is already correct: no scroll-jank, no unnecessary re-renders |
| `src/lib/useAtlas.js` | 71 | Loads a named frame-sequence's manifest + images, exposes `framesRef`/`loadedRef` (streaming-safe: draws the nearest already-decoded frame while later ones arrive) | **Keep and extend.** Needs a manifest schema upgrade (see Phase 9) but the loading strategy is sound |
| `src/components/FrameCanvas.jsx` | 179 | Canvas-2D frame-sequence player: eases toward a target progress on its own rAF loop, cross-dissolves adjacent frames while moving, resolves to a single sharp frame at rest, supports position-mapped indexing (`dragonX`) for unevenly-spaced sequences, `cover`/`contain` fit, DPR clamp ≤2, pauses on `visibilitychange`, honors `prefers-reduced-motion` | **Keep — this is the crown jewel.** Do not rewrite. The `dragonX` positional-index feature (built for the dragon sweeping across frames at variable speed) is structurally identical to what a web-swing or camera-rig scene needs |
| `src/components/RevealStage.jsx` | 172 | Pointer/touch-driven wipe between two full-bleed images (human ↔ awakened) | **Adapt.** Wipe mechanic reuses directly for a mask on/off or human/suit reveal; only the two source images and copy change |
| `src/components/GlyphRain.jsx` | 131 | Falling Korean/Japanese glyph columns, canvas-rendered | **Replace outright.** Thematically tied to Solo Leveling's text motif; a Spider-Man equivalent (procedural rain streaks, or a faint web-lattice shimmer) is a different visual grammar, not a reskin |
| `src/components/Thunder.jsx` | 184 | Randomly-timed full-viewport lightning-flash overlay | **Replace.** Could inspire a "spider-sense pulse" flash system but the implementation intent (storm ambience) doesn't map to spider-sense (a targeted, directional warning, not ambient weather) |
| `src/components/SplashCursor.jsx` | 1090 | WebGL2 fluid-simulation cursor trail (full Navier-Stokes-style solver: advection, pressure, curl, vorticity) | **Replace, don't adapt.** It's technically the most impressive file in the repo, but a general ink/fluid sim reads as magic/liquid, not web-fluid or spider-sense distortion. Heavy (biggest file by far) and its shader pipeline is overkill for what a spider-sense or web-shooter cursor effect actually needs. Worth mining for its resize/pointer-tracking plumbing, not its visual output |
| `src/index.css` | 263 | Hand-written cascade, no framework | **Replace tokens, keep methodology** — plain CSS with custom properties is the right approach for a performance-first site; swap the Solo Leveling palette/type scale for the Spider-Man one |
| `public/frames/` | 12 MB | The `awaken` and `monarch` frame sequences (WebP, per the pack script) | N/A — Solo-Leveling-specific imagery, not reusable content, but confirms the target format (WebP frame atlases) |
| `scripts/pack_frames.py` | — | Frame-sequence packing/optimization pipeline | **Keep and extend** for the new asset pipeline |

## What this means for scope
Because there's no GSAP/Three.js in the existing stack, "keep the interaction
engine, replace the design language" is achievable **without adding a single new
runtime dependency** if the Spider-Man scenes stay Canvas-2D + DOM/CSS (web-swing
parallax, spider-sense distortion, mask wipe all fit this). Introducing
Three.js/WebGL for a true 3D camera rig (Phase 8's `CameraController`) is the one
place that would be a real architectural addition, not an extension — flagged as
a Phase-2 research/decision item, not assumed.

## Reused vs. new (headline table)
| Keep as-is | Adapt | Replace |
|---|---|---|
| `useScrollProgress`, `useSampled`, `useInView` | `RevealStage` (wipe → mask reveal) | `GlyphRain`, `Thunder`, `SplashCursor` |
| `FrameCanvas` core engine + `dragonX` positional indexing | `useAtlas` (manifest schema upgrade) | Solo Leveling copy, glyphs, palette, section content |
| CSS-custom-property methodology | `pack_frames.py` pipeline | — |
