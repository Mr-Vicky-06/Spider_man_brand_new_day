# 22 — Responsive Experience

Not CSS-only reflow — cinematic behavior itself changes per tier.

| | Desktop/laptop (Tier A) | Tablet (Tier B) | Mobile (Tier C) |
|---|---|---|---|
| Frame sequences | full frame count, 1920×1080 | ~65% frame count, 1280×720 | ~35% frame count, 854×480 (per manifest tiers in `19-ASSET-MANIFEST-SPEC.md`) |
| Spider-sense | full WebGL shader | full WebGL shader | CSS filter fallback |
| Rain | full density | half density | disabled |
| Camera/composition | as authored (landscape framing) | same, may crop slightly | Peter/Mask scenes may need a portrait-cropped variant of the sequence, not just a scaled-down landscape one (flagged in `04-STORYBOARD.md` per-scene notes) |
| Interaction | pointer drag (Mask) | touch drag | touch drag |
| Typography | full display scale | scaled via `clamp()`, same tokens | scaled via `clamp()`, same tokens |
| Navigation | minimal chrome, same as desktop | same | same — no hamburger menu needed, this isn't a multi-page site |

## Tier detection
One-time at load (`PerformanceManager`, `15-TECHNICAL-ARCHITECTURE.md`) —
viewport width as the primary signal, not continuous re-detection mid-session
(switching tiers mid-scroll would mean re-fetching frame sequences, which is
worse than picking a tier once and living with it even through an orientation
change).

## Reduced-motion (cross-cutting, not tier-specific)
Every scene has a defined static-fallback frame already specified per-scene in
`04-STORYBOARD.md` — this table is about device *capability*, reduced-motion
is about user *preference*, and the two are independent (a desktop user can
have reduced-motion on; a Tier-C mobile user might not).
