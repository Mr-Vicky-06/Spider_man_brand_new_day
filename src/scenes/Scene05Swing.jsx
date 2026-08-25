/**
 * src/scenes/Scene05Swing.jsx
 * Development Prototype for Scene 05 (The Web / Swing).
 */
import React, { useState, useEffect } from 'react';
import FrameCanvas from '../components/FrameCanvas';
import { useScrollProgress } from '../lib/useInView';
import { AssetManifest } from '../data/AssetManifest';

export default function Scene05Swing() {
  const [sectionRef, progress] = useScrollProgress();
  const [metadata, setMetadata] = useState(null);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!reducedMotion) {
      // Fetch pacing metadata (dragonX mapping)
      fetch('/frames/scene05/metadata.json')
        .then(res => res.json())
        .then(data => setMetadata(data))
        .catch(err => console.error("Failed to load scene05 metadata", err));
    }
  }, [reducedMotion]);

  // Reduced motion: crossfade logic based on progress
  let visibleKeyframe = 0;
  if (reducedMotion) {
    if (progress < 0.33) visibleKeyframe = 0;
    else if (progress < 0.66) visibleKeyframe = 1;
    else visibleKeyframe = 2;
  }

  // Determine current frame using the metadata mapping if available
  let scrubFrame = 0;
  if (!reducedMotion && metadata && metadata.dragonX) {
    const rawFrame = Math.floor(progress * (metadata.dragonX.length - 1));
    const clampedFrame = Math.max(0, Math.min(metadata.dragonX.length - 1, rawFrame));
    const easedProgress = metadata.dragonX[clampedFrame];
    // Map back to frame index using the eased progress
    scrubFrame = Math.floor(easedProgress * (metadata.dragonX.length - 1));
  } else if (!reducedMotion) {
    // Linear fallback
    scrubFrame = Math.floor(progress * (AssetManifest.scenes.scene05.frames.frames - 1));
  }

  return (
    <section ref={sectionRef} style={{ height: '500vh' }} className="scene-container">
      <div className="scene-sticky scene-swing-bg">
        
        {!reducedMotion ? (
          <FrameCanvas 
            sequenceName={AssetManifest.scenes.scene05.frames.name}
            frameCount={AssetManifest.scenes.scene05.frames.frames}
            currentFrame={scrubFrame}
            fit="cover"
          />
        ) : (
          /* Reduced Motion Fallback: 3 Static Crossfading Keyframes */
          <div className="reduced-motion-crossfade" style={{ width: '100%', height: '100%', position: 'relative' }}>
            {AssetManifest.scenes.scene05.keyframes.map((kf, i) => (
              <img 
                key={kf.id}
                src={kf.url}
                alt={`Swing keyframe ${i + 1}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: visibleKeyframe === i ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            ))}
          </div>
        )}

        {/* Minimal cinematic chrome/title overlaid on the action */}
        <div className="scene-swing-ui">
          {/* Subtle vignette layer overlay */}
          <div className="swing-vignette" />
          
          {/* Content layer */}
          <div className="swing-content" style={{ opacity: progress > 0.8 ? Math.max(0, 1 - (progress - 0.8) * 10) : 1 }}>
            <h1 className="title-display" style={{ color: 'var(--color-cloud)' }}>
              SPIDER-MAN
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
}
