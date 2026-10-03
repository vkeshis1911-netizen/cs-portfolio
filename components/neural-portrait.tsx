"use client"

import { useEffect, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"

const W = 520
const H = 480
const CX = W / 2
const CY = 232
const R = 124
const FOCAL = 760

const LAYERS = [
  { size: 6, x: -196, gap: 44, name: "input", detail: "patches", color: [56, 189, 248] },
  { size: 9, x: -66, gap: 34, name: "dense_1", detail: "9 · relu", color: [34, 211, 238] },
  { size: 9, x: 66, gap: 34, name: "dense_2", detail: "9 · relu", color: [45, 212, 191] },
  { size: 5, x: 196, gap: 46, name: "output", detail: "5 · sigmoid", color: [52, 211, 153] },
]
const HOPS = LAYERS.length - 1

const GRID = 14
const TILE = (2 * R) / GRID
const PHOTO_SIZE = 512
const WAVES = 4
const BOOT = 1.2
const SPACING = 0.6
const HOP = 0.55
const PULSE = 0.42
const JITTER = 0.08
const ENTRY = 0.7
const ARRIVED = BOOT + (WAVES - 1) * SPACING + (HOPS - 1) * HOP + JITTER + PULSE * 1.06
const DECODE = ARRIVED + 0.4
const SPREAD = 0.8
const FLIGHT = 1
const ASSEMBLED = DECODE + SPREAD + 0.12 + FLIGHT
const REVEAL_START = ASSEMBLED + 0.15
const REVEAL = 1
const COMPLETE = REVEAL_START + REVEAL
const RING_START = ASSEMBLED + 0.35
const RING = 1.3
const IDLE = ASSEMBLED + 2
const IDLE_PERIOD = 2.6
const RESTING = IDLE - 0.05
const RECEDE = 130

type Neuron = { layer: number; x: number; y: number; z: number; seed: number }
type Edge = { from: number; to: number; layer: number; delay: number; duration: number; seed: number }
type Tile = {
  sx: number; sy: number; tx: number; ty: number; wave: number; lag: number
  route: number[]; edges: number[]; entry: [number, number, number]
  orbit: number; phase: number; speed: number; launch: number; bend: number
}
type Wave = { start: number; amp: number; cycle: number }

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
const smooth = (x: number) => { x = clamp01(x); return x * x * (3 - 2 * x) }
const easeOut = (x: number) => 1 - (1 - clamp01(x)) ** 3
const easeInOut = (x: number) => { x = clamp01(x); return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2 }
const hash = (a: number, b: number) => { const s = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453; return s - Math.floor(s) }
const envelope = (x: number) => (x < -0.15 ? 0 : x < 0 ? 1 + x / 0.15 : Math.exp(-x * 3.2))

function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildNetwork() {
  const rand = random(7)
  const neurons: Neuron[] = []
  const layerStart: number[] = []
  LAYERS.forEach((layer, l) => {
    layerStart.push(neurons.length)
    for (let i = 0; i < layer.size; i++) {
      const y = (i - (layer.size - 1) / 2) * layer.gap
      neurons.push({ layer: l, x: layer.x, y, z: -38 * (1 - (y / 150) ** 2), seed: rand() })
    }
  })
  const edges: Edge[] = []
  const edgeIndex = new Map<number, number>()
  for (let l = 0; l < HOPS; l++) {
    for (let a = 0; a < LAYERS[l].size; a++) {
      for (let b = 0; b < LAYERS[l + 1].size; b++) {
        const from = layerStart[l] + a
        const to = layerStart[l + 1] + b
        edgeIndex.set(from * 64 + to, edges.length)
        edges.push({ from, to, layer: l, delay: rand() * JITTER, duration: PULSE * (0.92 + rand() * 0.14), seed: rand() })
      }
    }
  }

  const tiles: Tile[] = []
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const tx = CX - R + (col + 0.5) * TILE
      const ty = CY - R + (row + 0.5) * TILE
      const distance = Math.hypot(tx - CX, ty - CY)
      if (distance > R + TILE * 0.35) continue
      const route = LAYERS.map((layer, l) => layerStart[l] + Math.floor(rand() * layer.size))
      route[HOPS] = layerStart[HOPS] + Math.min(LAYERS[HOPS].size - 1, Math.floor((row / GRID) * LAYERS[HOPS].size))
      tiles.push({
        sx: (col / GRID) * PHOTO_SIZE, sy: (row / GRID) * PHOTO_SIZE, tx, ty, wave: 0, lag: rand() * 0.3,
        route, edges: route.slice(0, HOPS).map((from, l) => edgeIndex.get(from * 64 + route[l + 1])!),
        entry: [-330, (rand() - 0.5) * 300, (rand() - 0.5) * 120],
        orbit: 13 + rand() * 22, phase: rand() * Math.PI * 2, speed: (0.9 + rand() * 0.9) * (rand() < 0.5 ? -1 : 1),
        launch: DECODE + SPREAD * Math.min(1, distance / R) + rand() * 0.12, bend: 0.22 + rand() * 0.22,
      })
    }
  }
  const order = tiles.map((_, i) => i).sort(() => rand() - 0.5)
  order.forEach((tileIndex, i) => { tiles[tileIndex].wave = i % WAVES })
  return { neurons, edges, tiles }
}

