# 20 — Audio Design

## Default behavior
**Muted on load, always.** No autoplay-with-sound anywhere — matches the
brief's explicit "must never autoplay aggressively" rule and avoids the
browser autoplay-policy fights that come with trying to force audio on.
A single, clearly-labeled mute/unmute control lives in the nav/footer chrome,
persistent across all scenes.

## Per-scene audio map
| Scene | Sound | Source category | Trigger |
|---|---|---|---|
| City | low city ambience loop | Mixkit (Free License, ambience) or Freesound (CC0-filtered) | scene enters view |
| Peter | room-tone loop, very low | same platforms | scene enters view |
| Mask | one mechanical/fabric one-shot | same platforms | wipe crosses ~50% |
| Spider-Sense | rising tone → quick mute | same platforms, or a small procedurally-generated tone (Web Audio oscillator — zero licensing question at all) | scroll threshold crossed |
| Swing | wind loop, scroll-position-mapped volume | same platforms | scene in view |
| Brand New Day | ambience fade to silence | reuse City's ambience track, faded | scene enters view |

## Mobile behavior
Identical trigger logic; audio requires the same one-time user gesture to
unmute on mobile as desktop (standard browser autoplay policy — no
special-casing needed).

## Reduced-motion / reduced-audio
`prefers-reduced-motion` does not silence audio by itself (it's a distinct
preference) — the mute control remains the single source of truth for audio
on/off, and defaulting muted already satisfies the spirit of not overwhelming
a motion-sensitive user with an unexpected soundscape.

## Sourcing status
Per `assets/ASSET-INTELLIGENCE.md`: platform licenses (Mixkit, Freesound
CC0-filtered) are verified safe; the specific individual clips for this table
are not yet selected — that's a short, concrete follow-up task once this
document's structure is approved, not a blocker to any other doc here.
