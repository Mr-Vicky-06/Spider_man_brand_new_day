# 27 — Testing & QA (merges Testing Strategy / Visual QA / Performance QA)

Merged the three requested QA docs into one — a testing plan, a visual
checklist, and a performance checklist for the same six scenes are one
document's worth of content split three ways for no reader benefit.

## Browser/device testing matrix
Latest 2 versions of Chrome, Safari (incl. iOS Safari specifically, since it's
historically the strictest on autoplay/WebGL context limits), Firefox, Edge.
Device classes: one real device per responsive tier (A/B/C) minimum, not just
devtools emulation, especially for the Swing scene's frame-rate risk.

## Scene checkpoints (per scene, every scene)
- Loads to correct first-visible frame with no flash of unstyled/blank canvas
- Scroll-scrub tracks smoothly at each Tier
- Held-frame settle behavior resolves to a sharp single frame, no visible
  double-exposure at rest (this is `FrameCanvas`'s existing `settle` logic —
  verify it still holds with new sequences, don't assume)
- Reduced-motion fallback renders correctly and matches the specified static
  frame from `04-STORYBOARD.md`
- Scene-to-scene transition has no layout jump (CLS check)

## Screenshot checkpoints
Reuse the existing repo's Puppeteer scripts (`shots.mjs`, `shots-mobile.mjs`,
`shot-reveal.mjs`) — extend them to capture one screenshot per scene at
progress 0 / 0.5 / 1.0, desktop and mobile viewports, rather than writing a
new screenshot tool from scratch.

## Reduced-motion testing
Explicit test pass with OS-level `prefers-reduced-motion: reduce` enabled —
every effect in `14-EFFECT-SYSTEM.md`'s fallback column gets manually verified,
not just assumed from the code.

## Network / CPU / memory testing
- Slow 3G throttle: confirm the manifest's tiered loading doesn't block first
  paint even when later frames are still streaming (matches `useAtlas`'s
  existing streaming-safe design — verify it under real throttling, not just
  trust the architecture).
- CPU throttle (4x, in devtools): confirm Swing scene doesn't drop below the
  Tier-appropriate FPS target from `23-PERFORMANCE-SPEC.md`.
- Memory: scroll the full page top-to-bottom and back multiple times, confirm
  memory returns to baseline (validates the unmount-based cleanup strategy
  actually works, not just that it's architecturally supposed to).

## Accessibility testing
Keyboard-only pass (Tab through the whole page), screen-reader pass (VoiceOver
or NVDA, confirm scene narrative reads sensibly without visuals), contrast
check on all text/background pairs.

## Definition of "QA complete" for a scene
All of the above pass on at least one real device per tier, plus one keyboard-
only and one reduced-motion pass — before that scene is marked done in
`31-IMPLEMENTATION-ROADMAP.md`.
