# Cycle 04 Implementation Report

## 1. Files Created
- `src/components/SpiderSenseShader.jsx`
- `src/scenes/Scene04SpiderSense.jsx`
- `public/frames/scene04/sense-bg.webp` (DEV PLACEHOLDER)
- `doc/CYCLE-04-IMPLEMENTATION-REPORT.md`

## 2. Files Modified
- `src/data/AssetManifest.js`
- `src/systems/SceneManager.jsx`
- `src/styles/scenes.css`
- `scripts/copy_frames.cjs`

## 3. Shader Architecture
- Wrote a pure, lightweight WebGL abstraction in `SpiderSenseShader.jsx`. No Three.js, GSAP, or heavy dependencies used.
- Responsibilities strictly confined to setting up a single texture over a full quad and reacting to the `uIntensity` uniform. 

## 4. State Machine
- Created a deterministic state machine within `Scene04SpiderSense.jsx` bound directly to global scroll progress mapped locally to `(0.0 - 1.0)`.
- Implements `IDLE -> AWARE -> WARNING -> THREAT -> PEAK -> RECOVERY` via specific thresholds (0.01, 0.3, 0.6, 0.85).

## 5. Intensity Curve
- The shader `uIntensity` uniform receives smoothed values that scale with the state machine.
- Used an `easeInQuad` (`t => t * t`) function during `WARNING` and `THREAT` to ramp tension up slowly then exponentially near the PEAK.

## 6. WebGL Texture Strategy
- Before attempting texture upload, the raw image dimensions are compared against `gl.getParameter(gl.MAX_TEXTURE_SIZE)`. 
- If the image exceeds supported bounds (which is common on some mobile chips for 4k+), an offscreen `<canvas>` is used to proportionately downscale the image first, preventing WebGL crashes.

## 7. Texture Resolution Used
- Used `1920x1080` placeholder dev image from `scene01`.

## 8. CSS Fallback
- Added state-driven `hue-rotate()`, `contrast()`, and `brightness()` inline styles that emulate the shift when `onError` trips for the WebGL canvas, keeping the application entirely functional on Tier D devices.

## 9. Reduced-Motion Behavior
- Bound to `window.matchMedia('(prefers-reduced-motion: reduce)')`. 
- In this mode, the scene forces the CSS Fallback, caps the max intensity at `0.4`, completely disables the screen-space jolt, and prevents flashing colors.

## 10. Performance Observations
- The shader caps resolution internally by multiplying bounding rects against `devicePixelRatio`, but clamped to `1920x1080` max to prevent extreme overhead on 4K/5K displays. 
- Avoided `willReadFrequently` and `requestAnimationFrame` leaks by properly nullifying all references on unmount.

## 11. Mobile Observations
- The scene is resilient against context loss and supports native browser back/forward without dropping the state machine.
- Passive scroll binding means scrolling past the scene feels weightless.

## 12. WebGL Compatibility Observations
- Forced `UNPACK_FLIP_Y_WEBGL` equivalent inside the Vertex Shader (`vUv.y = 1.0 - vUv.y;`) to avoid texture flipping inconsistencies across different graphics drivers.

## 13. Problems Encountered
- Mapping a single intensity float uniformly to three distinct effects (warp, vignette, and chromatic shift) required fine-tuning the scalar values to prevent the scene from looking "glitchy" instead of "tense".

## 14. Fixes
- Dialed chromatic shift down (`dist * 0.03 * uIntensity`) and shifted the electric blue tint to a mix formula (`mix(color, color + tint * 0.5, uIntensity * 0.5)`) which maintains legibility.

## 15. Remaining Limitations
- No Audio System yet. The subtle low tones mentioned in the design spec should ideally be orchestrated globally since scene unmounts can cause audio popping.

## 16. Recommended Cycle 5
- Proceed to **Cycle 05 (The Web / Swing)** where we'll transition out of the unresolved tension and introduce the cinematic swing mechanics.
