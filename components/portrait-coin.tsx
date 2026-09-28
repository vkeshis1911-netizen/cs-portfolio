"use client"

import { useEffect, useRef, useState } from "react"

const WIDTH = 520
const HEIGHT = 480
const RADIUS = 140

export function PortraitCoin() {
  const host = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const container = host.current!
    const abort = new AbortController()
    let disposed = false
    let cleanup = () => {}

    async function start() {
      const [THREE, { default: Matter }, { parseGIF, decompressFrames }] = await Promise.all([
        import("three"), import("matter-js"), import("gifuct-js"),
      ])
      if (disposed) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0xffffff, 0)
      renderer.domElement.style.cssText = "position:absolute;top:0;pointer-events:none;z-index:20"
      renderer.domElement.setAttribute("aria-hidden", "true")
      container.appendChild(renderer.domElement)
      const handle = document.createElement("button")
      handle.type = "button"
      handle.tabIndex = -1
      handle.setAttribute("aria-label", "Drag portrait coin")
      handle.style.cssText = "position:absolute;z-index:21;border:0;background:transparent;border-radius:50%;touch-action:none;cursor:grab;pointer-events:auto"
      container.appendChild(handle)
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(0, WIDTH, HEIGHT, 0, 0.1, 2000)
      camera.position.z = 1000
      scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 3))
      const light = new THREE.DirectionalLight(0xffffff, 4)
      light.position.set(-200, 500, 400)
      scene.add(light)
      const textures: InstanceType<typeof THREE.Texture>[] = []
      const engine = Matter.Engine.create({ constraintIterations: 12, positionIterations: 8 })
      engine.gravity.y = 1.2
      const group = Matter.Body.nextGroup(true)
      const startY = reduced ? 0 : -440
      const links = Array.from({ length: 11 }, (_, i) => Matter.Bodies.circle(260, startY + i * 10, 2, {
        isStatic: i === 0, frictionAir: 0.045, collisionFilter: { group }, mass: 0.03,
      }))
      const body = Matter.Bodies.circle(260, startY + 248, RADIUS, {
        frictionAir: 0.018, collisionFilter: { group }, mass: 3, inertia: Infinity,
      })
      const joints = links.slice(1).map((link, i) => Matter.Constraint.create({
        bodyA: links[i], bodyB: link, length: 10, stiffness: 0.95, damping: 0.12,
      }))
      joints.push(Matter.Constraint.create({
        bodyA: links[10], bodyB: body, pointB: { x: 0, y: -RADIUS - 8 },
        length: 0, stiffness: 0.98, damping: 0.18,
      }))
      Matter.Composite.add(engine.world, [...links, body, ...joints])

      const coin = new THREE.Group()
      scene.add(coin)
      const metal = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.75, roughness: 0.32 })
      const edge = new THREE.Mesh(new THREE.CylinderGeometry(RADIUS, RADIUS, 9, 96), metal)
      edge.rotation.x = Math.PI / 2
      coin.add(edge)
      const frontMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const front = new THREE.Mesh(new THREE.CircleGeometry(RADIUS - 4, 96), frontMaterial)
      front.position.z = 4.7
      coin.add(front)
      const backMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 })
      const back = new THREE.Mesh(new THREE.CircleGeometry(RADIUS - 4, 96), backMaterial)
      back.rotation.y = Math.PI
      back.position.z = -4.7
      coin.add(back)
      const eyelet = new THREE.Mesh(new THREE.TorusGeometry(7, 2.6, 10, 24), metal)
      scene.add(eyelet)
      const ropeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 })
      const rope = new THREE.Mesh(new THREE.BufferGeometry(), ropeMaterial)
      scene.add(rope)
      let frame = 0
      let scale = 1
      let minX = 0
      let maxX = WIDTH
      let floor = HEIGHT
      let introRopeLength = 100
      let introInterrupted = false
      const layout = () => {
        const rect = container.getBoundingClientRect()
        scale = rect.width / WIDTH
        minX = Math.max(12 - rect.left, -220) / scale
        maxX = (Math.min(document.documentElement.clientWidth - 12, rect.right + 220) - rect.left) / scale
        const end = document.getElementById("group-projects")?.getBoundingClientRect().top ?? rect.bottom
        floor = Math.max(HEIGHT, (end - rect.top) / scale)
        const recentTop = document.getElementById("recent-project")?.getBoundingClientRect().top ?? rect.bottom
        introRopeLength = Math.max(100, (recentTop - rect.top) / scale - RADIUS * 2 - 18)
        camera.left = minX
        camera.right = maxX
        camera.bottom = HEIGHT - floor
        camera.updateProjectionMatrix()
        renderer.domElement.style.left = `${minX * scale}px`
        renderer.setSize((maxX - minX) * scale, floor * scale)
      }
      const resize = new ResizeObserver(layout)
      resize.observe(container)
      resize.observe(document.body)

      let dragging: number | null = null
      let dragJoint: ReturnType<typeof Matter.Constraint.create> | null = null
      let yaw = 0
      let spin = 0
      let elapsed = 0
      let physicsTime = 0
      let kicked = false
      let lastTime = 0
      let accumulator = 0
      let visible = true
      const point = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect()
        return { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale }
      }
      const down = (event: PointerEvent) => {
        if (dragging !== null || event.button !== 0) return
        const p = point(event)
        if (Math.hypot(p.x - body.position.x, p.y - body.position.y) > RADIUS) return
        event.preventDefault()
        dragging = event.pointerId
        introInterrupted = true
        spin = 0
        kicked = true
        elapsed = Math.max(elapsed, 1)
        handle.setPointerCapture(event.pointerId)
        handle.style.cursor = "grabbing"
        dragJoint = Matter.Constraint.create({ pointA: p, bodyB: body,
          pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
          length: 0, stiffness: 0.12, damping: 0.15,
        })
        Matter.Composite.add(engine.world, dragJoint)
      }
      const move = (event: PointerEvent) => {
        if (dragging !== event.pointerId || !dragJoint) return
        const p = point(event)
        spin = Math.max(-0.07, Math.min(0.07, spin + (p.x - dragJoint.pointA.x) * 0.0005))
        dragJoint.pointA = { x: Math.max(minX + RADIUS, Math.min(maxX - RADIUS, p.x)), y: Math.max(RADIUS + 12, Math.min(floor - RADIUS - 12, p.y)) }
      }
      const release = (event: PointerEvent) => {
        if (dragging !== event.pointerId) return
        if (dragJoint) Matter.Composite.remove(engine.world, dragJoint)
        dragJoint = null
        dragging = null
        spin = Math.max(-0.07, Math.min(0.07, spin + body.velocity.x * 0.003))
        handle.style.cursor = "grab"
        if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId)
      }
      const keyboard = (event: KeyboardEvent) => {
        if (!["ArrowLeft", "ArrowRight", " "].includes(event.key)) return
        event.preventDefault()
        introInterrupted = true
        kicked = true
        elapsed = Math.max(1, elapsed)
        Matter.Body.setVelocity(body, { x: event.key === "ArrowLeft" ? -7 : 7, y: 0 })
        spin = 0.055
      }
      handle.addEventListener("pointerdown", down)
      handle.addEventListener("pointermove", move)
      handle.addEventListener("pointerup", release)
      handle.addEventListener("pointercancel", release)
      handle.addEventListener("lostpointercapture", release)
      container.addEventListener("keydown", keyboard)
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
      observer.observe(renderer.domElement)
      let updateGif = (_delta: number) => {}

      cleanup = () => {
        cancelAnimationFrame(frame)
        resize.disconnect()
        observer.disconnect()
        container.removeEventListener("keydown", keyboard)
        Matter.Engine.clear(engine)
        Matter.Composite.clear(engine.world, false)
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) object.geometry.dispose()
        })
        for (const material of [metal, frontMaterial, backMaterial, ropeMaterial]) material.dispose()
        textures.forEach(texture => texture.dispose())
        renderer.dispose()
        renderer.domElement.remove()
        handle.remove()
      }

      const photo = await new THREE.TextureLoader().loadAsync("/portrait.jpg")
      if (disposed) { photo.dispose(); return }
      photo.colorSpace = THREE.SRGBColorSpace
      const aspect = photo.image.width / photo.image.height
      if (aspect > 1) { photo.repeat.x = 1 / aspect; photo.offset.x = (1 - 1 / aspect) / 2 }
      else { photo.repeat.y = aspect; photo.offset.y = (1 - aspect) / 2 }
      textures.push(photo)
      frontMaterial.map = photo
      frontMaterial.needsUpdate = true

      const response = await fetch("/walking-code.gif", { signal: abort.signal })
      if (!response.ok) throw new Error("GIF could not be loaded")
      const gif = parseGIF(await response.arrayBuffer())
      if (disposed) return
      const frames = decompressFrames(gif, true)
      const source = document.createElement("canvas")
      source.width = gif.lsd.width
      source.height = gif.lsd.height
      const ctx = source.getContext("2d")!
      const patch = document.createElement("canvas")
      const patchCtx = patch.getContext("2d")!
      const square = document.createElement("canvas")
      square.width = square.height = 512
      const squareCtx = square.getContext("2d")!
      const animated = new THREE.CanvasTexture(square)
      animated.colorSpace = THREE.SRGBColorSpace
      textures.push(animated)
      backMaterial.map = animated
      backMaterial.color.set(0xffffff)
      backMaterial.needsUpdate = true
      let gifIndex = 0
      let gifTime = 0
      let previous: typeof frames[number] | undefined
      let restore: ImageData | undefined
      const drawGif = () => {
        if (previous?.disposalType === 2) ctx.clearRect(previous.dims.left, previous.dims.top, previous.dims.width, previous.dims.height)
        if (previous?.disposalType === 3 && restore) ctx.putImageData(restore, 0, 0)
        const current = frames[gifIndex]
        if (current.disposalType === 3) restore = ctx.getImageData(0, 0, source.width, source.height)
        patch.width = current.dims.width
        patch.height = current.dims.height
        const pixels = patchCtx.createImageData(patch.width, patch.height)
        pixels.data.set(current.patch)
        patchCtx.putImageData(pixels, 0, 0)
        ctx.drawImage(patch, current.dims.left, current.dims.top)
        squareCtx.fillStyle = "#050505"
        squareCtx.fillRect(0, 0, 512, 512)
        const scale = 450 / Math.max(source.width, source.height)
        squareCtx.drawImage(source, (512 - source.width * scale) / 2, (512 - source.height * scale) / 2, source.width * scale, source.height * scale)
        animated.needsUpdate = true
        previous = current
      }
      drawGif()
      updateGif = (delta) => {
        gifTime += delta * 1000
        if (gifTime >= Math.max(20, frames[gifIndex].delay)) {
          gifTime = 0
          gifIndex = (gifIndex + 1) % frames.length
          drawGif()
        }
      }

      const animate = (time: number) => {
        frame = requestAnimationFrame(animate)
        const dt = Math.min((time - (lastTime || time)) / 1000, 0.05)
        lastTime = time
        if (!visible || document.hidden) return
        elapsed += dt
        accumulator += dt
        // Fixed physics steps keep the rope consistent on fast and slow displays.
        while (accumulator >= 1 / 60) {
          physicsTime += 1 / 60
          const entrance = !reduced && !introInterrupted && physicsTime < 6
          Matter.Body.setPosition(links[0], { x: 260, y: 0 })
          if (!reduced && elapsed > 0.9 && !kicked) {
            spin = 0.055
            kicked = true
          }
          // Pay out rope while pulled; gently take up the slack after release.
          const targetLength = dragJoint
            ? Math.max(100, Math.hypot(dragJoint.pointA.x - dragJoint.pointB.x - 260,
              dragJoint.pointA.y - dragJoint.pointB.y - RADIUS - 8))
            : 100
          for (const joint of joints.slice(0, 10)) {
            joint.length += (targetLength / 10 - joint.length) * (dragJoint ? 0.3 : 0.012)
          }
          if (entrance) {
            // One continuous damped trajectory avoids competing rope/anchor impulses.
            const t = physicsTime
            const frequency = Math.PI / 1.7
            const depth = Math.max(45, Math.min(360, introRopeLength + RADIUS + 18 - 258))
            const damping = -Math.log(depth / 450) / 1.7
            const blend = Math.max(0, Math.min(1, (t - 4) / 2))
            const envelope = 1 - blend ** 3 * (10 - 15 * blend + 6 * blend ** 2)
            const y = 258 - 450 * Math.exp(-damping * t) *
              (Math.cos(frequency * t) + damping / frequency * Math.sin(frequency * t)) * envelope
            const x = 260 + 65 * Math.sin(Math.PI * t / 6) ** 2 * Math.sin(t * 2.4)
            const velocity = { x: x - body.position.x, y: y - body.position.y }
            Matter.Body.setPosition(body, { x, y })
            Matter.Body.setVelocity(body, velocity)
            for (let i = 1; i < links.length; i++) {
              Matter.Body.setPosition(links[i], { x: 260 + (x - 260) * i / 10,
                y: (y - RADIUS - 8) * i / 10 })
              Matter.Body.setVelocity(links[i], { x: velocity.x * i / 10, y: velocity.y * i / 10 })
            }
          } else {
            Matter.Engine.update(engine, 1000 / 60)
          }
          if (elapsed > 1) {
            const x = Math.max(minX + RADIUS + 10, Math.min(maxX - RADIUS - 10, body.position.x))
            const y = Math.min(floor - RADIUS - 10, body.position.y)
            if (x !== body.position.x || y !== body.position.y) {
              const velocity = { x: x !== body.position.x ? -body.velocity.x * 0.35 : body.velocity.x,
                y: y !== body.position.y ? -Math.abs(body.velocity.y) * 0.35 : body.velocity.y }
              Matter.Body.setPosition(body, { x, y })
              Matter.Body.setVelocity(body, velocity)
            }
          }
          // Hold the grabbed orientation; drag momentum only turns it after release.
          if (dragging === null) {
            yaw += spin
            spin *= 0.994
          }
          // The rope's torsion relaxes to the nearest full turn, leaving the portrait forward.
          if (dragging === null && Math.abs(body.velocity.x) < 0.5 && elapsed > 7) {
            const target = Math.round(yaw / (Math.PI * 2)) * Math.PI * 2
            spin += (target - yaw) * 0.002
            spin *= 0.9
          }
          accumulator -= 1 / 60
        }
        coin.position.set(body.position.x, HEIGHT - body.position.y, 0)
        coin.rotation.y = yaw
        const hitWidth = Math.max(24, Math.abs(Math.cos(yaw)) * RADIUS * 2) * scale
        handle.style.width = `${hitWidth}px`
        handle.style.height = `${RADIUS * 2 * scale}px`
        handle.style.left = `${body.position.x * scale - hitWidth / 2}px`
        handle.style.top = `${(body.position.y - RADIUS) * scale}px`
        eyelet.position.set(body.position.x, HEIGHT - body.position.y + RADIUS + 5, 0)
        const points = links.map(link => new THREE.Vector3(link.position.x, HEIGHT - link.position.y, 0))
        points.push(new THREE.Vector3(body.position.x, HEIGHT - body.position.y + RADIUS + 8, 0))
        rope.geometry.dispose()
        rope.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 32, 2, 6, false)
        if (!reduced) updateGif(dt)
        container.dataset.coinX = body.position.x.toFixed(1)
        container.dataset.coinY = body.position.y.toFixed(1)
        container.dataset.coinRotation = yaw.toFixed(3)
        renderer.render(scene, camera)
      }
      layout()
      frame = requestAnimationFrame(animate)
    }
    start().catch(error => {
      if (!disposed) { console.warn("Portrait animation unavailable", error); cleanup(); setFailed(true) }
    })
    return () => { disposed = true; abort.abort(); cleanup() }
  }, [])

  return (
    <div ref={host} role="group" tabIndex={0}
      aria-label="Interactive portrait coin. Drag and release to swing; use left and right arrow keys to swing with the keyboard."
      className="relative w-full max-w-[520px] aspect-[520/480] outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ touchAction: "pan-y" }}>
      {failed && <img src="/portrait.jpg" alt="Vardan Keshishyan" width={320} height={320}
        className="absolute left-1/2 top-1/2 w-[54%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary object-cover" />}
    </div>
  )
}
