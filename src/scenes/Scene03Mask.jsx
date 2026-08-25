/**
 * src/scenes/Scene03Mask.jsx
 * Development Prototype for Scene 03 (The Mask).
 */
import React from 'react';
import RevealStage from '../components/RevealStage';
import { useScrollProgress, useSampled } from '../lib/useInView';
import { AssetManifest } from '../data/AssetManifest';

export default function Scene03Mask() {
  const [sectionRef, progress] = useScrollProgress();
  const phase = useSampled(progress);

  // Cinematic theme token equivalent: "Web White" for a sharp, defined edge
  const themeColor = '255, 255, 255'; 

  return (
    <section ref={sectionRef} style={{ height: '200vh' }} className="scene-container">
      <div className="scene-sticky scene-mask-bg">
        
        <div style={{ position: 'absolute', inset: 0 }}>
          <RevealStage 
            bottom={AssetManifest.scenes.scene03.unmasked.url}
            top={AssetManifest.scenes.scene03.masked.url}
            trailColor={themeColor}
            trailOpacity={0.4}
            trailWidth={0.8}
            trailIntensity={0.6}
            trailLength={12}
            overlay="rgba(4,6,12,0.85)"
          />
        </div>

        {/* UI / Typography */}
        <div className="scene-mask-ui">
          <div style={{ opacity: Math.max(0, (phase - 0.1) * 2.5) }}>
            <p className="kicker" style={{ color: 'var(--color-spider-red)', opacity: 0.9 }}>
              <span className="rule" style={{ background: 'var(--color-spider-red)' }} />
              DEV_PLACEHOLDER_ONLY
            </p>
            <h2 className="title-display" style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              textShadow: '0 4px 24px rgba(0,0,0,0.8)',
              letterSpacing: '0.15em'
            }}>
              THE MASK
            </h2>
            <p className="body-text" style={{ maxWidth: '30ch', marginTop: '1rem', color: 'var(--color-white)', opacity: 0.8 }}>
              Move to reveal. The division between man and myth.
            </p>
          </div>
        </div>

        {/* Transition In (fades from black as progress starts) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: Math.max(0, 1 - (phase * 6)), // Fast fade in
            pointerEvents: 'none',
            zIndex: 100
          }}
        ></div>

        {/* Transition Out (fades to black at the end) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: Math.max(0, (phase - 0.85) * 6),
            pointerEvents: 'none',
            zIndex: 100
          }}
        ></div>

      </div>
    </section>
  );
}
