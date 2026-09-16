# Vagora Mirror UI — Final Implementation Prompt

Implement the **APPROVED FINAL Vagora Mirror UI redesign** from the supplied final reference screens and interaction reference.

The redesign itself is complete and approved.

Your job is to faithfully implement these designs in the existing Vagora Mirror application and connect them to the required existing product functionality.

This is **NOT** an invitation to redesign, reinterpret, simplify, extend, or “improve” the approved UI.

Follow only:

1. my latest explicit instructions
2. the six supplied **APPROVED FINAL redesign screens**
3. the supplied **Dwell Animation and Cursor** interaction reference
4. the specifications in this prompt

Where something is genuinely undefined, **ASK ME rather than assuming**.

---

## CRITICAL — DESIGN AUTHORITY

The six supplied final redesign screens are the visual source of truth:

1. **Starting Screen**
2. **Idle Screen**
3. **Categories Selection**
4. **Products Try-on**
5. **Scene Mode**
6. **Checkout**

The supplied **Dwell Animation and Cursor** image is the source of truth specifically for:

- air-cursor appearance
- hover behaviour
- dwell behaviour
- dwell cancellation
- interaction-state sequence

Do not use any previous design, old screenshot, old styling treatment, earlier concept, or existing visual implementation as design reference.

Do not preserve a visual pattern simply because it already exists in the codebase.

Do not infer design decisions from anything outside the approved redesign.

The existing application may of course contain functionality and logic that should be reused.

**Reuse FUNCTIONAL LOGIC where appropriate.**

Do **NOT** reuse visual decisions unless they match the supplied redesign.

---

## DO NOT ASSUME

If you encounter a visual state, interaction, screen, behaviour, or component that is **NOT** clearly defined by:

- the six final redesign screens
- the Dwell Animation and Cursor reference
- this specification
- a clearly repeated pattern visible in the approved redesign

**DO NOT guess.**

**DO NOT invent a conventional solution.**

**DO NOT silently copy an existing implementation pattern.**

**ASK ME A CLARIFYING QUESTION before making that decision.**

This includes uncertainty involving:

- screens not supplied
- hover states
- dwell states
- selected states
- disabled states
- loading states
- empty states
- error states
- pagination
- scrolling
- list boundaries
- navigation behaviour
- button visibility
- action ordering
- copy/wording
- icons
- component sizing
- behaviour after an action
- different item counts
- timeout behaviour
- cursor appearance
- responsive/scaling behaviour
- any missing pattern
- any conflict between a screenshot and this specification

If the uncertainty affects visible UI or customer interaction:

**STOP and ask.**

Do not make a temporary design assumption.

---

## AUTHORITY ORDER

If anything conflicts, use this order:

### For screen layout and component visual design

1. my latest explicit instruction
2. the six supplied APPROVED FINAL redesign screens
3. this written specification

### For air cursor, hover, and dwell mechanics

1. my latest explicit instruction
2. the supplied Dwell Animation and Cursor reference
3. the six supplied APPROVED FINAL redesign screens
4. this written specification

If the screenshots and numeric specification genuinely conflict and the intended result is not obvious:

**ASK ME.**

Do not resolve a genuine design conflict independently.

---

## PATTERN REUSE

You may reuse a pattern without asking when it is clearly established by the approved redesign.

Examples:

- action-button styling
- garment-card styling
- garment-navigation controls
- page headers
- metadata/total rows
- dwell progress
- selected-card border
- typography roles
- spacing relationships
- surface hierarchy

Do not extrapolate a new pattern from insufficient evidence.

---

## NO DESIGN ADDITIONS

Do not add elements that do not exist in the approved redesign unless explicitly required here.

Do not add:

- extra labels
- extra counters
- page counters
- pagination indicators
- divider lines
- extra borders
- extra instructions
- decorative graphics
- new colours
- new icons
- new interaction patterns
- rounded cards
- gradients
- glow
- glass effects
- shadows

If something appears necessary but is not defined:

