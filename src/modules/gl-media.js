/* ───────────────────────────────────────────────────────────────────────────
   The refraction sweep — Vagora's one WebGL responsibility.

   Both acts share a single large media plane whose state changes as the
   reader passes the annotation rail. On desktop that change is not a
   crossfade: a soft vertical band travels across the plane, the UVs bend
   through a lens curve inside it, and the outgoing texture becomes the
   incoming one at the band's centre. The mirror re-rendering what it sees.

   Written against raw WebGL1 rather than Three.js on purpose: the job is one
   quad and one fragment shader, and a scene graph would cost ~150 KB gzipped
   to draw two triangles. See MOTION.md §4.

   Guarantees this module owes the rest of the page:
   · the settled image is the untouched texture — displacement is multiplied
     by sin(π·progress), which is exactly 0 at both ends;
   · nothing renders at rest. The loop starts on a transition and stops on
     settle, and an IntersectionObserver plus visibilitychange halt it;
   · no per-frame allocation, DPR capped, context loss survivable;
   · destroy() releases every GL object, listener and observer.
   ────────────────────────────────────────────────────────────────────────── */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

/* uProgress 0 → 1 drives one state change.
   uDir  +1 sweeps left→right (Act one), -1 right→left (Act two).
   uAmp  scroll-velocity boost, clamped by the caller.
   uFromCover / uToCover carry object-fit: cover as a scale+offset pair so the
   photograph is never distorted by the plane's aspect. */
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uProgress;
uniform float uDir;
uniform float uAmp;
uniform vec4 uFromCover;
uniform vec4 uToCover;

/* Two widths, and the difference between them is the whole effect.
   EDGE is where one photograph becomes the other — narrow, so there is a
   defined leading edge rather than a dissolve. LENS is the glass riding that
   edge — wider, so the bend is felt ahead of and behind the change. */
const float EDGE = 0.085;
const float LENS = 0.17;
const float PI = 3.14159265;

vec2 cover(vec2 uv, vec4 c) { return uv * c.xy + c.zw; }

