/**
 * src/systems/SceneManager.jsx
 * Abstraction for scene lifecycle (enter, update, exit, progress).
 */
import React from 'react';
import Scene01City from '../scenes/Scene01City';

// The SceneManager tracks the active scene index based on global progress.
// For Cycle 1, we only have 1 scene.

export default function SceneManager({ globalProgress }) {
  // 0.0 to 1.0 logic to determine which scene is active.
  // In a full implementation, we'd map progress ranges to specific scenes.
  // Right now, scene 01 takes the whole progress (0 - 1).
  
  const scenes = [
    { id: 'scene01', component: Scene01City, range: [0, 1] }
  ];

  return (
    <div className="scene-manager">
      {scenes.map((scene, index) => {
        // Render all registered scenes, they will manage their own sticky/inView behavior
        const SceneComponent = scene.component;
        return (
          <SceneComponent 
            key={scene.id} 
            globalProgress={globalProgress} 
            isActive={true} 
          />
        );
      })}
    </div>
  );
}
