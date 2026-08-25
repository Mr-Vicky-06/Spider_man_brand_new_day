/**
 * src/data/AssetManifest.js
 * Centralized index of all assets. No final assets yet; uses development placeholders.
 */

export const AssetManifest = {
  scenes: {
    scene01: {
      frames: {
        id: "scene01-dev-sequence",
        type: "image-sequence",
        name: "scene01", // used by useAtlas
        frames: 24,
        width: 960,
        height: 540,
        format: "webp"
      }
    }
  }
};
