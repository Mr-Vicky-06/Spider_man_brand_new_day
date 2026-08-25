# 19 — Asset Manifest Spec

## Schema (v2 — extends the existing repo's v1 example with tiers + provenance)
```json
{
  "id": "swing-arc",
  "type": "image-sequence",
  "scene": "swing",
  "tiers": {
    "desktop": { "frames": 180, "width": 1920, "height": 1080, "format": "webp", "fps_equivalent": 30 },
    "tablet":  { "frames": 120, "width": 1280, "height": 720,  "format": "webp", "fps_equivalent": 24 },
    "mobile":  { "frames": 60,  "width": 854,  "height": 480,  "format": "webp", "fps_equivalent": 20 }
  },
  "dragonX": null,
  "loadPriority": "lazy",
  "provenance": {
    "source": "original-production",
    "creator": "project team",
    "license": "all rights reserved — project asset",
    "dateAdded": ""
  }
}
```
`dragonX` (named after the existing repo's field, kept for continuity) holds
the optional positional-index array for unevenly-spaced sequences — `null`
when the sequence should map linearly to progress.

Static images (Mask scene, single-frame Finale option) use a simpler variant:
```json
{
  "id": "mask-masked",
  "type": "static-image",
  "scene": "mask",
  "width": 1920, "height": 1080, "format": "webp",
  "provenance": { "source": "original-production", "license": "all rights reserved — project asset", "dateAdded": "" }
}
```

## Required metadata
Every entry requires `id`, `type`, `scene`, format/dimensions per tier, and a
`provenance` block — no asset enters `data/asset-manifest.json` without the
provenance block filled in, which is the mechanical enforcement of the
"no undocumented external asset" implementation-contract rule.
