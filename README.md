# Vagora — marketing site (v6)

Start with `PROJECT.md` — the durable record of what exists, what is frozen and what is pending. `DIRECTION.md` holds the art direction.

A Vite project. The page is `index.html`; styles in `src/styles/main.css`; behaviour in `src/main.js` with the accessible text splitter in `src/modules/split.js`. Brand, imagery, fonts and the intro film stay in `assets/` (the same folder as before); Vite bundles whatever the page references into `dist/assets` with hashed names. `public/` holds the files that must keep their exact path (`robots.txt`, the share card).

## Run

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
```

`dist/` is self-contained and relative-pathed (`base: "./"`), so it deploys to a domain root or a subfolder without a rebuild.

## Stack

- GSAP 3 + ScrollTrigger for all choreography.
- Lenis as the single smooth-scroll engine (bypassed under `prefers-reduced-motion`).
- No WebGL. The hero is the intro film with a poster as its static first frame.
- One typeface: Switzer (Fontshare FFL, in `assets/fonts`), weights 400/500/600, stepping down one on dark fields.
- Design foundations live at the top of `src/styles/main.css`: one monochrome colour family (light and dark worlds, alphas of ink/white only), six type tiers (display / section / large / body / functional / label), one page gutter, a spacing vocabulary and three section rhythms, reading widths, sharp media by default, and shared motion primitives. See `DIRECTION.md` → Foundations.
- Icons: Solar (CC BY 4.0), inlined as SVG symbols in `index.html`.

## Art direction

See `DIRECTION.md`.

## Evidence rules carried over from v5

No customer, store, pilot result or uplift figure appears on the page because none is evidenced yet. The console panel is sample data and is labelled so on the asset and in its accessible name. The imagery is concept renders (noted in the source).

## Superseded files

`tokens/` and `reference/` belong to the v5 static site and are not used by the v6 build. Keep them if you still use the internal reference surfaces; otherwise both can go. `assets/` is shared by both and stays.
