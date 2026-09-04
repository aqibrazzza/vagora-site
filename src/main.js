import "./styles/main.css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { splitAll, resplitLines } from "./modules/split.js"

gsap.registerPlugin(ScrollTrigger)

history.scrollRestoration = "manual"
const html = document.documentElement
html.classList.add("js")
const reducedMq = matchMedia("(prefers-reduced-motion: reduce)")
const reduced = reducedMq.matches
if (reduced) html.classList.add("reduced")
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
if (!finePointer) html.classList.add("no-hover")

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]

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

/* ── The intro: curtain, film, dock ─────────────────────────────────────── */
const hero = $(".hero")
const video = $("[data-hero-video]")
const filmToggle = $("[data-film-toggle]")

const setFilmState = (playing) => {
  filmToggle.dataset.state = playing ? "playing" : "paused"
  filmToggle.setAttribute("aria-label", playing ? "Pause the film" : "Play the film")
}
filmToggle.addEventListener("click", () => {
  if (video.paused) video.play().catch(() => {})
  else video.pause()
})
video.addEventListener("play", () => setFilmState(true))
video.addEventListener("pause", () => setFilmState(false))
if (reduced) {
  // Motion off: the poster is the hero. The film is a click away.
  video.removeAttribute("autoplay")
  video.pause()
  setFilmState(false)
} else {
  video.play().catch(() => setFilmState(false))
}

/* Curtain: JS-only, so the no-JS page never has one to remove. */
function buildCurtain() {
  const c = document.createElement("div")
  c.className = "curtain"
  c.setAttribute("aria-hidden", "true")
  c.innerHTML = '<span class="mark"></span><span class="curtain__count num">00</span>'
  document.body.appendChild(c)
  return c
}

/* Three beats: the mark is read, the curtain lifts and the film takes the
   viewport, then the dock rises into place — this page has no top
   navigation, so arriving is how the dock introduces itself. */
async function intro() {
  const dock = $(".dock")
  if (reduced) {
    dock.classList.add("is-in")
    return
  }
  const curtain = buildCurtain()
  const count = $(".curtain__count", curtain)
  lenis && lenis.stop()
  window.scrollTo(0, 0)
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])

  const n = { v: 0 }
  const tl = gsap.timeline({
    onComplete: () => {
      curtain.remove()
      lenis && lenis.start()
      gsap.set(video, { clearProps: "transform" })
    },
  })
  tl.to($(".mark", curtain), { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
    .to(
      n,
      {
        v: 100,
        duration: 1.1,
        ease: "power3.inOut",
        onUpdate: () => (count.textContent = String(Math.round(n.v)).padStart(2, "0")),
      },
      0.1,
    )
    .fromTo(video, { scale: 1.08 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 1.15)
    .to(curtain, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, 1.15)
    .add(() => dock.classList.add("is-in"), 2.1)
  return tl.then()
}

/* ── Scroll choreography ────────────────────────────────────────────────── */
function heroScroll() {
  if (reduced) return
  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.set(video, { yPercent: self.progress * 18, opacity: 1 - self.progress * 0.6 })
    },
  })
}

function reveals() {
  const items = $$(".reveal")
  const heads = $$(".split-ready:not([data-scrub])")
  if (reduced) {
    items.forEach((el) => el.classList.add("is-in"))
    heads.forEach((el) => el.classList.add("is-in"))
    return
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return
        const el = en.target
        obs.unobserve(el)
        if (el.classList.contains("split-ready")) {
          const words = $$(".split-word", el)
          gsap.fromTo(
            words,
            { yPercent: 120, y: 0, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.06,
              onComplete: () => {
                el.classList.add("is-in")
                gsap.set(words, { clearProps: "transform,opacity" })
              },
            },
          )
        } else el.classList.add("is-in")
      })
    },
    { rootMargin: "0px 0px -12% 0px" },
  )
  items.forEach((el) => io.observe(el))
  heads.filter((el) => !el.closest(".hero")).forEach((el) => io.observe(el))
}

