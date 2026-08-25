/**
 * src/scenes/Scene02Peter.jsx
 * Development Prototype for Scene 02 (Peter Parker).
 */
import React from 'react';
import FrameCanvas from '../components/FrameCanvas';
import { useScrollProgress, useSampled } from '../lib/useInView';

export default function Scene02Peter() {
  const [sectionRef, progress] = useScrollProgress();
  const phase = useSampled(progress);

  // Subtle camera movement: very slow push-in to emphasize intimacy
  const cameraScale = 1.0 + (phase * 0.1);

  return (
    <section ref={sectionRef} style={{ height: '300vh' }} className="scene-container">
      <div className="scene-sticky scene-peter-bg">
        
        {/* Camera Abstraction Container */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${cameraScale})`,
            transformOrigin: '50% 40%', // Slightly off-center focus
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* FrameCanvas with dragonX metadata driven pacing */}
          <FrameCanvas 
            name="scene02" 
            progressRef={progress} 
            ease={0.12}
            className="dev-frame-canvas peter-frame-canvas"
            fit="cover"
          />
        </div>

        {/* UI / Typography */}
        <div className="scene-peter-ui">
          <div style={{ opacity: Math.max(0, (phase - 0.2) * 2) }}>
            <p className="kicker" style={{ color: 'var(--color-white)', opacity: 0.6 }}>
              <span className="rule" />
              DEV_PLACEHOLDER_ONLY
            </p>
            <h2 className="title-display" style={{ 
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              textShadow: 'none',
              letterSpacing: '0.1em'
            }}>
              PETER PARKER
            </h2>
            <p className="body-text" style={{ maxWidth: '30ch', marginTop: '1rem' }}>
              The weight of the city, suspended in a single quiet moment.
            </p>
          </div>
        </div>

        {/* Transition In (fades from black as progress starts) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: Math.max(0, 1 - (phase * 5)), // Fades out early in the scene
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
            opacity: Math.max(0, (phase - 0.8) * 5),
            pointerEvents: 'none',
            zIndex: 100
          }}
        ></div>

      </div>
    </section>
  );
}
