<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import * as THREE from 'three'

const canvasContainer = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let animationId: number | null = null

function initThreeScene(container: HTMLDivElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  )
  camera.position.z = 30

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // === Particle system (floating stars) ===
  const particlesCount = 300
  const particlesGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particlesCount * 3)
  const scales = new Float32Array(particlesCount)

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    scales[i] = Math.random()
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particlesGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

  const particlesMat = new THREE.PointsMaterial({
    color: 0xfbbf24,
    size: 0.15,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  })
  const particles = new THREE.Points(particlesGeo, particlesMat)
  scene.add(particles)

  // === Floating geometric shapes ===
  const shapesGroup = new THREE.Group()

  // Icosahedrons (gem-like)
  const icoGeo = new THREE.IcosahedronGeometry(1.2, 0)
  const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  })
  for (let i = 0; i < 8; i++) {
    const mesh = new THREE.Mesh(icoGeo, wireframeMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 35,
      (Math.random() - 0.5) * 20,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.002 + Math.random() * 0.005, axis: Math.random() > 0.5 ? 'x' : 'y' }
    shapesGroup.add(mesh)
  }

  // Octahedrons (diamond-like, accent color)
  const octGeo = new THREE.OctahedronGeometry(0.8, 0)
  const accentMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  })
  for (let i = 0; i < 6; i++) {
    const mesh = new THREE.Mesh(octGeo, accentMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 55,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 15,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.003 + Math.random() * 0.004, axis: Math.random() > 0.5 ? 'z' : 'x' }
    shapesGroup.add(mesh)
  }

  // Torus rings
  const torusGeo = new THREE.TorusGeometry(1.5, 0.05, 8, 40)
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.2 })
  for (let i = 0; i < 4; i++) {
    const mesh = new THREE.Mesh(torusGeo, torusMat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * 45,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
    )
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    mesh.userData = { speed: 0.001 + Math.random() * 0.003, axis: 'y' }
    shapesGroup.add(mesh)
  }

  scene.add(shapesGroup)

  // === Connecting lines (constellation effect) ===
  const linePoints: THREE.Vector3[] = []
  for (let i = 0; i < 20; i++) {
    linePoints.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
      ),
    )
  }
  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.08 })
  const lines = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lines)

  // === Mouse interaction ===
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

    // Rotate particles slowly
    particles.rotation.y = elapsed * 0.05
    particles.rotation.x = elapsed * 0.02

    // Animate each shape
    shapesGroup.children.forEach((child) => {
      const s = child.userData.speed as number
      const axis = child.userData.axis as string
      if (axis === 'x') child.rotation.x += s
      else if (axis === 'y') child.rotation.y += s
      else child.rotation.z += s
      child.position.y += Math.sin(elapsed * s * 100) * 0.005
    })

    // Smooth camera follow mouse
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    renderer!.render(scene, camera)
  }
  animate()

  // === Resize handler ===
  const handleResize = () => {
    if (!renderer) return
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }
  window.addEventListener('resize', handleResize)

  // Return cleanup function
  return () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    if (animationId !== null) cancelAnimationFrame(animationId)
    renderer?.dispose()
    scene.clear()
  }
}

let cleanup: (() => void) | null = null

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
  <section class="relative flex min-h-[90vh] items-center overflow-hidden bg-primary-800">
    <!-- Background gradient mesh -->
    <div
      class="absolute inset-0 bg-linear-to-br from-primary-800 via-primary-700 to-primary-900"
    ></div>

    <!-- Three.js Canvas -->
    <div ref="canvasContainer" class="absolute inset-0 z-0"></div>

    <!-- Dotted grid pattern (subtle) -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image: radial-gradient(circle, white 1px, transparent 1px);
        background-size: 40px 40px;
      "
    ></div>

    <div class="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <!-- Text Content -->
        <div class="text-center lg:text-left">
          <span
            class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-1.5 text-sm font-medium text-accent-300 backdrop-blur-sm"
          >
            <i class="pi pi-sparkles"></i> Kos Nyaman &amp; Terjangkau
          </span>
          <h1 class="mb-6 text-4xl leading-tight font-extrabold text-white sm:text-5xl lg:text-6xl">
            Temukan Kos
            <span class="text-accent-400">Impianmu</span>
            di Sini
          </h1>
          <p class="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-primary-100/80 lg:mx-0">
            ArlettaKost menyediakan kamar kos berkualitas dengan fasilitas lengkap, keamanan 24 jam,
            dan lokasi strategis. Tempat tinggal ideal untuk mahasiswa dan profesional muda.
          </p>
          <div class="flex flex-col gap-3 lg:justify-start">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RouterLink
                to="/rooms"
                class="rounded-xl bg-accent-400 px-8 py-3.5 text-center font-semibold text-primary-900 shadow-lg transition-all hover:bg-accent-300 hover:shadow-xl w-fit"
              >
                <i class="pi pi-search mr-1"></i> Lihat Kamar
              </RouterLink>
              <a
                href="#features"
                class="rounded-xl border-2 border-white/20 px-8 py-3.5 text-center font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 w-fit"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
            <a
              href="https://arlettaluxury.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border-2 border-white/20 px-23 py-3.5 text-center font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 w-fit"
            >
              <i class="pi pi-arrow-up-right mr-1"></i> Kembali ke Website Utama
            </a>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="hidden lg:block">
          <div class="relative">
            <div
              class="absolute -inset-4 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            ></div>
            <div class="absolute inset-0 rotate-3 rounded-3xl bg-accent-400/10"></div>
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&h=500&fit=crop"
              alt="Kamar kos modern"
              class="relative rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
