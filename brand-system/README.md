# VAGORA BRAND SYSTEM v1.1.1

The complete Vagora brand, visual, verbal, imagery, interface and motion system, extracted from the finished website (site v6, September 2026). The brand system carries its own version — v1.1.1 across `design.md`, `design-system.html` and `design-tokens.json` — separate from the website's version in `package.json`. Use it to make anything new for Vagora — a page, a post, a deck, a sheet, a screen — so it looks, reads and moves like the site.

## Files

| File | What it is | Who it is for |
|---|---|---|
| `design.md` | **Canonical.** Every rule, labelled ESTABLISHED SYSTEM RULE / DERIVED PRINCIPLE / IMPLEMENTATION DETAIL / NEW RECOMMENDATION / NOT YET DEFINED, in 21 sections plus appendices. §19 is the canonical AI-generation language; the other sections point to it. | People and AI tools. Read this first. |
| `design-system.html` | A standalone visual manual showing the system with the real fonts, imagery and marks. | People. Open it in a browser. |
| `design-tokens.json` | The values — colour, type, space, layout, motion, components, iconography, product, assets — with each token marked `extracted`, `recommended` or `notDefined` (an optional `binding: "contextual"` marks a value to be judged optically rather than applied as a scale). | Engineers and tooling. |
| The logo system | Not a file — §01 of `design.md`, with every approved artwork shown in `design-system.html`. The artworks themselves are in `assets/brand/logo/`. | Anyone placing a logo. Read the hierarchy before you choose one. |
| `CHANGELOG.md` | What changed in each version of the brand system. | Everyone. |
| `README.md` | This file. | Everyone. |

**Authority:** `design.md` wins over the other two files. The production website wins over `design.md` if it has since been intentionally changed — then update `design.md`.

## Opening and sharing the visual manual

`design-system.html` has no external dependencies and no build step, but it references the website's own assets by relative path. There is no portable single-file copy; to share it, share these directories together, at these relative positions:

```
vagora-website/
  assets/fonts/      Switzer-Variable.woff2, FragmentMono-Regular-latin.woff2
                     (+ their licence files)
  assets/imagery/    the feature, business, handoff and product photographs
  assets/video/      hero-film-still.webp only — a frame of the white-studio film
  assets/brand/      logo/ (the eight approved logo artworks) and avatar/ (the two avatar tiles)
  LICENSES/          the font and icon licences
  brand-system/
    design.md
    design-system.html  ← open this
    design-tokens.json
    CHANGELOG.md
    README.md
```

The simplest way to share it is the whole repository. If you must share less, everything else (`src/`, `dist/`, `public/`, `node_modules/`, and the rest of `assets/video/`) can be left out, but if any of the directories above moves relative to `brand-system/`, the manual loses its fonts, photographs or marks.

Open it directly from disk, or serve the repository root (`python3 -m http.server`) and visit `/brand-system/design-system.html`. It works with JavaScript off; the script only drives the motion demonstrations and the contents highlight.

## The logo, in one paragraph

Four versions, each supplied for a light and a dark surface — eight artworks in `assets/brand/logo/`, and nothing else is a Vagora logo. **Choose by hierarchy, not convenience: the vertical lockup is the default**; the horizontal lockup only where vertical height is genuinely constrained; the brandmark at icon or avatar scale; the wordmark rarely, as a dominant editorial object. One logo per composition, once. Light surface → the `-on-light` file; dark surface → the `-on-dark` file — never recolour one or prop it up with an outline or a plate. §01 of `design.md` has the full rule and `design-system.html` shows every variant.

## Using it with an AI tool

Give the model `design.md` (or the relevant sections) as context, then ask for the piece. The document contains its own operating procedure (§18), an image-generation block (§19) and a copywriting block (§20). Example:

> You are working for Vagora. Read the attached `design.md` in full and follow its operating instructions (§18) exactly, including "when uncertain, reduce".
>
> Task: write a LinkedIn post announcing that the Vagora Mirror can render made-to-order garments before the first cut. Produce (1) the caption, in the editorial voice, using the headline pattern in §12A and one RETAIL IMPACT line in the form of §12C; (2) an image brief for the post using the image-generation block in §19 with the "customer experience" variation, including the product clause verbatim; (3) a one-paragraph layout description following the social recipe in §16.
>
> Constraints: only capabilities listed in §01; no numbers, customers or partners; British English; zero phrases from the banned list in §12E; label anything you had to assume as NOT YET DEFINED rather than inventing it.

For imagery alone, paste the image block from §19 into the image model's system field and append one variation; for image-to-video, add the video lock block from the same section. For copy alone, paste §20.

## What is and is not in production

- Everything marked ESTABLISHED SYSTEM RULE or IMPLEMENTATION DETAIL is on the live site.
- **Phosphor Icons** is the icon family and is what the website ships: its five interface icons (`arrow-up-right`, `copy`, `check`, `play`, `pause`) are Phosphor Regular, inlined in `index.html`. The Light half of the two-weight rule, the wider core set, the logo system's clear-space and size rules, the Product Accuracy Checklist, the AI blocks and every non-web format rule are NEW RECOMMENDATIONS.
- The hero film documented in §07 is the main white-studio film. The live site is running a provisional replacement while that film is being finished, so the hero, its crop anchors and its film-toggle colour differ from what the document records.
- Appendix A of `design.md` lists what the site does not define (italic use, a light-surface wordmark, forms, charts, print black, whether the cabinet's sloped face is a separate material, and so on). Decide those deliberately and record them there.

## Keeping it current

When the website changes on purpose: update `design.md` first, mirror any value change in `design-tokens.json`, adjust the demonstration in `design-system.html`, and add a line to `CHANGELOG.md`. Re-check the manual at the eight QA viewports (360×800, 390×844, 768×1024, 1200×720, 1366×768, 1440×900, 1920×1080, 2560×1440).

## Licences

Switzer — Fontshare Free Font License. Fragment Mono — SIL OFL 1.1. Phosphor Icons — MIT © Phosphor Icons. All three licence texts are in the repository's `LICENSES/` folder. Photography, film and marks — Vagora's own.
