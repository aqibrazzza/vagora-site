# Vagora — Design System

**VAGORA BRAND SYSTEM v1.1.1** — canonical brand, visual, verbal, imagery, interface and motion system, extracted from the finished Vagora website (site v6, September 2026). The brand system is versioned on its own; the website's version (`projects/website/package.json`) is a separate number. The website lives at `projects/website/` and consumes the same root `assets/` library this document names.

This document is the source of truth. `design-tokens.json` carries the same values for machines; `design-system.html` shows them. If any derivative file disagrees with this one, this one wins — unless the production website has since been intentionally changed, in which case the website wins and this document must be updated to match it.

*One current exception:* the hero film described here is Vagora's main film, the white-studio one. Production is running a provisional replacement while that film is being finished, so the site's hero, its crop anchors and its film-toggle colour differ from what §07 and §11 record. Everything else in this document matches production.

Vagora is an interactive mirror for physical retail. It renders the garment on the customer in live 3D, opens the whole catalogue on the shop floor, and returns what happened to the retailer. The brand system exists so that every new thing made for Vagora — a page, a post, a deck, a sheet, a screen on a stand — looks, reads and moves like it came from the same hand as the website.

---

## How to read this document

Every rule is labelled with one of five tags. The tag says how much authority the rule has and where it came from.

| Tag | Meaning |
|---|---|
| **ESTABLISHED SYSTEM RULE** | Directly present in the finished website (CSS, markup, assets, copy, script). Follow it. |
| **DERIVED PRINCIPLE** | Not written down on the site, but consistently demonstrated by it. Follow it unless production contradicts it. |
| **IMPLEMENTATION DETAIL** | How the website happens to build the rule (a value, a mechanism, a library). Useful for engineers; not a brand law. |
| **NEW RECOMMENDATION** | Proposed here for the first time to cover something the website never needed. Adopt deliberately; not yet in production. |
| **NOT YET DEFINED** | The website gives no answer. Do not invent one silently. |

Rules are written as WHAT / WHY / HOW / WHEN / AVOID wherever that shape helps. Where a value is quoted, it is the production value at the time of extraction. Where the brief that commissioned this document and production disagreed, production wins and the difference is noted.

The three most important instructions in this document, for a human or an AI:

1. **One dominant object per composition.** Everything else is small, precise and secondary.
2. **Two voices, never blended.** Switzer speaks; Fragment Mono annotates.
3. **When uncertain, reduce.** Remove before you add.

---

## 01 · Brand foundation

### What Vagora is

**ESTABLISHED SYSTEM RULE.** Vagora is "an interactive mirror that helps customers discover more, explore effortlessly, and gives retailers more from every visit." That sentence is the manifesto on the site and is the brand's definition. The product noun is **the Vagora Mirror** (capital M when naming the product; "the mirror" in running copy once it has been named). The management surface is **the console**. The group of mirrors a retailer runs is **the estate**.

**ESTABLISHED SYSTEM RULE.** The website evidences exactly these capabilities and no others:

- Live 3D try-on: the garment rendered on the customer, tracking their movement in real time.
- The whole catalogue on screen: every size and colourway, each checked against live stock before it is shown.
- The whole look: pieces combined on the customer before anything is fetched.
- Made-to-order: unstitched cloth and made-to-order garments rendered before production begins.
- Campaign scenes: the customer placed inside scenes built around the collection.
- Their picks at the till: one scan sends selected garments, colourways and sizes to the customer's phone and the counter.
- Retail intelligence: what customers browsed, tried, combined, saved and ignored, by store and garment.
- One console: catalogue, content and configuration across every store, with sync status and offline alerts.
- Privacy: camera active only during a session; nothing stored; no account, no registration, no face database.
- Hardware: freestanding; starts by itself when someone steps in front of it; 49-inch portrait display readable from a natural standing distance.

**AVOID.** Do not add capabilities, integrations, customers, results, uplift figures, benchmarks or partnerships that are not on this list. The site says so itself: "We have no benchmark to compare you against yet, and will not invent one." The console figures are labelled "Sample data, not a live estate." That honesty is part of the brand.

### Brand personality

**DERIVED PRINCIPLE.** Vagora is **precise, calm, editorial, retail-literate and quietly confident**. It describes what happens rather than what it means. It does not sell; it shows and explains. It is a fashion-adjacent technology company that presents itself like a well-made magazine about a well-made object — not like a start-up, not like a luxury house, not like an "AI platform".

**DERIVED PRINCIPLE.** Three tones are always present at once:

- **Fashion** — large Switzer, generous whitespace, full-bleed photography with strong colour from garments.
- **Retail** — the vocabulary (till, catalogue, colourway, garment, store, rail, stock, made-to-order) and the constant return to what happens on the floor and at the counter.
- **System** — Fragment Mono notation, numbered sequences, hairline rules, the console object.

Remove any one of the three and it stops being Vagora: without fashion it becomes SaaS, without retail it becomes an art project, without system it becomes a lookbook.

### Positioning

**ESTABLISHED SYSTEM RULE (from copy).** The site structures the offer as two acts around one product: **Act one · On the floor** (what the customer can do) → **The Vagora Mirror** (the object) → **Act two · In the business** (what the retailer gets back) → **The console** (the proof surface) → **Before you commit** (the honest answers) → **See it in your store** (the ask). Every piece of communication should be locatable on that spine.

### Voice in one line

**DERIVED PRINCIPLE.** *An observation, then its consequence — stated plainly, in retail words, without adjectives doing the work.*

### The logo system

**ESTABLISHED SYSTEM RULE.** Four logo versions exist, each supplied for a light and a dark surface — eight approved artworks, all in `assets/brand/logo/`, plus two avatar marks in `assets/brand/avatar/`. Nothing else is a Vagora logo. If a version is not in that folder it has not been approved, and it is not to be drawn, recoloured, outlined or assembled from parts.

| Version | Role | Files | Artwork |
|---|---|---|---|
| **Vertical lockup** | **PRIMARY** | `vagora-lockup-vertical-on-dark.svg` · `vagora-lockup-vertical-on-light.svg` | Mark above VAGORA / MIRROR. 272 × 308 |
| **Horizontal lockup** | **SECONDARY** | `vagora-lockup-horizontal-on-dark.svg` · `vagora-lockup-horizontal-on-light.svg` | Mark beside VAGORA / MIRROR. 450 × 186 |
| **Brandmark** | **COMPACT IDENTITY** | `vagora-brandmark-on-dark.svg` · `vagora-brandmark-on-light.svg` | The mark alone. 124 × 240 |
| **Wordmark** | **DISPLAY / EDITORIAL** | `vagora-wordmark-on-dark.svg` · `vagora-wordmark-on-light.svg` | VAGORA alone, display serif. 450 × 127 |
| **Avatar marks** | Favicon / profile | `avatar/vagora-avatar-mark-dark.png` · `-light.png` | The brandmark on a filled 512 × 512 square |

`-on-dark` and `-on-light` name **the surface the artwork is for**, not the colour of the artwork: `-on-dark` is white, `-on-light` is `#0F0F0F`. The avatar files follow the same reading — `-dark` is the mark on a black tile.

#### The hierarchy — choose by hierarchy, not by convenience

**ESTABLISHED SYSTEM RULE.** This order decides which version is used, every time:

1. **VERTICAL LOCKUP — the primary logo.** The default wherever there is enough vertical space: brand presentations, marketing collateral, social graphics, campaign materials, title and closing compositions, print, event materials, and general brand identification. **When anyone — designer or AI — is unsure which full logo to use, the answer is the vertical lockup.**
2. **HORIZONTAL LOCKUP — secondary.** Only when the composition genuinely lacks the vertical height for the primary: shallow headers, narrow horizontal strips, landscape areas with limited height, compact navigation and header applications. Not because it fits more conveniently — the vertical lockup remains preferred.
3. **BRANDMARK.** When a full lockup would be inappropriate or illegible: favicons, app icons, social avatars and profile icons, compact product and interface identity, small square or circular identity areas, very small branded controls. It is **not** the default stand-in for the full logo in an ordinary marketing layout.
4. **WORDMARK.** Sparingly, and for display or editorial rather than routine identification: a large website footer or end composition, an editorial brand moment, an oversized campaign treatment, a selected presentation title or closing moment, a large-format composition where it is a dominant typographic object. It is never the default logo, and it is not repeated across a piece — its rarity is the point.

#### Light and dark

**ESTABLISHED SYSTEM RULE.** Light surface → the `-on-light` artwork (`#0F0F0F`). Dark surface → the `-on-dark` artwork (white). Every version exists in both, so there is always a correct file: choose the right asset instead of recolouring one, and never add an outline, glow, shadow or plate to make the wrong one work. On a photograph, place the logo only where §04's four conditions for text on photography hold, and use the version whose artwork keeps its contrast there.

#### What the site proves

**ESTABLISHED SYSTEM RULE.** The website uses three of the eight, each correctly by the hierarchy above: the **brandmark** in the dock at **17 × 33px** (11 × 21px under 460px) and in the preloader at 42–50px wide — compact interface identity, painted with `currentColor` through a CSS mask; the **wordmark-on-dark** closing the footer at **100% of the content width** on black, left-aligned, as the page's last dominant object — the display use; and the **avatar marks** as the favicons, light or dark by colour scheme. No lockup appears on the site, because the site has no composition that identifies the brand with a full logo — the wordmark and the mark do that work in their own places. Two logo versions never appear in one composition.

#### For AI and for anyone briefing a new piece

**ESTABLISHED SYSTEM RULE — read this before placing a logo.**

> **Choose logo variants by hierarchy, not convenience.**
> Default: **VERTICAL LOCKUP.**
> If vertical height is genuinely constrained: **HORIZONTAL LOCKUP.**
> If the space is icon-scale or avatar-scale: **BRANDMARK.**
> If the logo itself is being used as a rare dominant editorial object: **WORDMARK.**

So: a slide deck, a social post, a billboard, a brochure, a landing page, an event graphic all take the **vertical lockup** unless the composition gives a specific reason to move down the list. One logo per composition, once. Then match the surface — `-on-light` on white, `-on-dark` on black.

#### Clear space, minimum size, placement

**NEW RECOMMENDATION** (proposed here, not yet approved — the supplied artwork carries no clear-space or minimum-size specification; see the specimens in the visual manual and confirm or replace these numbers).

