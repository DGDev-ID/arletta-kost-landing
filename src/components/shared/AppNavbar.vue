<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()

// Halaman yang selalu pakai style "scrolled" (bg putih, teks hitam)
const alwaysLight = computed(() => ['/rooms', '/about'].some((p) => route.path.startsWith(p)))

// Aktif = scrolled ATAU halaman non-hero
const isLight = computed(() => isScrolled.value || alwaysLight.value)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 80
}

function navClass(path: string) {
  const isActive = route.path === path || route.path.startsWith(path + '/')
  if (isActive) {
    return isLight.value ? 'text-blue-600 font-semibold' : 'text-white font-semibold'
  }
  return isLight.value ? 'text-black/70' : 'text-white/90'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm transition-colors duration-300"
    :class="isLight ? 'border-black/10 bg-white/80' : 'border-white/10 bg-transparent'"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2" @click="closeMenu">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-primary-900"
          >
            <img
      src="/public/logo-kos.svg" 
      alt="Logo"
      class="h-full w-full object-contain"
    />
          </div>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden items-center gap-8 md:flex">
          <RouterLink
            to="/"
            class="transition-colors hover:text-blue-600"
            :class="navClass('/')"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/rooms"
            class="transition-colors hover:text-blue-600"
            :class="navClass('/rooms')"
          >
            Daftar Kamar
          </RouterLink>
          <RouterLink
            to="/about"
            class="transition-colors hover:text-blue-600"
            :class="navClass('/about')"
          >
            Tentang Kami
          </RouterLink>
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="toggleMenu"
          class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden"
          :class="isLight ? 'text-black/80 hover:bg-black/10' : 'text-white/90 hover:bg-white/10'"
          :aria-label="isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'"
        >
          <svg
            v-if="!isMobileMenuOpen"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="border-t pb-4 md:hidden" :class="isLight ? 'border-black/10' : 'border-white/10'">
          <div class="flex flex-col gap-1 pt-2">
            <RouterLink
              to="/"
              class="rounded-lg px-4 py-2.5 transition-colors hover:text-blue-600"
              :class="[navClass('/'), isLight ? 'hover:bg-black/10' : 'hover:bg-white/10']"
              @click="closeMenu"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/rooms"
              class="rounded-lg px-4 py-2.5 transition-colors hover:text-blue-600"
              :class="[navClass('/rooms'), isLight ? 'hover:bg-black/10' : 'hover:bg-white/10']"
              @click="closeMenu"
            >
              Daftar Kamar
            </RouterLink>
            <RouterLink
              to="/about"
              class="rounded-lg px-4 py-2.5 transition-colors hover:text-blue-600"
              :class="[navClass('/about'), isLight ? 'hover:bg-black/10' : 'hover:bg-white/10']"
              @click="closeMenu"
            >
              Tentang Kami
            </RouterLink>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>
