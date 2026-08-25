# 10 — Interaction System

| Input | State | Visual | Motion | Audio | Camera | Reset condition |
|---|---|---|---|---|---|---|
| Scroll (all scenes except Mask) | drives `progress` ref 0–1 | frame index updates | `FrameCanvas` ease toward target | scene-appropriate ambience/threshold sounds | simulated per `06-CAMERA-SYSTEM.md` | scrolling back reverses all of the above — no one-way state |
| Pointer/touch drag (Mask scene only) | drives wipe position, local low-frequency state | reveal wipe position | none beyond the wipe itself | one mechanical sound at midpoint, once per direction crossing | none | releasing/reversing the drag reverses the wipe |
| Hover (desktop only, non-essential) | none globally — no hover-triggered effects per anti-pattern list | none | none | none | none | n/a |
| Click | scroll-cue only (optional smooth-scroll-to-next-section affordance) | none beyond native scroll | native smooth scroll | none | none | n/a |
| Keyboard | Tab moves focus through nav/footer links only — the experience itself is scroll-native, not keyboard-driven, since it has no discrete interactive controls beyond the Mask wipe | focus ring visible (`24-ACCESSIBILITY-SPEC.md`) | none | none | none | n/a |
| Touch gestures (mobile) | scroll = same as desktop scroll; Mask scene wipe = touch-drag equivalent of pointer-drag | same as pointer | same | same | same | same |
| Tab/window blur | pauses all rAF loops (`FrameCanvas` already does this via `visibilitychange`) | frame freezes | paused | audio pauses | n/a | resumes on focus |

## Why no cursor-follow / hover-particle system
Explicitly excluded per `02-CREATIVE-DIRECTION.md`'s anti-pattern list. The
existing repo's `SplashCursor` is the kind of feature this project is
deliberately moving away from (see `01-ARCHITECTURE-DECISION.md`) — a
persistent cursor-reactive effect reads as a demo reel flex, not restrained
cinematic design.
