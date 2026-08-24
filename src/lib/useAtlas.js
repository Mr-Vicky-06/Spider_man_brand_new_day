import { useEffect, useState } from 'react';

/**
 * Loads a paged frame atlas (see scripts/pack_frames.py) and its metadata.
 *
 * The sequence is split across several sheets because one sheet at usable
 * resolution would be too large for a browser to decode. Small screens and
 * low-DPR displays get the ".half" set, a quarter of the pixels.
 */
export function useAtlas(name) {
  const [state, setState] = useState({ pages: null, meta: null, ready: false });

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL;
    const half =
      window.innerWidth < 900 || (window.devicePixelRatio || 1) < 1.5;

    function load(src) {
      return new Promise((res, rej) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
      });
    }

    fetch(`${base}frames/${name}.json`)
      .then(r => r.json())
      .then(async meta => {
        const suffix = half ? '.half' : '';
        const pages = await Promise.all(
          Array.from({ length: meta.pages }, (_, i) =>
            load(`${base}frames/${name}-${i}${suffix}.webp`)
          )
        );
        if (cancelled) return;
        const cell = half ? meta.cell.map(v => v / 2) : meta.cell;
        setState({ pages, meta: { ...meta, cell }, ready: true });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

/** Which sheet frame `index` lives on, and where on it. */
export function cellRect(meta, index) {
  const [cw, ch] = meta.cell;
  const i = Math.max(0, Math.min(meta.count - 1, index));
  const page = Math.floor(i / meta.perPage);
  const slot = i % meta.perPage;
  return [
    page,
    (slot % meta.cols) * cw,
    Math.floor(slot / meta.cols) * ch,
    cw,
    ch
  ];
}
