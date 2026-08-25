# Original Asset Map — what must be created, not sourced

| Asset | Why original | Owner |
|---|---|---|
| All 6 scenes' frame sequences (city, Peter, mask pair, spider-sense base, swing, finale) | Core content — stock/reference imagery cannot substitute for a purpose-shot scroll-scrubbed sequence; this is the entire creative identity of the project | Production/art |
| Spider-sense distortion shader | Signature effect, must match `--electric-blue` system and the exact intensity curve in `09-SPIDER-SENSE-SYSTEM.md` | Engineering |
| Procedural rain (Canvas 2D) | Cheap and controllable vs. a licensed rain video/texture that would need per-scene color-grading to match anyway | Engineering |
| Web-strand SVG system | Small, bespoke, tied to exact anchor points in the UI | Engineering |
| Title treatment / kicker typographic system | Layout and pairing logic (Bebas Neue + Inter, tracking rules) is the project's own composition even though the fonts themselves are licensed, not custom-drawn | Design |
| Film-grain overlay texture | Trivial to generate procedurally (SVG `feTurbulence` or a small tileable noise PNG), no reason to source externally | Design/engineering |
| Loading-state treatment | Tied to the manifest-priority system (`19-ASSET-MANIFEST-SPEC.md`), project-specific | Engineering |
| Footer / fan-tribute disclosure copy | Legal/brand-safety language specific to this project | Copy/legal review |
