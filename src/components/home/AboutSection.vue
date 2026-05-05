<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="about" class="py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <span
          class="mb-2 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700"
        >
          Tentang Kami
        </span>
        <h2 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Mengenal ArlettaKost Lebih Dekat
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-500">
          Lebih dari sekadar tempat tinggal — ArlettaKost adalah rumah kedua yang nyaman, aman, dan
          penuh kehangatan.
        </p>
      </div>

      <!-- Story + Image -->
      <div class="mb-20 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h3 class="mb-4 text-2xl font-bold text-gray-900">Cerita Kami</h3>
          <p class="mb-4 leading-relaxed text-gray-600">
            ArlettaKost dengan satu visi sederhana: menyediakan tempat
            tinggal yang nyaman dan terjangkau bagi mahasiswa dan profesional muda di kota besar.
          </p>
          <p class="mb-6 leading-relaxed text-gray-600">
            ArlettaKost telah berkembang
            menjadi hunian premium dengan lebih dari 50 kamar yang dilengkapi fasilitas modern. Kami
            percaya bahwa setiap penghuni berhak mendapatkan tempat tinggal yang bersih, aman, dan
            mendukung produktivitas.
          </p>
          <div class="flex flex-wrap gap-6">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600">200+</p>
              <p class="text-sm text-gray-500">Penghuni Bahagia</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600">50+</p>
              <p class="text-sm text-gray-500">Kamar Tersedia</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="absolute -inset-4 rounded-3xl bg-primary-100/50"></div>
          <img
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&h=500&fit=crop"
            alt="Gedung ArlettaKost"
            class="relative rounded-2xl shadow-lg"
          />
        </div>
      </div>

      <!-- Vision & Mission -->
      <div class="mb-20 grid gap-8 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
            <i class="pi pi-eye text-2xl text-primary-600"></i>
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900">Visi</h3>
          <p class="leading-relaxed text-gray-600">
            Menjadi penyedia kos-kosan terkemuka di Indonesia yang mengutamakan kenyamanan,
            keamanan, dan komunitas yang positif bagi setiap penghuninya.
          </p>
        </div>
        <div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50">
            <i class="pi pi-flag text-2xl text-accent-600"></i>
          </div>
          <h3 class="mb-3 text-xl font-bold text-gray-900">Misi</h3>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-xs text-primary-500"></i>
              <span>Menyediakan kamar dengan standar kualitas tinggi dan harga kompetitif</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-xs text-primary-500"></i>
              <span>Menjamin keamanan 24 jam dengan sistem keamanan modern</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-xs text-primary-500"></i>
              <span>Membangun komunitas penghuni yang saling mendukung</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="pi pi-check mt-1 text-xs text-primary-500"></i>
              <span>Memberikan pelayanan responsif dan ramah setiap saat</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 rounded-2xl bg-primary-50 p-8 text-center sm:p-12">
        <h3 class="mb-3 text-2xl font-bold text-gray-900">Tertarik Bergabung?</h3>
        <p class="mb-6 text-gray-600">
          Temukan kamar kos yang sempurna dan jadilah bagian dari keluarga ArlettaKost.
        </p>
        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink
            to="/rooms"
            class="rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
          >
            <i class="pi pi-search mr-1"></i> Lihat Kamar
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
