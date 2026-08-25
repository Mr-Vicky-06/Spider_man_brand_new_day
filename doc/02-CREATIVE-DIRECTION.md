# 02 — Creative Direction (locked)

## Core concept
A quiet city holding its breath before something extraordinary happens in it. The
experience is built around *restraint that breaks once* — long, calm, dark
passages punctuated by a small number of high-impact moments (mask-on,
spider-sense, the swing). If every scene is intense, none of them are.

## Emotional arc
Stillness → intimacy (Peter) → transformation (mask) → alertness (spider-sense)
→ release (the swing) → wide, quiet resolution (Brand New Day). This is a
breathing pattern, not an escalating rollercoaster — it dips back to quiet after
the swing rather than ending on peak intensity, which is what keeps it feeling
premium rather than like a trailer.

## Visual philosophy
- **Cinematic, not illustrative.** Every scene reads like a still from a film,
  not a poster or a game splash screen. No character floating in empty space
  with a glow behind them.
- **Negative space carries weight.** Large areas of near-black/`--night` with a
  single lit subject. Typography sits in that negative space, never on top of
  the subject's face or the frame's focal point.
- **One accent color rule:** `--spider-red` never fills a background or a large
  shape. It appears as a thin rule, a small glyph, a pulse — the same
  restrained-kicker pattern the existing repo already uses for its Japanese/
  Latin title pairing, carried forward with new content.

## Lighting philosophy
Practical, motivated light only: streetlight sodium-orange, window spill,
wet-asphalt reflection, a single rim light on the mask. No unmotivated glow
"because it looks cool." If a light source isn't visible or implied in frame,
it doesn't light the subject.

## Color philosophy
Locked token set (extends the v0.1 starting direction, now committed):
```
--void: #050505        /* deepest background, section bases */
--night: #0B0D10       /* primary background */
--graphite: #15181D    /* raised surfaces, UI chrome */
--steel: #7D8791        /* secondary text, dividers */
--web-white: #F2F2F2    /* primary text on dark */
--spider-red: #E11D2E   /* accent only — rules, glyphs, pulses. Never a fill >4px */
--deep-red: #8E1020     /* red's own shadow tone, for gradients under the accent only */
--electric-blue: #4DA3FF /* spider-sense exclusively — never used decoratively elsewhere, so its appearance always signals "alert" */
```
Rule: if a design uses more than one accent color in the same view, it's wrong —
red = human/suit identity, blue = spider-sense/threat. They don't mix in one frame.

## Typography philosophy
Two families, both Google Fonts (SIL Open Font License 1.1 — free for
commercial use, self-hostable, no attribution required):
- **Display (scene titles, cinematic type):** **Bebas Neue** — condensed,
  all-caps, high-contrast, the same "trailer title card" register the brief
  asked for. Wide tracking (`0.04em`+) at large sizes, per its established use
  in cinematic/trailer typography.
- **Body / UI / metadata:** **Inter** — clean, highly legible at small sizes,
  variable-weight, pairs neutrally against a condensed display face without
  competing with it.
Both ship on Google Fonts' CDN or can be self-hosted from the same OFL files —
no licensing ambiguity, verified via `12-TYPOGRAPHY.md`.

## Texture philosophy
Grain and imperfection are allowed (film grain, subtle chromatic aberration on
transitions only) — glassmorphism, drop-shadow-heavy cards, and gradient-mesh
backgrounds are not. Texture should feel like it came from a lens and a city,
not from a CSS effects library demo.

## Composition philosophy
Rule-of-thirds, low horizon lines for scale (city/rooftop scenes), tight
close-crops for intimacy (Peter, mask). Every scene's subject sits off-center
with room for the scroll-progress meter and title block in the negative space —
same layout logic as the existing repo's sticky-stage pattern, applied to new
compositions.

## Anti-patterns (explicit — do not do these)
- Generic "hero image + centered headline + CTA button" superhero landing page
- Web-shooting cursor trails, particle bursts on every hover
- Glassmorphism panels, frosted-glass nav bars
- Default Marvel-red gradient backgrounds
- Gaming-dashboard HUD chrome (health bars, XP meters, badge icons) anywhere outside the spider-sense state itself
- AI-template tells: centered icon grids, generic blob shapes, stock gradient meshes
- Full red-and-blue suit rendered head-on in bright light — the suit is glimpsed, implied, half-lit, never presented like a product shot

## Positioning
Footer and metadata explicitly state: original fan-made interactive experience
inspired by *Spider-Man: Brand New Day*'s visual language; not affiliated with
or endorsed by Marvel or Sony. Same honesty pattern the source repo already
uses ("SOLO LEVELING — fan tribute").
