# 06 — Camera System

## Model
There is no literal camera object anywhere in this project (per `01-ARCHITECTURE-DECISION.md`
— no Three.js, no scene graph). "Camera behavior" is entirely **simulated by
which frame of a pre-rendered sequence is showing**, exactly like the existing
`monarch` dragon sequence already simulates a sweep. This section defines the
vocabulary so shot lists and sequence briefs stay consistent, not a literal
coordinate-system camera.

## Camera vocabulary → implementation mapping
| Vocabulary | Meaning here | Implementation |
|---|---|---|
| Static | No implied camera movement, subject may move within frame | Single frame or narrow frame range at rest |
| Push / pull | Implied dolly toward/away from subject | Sequence authored with that movement baked into the footage; `FrameCanvas` scrubs through it |
| Pan / tilt | Implied lateral/vertical camera movement | Same — baked into the sequence, not computed |
| Swing / fall / whip | Large, fast implied movement | Longer sequence, `dragonX`-style positional indexing so scroll speed doesn't have to match frame-index linearly (this is precisely what that feature already solves) |
| Parallax | Foreground/background moving at different rates | CSS/DOM layers only (title text, UI chrome) moving at a different scroll-multiple than the canvas — cheap, no shader needed |
| Impact / shake | Sudden jolt | Small CSS transform micro-animation on the sticky-stage wrapper, single-fire, respects `prefers-reduced-motion` |
| Depth movement | Sense of moving through space | Achieved via sequence authoring (parallax layers within the source footage/render), not a real depth buffer |

## Scroll-to-camera mapping
Unchanged from the existing engine: `useScrollProgress` produces 0–1 per
section; `FrameCanvas` eases toward it (`ease` prop, per-scene tuned,
0.12–0.16 range matching existing sections) and resolves to a sharp single
frame at rest via its existing `settle` logic. No new interpolation system is
being built — the existing one already does exactly what's needed.

## Velocity, damping, transitions
- **Damping:** the existing `ease` lerp *is* the damping model — no new physics needed.
- **Velocity-driven effects** (e.g., swing wind sound) map to `|target − shown|` per frame, available for free from the existing loop without adding a physics library.
- **Scene-to-scene transitions:** a held frame (settle = 1) followed by the next section's sticky stage taking over — no crossfade-through-black or wipe between scenes, keeping the "one continuous timeline" feel from `03-EXPERIENCE-BIBLE.md`.

## Per-scene camera behavior summary
City: push. Peter: static/held-breath. Mask: N/A (interaction-driven, not scroll-driven). Spider-sense: static + distortion. Swing: whip/fall combined. Brand New Day: static wide.
