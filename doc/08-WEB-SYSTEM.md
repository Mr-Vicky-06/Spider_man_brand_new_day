# 08 — Web System

## Scope decision
The storyboard (`04-STORYBOARD.md`) doesn't actually require a literal
web-slinging strand effect as a standalone scene — "THE WEB" folded into the
Swing scene, where the web is implied by the sequence footage itself, not
rendered as separate procedural geometry. This document specifies a **small,
optional signature detail** (a web-strand shimmer usable as a transition/hover
accent, e.g., on the footer or a UI reveal), not a full physics engine — building
a full strand/tension/sag simulation for a detail that appears for under a
second would be effort disproportionate to its screen time, and would be the
first thing cut under any performance budget pressure.

## Design (scoped)
- **Rendering:** SVG, not Canvas or WebGL. A handful of strands with a
  `stroke-dasharray` draw-on animation and a subtle CSS `filter: url(#wobble)`
  turbulence filter is enough to read as "web" without any per-frame JS.
- **Geometry:** 3–5 straight-line anchors procedurally placed between two
  fixed points (e.g., corners of a UI element) — no sag/tension physics; a
  slight SVG turbulence filter fakes organic imperfection cheaply.
- **Interaction:** appears on scroll-into-view or on a specific transition
  (e.g., footer reveal), not a persistent cursor-follow effect — per
  `02-CREATIVE-DIRECTION.md`'s anti-pattern list ("web-shooting cursor trails,
  particle bursts on every hover" is explicitly listed as something to avoid).
- **Performance:** SVG filters are GPU-cheap and don't compete with the
  frame-sequence canvases; **mobile fallback** is simply disabling the
  turbulence filter (keep the static strand geometry) since some older mobile
  browsers handle SVG filter performance poorly.
- **Reduced motion:** strand appears fully-drawn instantly, no draw-on animation.

## Why not a "reusable engine"
The brief's Phase I framing (procedural web strands, tension, sag, particles
traveling along strands, mouse/touch interaction) describes a feature for a
game or a much more web-forward design language than the one locked in
`02-CREATIVE-DIRECTION.md`, which explicitly restrains anything that reads as
"gaming dashboard" or "particle burst." If a future creative revision wants a
bigger, more central web mechanic, this doc's SVG approach doesn't preclude
building that later — it's just not warranted by the current storyboard.