**ASK ME.**

---

# 1. PHYSICAL DISPLAY

Target display:

- **49-inch portrait display**
- **1080 × 1920px**
- normal customer viewing distance: **approximately 1.5–2 metres**

This UI is designed for this fixed physical display.

Do **NOT** treat it as a conventional responsive website.

The customer-facing interface should always preserve the approved **1080×1920** composition.

For development on smaller monitors, scale the complete canvas proportionally.

Do not rearrange the UI into desktop/mobile breakpoints.

---

# 2. MAIN INTERACTIVE SCREEN LAYOUT

Applies to:

- Categories Selection
- Products Try-on
- Scene Mode

Overall canvas:

- **1080 × 1920px**

Live/customer area:

- **740px wide**

Right interaction panel:

- **340px wide**

Panel background:

- **#000000**

Panel horizontal inset:

- **20px left**
- **20px right**

Therefore normal panel component width:

- **300px**

Panel top padding:

- **20px**

Time appears at the top-right as shown in the approved screens.

After the time/status area, preserve approximately:

- **64px vertical spacing**

before the main screen content begins.

The large left area represents the **LIVE Mirror/camera feed**.

Do not replace the actual live feed with the static model image used in the design screenshots.

The model image is a design representation only.

---

# 3. SPACING SYSTEM

Vertical spacing between **RELATED** elements:

- **12px**

Examples:

- garment card → garment card
- button → button
- related controls in one group

Vertical spacing between **SEPARATE functional groups**:

- **48px**

Use whitespace to create grouping.

Do not introduce section divider lines unless explicitly visible in the supplied final designs.

---

# 4. COLOUR SYSTEM

Main dark surface / right rail:

- **#000000**

Primary interactive surface:

- **#1F1F1F**

Quiet garment-navigation surface:

- **#0F0F0F**

Primary text:

- **#FFFFFF**

Secondary text:

- **#FFFFFFE0**
- approximately 88% white

Tertiary / notation text:

- **#FFFFFF9D**

White surface:

- **#FFFFFF**

Text/icons on white:

- **#0F0F0F**

Do not introduce additional accent colours.

---

# 5. TYPOGRAPHY

Use only the approved Vagora typefaces:

- **SWITZER**
- **FRAGMENT MONO**

## SWITZER

Use Switzer for **human/customer-facing language**.

Use only:

- Regular
- Medium

Largest headings:

- **64px**
- **Switzer Medium**

Examples:

- “Step in front to start.”
- “Scan and show this list at the counter”

Page titles / major control text:

- **30px**
- **Switzer Medium**

Examples:

- “Select a category”
- “Categories”
- “Products”
- “Color”
- “Scene Mode”
- “Selfie”
- “Add to Cart”
- “Checkout”

Garment/category/product names:

- **24px**
- **Switzer Regular**
- secondary text colour

Examples:

- “Tops”
- “Bottoms”
- “Suits”
- “Female Tops”
- “Basic Tee”
- “Polo Knitwear”
- “Relaxed Button Down”

Do **NOT** use Fragment Mono for garment or category names.

## FRAGMENT MONO

Use Fragment Mono for **system / notation information**.

Size:

- **20px**

Colour:

- tertiary text colour

Use where appropriate for:

- item indexes
- totals
- category metadata
- scene metadata
- time/status
- compact system labels

Examples:

- `01`
- `02`
- `03`
- `TOPS`
- `SCENES`
- `(06)`
- `(19)`
- `(12)`
- `STARTING`

---

# 6. ICONOGRAPHY

Use the supplied approved icons / approved repository assets.

Normal icon size:

- **36 × 36px**

Back chevron:

- **30 × 30px**

Maintain the exact approved icon language.

Do not substitute another icon family.

Do not add icon containers, circles, or treatments absent from the approved design.

---

# 7. STANDARD ACTION BUTTONS

Normal action button:

- **300px wide**
- **88px high**

Background:

- **#1F1F1F**

Horizontal/internal padding:

