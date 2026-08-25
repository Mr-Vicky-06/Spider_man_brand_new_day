# 11 — Design System (tokens)

## Color
See `02-CREATIVE-DIRECTION.md` for the locked palette and usage rules
(`--spider-red` accent-only, `--electric-blue` spider-sense-only). Semantic
aliases layered on top of the raw tokens:
```
--bg-primary: var(--night)
--bg-raised: var(--graphite)
--text-primary: var(--web-white)
--text-secondary: var(--steel)
--accent-identity: var(--spider-red)
--accent-alert: var(--electric-blue)
```

## Typography scale
Display (Bebas Neue, wide tracking): `clamp(2.5rem, 8vw, 7rem)` for hero
titles, `clamp(1.5rem, 4vw, 2.5rem)` for scene sub-titles.
Body (Inter): `1rem` base, `0.875rem` metadata/kicker, `1.25rem` sub-copy.
Line-height: `1.1` for display (condensed faces need tight leading), `1.5` for
body. Letter-spacing: `0.04em`+ on display caps, `0.08em`+ on kickers/metadata
(mirrors the existing repo's kicker treatment).

## Spacing / grid
8px base unit, scale: 4/8/16/24/32/48/64/96/128px. No 12-column grid system —
each scene is a full-bleed composition, not a card layout, so a rigid grid
would fight the creative direction rather than serve it.

## Breakpoints
`480px` (mobile), `768px` (tablet), `1024px` (laptop), `1440px` (desktop) —
matches the four device classes named in `22-RESPONSIVE-EXPERIENCE.md`.

## Radii / shadows / glow / blur
- **Radii:** near-zero everywhere (`0–2px`) — sharp edges read more cinematic
  than rounded UI chrome; rounded corners are an anti-pattern here.
- **Shadows:** none as decorative drop-shadows on UI elements (no card
  shadows) — only used where the source footage itself implies a shadow.
- **Glow:** reserved exclusively for the spider-sense state's
  `--electric-blue` — using glow anywhere else dilutes its meaning as an
  alert signal.
- **Blur:** used only for the reduced-motion static fallback frames (a very
  slight blur can mask compression artifacts on a still) and never as a UI
  "frosted glass" effect (explicit anti-pattern).

## Opacity scale
`0.1 / 0.2 / 0.4 / 0.6 / 0.8 / 1.0` — matches the existing repo's usage
pattern (`opacity: 0.3`, `0.42` seen in `GlyphRain` calls) generalized into a
token scale.

## Z-index
```
0   — base canvas layers
10  — UI overlay (kickers, titles, meters)
20  — nav/footer
30  — spider-sense distortion layer (must sit above its base frame, below UI text)
40  — focus rings / accessibility overlays (always topmost)
```
