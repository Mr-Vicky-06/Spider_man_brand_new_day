"""Pack the PNG frame sequences into webp sprite atlases + metadata.

Two sequences, two different problems:

  awaken   the source sits on a near-white background, but the section is dark,
           so the background is keyed out and replaced with the page's ink.

  monarch  the source camera drifts and slowly zooms in, and the dragon does
           not sweep cleanly left-to-right. Frames are stabilised against a
           tracked template of Jin-Woo's head, then an explicit cursor->frame
           lookup is built so pointer position maps monotonically onto the
           dragon's horizontal position.

Each sequence is written at full size and at half size; the runtime picks the
half atlas on small screens and low-DPR displays.
"""
import glob, json, os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage
from scipy.signal import fftconvolve

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(os.path.dirname(ROOT), "_raw")
OUT = os.path.join(ROOT, "public", "frames")

CELL_W = 960          # full-atlas cell width; .half is derived from this
PAGE_COLS = 4
PAGE_ROWS = 6         # 24 frames per page

INK = np.array([0.02, 0.03, 0.06])

# analysis resolution for tracking / measurement
AW, AH = 320, 180


# ── shared helpers ────────────────────────────────────────────────────────

# the generator stamps a sparkle into the bottom-right of every frame
WATERMARK = (1125, 552, 1214, 648)
PATCH_DX = -140          # a clean stretch of the same background, to its left


def hide_watermark(im):
    """Paint over the generator's corner sparkle with nearby background."""
    x0, y0, x1, y1 = WATERMARK
    if im.size != (1280, 720):
        return im
    patch = im.crop((x0 + PATCH_DX, y0, x1 + PATCH_DX, y1))

    # feather the patch edges so the repair does not leave a visible rectangle
    w, h = patch.size
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rectangle((6, 6, w - 7, h - 7), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(5))

    out = im.copy()
    out.paste(patch, (x0, y0), mask)
    return out


def load(path):
    return hide_watermark(Image.open(path).convert("RGB"))


def atlas_of(frames, name, quality):
    """Write `frames` as paged webp sprite atlases, full size and half size.

    One sheet cannot hold a sequence at usable resolution: 80 frames at 960px
    is ~41 Mpx, well past the ~16.7 Mpx a single image is allowed to decode on
    iOS Safari. Splitting into pages keeps every sheet small enough to decode
    while letting each frame stay close to its source resolution.
    """
    per_page = PAGE_COLS * PAGE_ROWS
    pages = (len(frames) + per_page - 1) // per_page
    cw, ch = frames[0].size
    meta_cell = None

    for suffix, scale in (("", 1.0), (".half", 0.5)):
        w, h = int(cw * scale), int(ch * scale)
        total = 0
        for pg in range(pages):
            chunk = frames[pg * per_page:(pg + 1) * per_page]
            rows = (len(chunk) + PAGE_COLS - 1) // PAGE_COLS
            sheet = Image.new("RGB", (w * PAGE_COLS, h * rows), (0, 0, 0))
            for i, im in enumerate(chunk):
                if scale != 1.0:
                    im = im.resize((w, h), Image.LANCZOS)
                sheet.paste(im, ((i % PAGE_COLS) * w, (i // PAGE_COLS) * h))
            path = os.path.join(OUT, f"{name}-{pg}{suffix}.webp")
            sheet.save(path, "WEBP", quality=quality, method=6)
            total += os.path.getsize(path)
        px = w * PAGE_COLS * h * PAGE_ROWS / 1e6
        print(f"  {name}{suffix or ' '}: {pages} pages, {w}x{h} cells, "
              f"{px:.1f} Mpx/page, {total/1024:.0f} KB")
        if suffix == "":
            meta_cell = [w, h]

    return {"name": name, "pages": pages, "perPage": per_page,
            "cols": PAGE_COLS, "count": len(frames), "cell": meta_cell}


# ── 01 awaken: key the white background out to ink ────────────────────────

def key_background(im):
    a = np.asarray(im).astype(np.float32) / 255
    mx = a.max(2)
    mn = a.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)

    # background is bright and desaturated *and* connected to the frame edge,
    # which keeps bright skin highlights from being punched out
    hard = (mx > 0.66) & (sat < 0.13)
    lab, _ = ndimage.label(hard)
    edge = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])
    edge.discard(0)
    sel = np.isin(lab, list(edge)).astype(np.float32)

    bg = np.clip(ndimage.gaussian_filter(sel, 1.6), 0, 1)[..., None]
    out = np.clip(a * (1 - bg) + INK * bg, 0, 1)
    return Image.fromarray((out * 255).astype(np.uint8))


def build_awaken():
    files = sorted(glob.glob(os.path.join(RAW, "use_fff_background_and_x__frames", "*.png")))
    sw, sh = load(files[0]).size
    cw = CELL_W
    ch = int(round(cw * sh / sw))

    frames = [key_background(load(f).resize((cw, ch), Image.LANCZOS)) for f in files]
    meta = atlas_of(frames, "awaken", 84)
    meta["source"] = {"w": sw, "h": sh}
    return meta


# ── 02 monarch: stabilise, then order by dragon position ──────────────────

def gray(im, scale=1.0):
    g = im.convert("L").resize((int(AW * scale), int(AH * scale)), Image.LANCZOS)
    return np.asarray(g).astype(np.float32) / 255


