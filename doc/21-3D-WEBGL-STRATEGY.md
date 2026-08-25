# 21 — 3D / WebGL Strategy

This document is a short pointer, not a re-derivation — the full reasoning
lives in `01-ARCHITECTURE-DECISION.md` and should be read there. Summary for
anyone jumping straight to "where's the WebGL":

- **WebGL is used in exactly one place:** the spider-sense distortion shader
  (`09-SPIDER-SENSE-SYSTEM.md`), a single small fragment shader with no
  library dependency.
- **Canvas 2D is used everywhere else** that isn't DOM/CSS — all six scenes'
  frame sequences run through the existing `FrameCanvas`.
- **Three.js / R3F: not used.** No 3D scene graph exists in this project.
- **WebGPU: not used**, revisit only if a future effect needs GPU compute
  that a fragment shader can't do.
- **Mobile fallback for the one WebGL use:** CSS filter substitute on
  lower-tier devices, avoiding a second GL context risk alongside
  `FrameCanvas`'s 2D contexts.
