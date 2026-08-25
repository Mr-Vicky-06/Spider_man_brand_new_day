# Asset Intelligence Report

## Honest scope statement (read this first)
Per the "do not invent URLs / do not invent licenses / do not invent asset
availability" rule, this document covers what's actually verifiable right now:
**platform-level licensing models** for categories the project will need, plus
the two fonts already verified in `12-TYPOGRAPHY.md`. It deliberately does
**not** contain a table of individual named images/textures/SFX with fabricated
URLs and quality scores — verifying 50+ individual assets against a shot list
that specifies real content (specific city angles, specific rain intensity,
specific SFX timing) requires that shot list to exist in production-ready form
first (`05-SHOT-LIST.md` gives the beat structure but not yet a shooting
brief), and picking assets before that would mean re-verifying most of them
anyway once real requirements land. What follows is safe to act on now;
per-asset selection is flagged as the next research pass once sequence
production briefs exist.

## Fonts — verified (see `12-TYPOGRAPHY.md` for full detail)
Bebas Neue and Inter, both Google Fonts, SIL OFL 1.1, free commercial use, no
attribution required. **Status: production-safe now.**

## Textures / HDRIs / environment maps — platform-level, verified license models
| Platform | License model | Commercial use | Attribution | Notes |
|---|---|---|---|---|
| Poly Haven (polyhaven.com) | CC0 for every asset on the site (textures, HDRIs, models) | Yes | Not required | Well-established CC0-only library; safe default for any texture need once specific textures are picked |
| ambientCG (ambientcg.com) | CC0 for every asset | Yes | Not required | Same model as Poly Haven, PBR-focused |
**Status: platform license confirmed safe; individual texture selection (concrete/asphalt/rain-streaked glass etc.) deferred until a specific scene's art direction calls for a real photographic texture rather than a procedural CSS/SVG treatment (per `14-EFFECT-SYSTEM.md`, most texture needs here are procedural, not photographic).**

## Audio — platform-level, verified this session
| Platform | License model | Commercial use | Attribution | Notes |
|---|---|---|---|---|
| Mixkit (mixkit.co) | "Mixkit Free License" — verified via mixkit.co/terms and cross-referenced independent reviews this session | Yes, for both SFX and music under the Free License | Not required | Some individual clips are separately labeled "Restricted License" (personal-use-only) — **must check the label on each individual downloaded item**, the general platform license does not cover 100% of items |
| Freesound (freesound.org) | Per-sound — contributors choose their own CC license (CC0, CC-BY, CC-BY-NC, etc.) | Varies per sound | Varies per sound | **Not a platform-wide license** — every individual sound must be checked before use; default to CC0-filtered search only to avoid attribution/NC traps |
**Status: platform models confirmed; individual sound selection deferred to `20-AUDIO-DESIGN.md`'s implementation pass, filtered to CC0-only on Freesound or Mixkit's unrestricted items only.**

## Open-source libraries — none currently proposed
Per `01-ARCHITECTURE-DECISION.md`, this project adds **zero new runtime
dependencies** to the existing React 19 + Vite stack. If that changes (e.g., a
future decision to add a small audio-scheduling helper), it gets evaluated and
logged here with GitHub URL, license, and bundle cost before adoption — not
speculatively pre-approved now.

## Images (city/rooftop/rain reference photography) — deferred, correctly
The creative direction calls for **original production footage/renders** as
the primary content (per `02-CREATIVE-DIRECTION.md` and `18-ASSET-ARCHITECTURE.md`),
not stock photography stitched into frame sequences — stock imagery doesn't
work for a scroll-scrubbed sequence unless it *is* the sequence, i.e.
purpose-shot. Reference-only mood-boarding from Unsplash/Pexels/Wikimedia
Commons (all of which do offer clear per-image licensing, generally CC0 or a
free-license variant) is reasonable for the creative-direction pass but
those images were never destined to become production assets, so cataloging
them as an "asset database" would be padding, not information.

## Risk register
| Risk | Mitigation |
|---|---|
| Treating a Mixkit "Restricted License" clip as free | Manifest schema (`19-ASSET-MANIFEST-SPEC.md`) requires a filled provenance block per asset — no exceptions, catches this at ingestion |
| Treating a non-CC0 Freesound upload as free | Same — provenance block, plus default to CC0 filter in search |
| Using a movie still as "reference" that ends up copy-pasted into production | `26-COPYRIGHT-BRAND-POLICY.md` draws this line explicitly |
