import { useEffect, useRef, useState } from 'react';

/**
 * Loads a packed frame atlas (see scripts/pack_frames.py) and its metadata.
 * Small screens and low-DPR displays get the ".half" atlas, which is a
 * quarter of the pixels for the same sequence.
 */
export function useAtlas(name) {
  const [state, setState] = useState({ img: null, meta: null, ready: false });
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const half =
      window.innerWidth < 900 || (window.devicePixelRatio || 1) < 1.5;

    let cancelled = false;

    const base = import.meta.env.BASE_URL;

    fetch(`${base}frames/${name}.json`)
      .then(r => r.json())
      .then(meta => {
        const file = half ? `${name}.half.webp` : `${name}.webp`;
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (cancelled) return;
          // the half atlas has half-size cells
          const cell = half ? meta.cell.map(v => v / 2) : meta.cell;
          setState({ img, meta: { ...meta, cell }, ready: true });
        };
        img.src = `${base}frames/${file}`;
      });

    return () => {
      cancelled = true;
      alive.current = false;
    };
  }, [name]);

  return state;
}

/** Source rect of frame `index` inside the atlas. */
export function cellRect(meta, index) {
  const [cw, ch] = meta.cell;
  const i = Math.max(0, Math.min(meta.count - 1, index));
  return [(i % meta.cols) * cw, Math.floor(i / meta.cols) * ch, cw, ch];
}
