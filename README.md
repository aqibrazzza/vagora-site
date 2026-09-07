# Vagora

The Vagora marketing website (v6) and the **Vagora Brand System v1.1.1** that was extracted from it. One repository, two things:

| | Where | Start with |
|---|---|---|
| **The brand system** — for anyone making something new for Vagora: a web section, imagery, a video, a deck, a banner, a poster, a social post | `brand-system/` | `brand-system/README.md`, then `brand-system/design.md` |
| **The website** — the production site itself | `index.html`, `src/`, `assets/`, `public/` | `index.html` (the copy and structure; the source comments explain each decision), then `src/styles/main.css` and `src/main.js`. The art direction and motion system it follows are documented in `brand-system/design.md` §05–§11. |

## Layout

```
brand-system/          the brand system — design.md (canonical), design-system.html
                       (visual manual), design-tokens.json (values), CHANGELOG.md
index.html             the page; all copy lives here
src/                   main.js (behaviour), modules/ (text splitter, refraction), styles/main.css
assets/                brand/ (marks, lockups, avatars) · fonts/ · imagery/ · video/
                       — shared by the site and the brand system; Vite bundles what the page references
public/                robots.txt and the share card, which must keep their exact paths
LICENSES/              Switzer (Fontshare FFL), Fragment Mono (SIL OFL 1.1), Phosphor Icons (MIT)
```

`assets/video/` holds the film master the site currently runs (`new-hero-video.mp4`), the web encodes the page loads, and `hero-film-still.webp` — a frame of the white-studio film that the brand system's visual manual uses. Only the encodes and the poster are shipped.

## Running the site

```
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
```

`dist/` is ignored by git; build it where you deploy. It is relative-pathed (`base: "./"`), so it deploys to a domain root or a subfolder without a rebuild.

## Using the brand system

Open `brand-system/design-system.html` in a browser to see the system; read `brand-system/design.md` for every rule and its authority (ESTABLISHED / DERIVED / IMPLEMENTATION / NEW RECOMMENDATION / NOT YET DEFINED). For AI work, §19 of `design.md` holds the image and video blocks and §20 the copywriting block, ready to paste into a model. The manual depends on `assets/` by relative path, so keep the repository together rather than copying `brand-system/` out on its own.

## Evidence rules

No customer, store, pilot result or uplift figure appears anywhere because none is evidenced yet. The console figures are sample data and are labelled as such on the asset. The feature imagery is concept renders. Do not invent numbers, customers or partners in anything made from this repository.