- **16px**

Label:

- **30px**
- **Switzer Medium**

Icon:

- **36 × 36px**

Examples:

- Color
- Scene Mode
- Selfie
- Add to Cart

Use the exact wording from the supplied screens.

For example:

**Color**

NOT:

**Colors**

---

# 8. CHECKOUT BUTTON

Checkout is deliberately treated differently from normal actions.

Checkout button:

- **300 × 88px**

Background:

- **#FFFFFF**

Text/icon:

- **#0F0F0F**

It is the visually dominant primary CTA on:

- Products Try-on
- Scene Mode

Do not make Checkout dark.

---

# 9. GARMENT NAVIGATION BUTTONS

The UP and DOWN navigation controls around garment/scene lists use:

Width:

- **300px**

Height:

- **68px**

Background:

- **#0F0F0F**

Chevron centred horizontally and vertically.

These are **FILLED** controls.

Do not convert them to outlined controls.

The darker surface is intentional and distinguishes structural navigation from selectable content.

---

# 10. GARMENT / CATEGORY CARDS

Standard card size:

- **300px wide**
- **180px high**

Background:

- **#1F1F1F**

Internal padding:

- **16px**

Index:

- Fragment Mono
- 20px
- tertiary text colour

Name:

- Switzer Regular
- 24px
- secondary text colour

Thumbnail sits on the right side of the card.

Preserve the approved visual image size, alignment, and aspect ratio shown in the screenshots.

Do not distort garment imagery.

If the supplied source assets and the written card/image dimensions produce a geometric conflict, do not silently resize/recompose the design.

**ASK ME.**

---

# 11. AIR CURSOR

Implement the air cursor according to the supplied **Dwell Animation and Cursor** reference.

Cursor dimensions:

- **36px overall diameter**

Outer ring:

- white
- **3px stroke**

Centre dot:

- **6px diameter**
- white

Contrast protection:

- **1px dark keyline inside and outside the white ring**, as shown in the reference

The purpose of the dark keyline is to keep the cursor legible over:

- black UI
- light garments
- light photography
- dark photography
- live camera imagery

The cursor communicates **POSITION ONLY**.

Do not use the cursor itself to communicate dwell progress.

Do not add:

- mouse arrow
- hand icon
- glow
- trail
- particles
- circular progress ring
- growing cursor
- pulsing cursor

---

# 12. INTERACTION STATE SEQUENCE

The interaction sequence is:

**REST → HOVER → DWELL → ACTIVATED / SELECTED**

## REST

Target uses its normal approved appearance from the final UI screen.

No progress line.

Cursor may be elsewhere on screen.

## HOVER

When the air cursor enters a selectable target:

- target receives a subtle hover lift
- lighten the target surface by approximately **8%**, matching the interaction reference
- notation/index may become full white where appropriate
- dwell begins

This state must remain subtle.

Do not introduce:

- new borders
- glow
- scaling
- movement
- coloured highlighting

If an 8% surface lift is technically interpreted differently by the rendering implementation, reproduce the visual appearance shown in the interaction reference rather than inventing a stronger hover state.

## DWELL

While the cursor remains inside the target:

a white progress line grows:

**LEFT → RIGHT**

along the **BOTTOM EDGE** of the target.

If the cursor leaves before completion:

- cancel dwell immediately
- reset the progress line
- return target to its normal/rest appearance

The cursor itself does not display progress.

---

# 13. DWELL PROGRESS LINE

Dwell progress line:

- **#FFFFFF**
- **3px high**
- grows **left → right**

The dwell line and selected-card border are deliberately the **same 3px thickness**.

Do not use the 4px line shown in the old interaction specimen as a literal measurement.

For this approved implementation:

- **DWELL LINE = 3px**
- **SELECTED BORDER = 3px**

---

# 14. SELECTED STATE

Selected card border:

- **#FFFFFF**
- **3px**

Implement the border inset where necessary so it does not alter external dimensions or cause layout shift.

