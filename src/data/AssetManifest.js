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
        name: "scene01",
        frames: 24,
        width: 1920,
        height: 1080,
        format: "webp"
      }
    },
    scene02: {
      frames: {
        id: "scene02-dev-sequence",
        type: "image-sequence",
        name: "scene02",
        frames: 24,
        width: 1920,
        height: 1080,
        format: "webp"
      }
    },
    scene03: {
      unmasked: {
        id: "scene03-unmasked",
        type: "image",
        url: "/frames/scene03/unmasked.webp"
      },
      masked: {
        id: "scene03-masked",
        type: "image",
        url: "/frames/scene03/masked.webp"
      }
    },
    scene04: {
      background: {
        id: "scene04-bg",
        type: "image",
        url: "/frames/scene04/sense-bg.webp"
      }
    }
  }
};
