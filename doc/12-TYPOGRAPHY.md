# 12 — Typography (verified)

Both candidates are Google Fonts, distributed under the **SIL Open Font
License 1.1** — free for commercial use, modification, and web embedding, no
attribution required, self-hostable to avoid a Google Fonts CDN request if
that matters for the performance budget.

| Font | Source | License | Commercial use | Web embedding | Weights | Variable | Style | Role |
|---|---|---|---|---|---|---|---|---|
| **Bebas Neue** | fonts.google.com/specimen/Bebas+Neue | SIL OFL 1.1 | Yes | Yes (Google Fonts CDN or self-host) | Regular only (single weight, condensed all-caps by design) | No | Condensed, all-caps display — an established choice for cinematic trailer titles and dramatic headlines | **Display** — scene titles |
| **Inter** | fonts.google.com/specimen/Inter | SIL OFL 1.1 | Yes | Yes | Full variable range (100–900) | Yes | Clean, highly legible grotesk, neutral enough not to compete with a condensed display face | **Body / UI / metadata** |

## Fallback stacks
```css
--font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
--font-body: 'Inter', -apple-system, 'Segoe UI', sans-serif;
```

## Rejected/considered alternatives (for the record)
Anton and League Gothic came up in the same condensed-display research pass —
both are also Google Fonts under OFL and would be safe substitutes if Bebas
Neue's single-weight limitation becomes a problem (e.g., needing a bolder
variant for one specific title treatment). Not adopted now because a single,
consistent display weight across all scene titles is part of the restraint
principle in `02-CREATIVE-DIRECTION.md` — introducing a second display weight
would need a specific justification first.

## What's still open
No condensed/display *serif* was evaluated (all candidates found were
sans-serif) — if a future scene wants a more "editorial" title treatment,
that's a follow-up research pass, not assumed here.