Selected and dwelling are **NOT** the same state.

Example from Products Try-on:

**Basic Tee**
- selected
- complete 3px white border

**Polo Knitwear**
- dwell in progress
- 3px bottom-edge white progress line

Preserve this distinction.

The Dwell Animation and Cursor reference contains a generic example where a target inverts to white and displays a check.

**Do NOT apply that generic inversion/check treatment universally.**

The six approved final screens define the actual selected treatment for each component.

If a selected treatment for a component is not shown:

**ASK ME.**

---

# 15. TARGET HIT AREA

The entire visible component is the interaction target.

For example:

- entire garment card
- entire category card
- entire action button
- entire garment-navigation button
- entire scene item

The customer should not need to dwell specifically over:

- text
- icon
- thumbnail
- arrow

The full component hit region should activate dwell.

This is important because the UI is used from approximately **1.5–2 metres away** with hand tracking.

---

# 16. CURSOR LAYERING

The air cursor must render above:

- live camera imagery
- virtual garments
- right-panel UI
- scene imagery
- buttons
- cards

It must remain visually legible regardless of background.

Do not allow target hover/dwell styling to obscure the cursor.

---

# 17. STARTING SCREEN

Follow the supplied **Starting Screen** exactly.

Full-screen:

- **#000000**

Use the approved **VERTICAL Vagora Mirror lockup** in the central composition as shown.

Near the bottom:

`STARTING`

- Fragment Mono
- 20px
- tertiary colour

Below it:

startup progress indicator.

Match the approved white progress line over the quiet dark track.

Do not add:

- marketing copy
- customer instructions
- extra status labels
- time

This is a system/startup state.

---

# 18. IDLE SCREEN

Follow the approved **Idle Screen**.

This screen is **FULL WIDTH**.

There is **NO right-side interaction panel**.

Live/brand footage/image fills the upper area.

Bottom information panel:

- **300px high**
- background **#000000**

Horizontal content margin:

- **96px left**
- **96px right**

Main instruction:

> Step in front to start.

- 64px
- Switzer Medium

Supporting copy:

> Nothing is recorded.

- 40px
- Switzer Regular

Use the approved Vagora **BRANDMARK** on the right.

Brandmark height:

- **132px**

Do not use the full lockup here.

Do not add:

- buttons
- time
- extra instructions
- gradient scrims
- floating cards

---

# 19. CATEGORIES SELECTION SCREEN

Follow the supplied **Categories Selection** screen.

Layout:

- 740px live customer area
- 340px interaction panel

Top:

- TIME

Main heading area:

Left:

> Select a category

Right:

`(06)`

“Select a category”:

- 30px
- Switzer Medium

`(06)`:

- Fragment Mono
- 20px
- tertiary text colour

`(06)` represents the **TOTAL number of categories**.

It appears **ONCE** in the heading row.

Each category card itself uses only its individual index:

- `01`
- `02`
- `03`
- `04`
- `05`
- `06`

Example:

`01`
Tops

`02`
Bottoms

`03`
Suits

Do **NOT** use:

- `01 / 06`
- `02 / 06`
- `03 / 06`

inside the cards.

Do **NOT** add any page counter.

The supplied Category screen shows dwell progress on the first category card.

Use the approved **3px white bottom progress line**.

---

# 20. PRODUCTS TRY-ON SCREEN

Follow the supplied **Products Try-on** screen exactly.

Right-panel hierarchy:

TIME

[ Back header ]

`‹ Categories`

Then section metadata:

`TOPS                                      (19)`

Then:

- [ UP garment navigator ]
- [ Garment 01 ]
- [ Garment 02 ]
- [ Garment 03 ]
- [ Garment 04 ]
- [ DOWN garment navigator ]

Then the approved action groups:

- [ Color ]
- [ Scene Mode ]
- [ Selfie ]
- [ Add to Cart ]
- [ Checkout ]

Maintain the spacing/grouping shown in the supplied approved design.

---

# 21. PRODUCT TOTAL / INDEX LOGIC

