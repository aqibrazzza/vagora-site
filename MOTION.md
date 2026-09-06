# Vagora — motion

The static design is fixed. Nothing here changes a layout, a type size, a
colour, a crop or a gutter.

The site's motion is deliberately small. An earlier pass built a full
cinematic system — chapter-wide colour takeovers, crop expansions on every
large image, a single choreographed FAQ entrance, and a refraction transition
alongside them. It was rejected in use: the takeovers covered live text, the
crop expansions read as broken photographs correcting themselves, and the page
made the reader wait. What survives is only what earned its place, and the one
piece rebuilt from it — the acts' refraction — was rebuilt on its own terms,
with a settled state that is mathematically the photograph.

## What moves, and why

**The preloader.** The mark reads. Then **"Beyond the Mirror"** — the promise
the hero film never states in words — rises letter by letter out of the bottom
edge, set to the full width of the viewport so it is a title card, not a
caption.

Two things are measured rather than guessed, because neither can be held
steady by CSS alone at a fluid size:

- *The width.* The string is fixed, so one pass at a known size gives the size
  that exactly fills the measure, using the real font metrics.
- *The bottom edge.* What must sit a constant distance off the screen is the
  deepest **ink** — the tail of the "y" in Beyond — not the line box, whose
  depth below the baseline changes with the type size. The descender is
  measured through the font's own metrics and `bottom` is set from it, which is
  why the phrase sits ~8px off the edge on a phone and ~12px at 2560 without
  the tail ever being cropped. Line-height is 0.84; the mask's bottom padding
  exists only so it cannot clip that tail, and costs nothing visually because
  the position comes from ink, not from the box.

**The exit is one carried gesture.** The black panel lifts by clipping its
bottom edge upward, and the phrase and the mark are standing on that surface —
they travel with it, on the same curve, at full opacity. The phrase leaves by
position, never by fading.

The geometry is what makes this delicate. The band gets shorter as it rises,
and the phrase is ~215px tall at 1440 and ~390px at 2560. **Once the band is
shorter than the phrase, the phrase cannot be wholly visible** — it has to be
cut by one edge or the other. So the choreography is not about avoiding that;
it is about which edge cuts it, and how briefly:

