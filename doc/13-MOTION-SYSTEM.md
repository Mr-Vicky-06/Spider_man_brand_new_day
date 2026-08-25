# 13 — Motion System

## Duration scale
```
instant   0ms    (state flips with no transition — e.g. focus ring)
fast      150ms  (UI micro-feedback)
base      300ms  (standard fades, held-frame → next-scene handoff)
slow      600ms  (title reveals, mask-wipe midpoint sound sync)
cinematic 1200ms+ (spider-sense distortion resolve, swing's held final frame)
```

## Easing scale
```
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)   /* UI, general fades */
--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1)  /* held-frame settle, title reveal */
--ease-in-sharp: cubic-bezier(0.7, 0, 0.84, 0)  /* spider-sense onset — sudden, not soft */
```
The frame-sequence "camera" easing itself is **not** on this scale — it stays
as `FrameCanvas`'s existing per-instance `ease` prop (0.12–0.16, a continuous
lerp toward a moving target, not a fixed-duration transition), because it's
solving a different problem (scroll-scrub smoothing, not a discrete
state-to-state animation).

## Motion grammar
Every animation in the implementation must belong to one of these categories —
this is the enforcement mechanism the brief asked for:

| Category | Covers | Duration/easing |
|---|---|---|
| **WEB** | the SVG strand draw-on (`08-WEB-SYSTEM.md`) | `slow`, `ease-out-soft` |
| **SPIDER-SENSE** | distortion onset/peak/recovery (`09-SPIDER-SENSE-SYSTEM.md`) | onset `ease-in-sharp` fast, recovery `cinematic` `ease-out-soft` |
| **SWING** | frame-sequence scrub only — no separate CSS animation | `FrameCanvas` ease prop |
| **IMPACT** | single-frame camera jolt | `fast`, `ease-in-sharp` |
| **HUMAN** | Peter scene's minimal, near-static movement | frame-sequence only, no CSS layer |
| **CINEMATIC** | scene-to-scene held-frame → next-section handoff, title reveals | `slow`–`cinematic`, `ease-out-soft` |
| **ENVIRONMENT** | rain shader, ambient shimmer | continuous, not on the duration scale (looping, not triggered) |

Anything that doesn't fit one of these seven categories doesn't ship — this is
the same discipline as the "no animation without reduced-motion behavior" rule
in the implementation contract.

## Spring behavior
Not used. The project's existing easing (continuous lerp for scroll-driven
motion, cubic-bezier for discrete UI transitions) covers every case in the
storyboard — adding a spring physics model (e.g., a dependency like
`react-spring`) isn't justified by anything in the current scene list.
