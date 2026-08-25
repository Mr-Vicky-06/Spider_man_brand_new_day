# 04 — Storyboard (final scene structure)

## Scene count decision
6 scenes, not the brief's suggested 10. NEW YORK and THE UNSEEN THREAT fold into
THE CITY (opening) and SPIDER-SENSE respectively — they were describing the same
beats from a different angle, and splitting them would mean two scenes sharing
one emotional purpose, which dilutes both. SPIDER-MAN (the reveal) is the payoff
of THE WEB/SWING scene rather than a standalone beat — the swing *is* the
reveal, seeing him mid-air is the money shot, not a separate static portrait
after it.

---

### SCENE 01 — THE CITY
- **Objective / narrative purpose:** establish tone before any character appears. Cold open.
- **Emotional state:** calm, distant, a little melancholy.
- **Composition:** wide rooftop/skyline, low horizon, heavy negative space above.
- **Lighting:** blue-hour, sodium streetlight practicals, wet reflection.
- **Color:** `--night`/`--void` base, no red yet.
- **Typography:** kicker + huge condensed title, same pairing as existing repo's `jp`/`latin` kicker.
- **Animation/interaction:** `FrameCanvas` scrub through a slow rooftop-to-street push; ambient rain layer (procedural, replaces `GlyphRain`'s slot — see `14-EFFECT-SYSTEM.md`).
- **Sound:** distant city ambience, very low, muted by default.
- **Scroll behavior:** standard sticky-stage, `ease: 0.14` (matches existing `AwakenSection` feel).
- **Assets:** one new frame sequence (city push), rain shader (no image asset).
- **Transition in:** page load, first frame already visible.
- **Transition out:** hold on last frame, scroll-cue fades, next scene's sticky stage takes over.
- **Mobile adaptation:** shorter frame count (see `22-RESPONSIVE-EXPERIENCE.md` Tier B/C), rain shader density halved.
- **Reduced motion:** static hero frame, no rain animation, full text content unchanged.
- **Performance risk:** low — same pattern as existing `awaken` section.

### SCENE 02 — PETER PARKER
- **Purpose:** the human before the mask — intimacy, not spectacle.
- **Emotional state:** quiet, private, a little tired.
- **Composition:** tight crop, off-center, shallow negative space.
- **Lighting:** single practical (desk lamp / window), rest in shadow.
- **Animation:** `FrameCanvas` with `dragonX`-style positional indexing if the sequence has non-uniform pacing (e.g., holds on a breath, then moves) — this is exactly what that feature was built for.
- **Sound:** near silence — a single ambient room tone.
- **Assets:** one new frame sequence.
- **Transition in/out:** held-frame cut from Scene 01's last frame (no wipe).
- **Mobile:** same sequence, `contain` fit if portrait framing needed (existing `fit` prop already supports this).
- **Reduced motion:** static mid-sequence frame (the "thinking" beat, not first or last frame).
- **Performance risk:** low.

### SCENE 03 — THE MASK
- **Purpose:** transformation beat — the visual centerpiece of the first half.
- **Emotional state:** resolve, a held breath released.
- **Mechanic:** `RevealStage`'s pointer/touch wipe, adapted — unmasked ↔ masked image pair, user-controlled reveal (not autoplay) so the moment is *given* to the user rather than performed at them.
- **Lighting:** rim light on the mask lens as it comes into frame.
- **Sound:** a single low mechanical/fabric sound at the wipe's midpoint, not a "power-up" sting.
- **Assets:** two full-bleed images (unmasked/masked), reusing `RevealStage` as-is.
- **Transition in/out:** same held-frame logic as Scene 02.
- **Mobile:** touch-drag instead of pointer-drag (`RevealStage` already needs this checked — flag in `07-SCENE-SPECIFICATIONS.md`).
- **Reduced motion:** wipe becomes a tap-to-toggle between the two states, no continuous drag required.
- **Performance risk:** low — two static images, no sequence decode cost.

### SCENE 04 — SPIDER-SENSE
- **Purpose:** the one alert beat — tension without becoming an action scene yet.
- **Emotional state:** sudden, sharp attention.
- **Mechanic:** the dedicated spider-sense system (`09-SPIDER-SENSE-SYSTEM.md`) — small custom WebGL distortion pulse, `--electric-blue` only, triggered by scroll crossing a threshold, not by mouse movement (mouse-triggered would make it feel like a toy, not a threat).
- **Sound:** a short rising tone, mutes immediately after.
- **Assets:** one static or short frame sequence (a still city shot the distortion plays over) — no new photography needed if Scene 01's sequence has a spare frame that fits.
- **Transition out:** the distortion resolves into Scene 05's opening frame — the "threat" becomes the reason for the swing.
- **Mobile:** distortion shader simplified (fewer samples) or replaced with a CSS filter fallback on Tier C devices.
- **Reduced motion:** distortion becomes a single static red-to-blue color shift, no motion.
- **Performance risk:** medium — first scene using the small WebGL layer; profile early.

### SCENE 05 — THE WEB / SWING
- **Purpose:** release, the money shot, the payoff of everything before it.
- **Emotional state:** exhilaration, but controlled — one continuous motion, not a barrage of cuts.
- **Mechanic:** `FrameCanvas` positional indexing (`dragonX` equivalent) driving a swing arc across a longer frame sequence — the single largest asset requirement in the project.
- **Sound:** wind/whoosh rising with scroll velocity if feasible, otherwise scroll-position-mapped (not velocity — avoids needing a separate audio-engine dependency).
- **Assets:** the largest sequence in the project; budget and density tiers defined in `19-ASSET-MANIFEST-SPEC.md`.
- **Transition out:** the sequence's final frame *is* the reveal — full-body Spider-Man mid-swing over the city — held for a beat before Scene 06.
- **Mobile:** this scene gets the most aggressive Tier-C frame reduction (`22-RESPONSIVE-EXPERIENCE.md`) since it's also the heaviest.
- **Reduced motion:** three static key frames shown as a simple crossfade sequence instead of scroll-scrubbing.
- **Performance risk:** **highest in the project** — flagged as the top technical risk in the master spec.

### SCENE 06 — BRAND NEW DAY
- **Purpose:** resolution — wide, quiet, confident. Deliberate come-down from Scene 05.
- **Emotional state:** calm, resolved, a little hopeful.
- **Composition:** wide NYC daybreak or dusk shot, generous negative space, small figure or none at all (his absence *is* the point — the city goes on).
- **Typography:** title treatment + footer (adapts existing repo's `foot`/`foot-rule` pattern with the fan-tribute disclosure line).
- **Sound:** ambience only, fades to silence.
- **Assets:** one closing frame sequence or single static hero image (cheaper option, worth deciding once budget from Scene 05 is known).
- **Mobile/reduced-motion:** static image either way — this scene doesn't need motion to land.
- **Performance risk:** low.