On Products Try-on:

`TOPS                                      (19)`

`TOPS` identifies the active category.

`(19)` represents the **TOTAL number of products in that category**.

This total is displayed **ONCE at list level**.

It is **NOT** repeated inside cards.

Individual cards use normal sequential indexes:

- `01`
- `02`
- `03`
- `04`
- etc.

Example:

`01`
Basic Tee

`02`
Polo Knitwear

`03`
Roundneck Knitwear

`04`
Relaxed Button Down

Do **NOT** implement:

- `01 / 19`
- `02 / 19`
- `03 / 19`

Do **NOT** add:

- `01 / 03`
- `02 / 03`

or any other page counter.

If the active category changes, update the metadata row dynamically.

Example:

`DRESSES                                  (12)`

---

# 22. PRODUCTS INTERACTION STATES

The approved Products screen demonstrates:

**SELECTED garment**
- 3px complete white border

**DWELLING garment**
- 3px white bottom-edge progress line

**Normal garment**
- no white selection border

These states must remain visually distinct.

---

# 23. SCENE MODE SCREEN

Follow the supplied **Scene Mode** screen.

Right-panel hierarchy:

TIME

[ Back header ]

`‹ Products`

Then:

`SCENES                                   (12)`

Then:

- [ UP scene navigator ]
- [ No scene ]
- [ Scene image ]
- [ Scene image ]
- [ Scene image ]
- [ Scene image ]
- [ DOWN scene navigator ]

Then:

- [ Checkout ]

Do **NOT** add:

- Color
- Selfie
- Scene Mode
- Add to Cart

to this screen.

The final approved Scene Mode screen only contains the scene browser plus Checkout.

---

# 24. SCENE TOTAL LOGIC

`SCENES                                   (12)`

`SCENES`:

- Fragment Mono
- 20px
- tertiary colour

`(12)`:

- Fragment Mono
- 20px
- tertiary colour

`(12)` represents the **TOTAL number of available scenes**.

Display it **ONCE** in this section row.

Do **NOT** display:

- `01 / 12`
- `02 / 12`
- `03 / 12`

inside each scene thumbnail.

---

# 25. SCENE IMAGE INDEX TREATMENT

Scene photographs can vary greatly in brightness and colour.

For that reason, individual scene indexes use a dedicated **BLACK caption plate at the TOP-LEFT** of each scene image.

Caption plate size:

- **48 × 32px**

Background:

- **#000000**

Index:

- Fragment Mono
- 20px

Examples:

- `01`
- `02`
- `03`
- `04`

Do not put the index directly on top of the photograph without the black container.

This treatment is intentional for reliable contrast.

Generate the numbering according to the actual scene order/data.

Do not hard-code accidental placeholder numbering from the visual mockup.

---

# 26. NO SCENE

The first Scene Mode option is:

> No scene

It is a normal selectable state without photographic imagery.

Match the approved card treatment.

When selected:

- **3px white border**

Do not invent an image for No scene.

---

# 27. CHECKOUT SCREEN

Follow the supplied **Checkout** screen exactly.

This is a full-screen black composition.

There is **NO 340px interaction rail**.

Horizontal page margin:

- **80px left**
- **80px right**

Heading:

> Scan and show this list  
> at the counter

- 64px
- Switzer Medium

Preserve the approved two-line composition.

Major vertical spacing between:

- heading
- garment cards
- QR code

= **60px**

---

# 28. CHECKOUT GARMENT CARDS

Three cards across.

Each:

- **300px wide**
- **180px high**

Horizontal gutter:

- **10px**

Total width:

`300 + 10 + 300 + 10 + 300 = 920px`

Available width:

`1080 - 80 - 80 = 920px`

Match the supplied layout exactly.

---

# 29. QR CODE

QR code:

- **610 × 610px**

Reason:

the width equals two garment cards plus their gutter:

`300 + 10 + 300 = 610px`

Use a high-contrast white QR surface.

Do not add decorative framing.