function manifesto() {
  const el = $("[data-scrub]")
  if (!el) return
  const words = $$(".split-word", el)
  if (reduced || !words.length) return
  let lit = -1
  ScrollTrigger.create({
    trigger: el,
    start: "top 78%",
    end: "bottom 45%",
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
}

/* The floor. Only the wide layout has a sticky stage, so the state machine
   only exists there (gsap.matchMedia adds and removes it as the viewport
   changes). A step becomes active the moment the top of its reading block
   crosses 72% of the viewport — before the reader reaches it — and the same
   band, crossed the other way, reactivates the earlier step. Narrow layouts
   render every state in flow with its own image and need no script. */
function floor() {
  const steps = $$("[data-steps] .step")
  const states = $$("[data-aperture] .aperture__state")
  if (!steps.length || !states.length) return
  const mm = gsap.matchMedia()
  mm.add("(min-width: 1100px) and (min-height: 600px)", () => {
    let current = 0
    let leaveTimer
    const apply = (i) => {
      steps.forEach((s, k) => s.classList.toggle("is-active", k === i))
      states.forEach((img, k) => img.classList.toggle("is-active", k === i))
    }
    const set = (i) => {
      if (i === current) return
      const prev = current
      current = i
      apply(i)
      // Only ever one state leaving, and never the incoming one: a rapid
      // sequence of changes used to leave the class stuck on an element that
      // was also active, which blanked the stage.
      states.forEach((img, k) => img.classList.toggle("is-leaving", k === prev))
      clearTimeout(leaveTimer)
      leaveTimer = setTimeout(() => states.forEach((img) => img.classList.remove("is-leaving")), 320)
    }
    const triggers = steps.map((step, i) => {
      const block = $("[data-step-block]", step) || step
      return ScrollTrigger.create({
        trigger: block,
        start: "top 72%",
        end: "bottom 28%",
        onEnter: () => set(i),
        onEnterBack: () => set(i),
      })
    })
    // Every state must be ready before the reader reaches the stage.
    const preload = ScrollTrigger.create({
      trigger: $("[data-stage]"),
      start: "top 150%",
      once: true,
      onEnter: () => states.forEach((img) => (img.loading = "eager")),
    })
    // Land on the right state if the page opens mid-chapter.
    ScrollTrigger.refresh()
    return () => {
      triggers.forEach((t) => t.kill())
      preload.kill()
      clearTimeout(leaveTimer)
      states.forEach((img) => img.classList.remove("is-leaving"))
      apply(0)
    }
  })
}

function parallax() {
  if (reduced) return
  $$("[data-parallax]").forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -14 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    )
  })
}

function counters() {
  $$("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count)
    const fmt = (v) => Math.round(v).toLocaleString("en-GB")
    if (reduced) {
      el.textContent = fmt(to)
      return
    }
    const o = { v: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(o, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => (el.textContent = fmt(o.v)) }),
    })
  })
}

/* Scrollspy — the three section links are targets; the brand cell is not.
   The section covering most of the middle of the viewport wins; between two
   marked sections the last one passed stays lit. Over the intro nothing is
   lit, which is correct: the reader has not entered the page yet. */
/* Dock spy: the link whose section covers most of the viewport's middle
   band (35–65%) is active; when none does, the last section passed. Nothing
   is lit over the intro. */
function spy() {
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

/* Act two. Act one's machine, mirrored: the media plane is sticky on the
   left and the narrative rail passes it on the right. The timing, the band
   and the swap are Act one's — a feature becomes active when the top of its
   reading block crosses 72% of the viewport, and the same band crossed the
   other way reactivates the earlier one. Narrow layouts render every state
   in flow with its own image and need no script. */
function ledger() {
  const entries = $$("[data-rail] .entry")
  const states = $$("[data-evid] .evid__state")
  if (!entries.length || !states.length) return
  const mm = gsap.matchMedia()
  mm.add("(min-width: 1100px) and (min-height: 600px)", () => {
    let current = 0
    let leaveTimer
    const apply = (i) => {
      entries.forEach((e, k) => e.classList.toggle("is-active", k === i))
      states.forEach((img, k) => img.classList.toggle("is-active", k === i))
    }
    const set = (i) => {
      if (i === current) return
      const prev = current
      current = i
      apply(i)
      // Only ever one state leaving, and never the incoming one: a rapid
      // sequence of changes used to leave the class stuck on an element that
      // was also active, which blanked the stage.
      states.forEach((img, k) => img.classList.toggle("is-leaving", k === prev))
      clearTimeout(leaveTimer)
      leaveTimer = setTimeout(() => states.forEach((img) => img.classList.remove("is-leaving")), 320)
    }
    const triggers = entries.map((entry, i) => {
      const block = $("[data-entry-block]", entry) || entry
      return ScrollTrigger.create({
        trigger: block,
        start: "top 72%",
        end: "bottom 28%",
        onEnter: () => set(i),
        onEnterBack: () => set(i),
      })
    })
    // Every state must be ready before the reader reaches the stage.
    const preload = ScrollTrigger.create({
      trigger: $("[data-ledger]"),
      start: "top 150%",
      once: true,
      onEnter: () => states.forEach((img) => (img.loading = "eager")),
    })
    ScrollTrigger.refresh()
    return () => {
      triggers.forEach((t) => t.kill())
      preload.kill()
      clearTimeout(leaveTimer)
      states.forEach((img) => img.classList.remove("is-leaving"))
      apply(0)
    }
  })
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
  floor()
  ledger()
  parallax()
  counters()
  spy()
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
window.__vagoraDestroy = () => {
  ScrollTrigger.getAll().forEach((s) => s.kill())
  lenis && lenis.destroy()
}
