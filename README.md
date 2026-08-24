# 覚醒 — Solo Leveling

A three-act scroll experience built on React + Vite.

```bash
npm install
npm run dev      # dev server
npm run build    # production build -> dist/
```

## The three sections

| # | Section | Interaction |
|---|---------|-------------|
| 01 | **覚醒 / AWAKEN** | Dark stage, pinned. Scrolling scrubs an 80-frame sequence: eyes closed → open → the blue monarch glow. The title's glow and the edge meter track the same progress value. |
| 02 | **影の君主 / SHADOW MONARCH** | Pointer X maps onto the dragon's tracked *position*, so sweeping left-to-right drags it across and centre puts it centre. Carries the falling-glyph rain and the reactbits fluid **SplashCursor**, which mounts only while the section is on screen. |
| 03 | **二つの顔 / ARISE** | Two stacked portraits, shown whole; a soft trailing lens follows the pointer and reveals the awakened image through the human one. Drifts on its own until the pointer arrives. |

A storm (`Thunder`) runs over all three sections, striking roughly twice a
second. It is disabled entirely under `prefers-reduced-motion`.

## Deploying

Pushed to `main`, GitHub Actions builds and publishes to GitHub Pages
(`.github/workflows/deploy.yml`). The site is served from a project path, so
`vite.config.js` sets `base` and runtime asset URLs are built from
`import.meta.env.BASE_URL` — relative paths alone would break on a deep link.

## Frames

The two source sequences (160 PNGs, ~176 MB) are packed into webp sprite atlases:

```bash
python scripts/pack_frames.py     # reads ../_raw/, writes public/frames/
```

The packer does more than resize:

- **awaken** — the source sits on a near-white background. Pixels that are
  bright, desaturated *and* connected to the frame edge are keyed out to the
  page's ink, so the section can be dark without punching holes in his face.
- **monarch** — the source camera drifts and zooms in ~16% over the sequence.
  Each frame is template-matched against Jin-Woo's head and re-framed so he
  stays put. The dragon's head is then located per frame, and only the longest
  run that sweeps steadily left-to-right is kept (19 of 80 frames). Those
  positions ship in the metadata as `dragonX`.

Each sequence gets a full atlas and a `.half` atlas; `useAtlas` picks the half
on small screens and low-DPR displays. Total shipped payload is ~2.5 MB.

The full atlas is kept at or under ≈15 Mpx so it stays inside iOS Safari's
image-decode ceiling.

## Structure

```
src/
  lib/useAtlas.js      atlas loading + cell lookup
  lib/useInView.js     in-view + sticky-scroll progress
  components/
    FrameCanvas.jsx    eased frame renderer, shared by sections 01 and 02
    RevealStage.jsx    pointer-lens reveal for section 03
    GlyphRain.jsx      falling katakana
    SplashCursor.jsx   reactbits WebGL fluid cursor
scripts/
  pack_frames.py       PNG frames -> webp atlas
  shots*.mjs           headless screenshot checks
```

## Notes

- Every canvas runs one rAF loop, pauses on `visibilitychange`, and honours
  `prefers-reduced-motion` by drawing a single static frame.
- The pointer maps onto `dragonX` rather than onto the frame index: the kept
  frames are unevenly spaced, so indexing directly would stall the dragon at
  one end and then race it across. Adjacent frames cross-fade, except across a
  large positional jump, which cuts instead of showing two dragons at once.
- A 16:9 frame cannot fill a portrait screen without cropping the subject away,
  so narrow viewports fit the frame to width and compose the type around it as
  a band.
- `scripts/pack_frames.py` reads the original PNG sequences from `../_raw/`,
  which is not in the repo — the packed atlases in `public/frames/` are what
  the app ships. You only need the raw frames to re-pack.

Fan tribute — artwork belongs to its respective rights holders.
