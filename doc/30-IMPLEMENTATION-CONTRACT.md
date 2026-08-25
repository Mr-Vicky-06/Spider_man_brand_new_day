# 30 — Implementation Contract

Binding rules for anyone implementing from this doc package:

1. **No unnecessary dependencies.** Current dependency count: zero new
   runtime deps beyond React 19 + Vite. Any proposed addition must be logged
   in `assets/ASSET-INTELLIGENCE.md`'s "Open-source libraries" section with
   GitHub URL, license, and bundle cost before it's installed.
2. **No giant App.jsx.** `App.jsx` stays a thin composition
   (`15-TECHNICAL-ARCHITECTURE.md`) — all scene logic lives in `scenes/`.
3. **No undocumented external asset.** Every asset needs a filled
   `provenance` block in the manifest (`19-ASSET-MANIFEST-SPEC.md`) before use.
4. **No unverified license.** Unknown license = do not use, per
   `assets/ASSET-INTELLIGENCE.md`'s risk register.
5. **No unexplained magic numbers.** Easing values, thresholds, and tier
   breakpoints reference the tokens/scales defined in `11-DESIGN-SYSTEM.md`
   and `13-MOTION-SYSTEM.md`, not ad-hoc numbers typed into components.
6. **No scene without mobile behavior.** Every scene in `04-STORYBOARD.md`
   has an explicit mobile adaptation line — check it's actually implemented,
   not just documented.
7. **No expensive effect without fallback.** Every row in
   `14-EFFECT-SYSTEM.md` has a fallback column — same rule as #6.
8. **No animation without reduced-motion behavior.** Same, cross-referenced
   in `24-ACCESSIBILITY-SPEC.md`.
9. **Preserve the ref/rAF architecture.** `useScrollProgress`, `useSampled`,
   `useInView`, and `FrameCanvas`'s internal rAF loop are not to be rewritten
   into a different state-management pattern (e.g., moving progress into
   React state) — this would reintroduce the re-render cost the existing
   architecture deliberately avoids.
10. **Profile before rewriting `FrameCanvas`.** If a real performance problem
    shows up in QA, profile it first (`23-PERFORMANCE-SPEC.md` targets as the
    bar) — don't assume the existing engine is the bottleneck without evidence.
11. **Document architectural changes.** Any deviation from
    `01-ARCHITECTURE-DECISION.md` during implementation gets a note added to
    that file, not a silent divergence.
12. **Maintain asset provenance.** Ongoing, not a one-time setup task —
    every new asset added after initial implementation follows rule #3.
