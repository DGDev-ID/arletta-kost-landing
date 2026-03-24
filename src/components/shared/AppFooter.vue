<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark-900 text-gray-300">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Brand -->
        <div>
          <div class="mb-4 flex items-center gap-2">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-400 text-lg font-bold text-primary-900"
            >
              A
            </div>
            <span class="text-xl font-bold text-white"
              >Arletta<span class="text-accent-400">Kost</span></span
            >
          </div>
          <p class="leading-relaxed text-gray-400">
            Tempat kos nyaman, aman, dan strategis untuk mahasiswa dan profesional muda. Fasilitas
            lengkap dengan harga terjangkau.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-white">Menu</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink to="/" class="transition-colors hover:text-accent-400"> Home </RouterLink>
            </li>
            <li>
              <RouterLink to="/rooms" class="transition-colors hover:text-accent-400">
                Daftar Kamar
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/about" class="transition-colors hover:text-accent-400">
                Tentang Kami
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/login" class="transition-colors hover:text-accent-400">
                Login Penghuni
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/signup" class="transition-colors hover:text-accent-400">
                Daftar Akun
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="mb-4 text-lg font-semibold text-white">Kontak</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center gap-2">
              <i class="pi pi-map-marker text-sm text-accent-400"></i>
              <span>Jl. Contoh No. 123, Jakarta Selatan</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-phone text-sm text-accent-400"></i>
              <span>+62 812-3456-7890</span>
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-envelope text-sm text-accent-400"></i>
              <span>info@arlettakost.com</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider & Copyright -->
      <div class="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
        &copy; {{ currentYear }} ArlettaKost. All rights reserved.
      </div>
    </div>
  </footer>
</template>
