# 09 — Spider-Sense System

## States
```
IDLE → AWARE → WARNING → THREAT → PEAK → RECOVERY → (back to IDLE, scene exits)
```
This state machine only exists inside Scene 04; it does not persist globally
(no site-wide "spider-sense mode" toggle) — keeping it scoped avoids a class of
bugs where global state leaks into scenes that shouldn't know about it.

| State | Trigger | Visual | Audio | Camera |
|---|---|---|---|---|
| IDLE | Scene not yet in view | none | none | none |
| AWARE | Scene enters viewport (`useInView`, existing hook) | faint `--electric-blue` vignette, barely visible | ambience continues unchanged | static |
| WARNING | scroll progress crosses ~0.3 | vignette intensifies, first distortion ripple | low tone fades in | static |
| THREAT | scroll progress crosses ~0.6 | full-frame distortion shader active | tone peaks | subtle 1-frame jolt (see camera system "impact") |
| PEAK | scroll progress crosses ~0.85 | distortion at maximum, single sharp flash | short sting, immediate mute after | jolt resolves |
| RECOVERY | scroll continues past scene | distortion fades to nothing over ~0.5s | silence | resolves into Scene 05's opening |

## Distortion implementation
One small custom fragment shader (per `01-ARCHITECTURE-DECISION.md` — not
Three.js, not the `SplashCursor` fluid engine): a radial chromatic-shift +
subtle screen-space warp, `--electric-blue` tinted only, driven by a single
`uIntensity` uniform mapped directly from scroll progress within the scene's
0–1 range (no separate timer/animation loop needed — reuses the same
scroll-progress ref pattern as everything else).

## Cooldown
None needed — the state machine is purely a function of scroll position, so
scrolling back up naturally reverses through the states. No timer-based
cooldown logic to write or debug.

## Mobile / reduced-motion
- **Mobile (Tier C):** shader uniform sample count reduced, or shader replaced
  entirely with a CSS `filter: hue-rotate() + contrast()` animation on the
  underlying still frame — visually cruder but avoids a WebGL context on
  lower-end devices where a second GL context (alongside `FrameCanvas`'s 2D
  context) risks context-loss issues.
- **Reduced motion:** distortion becomes a single instant color-shift (no
  animated warp), matching the project-wide rule that motion is removed, not
  content.
