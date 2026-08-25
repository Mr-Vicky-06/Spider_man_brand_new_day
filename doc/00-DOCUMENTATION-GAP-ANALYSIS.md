# 00 — Documentation Gap Analysis

| Area | Current state | Missing | Depends on | Priority |
|---|---|---|---|---|
| Repository analysis | Complete — real code read, keep/adapt/replace table done | Nothing blocking | — | done |
| Architecture (Canvas/WebGL/Three.js) | Flagged as "the one real fork," not resolved | Explicit decision + rejected-alternatives reasoning | Repo analysis | **P0 — blocks everything visual/technical** |
| Creative direction | Only starting color tokens + one-paragraph mood, explicitly marked "not final" | Locked palette, type, texture/lighting philosophy, anti-pattern list | Nothing — can lock now | **P0** |
| Storyboard/scenes | 6-scene condensed table, no shots, no camera behavior, no per-scene tech spec | Full storyboard, shot list, camera system, scene specs | Architecture + creative direction | P1 |
| Web system / spider-sense | Named as reuse targets only, no design | Dedicated system design for each | Architecture decision | P1 |
| Interaction system | Implied via scene table, not mapped | Full input→state→response map | Storyboard | P1 |
| Design system / typography | Color tokens only; type direction said "needs research," not done | Verified font choices, full token set (spacing/radii/shadow/z-index) | Creative direction | P1 |
| Motion / effect systems | Not started | Duration/easing scale, motion grammar, effect-by-effect cost table | Architecture + creative direction | P1 |
| Technical architecture / components / state | Folder sketch only (`components/scenes/lib/data`) | Concrete system responsibilities, component tree, state boundaries | Architecture decision | P1 |
| Asset architecture / manifest | v1 manifest example only (`sequence/frames/format/width/height/fps`) | Full manifest schema incl. density tiers, naming convention | Architecture decision | P1 |
| Open-asset intelligence | Named platform categories only, **zero individual assets verified** | Real per-asset research (fonts done this pass; textures/images/audio/3D still need per-asset verification when a shot list locks what's actually needed) | Storyboard (need to know what's needed before sourcing it) | P2 — deliberately sequenced late; sourcing before scenes exist wastes verification effort on assets that may not survive scene lock |
| Audio design | One line in master spec | Full ambience/SFX map per scene + state | Storyboard + spider-sense system | P2 |
| Responsive / performance / accessibility | Noted that `FrameCanvas` already covers most of it | Explicit tiers, measurable budgets, per-scene mobile adaptation | Architecture + scenes | P2 |
| SEO / copyright policy | One paragraph in master spec | Formal docs | Creative direction | P2 |
| QA / testing | Not started | Test plan using existing Puppeteer scripts | All of the above | P3 |
| Implementation roadmap | High-level 6-step list only | Staged plan with acceptance criteria per stage | Everything above | P3 |

## Contradictions found and resolved in this pass
- Master spec v0.1 said "no new dependency by default" but also flagged CameraController/WebGL as an open question — Phase B below closes that loop with an explicit, bounded decision instead of leaving it open.
- Storyboard table in master spec v0.1 (6 scenes) vs. the original brief's 10-scene suggestion — this pass keeps 6, justified in `04-STORYBOARD.md`, and states explicitly why the other four were folded in rather than silently dropped.

## What downstream work was blocked on
Everything creative/technical was waiting on the architecture fork. That's resolved first, below.
