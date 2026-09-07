/* ── The re-render ─────────────────────────────────────────────────────────
   Act one's sticky plane does not cross-fade between its five states. A wave
   of refraction travels through the frame — the way a sheet of architectural
   glass passes over a photograph — and the new state is behind it once it has
   gone. It is the Mirror re-rendering what it is looking at.

   Three things make it read as optics rather than as an effect:

   · It is bounded in space. The displacement lives inside a narrow gaussian
     band that rides the transition front; two thirds of the frame is
     mathematically untouched at any instant.
   · It is bounded in time. The whole displacement is scaled by sin(pi * p),
     so at p = 0 and p = 1 every sample is exactly the source pixel. There is
     no settling, no residue, no idle animation. The canvas is not even
     composited between transitions — the real <img> is what you look at.
   · It is directional, and it follows the momentum of the page rather than
     opposing it. Content moving up through the viewport is what scrolling
     down feels like, so scrolling down the wave RISES from the bottom edge,
     and scrolling up it FALLS from the top. Direction is taken from the
     ScrollTrigger that requested the change, not guessed from velocity, so
     it is always right.

   The same gesture opens each act: the first state is revealed inside a
   frame that is already in its final place, from the bottom up. The sticky
   container is never animated — an entrance that moves the frame has to give
   that movement back when the browser takes over the position, and the
   handover reads as the image sliding backwards.

   Everything else is restraint. No noise texture, no chromatic split, no
   ripple train — the front is bent by two low harmonics so it is a slow
   curve rather than a ruled line, and that is the whole of the variation.

   When WebGL is unavailable, or the device cannot hold the frame rate, the
   same event is authored in GSAP: the incoming state is revealed by a
   directional wipe from the same edge, resolving from a fraction oversize.
   Not a cross-fade. */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec4 uFromRect;   /* cover mapping: scale.xy, offset.zw */
uniform vec4 uToRect;
uniform float uSweep;     /* eased position of the front, along travel */
uniform float uEnv;       /* sin(pi * progress) — zero at both ends */
uniform float uDir;       /* +1 scrolling down: the wave rises. -1: it falls */
uniform float uAmp;       /* scroll-velocity modifier, tightly bounded */
uniform float uSeed;

const float PI = 3.14159265;
const float EDGE = 0.075;      /* half-width of the state boundary */
const float LENS = 0.165;      /* half-width of the refracting band */
const float CURVE = 0.013;     /* how far the front bows away from a line */
const float AXIAL = 0.024;     /* displacement along travel */
const float LATERAL = 0.0055;  /* and across it */
const float MAGNIFY = 0.010;   /* the outgoing frame swells inside the band */
const float RESOLVE = 0.007;   /* the incoming one settles down into place */
const float LIFT = 0.030;      /* glass catches a little light */

vec2 place(vec2 uv, vec4 r) { return uv * r.xy + r.zw; }

