import React from 'react';
import ExperienceController from './systems/ExperienceController';

/**
 * App is simply the composition layer holding the global Experience Controller.
 */
export default function App() {
  return (
    <main>
      <ExperienceController />
    </main>
  );
}