The actual QR must remain functional/scannable.

---

# 30. CHECKOUT TIMEOUT / SESSION AREA

Preserve the supplied bottom session treatment exactly.

It contains:

> This screen clears in

dynamic countdown number

horizontal timeout/progress line

> Step back in to carry on where you left off

The countdown remains dynamic.

Do not remove this functionality.

Do not rewrite the copy.

Do not add additional instructions.

---

# 31. COUNTING SYSTEM — FINAL SUMMARY

There is **NO universal page-counter system** in this redesign.

Do not introduce one.

## CATEGORIES

Heading row:

`Select a category                       (06)`

Category cards:

- `01`
- `02`
- `03`
- `04`
- `05`
- `06`

`(06)` = total categories

No totals inside cards.

## PRODUCTS

Metadata row:

`TOPS                                    (19)`

Cards:

- `01`
- `02`
- `03`
- `04`
- etc.

`(19)` = total products in active category

No totals inside cards.

No page count.

## SCENES

Metadata row:

`SCENES                                  (12)`

Scene indexes:

- `01`
- `02`
- `03`
- `04`
- etc.

`(12)` = total scenes

Each scene number uses a **48×32 black plate**.

No totals inside scene cards.

## CHECKOUT

No browsing total.

### DO NOT ADD

- `01 / 03`
- `01 / 19`
- `02 / 19`
- `01 / 12`
- `02 / 12`

anywhere unless I explicitly approve a later change.

---

# 32. COPY — USE EXACTLY

Use the exact approved terminology.

Examples include:

- `STARTING`
- `Step in front to start.`
- `Nothing is recorded.`
- `Select a category`
- `Categories`
- `TOPS`
- `Color`
- `Scene Mode`
- `Selfie`
- `Add to Cart`
- `Checkout`
- `Products`
- `SCENES`
- `No scene`
- `Scan and show this list at the counter`
- `This screen clears in`
- `Step back in to carry on where you left off`

Do not rewrite approved labels.

---

# 33. COMPONENT ARCHITECTURE

Implement reusable components where appropriate.

Likely reusable primitives include:

- interaction-panel header
- metadata/total row
- category/garment card
- scene thumbnail
- scene index caption
- garment/scene navigator
- action button
- primary Checkout button
- air cursor
- dwell progress
- selected state
- checkout garment card
- countdown/session indicator

Code reuse is encouraged.

Visual homogenisation is **NOT**.

If two components are visually different in the approved redesign, do not make them identical just to simplify code.

---

# 34. AIR-CURSOR FUNCTIONALITY

Preserve the required Kinect / air-cursor interaction functionality.

Do not convert the UI to click/touch interaction.

Normal customer interaction:

- tracked hand position controls the air cursor
- cursor enters target
- dwell begins
- 3px bottom progress line grows left → right
- leaving early cancels/reset progress
- completing dwell triggers the action

If implementation requires a mouse fallback for development/testing, that is acceptable only as a dev/testing input layer.

Do not expose conventional mouse/touch affordances in the customer-facing UI.

---

# 35. DIFFERENT DATA COUNTS

The supplied screens show example counts such as:

- `(06)`
- `(19)`
- `(12)`

These must be dynamic where they represent real application data.

Do not hard-code them unless the underlying application itself uses fixed values.

The layout should preserve the approved visual treatment for realistic count changes.

If a count or content case produces a layout problem not represented by the supplied screens:

**ASK ME rather than redesigning the component.**

---

# 36. NO LEGACY VISUAL FALLBACK

If an approved redesign pattern is missing for a particular application state, the fallback is **NOT** to use another/previous visual treatment.

The fallback is:

**ASK ME.**

Do not produce a mixture of approved Vagora redesign and unrelated visual patterns.

---

# 37. IMPLEMENTATION ACCURACY

Do not silently change supplied numeric values to make implementation easier.

Do not:

- shrink fonts
- change weights
- change padding arbitrarily
- introduce new radii
- invent colours
- substitute icons
- add dividers
- add pagination
- change card geometry
- modify copy
- rearrange controls
- alter grouping
- introduce responsive breakpoints

If something genuinely cannot fit or conflicts geometrically:

**ASK ME.**

---

# 38. VIEWING DISTANCE

Remember throughout implementation:

The customer views this interface approximately **1.5–2 metres away** on a **49-inch portrait display**.

Preserve:

- large typography
- high contrast
- large filled interaction targets
- obvious hit regions
- readable icons
- obvious dwell progress
- clear selection states

Do not optimise the interface around how compact or elegant it looks on a laptop development screen.

---

# 39. FINAL VISUAL QA

Before calling the implementation complete:

render every screen at exactly:

- **1080 × 1920**

Compare each one **SIDE-BY-SIDE** with its supplied approved reference.

Do not evaluate only from code.

Visually inspect:

- geometry
- margins
- vertical positioning
- typography
- weights
- line breaks
- spacing
- component sizes
- image scale
- icon scale
- surface colours
- alignment
- grouping
- selected states
- dwell states
- cursor scale and contrast

---

# 40. SCREEN-SPECIFIC QA

## STARTING

Verify:

- full black screen
- approved vertical Vagora Mirror lockup
- STARTING status
- approved progress treatment
- no additional content

## IDLE

Verify:

- full-width imagery/live content
- 300px black bottom panel
- 96px horizontal margin
- exact headline/copy
- correct brandmark
- no right rail

## CATEGORIES

Verify:

- 740 / 340 split
- heading says `Select a category`
- total appears once as `(06)`
- cards use `01–06` only
- no page counter
- correct 3px dwell progress treatment

## PRODUCTS

Verify:

- back header says `Categories`
- `TOPS` and `(19)` appear once
- cards use `01`, `02`, `03`...
- selected card has 3px complete border
- dwell card uses 3px bottom progress line
- action ordering matches reference
- label is `Color`, singular
- Checkout is white

## SCENE MODE

Verify:

- back header says `Products`
- `SCENES` and `(12)` appear once
- No scene option exists
- individual scene indexes use black 48×32 plates
- Checkout is white
- no product utility/action stack

## CHECKOUT

Verify:

- 80px left/right margin
- exact heading
- three 300×180 garment cards
- 10px card gutters
- QR is 610×610px
- session countdown/footer preserved

---

# 41. INTERACTION QA

Verify:

- air cursor is 36px overall
- outer ring is white with 3px stroke
- centre dot is 6px
- 1px dark keyline keeps cursor visible on light/dark content
- cursor sits above all customer-facing UI
- cursor entering a target begins hover/dwell
- hover uses the approved subtle surface lift
- dwell line is exactly 3px
- dwell line grows left → right
- leaving early cancels/reset progress immediately
- selected garment border is exactly 3px
- selected state does not cause layout shift
- generic white inversion/check from the interaction specimen is NOT applied unless explicitly shown/approved for that component

---

# 42. TECHNICAL QA

Verify:

- exact 1080×1920 render
- right rail exactly 340px where applicable
- 20px rail side insets
- 300px standard control width
- 12px related-item spacing
- 48px section spacing
- 300×88 standard buttons
- 300×68 navigation controls
- 300×180 garment cards
- correct fonts load
- correct weights load
- exact approved icons load
- no unsupported colours
- no unexpected radii
- no broken image assets
- QR remains scannable
- Kinect/air-cursor interaction still works
- dwell cancellation works
- selected borders cause no layout shift
- dynamic totals work
- timeout works
- no console errors

---

# 43. FINAL REPORT

When implementation is complete, report only:

1. screens implemented
2. reusable components created
3. existing functionality connected to the redesign
4. air-cursor / hover / dwell / selected behaviour implemented
5. any discrepancies between application functionality and the approved redesign
6. anything that could not be matched exactly
7. any ambiguity you had to ask me about
8. anything still requiring visual approval

Do not make unrelated application changes.
