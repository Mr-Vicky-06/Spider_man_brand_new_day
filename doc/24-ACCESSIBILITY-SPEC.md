# 24 — Accessibility Spec

- **Keyboard:** Tab order covers nav, mute control, and footer links — the
  scroll-driven scenes themselves have no discrete controls to tab to except
  the Mask-scene wipe, which needs an alternate non-drag path (arrow keys or a
  simple toggle button) so it's not pointer/touch-only.
- **Semantic HTML:** each scene is a `<section>` with an `aria-label`
  describing its content (e.g., "Scene: Peter Parker"); canvases are
  `aria-hidden="true"` (as the existing repo already does) since they're
  decorative relative to the real content, which lives in the accompanying
  text.
- **Focus states:** visible focus ring on every interactive element, token
  from `11-DESIGN-SYSTEM.md`'s z-index scale (always topmost, layer 40).
- **Screen readers:** each scene's title/kicker/sub-copy is real DOM text
  (already true in the existing repo), so a screen reader gets the narrative
  content without needing the visuals at all.
- **Contrast:** `--web-white` on `--night`/`--void` easily clears WCAG AA;
  `--spider-red`/`--electric-blue` are accent-only per the color system and
  never used as body-text color, avoiding a whole class of contrast failures.
- **Reduced motion:** `prefers-reduced-motion: reduce` — every animated
  element (frame sequences, rain, distortion, web-strand draw-on, transitions)
  has a named static fallback, specified per-effect in `14-EFFECT-SYSTEM.md`
  and per-scene in `04-STORYBOARD.md`. No exceptions.
- **Animation pause:** the mute control's sibling could optionally include a
  "reduce motion" override even for users whose OS-level preference isn't set,
  as a courtesy — flagged as a nice-to-have, not a blocker.
- **Audio controls:** single persistent mute toggle, defaults muted (per
  `20-AUDIO-DESIGN.md`).
- **Alternative content:** the DOM text content of every scene is sufficient
  on its own to convey the full narrative without any visual/audio layer —
  this is the real test, not just "add alt text."
- **Loading states:** first frame doubles as the loading state (per
  `18-ASSET-ARCHITECTURE.md`); if a network stall does need an explicit
  loading indicator, it gets an `aria-live="polite"` region, not a silent spinner.
