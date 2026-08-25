# 03 — Experience Bible

## The site as one continuous scene, not six sections
The user never "arrives at a new page." Scroll position is the single timeline;
each scene is a sticky stage that holds the viewport while its own progress
value moves from 0→1, exactly as `AwakenSection`/`MonarchSection` already do.
The seam between scenes is a held beat (a frame at rest, per `FrameCanvas`'s
existing "resolve to a single sharp frame" behavior) followed by a scroll-cue,
not a hard cut.

## Opening state
Page loads to a single still frame of the city at rest (not yet animated —
`FrameCanvas` already draws the current-progress frame immediately, no
first-paint jump). A minimal kicker and a scroll cue are the only UI. No
loading spinner if avoidable — the first frame doubles as the loading state
(see `19-ASSET-MANIFEST-SPEC.md` for priority-load ordering).

## Onboarding
None, by design — the scroll cue is the entire tutorial. This matches the
existing repo's `scroll-cue` pattern and keeps the "premium, restrained" rule
intact (no modal, no "click to enable sound" overlay unless audio requires it —
see `20-AUDIO-DESIGN.md`, which defaults to muted).

## Narrative progression (USER → SCROLL → CAMERA → CHARACTER → ENVIRONMENT → STORY → SOUND → REVEAL)
1. **User** scrolls at their own pace — nothing is time-locked or autoplaying past user control.
2. **Scroll** position feeds `useScrollProgress`'s 0–1 ref per section, unchanged.
3. **Camera** (simulated, per `01-ARCHITECTURE-DECISION.md`) advances through the frame sequence at that progress.
4. **Character** state changes with it — eyes closed → open, unmasked → masked.
5. **Environment** responds in the same pass — rain intensifies, light shifts — driven by the same progress ref, no separate timeline to desync.
6. **Story** beat lands at a defined progress threshold (e.g., mask fully on at `progress > 0.85`), matching the existing repo's `data-done` pattern on its scroll cue.
7. **Sound** (if enabled) ducks in at the same threshold, never ahead of the visual.
8. **Reveal** — each scene's final held frame is the "answer" to that scene's question; the transition to the next scene is the reward for having watched it, not a forced auto-scroll.

## Escalation and resolution
Tension escalates through Scenes 1–5 (city → human → transformation → threat →
release) and then Scene 6 deliberately drops back to quiet, wide, and slow —
mirroring a film's final wide shot rather than ending on the loudest beat. This
is the single most important pacing decision in the document: it's what keeps
the site from reading as a trailer loop.
