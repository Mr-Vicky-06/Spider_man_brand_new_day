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
    },
    scene05: {
      frames: {
        id: "scene05-swing-sequence",
        type: "image-sequence",
        name: "scene05",
        frames: 48,
        width: 1920,
        height: 1080,
        format: "webp",
        hasMetadata: true // Instructs AssetLoader to fetch /frames/scene05/metadata.json if implemented, or FrameCanvas can fetch it.
      },
      keyframes: [
        { id: "scene05-key1", type: "image", url: "/frames/scene05/keyframe-1.webp" },
        { id: "scene05-key2", type: "image", url: "/frames/scene05/keyframe-2.webp" },
        { id: "scene05-key3", type: "image", url: "/frames/scene05/keyframe-3.webp" }
      ]
    },
    scene06: {
      background: {
        id: "scene06-bg",
        type: "image",
        url: "/frames/scene06/hero-bg.webp"
      }
    }
  }
};
