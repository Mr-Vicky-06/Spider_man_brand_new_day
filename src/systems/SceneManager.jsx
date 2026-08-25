/**
 * src/systems/SceneManager.jsx
 * Abstraction for scene lifecycle (enter, update, exit, progress).
 */
import React from 'react';
import Scene01City from '../scenes/Scene01City';
import Scene02Peter from '../scenes/Scene02Peter';
import Scene03Mask from '../scenes/Scene03Mask';
import Scene04SpiderSense from '../scenes/Scene04SpiderSense';

export default function SceneManager({ globalProgress }) {
  // We rely on native CSS `position: sticky` and `useScrollProgress` inside 
  // the scenes to manage their local progress. The SceneManager simply stacks 
  // them in order, creating a continuous global experience.
  
  const scenes = [
    { id: 'scene01', component: Scene01City },
    { id: 'scene02', component: Scene02Peter },
    { id: 'scene03', component: Scene03Mask },
    { id: 'scene04', component: Scene04SpiderSense }
  ];

  return (
    <div className="scene-manager">
      {scenes.map((scene) => {
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
