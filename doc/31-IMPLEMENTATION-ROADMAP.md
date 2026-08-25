# 31 — Implementation Roadmap

| Stage | Objective | Key files | Depends on | Acceptance criteria | Risks | DoD |
|---|---|---|---|---|---|---|
| 1. Foundation | Set up new folder structure, no content yet | `src/scenes/`, `src/systems/`, `src/data/` scaffolds | Architecture decision | App builds, renders empty scene shells | Low | Structure matches `15-TECHNICAL-ARCHITECTURE.md` |
| 2. Design tokens | Implement `tokens.css` | `styles/tokens.css` | `11-DESIGN-SYSTEM.md` | Tokens match spec exactly, fonts load | Low | Visual QA of token values |
| 3. Architecture refactor | Migrate `useInView.js`/`useAtlas.js` into `lib/`, extend manifest to v2 | `lib/useAtlas.js` | Stage 1 | Existing hooks work unchanged, manifest v2 schema validates | Medium — manifest migration touches loading logic | Old Solo-Leveling content still renders correctly during transition (regression check) |
| 4. Asset pipeline | Extend `pack_frames.py` for 3 tiers | `scripts/pack_frames.py` | `18-ASSET-ARCHITECTURE.md` | Produces correctly-sized/named outputs for a test sequence | Medium | One full sequence round-trips through the pipeline correctly |
| 5. Scene engine | Build `SceneManager`, empty scene shells wired to scroll | `systems/SceneManager` | Stage 1, 3 | Scroll position correctly drives per-scene progress refs | Low — mostly composition of existing hooks | Scroll-through of all 6 empty shells is smooth |
| 6. City scene | First real scene, first real sequence | `scenes/CityScene.jsx` | Stage 5, real assets | Matches `04-STORYBOARD.md`/`05-SHOT-LIST.md` spec, passes `27-TESTING-AND-QA.md` checkpoints | Low | QA-complete per scene |
| 7. Peter scene | Second scene | `scenes/PeterScene.jsx` | Stage 6 pattern proven | Same | Low | Same |
| 8. Mask scene | `RevealStage` adaptation | `scenes/MaskScene.jsx` | Stage 6 pattern proven | Wipe works pointer + touch + keyboard alt | Medium — touch/keyboard alt path is new work | Same |
| 9. Spider-sense scene | First WebGL scene | `scenes/SpiderSenseScene.jsx`, `SpiderSenseLayer` | Architecture decision, Stage 6 pattern | Shader + CSS fallback both verified | **Medium-high — first GL context, profile early per contract rule #10** | Same |
| 10. Swing scene | Largest, riskiest scene | `scenes/SwingScene.jsx` | Stage 9 proven GL patterns not required (Canvas-only) but asset pipeline proven | Meets FPS targets at all 3 tiers | **Highest risk in project** — flagged since Stage 6 assessment | Same, plus explicit FPS sign-off |
| 11. Finale scene | Closing scene | `scenes/FinaleScene.jsx` | Stage 6 pattern proven | Same | Low | Same |
| 12. Web-strand accent | Signature UI detail | `components/WebStrand.jsx` | Any scene using it | Renders correctly, reduced-motion fallback works | Low | QA pass |
| 13. Audio | Wire per-scene audio | `systems/AudioSystem` (small) | All scenes built, `20-AUDIO-DESIGN.md` clips sourced | Muted-by-default verified, per-scene triggers correct | Low | Manual audio QA pass |
| 14. Responsive pass | Tier-specific behavior across all scenes | cross-cutting | All scenes built | `22-RESPONSIVE-EXPERIENCE.md` table verified per scene | Medium | Real-device pass on Tier A/B/C |
| 15. Performance pass | Hit `23-PERFORMANCE-SPEC.md` targets | cross-cutting | Stage 14 | All metrics green | Medium — Swing scene likely needs iteration here | Lighthouse/real-device numbers recorded |
| 16. Accessibility pass | `24-ACCESSIBILITY-SPEC.md` verification | cross-cutting | All scenes built | Keyboard + screen-reader + reduced-motion passes clean | Low-medium | Audit checklist complete |
| 17. QA | Full `27-TESTING-AND-QA.md` matrix | cross-cutting | Stages 14–16 | All checkpoints pass | — | Sign-off |
| 18. Deployment | Ship it | build config | Stage 17 | Production build, correct meta/OG per `25-SEO-METADATA.md` | Low | Live |
