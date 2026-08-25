/**
 * src/systems/AccessibilityManager.js
 * Tracks reduced motion and screen reader states.
 */

class AccessibilityManager {
  constructor() {
    this.reducedMotion = false;
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = mediaQuery.matches;
      mediaQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
      });
    }
  }

  isReducedMotion() {
    return this.reducedMotion;
  }
}

export const accessibilityManager = new AccessibilityManager();
