/* Split text without breaking the accessible name.
   The element keeps its full text in a visually-hidden span; the visible
   words are aria-hidden duplicates. Inline markup is limited to <em>/<strong>
   (kept per word); links or other interactive markup are left unsplit. */

const KEEP = new Set(["EM", "STRONG", "I", "B"])

export function splitElement(el, mode = "words") {
  if (el.dataset.splitDone) return el
  if (el.querySelector("a, button")) return el

  const sr = document.createElement("span")
  sr.className = "visually-hidden"

  const visual = document.createElement("span")
  visual.setAttribute("aria-hidden", "true")

  // Walk child nodes so <em> words keep their styling.
  const words = []
  const walk = (node, wrapTag) => {
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        n.textContent
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => words.push({ w, wrapTag }))
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        if (n.tagName === "BR") words.push({ br: true })
        else walk(n, KEEP.has(n.tagName) ? n.tagName.toLowerCase() : wrapTag)
      }
    })
  }
  walk(el, null)
  const text = words.map((w) => (w.br ? "" : w.w)).join(" ").replace(/\s+/g, " ").trim()
  sr.textContent = text

  el.textContent = ""
  el.appendChild(sr)
  el.appendChild(visual)

  const makeWord = ({ w, wrapTag }) => {
    const s = document.createElement("span")
    s.className = "split-word"
    if (wrapTag) {
      const t = document.createElement(wrapTag)
      t.textContent = w
      s.appendChild(t)
    } else s.textContent = w
    return s
  }

  if (mode === "words") {
    words.forEach((item, i) => {
      if (item.br) {
        visual.appendChild(document.createElement("br"))
        return
      }
      visual.appendChild(makeWord(item))
      if (i < words.length - 1) visual.appendChild(document.createTextNode(" "))
    })
  } else {
    // Lines: lay words out, measure their tops, then group by line so each
    // line can clip its own words during the rise.
    const spans = words.map((item) => {
      if (item.br) {
        const br = document.createElement("br")
        visual.appendChild(br)
        return br
      }
      const s = makeWord(item)
      visual.appendChild(s)
      visual.appendChild(document.createTextNode(" "))
      return s
    })
    const lines = []
    let lastTop = null
    let forced = false
    spans.forEach((s) => {
      if (s.tagName === "BR") {
        forced = true
        return
      }
      const top = s.offsetTop
      if (lastTop === null || forced || Math.abs(top - lastTop) > 2) {
        lines.push([])
        lastTop = top
        forced = false
      }
      lines[lines.length - 1].push(s)
    })
    // Remember the authored breaks so a re-split keeps them.
    words.forEach((item, i) => {
      if (item.br && spans[i + 1] && spans[i + 1].tagName !== "BR") spans[i + 1].dataset.forced = "1"
    })
    visual.textContent = ""
    lines.forEach((line) => {
      const l = document.createElement("span")
      l.className = "split-line"
      line.forEach((s, i) => {
        l.appendChild(s)
        if (i < line.length - 1) l.appendChild(document.createTextNode(" "))
      })
      visual.appendChild(l)
    })
  }

  el.dataset.splitDone = mode
  el.classList.add("split-ready")
  return el
}

export function splitAll(root = document) {
  const els = [...root.querySelectorAll("[data-split]")]
  els.forEach((el) => splitElement(el, el.dataset.split))
  return els
}

/* Re-split the line-based ones after a resize so lines stay correct. */
export function resplitLines(root = document) {
  root.querySelectorAll('[data-split="lines"][data-split-done]').forEach((el) => {
    const sr = el.querySelector(".visually-hidden")
    const text = sr ? sr.textContent : el.textContent
    // Rebuild original inline markup from the visual words.
    const visual = el.querySelector("[aria-hidden]")
    const html = [...visual.querySelectorAll(".split-word")]
      .map((w) => (w.dataset.forced === "1" ? "<br>" : "") + w.innerHTML)
      .join(" ")
    el.innerHTML = html || text
    delete el.dataset.splitDone
    const wasIn = el.classList.contains("is-in")
    el.classList.remove("split-ready")
    splitElement(el, "lines")
    if (wasIn) el.classList.add("is-in")
  })
}