def ncc(img, tpl):
    """Normalised cross-correlation of tpl over img."""
    t = tpl - tpl.mean()
    ones = np.ones_like(t)
    num = fftconvolve(img, t[::-1, ::-1], mode="valid")
    s1 = fftconvolve(img, ones, mode="valid")
    s2 = fftconvolve(img * img, ones, mode="valid")
    den = np.sqrt(np.maximum(s2 - s1 * s1 / t.size, 1e-6)) * np.sqrt((t * t).sum())
    return num / den


# the head/face box on the first frame, in analysis pixels
TPL = (14, 86, 128, 192)          # y0, y1, x0, x1
SCALES = [0.88, 0.92, 0.96, 1.0, 1.04, 1.08, 1.12, 1.16, 1.20]
USABLE = range(3, 46)             # 0-2 have no dragon; 46+ drifts too far
                                  # different, much tighter shot


def track(images):
    """Per-frame (dx, dy, scale) that maps each frame onto frame 0's framing."""
    y0, y1, x0, x1 = TPL
    tpl = gray(images[0])[y0:y1, x0:x1]
    out = []
    for im in images:
        best = (-9.0, 0.0, 0.0, 1.0)
        for sc in SCALES:
            m = ncc(gray(im, sc), tpl)
            j = np.unravel_index(np.argmax(m), m.shape)
            if m[j] > best[0]:
                best = (float(m[j]), j[1] / sc - x0, j[0] / sc - y0, sc)
        out.append(best)
    return out


def smooth(vals, k=5):
    v = np.asarray(vals, dtype=np.float32)
    pad = np.pad(v, (k // 2, k // 2), mode="edge")
    return np.convolve(pad, np.ones(k) / k, mode="valid")


def stabilise(im, dx, dy, sc, ref_scale, inset=0.11):
    """Undo this frame's drift/zoom, then crop the common safe window."""
    sw, sh = im.size
    f = ref_scale / sc                       # zoom every frame to the reference
    big = im.resize((int(sw * f), int(sh * f)), Image.LANCZOS)

    # tracked offsets are in analysis pixels; convert to source pixels
    ox = dx * sw / AW * f
    oy = dy * sh / AH * f

    # centre of the reference framing inside the rescaled frame
    cx = big.size[0] / 2 + ox
    cy = big.size[1] / 2 + oy

    half_w = sw * (0.5 - inset)
    half_h = sh * (0.5 - inset)
    # keep the window inside the rescaled frame, so no edge ever runs empty
    cx = min(max(cx, half_w), big.size[0] - half_w)
    cy = min(max(cy, half_h), big.size[1] - half_h)
    box = (cx - half_w, cy - half_h, cx + half_w, cy + half_h)
    return big.resize((int(half_w * 2), int(half_h * 2)), Image.LANCZOS, box=box)


def dragon_x(im):
    """Where the dragon's head is, in 0..1 across the frame.

    Keys on the maw's hot cyan rather than on all blue pixels — the diffuse
    background glow is blue too and would just pin the answer to the centre.
    """
    a = np.asarray(im.resize((AW, AH), Image.LANCZOS)).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mask = (b > 200) & (g > 170) & (b - r > 70)
    mask[int(AH * 0.72):, :] = False          # the head rides high in frame
    xs = np.nonzero(mask)[1]
    return float(np.median(xs) / AW) if len(xs) > 40 else None


def rising_run(xs, tol=0.02):
    """Longest run of frames, in shooting order, whose dragon x keeps rising.

    Guarantees the packed sequence both plays in its original order and sweeps
    left to right, which is what the pointer is mapped onto. `tol` lets a frame
    sit slightly behind its predecessor, which keeps the plateaus where the
    dragon coils in place — dropping those made the sweep look steppy.
    """
    n = len(xs)
    best = [i for i in range(n) if xs[i] is not None][:1]
    length = [1] * n
    prev = [-1] * n
    for i in range(n):
        if xs[i] is None:
            continue
        for j in range(i):
            if xs[j] is not None and xs[j] <= xs[i] + tol and length[j] + 1 > length[i]:
                length[i] = length[j] + 1
                prev[i] = j
    end = max((i for i in range(n) if xs[i] is not None), key=lambda i: length[i])
    out = []
    while end != -1:
        out.append(end)
        end = prev[end]
    return list(reversed(out)) or best


def build_monarch():
    """Original framing, scrubbed by scroll.

    Nothing is stabilised or re-cropped here: played as a sequence rather than
    driven by the pointer, the source camera's own drift reads as camera move.
    Only the closing frames are dropped — they cut to a much tighter shot.
    """
    files = sorted(glob.glob(os.path.join(RAW, "can_you_make_one_where_jin_woo_frames", "*.png")))
    files = files[:77]
    sw, sh = load(files[0]).size
    cw = CELL_W
    ch = int(round(cw * sh / sw))

    frames = [load(f).resize((cw, ch), Image.LANCZOS) for f in files]
    print(f"  keeping all {len(frames)} original frames, in order")

    meta = atlas_of(frames, "monarch", 80)
    meta["source"] = {"w": sw, "h": sh}
    return meta


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("awaken", build_awaken), ("monarch", build_monarch)):
        print(name + ":")
        meta = fn()
        with open(os.path.join(OUT, f"{name}.json"), "w") as fh:
            json.dump(meta, fh, indent=2)
