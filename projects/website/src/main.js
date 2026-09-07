import "./styles/main.css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { splitAll, resplitLines } from "./modules/split.js"
import { createMediaTransition } from "./modules/refraction.js"

gsap.registerPlugin(ScrollTrigger)

history.scrollRestoration = "manual"
const html = document.documentElement
html.classList.add("js")
const reducedMq = matchMedia("(prefers-reduced-motion: reduce)")
const reduced = reducedMq.matches
if (reduced) html.classList.add("reduced")
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
if (!finePointer) html.classList.add("no-hover")

/* The wide score and the narrow one divide here — the same breakpoint the
   sticky act layouts already use, so motion and composition never disagree. */
const WIDE = "(min-width: 1100px) and (min-height: 600px)"

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const EASE = "expo.out"

/* Every gsap.matchMedia context, so teardown can revert them. */
const contexts = []
/* The act one → Mirror hold's own release (see actHold). */
let releaseActHold = null

/* Elements with an authored entrance of their own. They must never also be
   picked up by the quiet `.reveal` pass, or two systems drive one property. */
const CLAIMED = ".console__object, .handoff__frame, .mirror__spec, .mirror__body"

/* ── Smooth scroll: Lenis is the only engine on the page ────────────────── */
let lenis = null
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 })
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}
const scrollTo = (target) => {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 })
  else target.scrollIntoView()
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute("href").slice(1)
  const target = id ? document.getElementById(id) : null
  if (!target) return
  e.preventDefault()
  if (id === "top") {
    // The brand cell reloads the page, per spec.
    window.location.href = window.location.pathname
    return
  }
  scrollTo(target)
  history.replaceState(null, "", "#" + id)
})

/* ── The film ───────────────────────────────────────────────────────────────
   Measured frame by frame from the asset: across all 192 frames the mean luma
   never leaves 200–215. There are no dark cuts inside it and — unlike the film
   this replaced — no fade to black baked into its tail, so every frame it has
   is usable and the loop is taken at the end.

   The restart is still a scene change we own, and a hard cut there is a jump:
   the clip opens on the Mirror alone and closes on a customer standing at it.
   So the two ends are crossfaded directly, media to media, with a second
   decoder — one film dissolving into itself. Desktop only; a phone gets the
   instant restart, where a second video decoder costs more than the cut does.

   WHERE the loop is taken is read from the media, never written down. It used
   to be a constant matched to one asset's fade tail, which meant a shorter
   film would never reach it: the loop would simply never come round and the
   hero would freeze on its last frame. If a future asset does carry a tail,
   FILM_TAIL is the only number to set. */
const FILM_TAIL = 0
const LOOP_FADE = 0.55
/* NaN before metadata, and Infinity keeps the loop from firing until the
   duration is known — which is the safe direction to be wrong in. */
const filmEnd = () => (video.duration || Infinity) - FILM_TAIL

const hero = $(".hero")
const heroScope = $(".hero-scope")
const heroMedia = $("[data-hero-media]")
const video = $("[data-hero-video]")
const filmToggle = $("[data-film-toggle]")

/* Every video element the hero is showing — one, or two when crossfading —
   and which of them is currently the visible one. */
let reels = [video]
let leadReel = video

function film() {
  const setFilmState = (playing) => {
    filmToggle.dataset.state = playing ? "playing" : "paused"
    filmToggle.setAttribute("aria-label", playing ? "Pause the film" : "Play the film")
  }
  // The control speaks for the film, not for one element: pause stops every
  // reel, play resumes the one that is actually on screen.
  filmToggle.addEventListener("click", () => {
    if (reels.some((v) => !v.paused)) reels.forEach((v) => v.pause())
    else leadReel.play().catch(() => {})
  })
  reels.forEach((v) => v.addEventListener("play", () => setFilmState(true)))
  video.addEventListener("pause", () => {
    if (reels.every((v) => v.paused)) setFilmState(false)
  })

  video.loop = false

  if (reduced) {
    // Motion off: the poster is the hero. The film is a click away.
    video.removeAttribute("autoplay")
    video.pause()
    setFilmState(false)
    return
  }

  const canCrossfade = matchMedia(WIDE).matches && typeof video.requestVideoFrameCallback === "function"

  if (!canCrossfade) {
    /* One decoder: cut at the last frame the film actually presents. Note the
       frame, not the duration — a frame's mediaTime is the moment it appears,
       so the final frame of a 24fps clip lands at duration − 1/24 and a test
       against the duration itself can only ever be false. That is exactly how
       a phone came to hold the last frame for ever instead of looping. */
    const LAST_FRAME = 0.08
    const restart = () => {
      video.currentTime = 0
      if (!video.paused) video.play().catch(() => {})
    }
    if (typeof video.requestVideoFrameCallback === "function") {
      const tick = (_, meta) => {
        if (meta.mediaTime >= filmEnd() - LAST_FRAME) restart()
        video.requestVideoFrameCallback(tick)
      }
      video.requestVideoFrameCallback(tick)
    } else {
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= filmEnd() - 0.3) restart()
      })
    }
    // The backstop: whatever the callbacks do, a film that reaches its end
    // starts again rather than standing still.
    video.addEventListener("ended", restart)
    video.play().catch(() => setFilmState(false))
    return
  }

  // Two decoders, ping-ponging. The outgoing reel is still playing while the
  // incoming one starts from the top, so the join is a dissolve, not a cut.
  const b = video.cloneNode(true)
  b.removeAttribute("id")
  b.removeAttribute("data-hero-video")
  b.setAttribute("aria-hidden", "true")
  b.style.opacity = "0"
  b.style.zIndex = "1"
  video.style.zIndex = "2"
  b.muted = true
  b.loop = false
  video.after(b)
  reels = [video, b]
  reels.forEach((v) => v.addEventListener("play", () => setFilmState(true)))
  b.addEventListener("pause", () => {
    if (reels.every((v) => v.paused)) setFilmState(false)
  })

  let lead = 0
  let handing = false
  const handAt = () => filmEnd() - LOOP_FADE

  /* Only the OUTGOING reel fades, over an incoming one that is already fully
     opaque and underneath it. Fading both — the obvious way — lets the black
     behind show through in the middle of the dissolve: at the halfway point
     the two half-transparent layers composite to about 75% of full weight and
     the hero visibly dips. One layer moving, one solid: constant brightness. */
  const hand = () => {
    if (handing) return
    handing = true
    const from = reels[lead]
    const to = reels[1 - lead]
    to.currentTime = 0
    to.style.zIndex = "1"
    from.style.zIndex = "2"
    to.style.opacity = "1"
    const start = to.play()
    const go = () => {
      gsap.to(from, {
        opacity: 0,
        duration: LOOP_FADE,
        ease: "none",
        onComplete: () => {
          from.pause()
          from.currentTime = 0
          lead = 1 - lead
          leadReel = reels[lead]
          handing = false
        },
      })
    }
    start && start.then ? start.then(go).catch(go) : go()
  }

  const watch = (v, i) => {
    const tick = (_, meta) => {
      if (i === lead && !handing && meta.mediaTime >= handAt()) hand()
      v.requestVideoFrameCallback(tick)
    }
    v.requestVideoFrameCallback(tick)
  }
  reels.forEach(watch)

  video.play().catch(() => setFilmState(false))
}

