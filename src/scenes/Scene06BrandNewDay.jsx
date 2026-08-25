/**
 * src/scenes/Scene06BrandNewDay.jsx
 * Development Prototype for Scene 06 (Brand New Day).
 */
import React from 'react';
import { useScrollProgress } from '../lib/useInView';
import { AssetManifest } from '../data/AssetManifest';

export default function Scene06BrandNewDay() {
  const [sectionRef, progress] = useScrollProgress();

  return (
    <section ref={sectionRef} style={{ height: '200vh' }} className="scene-container">
      <div className="scene-sticky scene-finale-bg">
        
        {/* Static Background Layer */}
        <div 
          className="scene-finale-image-wrapper"
          style={{ 
            opacity: progress > 0.1 ? Math.min(1, (progress - 0.1) * 3) : 0,
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <img 
            src={AssetManifest.scenes.scene06.background.url}
            alt="Brand New Day"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="scene-finale-overlay" />
        </div>

        {/* UI / Typography */}
        <div className="scene-finale-ui">
          <h1 
            className="title-display" 
            style={{ 
              color: 'var(--color-cloud)',
              opacity: progress > 0.4 ? Math.min(1, (progress - 0.4) * 4) : 0,
              transform: `translateY(${progress > 0.4 ? 0 : 20}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            BRAND NEW DAY
          </h1>
          
          <div 
            className="footer-disclosure"
            style={{
              opacity: progress > 0.8 ? Math.min(1, (progress - 0.8) * 5) : 0,
              transform: `translateY(${progress > 0.8 ? 0 : 10}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            <div className="foot-rule" />
            <p className="kicker">
              NOT AFFILIATED WITH MARVEL OR SONY PICTURES. A FAN TRIBUTE.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
