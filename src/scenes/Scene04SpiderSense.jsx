/**
 * src/scenes/Scene04SpiderSense.jsx
 * Development Prototype for Scene 04 (Spider-Sense).
 */
import React, { useState, useEffect } from 'react';
import SpiderSenseShader from '../components/SpiderSenseShader';
import { useScrollProgress } from '../lib/useInView';
import { AssetManifest } from '../data/AssetManifest';

export default function Scene04SpiderSense() {
  const [sectionRef, progress] = useScrollProgress();
  const [webglFailed, setWebglFailed] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Determine state based on thresholds
  let state = 'IDLE';
  if (progress > 0.01 && progress < 0.3) state = 'AWARE';
  else if (progress >= 0.3 && progress < 0.6) state = 'WARNING';
  else if (progress >= 0.6 && progress < 0.85) state = 'THREAT';
  else if (progress >= 0.85 && progress < 1.0) state = 'PEAK';
  else if (progress >= 1.0) state = 'RECOVERY';

  // Compute intensity curve per state
  let intensity = 0;
  let jolt = 0;
  
  // Custom easing function: easeInQuad for rising tension
  const easeIn = t => t * t;

  if (state === 'AWARE') {
    // 0 to 0.1
    const p = (progress - 0.01) / 0.29;
    intensity = p * 0.1;
  } else if (state === 'WARNING') {
    // 0.1 to 0.4
    const p = (progress - 0.3) / 0.3;
    intensity = 0.1 + easeIn(p) * 0.3;
  } else if (state === 'THREAT') {
    // 0.4 to 0.8
    const p = (progress - 0.6) / 0.25;
    intensity = 0.4 + easeIn(p) * 0.4;
    // Camera impulse builds right before PEAK
    if (p > 0.8 && !reducedMotion) jolt = (p - 0.8) * 5; 
  } else if (state === 'PEAK') {
    // 0.8 to 1.0 spike
    const p = (progress - 0.85) / 0.15;
    // Fast spike, rapid decay
    intensity = 0.8 + (1 - p) * 0.2; 
    if (!reducedMotion) jolt = (1 - p) * 15;
  }

  if (reducedMotion) {
    // Hard cap intensity, remove jolt entirely
    intensity = Math.min(intensity, 0.4);
    jolt = 0;
  }

  // Camera transform based on jolt and slow push
  const cameraScale = 1.0 + (progress * 0.1) + (jolt * 0.005);
  // Deterministic camera shake using sin waves driven by progress
  const shiftX = jolt > 0 ? Math.sin(progress * 100) * jolt : 0;
  const shiftY = jolt > 0 ? Math.cos(progress * 130) * jolt : 0;

  return (
    <section ref={sectionRef} style={{ height: '300vh' }} className="scene-container">
      <div className="scene-sticky scene-sense-bg">
        
        {/* Camera Abstraction */}
        <div 
          className="scene-sense-camera"
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${cameraScale}) translate3d(${shiftX}px, ${shiftY}px, 0)`,
            transformOrigin: '50% 50%',
            transition: jolt > 0 ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {(!webglFailed && !reducedMotion) ? (
            <SpiderSenseShader 
              imageSrc={AssetManifest.scenes.scene04.background.url}
              intensity={intensity}
              onError={() => setWebglFailed(true)}
              onInfo={setDebugInfo}
            />
          ) : (
            /* CSS Fallback / Reduced Motion */
            <img 
              src={AssetManifest.scenes.scene04.background.url}
              alt="Spider-Sense Environment"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: `hue-rotate(${intensity * 40}deg) contrast(${1 + intensity * 0.5}) brightness(${1 - intensity * 0.3})`,
                transition: 'filter 0.1s ease-out'
              }}
            />
          )}
        </div>

        {/* UI / Typography */}
        <div className="scene-sense-ui">
          <div style={{ opacity: intensity > 0.1 ? Math.min(1, intensity * 2) : 0, transition: 'opacity 0.2s' }}>
            <p className="kicker" style={{ color: 'var(--color-electric-blue)' }}>
              <span className="rule" style={{ background: 'var(--color-electric-blue)' }} />
              SIGNAL DETECTED
            </p>
          </div>
          {state === 'PEAK' && (
            <h2 className="title-display" style={{ 
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              color: 'var(--color-spider-red)',
              textShadow: '0 0 30px rgba(255,0,0,0.5)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: (1 - ((progress - 0.85) / 0.15))
            }}>
              THREAT
            </h2>
          )}
        </div>

        {/* Scene 04 Debug Overlay (Development Only) */}
        {process.env.NODE_ENV !== 'production' && (
          <div className="debug-overlay" style={{ top: 20, right: 20, bottom: 'auto', left: 'auto', textAlign: 'right' }}>
            <div>SCENE 04: SPIDER-SENSE</div>
            <div>PROGRESS: {progress.toFixed(3)}</div>
            <div>STATE: {state}</div>
            <div>INTENSITY: {intensity.toFixed(3)}</div>
            <div>JOLT: {jolt.toFixed(1)}</div>
            <div>WEBGL: {!webglFailed ? 'ACTIVE' : 'FAILED/FALLBACK'}</div>
            {debugInfo && (
              <>
                <div>TEXTURE: {debugInfo.uploadSize}</div>
                <div>CANVAS: {debugInfo.canvasSize}</div>
              </>
            )}
            <div>REDUCED MOTION: {reducedMotion ? 'YES' : 'NO'}</div>
          </div>
        )}

      </div>
    </section>
  );
}
