/**
 * src/systems/AssetLoader.js
 * Basic foundation for tracking loading state of assets.
 */

class AssetLoader {
  constructor() {
    this.assets = new Map();
    this.loading = new Set();
  }

  register(id, data) {
    this.assets.set(id, { ...data, loaded: false });
  }

  markLoaded(id) {
    if (this.assets.has(id)) {
      this.assets.get(id).loaded = true;
      this.loading.delete(id);
    }
  }

  startLoading(id) {
    this.loading.add(id);
  }

  isLoading(id) {
    return this.loading.has(id);
  }

  isLoaded(id) {
    return this.assets.get(id)?.loaded || false;
  }
}

export const assetLoader = new AssetLoader();
