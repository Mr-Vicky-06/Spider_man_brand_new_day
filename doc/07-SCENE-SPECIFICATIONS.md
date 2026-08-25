# 07 — Scene Specifications (technical)

| | Scene 01 City | Scene 02 Peter | Scene 03 Mask | Scene 04 Spider-Sense | Scene 05 Swing | Scene 06 Brand New Day |
|---|---|---|---|---|---|---|
| **DOM** | kicker, title, scroll-cue, meter | same pattern | head block, sub copy | minimal — mostly full-bleed | title only, minimal chrome | title, footer/disclosure line |
| **Canvas (2D)** | `FrameCanvas`, cover-fit | `FrameCanvas`, `dragonX` optional | — (uses two `<img>` via `RevealStage`) | 1 still frame underlay | `FrameCanvas`, `dragonX` required | `FrameCanvas` contain-fit or plain `<img>` |
| **WebGL** | none | none | none | **yes — distortion shader** | none (unless a web-strand shimmer overlay is added later) | none |
| **Assets** | 1 sequence | 1 sequence | 2 static images | 1 still + shader (no image asset) | 1 large sequence (biggest budget item) | 1 sequence or 1 static image |
| **State** | scroll progress (ref) | scroll progress (ref) | drag/tap progress (local state, low-frequency) | threshold-crossed boolean (derived from scroll ref, not new polling) | scroll progress (ref) | scroll progress (ref) |
| **Scroll** | standard sticky-stage | standard sticky-stage | **not scroll-driven** — pointer/touch | standard, but read as a trigger not a scrub | standard, longest section | standard |
| **Interaction** | none beyond scroll | none beyond scroll | pointer-drag / touch-drag wipe | none (passive trigger) | none beyond scroll | none |
| **Audio** | ambience loop, muted default | room tone | one-shot mechanical sound | one-shot rising tone | wind loop, scroll-mapped | ambience fade-out |
| **Performance flag** | low | low | low (2 static images, precache both) | medium — first WebGL scene, profile early | **highest — largest sequence, priority target for Tier B/C reduction** | low |