void main() {
  // Read the plane in the sweep's own direction, so one shader serves both
  // acts and Act two is a true mirror rather than a second effect.
  float x = uDir > 0.0 ? vUv.x : 1.0 - vUv.x;

  float sweep = mix(-EDGE - 0.02, 1.0 + EDGE + 0.02, uProgress);
  float d = x - sweep;

  // Envelope: 0 at both ends of the transition, 1 at its middle. This is what
  // makes the resting image mathematically identical to the source texture.
  float active = sin(PI * clamp(uProgress, 0.0, 1.0));

  // A clean gaussian. No noise, no turbulence, no RGB split.
  float band = exp(-(d * d) / 0.0256) * active;

  // The lens: the surface bends toward the edge and releases behind it.
  float lens = clamp(-d / LENS, -1.0, 1.0);
  vec2 disp = vec2(lens * 0.075 * uDir, sin(vUv.y * PI) * 0.012) * band * uAmp;

  // The two photographs refract by different amounts, so the incoming one
  // settles THROUGH the outgoing one rather than sitting on top of it.
  vec4 a = texture2D(uFrom, cover(clamp(vUv + disp, 0.0, 1.0), uFromCover));
  vec4 b = texture2D(uTo, cover(clamp(vUv - disp * 0.55, 0.0, 1.0), uToCover));

  float m = 1.0 - smoothstep(sweep - EDGE, sweep + EDGE, x);

  // A whisper of lift on the edge itself — glancing light on glass.
  vec3 rgb = mix(a.rgb, b.rgb, m) + band * 0.035;
  gl_FragColor = vec4(rgb, 1.0);
}`

const compile = (gl, type, src) => {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

/* object-fit: cover expressed as the uv scale and offset the shader needs. */
const coverOf = (imgW, imgH, planeW, planeH) => {
  if (!imgW || !imgH || !planeW || !planeH) return [1, 1, 0, 0]
  const ir = imgW / imgH
  const pr = planeW / planeH
  let sx = 1
  let sy = 1
  if (ir > pr) sx = pr / ir
  else sy = ir / pr
  return [sx, sy, (1 - sx) / 2, (1 - sy) / 2]
}

/**
 * @param {HTMLElement} host   the figure the plane fills (.aperture / .evid)
 * @param {HTMLImageElement[]} images  the state images, in order
 * @param {object} opts  { dir: 1 | -1, boost: () => number }
 * @returns {{ to(i:number):void, set(i:number):void, destroy():void } | null}
 */
export function createSweep(host, images, opts = {}) {
  const dir = opts.dir === -1 ? -1 : 1
  const boost = typeof opts.boost === "function" ? opts.boost : () => 0

  const canvas = document.createElement("canvas")
  canvas.className = "sweep"
  canvas.setAttribute("aria-hidden", "true")

  const attrs = { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" }
  const gl = canvas.getContext("webgl", attrs) || canvas.getContext("experimental-webgl", attrs)
  if (!gl) return null

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    return null
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(prog, "aPos")
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const u = {
    from: gl.getUniformLocation(prog, "uFrom"),
    to: gl.getUniformLocation(prog, "uTo"),
    progress: gl.getUniformLocation(prog, "uProgress"),
    dir: gl.getUniformLocation(prog, "uDir"),
    amp: gl.getUniformLocation(prog, "uAmp"),
    fromCover: gl.getUniformLocation(prog, "uFromCover"),
    toCover: gl.getUniformLocation(prog, "uToCover"),
  }
  gl.uniform1i(u.from, 0)
  gl.uniform1i(u.to, 1)
  gl.uniform1f(u.dir, dir)

  /* One texture per state, uploaded once the image has decoded. */
  const textures = images.map(() => {
    const t = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([16, 16, 16]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  })
  const ready = images.map(() => false)
  const size = images.map(() => [0, 0])

  let planeW = 0
  let planeH = 0
  let dead = false
  let raf = 0
  let visible = true

  const upload = (i) => {
    const img = images[i]
    if (dead || ready[i] || !img.complete || !img.naturalWidth) return
    gl.bindTexture(gl.TEXTURE_2D, textures[i])
    // GL's texture origin is bottom-left and the image's is top-left; without
    // this the whole plane renders inverted.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
    } catch {
      return // a cross-origin frame would taint the context; keep the CSS path
    }
    ready[i] = true
    size[i] = [img.naturalWidth, img.naturalHeight]
  }

  images.forEach((img, i) => {
    if (img.complete) upload(i)
    else img.addEventListener("load", () => upload(i), { once: true })
  })

  const resize = () => {
    if (dead) return
    const r = host.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    const w = Math.max(1, Math.round(r.width * dpr))
    const h = Math.max(1, Math.round(r.height * dpr))
    if (w === canvas.width && h === canvas.height) return
    canvas.width = w
    canvas.height = h
    planeW = r.width
    planeH = r.height
    gl.viewport(0, 0, w, h)
    paint()
  }

  /* State. `a` is what is on screen, `b` is what it is becoming. */
  let a = 0
  let b = 0
  let progress = 1
  let amp = 1

  const bindCovers = () => {
    const ca = coverOf(size[a][0], size[a][1], planeW, planeH)
    const cb = coverOf(size[b][0], size[b][1], planeW, planeH)
    gl.uniform4f(u.fromCover, ca[0], ca[1], ca[2], ca[3])
    gl.uniform4f(u.toCover, cb[0], cb[1], cb[2], cb[3])
  }

  function paint() {
    if (dead) return
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, textures[a])
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, textures[b])
    bindCovers()
    gl.uniform1f(u.progress, progress)
    gl.uniform1f(u.amp, amp)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  /* The loop exists only while a transition is in flight. */
  let start = 0
  const DURATION = 900

  const frame = (now) => {
    if (dead) return
    const t = Math.min(1, (now - start) / DURATION)
    // A single ease: fast to take the plane, long to settle it.
    progress = 1 - Math.pow(1 - t, 3)
    paint()
    if (t < 1) {
      raf = requestAnimationFrame(frame)
    } else {
      raf = 0
      a = b
      progress = 1
      paint() // one settled frame from the incoming texture alone
    }
  }

  const stop = () => {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  const api = {
    /* Move to state i. Interrupting mid-transition snaps the outgoing state
       forward so two sweeps never fight over the plane. */
    to(i) {
      if (dead || i === b) return
      if (raf) {
        a = b
        stop()
      }
      b = i
      progress = 0
      amp = 1 + Math.min(1, Math.max(0, boost())) * 0.75
      if (!visible || document.hidden) {
        // Off screen: land on the state without spending a frame on the way.
        api.set(i)
        return
      }
      start = performance.now()
      raf = requestAnimationFrame(frame)
    },
    set(i) {
      if (dead) return
      stop()
      a = i
      b = i
      progress = 1
      amp = 1
      paint()
    },
    get canvas() {
      return canvas
    },
    destroy() {
      if (dead) return
      dead = true
      stop()
      io && io.disconnect()
      ro && ro.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      canvas.removeEventListener("webglcontextlost", onLost)
      textures.forEach((t) => gl.deleteTexture(t))
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      const lose = gl.getExtension("WEBGL_lose_context")
      lose && lose.loseContext()
      canvas.remove()
      host.classList.remove("has-sweep")
    },
  }

  const onVis = () => {
    if (document.hidden) stop()
  }
  document.addEventListener("visibilitychange", onVis)

  /* Context loss is survivable: drop the canvas and the CSS crossfade
     underneath — which never left the stylesheet — takes over. */
  const onLost = (e) => {
    e.preventDefault()
    dead = true
    stop()
    canvas.remove()
    host.classList.remove("has-sweep")
  }
  canvas.addEventListener("webglcontextlost", onLost)

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting
      if (!visible) stop()
    },
    { rootMargin: "20% 0px" },
  )
  io.observe(host)

  const ro = new ResizeObserver(resize)
  ro.observe(host)

  host.appendChild(canvas)
  host.classList.add("has-sweep")
  resize()
  api.set(0)
  return api
}