void main() {
  /* Travel axis: 0 at the leading edge, whichever edge that is. Scrolling
     down, the leading edge is the bottom — the wave travels the way the
     content itself is travelling through the viewport. */
  float axis = uDir > 0.0 ? vUv.y : 1.0 - vUv.y;
  float across = vUv.x;

  /* The front is a shallow curve, not a ruler. Two harmonics, no noise. */
  float wob = 0.62 * sin(across * PI * 2.0 * 1.15 + uSeed)
            + 0.38 * sin(across * PI * 2.0 * 2.30 + uSeed * 1.7 + 1.1);
  float front = uSweep + wob * CURVE;
  float d = axis - front;

  /* The frame holds the glass: displacement goes to nothing at the edges of
     the picture, so a sample can never leave the image and smear. */
  float guard = smoothstep(0.0, 0.065, vUv.y) * smoothstep(0.0, 0.065, 1.0 - vUv.y);

  float lens = exp(-(d * d) / (LENS * LENS * 0.36));
  float band = lens * uEnv * uAmp * guard;
  /* Signed across the front — a cylindrical lens crossing the frame. */
  float prof = clamp(-d / LENS, -1.0, 1.0) * band;

  vec2 push = vec2(wob * band * LATERAL, prof * AXIAL * (uDir > 0.0 ? 1.0 : -1.0));
  vec2 uvOut = vUv + push;
  vec2 uvIn = vUv + push * 0.45;
  uvOut = (uvOut - 0.5) * (1.0 - band * MAGNIFY) + 0.5;
  uvIn = (uvIn - 0.5) * (1.0 + band * RESOLVE) + 0.5;

  vec3 a = texture2D(uFrom, place(uvOut, uFromRect)).rgb;
  vec3 b = texture2D(uTo, place(uvIn, uToRect)).rgb;

  float m = 1.0 - smoothstep(-EDGE, EDGE, d);
  gl_FragColor = vec4(mix(a, b, m) + band * LIFT, 1.0);
}`

const DPR_CAP = 1.75
const BASE = 0.56 /* seconds — inside the 0.45–0.6 window at rest */
const FAST = 0.46 /* …and at the top of the velocity band */

/* Cover mapping, identical to `object-fit: cover` with the element's own
   `object-position`, expressed as a uv scale and offset. */
const coverRect = (nw, nh, bw, bh, posX, posY) => {
  const ia = nw / nh
  const ba = bw / bh
  if (ia > ba) {
    const sx = ba / ia
    return [sx, 1, (1 - sx) * posX, 0]
  }
  const sy = ia / ba
  // uv.y runs bottom-up; object-position is measured from the top.
  return [1, sy, 0, (1 - sy) * (1 - posY)]
}

const positionOf = (img) => {
  const raw = getComputedStyle(img).objectPosition.split(/\s+/)
  const num = (v, i) => {
    if (!v) return 0.5
    if (v.endsWith("%")) return parseFloat(v) / 100
    if (v === "left" || v === "top") return 0
    if (v === "right" || v === "bottom") return 1
    if (v === "center") return 0.5
    // A length: resolve against the box on the axis it belongs to.
    const px = parseFloat(v)
    const box = i === 0 ? img.clientWidth : img.clientHeight
    const nat = i === 0 ? img.naturalWidth : img.naturalHeight
    return nat === box ? 0.5 : px / (nat - box || 1)
  }
  return [num(raw[0], 0), num(raw[1], 1)]
}

const compile = (gl, type, src) => {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader")
  return s
}

/* Upload at about the resolution the frame is actually shown at, so the
   moment the canvas is swapped in for the <img> — and back out again — there
   is no change in sharpness to see.

   A state shown `contain` on its own ground (act two's interface capture,
   which must never be cropped) is composited onto that ground here, at the
   frame's own aspect. The shader then treats every state identically: the
   letterbox is part of the picture, and the glass bends it like anything
   else instead of having to know about fit at all. */
const upload = (gl, tex, img, targetW, fit) => {
  let source = img
  if (fit && fit.contain) {
    const c = document.createElement("canvas")
    c.width = Math.max(2, Math.round(targetW))
    c.height = Math.max(2, Math.round((targetW * fit.boxH) / fit.boxW))
    const ctx = c.getContext("2d")
    ctx.fillStyle = fit.ground
    ctx.fillRect(0, 0, c.width, c.height)
    const s = Math.min(c.width / img.naturalWidth, c.height / img.naturalHeight)
    const w = img.naturalWidth * s
    const h = img.naturalHeight * s
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h)
    source = c
  } else if (targetW && targetW < img.naturalWidth * 0.92) {
    const c = document.createElement("canvas")
    c.width = Math.max(2, Math.round(targetW))
    c.height = Math.max(2, Math.round((targetW * img.naturalHeight) / img.naturalWidth))
    const ctx = c.getContext("2d")
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, 0, 0, c.width, c.height)
    source = c
  }
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source)
}

export function createMediaTransition({ mount, images, gsap }) {
  if (!mount || images.length < 2) return null

  let engine = "clip"
  let gl = null
  let canvas = null
  let prog = null
  let buf = null
  let textures = []
  const loc = {}

  /* ── Shared state ─────────────────────────────────────────────────────── */
  let shown = 0
  let target = 0
  let fromIdx = 0
  let running = false
  let raf = 0
  let p = 0
  let dir = 1
  let amp = 1
  let seed = 0
  let dur = BASE
  let t0 = 0
  let last = 0
  let spans = []
  let slowRuns = 0
  let visible = true
  let disposed = false
  let decoded = false
  let retired = false
  let clipTl = null

  const dpr = () => Math.min(window.devicePixelRatio || 1, DPR_CAP)

  /* The engine owns the plane's compositing outright, so the CSS cross-fade
     and this can never both be driving opacity. */
  mount.classList.add("is-scripted")
  const paint = (i) => {
    images.forEach((el, k) => {
      el.classList.toggle("is-active", k === i)
      el.classList.remove("is-leaving")
      el.style.opacity = k === i ? "1" : "0"
      el.style.zIndex = k === i ? "1" : "0"
      el.style.clipPath = ""
      el.style.transform = ""
    })
  }
  paint(0)

  /* ── WebGL ────────────────────────────────────────────────────────────── */
  const initGL = () => {
    canvas = document.createElement("canvas")
    canvas.className = "media__gl"
    canvas.setAttribute("aria-hidden", "true")
    gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    })
    if (!gl) throw new Error("no webgl")
    if (gl.getParameter(gl.MAX_TEXTURE_SIZE) < 2048) throw new Error("texture size")

    prog = gl.createProgram()
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link")
    gl.useProgram(prog)
    ;["uFrom", "uTo", "uFromRect", "uToRect", "uSweep", "uEnv", "uDir", "uAmp", "uSeed"].forEach(
      (n) => (loc[n] = gl.getUniformLocation(prog, n)),
    )
    gl.uniform1i(loc.uFrom, 0)
    gl.uniform1i(loc.uTo, 1)

    buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    textures = images.map(() => {
      const t = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      return t
    })
    canvas.addEventListener("webglcontextlost", onLost, false)
    mount.appendChild(canvas)
    engine = "gl"
  }

  let rects = []
  let fits = []
  let texW = 0
  let texAspect = 0
  const measure = () => {
    const w = mount.clientWidth
    const h = mount.clientHeight
    if (!w || !h) return false
    fits = images.map((img) => {
      const cs = getComputedStyle(img)
      if (cs.objectFit !== "contain") return null
      const bg = cs.backgroundColor
      return { contain: true, boxW: w, boxH: h, ground: bg && bg !== "rgba(0, 0, 0, 0)" ? bg : "#000" }
    })
    rects = images.map((img, i) => {
      // A contained state is composited onto its ground at the frame's aspect,
      // so by the time it reaches the shader it fills the frame exactly.
      if (fits[i]) return [1, 1, 0, 0]
      const [px, py] = positionOf(img)
      return coverRect(img.naturalWidth || 1920, img.naturalHeight || 1080, w, h, px, py)
    })
    if (engine !== "gl") return true
    canvas.width = Math.round(w * dpr())
    canvas.height = Math.round(h * dpr())
    gl.viewport(0, 0, canvas.width, canvas.height)
    // Only the visible fraction of a cover texture is stretched across the box.
    const cover = rects.find((r, i) => !fits[i]) || [1]
    const want = Math.ceil((w * dpr()) / Math.max(0.2, cover[0]))
    const aspect = w / h
    if (!texW || Math.abs(want - texW) / texW > 0.15 || Math.abs(aspect - texAspect) > 0.02) {
      texW = want
      texAspect = aspect
      images.forEach((img, i) => upload(gl, textures[i], img, texW, fits[i]))
    }
    return true
  }

  const draw = () => {
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2 // power2.inOut
    gl.uniform1f(loc.uSweep, -0.22 + eased * 1.44)
    gl.uniform1f(loc.uEnv, Math.sin(Math.PI * Math.min(1, Math.max(0, p))))
    gl.uniform1f(loc.uDir, dir)
    gl.uniform1f(loc.uAmp, amp)
    gl.uniform1f(loc.uSeed, seed)
    gl.uniform4fv(loc.uFromRect, rects[fromIdx])
    gl.uniform4fv(loc.uToRect, rects[target])
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, textures[fromIdx])
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, textures[target])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  const finish = () => {
    running = false
    p = 1
    if (engine === "gl") {
      draw()
      canvas.style.opacity = "0"
      // Three consecutive waves the device could not hold at ~24fps and the
      // canvas is retired for the session — the authored wipe is better than a
      // stuttering one. The median, not the mean: a single stalled frame from
      // something else on the page is not evidence about the device.
      const s = spans.slice(2).sort((a, z) => a - z)
      const med = s.length ? s[s.length >> 1] : 0
      slowRuns = med > 42 ? slowRuns + 1 : 0
      if (slowRuns >= 3) demote()
    }
    shown = target
    fromIdx = target
    paint(shown)
  }

  const tick = (now) => {
    if (!running) return
    spans.push(now - last)
    last = now
    p = Math.min(1, (now - t0) / (dur * 1000))
    draw()
    if (p >= 1) finish()
    else raf = requestAnimationFrame(tick)
  }

  /* ── The authored fallback ────────────────────────────────────────────── */
  const clipRun = (to, from) => {
    // Same rule as the wave: scrolling down it opens from the bottom.
    const edge = dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)"
    clipTl && clipTl.kill()
    gsap.killTweensOf(images)
    images.forEach((el, k) => {
      el.style.zIndex = k === to ? "2" : k === from ? "1" : "0"
      el.style.opacity = k === to || k === from ? "1" : "0"
      if (k !== to && k !== from) el.style.clipPath = ""
    })
    gsap.set(images[to], { clipPath: edge, scale: 1.014, transformOrigin: "50% 50%" })
    gsap.set(images[from], { clipPath: "inset(0% 0% 0% 0%)", scale: 1 })
    running = true
    clipTl = gsap
      .timeline({
        onComplete: () => {
          running = false
          shown = target
          fromIdx = target
          gsap.set(images, { clearProps: "clipPath,transform" })
          paint(shown)
          maybeInit()
        },
      })
      .to(images[to], { clipPath: "inset(0% 0% 0% 0%)", duration: dur, ease: "power2.out" }, 0)
      .to(images[to], { scale: 1, duration: dur * 1.2, ease: "power2.out" }, 0)
  }

  const demote = () => {
    engine = "clip"
    retired = true
    teardownGL()
  }

  /* Promote to the canvas as soon as it is safe to: every state decoded, no
     wave in flight, and the plane has a box. Never mid-transition. */
  const maybeInit = () => {
    if (disposed || retired || running || engine === "gl" || !decoded) return
    if (!mount.clientWidth) return
    try {
      initGL()
      if (!measure()) throw new Error("no box")
    } catch {
      teardownGL()
      engine = "clip"
      retired = true
      measure()
    }
  }

  const teardownGL = () => {
    if (!gl) return
    cancelAnimationFrame(raf)
    canvas.removeEventListener("webglcontextlost", onLost)
    textures.forEach((t) => gl.deleteTexture(t))
    gl.deleteBuffer(buf)
    gl.deleteProgram(prog)
    const lose = gl.getExtension("WEBGL_lose_context")
    lose && lose.loseContext()
    canvas.remove()
    gl = null
    canvas = null
    textures = []
  }

  function onLost(e) {
    e.preventDefault()
    demote()
    if (running) {
      running = false
      shown = target
      fromIdx = target
      paint(shown)
    }
  }

  /* ── The entrance ─────────────────────────────────────────────────────────
     The frame is already where it will stay — sticky owns its position, and
     nothing here writes to the element sticky is holding. What is revealed is
     the picture inside it, from the bottom up, which is the direction the
     page is travelling. The image resolves down from 1.6% oversize as it
     comes, so it arrives rather than being uncovered. */
  let revealing = false
  const clearReveal = () => {
    if (!revealing) return
    revealing = false
    mount.style.clipPath = ""
    images.forEach((el) => (el.style.transform = ""))
  }
  const reveal = (t) => {
    if (disposed || running) return
    const q = Math.min(1, Math.max(0, t))
    if (q >= 1) return clearReveal()
    revealing = true
    mount.style.clipPath = `inset(${((1 - q) * 100).toFixed(2)}% 0% 0% 0%)`
    images[shown].style.transform = `scale(${(1 + 0.016 * (1 - q)).toFixed(4)})`
  }

  /* ── The request ──────────────────────────────────────────────────────── */
  const set = (i, direction, velocity) => {
    if (disposed || i === target || i < 0 || i >= images.length) return
    // A state change supersedes the entrance outright: the reader has gone
    // past it, and two systems must never share the frame.
    clearReveal()
    const d = direction >= 0 ? 1 : -1
    const speed = Math.min(1, Math.max(0, (Math.abs(velocity || 0) - 800) / 3200))

    // Offscreen or hidden: the state still changes, it just does not perform.
    if (!visible || document.hidden) {
      if (running) {
        running = false
        cancelAnimationFrame(raf)
        clipTl && clipTl.kill()
      }
      shown = target = fromIdx = i
      if (canvas) canvas.style.opacity = "0"
      gsap.set(images, { clearProps: "clipPath,transform" })
      paint(i)
      return
    }

    dur = BASE - (BASE - FAST) * speed
    amp = 1 + speed * 0.3
    seed = i * 1.7 + 0.4

    if (running) {
      if (i === fromIdx) {
        // A reversal is exact: swap the ends and run the same wave back.
        const back = target
        target = i
        fromIdx = back
        dir = d
        p = 1 - p
        if (engine === "gl") {
          t0 = performance.now() - p * dur * 1000
          last = performance.now()
          return
        }
        return clipRun(target, fromIdx)
      }
      if (engine === "gl" && p < 0.5) {
        // The incoming state has barely been seen. Change what is arriving.
        target = i
        return
      }
      // Past the midpoint the arriving state is what is on screen: it becomes
      // the outgoing one and a fresh wave starts. Never a stack of tweens.
      fromIdx = target
    } else {
      fromIdx = shown
    }

    target = i
    dir = d

    if (engine === "gl") {
      p = 0
      draw()
      canvas.style.opacity = "1"
      images.forEach((el, k) => {
        el.classList.toggle("is-active", k === i)
        el.style.opacity = k === i ? "1" : "0"
        el.style.zIndex = k === i ? "1" : "0"
      })
      running = true
      spans = []
      t0 = last = performance.now()
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
      return
    }
    images.forEach((el, k) => el.classList.toggle("is-active", k === i))
    clipRun(target, fromIdx)
  }

  /* ── Lifecycle ────────────────────────────────────────────────────────── */
  let io = null
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((es) => (visible = es[0].isIntersecting), { rootMargin: "20%" })
    io.observe(mount)
  }
  const onHidden = () => {
    if (document.hidden && running && engine === "gl") {
      cancelAnimationFrame(raf)
      finish()
    }
  }
  document.addEventListener("visibilitychange", onHidden)

  let resizeTimer
  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (!disposed) measure()
    }, 200)
  }
  window.addEventListener("resize", onResize)

  /* Every state is decoded before the canvas exists, so a transition never
     waits on a download and a texture upload never lands mid-wave. Until they
     are, the authored wipe is the engine — it needs nothing but the DOM.

     The stage asks for this when the reader is approaching it, NOT when the
     engine is built. Built at boot it fetched and decoded every state in BOTH
     acts during the intro — act two's are eight screens down — which put most
     of a megabyte of imagery in front of the hero film that is the first
     viewport. One call, idempotent, and the authored wipe covers the gap. */
  let primed = false
  const prime = () => {
    if (primed || disposed) return
    primed = true
    const decodeAll = images.map((img) => {
      img.loading = "eager"
      return img.decode ? img.decode().catch(() => {}) : Promise.resolve()
    })
    Promise.all(decodeAll).then(() => {
      if (disposed) return
      decoded = true
      maybeInit()
    })
  }
  measure()

  return {
    engine: () => engine,
    prime,
    set,
    reveal,
    destroy() {
      disposed = true
      clearReveal()
      mount.style.clipPath = ""
      cancelAnimationFrame(raf)
      clipTl && clipTl.kill()
      gsap.killTweensOf(images)
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onHidden)
      io && io.disconnect()
      teardownGL()
      mount.classList.remove("is-scripted")
      images.forEach((el) => {
        el.style.opacity = ""
        el.style.zIndex = ""
        el.style.clipPath = ""
        el.style.transform = ""
        el.classList.remove("is-leaving")
      })
    },
  }
}