- the phrase travels slightly faster than the panel's bottom edge from the
  first frame (its travel is the panel's own plus a small lead), so its ink is
  never on the hero side of the boundary — it is never seen cropped against
  the moving edge, which is the fault this replaces;
- in the last fifth it slips a little further ahead, so it crosses the top
  edge in **75–85ms** instead of being eaten there slowly;
- the remaining clean black edge finishes the wipe **120–150ms** behind it —
  a beat, not a slab.

The lift uses a quadratic ease, not a cubic: a cubic in-out spends a fifth of
its duration on the last few per cent of travel, which strands an empty black
panel on screen long after the phrase has gone. The mark is carried on the same
surface and bows out while it is still mid-field, so it is never cut in half
and never leaves a gap. It sits optically centred rather than geometrically —
lifted 9px on a phone and up to 56px at 2560, because the phrase is a large
mass along the bottom edge and a mark at exactly 50% reads as low.

Scrolling is handed back the moment the black clears; the film's scale goes on
settling for another second on its own, and the page never waits for it.

**The hero film.** A white studio: the Mirror stands at the left of the frame,
a customer walks in from the right and stops in front of it, and the mirror
renders the look onto him. Measured frame by frame, all 192 of them: the mean
luma never leaves **200–215**. There are no dark cuts inside it and no fade to
black on its tail — the fault the film it replaced had baked into its last
second. Every frame it has is usable, so the loop is taken at the end.

*Where* the loop is taken is read from the media, never written down. A
constant matched to one asset's tail is a constant a shorter film can never
reach: the loop would simply never come round and the hero would hold its last
frame for ever. And the point is the last frame the film **presents**, not its
duration — a frame's time is the moment it appears, so the final frame of a
24fps clip lands at duration − 1/24 and a test against the duration itself can
only ever be false. An `ended` listener is the backstop behind both.

*The restart is a scene change we own*, and a hard cut there is a jump: the
clip opens on the Mirror alone and closes on a customer standing at it. So the
two ends are crossfaded directly, media to media, with a second decoder: the
film dissolving into itself over 550ms. Only the **outgoing** reel fades, over
an incoming one already at full opacity — fading both, the obvious way, lets
the ground behind show through and the hero visibly dips at the midpoint. One
layer moving, one solid: constant brightness, measured. Wide viewports only; a
phone keeps the single decoder and the instant restart, where a second video
decoder costs more than the cut does.

**The crop is keyed to the screen's proportion, not its width.** The film is
16:9 and the hero is the whole screen, so what survives depends on the shape
of the screen: a 16:9 desktop keeps all of it, a portrait tablet keeps 42%, a
phone keeps a quarter. The subject's position decides the anchor — the Mirror
occupies the frame's 19–42% and the customer stops at 50–63%, so the story
lives in the left two thirds and centring is only right once the slice is wide
enough to hold it. Three bands, on `aspect-ratio`: below 0.62 the slice holds
**the Mirror whole**, which is the product and the thing the screen is
rendering onto, with the customer entering at its edge; to 1.2 it is anchored
at 41%, wide enough for both; above that it is centred. Measured at all eight
viewports, the film fills the hero exactly and the subject is 12.8–33.3% of
the screen at every one.

**The hero's entrance is the preloader lifting off it.** All the film adds is
a 1.015 → 1 settle — small enough to read as the image coming to rest rather
than as a second entrance. No fade from black, no blur.

**HERO → MANIFESTO** is a chapter change, and it is two CSS rules. The hero's
scope is taller than the hero, so the hero **sticks** at the top while the
page keeps scrolling; the manifesto is pulled back up by exactly the surplus,
so it starts at the bottom edge of a held hero and rises over it until it
fills the viewport. The white surface arrives; the hero does not leave. It
stays full-bleed, sharp and playing underneath the whole way — no card, no
rounded corners, no blur, no fade to white.

Net page height is unchanged (200svh scope − 100svh margin = the 100svh the
hero always occupied), so nothing is trapped and no scrolling is invented.
**It is a composition, not a pin** — which is why mobile gets the identical
handoff at no cost, and why it works with JavaScript off. What narrow screens
drop is the media's response: on wide viewports the film pushes to 1.025 and
loses light to `brightness(0.88)`, scrubbed, so the world being covered feels
like it is receding rather than being switched off.

The proposition then answers the white, not the hero. The rule is not a
coverage number but a relationship: the first word lights only once the whole
statement is on the white — measured, it clears the panel's bottom edge by
273px at 1440 and 411px on a phone, at about 67% coverage. Before that the
reader is still watching the film, and a heading lighting behind a
mostly-visible hero reads as two unrelated things happening at once.

**The manifesto is set into the corner of its own surface.** The eyebrow, the
lead line and the three facts are anchored top-left, and the framing is one
number: the optical distance from the top of the white panel to the ink of
"VAGORA IS" is the same as the page gutter to its left. Optical, not box — the
eyebrow's line box carries 3px of leading above its capitals, so the padding
is the gutter minus that, and the corner comes out square at every size:
44/44px at 2560, 32/32 at 1440, 27/27 at 1024, 24/24 on a phone.

The height is whatever the content is — no viewport minimum, no pinning, no
scroll invented to hold a composition in place. A centred version was built
first and rejected in use: it needed all three, and it read as a page waiting
for the reader rather than one being read.

**Anchoring at the top is also what makes the takeover one gesture.** The
panel rises over the hero carrying its own first line — the eyebrow is a
gutter's distance from the panel's leading edge, so it crests the bottom of
the viewport *with* the surface instead of following it. It is painted on the
panel and has no entrance of its own; the lead line is already behind it at
18% before it lights. Measured through the rise, at every step from 8%
coverage upward, the bare white above the first ink is exactly the corner
inset — 29px at 1440, 21px on a phone. There is never an empty field arriving
first and the words catching up.

After the facts comes **deliberate breathing room**: real layout, not invented
scroll — 21svh at 2560, 25svh at 1440, 22svh on a phone. Act one arrives at
the end of it.

**The two acts open the same way, because they are one system.** Eyebrow and
heading on the left; the statement on the same axis opposite them, its
baseline aligned to the heading's last line; then the sticky media directly
below — on the right in act one, on the left in act two. The stage under them
is mirrored; the opening is not, because it is a chapter opening rather than a
reflection of the stage. Act one's statement used to sit in a second row over
in the media column, which stranded it low and beside the image instead of
beside the heading it belongs to; moving it onto the heading's axis also gave
back 87–94px, and the media rose by exactly that, tightening the intro into
the first image without touching the sticky mechanics or the 48px the head has
always kept clear of the plane.

The opening is **one motion unit**. All three parts are watched at a single
threshold, so the eyebrow leads only by its own height — measured at three
viewports, both acts, the heading follows in **the same scroll step**, 0px
apart — and the statement lands 80–141px later on its own 80ms delay. Act one
briefly had the label on the early threshold and the heading on a late one,
which put half a viewport of scrolling between them and left the eyebrow
sitting alone; the whole opening now shares the late threshold instead. It
still waits for the chapter to take the screen — measured, act one owns 66% of
the viewport when it fires, and nothing of it appears while the manifesto
still holds the composition — but it waits as one thing.

**The manifesto.** The proposition lights word by word as it is read. The
three facts beneath it are its sequel, not its neighbours: they wait until the
lit line has finished resolving, then arrive in sequence.

**Each act opens the same way, and the frame never moves.** The plane is at
its final sticky geometry from the first frame; what arrives is the picture
inside it, revealed from the bottom up as the stage comes into view, resolving
down from 1.6% oversize. Scrubbed, so it belongs to the reader.

This replaces an entrance that tweened the frame itself up 56px. That was
wrong twice over: it wrote position onto the very element the sticky layout
was about to take control of, and the 56px it borrowed had to be handed back
at the moment sticky took over — which read as the image sliding backwards to
find its place. Measured before: seven frames of page-relative reversal on the
way in. Measured after: **none**, in either act. Entrance and position are now
separate responsibilities — the browser owns where the frame is, the media
engine owns what is inside it.

**MANIFESTO → ACT ONE** is a different kind of change from the hero's. That
one was a surface takeover — a white field arriving over a black one.
Repeating it here would make every chapter boundary the same gesture, and this
boundary is not about surface at all: both sides are white. What changes is
**which thing owns the page**. The manifesto is typography-led; Act one is
image-led. So it is a transfer of dominance, not a cover:

    the proposition yields the canvas   rises, recedes to 45%, never leaves
      → the chapter marker arrives      the same way every heading arrives
        → the large image takes over    resolves inside a frame that is
                                          already where it will stay
          → the first annotation lands  only once the image is established

The four **overlap by design** — each begins before the one before it has
finished, which is what makes it one movement rather than four. Measured at
1440: the proposition begins yielding and the marker begins arriving on the
same frame; the meta follows two steps later; the image is fully present two
steps before the annotation finishes settling.

The marker is the one beat this passage does **not** author. It used to: a
bespoke timeline with its own trigger, travel, duration and stagger. But the
two acts' heads are the same markup — eyebrow, split title, lede on the same
delay — and every heading on the page arrives the same way, so a chapter
heading that arrived differently read as a mistake rather than as emphasis. It
now goes through the same pass as act two's. Measured side by side at 1440,
the two are indistinguishable: both begin at 761/763px from the top of the
viewport, both climb 0.07 → 0.29 → 0.68 → 0.81 → 0.90 → 0.95 → 0.98 → 0.99,
both hold the same 0.55–0.59 spread across the words mid-rise, and both ledes
follow one beat behind. The overlap with the yield survives intact — marker
and yield still begin on the same sample.

Nothing here moves the plane — that is the act's own entrance, above, and it
is the same one in both acts. The annotation moves on transform alone, because the
0.35 → 1 opacity of an active step belongs to the sticky state machine and two
systems must never share one property. Narrow screens get the same chain at
the scale of the screen — the travel is a fifth of the distance — and no
sticky stage, where the images are already in flow and carry the chapter.

**The annotation is an object in a field, not a column beside a picture.**
It used to be pushed to the end of its rail so its edge sat a fixed 24–32px
off the image, which reads as a caption attached to the photograph. It is now
**centred in the whitespace itself** — dead centre, no lean either way.

The centring is structural rather than computed: the rail's box is stretched
across the column gap so that it spans the actual whitespace — page gutter to
the image's edge — and then `margin-inline: auto` is the entire rule. The grid
track is untouched (a negative margin overflows an item, it does not resize a
track), so the media column and the sticky plane are exactly where they were.
There is no offset from the image anywhere in it, and nothing to retune when
the type or the viewport changes: the region moves, the object stays in the
middle of it. The text inside stays left-aligned throughout — what is centred
is the block.

The two acts are the same spread reflected, and measure identically at every
width: at 2560 a 1076px field holds a 320px block with 378px of air on each
side; at 1920, 202/317/202 in 721px; at 1600, 159/280/159; at 1440,
128/280/129; at 1280, 98/280/98; at 1100, 36/280/36. Vertical placement is
unchanged — each block is centred in its own 80svh step, which is what keeps
it level with the sticky plane.

**BOTH ACTS' planes re-render.** The states do not cross-fade. A wave of
refraction crosses the frame — architectural glass passing over a photograph —
and the new state is behind it once it has gone. It is the Mirror re-rendering
what it is looking at, which is the only thing in either chapter that is
literally about the product.

Act one puts the plane on the right and the annotation rail on the left; act
two mirrors it. **Nothing else about them differs.** Same entrance, same wave,
same duration, same direction rule, same text coordination, same interruption
handling, same fallbacks — one function serves both, because they are two
sides of one gesture and building them as two systems is how they would drift
apart.

Three properties keep it optics rather than an effect:

- *Bounded in space.* The displacement lives in a narrow gaussian band riding
  the transition front. Two thirds of the frame is mathematically untouched at
  any instant, and the band's strength falls to nothing at the top and bottom
  edges — the frame holds the glass — so a sample can never leave the picture
  and smear.
- *Bounded in time.* Everything is scaled by `sin(pi · p)`, so at both ends of
  the crossing every sample is exactly its source pixel. There is no settling
  and no residue. Between transitions the canvas is not composited at all:
  what you look at is the `<img>`, at the browser's own sharpness. Measured:
  **0.000/255 of change over 600ms** at rest, and the settled frame is
  **0.00/255** from the plain photograph.
- *Directional, with the page rather than against it.* Scrolling down is
  content travelling **up** through the viewport, so the wave travels up too:
  down-scroll it rises from the bottom edge, up-scroll it falls from the top.
  Direction is which way the annotation's trigger was crossed, never a guess
  from velocity, so it cannot be wrong. Read back from a recording, frame by
  frame, in both acts and both directions: the incoming state fills from the
  correct edge in **every** sampled frame, as **one moving boundary** — a
  single edge in 100% of frames, not a dissolve.

The crossing is **550ms measured**, over 18 animation frames on a software
rasteriser. Scroll velocity only shades it: up to +30% displacement and down
to 460ms, bounded so hard it can never become a different effect. The front is
bent away from a ruled line by two low harmonics — that is the entire
variation. No noise texture, no chromatic split, no ripple train.

Text follows the image rather than competing with it. The outgoing annotation
recedes in **200ms**; the incoming one waits **260ms** and then arrives — so
the picture is the only thing moving while the wave crosses it, and the words
land as the new state resolves. Measured at 1440: out at 33ms, in at 286ms,
**253ms apart**.

One canvas for the whole chapter, five textures uploaded once at about the
size the frame is actually shown at, no per-frame allocation, and no rendering
between transitions. The states are fetched and decoded when the stage is
**two and a half screens away**, not when the engine is built: built at boot it
pulled every state in both acts during the intro — act two's are eight screens
down — in front of the hero film that is the first viewport. Until it is
primed the authored wipe is the engine, so no frame is ever at risk, and the
lead is long enough that the textures are uploaded well before the first wave. Interruption retargets rather than stacking: a reversal
swaps the two ends and runs the same wave back from where it is, and a third
state arriving mid-crossing either replaces what is coming or becomes the next
wave's origin, depending on which side of halfway it is. Hammering the rail
leaves exactly one state painted and nothing running.

If WebGL is missing, the context is lost, or the device cannot hold the frame
rate through three crossings, the canvas is retired for the session and the
same event is authored in GSAP: the incoming state is revealed by a wipe from
the same edge, resolving from 1.4% oversize, with the outgoing state solid
underneath the whole way so no ground ever shows. Not a cross-fade. Under
`prefers-reduced-motion` there is neither — a state change is not an
animation, and it happens in 200ms of CSS with nothing to wait behind.

The one thing that is genuinely different is act two's third state: an
interface capture, shown whole on its own dark ground rather than cropped. It
is composited onto that ground at the frame's aspect when its texture is
uploaded, so by the time it reaches the shader it fills the frame like any
photograph and the glass bends the letterbox along with everything else. The
shader does not know about fit at all.

**Act one → the Vagora Mirror.** The hero's takeover, said a second time on
purpose. The site has one grammar for a change of world and now uses it twice:

  **the held world stays · the next world arrives over it from below**

Act one scrolls normally until its final composition is on the screen — the
media plane at its held position, the last annotation centred beside it — and
then it stops. Not the text alone and not the image alone: the section itself
is held, so nothing in it can travel any further up. The Mirror's black then
rises over it from the foot of the screen as one clean full-width plane, and
by the time it reaches the top it owns the viewport and act one is released to
scroll away underneath. There is no mask, no shape, no geometry of its own —
a surface arriving, which is exactly what the hero → manifesto boundary is.

The moment it lands on is not tuned. The media plane's own sticky run ends
when the stage's box runs out beneath it, and that is the same scroll position
at which the act's foot reaches the foot of the screen. So the act stops at
precisely its resolved state; measured at 1440, 1920 and 390, the section, the
plane and the final annotation all move **0px** across the whole hold.

The mechanism is the hero's, rule for rule: the outgoing world is held by
`position: sticky`, the incoming one is pulled back up by exactly the scope's
surplus and painted above it. The one difference is the anchor. The hero is
exactly one screen tall, so `top: 0` holds it; act one is many screens tall,
so holding its top would freeze its opening — what has to be held is its last
screen, and the anchor for that is `screen − the act's own height`. CSS cannot
state that about a content-sized element, so the score measures it once (and
again on any refresh) and writes it into a custom property. Nothing else about
it is scripted: no pinning library, no transforms, no per-frame work.

The hold is real space and the Mirror's pull cancels it exactly, so the page
is not one pixel longer than it was — nothing is trapped and no scrolling is
invented. Both numbers are zero until they are measured, so with no script the
page is simply the page: the Mirror follows act one, covering nothing. Under
`prefers-reduced-motion` the takeover still works, because it is a composition
and not an animation — again, exactly like the hero's. And it reverses by
construction, because there is no state anywhere in it: walked down and back
at three viewports, **0px** of drift at every sample.

**The Vagora Mirror.** Exposure, not entrance: the product resolves at its own
size, settling from 4.5% oversized with no travel in under 900ms, and the
figure's edge mask does the rest — light finding an object rather than a card
arriving. Because the chapter's black carries its own composition up with it,
the product's frame arrives on the screen while the takeover is still running:
the reveal is asked for as that frame comes up, about a third of the way into
the rise, and it is established well before the black has the viewport. There
is no empty-black wait to fill, and nothing here drives the takeover.

The order after that is the chapter's argument, so it is authored as an order
rather than left to four elements meeting the viewport in whatever sequence
their positions produce: the words wait until the black has the screen, then
arrive as one restrained run — label, heading at +110ms, statement at +200ms —
and at +640ms the specification rail as a single secondary layer, never as
four separate facts. The heading uses the page's one heading animation,
unchanged — a chapter may choose when it is asked for, never how it looks. On
a fine pointer the product carries a few pixels of depth.

**The console.** One object, one entrance: it rotates out of an offset plane
and settles flat, scrubbed, so the arrival is tied to the reader rather than a
clock. Nothing inside it animates. There is no count-up — the metrics are
written in the markup and are correct before any script runs. Once settled it
tilts about 3° to the pointer.

**The store photograph.** The crop expands to full width and the frame drifts
a little inside it: a camera opening, not a parallax layer.

**The close.** The wordmark rises inside a mask that never moves, scrubbed.
No letters, no physics — the name arrives at full size and stops.

**The dock.** One state everywhere: the frosted ink pill. It briefly inverted
over the dark chapters so as not to sit dark-on-dark, but changing colour at
every section handoff pulled more attention than a persistent navigation
should. It does not change.

**Narrow screens.** No sticky stage, so the images carry the chapters: each
opens from a 12% crop to full width — one composited property, and it reads as
a camera opening rather than a card fading in. `clip-path` does not touch
layout, so nothing beside or below an image moves while it arrives.

Everything else is the quiet pass: a 10px settle on supporting copy, and the
line-mask rise on headings — **every** heading on the page, both chapter
markers included. Claiming (the list of elements with an authored entrance,
which this pass must leave alone) applies to headings exactly as it applies to
copy, and nothing claims a heading any more. One owner per element, always:
while act one's marker had both an authored entrance and this one, the quiet
pass started its rise as the heading came into view and the authored one
restarted it from hidden a third of a viewport later — measured, it rose to
0.86 mean opacity, fell back to 0.76, and rose again.

## Architecture

GSAP is the only animation system; ScrollTrigger owns everything
scroll-linked; CSS owns hover, focus and tap. **Lenis is the only smooth-scroll
engine**, wired to `ScrollTrigger.update` through `gsap.ticker` with
`lagSmoothing(0)`. Locomotive is not installed. `gsap.matchMedia` divides the
wide and narrow scores at `(min-width: 1100px) and (min-height: 600px)` — the
breakpoint the sticky layout already uses — and every context is registered so
teardown reverts it.

Both chapter takeovers are CSS, not script. Each is a `position: sticky`
world with the next section pulled back over it by the scope's surplus; the
only thing the script contributes is act one's anchor, which depends on a
content-sized height and so cannot be written in a stylesheet. It is measured
on load and on refresh, written as a custom property, and removed on teardown.

There are **two** WebGL surfaces on the page, one per act, from one module
(`src/modules/refraction.js`) driven by one state machine (`stickyStage()`).
It is hand-written WebGL1 — no Three.js, whose
scene graph would be several times the size of the whole site's script for a
single textured quad. Each exists only while its sticky stage does: created inside the same
`matchMedia` context, and disposed with it (frame, observers, listeners,
textures, buffer, program, context). Everything else on the page is
GSAP and CSS.

## Reduced motion

`prefers-reduced-motion: reduce` is not a shorter animation — it is the
finished page. Lenis is never constructed, there is no curtain, no scrub, no
pointer response, and every reveal, split word, media state and the wordmark
render at their final values on first paint. The film does not autoplay; the
poster is the hero and the control is one click away. The two chapter
takeovers are the exception and deliberately so: they are compositions rather
than animations — nothing moves that the reader is not moving — so both still
hand one world over to the next here, exactly as they do everywhere else.

Split text keeps its unsplit accessible name, decorative word spans are hidden
from assistive technology, links are never split, and with JavaScript off
nothing is split, nothing is hidden, and the page is complete.