/* ── The preloader ──────────────────────────────────────────────────────────
   Three beats and one gesture. The mark reads. "Beyond the Mirror" — the
   promise the hero film never states in words — rises letter by letter out of
   the bottom edge, set to the full width of the viewport so it reads as a
   title card rather than a caption. Then the whole line travels up and the
   black retracts with it, off the film, on the same curve: the words leave in
   the same direction the curtain does, so the exit is one move rather than
   two. The dock arrives into the space they leave.

   The line is fitted by measurement, not by a guessed clamp: the string is
   fixed, so one pass at a known size gives the exact size that fills the
   viewport at any width, with the real font metrics rather than an estimate. */
const TAGLINE = "Beyond the Mirror"

function buildCurtain() {
  const c = document.createElement("div")
  c.className = "curtain"
  c.setAttribute("aria-hidden", "true")
  const line = document.createElement("div")
  line.className = "curtain__line"
  const inner = document.createElement("span")
  inner.className = "curtain__inner"
  // One span per character so the rise can read left to right. The curtain is
  // aria-hidden in full, so nothing here reaches assistive technology.
  inner.innerHTML = [...TAGLINE]
    .map((ch) => `<span class="curtain__ch">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("")
  line.appendChild(inner)
  c.innerHTML = '<span class="mark"></span>'
  c.appendChild(line)
  document.body.appendChild(c)
  return c
}

/* Fit the line to the viewport, then place it by its INK.

   Two separate problems. The width is easy: the string is fixed, so one pass
   at a known size gives the exact size that fills the measure.

   The bottom edge is the optical one. What should sit a constant distance off
   the screen is the deepest mark on the line — the tail of the "y" in Beyond —
   and that sits at a different depth below the line box at every type size, so
   no CSS margin can hold it steady. This measures the real descender through
   the font's own metrics and sets `bottom` from it, which is why the phrase can
   sit within ~10px of the edge without the tail ever being cropped. */
let metricsCtx = null

function fitLine(line) {
  const inner = $(".curtain__inner", line)
  if (!inner) return

  // 1 — width
  line.style.fontSize = "100px"
  const w = inner.getBoundingClientRect().width
  const target = line.clientWidth
  if (!w || !target) return
  line.style.fontSize = Math.max(16, (100 * target) / w) + "px"

  // 2 — the optical bottom
  metricsCtx = metricsCtx || document.createElement("canvas").getContext("2d")
  if (!metricsCtx) return
  const cs = getComputedStyle(line)
  const fs = parseFloat(cs.fontSize)
  const lh = parseFloat(cs.lineHeight)
  metricsCtx.font = `${cs.fontStyle} ${cs.fontWeight} ${fs}px ${cs.fontFamily}`
  const m = metricsCtx.measureText(TAGLINE)
  const asc = m.fontBoundingBoxAscent
  const desc = m.fontBoundingBoxDescent
  const inkDesc = m.actualBoundingBoxDescent
  if (!(asc + desc) || !isFinite(inkDesc)) return

  const box = inner.getBoundingClientRect()
  const baseline = box.top + (lh - (asc + desc)) / 2 + asc
  const inkBottom = baseline + inkDesc
  // A hair over 8px on a phone, a hair under 12px at 2560 — the same optical
  // breath at every size, measured rather than assumed.
  const safety = Math.max(8, Math.min(12, innerWidth * 0.0045))
  const current = innerHeight - line.getBoundingClientRect().bottom
  line.style.bottom = current + (inkBottom - (innerHeight - safety)) + "px"
}

async function intro() {
  const dock = $(".dock")
  if (reduced) {
    html.classList.remove("booting")
    dock.classList.add("is-in")
    return
  }
  const curtain = buildCurtain()
  // The shield and the curtain are the same black, and the curtain is now in
  // the document, so dropping the shield here is invisible — and it must be
  // dropped, or it would outlive the curtain's lift and hold the page dark.
  html.classList.remove("booting")
  const line = $(".curtain__line", curtain)
  const chars = $$(".curtain__ch", curtain)
  const mark = $(".mark", curtain)
  lenis && lenis.stop()
  window.scrollTo(0, 0)
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
  fitLine(line)
  /* Measure, then hide the letters, then reveal the line — in that order, in one
     frame. The line is `visibility: hidden` in CSS until here because everything
     before this point would paint it at its fallback size with the letters at
     rest: a small, static tagline flashing in the corner before the real one
     rises. The from-state is set here rather than left to the timeline's own
     fromTo (which lands a beat later) so the reveal below has nothing to undo. */
  gsap.set(chars, { yPercent: 130 })
  line.style.visibility = "visible"

  /* THE EXIT IS ONE GESTURE: the black panel carries the whole composition
     upward and the hero is revealed underneath it.

     The geometry is what makes this delicate. The panel lifts by clipping its
     bottom edge upward, so the black band gets shorter as it goes; the phrase
     is ~215px tall at 1440 and ~390px at 2560. Once the band is shorter than
     the phrase, the phrase CANNOT be wholly visible — it has to be cut by one
     edge or the other. So the choreography is not about avoiding that, it is
     about which edge cuts it and how briefly:

     · The phrase travels slightly FASTER than the panel's bottom edge from the
       first frame (`carry` is the panel's own travel plus a small lead), so its
       ink is never on the hero side of the boundary. It never sits cropped on
       the moving edge — the fault this replaces.
     · It stays at full opacity the whole time it is on screen. It leaves by
       position, not by fading.
     · In the last fifth it slips a little ahead of the panel, so it clears the
       top quickly rather than being eaten there slowly, and the remaining
       clean black edge finishes the wipe about 150ms behind it.

     The mark is carried on the same surface and bows out before it reaches the
     top edge, so it is never sliced and never leaves an empty black phase. */
  const carry = line.getBoundingClientRect().bottom + 30
  const D = 0.78 // the panel's whole lift
  const OUT = 1.55 // the title card has been read
  /* power1, not power2: a cubic in-out spends a fifth of its duration on the
     last few per cent of travel, which strands a clean black slab on screen
     long after the phrase has gone. The quadratic keeps the tail moving. */
  const LIFT = "power1.inOut"

  const tl = gsap.timeline({
    // The film's scale settles for a further second after the black has gone.
    // The page must NOT wait for it: the curtain is removed and scrolling is
    // handed back the moment the black finishes clearing, or the reader sits
    // in front of a finished hero unable to move.
    onComplete: () => gsap.set(reels, { clearProps: "transform" }),
  })
  tl.to(mark, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
    // Out of the bottom edge, left to right, inside a mask that never moves.
    .fromTo(chars, { yPercent: 130 }, { yPercent: 0, duration: 0.8, ease: EASE, stagger: 0.018 }, 0.22)

    // The panel and everything standing on it start together and share a curve.
    .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: D, ease: LIFT }, OUT)
    .to(line, { y: -carry, duration: D, ease: LIFT }, OUT)
    .to(mark, { y: -carry, duration: D, ease: LIFT }, OUT)
    // The mark leaves while it is still mid-field, so it is never cut in half.
    .to(mark, { opacity: 0, duration: D * 0.24, ease: "power2.in" }, OUT + D * 0.2)
    // The slip: composed on yPercent so it adds to the carry rather than
    // fighting it, and the phrase is off the top before the last black edge.
    .to(line, { yPercent: -80, duration: D * 0.2, ease: "power2.in" }, OUT + D * 0.74)

    // The preloader reveal IS the hero's entrance. All the film adds is a
    // settle so small it reads as the image coming to rest, not as an entrance.
    .fromTo(reels, { scale: 1.015 }, { scale: 1, duration: 1.2, ease: EASE }, OUT)
    .add(() => {
      curtain.remove()
      lenis && lenis.start()
    }, OUT + D)
    .add(() => dock.classList.add("is-in"), OUT + D + 0.05)

  return tl.then()
}

/* ── Scroll choreography ────────────────────────────────────────────────── */
/* The hero does not leave — it is covered. While the white manifesto surface
   rises over it (a CSS composition, see .hero-scope), the film answers: it
   pushes very slightly toward the viewer and loses a little light, so the
   world being covered feels like it is receding rather than being switched
   off. Both are bounded, both are tied directly to scroll, and the hero stays
   sharp and full-bleed the whole way — no fade to white, no card, no blur. */
function heroScroll() {
  if (reduced || !heroScope || !heroMedia) return
  const mm = gsap.matchMedia()
  contexts.push(mm)
  mm.add(WIDE, () => {
    const t = gsap.fromTo(
      heroMedia,
      { scale: 1, filter: "brightness(1)" },
      {
        scale: 1.025,
        filter: "brightness(0.88)",
        ease: "none",
        scrollTrigger: { trigger: heroScope, start: "top top", end: "bottom bottom", scrub: true },
      },
    )
    return () => {
      t.scrollTrigger && t.scrollTrigger.kill()
      t.kill()
      gsap.set(heroMedia, { clearProps: "transform,filter" })
    }
  })
}

/* THE heading animation. Every section title on the page arrives through
   this one function — the quiet pass below calls it as elements come into
   view, and a chapter that sequences its own opening calls it at the moment
   it wants it. The numbers live here once so no heading can drift from the
   others; a chapter may choose WHEN, never HOW. */
function revealWords(el) {
  const words = $$(".split-word", el)
  if (!words.length) return el.classList.add("is-in")
  gsap.fromTo(
    words,
    { yPercent: 120, y: 0, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.15,
      ease: EASE,
      // Lines are the beat; the words inside a line arrive almost
      // together, so a heading reads as lines rather than as words.
      stagger: 0.035,
      onComplete: () => {
        el.classList.add("is-in")
        gsap.set(words, { clearProps: "transform,opacity" })
      },
    },
  )
}

function reveals() {
  const claimed = (el) => el.matches(CLAIMED) || el.closest(CLAIMED)
  const items = $$(".reveal").filter((el) => !claimed(el))
  /* Headings are claimed the same way copy is — one owner per element,
     always. Nothing claims a heading today: every section title on the page,
     both acts included, arrives through this one pass and looks like it. */
  const heads = $$(".split-ready:not([data-scrub])").filter((el) => !claimed(el))
  if (reduced) {
    $$(".reveal").forEach((el) => el.classList.add("is-in"))
    $$(".split-ready").forEach((el) => el.classList.add("is-in"))
    return
  }
  /* Two thresholds, one behaviour. Most things arrive as they come into view
     — act one's chapter LABEL among them, so it is allowed to appear at the
     bottom edge while the manifesto still holds the composition: a promise of
     what is next, not a competing entrance. What is marked `data-enter="late"`
     is the heading and the statement under it, which wait until the chapter
     has actually taken the screen. The animation is identical; only when it
     is asked for differs. */
  const enter = (entries, obs) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target
      obs.unobserve(el)
      if (el.classList.contains("split-ready")) revealWords(el)
      else el.classList.add("is-in")
    })
  }
  const io = new IntersectionObserver(enter, { rootMargin: "0px 0px -12% 0px" })
  const ioLate = new IntersectionObserver(enter, { rootMargin: "0px 0px -52% 0px" })
  const watch = (el) => (el.closest("[data-enter='late']") ? ioLate : io).observe(el)
  items.forEach(watch)
  heads.filter((el) => !el.closest(".hero")).forEach(watch)
}

function manifesto() {
  const el = $("[data-scrub]")
  if (!el) return
  const words = $$(".split-word", el)
  if (reduced || !words.length) return
  let lit = -1
  /* The proposition answers the white surface, not the hero. It starts once
     the manifesto has taken most of the viewport — before that the reader is
     still watching the film, and a heading lighting behind a mostly-visible
     hero reads as two unrelated things happening at once. */
  ScrollTrigger.create({
    trigger: el,
    start: "top 45%",
    end: "bottom 30%",
    scrub: true,
    onUpdate: (self) => {
      const upTo = Math.floor(self.progress * words.length)
      if (upTo === lit) return
      const lo = Math.min(lit, upTo),
        hi = Math.max(lit, upTo)
      for (let i = Math.max(0, lo); i <= Math.min(words.length - 1, hi); i++)
        words[i].classList.toggle("is-lit", i < upTo)
      lit = upTo
    },
  })

  /* The three facts are the sequel to the proposition, not neighbours of it:
     they wait until the lit line above has finished resolving. */
  const meta = $$(".manifesto__meta .reveal")
  if (!meta.length) return
  ScrollTrigger.create({
    trigger: el,
    start: "bottom 62%",
    once: true,
    onEnter: () => meta.forEach((m, i) => setTimeout(() => m.classList.add("is-in"), i * 90)),
  })
}

/* ── MANIFESTO → ACT ONE ────────────────────────────────────────────────────
   A different kind of change from the hero's. That one was a surface takeover
   — a white field arriving over a black one. Repeating it here would make
   every chapter boundary the same gesture, and this boundary is not about
   surface at all: both sides are white. What changes is WHICH THING OWNS THE
   PAGE. The manifesto is typography-led; Act one is image-led. So the
   transition is a transfer of dominance, not a cover:

     the proposition yields the canvas  (rises, recedes, never disappears)
       → the chapter marker arrives     (restrained; it is a signpost)
         → the large image takes over   (rises and resolves into the stage)
           → the first annotation lands (only once the image is established)

   The four overlap by design. Each begins before the one before it has
   finished, which is what makes it read as one movement rather than four. */
function chapterHandoff() {
  if (reduced) return
  const text = $("[data-scrub]")
  const meta = $(".manifesto__meta")
  if (!text) return

  // Shorter travel on a phone: the same idea at the scale of the screen.
  const rise = Math.max(24, Math.min(70, innerWidth * 0.05))

  /* 1 — the proposition yields. It has been read by now (the lit sweep ends
     at "bottom 30%"), so it lifts and steps back rather than fading out: it
     is still there, it just stops being the thing you are looking at. */
  gsap.fromTo(
    text,
    { y: 0, opacity: 1 },
    {
      y: -rise,
      opacity: 0.45,
      ease: "none",
      scrollTrigger: { trigger: text, start: "bottom 28%", end: "bottom -14%", scrub: 0.5 },
    },
  )

  /* 2 — the three facts follow a beat later, and less far: they were always
     the quieter half. */
  if (meta) {
    gsap.fromTo(
      meta,
      { y: 0, opacity: 1 },
      {
        y: -rise * 0.62,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: { trigger: text, start: "bottom 12%", end: "bottom -30%", scrub: 0.5 },
      },
    )
  }

  /* 3 — the chapter marker is NOT authored here. It used to be: a bespoke
     timeline with its own trigger, travel, duration and stagger, and
     `.floor__head` was claimed so the quiet pass would leave it alone. The
     markup of the two acts' heads is identical — same eyebrow, same split
     title, same lede with the same delay — and every other heading on the
     page arrives the same way, so a chapter heading that arrived differently
     read as a mistake rather than as emphasis. It now goes through the same
     pass as act two's and every other section's. The handoff keeps only what
     is genuinely its own: the manifesto yielding, and the annotation landing. */

  /* 4 — the first annotation settles beside the plane once the plane has
     established itself. Wide layouts only: the sticky stage does not exist
     below the breakpoint, where the images are already in flow and carry the
     chapter themselves.

     The plane's own entrance is NOT here. It used to be — the frame was
     tweened up 56px into place — and that was wrong twice over: it wrote
     position onto the element the sticky layout is about to take control of,
     and the 56px it gained had to be surrendered at the handover, which read
     as the image sliding backwards to find its place. The frame is now
     established at its final geometry from the first frame and the entrance
     happens INSIDE it, in `stickyStage()`, where the media engine owns it. */
  const mm = gsap.matchMedia()
  contexts.push(mm)
  mm.add(WIDE, () => {
    const stage = $("[data-stage]")
    const block = $("[data-steps] .step [data-step-block]")
    if (!stage) return
    const tweens = []
    if (block) {
      // Transform only: the 0.35 → 1 opacity of an active step belongs to the
      // sticky state machine, and two systems must never share one property.
      tweens.push(
        gsap.fromTo(
          block,
          { y: 26 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: stage, start: "top 42%", end: "top 12%", scrub: 0.6 },
          },
        ),
      )
    }
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger && t.scrollTrigger.kill()
        t.kill()
      })
      gsap.set([block].filter(Boolean), { clearProps: "transform,opacity" })
    }
  })
}

/* ── The sticky stages ────────────────────────────────────────────────────
   Both acts are one machine. Act one puts the plane on the right and the
   annotation rail on the left; act two mirrors it. Nothing else about them
   differs — same activation band, same entrance, same transition, same text
   coordination, same fallbacks — because they are two sides of one gesture
   and reading them as two systems would be the mistake.

   Only the wide layout has a sticky plane, so the machine only exists there
   (gsap.matchMedia adds and removes it as the viewport changes). A feature
   becomes active the moment the top of its reading block crosses 72% of the
   viewport — before the reader reaches it — and the same band, crossed the
   other way, reactivates the earlier one. Narrow layouts render every state
   in flow with its own image and need no script at all. */
function stickyStage({ rail, stage, plane, state }) {
  const items = $$(rail)
  const states = $$(state)
  const stageEl = $(stage)
  const planeEl = $(plane)
  if (!items.length || !states.length || !stageEl || !planeEl) return
  const mm = gsap.matchMedia()
  contexts.push(mm)
  mm.add(WIDE, () => {
    let current = 0
    let leaveTimer
    /* The plane's transition — a wave of refraction, or the authored wipe
       where WebGL cannot be trusted. Under reduced motion neither exists: the
       state simply is what it is, and CSS carries the change. */
    const media = reduced ? null : createMediaTransition({ mount: planeEl, images: states, gsap })
    const apply = (i) => {
      items.forEach((s, k) => s.classList.toggle("is-active", k === i))
      states.forEach((img, k) => img.classList.toggle("is-active", k === i))
    }
    const set = (i, dir, velocity) => {
      if (i === current) return
      const prev = current
      current = i
      items.forEach((s, k) => s.classList.toggle("is-active", k === i))
      if (media) return media.set(i, dir, velocity)
      states.forEach((img, k) => img.classList.toggle("is-active", k === i))
      // Only ever one state leaving, and never the incoming one: a rapid
      // sequence of changes used to leave the class stuck on an element that
      // was also active, which blanked the stage.
      states.forEach((img, k) => img.classList.toggle("is-leaving", k === prev))
      clearTimeout(leaveTimer)
      leaveTimer = setTimeout(() => states.forEach((img) => img.classList.remove("is-leaving")), 320)
    }
    const triggers = items.map((item, i) => {
      const block = $("[data-step-block], [data-entry-block]", item) || item
      return ScrollTrigger.create({
        trigger: block,
        start: "top 72%",
        end: "bottom 28%",
        // Direction is which way this band was crossed — not a guess from
        // velocity, so it can never be wrong. Velocity only shades how hard
        // the glass bends, and how quickly.
        onEnter: (self) => set(i, 1, self.getVelocity()),
        onEnterBack: (self) => set(i, -1, self.getVelocity()),
      })
    })
    /* The entrance. The frame is already at its final geometry — the sticky
       layout owns its position and nothing here writes to it — so what
       arrives is the picture inside it, revealed from the bottom up as the
       stage comes into view. Scrubbed, so it belongs to the reader. */
    const enter = media
      ? ScrollTrigger.create({
          trigger: stageEl,
          start: "top 90%",
          end: "top 45%",
          scrub: 0.6,
          onUpdate: (self) => media.reveal(self.progress),
          // ScrollTrigger stops reporting outside its band, so both ends are
          // set explicitly — otherwise the plane would sit fully painted
          // until the band was entered and then snap shut.
          onRefresh: (self) => media.reveal(self.progress),
          onLeave: () => media.reveal(1),
          onLeaveBack: () => media.reveal(0),
        })
      : null
    if (enter) media.reveal(enter.progress)
    /* Every state must be ready before the reader reaches the stage, and the
       textures uploaded before the first wave crosses — so the lead is two and
       a half screens, not one. For act one that is the top of the page, which
       is where it always was. For act two it is somewhere in act one: still
       far enough back that its three states (eight screens down) are not
       fetched during the intro, where they were competing with the hero film
       for bandwidth, and far enough forward that the engine is warm long
       before the reader arrives. Until this fires the engine's own authored
       wipe is what a state change uses, so no frame is at risk either way. */
    const preload = ScrollTrigger.create({
      trigger: stageEl,
      start: "top 250%",
      once: true,
      onEnter: () => {
        states.forEach((img) => (img.loading = "eager"))
        media && media.prime()
      },
    })
    // Land on the right state if the page opens mid-chapter.
    ScrollTrigger.refresh()
    return () => {
      triggers.forEach((t) => t.kill())
      enter && enter.kill()
      preload.kill()
      clearTimeout(leaveTimer)
      media && media.destroy()
      states.forEach((img) => img.classList.remove("is-leaving"))
      apply(0)
    }
  })
}

/* Act one: the plane on the right, the narrative rail on the left. */
function floor() {
  stickyStage({
    rail: "[data-steps] .step",
    stage: "[data-stage]",
    plane: "[data-aperture]",
    state: "[data-aperture] .aperture__state",
  })
}

/* Act two: the same machine, mirrored — plane left, rail right. */
function ledger() {
  stickyStage({
    rail: "[data-rail] .entry",
    stage: "[data-ledger]",
    plane: "[data-evid]",
    state: "[data-evid] .evid__state",
  })
}

/* ── ACT ONE → THE VAGORA MIRROR ────────────────────────────────────────────
   The whole transition is three CSS rules (see .floor-scope in main.css): the
   act is held by `position: sticky`, the Mirror is pulled back up by the
   scope's surplus and painted above it. The same takeover the hero makes into
   the manifesto — one grammar for a change of world, used twice on purpose.

   This function contributes the one number CSS cannot state about a
   content-sized element: where a section many screens tall must be anchored
   so that its LAST screen is what holds. That anchor is `screen − the act's
   own height`, and the hold below it is one screen. Both are written as
   custom properties and both are zero until they are written, so with no
   script the page is simply the page.

   Nothing here animates and nothing here runs per frame. It is measurement,
   once, and again whenever the layout is refreshed. */
function actHold() {
  const scope = $(".floor-scope")
  const act = $(".floor")
  if (!scope || !act) return

  // The screen, as the stylesheet means it: 100svh, not innerHeight — on a
  // phone those differ by the toolbar, and every other hold on this page is
  // written in svh.
  const probe = document.createElement("div")
  probe.style.cssText = "position:absolute;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none"

  const measure = () => {
    scope.appendChild(probe)
    const screen = Math.round(probe.getBoundingClientRect().height) || innerHeight
    probe.remove()
    const h = Math.round(act.getBoundingClientRect().height)
    html.style.setProperty("--act-hold", screen + "px")
    // Never positive: a positive anchor would hold the act's opening instead
    // of its close, which is the one thing this must not do.
    html.style.setProperty("--act-anchor", Math.min(0, screen - h) + "px")
  }

  measure()
  ScrollTrigger.addEventListener("refreshInit", measure)
  return () => {
    ScrollTrigger.removeEventListener("refreshInit", measure)
    html.style.removeProperty("--act-hold")
    html.style.removeProperty("--act-anchor")
  }
}

/* ── The store: system → physical retail ────────────────────────────────────
   The crop expands to full width and the frame drifts a little inside it — a
   camera opening, not a parallax layer. */
function storeImage() {
  const frame = $(".handoff__frame")
  const img = frame && $("img", frame)
  if (!frame || !img || reduced) return
  gsap.set(frame, { clipPath: "inset(0% 10% 0% 10%)" })
  gsap.to(frame, {
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    scrollTrigger: { trigger: frame, start: "top bottom", end: "top 35%", scrub: 0.6 },
  })
  gsap.fromTo(
    img,
    { yPercent: -8 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
    },
  )
}

/* ── The Vagora Mirror: the product first, then one information layer ───────
   Exposure, not entrance. The product resolves at its own size — a scale
   settle with no travel, under 900ms — and the figure's edge mask does the
   rest, so it reads as light finding an object rather than a card arriving.

   The product does NOT wait for the takeover to finish. The chapter's black
   rises over the held act one carrying its own composition with it, so the
   product's frame arrives on the screen while the takeover is still running:
   the reveal is asked for as that frame comes up, and it is established well
   before the black has taken the viewport. Nothing here drives the takeover —
   the takeover is two CSS rules — and there is no interval of empty black to
   fill.

   The order after that is the chapter's argument, so it is authored as an
   order rather than left to four elements meeting the viewport in whatever
   sequence their positions produce: the annotation follows once the black has
   the screen, as one restrained run — label, heading, statement — and last
   the specification rail, which resolves as a single secondary layer and
   never as four separate facts. The heading uses the page's one heading
   animation, unchanged. A chapter may choose when it is asked for, never how
   it looks. */
function mirror() {
  const object = $(".mirror__object .object")
  const scope = $(".mirror")
  const body = $(".mirror__body")
  const spec = $(".mirror__spec")
  if (!object || !scope || reduced) return

  const eyebrow = body && $(".eyebrow", body)
  const head = body && $(".split-ready", body)
  const lede = body && $(".mirror__lede", body)
  // Start states are set now, not when each turn comes, so nothing can be
  // caught at full strength a moment before it is asked to arrive.
  gsap.set(object, { scale: 1.045, opacity: 0 })
  if (spec) gsap.set(spec, { autoAlpha: 0, y: 16 })
  const timers = []
  const at = (ms, fn) => timers.push(setTimeout(fn, ms))

  /* Asked for by the product's own frame as it comes up the screen, which is
     about a third of the way into the takeover — so it resolves as the black
     arrives with it, rather than after the black has finished. */
  ScrollTrigger.create({
    trigger: object,
    start: "top 88%",
    once: true,
    onEnter: () => gsap.to(object, { scale: 1, opacity: 1, duration: 0.85, ease: EASE }),
  })

  /* The words wait for the black to have the screen. Deliberately not the
     chapter's exact top edge — a boundary a smoothed scroll can stop a pixel
     short of is a boundary that sometimes never arrives. */
  ScrollTrigger.create({
    trigger: scope,
    start: "top 6%",
    once: true,
    onEnter: () => {
      eyebrow && at(0, () => eyebrow.classList.add("is-in"))
      head && at(110, () => revealWords(head))
      lede && at(200, () => lede.classList.add("is-in"))
      spec && at(640, () => gsap.to(spec, { autoAlpha: 1, y: 0, duration: 1, ease: EASE }))
    },
  })
  addEventListener("pagehide", () => timers.forEach(clearTimeout), { once: true })

  if (!finePointer) return
  // A little depth, once it is standing there. Bounded to a few pixels.
  const x = gsap.quickTo(object, "x", { duration: 1.2, ease: "power3.out" })
  const y = gsap.quickTo(object, "y", { duration: 1.2, ease: "power3.out" })
  let queued = false
  scope.addEventListener(
    "pointermove",
    (e) => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        x((e.clientX / innerWidth - 0.5) * -16)
        y((e.clientY / innerHeight - 0.5) * -10)
      })
    },
    { passive: true },
  )
  scope.addEventListener("pointerleave", () => {
    x(0)
    y(0)
  })
}

/* ── The console: an operating surface arriving into focus ──────────────────
   One object, one entrance. It rotates out of an offset plane and settles
   flat, scrubbed so the arrival is tied to the reader rather than a clock.
   Nothing inside it animates: the metrics are written in the markup and are
   correct before any script runs. */
function consoleObject() {
  const obj = $(".console__object")
  if (!obj || reduced) return

  gsap.fromTo(
    obj,
    { rotateX: 7, y: 46, scale: 0.975, opacity: 0 },
    {
      rotateX: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: obj, start: "top 92%", end: "top 42%", scrub: 0.7 },
    },
  )

  if (!finePointer) return
  const rx = gsap.quickTo(obj, "rotateX", { duration: 1, ease: "power3.out" })
  const ry = gsap.quickTo(obj, "rotateY", { duration: 1, ease: "power3.out" })
  let settled = false
  ScrollTrigger.create({ trigger: obj, start: "top 42%", once: true, onEnter: () => (settled = true) })
  let queued = false
  obj.addEventListener(
    "pointermove",
    (e) => {
      if (!settled || queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        const r = obj.getBoundingClientRect()
        ry(((e.clientX - (r.left + r.width / 2)) / r.width) * 3)
        rx(((e.clientY - (r.top + r.height / 2)) / r.height) * -2.4)
      })
    },
    { passive: true },
  )
  obj.addEventListener("pointerleave", () => {
    if (!settled) return
    rx(0)
    ry(0)
  })
}

/* ── The close: the wordmark is the last thing that moves ───────────────────
   A masked rise, scrubbed, and nothing else. No letters, no physics — the
   name arrives at full size and stops. */
function closing() {
  const mask = $(".footer__wordmask")
  const word = $(".footer__word")
  if (!mask || !word || reduced) return
  gsap.fromTo(
    word,
    { yPercent: 34, scale: 1.03, transformOrigin: "50% 100%" },
    {
      yPercent: 0,
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: mask, start: "top 96%", end: "bottom 88%", scrub: 0.7 },
    },
  )
}

/* ── The narrow score ───────────────────────────────────────────────────────
   Below the sticky breakpoint the images carry the chapters, so each one opens
   from its own centre as a crop expanding — one composited property, and it
   reads as a camera opening rather than a card fading in. */
function narrowScore() {
  if (reduced) return
  const mm = gsap.matchMedia()
  contexts.push(mm)
  mm.add("(max-width: 1099px)", () => {
    const media = $$(".step__media, .entry__media, .mirror__object .object")
    const tweens = media.map((el) =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0 12% 0 12%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.15,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      ),
    )
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger && t.scrollTrigger.kill()
        t.kill()
      })
      gsap.set(media, { clearProps: "clipPath" })
    }
  })
}

/* Scrollspy — the three section links are targets; the brand cell is not.
   The section covering most of the middle of the viewport wins; between two
   marked sections the last one passed stays lit. Over the intro nothing is
   lit, which is correct: the reader has not entered the page yet. */
/* Dock spy: the link whose section covers most of the viewport's middle
   band (35–65%) is active; when none does, the last section passed. Nothing
   is lit over the intro. */
/* The dock has ONE state: the frosted ink pill, on every chapter. It used to
   invert over the dark ones; changing colour at every section handoff pulled
   more attention than a persistent navigation should. */
function dock() {
  const links = $$(".dock a[data-spy]")
  const targets = links.map((l) => document.getElementById(l.dataset.spy)).filter(Boolean)
  const track = () => {
    const top = innerHeight * 0.35,
      bottom = innerHeight * 0.65
    let best = null,
      bestCover = 0,
      lastPassed = null
    targets.forEach((t) => {
      const r = t.getBoundingClientRect()
      const cover = Math.max(0, Math.min(r.bottom, bottom) - Math.max(r.top, top))
      if (cover > bestCover) {
        bestCover = cover
        best = t.id
      }
      if (r.top <= innerHeight / 2) lastPassed = t.id
    })
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.spy === (best || lastPassed)))
  }
  addEventListener("scroll", track, { passive: true })
  addEventListener("resize", track)
  track()
}

/* ── Pointer-only flourishes (all additive) ─────────────────────────────── */
function magnetic() {
  if (!finePointer || reduced) return
  $$("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" })
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" })
    el.classList.add("magnetic")
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - (r.left + r.width / 2)) * 0.3)
      y((e.clientY - (r.top + r.height / 2)) * 0.3)
    })
    el.addEventListener("pointerleave", () => {
      x(0)
      y(0)
    })
  })
}

function cursor() {
  const c = $("[data-cursor]")
  if (!c || !finePointer || reduced) return
  const x = gsap.quickTo(c, "x", { duration: 0.25, ease: "power3.out" })
  const y = gsap.quickTo(c, "y", { duration: 0.25, ease: "power3.out" })
  let placed = false
  const show = () => c.classList.add("is-on")
  const hide = () => c.classList.remove("is-on")
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return
      if (!placed) {
        placed = true
        gsap.set(c, { x: e.clientX, y: e.clientY })
      }
      x(e.clientX)
      y(e.clientY)
      const t = e.target instanceof Element ? e.target : null
      c.classList.toggle("is-link", !!(t && t.closest("a, button")))
      // Every move re-shows the dot, so a blur or a leave can never strand it.
      show()
    },
    { passive: true },
  )
  document.documentElement.addEventListener("mouseleave", hide)
  window.addEventListener("blur", hide)
  document.addEventListener("visibilitychange", () => document.hidden && hide())
}

function copyAddress() {
  const btn = $("[data-copy]")
  const status = $("[data-copy-status]")
  if (!btn) return
  if (!navigator.clipboard) {
    btn.remove()
    return
  }
  let revert
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy)
      btn.dataset.done = "true"
      btn.setAttribute("aria-label", "Copied")
      status.textContent = btn.dataset.copy + " copied to the clipboard"
      clearTimeout(revert)
      revert = setTimeout(() => {
        btn.dataset.done = "false"
        btn.setAttribute("aria-label", "Copy the email address")
      }, 2000)
    } catch {
      /* the printed address still works */
    }
  })
}

/* ── Boot ───────────────────────────────────────────────────────────────── */
async function boot() {
  if (reduced) {
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
    splitAll()
  }
  // One broken part must never take the page down with it: before this guard
  // a single undefined constant in film() aborted boot and left the whole
  // page unsplit, unrevealed and unscrolled.
  try {
    film()
  } catch (e) {
    console.error("film:", e)
  }
  const introDone = intro()
  if (reduced) await introDone
  else {
    // Split the rest of the page while the intro plays, then wire the scroll.
    await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
    splitAll()
  }
  heroScroll()
  reveals()
  manifesto()
  chapterHandoff()
  floor()
  ledger()
  narrowScore()
  releaseActHold = actHold()
  mirror()
  consoleObject()
  storeImage()
  closing()
  dock()
  magnetic()
  cursor()
  copyAddress()
  ScrollTrigger.refresh()

  // Media and fonts change layout after first paint.
  $$("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true })
  })
  let lastW = innerWidth
  let t
  window.addEventListener("resize", () => {
    clearTimeout(t)
    t = setTimeout(() => {
      if (innerWidth !== lastW) {
        lastW = innerWidth
        resplitLines()
      }
      ScrollTrigger.refresh()
    }, 200)
  })
  await introDone
}

boot()

/* Teardown hook for SPA-style navigation or tests. */
window.__vagoraST = ScrollTrigger
window.__vagoraDestroy = () => {
  contexts.forEach((mm) => mm.revert())
  contexts.length = 0
  releaseActHold && releaseActHold()
  releaseActHold = null
  ScrollTrigger.getAll().forEach((s) => s.kill())
  lenis && lenis.destroy()
}
