<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMobileMenuOpen = ref(false)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-primary-800/95 shadow-lg backdrop-blur-md"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2" @click="closeMenu">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-primary-900 w-33 h-33"
          >
            <img
      src="/public/logo.png" 
      alt="Logo"
      class="h-full w-full object-contain"
    />
          </div>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden items-center gap-8 md:flex">
          <RouterLink
            to="/"
            class="font-medium text-white/80 transition-colors hover:text-white"
            active-class="!text-white"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/rooms"
            class="font-medium text-white/80 transition-colors hover:text-white"
            active-class="!text-white"
          >
            Daftar Kamar
          </RouterLink>
          <RouterLink
            to="/about"
            class="font-medium text-white/80 transition-colors hover:text-white"
            active-class="!text-white"
          >
            Tentang Kami
          </RouterLink>
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="toggleMenu"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 md:hidden"
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
        <div v-if="isMobileMenuOpen" class="border-t border-white/10 pb-4 md:hidden">
          <div class="flex flex-col gap-1 pt-2">
            <RouterLink
              to="/"
              class="rounded-lg px-4 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              @click="closeMenu"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/rooms"
              class="rounded-lg px-4 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              @click="closeMenu"
            >
              Daftar Kamar
            </RouterLink>
            <RouterLink
              to="/about"
              class="rounded-lg px-4 py-2.5 font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
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
