<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null
let cleanup: (() => void) | null = null

function initThreeScene(container: HTMLDivElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  )
  camera.position.z = 25

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // === Particles (accent-colored stars) ===
  const count = 200
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 70
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particlesMat = new THREE.PointsMaterial({
    color: 0xfbbf24,
    size: 0.18,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(geo, particlesMat)
  scene.add(particles)

  // === Floating shapes group ===
  const shapesGroup = new THREE.Group()

  // Icosahedrons (wireframe blue)
  const icoGeo = new THREE.IcosahedronGeometry(1.1, 0)
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  })
  for (let i = 0; i < 6; i++) {
    const mesh = new THREE.Mesh(icoGeo, icoMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 28,
      (Math.random() - 0.5) * 18,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.002 + Math.random() * 0.005, axis: Math.random() > 0.5 ? 'x' : 'y' }
    shapesGroup.add(mesh)
  }

  // Octahedrons (wireframe accent)
  const octGeo = new THREE.OctahedronGeometry(0.75, 0)
  const octMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  })
  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(octGeo, octMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 55,
      (Math.random() - 0.5) * 32,
      (Math.random() - 0.5) * 14,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.003 + Math.random() * 0.004, axis: Math.random() > 0.5 ? 'z' : 'x' }
    shapesGroup.add(mesh)
  }

  // Torus rings
  const torusGeo = new THREE.TorusGeometry(1.4, 0.05, 8, 36)
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.18,
  })
  for (let i = 0; i < 3; i++) {
    const mesh = new THREE.Mesh(torusGeo, torusMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 45,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 16,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.001 + Math.random() * 0.003, axis: 'y' }
    shapesGroup.add(mesh)
  }

  scene.add(shapesGroup)

  // === Constellation lines ===
  const linePoints: THREE.Vector3[] = []
  for (let i = 0; i < 16; i++) {
    linePoints.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 18,
      ),
    )
  }
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.07 })
  scene.add(new THREE.LineSegments(lineGeo, lineMat))

  // === Mouse parallax ===
  let mouseX = 0
  let mouseY = 0
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', handleMouseMove)

  // === Animation loop ===
  const clock = new THREE.Clock()
  function animate() {
    animationId = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()

    particles.rotation.y = elapsed * 0.04
    particles.rotation.x = elapsed * 0.015

    shapesGroup.children.forEach((child) => {
      const s = child.userData.speed as number
      const axis = child.userData.axis as string
      if (axis === 'x') child.rotation.x += s
      else if (axis === 'y') child.rotation.y += s
      else child.rotation.z += s
      child.position.y += Math.sin(elapsed * s * 100) * 0.004
    })

    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    renderer!.render(scene, camera)
  }
  animate()

  // === Resize ===
  const handleResize = () => {
    if (!renderer) return
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    if (animationId !== null) cancelAnimationFrame(animationId)
    renderer?.dispose()
    scene.clear()
  }
}

onMounted(() => {
  if (canvasContainer.value) {
    cleanup = initThreeScene(canvasContainer.value)
  }
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <section class="relative overflow-hidden bg-primary-800 py-24">
    <!-- Gradient base -->
    <div
      class="absolute inset-0 bg-linear-to-br from-primary-800 via-primary-700 to-primary-900"
    ></div>

    <!-- Three.js canvas -->
    <div ref="canvasContainer" class="absolute inset-0 z-0"></div>

    <!-- Dotted grid -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image: radial-gradient(circle, white 1px, transparent 1px);
        background-size: 40px 40px;
      "
    ></div>

    <div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <span
        class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-1.5 text-sm font-medium text-accent-300 backdrop-blur-sm"
      >
        <i class="pi pi-sparkles"></i> Bergabung Sekarang
      </span>
      <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">Siap Menemukan Kos Impianmu?</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-primary-100/80">
        Bergabung dengan ratusan penghuni yang sudah merasakan kenyamanan tinggal di ArlettaKost.
      </p>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <RouterLink
          to="/rooms"
          class="w-full rounded-xl bg-accent-400 px-8 py-3.5 font-semibold text-primary-900 shadow-lg transition-all hover:bg-accent-300 hover:shadow-xl sm:w-auto"
        >
          <i class="pi pi-search mr-1"></i> Cari Kamar Sekarang
        </RouterLink>
        <RouterLink
          to="/signup"
          class="w-full rounded-xl border-2 border-white/20 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto"
        >
          <i class="pi pi-user-plus mr-1"></i> Daftar Sekarang
        </RouterLink>
      </div>
    </div>
  </section>
</template>
