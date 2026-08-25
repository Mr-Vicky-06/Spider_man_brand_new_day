# 14 — Effect System

| Effect | Purpose | Technology | Cost | Fallback | Scenes | Mobile |
|---|---|---|---|---|---|---|
| Procedural rain | ambient atmosphere, replaces `GlyphRain`'s slot | Canvas 2D, simple particle loop (not WebGL — a few hundred streaks is cheap on 2D) | low | static frame with a pre-baked rain overlay image | City, faintly in Swing | density halved (Tier B), disabled (Tier C) |
| Film grain | texture, "shot on film" feel | CSS `background` noise texture (tiny tileable PNG or SVG `feTurbulence`), not per-frame JS | very low | always-on, cheap enough to keep even at Tier C | all scenes, subtle | unchanged |
| Chromatic aberration | transition accent only | CSS `filter` or tiny fragment shader, transition-duration only (not persistent) | low | skip entirely | scene-to-scene transitions only | disabled |
| Lens/rim light sweep | mask reveal accent | CSS gradient animation tied to wipe position | low | static rim highlight, no sweep | Mask | unchanged |
| Spider-sense distortion | alert signal | small custom WebGL shader (`09-SPIDER-SENSE-SYSTEM.md`) | medium | CSS `hue-rotate`/`contrast` filter | Spider-Sense | shader → CSS filter fallback on Tier C |
| Web-strand shimmer | signature UI detail | SVG + CSS filter (`08-WEB-SYSTEM.md`) | very low | static strand, no filter | footer/transition accents | filter disabled |
| Impact jolt | camera punctuation | CSS transform micro-animation | very low | skip | Spider-Sense peak, Swing launch | unchanged |

No bloom, no reflections, no shadow-mapping — none of these are needed because
lighting and reflection are baked into the source footage/photography itself
(per `02-CREATIVE-DIRECTION.md`'s "practical, motivated light only" rule),
which is cheaper and more consistent than trying to fake them in real time.
