/**
 * src/systems/PerformanceManager.js
 * Tracks device capabilities to assign a performance tier.
 */

export const TIER_HIGH = 'HIGH';
export const TIER_MEDIUM = 'MEDIUM';
export const TIER_LOW = 'LOW';

class PerformanceManager {
  constructor() {
    this.tier = TIER_MEDIUM;
    this.dpr = 1;
    this.reducedMotion = false;
    this.initialize();
  }

  initialize() {
    // Basic checks
    if (typeof window === 'undefined') return;
    
    this.dpr = window.devicePixelRatio || 1;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Very naive capability check for Cycle 1
    // A real implementation might check hardwareConcurrency, WebGL max texture size, etc.
    const concurrency = navigator.hardwareConcurrency || 4;
    
    if (this.reducedMotion) {
      this.tier = TIER_LOW;
    } else if (concurrency >= 8 && this.dpr > 1) {
      this.tier = TIER_HIGH;
    } else if (concurrency <= 4) {
      this.tier = TIER_LOW;
    } else {
      this.tier = TIER_MEDIUM;
    }
  }

  getTier() {
    return this.tier;
  }

  isReducedMotion() {
    return this.reducedMotion;
  }

  getDPR() {
    // Clamp DPR to 2 for performance, as done in original FrameCanvas
    return Math.min(this.dpr, 2);
  }
}

export const performanceManager = new PerformanceManager();
