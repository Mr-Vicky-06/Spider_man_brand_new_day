/**
 * src/scenes/Scene01City.jsx
 * Development Prototype for Scene 01.
 */
import React, { useRef, useEffect, useState } from 'react';
import FrameCanvas from '../components/FrameCanvas';
import { useScrollProgress, useSampled } from '../lib/useInView';

export default function Scene01City() {
  // Use the existing hook to get section ref and 0..1 progress based on scroll
  const [sectionRef, progress] = useScrollProgress();
  const phase = useSampled(progress);

  // Camera prototype simulation using CSS transforms mapped from progress (phase)
  // Starts far away (scale 0.8), moves closer (scale 1.1)
  const cameraScale = 0.8 + (phase * 0.3);
  const cameraY = phase * 10; // subtle parallax

  return (
    <section ref={sectionRef} style={{ height: '300vh' }} className="scene-container">
      <div className="scene-sticky">
        
        {/* Background Atmosphere */}
        <div className="scene-city-bg"></div>

        {/* Development Rain Effect (CSS based for Cycle 1) */}
        <div className="scene-city-rain" style={{ 
          background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2NkYGD4z8DAwMgAI0AMDA4FAgEE2lIAAAAASUVORK5CYII=)',
          backgroundSize: '20px 20px',
          opacity: 0.1,
          animation: 'rain-fall 0.4s linear infinite'
        }}></div>
        <style>{`
          @keyframes rain-fall { from { background-position: 0 0; } to { background-position: 20px 100vh; } }
          @media (prefers-reduced-motion: reduce) { .scene-city-rain { animation: none; opacity: 0.05; } }
        `}</style>

        {/* Camera Abstraction Container */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="scene-city-silhouettes"></div>
          
          {/* FrameCanvas - loads test sequence */}
          <FrameCanvas 
            name="scene01" 
            progressRef={progress} 
            ease={0.12}
            className="dev-frame-canvas"
          />
        </div>

        {/* UI / Typography */}
        <div className="scene-city-ui">
          <p className="kicker">
            <span className="rule" />
            DEVELOPMENT PROTOTYPE
          </p>

          <div className="scene-city-title-wrapper" style={{ opacity: Math.max(0, 1 - (phase * 2)) }}>
            <h1 className="title-display">NEW YORK CITY</h1>
            <p className="body-text">03:17 AM</p>
          </div>

          <div className="scroll-cue" style={{ opacity: phase > 0.8 ? 0 : 1 }}>
            <span>SCROLL</span>
            <span className="cue-line" />
          </div>
        </div>

        {/* Transition Overlay (fades to black at the end of the scene) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'black',
            opacity: Math.max(0, (phase - 0.8) * 5), // Fades in from 0.8 to 1.0
            pointerEvents: 'none',
            zIndex: 100
          }}
        ></div>

      </div>
    </section>
  );
}