- **Clear space, from the artwork's own geometry** so it scales with the piece: for the brandmark, **half the mark's height** on every side; for the lockups and the wordmark, **the height of the capital V** on every side. Nothing enters it — type, hairlines, the frame's edge, a retailer's logo.
- **Minimum size.** Digital: brandmark 11 × 21px (the site's smallest production instance), vertical lockup 90px wide, horizontal lockup 120px wide, wordmark 120px wide. Print: brandmark 6mm tall, vertical lockup 22mm wide, horizontal lockup 30mm wide, wordmark 30mm wide. Below a lockup's minimum, move down the hierarchy to the brandmark rather than shrinking the lockup.
- **Placement.** The logo lives in a margin, aligned to the grid's edge, once per surface; it is found, not featured. The wordmark, when used, is a dominant object — low and left as in the footer, or centred only in the one centred composition.

**AVOID:** stretching, squashing, cropping or rotating any version; outlines, glows, shadows, gradients or plates behind it; altering the spacing between the mark and the type, or rebuilding a lockup from the brandmark and type; the brandmark used everywhere in place of the full logo; the wordmark as routine identity; two or more logo versions in one composition to "show the brand"; a logo on every slide or frame; a tagline attached to any version; a version recoloured to anything but its two supplied artworks.

**NOT YET DEFINED.** Clear space and minimum sizes (recommended above, awaiting approval); the logo in motion beyond the dock's −24° hover tilt and the preloader's fade; a one-colour print build (100K or spot) of the avatar tiles; co-branding lock-ups with a retailer.

---

## 02 · Core design principles

Each principle below is demonstrated by the site. They are ordered by how often they decide a composition.

### 1. Macro tension, micro discipline

**DERIVED PRINCIPLE.** Every Vagora composition pairs something very large (a photograph, a product, a chapter heading, the wordmark) with something small and exact (an index, an annotation, a specification, a rule). The tension between the two is the look. **WHY:** it produces both scale and precision without decoration. **HOW:** choose the one large thing first; set everything else at body/small/label size. **AVOID:** medium-sized everything; two large things competing.

### 2. One dominant object

**ESTABLISHED SYSTEM RULE.** Each section of the site has exactly one dominant object: the film (hero), the proposition (manifesto), the media plane (both acts), the product (Mirror chapter), the console (console chapter), the store photograph (handoff), the display line (the ask), the wordmark (footer). **WHY:** a reader always knows what to look at. **HOW:** decide the dominant object before layout; give it the largest area or the largest type; make everything else subordinate. **AVOID:** dashboards of equal tiles; bento grids; a headline and an image of equal weight.

### 3. Big object + small object

**DERIVED PRINCIPLE.** The dominant object is answered by one small precise object, not by several: the media plane by one annotation block; the product by one specification rail; the console by one short intro; the wordmark by one colophon row. **AVOID:** three feature cards beside an image; captions on every corner.

### 4. Negative space is active

**ESTABLISHED SYSTEM RULE.** Whitespace is constructed, not left over. On the wide layout of Act one the annotation is centred in the region between the page gutter and the image's left edge — the rail's box *is* that whitespace (`.stage__steps { margin-right: calc(var(--breath) * -1) }`), so the copy floats in it by layout rather than by a computed nudge. The manifesto is top-anchored so its white surface arrives with its first line and the corner reads as one measured inset (optical distance from panel top to the eyebrow's capitals equals the page gutter). **WHY:** air is what makes the big object big. **HOW:** define whitespace regions as real layout boxes; centre small objects inside them; keep a consistent gutter. **AVOID:** filling gaps; "balancing" a spread by adding elements.

### 5. Typography is compositional

**ESTABLISHED SYSTEM RULE.** Headings are set with authored line breaks (`<br />`, `white-space: nowrap` on the Act one title) and tight measures (`max-width: 24ch` manifesto, `21ch` Mirror heading, `10ch` ask title). Scale contrast between tiers is large (14 → 22 → 48 → 64 → 84 → 160px) so a heading can *be* the layout. **WHY:** type at this scale is a shape, and its shape has to be decided. **HOW:** write headlines as two lines with a chosen break; never let a display line reflow arbitrarily. **AVOID:** headings that wrap to a widow; centring long headings; letting a CMS choose the break.

### 6. Editorial asymmetry

**ESTABLISHED SYSTEM RULE.** The two acts are asymmetric and mirrored: Act one puts the media plane to the right viewport edge and the copy left; Act two puts the plane to the left edge and the copy right. Chapter openings put label + title left and the supporting statement right, on one row aligned to the baseline (`align-items: end`). The console puts the intro left at a fixed measure and the object filling the remainder. Only the ask and the manifesto's meta row are symmetric, and the ask is the one deliberately centred moment. **WHY:** asymmetry creates direction and reading order without arrows. **HOW:** pick a side for the dominant object; let the small object occupy the leftover whitespace; mirror the arrangement when a sequence repeats. **AVOID:** centred stacks as a default; identical left/right halves.

### 7. Optical alignment over mathematical alignment

**ESTABLISHED SYSTEM RULE.** The eyebrow sits one site-wide distance above the heading it names, corrected per tier (`--eyebrow-lift`) so the *seen* gap is equal under a 48px heading and a 160px one. The preloader line is placed by measuring the real descender of the "y" so the ink sits 8–12px off the screen edge regardless of size. The manifesto's top padding subtracts the cap height's leading. **WHY:** what the eye measures is ink, not boxes. **HOW:** when two things must align, align their ink; compensate for leading, side bearings and negative tracking. **AVOID:** trusting margin values to produce equal visual gaps across sizes.

### 8. Consistency is not sameness

**ESTABLISHED SYSTEM RULE.** The same annotation component (index / title / body / rule / RETAIL IMPACT) appears eight times across the two acts, in two mirrored layouts, beside eight different photographs, and never looks repetitive because the photograph changes and the layout flips. The same heading animation is used for every heading on the page; a chapter chooses when it is asked for, and reuses it rather than restyling it. **HOW:** repeat components and timings exactly; vary the content, the side and the scale. **AVOID:** re-styling a component to make a section "feel different".

### 9. Proximity says what belongs together

**ESTABLISHED SYSTEM RULE.** The annotation block has a fixed internal rhythm: index → 12px → title → 16px → body → 32px (48px at 2560) → rule → 8px → RETAIL IMPACT label → 8px → statement. The gaps inside a block are smaller than the gap to anything outside it (steps are 96–160px apart). **HOW:** inside a group use `--space-1..4`; between groups use `--space-6..10`. **AVOID:** equal spacing everywhere.

### 10. Repetition builds the system

**DERIVED PRINCIPLE.** Numbered sequences ((01)–(05), (01)–(03), 01–04, 01–06), eyebrows, hairlines, the annotation block and the 300ms state change recur in every chapter. A reader learns the grammar once. **HOW:** reuse the recurring parts; introduce a new pattern only when there is a new kind of content.

### 11. Hairlines are structural, never decorative

**ESTABLISHED SYSTEM RULE.** Every rule on the site is `1px solid var(--line)` (10% ink on light, 14% white on dark) and marks a real boundary: the top of a manifesto fact, the head of the specification rail, between FAQ answers, between console metrics, above the colophon, the short rule above RETAIL IMPACT. **AVOID:** rules as ornament, double rules, coloured rules, rules around images.

### 12. Hierarchy from scale, weight, font and structure — never from grey

**ESTABLISHED SYSTEM RULE.** The annotation block is entirely `var(--text)` (full ink). Secondary colour (62%) is reserved for ledes, FAQ answers, specification facts and captions; muted (45%) and notation (55%) for the mono voice only. **AVOID:** greying text to make it feel secondary; more than three text strengths on one surface.

---

## 03 · Colour system

### Surfaces

**ESTABLISHED SYSTEM RULE.** Two surfaces, and no third ground.

| Token | Value | Use |
|---|---|---|
| `--surface-light` | `#FFFFFF` | The page. Manifesto, both acts, console, handoff, FAQ. |
| `--surface-dark` | `#000000` | Hero, the Vagora Mirror chapter, the ask, the footer. |

**ESTABLISHED SYSTEM RULE.** Ink is `#0F0F0F` (`--ink`) and is a *text and control colour only*. It is never a background surface. The dark surface is pure `#000000`, so that black photography (the product in its dark studio, the hero film's black frames) merges into it without a visible edge. **AVOID:** near-black backgrounds (#111, #0F0F0F, #141414) as page surfaces; off-white or warm-white page grounds; gradients as surfaces.

**IMPLEMENTATION DETAIL.** One exception exists inside an image container: `.entry__media--ui { background: #141211 }` — the ground of the fleet UI capture, so the asset is shown whole and never cropped. It is the asset's own colour, not a brand surface.

### Text and line colours

**ESTABLISHED SYSTEM RULE.** Every non-surface tone is an alpha of ink or of white. There are no additional greys.

Light surface:

| Token | Value | Role |
|---|---|---|
| `--text-primary` | `#0F0F0F` | Headings, body, annotation blocks, controls |
| `--text-secondary` | `rgba(15,15,15,0.62)` | Ledes, FAQ answers, specification facts, notes, captions |
| `--text-muted` | `rgba(15,15,15,0.45)` | Rarely used; muted supporting text |
| `--notation-ink` | `rgba(15,15,15,0.55)` | Every Fragment Mono element |
| `--rule` | `rgba(15,15,15,0.10)` | Hairlines |
| `--media-ground` | `rgba(15,15,15,0.04)` | Behind images while they load |

Dark surface (`[data-surface="dark"]`):

| Token | Value | Role |
|---|---|---|
| `--text-inverse` | `#FFFFFF` | Headings, body |
| `--text-inverse-secondary` | `rgba(255,255,255,0.68)` | Ledes, facts |
| `--text-inverse-muted` | `rgba(255,255,255,0.45)` | Muted |
| `--notation-inverse` | `rgba(255,255,255,0.52)` | Fragment Mono |
| `--rule-inverse` | `rgba(255,255,255,0.14)` | Hairlines |
| `--media-ground` (dark) | `rgba(255,255,255,0.06)` | Behind images |

**IMPLEMENTATION DETAIL.** The site resolves these through aliases (`--bg`, `--text`, `--text-2`, `--text-3`, `--line`, `--notation`) that re-bind inside `[data-surface="dark"]`, so a component written once works on both surfaces.

### Controls and chrome

**ESTABLISHED SYSTEM RULE.** Buttons are ink on white and invert on dark surfaces: `--control-bg: var(--ink)`, `--control-fg: #FFFFFF`, hover `rgba(15,15,15,0.86)`; inside `[data-surface="dark"]` the same button is white with ink text and hovers to `rgba(255,255,255,0.86)`. Focus ring is ink (`--focus`), 2px, offset 4px. **There is one blurred control chrome and both controls wear it:** `rgba(15,15,15,0.88)` with a 20px backdrop blur and a white glyph or label. The dock is that, **locked dark on every surface**; the hero film toggle is the same value, so the only two pieces of chrome on the page read as one family. These two blurred overlays are **control chrome only** — never a content or annotation surface (§04, *Text on photography*).

### Status colours

**ESTABLISHED SYSTEM RULE.** Three functional hues exist and are used in one place only — the console's status pills:

| Token | Value | Tint |
|---|---|---|
| `--status-success` | `#0F7A52` | `#EAF5F0` |
| `--status-warning` | `#8A5A00` | `#F7F0E2` |
| `--status-critical` | `#C0342E` | `#FAECEB` |

**WHY:** a Live / Syncing / Offline state must be legible at a glance inside a product surface. **WHEN:** only inside a console or product-UI representation, only for system state. **AVOID:** using them anywhere in marketing layouts, as accents, in charts about business results, or as a "brand green".

Note for accuracy: the brief that commissioned this document described the palette as "black, white and neutrals only". Production agrees for the *brand* palette; the status hues are functional UI colour confined to the console object and are recorded here so no one reinvents them.

### Colour in photography

**DERIVED PRINCIPLE.** Colour enters Vagora through garments and stores in the photographs — coral, blue, magenta, yellow, green, white — never through the interface. A recurring lime-green appears in store props across the feature imagery; it is photographic set dressing, **not a brand colour**, and must not be lifted into UI or graphics.

### Shadows

**ESTABLISHED SYSTEM RULE.** Two shadows exist: `--shadow-lift: 0 -4px 16px rgba(0,0,0,0.05)` and `--shadow-float: 0 12px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.14)` (the dock). Nothing else on the site casts a shadow: no cards, no images, no product, no console. **AVOID:** drop shadows on images, glows, soft "elevation" systems.

---

## 04 · Typography system

### The two voices

**ESTABLISHED SYSTEM RULE.** Two typefaces, each a voice — not a size pairing.

**Switzer** (variable, weights 100–900 available; the site uses 400, 450 and 500) is the **editorial voice**: everything Vagora says to a person and everything a person can act on. Headings, propositions, feature titles, body, FAQ, buttons, links, the dock.

**Fragment Mono** (Regular only; the site loads no other weight) is the **notation / system voice**: the system naming the part of the page you are in, indexing, labelling, recording state. Eyebrows, indexes, RETAIL IMPACT, specification numbers, FAQ numbers, the console's metadata (ESTATE OVERVIEW · ILLUSTRATIVE · SAMPLE DATA), and the console note.

**WHY:** the reader always knows whether Vagora is speaking or the system is annotating. **AVOID:** Mono for headings, buttons, body or anything persuasive; Switzer for indexes or labels; Mono in bold; Mono as "the small font" for captions that are actually editorial (a caption that explains is Switzer small).

**ESTABLISHED SYSTEM RULE.** Fragment Mono has one size (14px), one weight (400), one tracking (0.02em), one line-height (1.25), one colour per surface (55% ink / 52% white), uppercase where it labels, sentence-case in parentheses where it indexes ((01)). It is never decorative: no brackets used as ornament, no coordinates, no timestamps, no terminal styling, no fake code.

### Scale

**ESTABLISHED SYSTEM RULE.** Fluid tiers, quoted at their minimum → maximum. Production values win over any rounded description.

| Tier | Token | Size | Line-height | Tracking | Weight | Used for |
|---|---|---|---|---|---|---|
| Display | `--type-display` | `clamp(3.75rem, 1.5rem + 7.5vw, 10rem)` — 60 → 160px | 0.90 | −0.045em | 500 (450 dark) | The ask ("See it in your store.") only |
| Lead | `--type-lead` | `clamp(2.625rem, 1.5rem + 3.33vw, 5.25rem)` — 42 → 84px | 0.94 | −0.035em | 500 | The manifesto proposition only |
| Chapter | `--type-chapter` | `clamp(2.25rem, 1.4rem + 2.6vw, 4rem)` — 36 → 64px | 0.98 | −0.03em | 500 | The two act openings |
| Section | `--type-section` | `clamp(1.75rem, 1.2rem + 1.6vw, 3rem)` — 28 → 48px | 1.02 | −0.025em | 500 (450 dark) | `.h2` / `.h3`: the Mirror, the console, FAQ head |
| Feature | (body tier) | 18 → 22px | 1.25 | −0.01em | 500 | Feature titles in both acts |
| Body | `--type-body` | `clamp(1.125rem, 1.05rem + 0.25vw, 1.375rem)` — 18 → 22px | 1.42 | 0 | 400 | Ledes, FAQ questions (at 500), the printed email, large button |
| Small | `--type-small` | `clamp(1rem, 0.97rem + 0.1vw, 1.0625rem)` — 16 → 17px | 1.40 | 0 | 400 | Feature bodies, RETAIL IMPACT statements, facts, answers, notes, buttons, colophon |
| Label | `--type-label` | `0.875rem` — 14px fixed | 1.20–1.25 | 0.02em | 400 | Every Fragment Mono element; pills |

The brief's "roughly 84 / 64 / 48 / 22 / 17 / 14" is the maximum of lead / chapter / section / body / small / label. The display tier (160) exists above them and is used once.

**ESTABLISHED SYSTEM RULE.** Headings weigh 500 on light surfaces and 450 on dark (white blooms on black; the lighter weight compensates). Body is 400 everywhere. Nothing on the site is bold (600+). **WHY:** scale creates authority; weight is refinement. **AVOID:** 600–700 weights; light weights (300) for display; mixed weights inside one heading.

**ESTABLISHED SYSTEM RULE.** Negative tracking tightens with size (−0.045em at display, −0.01em at feature, 0 at body). Line-height tightens with size (0.90 at display, 1.42 at body). **AVOID:** tracked-out display text; loose leading on headings; tight leading on body.

### Wrapping and measure

**ESTABLISHED SYSTEM RULE.**

- Headings: `text-wrap: balance` — and where a break matters it is authored with `<br />`.
- Ledes, bodies, facts, answers, notes: `text-wrap: pretty` (no widows).
- Reading measure `--reading-max: 42rem` (ledes, answers); compact measure `--copy-max: 30rem` (notes); annotation blocks `34ch`; feature copy column 280–320px on wide layouts; manifesto `24ch`; Mirror heading `21ch`, Mirror lede `40ch`; ask title `10ch`.
- Numbers use `font-variant-numeric: tabular-nums` (`.num`) wherever they sit in a column or a sequence.

**WHY:** balance keeps headings shaped; pretty keeps paragraphs from ending on one word; tight measures keep copy beside its object instead of running under it.

### Eyebrow → heading distance

**ESTABLISHED SYSTEM RULE.** One site-wide value: `--eyebrow-gap: 24px` (`--space-4`), corrected per heading tier by `--eyebrow-lift` so the optical gap is equal at every scale (display lifts by `0.09em − 5px`, lead by `0.05em − 1.4px`, chapter by `0.045em − 1.2px`). Sections never set their own.

### What is outside the system

**ESTABLISHED SYSTEM RULE.** Four things use their own type and are not templates: the dock (15→16px Switzer 500 at its own padding), the console's metric numerals, the preloader tagline (sized to the viewport width), and the footer wordmark (an SVG, not live text). Do not derive new tiers from them.

### Text on photography

**DERIVED PRINCIPLE.** The website keeps its type beside its photographs rather than on them, because its photographs have no negative space to spare — that is the site's choice, not a law of the system. Text may sit directly on a photograph when all four conditions hold:

1. **Genuine negative space.** A plain wall, an empty floor, sky — not the subject and not a busy area the type has to fight.
2. **Dependable contrast** from the photograph itself, at every size the piece will be seen, with no help from a scrim.
3. **It covers nothing that matters.** Never the customer, the garment, the Mirror, its screen or its UI, staff, or whatever the picture is about.
4. **It is integrated with the composition** — aligned to the picture's own edges and axes, at the scale of the frame, as if the photographer had left the space for it.

When any condition fails, do not force the type onto the picture. Use one of two constructions instead:

- **A · Image + solid field.** The photograph and a separate solid white or black field — a margin below or beside the image — that carries the statement and the index.
- **B · Image + editorial annotation plate.** A compact plate of solid white or solid black on the photograph: zero radius, no blur, no translucency, no gradient, no shadow; attached to an edge or to one of the picture's axes like a caption, never floating mid-frame; sized to its content, never a card. It reads as an editor's note on the photograph, not as interface.

**DO NOT:** glassmorphism; translucent panels; backdrop blur behind content; scrims, smoked overlays or gradients darkening part of a photograph so text can sit on it; rounded floating cards. Blur exists in exactly two places — the dock and the film toggle — and those are locked controls (§11), never content or annotation surfaces.

### Type don'ts

**AVOID:** more than one Switzer weight in a block; Fragment Mono above 14px; all-caps Switzer; italics (loaded, but unused in production — **NOT YET DEFINED** where italic would be appropriate); underlines except the `.link` component; drop caps; text on a photograph outside the conditions of *Text on photography* above (the site itself never writes on an image, hero included).

---

## 05 · Grid, layout and spacing

### Page

**ESTABLISHED SYSTEM RULE.** There is no global max-width and no column grid. The page is the viewport, with one gutter: `--page-x: clamp(1.5rem, 1rem + 1.1vw, 3rem)` (24px on a phone, ≈32px at 1440, 48px max). Copy is bounded by measure, not by columns. Art-directed media may run past the gutter to the viewport edge (both media planes, the handoff photograph, the Mirror product on narrow screens). **AVOID:** a 1200px centred container; a 12-column grid applied to everything; boxed sections.

**ESTABLISHED SYSTEM RULE.** Two local stages exist where a composition would otherwise drift apart on very wide monitors: the Mirror chapter is `min(100% − 2·gutter, 1680px)` centred, and the media planes are capped at `1440px` wide. Extra width becomes outer space, not larger objects.

### Spacing vocabulary

**ESTABLISHED SYSTEM RULE.** Ten steps: `8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160` (`--space-1` … `--space-10`). Three section rhythms: `--section-sm: clamp(72px, 7vw, 112px)`, `--section-md: clamp(96px, 9vw, 152px)`, `--section-lg: clamp(120px, 11vw, 192px)`. Feature steps are `clamp(96px, 12vw, 160px)` apart. Inside a block: 8 / 12 / 16 / 24. Between blocks: 48 / 64 / 96. Between chapters: the section rhythms. **AVOID:** values off the scale; padding to "make room"; equal spacing inside and outside a group.

### The chapter opening

**ESTABLISHED SYSTEM RULE.** Both acts open identically: eyebrow + chapter title (authored two-line break) on the left, supporting statement on the right at body size, one row, baseline-aligned, column gap `clamp(48px, 5vw, 128px)`. Below 1100px the statement drops under the title. The Mirror, console and FAQ open with eyebrow + section heading + lede stacked.

### Act one — the sticky feature system (wide: ≥1100px and ≥600px tall)

**ESTABLISHED SYSTEM RULE.**

- Grid: `minmax(0,1fr) | var(--media-w)` where `--media-w: clamp(720px, 60.5vw, 1440px)`; column gap `--breath: clamp(24px, 1.25vw, 32px)`; padding-left = gutter; the media plane runs to the right viewport edge.
- Media plane: `--media-h: clamp(520px, 71svh, 940px)`, sharp corners (`--radius-media: 0`), `position: sticky; top: (100svh − media-h)/2` — vertically centred in the viewport.
- Rail: five steps, each `min-height: 80svh`, content vertically centred; the annotation block `280–320px` wide (`clamp(280px, 16.5vw, 320px)`), **centred in the whitespace between the gutter and the image's left edge, with its text left-aligned**. Inactive steps at 35% opacity; the active one at 100%.
- The first step is padded down by `stick-top + 16svh` so State 01 reaches reading position only after the opening has cleared.

### Act two — the same system mirrored

**ESTABLISHED SYSTEM RULE.** Identical values; the plane runs to the **left** viewport edge and the rail sits on the right. The opening is *not* mirrored — label and title stay left, statement right — because it is a chapter opening, not part of the stage.

### The Mirror chapter

**ESTABLISHED SYSTEM RULE.** Dark surface. Wide: product field left (≈56% of the 1680px stage), annotation right (≈38%) starting around the product's upper third, specification rail beneath both. Product: `4/5` box, height-driven (`clamp(560px, 80svh, 1040px)`), photograph shown whole with a purely functional edge mask fading its studio into the black. No card, border, shadow, glow or backing panel. Narrow: body, then product edge-to-edge (slightly wider than the viewport on phones — only environment leaves the frame), then the rail. Rail: four columns ≥1280px, 2×2 from 700px, stacked below.

### The console chapter

**ESTABLISHED SYSTEM RULE.** ≥1024px: one row, intro column `clamp(340px, 26vw, 480px)` left, the object filling the rest, both vertically centred against each other. Below: intro at `max-width: 360px`, object beneath.

### The handoff

**ESTABLISHED SYSTEM RULE.** One photograph, full page width, `clamp(420px, 70svh, 900px)` tall, `object-position: 52% 42%`, nothing written on it. The physical reset after the system.

### FAQ

**ESTABLISHED SYSTEM RULE.** `5fr | 7fr` at ≥900px; the head is sticky (`top: clamp(64px, 14svh, 140px)`); answers are a numbered hairline list (`3ch | 1fr`), all open, no accordion.

### The ask and footer

**ESTABLISHED SYSTEM RULE.** The ask is the one centred composition: `min-height: 100svh`, display title at `10ch`, button, printed and copyable address, one-line note at `30rem`. The footer sets the wordmark at 100% width with a hairline colophon row and clears the dock.

### Alignment rules

**DERIVED PRINCIPLE.** Everything in a block sits on one left axis. Text is never centred except in the ask. Numbers align on tabular figures. Baselines align across a row (`align-items: end`/`baseline`).

---

## 06 · Responsive philosophy

**ESTABLISHED SYSTEM RULE.** The site is fluid, not stepped: type, gutters, section rhythm and media sizes are `clamp()` functions of viewport width (and height, for media). Breakpoints exist only where a *layout* must change: `460` (dock brand cell), `640` (media ratio 4/5 → 4/3; metrics 2-up), `700` (manifesto meta and specification 1 → 2 columns), `900` (media ratio → 16/10; FAQ two columns; chapter openings one row), `1024` (console one row), `1100 + min-height 600` (the sticky feature system exists), `1200`, `1280` (specification four columns).

**ESTABLISHED SYSTEM RULE — height sensitivity.** Media heights are `svh`-based and the sticky stage only exists when the viewport is at least 600px tall. A 1200×720 or 1366×768 laptop must still show the held Act one composition whole; that is tested, not assumed. Everything uses `svh`, never `vh`, so mobile browser chrome never causes a jump.

**ESTABLISHED SYSTEM RULE — differential scaling.** Between 1440 and 2560 the media stage grows fastest, headings moderately, body barely, gutters slightly. A large monitor gets a larger picture and more air, not larger paragraphs.

**ESTABLISHED SYSTEM RULE — narrow layouts are complete, not reduced.** Below the wide breakpoint every feature becomes one editorial scene in normal flow — image (4/5 → 4/3 → 16/10), index, title, body, RETAIL IMPACT — with generous air and no script. The image opens from its own centre (`inset(0 12%) → inset(0 0%)`, 1.15s, once) as it enters. Nothing is hidden on mobile that a reader needs.

**DERIVED PRINCIPLE.** The mobile hierarchy is the desktop hierarchy re-stacked in reading order: image → notation → title → body. The dominant object stays dominant.

**IMPLEMENTATION DETAIL — QA viewports.** The site is validated at 360×800, 390×844, 768×1024, 1200×720, 1366×768, 1440×900, 1920×1080 and 2560×1440. Any new page should be checked at the same eight. Passing criteria: no horizontal overflow, no clipped glyphs (split-line masks carry a glyph safety area), every reveal fires, the dock never covers a control at rest, the held compositions fit at 720px tall.

---

## 07 · Imagery system

The imagery is half of the brand. This section is written so that a photographer, a retoucher or an image model can produce a picture that belongs on the site.

### A · Subject

**ESTABLISHED SYSTEM RULE (from the twelve production images and the hero film).** The subject is always one of:

1. **A customer in front of the Vagora Mirror**, seeing themselves in a garment the Mirror is rendering (feature-try-on, feature-catalogue, feature-outfit, feature-scene, biz-carryover, the hero film).
2. **The Vagora Mirror alone**, as an object in a dark studio (vagora-mirror-dark).
3. **A moment of retail service around the Mirror** — a colleague bringing the piece, a made-to-order consultation with swatches and a sketch (feature-made-to-order, store-handoff).
4. **A business surface** — a data wall in a dark store, an estate status screen (biz-intelligence, biz-fleet).

**DERIVED PRINCIPLE.** The Mirror is always *in* the picture or *is* the picture. Vagora does not publish garment photography without the Mirror, lifestyle photography without the product, or abstract technology imagery.

### B · Environment

**ESTABLISHED SYSTEM RULE.** Bright, contemporary stores: white and pale-beige walls, natural daylight from large windows, polished concrete or pale floors, sparse rails with few garments, plants and simple props, generous negative space. Studios are seamless white (hero film) or seamless black (product). Business scenes are dark stores with a lit screen as the only bright element.

**AVOID:** cluttered stock rooms, mall corridors, dark moody boutiques as a default, neon, showroom "future retail" sets, glass-and-chrome tech interiors.

### C · The person

**ESTABLISHED SYSTEM RULE.** One customer per scene (occasionally one customer + one member of staff). Adults, dressed in the garment being tried or in plain everyday clothes. The customer is real-looking, relaxed and unposed: standing naturally, weight on one leg, a hand raised, turning slightly to see the render, looking at the Mirror, not at the camera. Staff wear plain dark or neutral clothing and are doing something (carrying a garment, showing swatches), never presenting to camera.

**AVOID:** model poses; smiling at camera; groups; children; hands on the screen; exaggerated surprise; pointing at the screen for the camera.

### D · Interaction accuracy — the Mirror is not a touch screen

**ESTABLISHED SYSTEM RULE (from copy and imagery).** "Nothing to tap, nothing to learn." The Mirror starts when someone steps in front of it and is used from a natural standing distance. Interaction is by moving, turning, raising a hand — the garment "responds as they move." The screen is "readable from a natural standing distance."

**Product fact — the distance.** The customer stands **approximately 1.5–2 metres from the Vagora Mirror, at a comfortable hands-free viewing distance**. This is the figure every prompt, brief and specimen uses.

**HOW to show it:** the customer stands approximately 1.5–2 metres from the display, at a comfortable hands-free viewing distance, feet flat on the floor, standing comfortably and observing the render: small posture adjustments, a slight turn, a subtle natural hand or arm movement, looking at the screen. Their render fills most of the 49-inch portrait display. A raised hand is at chest or shoulder height and *well away* from the glass. The phone appears only for the QR scan at the end (store-handoff).

**AVOID:** fingers on the screen; tapping or swiping; touching UI controls; leaning forward toward the display like a kiosk; standing inches from the glass; exaggerated Minority-Report gestures; a keyboard, card reader or tablet attached to the unit; staff operating the Mirror for the customer. If a gesture is shown at all it stays restrained, and it must never imply touchscreen use.

### E · Product protection (for photography and image generation)

**ESTABLISHED SYSTEM RULE (measured from `vagora-mirror-dark.jpeg`, the product photograph).** This is the canonical hardware description. It is the part of a prompt that models get wrong, so it is written to be used verbatim.

**The display column**

- A **49-inch portrait display** — tall and narrow, screen aspect close to 9:16.
- Set in a **matte-black rectangular frame** with **square, architectural corners** and **real depth**. The frame is a solid black surround, not a hairline bezel, and the column has visible thickness when seen at a three-quarter angle. It is **not** a thin television on a stand.
- **No logo on the front.** **No physical buttons, no touch controls, no keypad** anywhere on the frame. **No exposed cables.**

**The base**

- A **substantial black lower cabinet**, wider and deeper than the display column, giving the unit its weight and its architectural stance.
- Its **upper face is a pronounced sloped wedge** running down toward the front. In the production photograph that sloped face reads lighter than the vertical black body because it faces the light; whether it is a **separate material or colour** from the body is **NOT YET DEFINED** — describe the geometry (the slope), not a pale panel, and never instruct a model to add one.
- **Recessed handle slots** on the cabinet's front face.
- **Four small caster wheels** underneath, visible at the corners, so the unit plainly reads as freestanding and movable.

**The sensor — a Microsoft Kinect v2**

- A **black Microsoft Kinect v2**: a long, low, horizontal sensor bar with its lens cluster visible along the front face and a perforated end panel.
- Mounted on a **short black bracket that projects horizontally outward from the VIEWER-RIGHT edge of the display frame**.
- Positioned at **approximately mid-height of the display** (measured at ≈49% of the frame's height in the production photograph — the middle, not the upper third).
- It is **NOT** on top of the display. **NOT** centred above the screen. **NOT** embedded inside the bezel. **NOT** on the left. **NOT** a generic webcam, and there is never a second camera.

The Kinect v2 and its bracket must stay visually recognisable and proportionally believable. **Do not redesign or stylise the hardware.**

Any image that departs from this is not the product. See the Product Accuracy Checklist in §08.

### E2 · What the screen must show — the try-on is the picture

**ESTABLISHED SYSTEM RULE.** The Vagora screen is **not a mirror reflection**. Vagora performs **live 3D virtual try-on**, and that must be visually obvious in every photograph and every frame of video.

- The customer standing in front of the Mirror wears **one real outfit**.
- The screen shows **that same customer**, full-length, wearing a **visibly different garment** — one they are not physically wearing, selected virtually through Vagora.
- The invariant is **PHYSICAL OUTFIT ≠ VIRTUAL OUTFIT**. Prefer a strongly obvious difference — a different garment type and/or a clearly different colour — so a viewer understands at a glance that the customer is trying on something they do not have on. "Type *and* colour" is the safest default, not a requirement: a colourway comparison (the same jacket in another colour) is a valid Vagora scene as long as the difference is unmistakable.

| Real customer | On screen |
|---|---|
| White top and black trousers | The same customer in a yellow dress |
| A neutral suit | The same customer in a blue coat |
| A black jacket | The same customer in the same jacket, clearly in olive — a colourway comparison |

**The single most common failure is the screen outfit matching the physical outfit.** If they match, the image says "mirror" and the product's entire proposition disappears. Check this before anything else.

**The garment-selection UI.** Restrained, and only where it earns its place:

- **2–4 small garment or colourway thumbnails**, compactly placed near **one** screen edge.
- **Exactly one visibly selected**, marked with a restrained outline or highlight; the others stay secondary.
- The selected thumbnail **is** the garment rendered on the customer's body — the two must correspond.

The UI tells one story: **several options available → one selected → the selected garment rendered on the customer.** Nothing more.

**AVOID on the screen:** dashboard UI; floating holograms; sci-fi HUD elements; excessive labels; giant buttons; colourful app-style controls; complex ecommerce UI; a screen so full of interface that the render is no longer the subject.

### F · Composition

**ESTABLISHED SYSTEM RULE.** Landscape 16:9 masters (all feature and business images are 1920×1080) cropped to 16/10, 4/3 or 4/5 by the layout; the product alone is portrait 4:5. The Mirror stands at roughly one third of the frame; the customer at the opposite third or centre; the space between them is kept open. Horizon is level. Camera height is chest height. Foreground is empty. **DERIVED PRINCIPLE.** Compose with the crop in mind: keep the Mirror and the customer within the central 55% of the frame so a 4:5 crop still holds both.

### G · Camera

**DERIVED PRINCIPLE.** 35–50mm equivalent, moderate depth of field (the Mirror sharp, the background softly falling away but legible), no wide-angle distortion, no tilt, eye/chest height, slight three-quarter angle to the Mirror so the screen is seen as a surface with thickness. The hero film is a locked-off wide shot: the Mirror at frame-left third, the customer walking in from the right and stopping.

### H · Lighting

**ESTABLISHED SYSTEM RULE.** Daylight-balanced, soft, from a large window or a seamless studio; the screen's own glow is the second light and is visible on the customer's face and the floor. Product: black studio, a single soft key that reads the frame's edge, screen lit. **AVOID:** coloured gels, rim-light "tech" looks, HDR, dramatic chiaroscuro on customers.

### I · Colour and grade

**ESTABLISHED SYSTEM RULE.** Neutral, slightly bright, low-contrast grade; whites are white, blacks are black; skin natural. Colour comes from the garments (coral, cobalt, magenta, yellow, green, white) and from small store props. The store's lime-green accents are photographic and must not become graphic. **AVOID:** teal-and-orange, desaturated "cinematic" grades, heavy vignette, film grain overlays.

### J · Realism

**ESTABLISHED SYSTEM RULE.** Photographic realism throughout. The renders on the Mirror are plausible garments on a plausible body. No CGI gloss, no floating UI in the air, no holograms, no particles, no light beams. The hero film is a real-looking studio with a real-looking person. The one non-photographic image (biz-fleet) is an honest UI capture and is shown whole on its own ground.

### K · AI image-generation framework

**NEW RECOMMENDATION.** When generating imagery, build the prompt in this order and keep every clause: **subject → environment → [product clause] → [screen clause] → [interaction clause] → composition → camera → light → grade → realism → [negative clause]**. The four bracketed clauses are fixed text and are defined **once, in §19** (the paragraphs headed THE PRODUCT, THE SCREEN, INTERACTION and NEVER of the image block). Paste them from there verbatim; they are the parts models get wrong, and the screen clause is the one that decides whether the image shows a try-on mirror or an ordinary one. In brief:

- **[product clause]** — the canonical hardware of §07E: 49-inch portrait display, matte-black frame with square corners and real depth, substantial black cabinet with a pronounced sloped upper face, handle slots, four casters, Kinect v2 on a short bracket at the viewer-right edge at mid-display height, no logo, cables or touch controls.
- **[screen clause]** — the try-on of §07E2: physical outfit ≠ virtual outfit, obviously; 2–4 thumbnails at one edge, one selected, and that one is the rendered garment.
- **[interaction clause]** — the distance of §07D: approximately 1.5–2 metres, hands-free, never touching or leaning.
- **[negative clause]** — everything the image must not do to the hardware, the interface or the scene.

Example prompts:

**Customer discovery**
> Editorial retail photograph. A woman in her thirties, **physically wearing a plain white top and black trousers**, stands approximately 1.5–2 metres from [product clause], in a bright contemporary store with white walls, daylight from a large window, a sparse rail and a plant. [screen clause] — **here the screen shows her in a cobalt-blue dress**, matching the selected thumbnail. She has one hand raised to shoulder height, turning slightly to look at her virtual outfit. [interaction clause] 35mm, chest height, three-quarter angle, soft daylight with the screen's glow on her face, neutral bright grade, generous empty space, photographic realism. [negative clause]

**Full look**
> Editorial retail photograph. A man **physically wearing a plain grey t-shirt and dark jeans** stands at a natural hands-free distance from [product clause]. [screen clause] — **here the screen shows him in a complete tailored outfit he is not wearing: a camel overcoat, dark trousers and shoes**, with three coordinating options as small thumbnails at the screen's right edge and the overcoat visibly selected. [interaction clause] Pale-beige store, polished concrete floor, morning light, empty foreground. 50mm, level horizon, moderate depth of field, neutral grade. [negative clause]

**Made-to-order**
> Editorial retail photograph. A member of staff in plain dark clothing holds three fabric swatches and a paper sketch beside [product clause], while a customer **physically wearing a simple cream blouse and trousers** stands back from the screen. [screen clause] — **here the screen shows her in a made-to-order emerald dress that does not yet exist as a garment**, with the three swatch colourways as thumbnails and the emerald one selected. [interaction clause] Quiet atelier-like store, daylight, white walls. 35mm, three-quarter, soft light, neutral grade, calm. [negative clause]

**Campaign**
> Editorial photograph. A customer **physically wearing plain black separates** stands at a natural hands-free distance from [product clause]. [screen clause] — **here the screen shows her in the collection's coral dress**, placed inside a campaign scene, a sunlit coastal set, while the store around her stays plain white and real. The contrast between the built scene on the screen and the plain store is the picture. [interaction clause] 35mm, chest height, daylight, neutral grade. [negative clause]

**Retail staff**
> Editorial retail photograph. A colleague in a plain black shirt walks toward the counter carrying a folded garment; behind her a customer **physically wearing a white shirt and jeans** holds up her phone to scan a QR code at the edge of [product clause]. [screen clause] — **here the screen still shows her in the magenta dress she has been trying on**, which is the garment the colleague is carrying. The phone is used only for the scan; the screen itself is never touched. Bright store, daylight, shallow depth of field on the colleague. 50mm, neutral grade, unposed. [negative clause]

**Product hero**
> Studio product photograph. [product clause], alone, standing on a seamless black floor against a seamless black background, a single soft key light reading the edge of the frame and the sloped face of the base, the screen lit and showing a full-length garment render with two or three small thumbnails at one edge and one of them selected. Straight-on with a slight three-quarter turn so the frame's depth and the Kinect's bracket both read, **whole product in frame including the sloped base and all four casters**, portrait 4:5, true black, photographic realism. No person in shot. [negative clause]

**Operations**
> Photograph inside a dark store after hours. A wall-mounted screen shows an estate overview — a simple dark interface listing stores with small green, amber and red status pills and a count of mirrors online — as the only bright element. A single [product clause] stands in the background with its screen dark, so the hardware alone reads: frame, sloped base, casters and the Kinect on its bracket at the viewer-right edge. 35mm, low light, neutral grade, no people. [negative clause]

### Image don'ts

**AVOID:** **the on-screen outfit matching the customer's physical outfit** — the single failure that destroys the picture; stock "happy shopper" imagery; models looking at camera; touching, tapping or swiping the screen; the Mirror wall-mounted, landscape, curved, bezel-branded, or slimmed into a television on a stand; the base removed, redesigned or missing its casters; the Kinect moved on top, above, inside the bezel or to the left, turned into a webcam, or joined by a second camera; multiple Mirrors in a row in a marketing image (the estate is shown as data, not as a showroom); UI mock-ups floating beside a person; holograms and HUDs; dashboard interfaces on the Mirror; futuristic sets; scrims, gradients or translucent overlays on photographs, and text on a photograph that fails the conditions in §04; garments without the Mirror; renders that look like CGI; heavy grades; children.

---

## 08 · Product representation

### The Vagora Mirror

**ESTABLISHED SYSTEM RULE.** The product is shown **whole** — frame, screen, the Kinect v2 on its bracket, the sloped base, the casters — and never drawn around or over. On the site it stands in its own dark studio on the black surface, with a functional edge mask so its environment merges into the page and no rectangle reads. It is presented as an object of fashion retail, like a fitting-room mirror, not as a device: no exploded views, no glowing outlines, no callout arrows, no spec overlays on the photograph.

**ESTABLISHED SYSTEM RULE.** Specifications live in the **specification rail** beneath the product — one hairline, four territories, index (01–04) above fact — not on the image. The four production facts are privacy (camera / storage), identity (no account / face database), stock (live check before showing), and display (49-inch portrait, natural standing distance).

**ESTABLISHED SYSTEM RULE.** Naming: "the Vagora Mirror" / "the mirror" / "a mirror" / "every mirror". Never *unit, kiosk, terminal, station, device, screen* (as the noun), *smart mirror, magic mirror, digital signage*.

**DERIVED PRINCIPLE.** The product's own ground is black. If it must appear on a light layout (a sheet, a slide), place it in a black field with the same edge treatment rather than cutting it out onto white.

### Product accuracy checklist

**NEW RECOMMENDATION** (built from the production photograph and film; use before publishing any image or render of the product). The prompt language that produces a correct image is in §19; this list is how you check the result.

**Structure**

- [ ] Portrait display, 49-inch class, tall and narrow (screen aspect close to 9:16).
- [ ] Matte-black rectangular frame with **square architectural corners** and visible depth — never rounded corners, never a thin television on a stand, never a wall-mounted screen or a plain wall mirror.
- [ ] **Substantial black lower cabinet** with a **pronounced sloped upper face** and recessed handle slots on the front. Not removed, not redesigned, not shrunk to a pedestal. (Whether that face is a separate material or colour is NOT YET DEFINED — do not add a pale panel.)
- [ ] **Four caster wheels** visible underneath. The unit reads as freestanding and movable.
- [ ] Proportions unchanged: taller than the customer, roughly a person's shoulder width plus margin, with the cabinet wider and deeper than the column.
- [ ] No logo on the front. No exposed cables. No buttons, keypad or touch controls on the frame.

**The sensor**

- [ ] A recognisable **Microsoft Kinect v2** — long, low, horizontal bar with a visible lens cluster — on a **short bracket projecting horizontally from the VIEWER-RIGHT edge** of the frame.
- [ ] At **approximately mid-display height**. Not on top. Not centred above the screen. Not inside the bezel. Not on the left.
- [ ] Still recognisably a Kinect: not a generic webcam, not restyled, and never accompanied by a second camera.

**The screen**

- [ ] The screen shows the **same customer** standing in front of it, full-length.
- [ ] Wearing a **visibly different garment** from the one they are physically wearing — different type *and* different colour. **If the two outfits match, the image has failed.**
- [ ] **2–4 small garment or colourway thumbnails** near one edge, **exactly one visibly selected**, and the selected thumbnail is the garment rendered on the body.
- [ ] No dashboard UI, holograms, HUD, giant buttons or app-style chrome.

**Interaction and ground**

- [ ] No touch interaction; the customer stands approximately 1.5–2 metres from the Mirror at a comfortable hands-free viewing distance, hands away from the glass, no leaning toward the display.
- [ ] No peripherals: no tablet, keyboard, card reader, extra camera, speaker grille.
- [ ] Ground is black (studio) or the real store floor; never a gradient stage or a reflective "tech" floor.
- [ ] Only one Mirror in a marketing image (an estate is shown on the console).

### The console

**ESTABLISHED SYSTEM RULE.** The console is presented as **one coherent technical object**: a white surface with a 1px hairline border, no shadow, no browser chrome, no device frame. Inside it, in this order: a bar (ESTATE OVERVIEW · ILLUSTRATIVE in mono), two metrics (label in mono, value in large tabular Switzer, delta beneath), a store list with status pills (Live / Syncing / Offline; the Syncing dot blinks), and beneath the object a mono note: "Sample data, not a live estate." Everything the console knows stays inside the object; nothing is scattered across the page around it.

**ESTABLISHED SYSTEM RULE.** Console data is illustrative and says so on the asset. Any console representation elsewhere must carry the same disclosure until real estate data exists.

**DERIVED PRINCIPLE.** The console is calm. Numbers are few (two metrics, three stores). The object arrives once (a scrubbed tilt into place) and nothing inside it animates except the sync indicator. **AVOID:** charts, sparklines, maps, notification badges, avatars, dark-mode dashboards, "AI insight" panels.

---

## 09 · Iconography

### The decision

**ESTABLISHED SYSTEM RULE — the Vagora icon family is PHOSPHOR.** Phosphor Icons (MIT) is the brand standard, and it is what the website ships: the five production interface icons are Phosphor Regular (see *In production* at the end of this section). No other icon family is used.

**ESTABLISHED SYSTEM RULE — icons are functional punctuation, not illustration.** This is the rule the family serves, and it outranks the family. An icon exists on a Vagora surface only where a control, a direction, an action, a status or a compact technical readout genuinely needs a symbol. It is a mark of punctuation inside an interface, not a picture of an idea.

Icons **support**: controls · navigation · actions · statuses · compact technical UI.

Icons **never become**: feature illustrations · marketing decoration · icon cards · visual filler · generic SaaS feature symbols.

**ESTABLISHED SYSTEM RULE.** Vagora's marketing communication carries its meaning with **photography, typography, Fragment Mono notation, numbering, hairlines and composition** — not with icons. The finished website proves this: eight features, three business entries, four specifications, six answers, and not one feature icon anywhere. If a symbol is being reached for to explain a capability, the answer is a photograph, a number or a sentence.

**ESTABLISHED SYSTEM RULE.** Icons never carry meaning alone: every icon sits with a visible text label or an `aria-label`.

### The three voices

Vagora already speaks in two registers. Phosphor is the third, and it is defined by its relation to the other two — which is also what settles the weight question below.

| | Voice |
|---|---|
| **Switzer** | Human and editorial language — what Vagora says to a person, and what a person can act on. |
| **Fragment Mono** | Written technical notation — the system naming, indexing and recording. |
| **Phosphor** | **Functional visual notation** — the same technical register as Fragment Mono, drawn instead of written. |

### The weight system

**ESTABLISHED SYSTEM RULE.** Two Phosphor weights, chosen by **typographic context**, not by size. Production demonstrates the first half of the rule (every production icon sits beside Switzer and is Regular); the Light half is the same rule applied to the Mono register, which the site never needed an icon for.

| Beside… | Use | Because |
|---|---|---|
| **Switzer** | **Phosphor Regular** (16-unit stroke on the 256 grid — 1.5px at 24px) | Switzer carries more visual mass. Regular balances beside it and reads as part of the same control rather than as a lighter object placed next to one. |
| **Fragment Mono, or standing alone as technical notation** | **Phosphor Light** (12-unit stroke — 1.125px at 24px) | Light matches Fragment Mono's quieter, more technical voice. Regular beside Mono reads as a UI control that has wandered into a caption. |

**Switzer contexts (Regular):** CTA buttons · navigation · interactive controls · compact actions · links with icons · UI controls.

**Mono / notation contexts (Light):** system annotations · metadata-adjacent iconography · technical references · restrained standalone functional symbols · anywhere the icon should feel closer to notation than to UI.

**ESTABLISHED SYSTEM RULE — the primary rule is typographic, not dimensional.** Do not derive weight from size. A 16px icon in a button is Regular; a 24px icon in a technical annotation is Light. Size still matters optically and is judged second.

**DERIVED PRINCIPLE — always judge by optical balance, and allow reviewed exceptions.** Phosphor's glyphs differ in density: a `list` is three long strokes, a `check` is two. If a specific symbol reads unusually heavy or unusually weak in its context, the weight may be changed for that symbol after visual review. The exception is per symbol, per context, and it is a decision someone looked at — never a default and never a global override.

### Allowed styles

**NEW RECOMMENDATION.**

- **Approved:** Phosphor **Regular**, Phosphor **Light**.
- **Not used by default:** Thin, Bold, Fill, Duotone.

Another style may be used only where a genuine interaction or state requires it — a filled glyph to mark a selected state, for instance — and only if the result still belongs to the established system. It is a considered exception, not a palette.

### Character

The icon system should feel: **precise · quiet · refined · technical · contemporary · low-ego · functional.**

It should never feel: friendly or cute · illustrative · bubbly · heavy · futuristic · sci-fi · decorative · gamified.

**DERIVED PRINCIPLE.** This is the same brief the rest of the system answers. An icon that would look at home in an onboarding illustration is wrong here even if it is technically the right symbol.

### Size

**DERIVED PRINCIPLE.** Sizes in use are **16 · 20 · 24**. These are the sizes the production contexts actually call for; they are not a rigid scale, and no size rule is asserted beyond what the finished system supports.

**ESTABLISHED SYSTEM RULE.** For the CTA / primary button: **24px, Phosphor Regular.** This is what production computes — `.btn svg` is `1.1em`, which on the large button (body tier, up to 22px) resolves to ≈24px. For smaller controls, test optically against Switzer and the surrounding UI rather than applying a table.

### Core icon set

**NEW RECOMMENDATION** (the first five — `arrow-up-right`, `play`, `pause`, `copy`, `check` — are ESTABLISHED, in production). Small and practical. Add a symbol only when a real control needs one; this is a working set, not a catalogue.

| Phosphor name | Purpose |
|---|---|
| `arrow-up-right` | The primary button; an action that leaves the page |
| `arrow-right` | Next / advance (carousels, decks) |
| `arrow-down` | A scroll or download affordance, where one is genuinely needed |
| `caret-right` | Chevron: disclosure, breadcrumbs, compact navigation |
| `x` | Close |
| `plus` / `minus` | Expand and collapse, if a disclosure pattern is ever introduced |
| `play` / `pause` | Media controls |
| `copy` / `check` | Copy-to-clipboard and its done state |
| `list` | Menu, where a menu exists |
| `arrow-square-out` | External link, when it must be distinguished from `arrow-up-right` |
| `corners-out` | Expand to full screen, where needed |

**AVOID:** icons for features (a "3D" cube, a hanger, a shirt, a sparkle for AI); icon-and-label grids; icon cards; multicolour icons; icons as bullets; any symbol whose job is to fill a space.

### Implementation

**IMPLEMENTATION DETAIL.** Phosphor expresses weight differently from stroked icon sets, and it matters to anyone wiring it up. In a stroked set the weight is a CSS-reachable `stroke-width`. Phosphor icons are **filled outline** paths (`fill="currentColor"`) on a **256 × 256** grid, with the weight baked into the geometry and the round terminals drawn as arcs. You therefore **choose the weight by importing the right asset**, not by setting a stroke width, which is exactly why weight is an authoring decision made per icon and per context. Colour still follows `currentColor`.

Stroke equivalents on the 256 grid: Thin 8 · **Light 12** · **Regular 16** · Bold 24 — that is 0.75 / 1.125 / 1.5 / 2.25 px when rendered at 24px.

**Licence:** Phosphor Icons, MIT © Phosphor Icons. The licence text is in the repository's `LICENSES/` folder beside the font licences; ship it with any asset package.

### In production

**ESTABLISHED SYSTEM RULE.** The website ships Phosphor Regular. Five interface icons are inlined as SVG symbols in `projects/website/index.html`, on the 256 grid with `fill="currentColor"`: `arrow-up-right` (primary button, `1.1em` ≈ 24px on `.btn--lg`), `copy` and `check` (address copy control, 16px), `play` and `pause` (hero film toggle, 16px). Each sits beside Switzer, so each is Regular — the weight rule above, applied. No other icon library is loaded, referenced or attributed anywhere on the site.

**NOT YET DEFINED.** Whether a filled style is ever admitted for a selected state; whether 20px earns a fixed context of its own.

---

## 10 · Motion language

### Principles

**ESTABLISHED SYSTEM RULE.** Motion on the site is deliberately small. It is one of three things: **a fix** (the film's loop), **an arrival** (a heading, the product resolving, the console plane, the store crop, the wordmark), or **an answer to where the reader is** (the active step, the dock's spy). It is never a section's decoration and it never makes the reader wait.

**ESTABLISHED SYSTEM RULE — establish the spatial anchor first.** In every chapter the frame or surface is established at its final geometry *before* anything inside it moves: the media plane is at its sticky position from the first frame and the picture is revealed *inside* it; the Mirror's frame is on screen before the product resolves; the manifesto's white surface arrives carrying its first line. Nothing slides into a place it then has to correct.

**ESTABLISHED SYSTEM RULE — major vs quiet moments.** Each chapter has at most one authored *event* (the takeover, the product resolving, the console arriving, the wordmark rising). Everything else is the *quiet grammar*: a 10px rise and a fade over 700ms, once, with delays of 80/160/240ms for siblings.

**ESTABLISHED SYSTEM RULE — one heading animation.** Every heading on the site arrives the same way: words masked per line, `yPercent 120 → 0` with opacity, 1.15s, `expo.out`, stagger 0.035s. A chapter chooses *when* it is asked for; the animation itself is shared, and a new surface starts from it before considering anything else.

**ESTABLISHED SYSTEM RULE — reversible by construction.** Takeovers are CSS composition (`position: sticky` + negative margins), not pinned timelines, so scrolling back simply reverses them; page height is never changed by motion.

**DERIVED PRINCIPLE — the takeover is a signature, not the only door.** The pinned takeover is Vagora's high-intensity transition, used selectively — twice on the whole site, each time to change world (black ↔ white). Ordinary document-flow transitions and quiet handoffs between sections of the same surface are equally valid Vagora motion; most chapters simply follow one another. The vocabulary below is the default for new work. A technique outside it may be earned by a new surface when the established grammar cannot do the job, provided it keeps these principles — anchor first, one event per chapter, reversible, small — and is then recorded here.

### The vocabulary

| Pattern | What it is | Where | Values |
|---|---|---|---|
| **Pinned section transition (takeover)** | The site's signature transition, used for its two changes of world. The outgoing world is held by `position: sticky`; the incoming world is pulled up by an equal negative margin and painted above it. One clean full-width plane; no mask, no wipe. | Hero → Manifesto (white over black); Act one → Mirror (black over white) | Hero: scope 200svh, manifesto `margin-top: −100svh`. Act one: `--act-anchor = 100svh − act height`, `--act-hold = 100svh`. ESTABLISHED |
| **Pinned reveal** | While a held world is being covered, it answers minimally: the film scales 1 → 1.025 and dims to 0.88 brightness, scrubbed. | Hero, wide layouts only | ESTABLISHED |
| **Scroll-driven takeover of a proposition** | Words light from 18% to 100% opacity as the reader scrolls (`top 45%` → `bottom 30%`); then the block yields upward (−24…−70px, to 45% opacity) as the next chapter arrives. | Manifesto | ESTABLISHED |
| **Sticky media stage** | One image plane fixed at viewport centre while an annotation rail scrolls beside it; the state changes when a block's top crosses 72% of the viewport (and back at the same band). State change 300ms crossfade, or a refraction wave where WebGL is available. Annotation leaves in 200ms, arrives in 300ms after a 260ms delay. | Both acts | ESTABLISHED |
| **Directional media reveal** | The picture inside the plane is revealed bottom-up as the stage enters (`top 90%` → `top 45%`, scrubbed). On narrow layouts each image opens from its centre (`inset(0 12%) → 0`, 1.15s, `power2.out`, once at `top 88%`). | Stage entry; every narrow image; the handoff frame (`inset(0 10%)`, scrubbed, with an 8% parallax) | ESTABLISHED |
| **Masked text reveal** | Words rise from below a per-line mask (see the heading animation). The preloader tagline and the footer wordmark use the same idea (characters; a 34% masked rise). | Every heading; preloader; footer | ESTABLISHED |
| **Exposure** | An object resolves in place with no travel: scale 1.045 → 1 with opacity over 0.85s. | The Mirror product | ESTABLISHED |
| **Plane arrival** | An object rotates out of a 7° offset plane and settles flat, scrubbed between `top 92%` and `top 42%`. | The console | ESTABLISHED |
| **Pointer depth** | Fine pointers only, additive, bounded: ±8px on the product; ±3°/2.4° tilt on the console; 0.3× magnetic pull on the primary button; a 12px difference-blend cursor dot. | Mirror, console, ask | ESTABLISHED |
| **Preloader** | Black curtain, the mark fades in, "Beyond the Mirror" rises character by character sized to the viewport, then the whole panel lifts out of the top in 0.78s (`power1.inOut`) and scrolling is handed back the instant the black clears. | Once per load | ESTABLISHED |
| **Dock** | Rises after the curtain; scrollspy lights the section covering the 35–65% band of the viewport; link labels flip on hover; the mark tilts −24° on hover. | Always | ESTABLISHED |

### Timing tokens

**ESTABLISHED SYSTEM RULE.** `--duration-fast: 180ms`, `--duration-base: 320ms`, `--duration-slow: 700ms`; `--ease-standard: cubic-bezier(0.22, 1, 0.36, 1)`. GSAP `EASE` is `expo.out` for arrivals; scrubbed motion is `ease: "none"` with a 0.5–0.7 scrub lag; the preloader lift is `power1.inOut`.

### Engineering rules

**IMPLEMENTATION DETAIL.**

- **GSAP 3 + ScrollTrigger** is the animation system; **Lenis** (lerp 0.09) is the sole smooth-scroll engine, driven from `gsap.ticker` with `lagSmoothing(0)`. Never two smooth-scroll engines; never two systems driving one property (the annotation's opacity belongs to CSS, its transform to GSAP).
- Wide-only behaviour is gated by `gsap.matchMedia("(min-width: 1100px) and (min-height: 600px)")` and cleans itself up when the viewport leaves that range.
- `prefers-reduced-motion: reduce`: no Lenis, no curtain, no scrub, no split, every state rendered final on first paint, film paused on its poster. Not shortened — removed.
- Mobile: no sticky stage; the narrow score (centre-open images) is the only scripted entrance; no pointer effects.
- Reverse: every scroll-linked effect must read correctly scrolling up; `once: true` is used only for entrances that should not replay.
- Performance: transforms and opacity only; clip-path for reveals; `will-change` on split words; DPR capped at 1.75 on the refraction canvas, which is composited only while a wave is crossing; images decoded on approach (`top 250%`), not at boot.
- Viewport height: everything is `svh`; measurements are retaken on ScrollTrigger `refreshInit`; the page's total height is never changed by motion.
- **The preloader owns the first frame.** The curtain is built by the module, so nothing stops the finished page painting while that module downloads. An inline script in `<head>` marks the document `booting` during parsing and CSS paints the black immediately; `intro()` drops that class in the same frame the real curtain is appended — same colour, invisible handover — and a 4-second failsafe in the same inline script clears it if the module never arrives, so a script error can never leave the page dark. Reduced motion opts out of the shield in CSS, and with JavaScript off neither class is ever set.
- **Nothing in the preloader paints before it is measured.** The tagline is `visibility: hidden` until `fitLine()` has sized it and its letters have been put below the mask, because its CSS `font-size` is only a fallback: painting it earlier shows a small, finished-looking tagline at rest for as long as the font wait takes.
- Text split: the unsplit accessible name stays in the DOM; split words are `aria-hidden`; links are never split; without JS nothing is split and everything is visible.

### Avoid

**ESTABLISHED SYSTEM RULE (tried on the site and removed).** These were built for the website and rejected, and they describe what the production motion is not: expanding rectangles or masks that grow from a media plane; block wipes; empty black interstitial holds; irregular geometry, blobs, iris or circular reveals; shader transitions between chapters; morphing; parallax on everything; fade-up-everywhere; letter-by-letter physics; scroll-jacking that traps or invents scroll; motion that delays the CTA or navigation; anything that runs continuously off-screen. Treat the list as the record of what did not survive, and as a strong default against repeating it — not as a permanent prohibition on future surfaces with different needs.

---

## 11 · Component and interface language

Every component below exists on the site. Values are production values.

### Eyebrow

**ESTABLISHED SYSTEM RULE.** Fragment Mono, 14px, 400, 0.02em, uppercase, notation colour, `margin-bottom: 24px` corrected by `--eyebrow-lift`. Names the part of the page: "Vagora is", "Act one · On the floor", "The Vagora Mirror", "Act two · In the business", "The console", "FAQ", "Request a demo". The middle dot (·) separates an act number from its title. Eyebrows arrive with the quiet reveal (or with the surface, in the manifesto). **AVOID:** eyebrows as slogans; coloured eyebrows; eyebrows in Switzer.

### Chapter intro

**ESTABLISHED SYSTEM RULE.** Eyebrow → chapter title (two authored lines, chapter tier) → lede (body tier, secondary colour, `42rem` max). Wide: title left, lede right, one baseline-aligned row. The title is a two-line statement of what the chapter shows: "What happens / on the floor." "What it returns / to the business."

### Feature annotation

**ESTABLISHED SYSTEM RULE.** The system's most reused component.

```
(01)                       ← Fragment Mono 14, notation colour, tabular, parentheses
The garment, rendered on   ← Switzer 18–22, 500, lh 1.25, ls −0.01em, balance
the customer in live 3D.
It tracks the customer's   ← Switzer 16–17, 400, lh 1.4, pretty, full ink
movement in real time…
────                       ← 32px (48px at 2560) then 8px gap
RETAIL IMPACT              ← Fragment Mono 14, uppercase, notation colour
Staff fetch a piece the    ← Switzer 16–17, 400, full ink
customer has already seen…
```

Internal rhythm 12 / 16 / 24 / 8; `max-width: 34ch`; wide layouts 280–320px wide, centred in the whitespace, text left-aligned. Inactive at 35% opacity on the sticky stage; full on narrow layouts. **AVOID:** icons in the block; a "learn more" link; grey body text; more than one paragraph of body.

### RETAIL IMPACT

**ESTABLISHED SYSTEM RULE.** A mono label and one Switzer sentence stating the consequence for the retailer, always attached to a feature, never standalone. Its grammar: *function → consequence* (see §12). It is the brand's proof device in the absence of case studies.

### Media stage / media plane

**ESTABLISHED SYSTEM RULE.** A sharp-cornered photograph plane, `--media-ground` behind it while loading, sticky at viewport centre on wide layouts, one state at a time, 300ms crossfade. Ratios: 4/5 (<640) → 4/3 (<900) → 16/10 (≥900) → `60.5vw × 71svh` (wide). No border, no shadow, no caption on the image.

### Sticky feature system

**ESTABLISHED SYSTEM RULE.** Rail + plane, activation at the 72% band, mirrored between acts. See §05 and §10. Exists only ≥1100×600; otherwise each feature is a complete in-flow scene.

### Mirror product + specification rail

**ESTABLISHED SYSTEM RULE.** See §08. Rail: `border-top` hairline, `li` = index (14 mono tabular) + 8px + fact (16–17 Switzer, secondary, `34ch`), `24px` padding-block; 1 → 2 → 4 columns.

### Console object

**ESTABLISHED SYSTEM RULE.** `.surface`: white, `1px solid var(--line)`, padding `clamp(24px, 2.2vw, 48px)`. Bar (mono, uppercase, space-between, hairline below) → metrics (1 → 2 columns, hairline between; label mono / value large tabular / delta small) → store list (name + pill, hairlines) → note beneath the object (mono, uppercase). Pills: 4×10px, pill radius, 14px, 6px status dot; Live / Syncing / Offline in the three status hues; the Syncing dot blinks 1.4s.

### FAQ

**ESTABLISHED SYSTEM RULE.** Sticky head (eyebrow "FAQ" + "Before you commit."), numbered hairline list, all answers open. Question at body size and heading weight; answer small, secondary, `42rem`. Index `01…06` mono, `3ch` column. No accordion, no chevrons, no search.

### Dock (navigation) — LOCKED

**ESTABLISHED SYSTEM RULE.** The only navigation: a fixed bottom-centre pill, `rgba(15,15,15,0.88)` with 20px backdrop blur and `--shadow-float`, 4px padding, link height 48–52px, type 15–16px Switzer 500 white, link padding 10–20px. Cells: the brand mark (17×33px, masked SVG, white; tilts −24° on hover; reloads to top), a divider, then Experience / Business / Contact with a flip-label hover and a scrollspy active state. It stays dark on every surface. Inset `max(1vw, 16px) + safe-area`. **Do not restyle, invert, add items or move it.**

### Buttons

**ESTABLISHED SYSTEM RULE.** `.btn`: pill, ink background, white text (white background, ink text on dark surfaces), Switzer small tier at 500, padding `1.15em 1.6em`, gap `0.7em`, optional trailing icon at `1.1em` — which resolves to ≈24px on `.btn--lg`: **Phosphor Regular `arrow-up-right`** (§09); hover darkens to 86% ink and the arrow moves `2px, −2px`; active scales to 0.97; disabled 40% opacity. `.btn--lg`: body tier, padding `1.3em 2em`. The primary button is magnetic on fine pointers. There is one button on the whole site ("Write to us"). **AVOID:** outline buttons, ghost buttons, gradient buttons, more than one button per composition, button labels longer than three words.

### Links

**ESTABLISHED SYSTEM RULE.** `.link`: inline, 2px padding-bottom, an underline drawn by `::after`. Used for the email address and the colophon. Nothing else is a text link on the site.

### Rules (hairlines)

**ESTABLISHED SYSTEM RULE.** `1px solid var(--line)`. Structural only (§02.11).

### Film toggle

**ESTABLISHED SYSTEM RULE.** A 44×44 blurred ink pill in the dock's own chrome — `rgba(15,15,15,0.88)`, 20px backdrop blur — with a 16px white play/pause glyph, shown on hover/focus and always on no-hover devices. It does not get a colour of its own: the site has one blurred control chrome and this control wears it.

It is the one control ever placed over media, so its contrast is a property of the footage. **Measure it on the film it will sit over:** the glyph against the pill must clear 3:1 — that is what carries the control — and the pill against the frame should clear 3:1 wherever the film allows. On a dark film the pill can merge into the frame at the darkest moments and the glyph carries it alone, exactly as the dock does over the same footage; if the glyph itself becomes hard to find, change the film's treatment or the control's position rather than this colour.

### Copy control

**ESTABLISHED SYSTEM RULE.** 40×40 pill with an inset hairline, copy icon → check icon on success, `aria-live` status text. Removed entirely if the clipboard API is unavailable.

### Closing CTA

**ESTABLISHED SYSTEM RULE.** Dark surface, full viewport height, centred: eyebrow "Request a demo" → display title "See it in / your store." → large button "Write to us" ↗ → the address printed as a link with the copy control → one-line note at `30rem`. The only centred composition and the only display-tier type on the site.

### Preloader and cursor

**ESTABLISHED SYSTEM RULE.** Curtain: black, the mark, the tagline "Beyond the Mirror" fitted to the viewport width and placed by its ink 8–12px from the bottom edge. Cursor: a 12px dot in `mix-blend-mode: difference`, fine pointers only, grows on links.

### Things the site deliberately does not have

**ESTABLISHED SYSTEM RULE.** No header bar, no hamburger, no logo top-left (the mark lives in the dock), no cards, no testimonials, no logo wall, no accordion, no carousel, no modal, no cookie banner, no chat widget, no social icons, no forms (the ask is a mail link). Absence is a decision.

---

## 12 · Verbal brand

### A · Headline pattern: observation → product consequence

**ESTABLISHED SYSTEM RULE.** Headlines state what happens, with the product as the cause, in a flat declarative or a noun phrase with a qualifying clause:

- "The garment, rendered on the customer in live 3D."
- "Every size and colourway, on screen."
- "The whole look, before anything is fetched."
- "Made-to-order, before the first cut."
- "The campaign, with the customer in it."
- "Their picks, already at the till."
- "See what customers actually tried on."
- "Run every mirror from one console."
- "An interactive mirror that starts by itself."
- "You find out before the store does."

The pattern is **[the thing the retailer already knows], [what changes about it]** — often a noun, a comma, a timing or place clause ("before the first cut", "already at the till", "on screen"). Chapter titles are questions answered: "What happens on the floor." "What it returns to the business." The ask is an instruction in the reader's own place: "See it in your store."

**AVOID:** verbs of aspiration (transform, reimagine, unlock, elevate, empower); adjectives as headlines (Seamless. Effortless. Intelligent.); questions as headlines (the FAQ excepted); exclamation marks; "the future of retail".

### B · Body copy explains what happens

**ESTABLISHED SYSTEM RULE.** Body sentences describe a mechanism in the order it occurs, in the present tense, with the customer or the retailer as subject:

- "It tracks the customer's movement in real time, so the garment responds as they move."
- "Customers can explore the full catalogue, with each option checked against live stock before it is shown."
- "One scan sends the customer's selected garments, colourways and sizes to their phone and the counter."
- "If a mirror goes offline, the console alerts you with the time it stopped and its last successful sync, before anyone on the floor notices the screen is dark."

One or two sentences. Concrete nouns. "So" and "before" are the connectives. No benefit sentence follows; the RETAIL IMPACT line does that job.

### C · RETAIL IMPACT: function → consequence

**ESTABLISHED SYSTEM RULE.** One sentence, present tense, a contrast built in ("rather than", "no longer", "not only", "becomes … not …"):

- "Staff fetch a piece the customer has already seen on themselves, rather than asking them to imagine it."
- "The buying decision is no longer limited to what physically fits on the rail."
- "More pieces enter consideration without staff having to suggest them one by one."
- "Orders are taken against something the customer has already seen, so cloth is cut to demand rather than forecast."
- "The campaign becomes an in-store experience rather than something the customer only sees around them."
- "The customer reaches the till without having to repeat what they want."
- "Demand becomes visible before purchase, not only after it."
- "The second store becomes a rollout date, not a second project."

The consequence is operational (what staff, stock, orders, the till, the next buying decision do differently) — never emotional and never numeric.

### D · Retail vocabulary

**ESTABLISHED SYSTEM RULE.** Use the trade's words: **till, counter, catalogue, colourway, size, garment, piece, look, outfit, cloth, made-to-order, first cut, rail, floor, shop floor, store, estate, stock, live stock, product feed, buying decision, rollout, session, try-on, scan, customer, retailer, staff, colleague.** British spelling throughout (colourway, catalogue, enrolment, programme). "Customer" not "user" or "shopper"; "retailer" not "client" or "brand partner"; "staff"/"colleague" not "associate"; "the Mirror" not "the device".

### E · Banned phrases

**DERIVED PRINCIPLE (none of these appears on the site; all are typical of the category).** Do not use: *AI-powered, powered by AI, next-generation, cutting-edge, revolutionary, seamless, frictionless, immersive experience, phygital, omnichannel, engagement, delight, elevate, unlock, empower, transform, reimagine, the future of retail, smart mirror, magic mirror, virtual try-on solution, platform, ecosystem, end-to-end, turnkey, leverage, drive sales, boost conversion, ROI* (unless quoting a written agreement), *game-changing, state-of-the-art, innovative, personalised journey, customer engagement, data-driven insights, actionable, real-time analytics dashboard, 360°, hyper-, -as-a-service*. Do not invent numbers: no "+X% conversion", no "Y stores trust Vagora", no "Z sessions per day" outside the labelled sample.

### F · Rhythm

**DERIVED PRINCIPLE.** Short heading (4–9 words, two lines). One lede (one sentence, up to ~25 words). Body of one or two sentences. Long sentences are allowed when they list in sequence ("Sessions, try-ons per session, scans to phone and scans to counter, by store and by garment, in the console from the first day."). Full stops on headings. No semicolons in headings. Numbers as numerals inside notation ("49-inch", "41 / 42"), words in prose ("Five things", "One store first", "six markets").

### G · Microcopy — editorial vs notation voice

**ESTABLISHED SYSTEM RULE.** Two registers:

- **Editorial (Switzer):** full sentences, sentence case, addressed to a person. "Write to us." "Skip to content." "Pause the film." "One line about your estate and your catalogue system is enough to get a useful reply."
- **Notation (Fragment Mono):** fragments, uppercase or indexed, addressed to nobody. "ESTATE OVERVIEW" "ILLUSTRATIVE" "SAMPLE DATA, NOT A LIVE ESTATE." "RETAIL IMPACT" "(01)" "ACT ONE · ON THE FLOOR".

Never mix: a mono label is not a sentence; a Switzer sentence is not shouted.

### H · Honesty as voice

**ESTABLISHED SYSTEM RULE.** Vagora says what it does not have: "We have no benchmark to compare you against yet, and will not invent one." "Sample data, not a live estate." "Ask and we will put a number in writing." Where evidence is missing, say so rather than paper over it.

---

## 13 · Content creation system

**DERIVED PRINCIPLE.** Every Vagora piece has the same skeleton: **notation label → statement → explanation → consequence → (optional) object.** The site's feature block is the atom; everything larger is that atom repeated or scaled.

### Website section

Eyebrow (what part this is) → two-line title (observation) → lede (one sentence, secondary) → one dominant object (photograph, product or console) → one annotation block or one rail. One event of motion at most. Copy volume: title ≤9 words, lede ≤25, body ≤40, impact ≤25.

### Product feature

The annotation block exactly: (index) → title (observation → consequence) → body (what happens, mechanism) → RETAIL IMPACT (function → consequence). Pair with one photograph showing that feature on the Mirror (§07). Never add an icon.

### Social post

One photograph or the product, full-bleed, no scrim or translucent overlay; type on the picture only under §04's conditions, otherwise in a solid field or on a solid plate (§15.2, modes A–C). Caption in the editorial voice: one observation line, one explanation sentence, optionally one RETAIL IMPACT-style consequence. Notation only as a tiny index/label in the image's margin, if any. No hashtag walls; no emoji. See §15.

### Case study (when one exists)

**NOT YET DEFINED in production** (none exists). **NEW RECOMMENDATION:** eyebrow "Case · [Retailer], [City]" → title as an observation about what changed on the floor → lede stating the term and the measure agreed in writing → photograph in the actual store → numbered facts in the specification-rail form (what was measured, how, over what term) → RETAIL IMPACT lines. Numbers appear only if the retailer agreed in writing; otherwise the case is described without them.

### Slide deck

One idea per slide; one dominant object per slide; eyebrow top-left in mono; title at chapter/section tier; at most one paragraph. Black slides for the product and the ask; white for everything else. See §15.

### Product sheet

Product photograph in its black field on one side; specification rail (index + fact) on the other; the four privacy/stock/display facts first; no bullets of adjectives.

### Event material

The photograph or the product at the largest possible size; a two-line observation; the mark. Nothing else. The Mirror on the stand *is* the demo; print should not compete with it.

---

## 14 · Content do / don't

| Don't | Do |
|---|---|
| "AI-powered virtual try-on that transforms the customer journey." | "The garment, rendered on the customer in live 3D." |
| "Seamless omnichannel engagement from floor to checkout." | "Their picks, already at the till." |
| "Boost conversion by up to 30%." | "Demand becomes visible before purchase, not only after it." |
| "Our smart mirror uses advanced sensors to detect shoppers." | "An interactive mirror that starts by itself." |
| "Unlock powerful real-time analytics." | "See what customers actually tried on." |
| "Trusted by leading retailers." | (nothing — or the FAQ's honesty: "We have no benchmark to compare you against yet, and will not invent one.") |
| "Elevate your store experience today!" | "See it in your store." |
| "Users can interact with the device via gesture control." | "Nothing to tap, nothing to learn." |
| "Scalable fleet management platform." | "Run every mirror from one console." |
| "Contact our sales team for pricing." | "We quote per estate. … Ask and we will put a number in writing." |

**Transformation rule:** find the retail noun the sentence is about (garment, till, catalogue, stock, store), say what the Mirror does to it in the present tense, cut every adjective, then check whether the consequence belongs in a RETAIL IMPACT line instead of the sentence.

---

## 15 · Applications — translating Vagora

**NEW RECOMMENDATION** throughout this section, with the invariants labelled where they come from the site. The website is the only format Vagora has produced. Everything below describes how the system already defined in §01–§14 **translates** when the medium changes — it is not a catalogue of templates, and none of the examples is mandatory. A future designer or an AI should be able to make a Vagora artefact that resembles none of them and still be unmistakably Vagora, because it obeys the invariants.

### What never changes

**DERIVED PRINCIPLE (from the whole site).** These hold in every medium, at every size, on every surface. If a piece breaks one, it is not a translation; it is a different brand.

1. **One dominant object.** A photograph, the product, a statement, the wordmark, or one object of data. Never two competing.
2. **Strong scale contrast.** Something very large against something small and exact. The middle register is where Vagora dies.
3. **Deliberate whitespace.** Air is constructed, not left over. Space is what makes the large thing large.
4. **Switzer is the editorial voice; Fragment Mono is written notation; Phosphor is drawn notation.** The three never swap roles. Mono never headlines; Switzer never labels; icons never illustrate.
5. **Black, white and their alphas.** Colour arrives only through garments in photographs and, inside a console, through status.
6. **Realistic Vagora imagery, and an accurate Mirror.** §07 and §08 apply unchanged: the Kinect at viewer-right mid-height, the sloped cabinet, the casters, and a screen that shows the customer in a garment they are not wearing.
7. **Restrained, concrete copy.** Observation → consequence. No adjectives doing the work, no invented numbers.
8. **Purposeful motion.** One event, then quiet. Nothing decorates.

**When uncertain, reduce rather than decorate.** This rule outranks every example below.

### How each family is described

For each medium: what remains constant, what the medium forces to change, then the dominant-object strategy, hierarchy, Switzer, Fragment Mono, Phosphor, imagery, whitespace, colour, copy amount, the mark, motion, and the mistakes that family invites. Where a line simply says "as the site", the website's rule applies without adaptation.

---

### 15.1 · Web

**What remains constant.** Editorial asymmetry; one dominant object per section; the two surfaces, white and black, with the takeover as the signature way of moving between them; image-led chapters; the eyebrow → heading → lede opening; the annotation block; the motion hierarchy of one event and the quiet reveal; the dock.

**What changes.** Nothing about the language. What changes is the *composition each new section needs*, and the site's own sections are precedents, not moulds. **Do not assume every future section must reproduce the sticky stage.** The sticky feature system is one answer to one problem — five features that share one image plane. A section with a different problem gets a different answer built from the same parts.

**Dominant-object strategy.** Decide the section's one object first: a photograph, the product, a proposition, an object of data. Then decide which edge it runs to. A photograph runs to a viewport edge; a proposition sits top-left in its own white; the product sits in black.

**Typography hierarchy.** Chapter tier for a chapter opening, section tier for a section, feature tier for annotations; body and small for everything else. A new section may not invent a tier.

**Switzer.** Titles, ledes, annotation titles and bodies, controls. **Fragment Mono.** The eyebrow that names the section, indexes, RETAIL IMPACT, any specification. **Phosphor.** Only on controls — Regular in a button, Light beside notation. A web section that needs an icon to explain itself has a copy problem.

**Imagery.** §07. A photograph is the dominant object or it is absent; there are no supporting thumbnails, no image strips, no galleries.

**Whitespace.** The section rhythms and the annotation block's internal rhythm, as the site. A new section earns its own whitespace by having fewer things in it, not by more padding.

**Colour.** White by default. Black for a product moment or an ask, and as a whole surface — on the site it arrives by takeover; a page may also simply change surface at a section boundary — never a black panel inside a white section.

**Copy amount.** Title ≤9 words · lede ≤25 · annotation body ≤40 · RETAIL IMPACT ≤25. A section that needs more copy needs to be two sections.

**Mark.** Lives in the dock — the brandmark, compact interface identity (§01). The wordmark-on-dark closes the footer as the page's one display moment. Never repeated in a section, and never two versions in one composition.

**Motion.** One event per section at most, chosen from the vocabulary in §10; the quiet reveal for everything else. A new section may choose *when*, never *how*.

**Three web translations**

- **A new section** (say, a single-feature chapter for made-to-order). Not five states and a sticky plane — one photograph to the right edge at ≥60% width, eyebrow + two-line section title + lede left, one annotation block beneath the title with RETAIL IMPACT, one directional media reveal as its event. Same parts as the acts, different arrangement, because the content is different.
- **A landing page** (a campaign or a vertical). Hero: one photograph or film with nothing written on it. Then a lead-tier proposition at the top-left of a white surface. Then three to five features — as a sticky stage if they share a plane, as in-flow scenes if they do not. Then the product chapter, three answers, the ask. The page inherits the dock and the two surfaces; the preloader belongs to the home page only. No form unless one is genuinely required; if it is, hairline fields, Switzer, one button, nothing else.
- **A product page or a case-study page.** Object-led. The product page opens on the black product chapter and moves to white for the specification rail as a table and the console; a case-study page opens on the in-store photograph, then numbered facts in the rail form, then RETAIL IMPACT lines, and carries numbers only with the retailer's written agreement (§13). Both close on the ask.

**Common mistakes.** Copying the sticky stage into a section that has one image. A hero with a headline forced onto the film or photograph where there is no negative space for it (§04). A black card inside a white section. Feature icons. A second navigation. Two events in one section. A carousel.

---

### 15.2 · Social and digital marketing

**What remains constant.** One dominant object per frame; Switzer for the statement and Mono for the index; the two surfaces; §07 imagery and the accurate Mirror; observation → consequence copy; the mark small.

**What changes.** The frame is small, square-ish and seen for a second, in a feed of noise. So the scale contrast gets *more* extreme, not less; the copy gets shorter; whitespace on a text frame goes up to a third or more; and the eyebrow's job — naming where you are — is taken by a single mono index, because a post has no page to be part of.

**Dominant-object strategy.** A photograph or the product first, always. A type frame is a *second* frame or a deliberate type-led post; it is never a substitute for showing the Mirror doing the thing.

**Typography hierarchy.** Two tiers per frame at most: a statement (chapter or section tier, scaled to the frame) and a mono index. No lede on-image; the lede is the caption.

**Switzer.** The statement, 4–9 words, two lines, authored break, left-aligned. **Fragment Mono.** One index or label per frame — "(04) · MADE-TO-ORDER", "ACT ONE" — in a margin, small, notation colour. **Phosphor.** Only `arrow-right`, Regular, on a carousel frame that needs a "next", and nowhere else.

**Imagery.** 4:5 for feed, 9:16 for stories, uncropped from the master's central 55%. The screen shows the customer in a different garment; the Kinect is where it lives.

**Whitespace.** On a text frame ≥30% empty; type never nearer the edge than ≈6% of the short side. On an image frame the whitespace is the photograph's own negative space.

**Colour.** White frames for features, black for the product and the ask. Colour only from the garments.

**Copy amount.** On-image ≤9 words. In the caption ≤3 sentences in the editorial voice, optionally one RETAIL IMPACT line. No hashtag walls, no emoji.

**Mark.** The **vertical lockup**, in a margin, once per post or once per carousel, in the version that matches the surface — social is ordinary marketing, so the primary logo applies (§01). Give it room to be read: roughly 12–14% of the frame's width. The brandmark is for the profile avatar and for frames too small for a lockup, not for the post itself; the wordmark only when a frame is deliberately a display moment, never on an image frame.

**Motion.** See *Motion and video cover* below.

**Five social translations**

The five modes below are the whole social vocabulary; the visual manual shows one specimen of each (A–E).

- **A · Image-led, type in negative space.** One photograph is the frame and the type sits directly on it, with no plate, only where §04's four conditions hold — a white wall, an empty floor, dependable contrast, nothing covered, aligned to the picture. Statement and index, nothing more.
- **B · Image + solid field.** The photograph and a solid white or black field — a margin below or beside it — carrying the statement and the index. The default whenever the picture has no room.
- **C · Image + editorial annotation plate.** A large photograph and one small, precise explanation — the annotation block's grammar — on a compact solid white or black plate: zero radius, no blur, no translucency, no gradient, no shadow, attached to an edge or an axis like a caption, sized to its content. Index in Mono, title at feature tier, one line of body. It reads as an editor's note on a photograph, not as UI.
- **D · Type-led post.** Pure white or pure black. One Switzer statement, large, top-left, two lines. One line of Mono beneath or in the lower margin. The mark. Nothing else. This is the manifesto's grammar at feed scale.
- **E · Carousel.** A sequence with a rhythm, not four copies of one layout. Cover: the photograph or the product, index "01 / 05", statement optional. Internal frames alternate between two systems — an image frame with a compact annotation, and a type frame on white or black with one statement and one mono line — so the reader feels a beat without seeing a template. Closing frame: black, the ask ("See it in your store.") at display tier, the address, the mark. One mono index runs through all frames. Phosphor `arrow-right` only if the platform hides its own.
- **Motion and video cover.** The first frame is a still that obeys everything above; motion begins after it. Vagora's motion translates to short-form as the same three moves and nothing more: the masked line rise for a statement, the 300ms crossfade between photographs, the exposure for the product. Cuts, not wipes. No kinetic type, no zooms on stills, no transitions the site does not have. **Do not add motion because the medium allows it.** A six-second post that is one photograph and one line rising is Vagora; the same post with the line bouncing in is not.

**Common mistakes.** A text card as the first frame. Glassmorphism, translucent or blurred panels over the picture. Scrims or gradients darkening part of a photo so text can sit on it. Rounded floating cards. A different layout on every carousel frame. Feature icons. A headline that sells instead of observes. Motion on every element.

---

### 15.3 · Presentations and slide decks

**What remains constant.** One dominant object per slide; scale contrast; whitespace; Mono for the eyebrow, the slide number and any metadata; the two surfaces; the annotation block as the unit of explanation; §07 imagery; concrete copy.

**What changes.** 16:9, seen from across a room, one slide at a time, with a person talking. So: **one idea per slide**, the headline carries the argument and the rest proves it; type is larger than on the web and there is less of it; and the document has a beat — title, divider, image, argument, evidence, close — that the website does not need because a page scrolls and a deck does not.

**Dominant-object strategy.** Every slide has one: the headline itself (an argument slide), a photograph (an image-led slide), the product, one table or one number (a technical slide), the logo (title and close). If a slide has two, split it.

**Typography hierarchy.** Title slides at display tier; section dividers at chapter tier; slide headlines at section tier; body at body tier and rarely below; Mono at label tier — larger than on the web if the room demands it, but still one size per deck.

**Switzer.** The headline is the argument, stated as observation → consequence: "Demand becomes visible before purchase, not only after it." Body is one short paragraph or one annotation block. **Fragment Mono.** Eyebrow top-left ("02 · IN THE BUSINESS"), slide number bottom-right, table headers, source and period lines, the sample-data disclosure. **Phosphor.** Almost never. A `caret-right` for a build within a slide if one is truly needed; no icons for concepts, no icon bullets.

**Imagery.** One photograph at ≥55% of the slide, to an edge, never boxed with a shadow. The product on a black slide. The console as its bordered object.

**Whitespace.** More than feels comfortable. A slide that is one headline and 60% empty is correct.

**Colour.** White for argument, image and evidence slides; black for the title, the product and the close, and for at most one section divider per deck. Status colour only inside a console object.

**Copy amount.** Headline ≤10 words. Body ≤40 words. A table ≤6 rows. If it needs more, it is a handout, not a slide.

**Mark.** The **vertical lockup** on the title slide, and on the closing slide beneath the ask. A deck may spend **one** wordmark moment — a title or a close, not both — where the name is meant to be the dominant object at ≥60% of the width. Nowhere else: not on the dividers, not in the corner of every slide.

**Motion.** The heading rise on a slide's entry, a cut between slides. No slide transitions, no builds that fly, no per-bullet reveals.

**Six deck translations**

- **Title slide.** Black. The vertical lockup in the lower half, or — as the deck's one display moment — the wordmark large in its place. Or one photograph full-bleed with the lockup small. Mono top-left: the occasion, the audience, the date. Nothing else.
- **Section divider.** Black or white. Chapter-tier statement top-left, two lines; Mono eyebrow with the section number. No logo — the dividers are inside a deck that has already identified itself. Seventy per cent empty.
- **Image-led slide.** One photograph to the right edge at 55–60%, eyebrow and a section-tier headline left, one annotation block beneath it if explanation is needed. The photograph obeys §07: two different outfits, Kinect viewer-right.
- **Argument / content slide.** White. Eyebrow; a section-tier headline that *is* the point; one paragraph or one annotation block with RETAIL IMPACT beneath; hairline above a footer row with the slide number. The headline does the work; if the audience read only headlines, the deck should still make sense.
- **Technical / data slide.** White. The evidence for the headline above it: one hairline table with Mono headers and tabular Switzer figures, or one console object, or one large number with its measure and period. Sample data says so — "SAMPLE DATA, NOT A LIVE ESTATE." — in Mono under the object. One object of evidence, not a dashboard.
- **Closing slide.** Black. The ask at display tier, centred (the deck's one centred slide, as on the site), the address, the vertical lockup beneath it — or the wordmark, if the deck has not already spent its one wordmark moment on the title. Then stop.

**Common mistakes.** Generic template chrome — a logo in every corner, a footer bar, a title strip. Card grids. Three columns of icon + heading + text. Decorative icons. Charts for their own sake. Tiny dense text. Pasting website sections onto slides. A gradient or an accent colour. Transitions.

---

### 15.4 · Sales and print collateral

**What remains constant.** One dominant object per page or spread; the eyebrow → title → lede opening; the annotation block; the specification rail; Mono for indexes, page numbers and facts; the two surfaces; §07 imagery and §08 accuracy; honest copy — the sample-data disclosure prints too.

**What changes.** Print is read, not scrolled: the reader holds it, at a fixed distance, for longer. So it can carry **denser information than social and a clearer hierarchy than a slide** — technical facts, a full specification, several RETAIL IMPACT lines on one page. Margins are physical and must be respected. Black prints as ink, not light, so the black product page needs a rich black and a paper that will hold it. **Print can hold more; that is not a reason to fill it.** The whitespace rules do not relax.

**Dominant-object strategy.** One per page, one per spread. A spread is a single composition across the gutter: a full-bleed photograph or the product on one page, the reading on the other.

**Typography hierarchy.** Chapter tier for page openers, section tier for spread headlines, feature/body/small for the reading, label tier for Mono. Sizes step down slightly from the web because the reading distance is shorter; the ratios do not.

**Switzer.** Titles, ledes, annotation copy, any running text. **Fragment Mono.** Indexes, page numbers, folios, specification numbers, table headers, sources, the disclosure. **Phosphor.** Restrained to the point of absence. A `arrow-up-right` beside a URL, Light beside Mono. No icons in the body, none as bullets.

**Imagery.** Full-bleed where it is the object; otherwise absent. Printed at true resolution. The product on its black page with its edge treatment (§08), never cut out onto white.

**Whitespace.** Margins ≥8% of the page width on every side, more at the gutter. Inside-block rhythm as the site. Between blocks, the section rhythms scaled to the page.

**Colour.** White pages; one black page for the product; black ink; status hues only inside a printed console object.

**Copy amount.** More than social, less than it could be. A product sheet: title, lede, four to six specification facts, three RETAIL IMPACT lines, one contact. A brochure spread: one title, one lede, one to three annotation blocks. A case-study sheet: §13's structure, one page.

**Mark.** The **vertical lockup** on a cover, in the version matching the surface. The brandmark in a running folio, where the space is a few millimetres. Once per piece on the front, once on the back with the address. The wordmark only for a cover deliberately built as a display composition.

**Motion.** None. Print is the format where the still first frame *is* the piece.

**Four print translations**

- **Product sheet** (A4 / Letter, one side). The product in a black field across the top two thirds; beneath, on white, the specification rail as a hairline table (four to six facts, index above fact), the eyebrow "THE VAGORA MIRROR", the section-tier title, one lede. The contact line and the mark in the footer. The Mirror shown whole and accurate.
- **One-page leave-behind.** The spine in one page: eyebrow, chapter-tier statement ("What happens on the floor."), one photograph at ≥50% of the page, three annotation blocks with RETAIL IMPACT, the ask as one line with the address. A busy retailer should get the argument in the time it takes to walk to a desk.
- **Brochure spread.** Left page: one photograph full-bleed to three edges (or the product in black). Right page: the reading — eyebrow, two-line section title, lede, one or two annotation blocks, folio in Mono. The gutter is respected: nothing important within 10% of it.
- **Case-study sheet.** §13: eyebrow "CASE · RETAILER, CITY", an observation title, the term and the written measure in the lede, the in-store photograph, numbered facts in the rail form, RETAIL IMPACT lines. No numbers without the retailer's written agreement; if there are none, the sheet is still complete.

**Common mistakes.** Filling the page because it can be filled. A grid of feature icons. Screenshots of the website. The product cut out onto white. Body text under 9pt. Margins under 8%. A second colour for headings. Decorative rules.

---

### 15.5 · Out-of-home and large format

**What remains constant.** One dominant object; the two surfaces; Switzer for the statement, Mono for a single line of notation; accurate imagery; the mark.

**What changes.** Distance, and seconds. At large format Vagora **reduces** until it is **one image** or **one short statement**, plus the minimum of identity and notation. Everything that needs to be read up close leaves: body copy, annotations, technical facts, small type, icons. **Do not turn a website section into a billboard.** A section is a page's worth of reading; a billboard is a glance.

**Dominant-object strategy.** Either the photograph (the Mirror doing the thing, with the two outfits visibly different at distance) or the statement. Not both at equal size. If the image is the object, the statement is small or absent. If the statement is the object, there is no image.

**Typography hierarchy.** One tier: display. Optionally one line of label-tier Mono, sized so it survives the viewing distance or omitted.

**Switzer.** One statement, ≤7 words, two lines, left-aligned, off-centre. **Fragment Mono.** One line at most: a location, a date, the URL. **Phosphor.** None.

**Imagery.** Full-bleed, uncropped from the central 55%, the Mirror large enough that the render on its screen reads from the street. The Kinect at viewer-right; the customer approximately 1.5–2 metres from the glass.

**Whitespace.** Most of the surface. A statement on black with 70% empty is right.

**Colour.** Black or white field, or the photograph. Nothing else.

**Copy amount.** ≤7 words on-surface. The URL or address in Mono if there is room for it to be read.

**Mark.** The **vertical lockup**, once, sized to be found rather than to lead. The wordmark replaces it only where the name itself is the oversized object of the composition — a wordmark billboard or a booth wall. The brandmark alone is a complete piece of signage where the surface is small or the name is already present.

**Motion (screens).** The exposure and one line rising, once, then still for the rest of the loop. Never a loop that competes with a real Mirror standing beside the screen.

**Four large-format translations**

- **Billboard.** The statement version: black field, "An interactive mirror that starts by itself." at display tier, the mark. The image version: one photograph full-bleed, the mark small, no words or one line in the negative space.
- **Event screen** (portrait, beside a Mirror). Black. The product photograph at full height, or a live feed; one chapter-tier line; a mono eyebrow. Motion once, then still.
- **Booth wall / backdrop.** The wordmark at the largest size the wall allows, alone — one of the wordmark's proper display moments — or one photograph across the whole wall with the vertical lockup small. If a line is required, one, chapter tier, off-centre. Hairlines may mark the wall's edges. The Mirror standing in front of it is the exhibit; the wall does not compete.
- **Signage.** The vertical lockup, alone; the brandmark where the plate is small. A direction if needed, in Switzer with a Phosphor `arrow-right` Regular — the one place an icon earns its way onto large format.

**Common mistakes.** Body copy. Annotations. Feature lists. Icons. A photograph and a statement fighting at equal size. Small Mono that cannot be read from the intended distance. A website section scaled up.

---

### 15.6 · Campaign and advertising

**What remains constant.** One dominant concept; photography or the product as the carrier; the two surfaces; Switzer observation → consequence; Mono for one line of notation; accurate imagery; the mark.

**What changes.** A campaign has a single idea repeated across formats, so the constant is the *concept* and the variable is the crop. And an ad is measured, so the temptation to add — a headline, an offer, a badge, a colour — is stronger here than anywhere. The system holds: the photograph makes the case, one line states the observation, the mark signs it.

**Dominant-object strategy.** The key visual is one photograph — the customer in front of the Mirror, wearing one outfit, the screen showing another — and every format is a crop of it. Where the concept is the product, the product in its black field is the key visual instead.

**Typography hierarchy.** One statement at chapter or display tier, one line of Mono. On small digital sizes, the statement alone.

**Switzer.** The observation line: "The garment, rendered on the customer in live 3D." or the ask, "See it in your store." **Fragment Mono.** A single line — a date, a city, the URL. **Phosphor.** None, or `arrow-up-right` Regular on a button-style call in a digital ad where a click exists.

**Imagery.** §07, and the two-outfit rule is the whole concept, so it must be unmissable in the key visual.

**Whitespace.** The photograph's own negative space carries the line; if the crop has none, the line goes into a solid white or black field beside or below the image.

**Colour.** From the garment in the photograph. No accent, no gradient, no tinted field.

**Copy amount.** ≤9 words on the visual; one line of Mono; nothing else. No offer, no urgency, no badge.

**Mark.** The **vertical lockup**, once, small, in a margin or in the solid field, in the version matching the surface.

**Motion.** A static ad is static. A motion ad is the key visual with one line rising, or a six-second cut of the film's grammar (§15.7).

**Four campaign translations**

- **Campaign key visual.** The photograph, landscape master, with the statement in its negative space and the mark in a corner. Every other format is cut from it.
- **Static digital ad** (a banner, a feed unit). The key visual cropped to the unit with the statement in a solid white field beneath, the mark, and — only where a click exists — one button-style call in the editorial voice. At the smallest sizes, the photograph alone and the mark.
- **Product announcement.** The product in its black field, whole and accurate; "An interactive mirror that starts by itself." or the specification's plainest fact as the line; the URL in Mono.
- **Retailer or event announcement.** The photograph or the product; the retailer or event as one Mono line (name, city, dates); one Switzer statement; the mark. The retailer's own mark, if it appears, sits in the Mono line's register — small, in the margin — never locked up with Vagora's.

**Common mistakes.** Advertising gradients. Glass cards. A bright accent "for the campaign". Two headlines. Copy that sells. Feature-icon layouts. A logo lock-up with the retailer. The product restyled to fit the ad.

---

### 15.7 · Video and motion graphics

**What remains constant.** The motion hierarchy — one event, then quiet — and the strong/quiet contrast; product accuracy in every frame, including the Kinect's position and the two outfits; non-touch interaction; restrained Mono notation; readable pacing; Switzer for captions; the two surfaces.

**What changes.** Time. A film can *show* the try-on happening — the customer stopping, the garment on the screen changing — which no still can. So the medium's job is to let that happen at a real pace, with the camera and the cut doing the work and the type staying out of the way. **The hero film's grammar is the reference:** locked-off, the Mirror at a third, the customer walking in and stopping at a hands-free distance, straight cuts on one axis.

**Dominant-object strategy.** The Mirror and the customer in one frame, held. Type, when it appears, is a title card on its own surface or a line in negative space — never over the action for long.

**Typography hierarchy.** Title cards at chapter or display tier on black or white. Captions at small tier, in Switzer, on a black band below the image, never across it. Mono for slates, timecodes and one line of notation.

**Switzer.** Title cards and captions. **Fragment Mono.** Slates, timecodes, a single notation line ("ACT ONE · ON THE FLOOR"). **Phosphor.** `play`/`pause` on a player; nothing inside the film.

**Imagery.** §07 in motion: daylight or the studio, neutral grade, the customer at a natural distance, the render visibly different from what they wear, the Kinect where it lives. Image-to-video work obeys the lock block in §19 — hardware and UI as locked reference, only human movement animated.

**Whitespace.** Time is whitespace here. Hold shots. Let a cut land before the next line.

**Colour.** As §07I. No colour grade for "mood".

**Copy amount.** A film should work silent and unlettered. Title cards ≤7 words; captions ≤12; at most one line on screen at a time.

**Mark.** The **vertical lockup** on the end card; the wordmark instead only when the end card is built as a display moment. The brandmark small on a title card. Never a persistent bug in the corner.

**Motion.** The vocabulary in §10 and nothing outside it: the masked line rise for type, the crossfade between stills, the exposure for the product, straight cuts between shots. Durations 180 / 320 / 700 ms for interface-scale moves and 0.85–1.15 s for arrivals; a title card holds for at least two seconds.

**Five film translations**

- **Campaign video.** 15–30 seconds. Establishing frame of the store; the customer walks in and stops; the screen shows the garment on them; a cut closer to the render; the statement rises on its own surface; end card. Five or six shots, all locked-off or slow.
- **Social video.** 6–15 seconds, 4:5 or 9:16. One shot, one line. The first frame is a complete still (§15.2). No sound required.
- **Event-screen loop.** 20–40 seconds. The product exposure, one line rising, the film's central shot, then a long still. Motion happens once per loop, and the loop never competes with a real Mirror beside it.
- **Product demonstration.** 45–90 seconds. The customer's real experience in order: step in front, the Mirror starts by itself, the render appears, colourways change on the screen with a restrained thumbnail selection visibly moving from one option to the next, the whole look, the scan at the end. Captions on a black band name each step in the site's own words. The customer never touches the screen. No voice-over is needed; if one exists, it says what happens.
- **Presentation motion.** The heading rise on a slide's entry and a cut to the next. If a film plays inside a deck, it plays on a black slide at full bleed with nothing around it.

**Common mistakes.** Rapid cuts. Kinetic typography. Glitch, shaders, light leaks, lens flares. Futuristic overlays and HUDs on the screen. A persistent logo bug. Music-video pacing. Text over the action. A customer reaching for the glass. The Kinect moving between shots because the model regenerated it.

---

### What this section does not define

**NOT YET DEFINED.** Each of these would need a rule the site does not give, and none has been invented here:

- Exact type sizes per medium. The ratios and tiers translate; the point sizes for a billboard, an A4 sheet or a 16:9 deck are decided per piece at the viewing distance, then recorded.
- Print production: rich-black build, paper stock, bleed and safe areas beyond "≥8% margins".
- A retailer co-branding rule beyond "in the Mono register, in the margin, never locked up".
- A caption style for subtitled speech in video (the site has no spoken word).
- Whether a booth wall may carry a photograph printed at less than true resolution. The rule here is no.

---

## 16 · Composition recipes

Each recipe names the dominant object, the small object, and the rule that decides their placement.

**Image-dominant.** Photograph to one viewport/page edge at ≥60% of the width; annotation block (index, title, body, impact) centred in the remaining whitespace, text left-aligned, ≤320px wide; chapter eyebrow above the whole. Mirror the side when the recipe repeats. *(Both acts.)*

**Type-dominant.** One proposition at lead tier, `24ch`, top-left anchored with the eyebrow a gutter's distance from the surface's edge; three hairline facts beneath at small tier in a 3-column row; nothing else on the surface. *(Manifesto.)*

**Product chapter.** Black surface. Product in a 4:5 field left of centre at ≈80% viewport height, environment masked into the black; eyebrow, two-line section heading (`21ch`) and one lede (`40ch`) right, beginning at the product's upper third; specification rail beneath both. *(The Mirror.)*

**Technical system.** White. Intro column left at a fixed measure (eyebrow, section heading, one paragraph at small tier); one hairline-bordered object right filling the rest; a mono disclosure note beneath the object. *(The console.)*

**Social / campaign.** One uncropped photograph. If a second frame is needed: white or black, a two-line feature title at chapter tier left-aligned in the upper third, a mono index in the lower margin. *(Derived.)*

**Presentation cover.** Black. The vertical lockup in the lower half — or, as the deck's one display moment, the wordmark at ≥60% of the slide width in its place; or a full-bleed photograph with the lockup small in a corner. A mono line top-left with the occasion. *(Derived from the footer and hero.)*

**Presentation content.** White. Mono eyebrow top-left; section-tier title left in the upper third at ≤10 words; one object occupying the right 55–60%; ≤40 words of body beneath the title; a hairline above the footer row with the slide number in mono. *(Derived from the console chapter.)*

**The ask.** Black, full height, centred: eyebrow, display title `10ch`, one button, the address. The only centred recipe. *(Closing CTA.)*

---

## 17 · Visual do / don't

| Don't | Do |
|---|---|
| Near-black page backgrounds (#111, #0F0F0F) | Pure `#000000` surfaces; `#0F0F0F` for ink only |
| Off-white or warm-white grounds | `#FFFFFF` |
| Cards with radius and shadow around content | Hairlines, whitespace and proximity |
| Rounded image corners | `--radius-media: 0` — square media, always |
| Text over the subject of a photograph, or on a scrim, blur or glass panel | Type in the picture's own negative space (§04 conditions), or beside/beneath it in a solid field, or on a solid zero-radius plate at an edge |
| Gradients, glows, blurs as decoration | Flat surfaces; blur only in the two locked controls, the dock and the film toggle |
| Feature icons in a grid | Numbered feature blocks with photographs |
| Bold (600+) headings | 500 on white, 450 on black |
| Fragment Mono for headings or buttons | Fragment Mono for eyebrows, indexes, labels, metadata only |
| Three text greys to build hierarchy | Full ink for the block; secondary for ledes/facts; notation for mono |
| Centred layouts by default | Left-aligned, asymmetric; centred only for the ask |
| Many medium-sized elements | One dominant object + one small precise object |
| Equal spacing everywhere | 8/12/16/24 inside a block; 48–160 between blocks and chapters |
| A header bar with a logo and menu | The dock, unchanged |
| Multiple Mirrors in a showroom row | One Mirror; the estate as data on the console |
| The Mirror cut out onto white | The Mirror in its black field |
| Status colours as accents | Status colours inside the console's pills only |
| Photographic lime-green lifted into UI | Monochrome UI; colour from garments in photographs only |
| Motion on every element | One event per chapter; the quiet reveal for the rest |
| Expanding masks, blobs, wipes, shaders between chapters | The takeover plane (held world, next world rises over it) or a quiet document-flow handoff |

---

## 18 · AI operating instructions

Read this before producing anything for Vagora. Work through the steps in order; do not skip to output.

1. **Identify the format** (website section, post, deck, sheet, screen, video) and read its family in §15.
2. **Locate the piece on the spine** (§01 Positioning): floor, Mirror, business, console, commitment, ask. If it does not belong on the spine, question whether it should exist.
3. **Check every claim against §01's capability list.** Remove anything not evidenced. Never add numbers, customers, partners or benchmarks.
4. **Choose the one dominant object** (§02.2). Photograph, product, console, proposition or wordmark. Write it down before laying anything out.
5. **Choose the surface**: white by default; black for the product, the ask, covers and event screens.
6. **Choose the small object** that answers the dominant one (§02.3): one annotation block, one rail, one intro, one colophon.
7. **Assign voices**: what the system names (Fragment Mono, 14px, one colour) and what Vagora says (Switzer, one weight per block).
8. **Write the headline** as observation → consequence (§12A). Two lines, authored break, full stop.
9. **Write the body** as what happens, in order, present tense (§12B). Then one RETAIL IMPACT line if the format allows (§12C).
10. **Run the banned-phrase list** (§12E) over every sentence. Replace with retail nouns (§12D).
11. **Select or generate imagery** with §07: subject, environment, person, then the four fixed clauses verbatim from §19 — product, screen, interaction, negatives — plus composition for the crop, camera, light, grade and realism. The screen clause is not optional: the customer's real outfit and the outfit on the screen must be visibly different.
12. **Run the Product Accuracy Checklist** (§08) on every image of the Mirror — structure, sensor, screen, interaction. Check the two outfits first.
13. **Lay out** with the recipe in §16 that matches the format; keep one left axis; centre the small object in the whitespace, not on the page.
14. **Set type** from the scale in §04; set spacing from the vocabulary in §05; set hairlines only where a boundary is real.
15. **Add icons only** where a control needs one (§09); label every icon.
16. **Add motion only** as one event plus the quiet grammar (§10); provide the reduced-motion and no-motion states.
17. **Reduce.** Remove one element. If the piece still works, remove another. Then run the quality checklist (§21).

**WHEN UNCERTAIN, REDUCE.** If two options seem equally right, choose the one with fewer elements, fewer words, fewer colours and less motion. Vagora has never been wrong by being too quiet.

---

## 19 · AI image and video generation blocks

**This section is canonical for AI generation.** The product, screen, interaction and negative language lives here once; §07K, §08, §18 and §21 point to it rather than restating it. If the hardware description or the try-on rule ever changes, change it here and the rest of the document follows.

Two reusable blocks. Copy the image block into an image model's system or prompt field and append one variation; append the video block on top of it for image-to-video work. The four paragraphs headed THE PRODUCT, THE SCREEN, INTERACTION and NEVER are the **[product clause]**, **[screen clause]**, **[interaction clause]** and **[negative clause]** that the example prompts in §07K refer to — lift them verbatim.

### The image block

```
You are generating photography for Vagora, an interactive mirror for physical fashion retail.
Style: editorial retail photography, photographic realism, daylight, neutral bright grade,
generous empty space, one person, unposed, no text, no overlays, no logos, no watermark.

THE PRODUCT — describe it exactly like this, every time:
a freestanding Vagora Mirror: a 49-inch portrait display in a matte-black rectangular frame
with square architectural corners and real depth, rising from a substantial black lower
cabinet whose upper face is a pronounced sloped wedge running down toward the front, with
recessed handle slots on the cabinet front and four small caster wheels underneath so the
unit reads as freestanding and movable; a black Microsoft Kinect v2 — a long low horizontal
sensor bar with a visible lens cluster — mounted on a short black bracket projecting
horizontally outward from the VIEWER-RIGHT edge of the frame at approximately mid-display
height, never on top of the unit and never on the left; no logo on the front, no exposed
cables, no buttons or touch controls on the frame.

THE SCREEN — this is the whole point of the picture:
Vagora performs live 3D virtual try-on, so the screen is NOT a mirror reflection. The
customer standing in front of the Mirror is wearing one real outfit, and the screen shows
that same customer full-length wearing a VISIBLY DIFFERENT outfit they are not physically
wearing. The physical outfit and the virtual outfit must never match: make the difference
obvious at a glance — a different garment type and/or a clearly different colour. Near one
edge of the screen show 2 to 4 small garment or colourway thumbnails with exactly one
visibly selected by a restrained outline, and that selected thumbnail is the garment
rendered on the customer's body. Keep the interface restrained and realistic.

INTERACTION — Vagora is not a touch device:
The customer stands approximately 1.5–2 metres from the Vagora Mirror, at a comfortable
hands-free viewing distance, standing comfortably and observing their virtual outfit,
turning slightly, with subtle natural hand and arm movement. Never touching, tapping or
swiping the screen, never leaning toward it, never standing against the glass, never
gesturing theatrically.

Environment: bright contemporary store, white or pale-beige walls, natural window light,
sparse rails, pale floor, plants or simple props; or a seamless white studio; or, for the
product alone, a seamless black studio with one soft key light.

Camera: 35–50mm, chest height, level horizon, slight three-quarter angle to the Mirror so
the frame's depth and the sensor bracket both read, moderate depth of field, the Mirror and
the person within the central 55% of the frame.

NEVER: change the mirror's proportions; make it a wall mirror, a wall-mounted screen or a
thin television on a stand; remove or redesign the base; remove the caster wheels; move the
Kinect on top of, above or inside the frame or to the left side; turn the Kinect into a
generic webcam; add a second camera, touch buttons, a keyboard, exposed cables or a logo;
round the frame corners. No hologram, floating HUD, sci-fi interface, giant buttons,
colourful app-style controls or dashboard UI. No multiple mirrors, neon, lens flare,
teal-and-orange grade, heavy vignette, CGI gloss, crowd, children, smiling at camera, text
of any kind. And never let the on-screen outfit match the customer's physical outfit.
```

Variations (append one; each names the real outfit and the virtual one separately):

- **Customer experience:** "PHYSICAL: the customer is physically wearing [outfit A — plain, everyday]. SCREEN: the same customer, full-length, in [outfit B — visibly different from A: a different garment type and/or a clearly different colour], the physical and virtual outfits never matching. UI: 2–4 small thumbnails near one screen edge, exactly one selected, and the selected one is outfit B. INTERACTION: standing approximately 1.5–2 metres from the Mirror at a comfortable hands-free viewing distance, one hand raised to shoulder height, turning to see the virtual outfit, never touching the screen. Aspect 16:9 (crop-safe to 4:5)."
- **Product:** "The Mirror alone in the black studio, whole product in frame including the sloped base and all four casters, the key light reading the frame's edge and the sloped face of the base, the screen lit with a full-length garment render and two or three thumbnails at one edge with one selected. Portrait 4:5, true black background, no person in shot."
- **Retail staff:** "A colleague in plain dark clothing [carrying a folded garment to the counter / showing fabric swatches and a sketch] while the customer stands back from the Mirror in [outfit A], the screen showing them in [outfit B]. Shallow focus on the action, the Mirror sharp in the background."
- **Campaign:** "The screen places the customer inside a built campaign scene ([describe scene]) wearing [outfit B] while the customer physically stands there in [outfit A] and the real store around them stays plain and white; the contrast is the picture."
- **Business / operations:** "Dark store after hours; a wall screen shows a simple dark estate overview with small green, amber and red status pills; one Mirror in the background with its screen dark so the hardware alone reads — frame, sloped base, casters, and the Kinect on its bracket at the viewer-right edge; no people."

### The video block — image-to-video

**NEW RECOMMENDATION.** When animating a Vagora product photograph, the hardware and the interface are reference, not raw material. Append this to the shot description:

```
Treat the Vagora Mirror, the Kinect v2 hardware and the screen UI as locked reference
elements. Do not redesign, morph, relocate or animate the hardware or the interface: the
mirror's proportions, the frame, the base, the caster wheels, the Kinect v2 and its mounting
position, the UI layout and the selected garment state must all stay exactly as they are in
the source image. Keep the Vagora screen interface and all garment-selection UI visually
unchanged throughout the shot. Animate only believable human movement — the customer's
posture, a slight turn, small head movement, natural observation — unless otherwise
specified. The real person's clothing and the virtually rendered clothing on the screen must
remain visibly different for the whole clip.
```

**Approach shots.** The customer may walk toward the Mirror, but must **stop at a comfortable hands-free interaction distance** and never walk right up to the display. No reaching for the screen at the end of the move.

**When the UI must change** — a colourway switching, say — ask for that one change explicitly and name both states. Otherwise the instruction above holds and the interface stays still.

---

## 20 · AI copywriting instruction block

```
You write for Vagora, an interactive mirror for physical fashion retail. Write in British
English, present tense, plain declaratives. Describe what happens, in the order it happens,
with the customer, the staff, the stock or the retailer as the subject. Never describe how
it feels and never claim a result.

Headlines: an observation and its consequence. A noun phrase, a comma, a timing or place.
Four to nine words, two lines, full stop. Examples: "Every size and colourway, on screen."
"Made-to-order, before the first cut." "Their picks, already at the till."

Body: one or two sentences saying what the Mirror or the console does, mechanically.
Connect with "so" and "before". Example: "It tracks the customer's movement in real time,
so the garment responds as they move."

Retail impact (when asked for): one sentence, function → consequence, built on a contrast:
"rather than", "no longer", "not only", "becomes … not …". Operational, never emotional,
never numeric. Example: "The second store becomes a rollout date, not a second project."

Vocabulary: till, counter, catalogue, colourway, size, garment, piece, look, cloth,
made-to-order, rail, floor, store, estate, stock, live stock, product feed, buying decision,
rollout, session, try-on, scan, customer, retailer, staff, colleague. The product is
"the Vagora Mirror" then "the mirror". The software is "the console".

Never use: AI-powered, next-generation, cutting-edge, revolutionary, seamless, frictionless,
immersive, phygital, omnichannel, engagement, delight, elevate, unlock, empower, transform,
reimagine, the future of retail, smart mirror, magic mirror, platform, ecosystem, end-to-end,
leverage, boost, drive, game-changing, innovative, personalised journey, data-driven,
actionable, real-time analytics, 360°. Never invent a number, a customer, a partner or a
benchmark. Where evidence does not exist, say so plainly.

Two registers: editorial (full sentences, sentence case, to a person) and notation
(uppercase fragments or indexes such as "RETAIL IMPACT", "(01)", "ESTATE OVERVIEW").
Never mix them in one line.
```

Examples of the block applied:

- *Request:* "Write a headline and body for the made-to-order feature."
  *Output:* "Made-to-order, before the first cut." / "Unstitched cloth and made-to-order garments can be rendered on the customer before production begins." / RETAIL IMPACT: "Orders are taken against something the customer has already seen, so cloth is cut to demand rather than forecast."
- *Request:* "Write a LinkedIn caption for the catalogue feature."
  *Output:* "Every size and colourway, on screen. The Mirror shows the whole catalogue, and each option is checked against live stock before it appears — so the buying decision is no longer limited to what physically fits on the rail."
- *Request:* "Write a line for a booth banner."
  *Output:* "An interactive mirror that starts by itself."

---

## 21 · Quality checklist

Run before anything is published. A "no" on any line means the piece is not finished.

### Visual

- [ ] Exactly one dominant object; one small object answering it.
- [ ] Surfaces are `#FFFFFF` or `#000000` only; ink `#0F0F0F` used for text/controls only.
- [ ] No colour in UI except the console's status pills; colour comes from garments in photographs.
- [ ] Type from the eight tiers; headings 500 (450 on black); body 400; no bold; no Mono above 14px.
- [ ] Headings have an authored two-line break; ledes and bodies wrap pretty; measures respected.
- [ ] Eyebrow → heading gap is the site-wide value.
- [ ] Spacing from the 8–160 vocabulary; inside-block gaps smaller than between-block gaps.
- [ ] Square media, no shadows, no borders on images; any type on a photograph meets the four conditions in §04, otherwise it sits in a solid field or on a solid plate.
- [ ] Hairlines mark real boundaries only.
- [ ] One left axis; centred only for the ask.
- [ ] Icons only on controls, labelled, and functional — no feature icons, icon cards or decoration.
- [ ] Icon weight follows the typographic context: Phosphor Regular beside Switzer, Phosphor Light beside Fragment Mono and technical notation.
- [ ] Imagery passes §07 (subject, environment, person, non-touch at a hands-free distance, light, grade, realism).
- [ ] **The customer's real outfit and the outfit on the screen are visibly different**, and the selected thumbnail is the garment rendered on their body (§07E2).
- [ ] The Kinect v2 is on its bracket at the **viewer-right edge, at mid-display height** — not on top, not left, not a webcam (§07E).
- [ ] The sloped base and all four casters are present and unaltered (§07E).
- [ ] Every Mirror image passes the Product Accuracy Checklist (§08).
- [ ] The console appears as one bordered object with its "sample data" disclosure.
- [ ] The dock is untouched.

### Content

- [ ] Every claim is on the §01 capability list.
- [ ] No numbers, customers, partners or benchmarks that are not evidenced and labelled.
- [ ] Headlines are observation → consequence, ≤9 words, full stop.
- [ ] Bodies say what happens, present tense, ≤2 sentences.
- [ ] RETAIL IMPACT lines are function → consequence with a contrast, non-numeric.
- [ ] Retail vocabulary; British spelling; "the Vagora Mirror"/"the mirror"; "the console"; "customer", "retailer", "staff".
- [ ] Zero banned phrases (§12E).
- [ ] Editorial and notation registers never mixed in one line.
- [ ] Where evidence is missing, the copy says so.

### Motion

- [ ] At most one authored event per chapter; everything else is the quiet reveal.
- [ ] The frame or surface is established before its content moves.
- [ ] Headings use the one heading animation, unchanged.
- [ ] A change of world (black ↔ white) is the takeover plane or a plain change of surface at a section boundary; no masks, blobs, wipes or shaders.
- [ ] Reversible on scroll-up; page height unchanged by motion.
- [ ] Reduced-motion state renders everything final on first paint.
- [ ] Nothing animates continuously off-screen; transforms/opacity/clip-path only.
- [ ] The CTA and navigation are usable before any animation completes.

### Format

- [ ] Checked at 360×800, 390×844, 768×1024, 1200×720, 1366×768, 1440×900, 1920×1080, 2560×1440 (web) or the format's native sizes.
- [ ] No horizontal overflow; no clipped glyphs; nothing under the dock at rest.
- [ ] Fonts self-hosted with their licences (Switzer FFL, Fragment Mono OFL); icons attributed (Phosphor Icons, MIT).
- [ ] Alt text describes the scene and the product accurately.
- [ ] Works without JavaScript; the static first frame is complete.

---

## Appendix A · What the site does not define

**NOT YET DEFINED** — do not invent silently; decide, then record here.

- Italic usage (Switzer Italic is loaded but never used).
- A third type of surface for print (e.g. uncoated paper stock tolerance for pure black).
- Whether Phosphor admits a filled style for a selected state, and whether 20px earns a fixed context of its own (§09).
- Form fields, inputs, validation states (the site has no form).
- Accordion, modal, tooltip, toast, tabs (the site has none).
- Charts and data visualisation beyond the console's two metrics and pills.
- Logo clear space and minimum sizes (recommended in §01, awaiting approval); the logo in motion beyond the dock tilt and the preloader; a one-colour print build of the avatar tiles; retailer co-branding lock-ups (§01).
- Photography of the Mirror in a light environment as a product shot (only the dark studio exists).
- Whether the cabinet's sloped upper face is a separate material or colour from the black body (§07E) — the geometry is established, the finish is not.
- Type sizes per non-web medium, print production values and retailer co-branding beyond the margin rule (§15).
- A colour rule for garments in generated imagery beyond "strong, natural, from the collection".
- Video captions, lower-thirds and end-card layout.
- Localisation: non-Latin type (Fragment Mono is loaded as a Latin subset only).
- Sound.

## Appendix B · New recommendations made in this document

- **Phosphor Light** beside Fragment Mono — the half of the two-weight rule production has not yet needed (Phosphor itself, Regular beside Switzer, and icons as functional punctuation are established in production and in §09) (§09).
- A small core icon set beyond the five icons production uses (§09).
- The logo system's clear-space, minimum-size and placement rules (§01). The eight approved artworks and the hierarchy that governs them are ESTABLISHED — supplied and approved — and are not recommendations.
- The Product Accuracy Checklist (§08).
- The canonical product description, the screen/try-on requirement, and the four fixed prompt clauses — product, screen, interaction, negative (§07E, §07E2, §07K, §19).
- The image-to-video block that locks the hardware and UI while animating only the person (§19).
- The AI copywriting block and banned-phrase list (§12E, §20).
- The Applications chapter: how the system translates to web, social, decks, print, large format, campaign and video without becoming templates (§15), and the text-on-photography rule with its two fallback constructions (§04).
- Composition recipes for non-web formats (§16).
- A case-study structure conditional on written agreement (§13).
- The 17-step operating procedure and "when uncertain, reduce" (§18).

## Appendix C · Areas to formalise later

- The logo system's clear space and minimum sizes (§01) — recommended here, to be confirmed against the first printed and large-format pieces.
- Print colour: whether `#000000` prints as rich black or 100K; paper stock.
- A photographed product shot of the Mirror in daylight for light-surface formats.
- Form and input components, should a demo form ever replace the mail link.
- A short film grammar document once more than one film exists.
- Real estate data for the console once a pilot has run, replacing the sample data and its label.
