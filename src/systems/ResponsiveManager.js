/**
 * src/systems/ResponsiveManager.js
 * Centralized breakpoint tracking.
 */

class ResponsiveManager {
  constructor() {
    this.state = {
      isMobile: false,
      isTablet: false,
      isDesktop: true
    };
    if (typeof window !== 'undefined') {
      this.update();
      window.addEventListener('resize', this.update.bind(this), { passive: true });
    }
  }

  update() {
    const width = window.innerWidth;
    this.state.isMobile = width < 768;
    this.state.isTablet = width >= 768 && width < 1024;
    this.state.isDesktop = width >= 1024;
  }

  getState() {
    return this.state;
  }
}

export const responsiveManager = new ResponsiveManager();
