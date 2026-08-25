# 05 — Shot List

Scope note: this breaks each scene into its key shots (the beats that need a
distinct composition/frame range), not an exhaustive frame-by-frame log — that
level of granularity belongs in each sequence's own shoot/production brief once
Scene 01–06 sequences are commissioned, not in this planning doc.

| Shot ID | Scene | Type | Camera | Subject/focal point | Composition | Duration/scroll range | Sound | Transition | Assets | Implementation |
|---|---|---|---|---|---|---|---|---|---|---|
| S01-A | City | Wide establishing | Static, slow push implied by frame sequence | Skyline, low horizon | Rule-of-thirds, subject lower third | progress 0–0.4 | ambience in | fade in on load | city sequence frames 0–~30% | `FrameCanvas` cover-fit |
| S01-B | City | Wide → medium | Simulated push toward street level | Wet street, single lit window | Centered vertical, wide negative space | progress 0.4–1.0 | ambience swells slightly | held frame → scroll cue | city sequence remaining frames | same canvas, later frame range |
| S02-A | Peter | Close, intimate | Static | Face, three-quarter light | Off-center, tight crop | progress 0–0.6 | room tone | hard cut from S01-B hold | Peter sequence | `FrameCanvas`, `dragonX` positional map if pacing is uneven |
| S02-B | Peter | Close, held breath | Static, minimal frame movement | Eyes | Extreme negative space around subject | progress 0.6–1.0 | room tone continues | held frame → cut | same sequence | same |
| S03-A | Mask | Wipe reveal | N/A — pointer/touch driven, not scroll | Face → mask lens | Centered, symmetrical (only symmetrical moment in the project — reserved for this beat specifically) | user-controlled | single mechanical sound at midpoint | drag interaction, no auto-play | two full-bleed images | `RevealStage`, adapted |
| S04-A | Spider-sense | Distortion pulse | Static base frame, distortion layered over | Whole frame | Full-bleed | progress-threshold triggered, ~0.5s pulse | rising tone, quick mute | resolves into S05-A | 1 still frame + WebGL shader | small custom WebGL layer |
| S05-A | Swing | Launch | Simulated dolly/whip start | Full figure, small in frame, city large | Wide, subject lower-left | progress 0–0.2 | wind begins | from S04's resolve | swing sequence start frames | `FrameCanvas` positional indexing |
| S05-B | Swing | Mid-arc | Simulated swing/fall combined | Figure crossing frame, buildings streaking past (implied by frame content, not motion-blur shader) | Dynamic diagonal | progress 0.2–0.8 | wind peaks | continuous scrub | swing sequence mid frames (largest chunk of the sequence) | same canvas |
| S05-C | Swing | Reveal/hold | Static hold on peak frame | Full-body Spider-Man mid-air, city below | Wide, subject upper-third | progress 0.8–1.0, then held | wind fades, single sting | held frame, long pause before next scene | swing sequence final frames | same canvas, `settle` behavior already built in |
| S06-A | Brand New Day | Wide resolution | Static | City at dawn/dusk, figure small or absent | Extreme wide, huge negative space | progress 0–1.0 | ambience fades to near-silence | soft fade | closing sequence or single hero image | `FrameCanvas` contain-fit or plain `<img>` if single static |