function makeGlow(r: number, g: number, b: number) {
  const sprite = document.createElement("canvas")
  sprite.width = sprite.height = 96
  const ctx = sprite.getContext("2d")!
  const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 48)
  gradient.addColorStop(0, `rgba(${r},${g},${b},0.9)`)
  gradient.addColorStop(0.22, `rgba(${r},${g},${b},0.38)`)
  gradient.addColorStop(0.55, `rgba(${r},${g},${b},0.08)`)
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 96, 96)
  return sprite
}

function makePortraits(image: HTMLImageElement) {
  const photo = document.createElement("canvas")
  photo.width = photo.height = PHOTO_SIZE
  const photoCtx = photo.getContext("2d")!
  const side = Math.min(image.naturalWidth, image.naturalHeight)
  photoCtx.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, PHOTO_SIZE, PHOTO_SIZE)

  const holo = document.createElement("canvas")
  holo.width = holo.height = PHOTO_SIZE
  const holoCtx = holo.getContext("2d")!
  const pixels = photoCtx.getImageData(0, 0, PHOTO_SIZE, PHOTO_SIZE)
  const data = pixels.data
  const stops = [[0, 2, 8, 18], [0.35, 6, 52, 84], [0.65, 14, 140, 190], [0.85, 80, 210, 240], [1, 225, 255, 248]]
  for (let i = 0; i < data.length; i += 4) {
    const l = clamp01(((0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255 - 0.04) / 0.85)
    let s = 1
    while (s < stops.length - 1 && stops[s][0] < l) s++
    const [p0, r0, g0, b0] = stops[s - 1]
    const [p1, r1, g1, b1] = stops[s]
    const f = (l - p0) / (p1 - p0)
    const scan = ((i / 4 / PHOTO_SIZE) | 0) % 4 === 0 ? 0.72 : 1
    data[i] = (r0 + (r1 - r0) * f) * scan
    data[i + 1] = (g0 + (g1 - g0) * f) * scan
    data[i + 2] = (b0 + (b1 - b0) * f) * scan
  }
  holoCtx.putImageData(pixels, 0, 0)
  return { photo, holo }
}

