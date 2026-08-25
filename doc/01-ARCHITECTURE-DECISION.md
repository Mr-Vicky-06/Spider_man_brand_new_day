# 01 — Architecture Decision: Canvas 2D vs WebGL vs Three.js/R3F

## Decision (hybrid, boundaries explicit)
```
Canvas 2D   → cinematic frame sequences (City, Peter, Mask, Web/Swing, Finale) — via existing FrameCanvas, unchanged
Small custom WebGL  → spider-sense distortion + web-strand particles ONLY — one purpose-built shader each, not a general engine
DOM/CSS     → typography, navigation, HUD, all UI chrome, scene transitions between sections
```
**Three.js / React Three Fiber: rejected. WebGPU: rejected for now (see below).**

## Why, evaluated against the actual experience
The core content unit of this project is a **pre-rendered cinematic frame sequence** (photographed/rendered footage scrubbed by scroll), not a live 3D scene with free camera movement. That single fact drives the whole decision:

| Criterion | Canvas 2D (`FrameCanvas`) | Raw/custom WebGL (small, targeted) | Three.js / R3F |
|---|---|---|---|
| Fit for frame-sequence content | Exact fit — already built, already handles blending/streaming/positional indexing | Not needed for this content type | Wrong tool — you'd be faking pre-rendered footage inside a 3D scene graph for no benefit |
| Camera freedom | None needed — camera "movement" is simulated by which frame is showing, which is how the mask/swing sequences were shot | N/A | Real 3D camera freedom — but nothing in the storyboard needs an actual 3D scene, only the *appearance* of camera movement, which frame sequences already deliver |
| Bundle cost | 0 KB — already in the repo | A few hundred lines of hand-written GLSL, no library | Three.js core ~150KB+ min-gzip, R3F + drei add more; unjustifiable for a site with no persistent 3D objects |
| Implementation complexity | Already solved | Moderate — one shader per effect, scoped and disposable | High — scene graph, materials, lighting, camera rig, asset loaders, disposal/memory management all become new surface area |
| Mobile GPU risk | Low — 2D canvas, DPR-clamped already | Low, if effects stay small (single fragment shader, no post-processing chain) | High — mobile GPUs choke on generic 3D scenes with post-processing; would need its own fallback tier, duplicating what `FrameCanvas` already does for free |
| Debugging | Simple | Moderate | High — shader/scene-graph bugs across a whole 3D pipeline |
| Long-term maintainability | High — one well-understood file | High if scoped tightly | Lower — bigger dependency surface, more breaking-change risk across major-version bumps |
| Accessibility / reduced-motion | Already implemented (`prefers-reduced-motion` bypass to static frame) | Needs its own reduced-motion bypass (straightforward: skip the shader pass, show flat color/still) | Needs the same, but across a much larger render pipeline |

## Rejected alternatives and why
- **Raw full WebGL fluid sim (reusing `SplashCursor`'s engine):** technically the most sophisticated code in the repo, but it's a general-purpose Navier–Stokes-style solver — far more GPU cost than a spider-sense pulse or web-strand shimmer actually needs. A purpose-built shader (~50–150 lines) for each effect is cheaper, easier to reason about, and won't fight the frame-sequence canvases for GPU budget on mobile.
- **Three.js / R3F for the swing/camera scenes:** rejected specifically because the swing "camera movement" is intended to be a photographed/rendered sequence (same technique as the existing `monarch` dragon sequence, reusing `dragonX`-style positional indexing), not a live 3D flythrough. If a future creative revision wants true free-camera 3D (e.g., an interactive rooftop you can rotate), that would justify revisiting this decision — it's explicitly called out here as the one condition that would flip it.
- **WebGPU:** real and increasingly supported, but adopting it now means shipping a second render path anyway for the browsers without it — added complexity with no experience benefit here, since nothing in this project needs compute shaders or the performance ceiling WebGPU targets. Revisit only if a future effect genuinely needs GPU compute.

## Technical / asset / performance / migration implications
- **Technical:** the two small WebGL shaders live in their own components (`SpiderSenseLayer`, `WebStrandLayer`), each owning its own `<canvas>`, GL context, and disposal — they do not touch `FrameCanvas`'s canvas or context.
- **Asset:** no 3D models, no GLTF pipeline needed. Asset system stays 100% "frame sequence + static image + font + audio," which matches `18-ASSET-ARCHITECTURE.md`.
- **Performance:** two small canvases + N frame-sequence canvases is bounded and predictable; there's no scene-graph memory growth to manage, which removes an entire category of leak risk.
- **Migration:** zero migration cost for the existing engine — `FrameCanvas`, `useAtlas`, `useScrollProgress`, `useSampled` carry forward unchanged, satisfying the "profile before rewriting" engineering rule by construction (nothing here requires rewriting it).
