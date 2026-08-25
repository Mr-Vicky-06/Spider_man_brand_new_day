/**
 * src/systems/ExperienceController.jsx
 * Coordinates global experience progress, transitions, and the debug overlay.
 */
import React, { useState, useEffect } from 'react';
import SceneManager from './SceneManager';
import { performanceManager } from './PerformanceManager';
import { accessibilityManager } from './AccessibilityManager';

export default function ExperienceController() {
  const [globalProgress, setGlobalProgress] = useState(0);
  const [fps, setFps] = useState(0);

  // Debug overlay tracker for FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let raf;

    const loop = (time) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="experience-root">
      {/* Dev Debug Overlay */}
      {import.meta.env.DEV && (
        <div className="debug-overlay">
          <div>SCENE: 01_CITY</div>
          <div>GLOBAL PROG: {(globalProgress * 100).toFixed(1)}%</div>
          <div>FPS: {fps}</div>
          <div>DPR: {performanceManager.getDPR()}</div>
          <div>TIER: {performanceManager.getTier()}</div>
          <div>REDUCED MOTION: {accessibilityManager.isReducedMotion() ? 'YES' : 'NO'}</div>
        </div>
      )}

      {/* 
        In a full implementation, a global scroll tracker would update globalProgress 
        and pass it down to SceneManager. For now, SceneManager's scenes manage their 
        own localized scroll via useScrollProgress, so we just wrap them here.
      */}
      <SceneManager globalProgress={globalProgress} />
    </div>
  );
}