export function NeuralPortrait() {
  const host = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const lossRef = useRef<HTMLSpanElement>(null)
  const replayRef = useRef<HTMLButtonElement>(null)
  const restart = useRef(() => {})
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = host.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const { neurons, edges, tiles } = buildNetwork()
    const glows = LAYERS.map(({ color: [r, g, b] }) => makeGlow(r, g, b))
    const white = makeGlow(225, 250, 255)
    const rgb = LAYERS.map(({ color }) => color.join(","))
    const px = new Float32Array(neurons.length)
    const py = new Float32Array(neurons.length)
    const pk = new Float32Array(neurons.length)
    const activation = new Float32Array(neurons.length)
    const mode = new Uint8Array(tiles.length)
    const tileX = new Float32Array(tiles.length)
    const tileY = new Float32Array(tiles.length)
    const tileSize = new Float32Array(tiles.length)
    const tileAlpha = new Float32Array(tiles.length)
    const dustRand = random(21)
    const dust = Array.from({ length: 56 }, () => ({
      x: dustRand() * 640, y: (dustRand() - 0.5) * 460, z: -180 + dustRand() * 520, speed: 5 + dustRand() * 12, seed: dustRand(),
    }))
    const waves: Wave[] = []
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let portraits: ReturnType<typeof makePortraits> | null = null
    let disposed = false
    let frame = 0
    let scale = 1
    let dpr = 1
    let t = reduced ? RESTING : 0
    let time = 0
    let last = 0
    let visible = true
    let lastStatus = ""
    let lastHud = -1
    let cosY = 1, sinY = 0, cosP = 1, sinP = 0, depth = 0
    const point = { x: 0, y: 0, k: 1 }

    const project = (x: number, y: number, z: number) => {
      const x1 = x * cosY + z * sinY
      const z1 = -x * sinY + z * cosY
      const y1 = y * cosP - z1 * sinP
      const z2 = y * sinP + z1 * cosP + depth
      const k = FOCAL / (FOCAL + z2)
      point.x = CX + x1 * k
      point.y = CY + y1 * k
      point.k = k
      return point
    }
    const sprite = (image: HTMLCanvasElement, x: number, y: number, size: number, alpha: number) => {
      if (alpha <= 0.002) return
      ctx.globalAlpha = Math.min(1, alpha)
      ctx.drawImage(image, x - size / 2, y - size / 2, size, size)
    }

    const render = () => {
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const boot = smooth(t / BOOT)
      const recede = smooth((t - DECODE - 0.2) / 1.6)
      const fade = 1 - 0.45 * recede
      const yaw = -0.34 + 0.14 * smooth(t / DECODE) + 0.1 * recede + 0.035 * Math.sin(time * 0.23) + pointer.x * 0.22
      const pitch = 0.1 + 0.025 * Math.sin(time * 0.17) - pointer.y * 0.14
      cosY = Math.cos(yaw); sinY = Math.sin(yaw); cosP = Math.cos(pitch); sinP = Math.sin(pitch)
      depth = RECEDE * recede
      const settle = smooth((t - COMPLETE) / 1.2)
      const offX = -pointer.x * 8
      const offY = -pointer.y * 6 + Math.sin(time * 0.9) * 3 * settle
      const cx = CX + offX
      const cy = CY + offY

      waves.length = 0
      for (let k = 0; k < WAVES; k++) {
        const start = BOOT + k * SPACING
        if (t > start - 0.3 && t < start + HOPS * HOP + 1.5) waves.push({ start, amp: 1, cycle: -1 })
      }
      if (t > IDLE - 0.3) {
        const first = Math.max(0, Math.floor((t - IDLE - HOPS * HOP - 1.5) / IDLE_PERIOD))
        for (let m = first; m <= Math.floor((t - IDLE + 0.3) / IDLE_PERIOD); m++) waves.push({ start: IDLE + m * IDLE_PERIOD, amp: 0.5, cycle: m })
      }

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        project(n.x, n.y, n.z)
        px[i] = point.x; py[i] = point.y; pk[i] = point.k
        let a = 0
        for (const w of waves) a += w.amp * (w.cycle < 0 ? 1 : 0.7) * envelope(t - w.start - n.layer * HOP)
        if (n.layer === HOPS) {
          a += t < DECODE ? 0.4 * smooth((t - BOOT - 1.5) / (DECODE - BOOT - 1.5)) : 0.4 * Math.exp(-(t - DECODE) * 3)
          a += 1.2 * envelope(t - DECODE)
        }
        activation[i] = Math.min(a, 1.4)
      }

      ctx.globalCompositeOperation = "lighter"
      ctx.lineCap = "round"

      for (const d of dust) {
        const x = ((d.x + time * d.speed) % 640) - 320
        project(x, d.y, d.z)
        const alpha = boot * (0.12 + 0.22 * d.seed) * point.k * (0.6 + 0.4 * Math.sin(time * 0.8 + d.seed * 20))
        ctx.globalAlpha = Math.max(0, alpha)
        ctx.fillStyle = "rgb(125,211,252)"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 0.9 * point.k, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e]
        const grow = smooth((t - 0.15 - edge.layer * 0.24 - edge.seed * 0.35) / 0.55)
        if (grow <= 0) continue
        let heat = 0
        for (const w of waves) {
          if (w.cycle >= 0 && hash(e, w.cycle) > 0.35) continue
          const x = t - (w.start + edge.layer * HOP + edge.delay)
          if (x >= 0 && x < edge.duration + 0.4) heat += w.amp * (x < edge.duration ? 1 : 1 - (x - edge.duration) / 0.4)
        }
        heat = Math.min(heat, 1)
        const ax = px[edge.from], ay = py[edge.from]
        ctx.strokeStyle = `rgba(${rgb[edge.layer]},${(0.075 + 0.2 * heat) * grow * fade})`
        ctx.lineWidth = 0.7 + 0.5 * heat
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(ax + (px[edge.to] - ax) * grow, ay + (py[edge.to] - ay) * grow)
        ctx.stroke()
      }

      for (const w of waves) {
        for (let e = 0; e < edges.length; e++) {
          if (w.cycle >= 0 && hash(e, w.cycle) > 0.35) continue
          const edge = edges[e]
          const x = t - (w.start + edge.layer * HOP + edge.delay)
          if (x < 0 || x > edge.duration) continue
          const s = 0.5 - 0.5 * Math.cos(Math.PI * (x / edge.duration))
          const ax = px[edge.from], ay = py[edge.from], dx = px[edge.to] - ax, dy = py[edge.to] - ay
          const hx = ax + dx * s, hy = ay + dy * s
          const tail = Math.max(0, s - 0.2)
          const k = pk[edge.from] + (pk[edge.to] - pk[edge.from]) * s
          const alpha = w.amp * fade
          const gradient = ctx.createLinearGradient(ax + dx * tail, ay + dy * tail, hx, hy)
          gradient.addColorStop(0, `rgba(${rgb[edge.layer + 1]},0)`)
          gradient.addColorStop(1, `rgba(${rgb[edge.layer + 1]},${0.85 * alpha})`)
          ctx.globalAlpha = 1
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5 * k
          ctx.beginPath()
          ctx.moveTo(ax + dx * tail, ay + dy * tail)
          ctx.lineTo(hx, hy)
          ctx.stroke()
          sprite(glows[edge.layer + 1], hx, hy, 13 * k, 0.75 * alpha)
          sprite(white, hx, hy, 4.5 * k, 0.9 * alpha)
        }
      }

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        const appear = smooth((t - 0.05 - n.layer * 0.2 - n.seed * 0.15) / 0.45)
        if (appear <= 0) continue
        const a = activation[i], lit = Math.min(a, 1), k = pk[i], f = appear * fade
        sprite(glows[n.layer], px[i], py[i], (26 + 40 * a) * k, (0.28 + 0.55 * lit) * f)
        ctx.globalAlpha = 1
        ctx.strokeStyle = `rgba(${rgb[n.layer]},${(0.45 + 0.5 * lit) * f})`
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.arc(px[i], py[i], 6 * k, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = `rgba(225,250,255,${(0.35 + 0.65 * lit) * f})`
        ctx.beginPath()
        ctx.arc(px[i], py[i], (2.2 + 1.2 * lit) * k, 0, Math.PI * 2)
        ctx.fill()
        if (lit > 0.04) {
          const angle = time * 1.6 + n.seed * 6
          ctx.strokeStyle = `rgba(${rgb[n.layer]},${0.7 * lit * f})`
          ctx.beginPath()
          ctx.arc(px[i], py[i], 10.5 * k, angle, angle + 1.3)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(px[i], py[i], 10.5 * k, angle + Math.PI, angle + Math.PI + 0.6)
          ctx.stroke()
        }
        if (n.layer === HOPS) {
          const burst = (t - DECODE) / 0.8
          if (burst > 0 && burst < 1) {
            ctx.strokeStyle = `rgba(${rgb[n.layer]},${0.6 * (1 - burst) ** 2})`
            ctx.beginPath()
            ctx.arc(px[i], py[i], (8 + 38 * easeOut(burst)) * k, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      }

      const labelAlpha = 0.75 * boot * (1 - recede)
      if (labelAlpha > 0.01) {
        ctx.globalCompositeOperation = "source-over"
        ctx.globalAlpha = 1
        ctx.textAlign = "center"
        const size = Math.max(9.5, 8 / scale)
        LAYERS.forEach((layer, l) => {
          project(layer.x, 178, 0)
          const appear = smooth((t - 0.2 - l * 0.2) / 0.5)
          ctx.font = `500 ${size}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
          ctx.fillStyle = `rgba(186,230,253,${labelAlpha * appear})`
          ctx.fillText(layer.name, point.x, point.y)
          ctx.fillStyle = `rgba(148,163,184,${0.7 * labelAlpha * appear})`
          ctx.fillText(layer.detail, point.x, point.y + size * 1.35)
        })
      }

      if (!portraits) return
      const { photo, holo } = portraits
      const reveal = clamp01((t - REVEAL_START) / REVEAL)
      const scanY = cy - R - 6 + (2 * R + 12) * easeInOut(reveal)

      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i]
        mode[i] = 0
        if (t >= tile.launch + FLIGHT) { mode[i] = 2; continue }
        const start = BOOT + tile.wave * SPACING
        const arriveInput = start - tile.lag
        if (t < arriveInput - ENTRY) continue
        const n0 = tile.route[0]
        let x = px[n0], y = py[n0], size = 7, alpha = 1
        if (t < arriveInput) {
          const u = (t - arriveInput + ENTRY) / ENTRY
          project(tile.entry[0], tile.entry[1], tile.entry[2])
          const s = easeOut(u)
          x = point.x + (px[n0] - point.x) * s
          y = point.y + (py[n0] - point.y) * s
          alpha = smooth(u * 2.5)
        } else {
          let hop = 0
          for (; hop < HOPS; hop++) {
            const edge = edges[tile.edges[hop]]
            const begin = start + hop * HOP + edge.delay
            if (t < begin) { alpha = 0.55; break }
            const u = (t - begin) / edge.duration
            const a = tile.route[hop], b = tile.route[hop + 1]
            if (u < 1) {
              const s = 0.5 - 0.5 * Math.cos(Math.PI * u)
              x = px[a] + (px[b] - px[a]) * s
              y = py[a] + (py[b] - py[a]) * s
              break
            }
            x = px[b]; y = py[b]
          }
          if (hop === HOPS) {
            const out = tile.route[HOPS]
            const lastEdge = edges[tile.edges[HOPS - 1]]
            const arrived = start + (HOPS - 1) * HOP + lastEdge.delay + lastEdge.duration
            const radius = tile.orbit * easeOut((t - arrived) / 0.6) * pk[out]
            const angle = tile.phase + tile.speed * t
            const ox = px[out] + Math.cos(angle) * radius
            const oy = py[out] + Math.sin(angle) * radius * 0.6
            size = 6
            x = ox; y = oy
            if (t >= tile.launch) {
              const s = easeInOut((t - tile.launch) / FLIGHT)
              const ex = tile.tx + offX, ey = tile.ty + offY
              const mx = (ox + ex) / 2 - (ey - oy) * tile.bend
              const my = (oy + ey) / 2 + (ex - ox) * tile.bend
              x = (1 - s) ** 2 * ox + 2 * (1 - s) * s * mx + s * s * ex
              y = (1 - s) ** 2 * oy + 2 * (1 - s) * s * my + s * s * ey
              size = 6 + (TILE - 7) * s * s
            }
          }
        }
        mode[i] = 1
        tileX[i] = x; tileY[i] = y; tileSize[i] = size; tileAlpha[i] = alpha
      }

      ctx.globalCompositeOperation = "source-over"
      if (reveal < 1) {
        ctx.save()
        if (reveal > 0) {
          ctx.beginPath()
          ctx.rect(0, scanY, W, H)
          ctx.clip()
        }
        ctx.globalAlpha = 0.95
        const inset = 0.6
        for (let i = 0; i < tiles.length; i++) {
          if (mode[i] !== 2) continue
          const tile = tiles[i]
          ctx.drawImage(holo, tile.sx, tile.sy, PHOTO_SIZE / GRID, PHOTO_SIZE / GRID,
            tile.tx + offX - TILE / 2 + inset, tile.ty + offY - TILE / 2 + inset, TILE - inset * 2, TILE - inset * 2)
        }
        ctx.restore()
      }
      if (reveal > 0) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, R, 0, Math.PI * 2)
        ctx.clip()
        if (reveal < 1) {
          ctx.beginPath()
          ctx.rect(0, 0, W, scanY)
          ctx.clip()
        }
        ctx.globalAlpha = 1
        ctx.drawImage(photo, cx - R, cy - R, R * 2, R * 2)
        const vignette = ctx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R)
        vignette.addColorStop(0, "rgba(3,10,20,0)")
        vignette.addColorStop(1, "rgba(3,14,26,0.5)")
        ctx.fillStyle = vignette
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2)
        ctx.restore()
      }

      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < tiles.length; i++) {
        if (mode[i] === 1) sprite(glows[1], tileX[i], tileY[i], tileSize[i] * 2.8, 0.45 * tileAlpha[i])
        else if (mode[i] === 2 && reveal < 1) {
          const flash = 1 - (t - tiles[i].launch - FLIGHT) / 0.45
          if (flash > 0) {
            ctx.globalAlpha = 0.45 * flash * flash
            ctx.fillStyle = "rgb(165,243,252)"
            ctx.fillRect(tiles[i].tx + offX - TILE / 2, tiles[i].ty + offY - TILE / 2, TILE, TILE)
          }
        }
      }
      ctx.globalCompositeOperation = "source-over"
      ctx.lineWidth = 0.6
      ctx.strokeStyle = "rgba(165,243,252,0.65)"
      for (let i = 0; i < tiles.length; i++) {
        if (mode[i] !== 1) continue
        const tile = tiles[i], s = tileSize[i], x = tileX[i] - s / 2, y = tileY[i] - s / 2
        ctx.globalAlpha = tileAlpha[i]
        ctx.drawImage(holo, tile.sx, tile.sy, PHOTO_SIZE / GRID, PHOTO_SIZE / GRID, x, y, s, s)
        ctx.strokeRect(x, y, s, s)
      }

      ctx.globalCompositeOperation = "lighter"
      if (reveal > 0 && reveal < 1) {
        const chord = Math.sqrt(Math.max(0, R * R - (scanY - cy) ** 2))
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, R, 0, Math.PI * 2)
        ctx.clip()
        const band = ctx.createLinearGradient(0, scanY - 30, 0, scanY)
        band.addColorStop(0, "rgba(34,211,238,0)")
        band.addColorStop(1, "rgba(34,211,238,0.22)")
        ctx.globalAlpha = 1
        ctx.fillStyle = band
        ctx.fillRect(cx - R, scanY - 30, R * 2, 30)
        ctx.restore()
        const line = ctx.createLinearGradient(cx - chord - 20, 0, cx + chord + 20, 0)
        line.addColorStop(0, "rgba(165,243,252,0)")
        line.addColorStop(0.5, "rgba(220,252,255,0.95)")
        line.addColorStop(1, "rgba(165,243,252,0)")
        ctx.fillStyle = line
        ctx.fillRect(cx - chord - 20, scanY - 0.75, chord * 2 + 40, 1.5)
      }

      const shock = (t - ASSEMBLED) / 1.1
      if (shock > 0 && shock < 1) {
        const glow = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.9)
        glow.addColorStop(0, `rgba(34,211,238,${0.16 * (1 - shock)})`)
        glow.addColorStop(1, "rgba(34,211,238,0)")
        ctx.globalAlpha = 1
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, W, H)
        ctx.strokeStyle = `rgba(103,232,249,${0.55 * (1 - shock) ** 2})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(cx, cy, R + 8 + 150 * easeOut(shock), 0, Math.PI * 2)
        ctx.stroke()
      }

      const ring = easeInOut((t - RING_START) / RING)
      if (ring > 0) {
        let boost = 0
        for (const w of waves) if (w.cycle >= 0) boost += envelope(t - w.start - HOPS * HOP - 0.1)
        const start = -Math.PI / 2
        const end = start + Math.PI * 2 * ring
        const gradient = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
        gradient.addColorStop(0, "rgba(56,189,248,1)")
        gradient.addColorStop(1, "rgba(52,211,153,1)")
        ctx.strokeStyle = gradient
        ctx.globalAlpha = 0.14 + 0.1 * boost
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.arc(cx, cy, R + 7, start, end)
        ctx.stroke()
        ctx.globalAlpha = 0.85
        ctx.lineWidth = 1.3
        ctx.beginPath()
        ctx.arc(cx, cy, R + 7, start, end)
        ctx.stroke()
        if (ring < 1) {
          sprite(glows[1], cx + Math.cos(end) * (R + 7), cy + Math.sin(end) * (R + 7), 34, 0.9)
          sprite(white, cx + Math.cos(end) * (R + 7), cy + Math.sin(end) * (R + 7), 9, 1)
        }
        ctx.globalAlpha = 0.22 * ring
        ctx.strokeStyle = "rgba(125,211,252,1)"
        ctx.lineWidth = 1
        ctx.setLineDash([1.5, 7])
        ctx.lineDashOffset = -time * 4
        ctx.beginPath()
        ctx.arc(cx, cy, R + 17, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
        const settled = smooth((t - RING_START - RING) / 0.8)
        if (settled > 0) {
          const head = time * 0.55
          ctx.globalAlpha = (0.55 + 0.4 * boost) * settled
          ctx.strokeStyle = "rgba(165,243,252,1)"
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.arc(cx, cy, R + 7, head - 0.55, head)
          ctx.stroke()
          sprite(glows[1], cx + Math.cos(head) * (R + 7), cy + Math.sin(head) * (R + 7), 26, 0.7 * settled)
        }
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"
    }

    const hud = () => {
      const batch = Math.min(WAVES, Math.max(1, Math.floor((t - BOOT) / SPACING) + 1))
      const [phase, status] = t < BOOT ? ["boot", "initializing weights"]
        : t < ARRIVED ? ["forward", `forward pass · batch ${batch}/${WAVES}`]
        : t < ASSEMBLED ? ["decode", "decoding output"]
        : t < COMPLETE ? ["render", "rendering"]
        : ["complete", "inference complete"]
      if (status !== lastStatus) {
        lastStatus = status
        statusRef.current!.textContent = status
        container.dataset.phase = phase
      }
      if (time - lastHud > 0.08 || reduced) {
        lastHud = time
        const p = clamp01((t - BOOT) / (COMPLETE - BOOT))
        const loss = 0.0042 + 0.6889 * Math.exp(-4.2 * p) * (1 - p) + 0.004 * Math.sin(t * 23) * (1 - p)
        lossRef.current!.textContent = loss.toFixed(4)
      }
      replayRef.current!.dataset.ready = String(!reduced && t > COMPLETE)
    }

    const layout = () => {
      const rect = container.getBoundingClientRect()
      if (!rect.width) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      scale = rect.width / W
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      if (reduced) { render(); hud() }
    }
    const resize = new ResizeObserver(layout)
    resize.observe(container)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(container)
    const move = (event: PointerEvent) => {
      if (reduced) return
      const rect = container.getBoundingClientRect()
      pointer.targetX = (event.clientX - rect.left) / rect.width - 0.5
      pointer.targetY = (event.clientY - rect.top) / rect.height - 0.5
    }
    const leave = () => { pointer.targetX = 0; pointer.targetY = 0 }
    container.addEventListener("pointermove", move)
    container.addEventListener("pointerleave", leave)
    restart.current = () => { if (!reduced) t = 0 }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min((now - (last || now)) / 1000, 0.05)
      last = now
      if (!visible || document.hidden) return
      time += dt
      t += dt
      if (!portraits) t = Math.min(t, 0.15)
      const ease = Math.min(1, dt * 2.5)
      pointer.x += (pointer.targetX - pointer.x) * ease
      pointer.y += (pointer.targetY - pointer.y) * ease
      render()
      hud()
    }

    const image = new Image()
    image.src = "/portrait.jpg"
    image.decode().then(() => {
      if (disposed) return
      portraits = makePortraits(image)
      if (reduced) { render(); hud() }
    }).catch((error) => {
      if (!disposed) { console.warn("Neural portrait unavailable", error); setFailed(true) }
    })
    layout()
    if (!reduced) frame = requestAnimationFrame(tick)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      container.removeEventListener("pointermove", move)
      container.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <div ref={host}
      className="relative w-full max-w-[520px] aspect-[520/480] overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#030810] shadow-[0_40px_90px_-40px_rgba(8,47,73,0.75)]"
      style={{
        backgroundImage: "radial-gradient(ellipse at 50% 46%, rgba(14,116,144,0.24), transparent 62%), radial-gradient(circle at 1px 1px, rgba(148,163,184,0.09) 1px, transparent 0)",
        backgroundSize: "100% 100%, 22px 22px",
      }}>
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div role="img" aria-label="Animated neural network reconstructing a portrait of Vardan Keshishyan" className="absolute inset-0">
        <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(2,6,12,0.9)]" />
      {failed && <img src="/portrait.jpg" alt="Vardan Keshishyan" width={248} height={248}
        className="absolute left-1/2 top-[48.3%] w-[47.7%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/40 object-cover" />}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100/60">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">portrait_net</span>
        <span className="hidden text-cyan-100/25 sm:inline">/</span>
        <span ref={statusRef}>initializing weights</span>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100/40">
        loss <span ref={lossRef} className="tabular-nums text-cyan-100/80">0.6931</span>
      </div>
      <button ref={replayRef} type="button" onClick={() => restart.current()} data-ready="false"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md border border-cyan-300/15 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-100/50 opacity-0 pointer-events-none transition hover:border-cyan-300/40 hover:text-cyan-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300/60 data-[ready=true]:opacity-100 data-[ready=true]:pointer-events-auto">
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        Re-run
      </button>
    </div>
  )
}
