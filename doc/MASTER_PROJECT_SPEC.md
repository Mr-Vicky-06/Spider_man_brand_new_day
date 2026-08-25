# MASTER PROJECT SPEC — Spider-Man: Brand New Day (interactive experience)
Status: **v0.2 — architecture and creative direction locked. Scene/design/motion/
asset/QA docs drafted. See `DOCUMENTATION-CONSISTENCY-AUDIT.md` for readiness
verdict.** This replaces v0.1 as the single source of truth; it links out to
the detailed docs rather than restating them, per the "do not create a
contradictory second master document" rule.

## 1. Vision
An original fan-tribute interactive site in the visual language of *Spider-Man:
Brand New Day* — dark, urban, atmospheric, restrained — built by transplanting
the existing Solo Leveling repo's genuinely good scroll-driven frame-sequence
engine into a new creative and information architecture.

## 2. Goals / non-goals
See `02-CREATIVE-DIRECTION.md` (goals implicit in the anti-pattern list) and
`01-ARCHITECTURE-DECISION.md`'s rejected-alternatives section for explicit
non-goals (no Three.js scene, no photorealistic 3D city, no official-product framing).

## 3. Repository findings → `01-repository-analysis.md`
Keep: scroll-progress hooks, `FrameCanvas`, `RevealStage` (adapted). Replace:
`GlyphRain`, `Thunder`, `SplashCursor`.

## 4. Architecture decision → `01-ARCHITECTURE-DECISION.md`
Hybrid: Canvas 2D for all frame sequences (unchanged `FrameCanvas`), one small
custom WebGL shader for spider-sense only, DOM/CSS for everything else. No
Three.js/R3F, no WebGPU, zero new runtime dependencies.

## 5. Creative direction → `02-CREATIVE-DIRECTION.md`
Locked color tokens, Bebas Neue/Inter typography (verified OFL license in
`12-TYPOGRAPHY.md`), practical-light-only philosophy, explicit anti-pattern list.

## 6. Experience & story → `03-EXPERIENCE-BIBLE.md`, `04-STORYBOARD.md`, `05-SHOT-LIST.md`
Six scenes (City, Peter, Mask, Spider-Sense, Swing, Brand New Day) — reduced
from the brief's 10-scene suggestion, reasoning documented in `04-STORYBOARD.md`.
Emotional arc deliberately de-escalates after the Swing scene's peak.

## 7. Camera & scenes → `06-CAMERA-SYSTEM.md`, `07-SCENE-SPECIFICATIONS.md`
No literal camera object — camera behavior is simulated entirely by which
frame of a pre-rendered sequence is displayed.

## 8. Interaction, web, spider-sense → `10-INTERACTION-SYSTEM.md`, `08-WEB-SYSTEM.md`, `09-SPIDER-SENSE-SYSTEM.md`
Web system scoped down from a full physics engine to a small SVG accent
(justified in that doc — the storyboard doesn't need more). Spider-sense has a
full 6-state machine.

## 9. Design & motion → `11-DESIGN-SYSTEM.md`, `12-TYPOGRAPHY.md`, `13-MOTION-SYSTEM.md`, `14-EFFECT-SYSTEM.md`
Full token set, verified fonts, 7-category motion grammar, per-effect cost/fallback table.

## 10. Technical architecture → `15-TECHNICAL-ARCHITECTURE.md`
Merges component map and state management (documented as a deliberate
consolidation, not an omission). Zero global state library; refs for
high-frequency data, React state/Context for low-frequency flags only.

## 11. Assets → `18-ASSET-ARCHITECTURE.md`, `19-ASSET-MANIFEST-SPEC.md`, `assets/ASSET-INTELLIGENCE.md`, `assets/ORIGINAL-ASSET-MAP.md`
Manifest v2 with per-tier density. Font licenses verified. Texture/audio
platform licenses verified (Poly Haven/ambientCG CC0, Mixkit Free License with
per-clip caveat, Freesound per-sound license). **Individual asset selection for
textures/audio deliberately deferred** — flagged, not silently skipped.

## 12. Audio, WebGL strategy → `20-AUDIO-DESIGN.md`, `21-3D-WEBGL-STRATEGY.md`
Muted-by-default. WebGL confined to one shader.

## 13. Responsive, performance, accessibility → `22-RESPONSIVE-EXPERIENCE.md`, `23-PERFORMANCE-SPEC.md`, `24-ACCESSIBILITY-SPEC.md`
4 tiers (A/B/C/D-reduced-motion). Measurable LCP/CLS/INP/FPS/payload targets.
Full accessibility spec incl. a non-pointer path for the Mask-scene interaction.

## 14. SEO, copyright → `25-SEO-METADATA.md`, `26-COPYRIGHT-BRAND-POLICY.md`
Explicit fan-tribute disclosure in title, meta description, and footer.

## 15. QA → `27-TESTING-AND-QA.md`
Merges testing strategy/visual QA/performance QA into one matrix, reuses the
existing repo's Puppeteer screenshot scripts rather than building new tooling.

## 16. Implementation → `30-IMPLEMENTATION-CONTRACT.md`, `31-IMPLEMENTATION-ROADMAP.md`
12 binding rules + 18-stage roadmap with acceptance criteria. Swing scene
(Stage 10) flagged as the single highest-risk stage in the project.

## 17. Definition of done
A scene is done when it passes every checkpoint in `27-TESTING-AND-QA.md` on
at least one real device per responsive tier, plus a keyboard-only and a
reduced-motion pass. The project is done when all 18 roadmap stages are
signed off and `DOCUMENTATION-CONSISTENCY-AUDIT.md` reads READY FOR
IMPLEMENTATION (see that doc for current status).

## 18. Future roadmap (explicitly out of scope now)
A literal free-camera 3D swing scene (the one condition that would flip the
Three.js decision), a bigger interactive web mechanic beyond the current SVG
accent, deep-linkable scene URLs. None of these are needed by the current
creative direction; noted so a future revision doesn't have to rediscover why
they weren't built.
