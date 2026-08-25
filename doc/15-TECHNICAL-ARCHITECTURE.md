# 15 — Technical Architecture (includes Component Map & State Management)

Merged three requested docs (Technical Architecture, Component Map, State
Management) into one file — they describe one coherent system and splitting
them would mean cross-referencing the same component list three times.

## Folder structure
```
src/
├── components/     # FrameCanvas, RevealStage — kept unmodified; new: RainField, SpiderSenseLayer, WebStrand
├── scenes/         # CityScene, PeterScene, MaskScene, SpiderSenseScene, SwingScene, FinaleScene
├── systems/         # SceneManager, ScrollController (thin wrapper composing existing hooks)
├── lib/            # useInView.js (unchanged), useAtlas.js (manifest v2), useSceneState.js (new, small)
├── data/            # scene-manifest.json, asset-manifest.json
├── styles/         # tokens.css (design system), index.css (kept methodology, new content)
└── App.jsx          # thin composition: <SceneManager><CityScene/>...</SceneManager>, not a content file
```

## Systems and responsibilities
| System | Responsibility | Inputs | Outputs | Depends on | Lifecycle | Fallback |
|---|---|---|---|---|---|---|
| **SceneManager** | mounts/unmounts scenes, holds no per-frame state itself | scroll position (via child hooks) | scene visibility | React context, `useInView` | mounts once, per-scene children mount/unmount on view | n/a |
| **ScrollController** | thin wrapper — literally just re-exports `useScrollProgress`/`useSampled` under a system-level name for discoverability | DOM scroll | progress refs | `useInView.js` (unchanged) | per-scene | n/a |
| **FrameSequenceController** | is `FrameCanvas` + `useAtlas`, unchanged | progress ref, manifest | canvas draw calls | `useAtlas.js` | per-scene | reduced-motion static frame (already built in) |
| **AssetLoader/Manifest** | resolves manifest v2, picks density tier | device tier signal | frame URLs to load | `19-ASSET-MANIFEST-SPEC.md` | app-level, once | lower tier on load failure/timeout |
| **SpiderSenseSystem** | owns the WebGL context for the distortion layer | scroll progress within its scene | shader uniform updates | `01-ARCHITECTURE-DECISION.md` | mounts only during Scene 04 | CSS filter (Tier C) |
| **WebSystem** | SVG web-strand component, scoped and small | view-triggered | SVG draw-on | none | mounts on demand | static strand |
| **PerformanceManager** | detects device tier once at load (not continuously polled) | `navigator` hints, a one-time canvas benchmark if needed | tier flag consumed by AssetLoader/effects | none | app-level, once | defaults to lowest tier on uncertainty |
| **ResponsiveManager** | breakpoint state | `window` resize (debounced) | breakpoint flag | design tokens (`11-DESIGN-SYSTEM.md`) | app-level | n/a |
| **AccessibilityManager** | `prefers-reduced-motion` + focus management | media query, keyboard events | reduced-motion flag consumed everywhere | none | app-level, once | n/a — this *is* the fallback path for everything else |

## Component map
```
App
├── SceneManager
│   ├── CityScene        (FrameCanvas, RainField, kicker/title UI)
│   ├── PeterScene        (FrameCanvas)
│   ├── MaskScene          (RevealStage, adapted)
│   ├── SpiderSenseScene   (still frame + SpiderSenseLayer)
│   ├── SwingScene        (FrameCanvas, positional indexing)
│   └── FinaleScene       (FrameCanvas or static img, footer)
└── (global) AccessibilityManager wraps the tree, not a visible component
```
No component owns more than one scene's worth of logic — `App.jsx` itself
stays under ~40 lines, all content logic lives in `scenes/`, directly
addressing the brief's "no giant App.jsx" rule.

## State management
- **High-frequency (per-frame) state stays in refs**, never React state —
  scroll progress, frame-canvas draw position, distortion shader uniforms.
  This is a direct continuation of the existing repo's approach and is
  explicitly preserved per the engineering rule, not reinvented.
- **Low-frequency state uses React state** — which scene is currently in
  view (for mounting/unmounting), reduced-motion flag, device tier, audio
  muted/unmuted. All of these change rarely enough that re-renders are cheap.
- **No global state library.** React Context for the handful of app-level
  flags (reduced-motion, device tier, audio state) is sufficient — Redux/
  Zustand/Jotai would be solving a problem this project doesn't have (no deep
  prop-drilling, no complex cross-scene shared state).
