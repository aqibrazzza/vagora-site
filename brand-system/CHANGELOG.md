# Changelog — Vagora Brand System

The brand system is versioned on its own, separately from the website. Bump the version here and in `design.md`, `design-system.html` (cover and footer) and `design-tokens.json` together.

## v1.0.0 — 2026-09-07

First release, extracted from the finished Vagora website (site v6).

- `design.md`: 21 sections plus appendices, every rule labelled by authority. Includes the logo system (§01), the text-on-photography rule with its two fallback constructions (§04), the canonical Vagora Mirror description and try-on rule (§07), the Phosphor iconography system as shipped on the site (§09), the applications chapter for web, social, decks, print, large format, campaign and video (§15), and the canonical AI image, video and copywriting blocks (§19–§20).
- `design-system.html`: the standalone visual manual, with specimens for every family and the social modes A–E.
- `design-tokens.json`: every value with `extracted` / `recommended` / `notDefined` status.
- `prompts/`: the §19 and §20 blocks as plain text, ready to paste.

## v1.1.0 — 2026-09-07

The logo system, corrected and completed from the approved source folder.

- **Eight approved artworks** replace the previous five in `assets/brand/logo/`: vertical lockup, horizontal lockup, brandmark and wordmark, each for a light and a dark surface, named `-on-dark` / `-on-light`. The two avatar tiles were replaced with the approved exports (pure `#000000` and `#FFFFFF` grounds).
- **A hierarchy is now stated** (§01, and a full chapter in the visual manual): vertical lockup primary, horizontal lockup secondary, brandmark for icon and avatar scale, wordmark for rare display use — with an explicit rule for AI and for anyone briefing a piece.
- **Removed:** `display-vagora-only.svg`, a `#E0E0E0` recolour of the light-surface wordmark that was not an approved artwork, and the four old `-dark` / `-light` filenames whose naming was ambiguous.
- **Corrected in production:** the website footer now uses `vagora-wordmark-on-dark.svg`; the dock and preloader mask points at `vagora-brandmark-on-dark.svg`.
- **Corrected in the manual:** the cover carries one logo (the primary lockup) instead of a brandmark and a wordmark together; the social, deck, OOH and campaign specimens use the vertical lockup where they previously used the brandmark or the wordmark; §15's per-medium "Mark" rules now follow the hierarchy.
- Clear space and minimum size remain **NEW RECOMMENDATION**, shown visually in the manual for approval.

## v1.1.1 — 2026-09-07

Housekeeping. No rule changed.

- **`prompts/` removed.** The three paste-ready text files duplicated §19 and §20 of `design.md`, which is canonical; two copies of the same prompt is one too many. Paste from the sections instead.
- **`brand-system/assets/` removed.** Its one file, `hero-film-still.webp`, moved to `assets/video/` beside `hero-poster.webp` — the repository now has a single asset tree. The manual's two uses of it were repointed; nothing else referenced it.
- The film toggle now wears the dock's chrome (`rgba(15,15,15,0.88)`, 20px blur, white glyph) rather than a colour of its own; §03 and §11 say so, and the `mediaControlOverlay` token matches `dock`.
