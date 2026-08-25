# Cycle 03 Implementation Report

## Overview
Cycle 03 (Scene 03 - The Mask) successfully introduces the first major direct user interaction using a pointer/touch-driven mask reveal. The scene preserves the global scroll flow (which controls transition and typography opacity) while decoupling the visual interaction from the scroll itself.

## 1. Files Created
- `src/scenes/Scene03Mask.jsx`
- `public/frames/scene03/unmasked.webp` (DEV PLACEHOLDER)
- `public/frames/scene03/masked.webp` (DEV PLACEHOLDER)
- `doc/CYCLE-03-IMPLEMENTATION-REPORT.md`

## 2. Files Modified
- `src/components/RevealStage.jsx`
- `src/systems/SceneManager.jsx`
- `src/data/AssetManifest.js`
- `scripts/copy_frames.cjs`
- `src/styles/scenes.css`

## 3. RevealStage Changes
- **Preserved Existing Behavior**: Fully backwards compatible with prior implementations.
- **Made Themeable**: Added `trailColor` (accepts RGB string), `trailOpacity`, `trailWidth`, `trailIntensity`, and `trailBlur` props.
- **Improved Touch/Mobile**:
  - Expanded bounding box limits (`-50` to `width + 50`) so fast swipes off-screen don't instantly snap the lens away abruptly.
  - Reduced trail rendering iterations under `prefers-reduced-motion` to a minimal static lens.
- **Default Idle State**:
  - Added a `setupDefaultHint()` function that pre-positions the lens at `20%, 80%` on initial load. This creates a subtle visual hint that the environment is interactive without requiring an explicit tooltip.

## 4. Scene 03 Architecture
- Implemented `Scene03Mask.jsx` utilizing the themeable `RevealStage`.
- Uses `useScrollProgress` and `useSampled` solely to fade the typography and background in and out. The interaction itself uses `RevealStage`'s internal pointer capture.
- Applied the **Web White** theme (`255, 255, 255`) for the lens bloom to distinguish it from a generic cyan glow.

## 5. Pointer Interaction Implementation
- Standard desktop pointer `mousemove` drives the lens via a smoothed velocity curve (`0.13` easing factor), painting a tapered mask gradient path into an offscreen canvas.

## 6. Touch Implementation
- Bound `touchmove` to seamlessly control the same coordinate system as the pointer.
- The use of `passive: true` listeners combined with CSS `position: sticky` ensures native page scroll operates smoothly without scroll-jacking, even if the user touches the canvas directly.

## 7. Placeholder Asset Source
- `unmasked.webp` (frame 000) and `masked.webp` (frame 023) were extracted from the `awaken` development sequence as temporary DEV placeholders.

## 8. Accessibility Behavior
- Reduced motion preferences fall back to a minimal `trailLength=2` (a simple disc without the long streaming tail) to reduce strobing or visual noise.
- Aria-labels were preserved on the canvas itself. 

## 9. Performance Observations
- Using the explicit `<canvas>` context flag `willReadFrequently: true` was considered, but we avoided aggressive pixel reading. The lens composite operation (`source-over` and `source-in`) uses standard hardware acceleration efficiently.
- Negligible impact on global scroll frame rate since the `requestAnimationFrame` loop in `RevealStage` runs independently from the scroll observer.

## 10. Problems Encountered
- `RevealStage` originally assumed a fixed color (`159, 228, 255`). Rewriting it to support dynamic string injection into `rgba()` gradients required carefully balancing alpha modifiers so that custom colors like solid white (`255,255,255`) didn't overexpose the center point.

## 11. Recommended Cycle 4
- Proceed to **Cycle 04 (Spider-Sense)** to implement the threshold-triggered WebGL distortion overlay on a static image.
