# Implementation Reconciliation

This document tracks the discrepancies between the Master Project Specification documentation and the current Solo Leveling repository implementation, dictating the action to take for each existing system.

| Documentation Requirement | Existing Implementation | Action | Notes |
|---------------------------|--------------------------|--------|-------|
| **Core Rendering** | `FrameCanvas.jsx` | KEEP / ADAPT | Preserve performance patterns, DPR handling, and frame sequence rendering. Modify only to fit the new SceneManager. |
| **Scroll Tracking** | `useInView.js` / `useScrollProgress` | KEEP | Valuable asset. Retain `useSampled` and intersection observer logic. |
| **Interactive Canvas** | `GlyphRain.jsx`, `SplashCursor.jsx`, `Thunder.jsx` | REPLACE | Replace with Spider-Sense, Web System, and City Atmosphere per `08-WEB-SYSTEM.md` and `09-SPIDER-SENSE-SYSTEM.md`. |
| **Stage Reveal** | `RevealStage.jsx` | ADAPT | Repurpose for Scene 03 (The Mask) or Scene 06. Adapt for new interaction methods (non-pointer path). |
| **Global Shell** | `App.jsx` | REFACTOR | Remove scene-specific logic. Refactor into an `ExperienceController` / composition root. |
| **Styling** | `index.css` | REFACTOR | Migrate to a design token system (`src/styles/tokens.css`) per `11-DESIGN-SYSTEM.md` and `12-TYPOGRAPHY.md`. |
| **Scene Management** | N/A | CREATE | Build `SceneManager` to handle lifecycle (enter, update, exit) across the 6 specified scenes. |
| **Performance/Assets**| N/A | CREATE | Implement `AssetManifest`, `AssetLoader`, `PerformanceManager`, `ResponsiveManager`, `AccessibilityManager`. |
| **Testing** | `scripts/test-scroll.js` etc. | ADAPT | Reuse existing Puppeteer screenshot infrastructure for visual QA checkpoints. |

## Documentation vs Reality Notes
- The current `App.jsx` holds all scenes directly (`AwakenSection`, `MonarchSection`, `RevealSection`). The architecture spec requires a robust `SceneManager` and discrete scene components (`src/scenes/`).
- The project currently has no global state or performance manager (just relies on React's render loop and refs). We must create these foundational systems before touching cinematic assets.
- No new external dependencies will be added (e.g. Three.js, GSAP) as the existing `FrameCanvas` and native DOM APIs are sufficient.
