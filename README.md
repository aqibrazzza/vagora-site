# Vagora

This repository is the Vagora workspace. It contains:

- the canonical **Vagora brand system** (v1.1.1)
- the **approved reusable assets** — logos, fonts, imagery, film
- the **production website**
- **Vagora creative and product projects**, as they are made

```
/
├── README.md              this map
├── brand-system/          the brand system — design.md (canonical), design-system.html
│                          (visual manual), design-tokens.json (values), CHANGELOG.md
├── assets/                the one approved asset library, used by everything below
│   ├── brand/             logo/ (the eight approved logo artworks) · avatar/ (favicon tiles)
│   ├── fonts/             Switzer, Fragment Mono
│   ├── imagery/           the feature, business, handoff and product photographs
│   └── video/             the hero film encodes, its poster, its master, one film still
├── LICENSES/              Switzer (Fontshare FFL), Fragment Mono (SIL OFL 1.1), Phosphor Icons (MIT)
└── projects/
    └── website/           the production website — a Vite project
```

## Where to go

| I want to... | Go to |
| --- | --- |
| Understand the Vagora brand | `/brand-system/` |
| Create anything on-brand | Read `/brand-system/design.md` first |
| See the visual brand manual | `/brand-system/design-system.html` (open it in a browser) |
| Use exact design values | `/brand-system/design-tokens.json` |
| Find approved logos, images, fonts, product assets | `/assets/` |
| Work on the production website | `/projects/website/` |
| Create new Vagora work | `/projects/` |

## Website development

Open the repository **root** in VS Code. Then:

```
cd projects/website
npm ci
npm run dev
```

Build:

```
npm run build
```

`dist/` and `node_modules/` are generated inside `projects/website/` and are ignored by git; build where you deploy. The built site is relative-pathed (`base: "./"`), so it deploys to a domain root or a subfolder without a rebuild.

The website has no assets of its own. It references the repository's `/assets/` library by relative path (`../../assets/...`), and Vite bundles what the page uses into `dist/assets/` with hashed names at build time. Put a new image, font or film in `/assets/`, never in the project.

Git lives at the repository root and works from any folder inside it: `git status` in `projects/website/` reports on the same repository. There is exactly one repository — no nested `.git`, no submodules.

## Projects

`/projects/` holds actual Vagora work. The website is the first permanent project. Future work goes in a category folder that is created when the first real project of that kind exists — not before:

```
/projects/presentations/[project-name]/
/projects/social/[project-name]/
/projects/events/[project-name]/
/projects/print/[project-name]/
/projects/campaigns/[project-name]/
/projects/mirror-ui/
```

Every project draws on `/brand-system/` for its rules and `/assets/` for its material. Brand rules are not copied into project folders; the brand system stays canonical.

The instruction for any new piece of work, for a person or an AI, is:

> Read the Vagora brand system and use approved Vagora assets from `/assets/` where relevant. Create [TASK]. Save the project in `/projects/[CATEGORY]/[PROJECT-NAME]/`.

## Evidence rules

No customer, store, pilot result or uplift figure appears anywhere because none is evidenced yet. The console figures are sample data and are labelled as such on the asset. The feature imagery is concept renders. Do not invent numbers, customers or partners in anything made from this repository.
