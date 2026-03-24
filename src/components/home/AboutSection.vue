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
            ArlettaKost didirikan pada tahun 2019 dengan satu visi sederhana: menyediakan tempat
            tinggal yang nyaman dan terjangkau bagi mahasiswa dan profesional muda di kota besar.
          </p>
          <p class="mb-6 leading-relaxed text-gray-600">
            Berawal dari satu gedung kecil dengan 10 kamar, kini ArlettaKost telah berkembang
            menjadi hunian premium dengan lebih dari 50 kamar yang dilengkapi fasilitas modern. Kami
            percaya bahwa setiap penghuni berhak mendapatkan tempat tinggal yang bersih, aman, dan
            mendukung produktivitas.
          </p>
          <div class="flex flex-wrap gap-6">
            <div class="text-center">
              <p class="text-3xl font-bold text-primary-600">5+</p>
              <p class="text-sm text-gray-500">Tahun Pengalaman</p>
            </div>
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

      <!-- Team -->
      <div class="text-center">
        <h3 class="mb-8 text-2xl font-bold text-gray-900">Tim Pengelola</h3>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            class="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Ahmad Fauzi"
              class="mx-auto mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-primary-100"
            />
            <h4 class="text-lg font-semibold text-gray-900">Ahmad Fauzi</h4>
            <p class="text-sm text-primary-600">Founder & CEO</p>
            <p class="mt-2 text-sm text-gray-500">
              Berpengalaman 10+ tahun di bidang properti dan manajemen hunian.
            </p>
          </div>
          <div
            class="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
              alt="Sari Dewi"
              class="mx-auto mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-primary-100"
            />
            <h4 class="text-lg font-semibold text-gray-900">Sari Dewi</h4>
            <p class="text-sm text-primary-600">Head of Operations</p>
            <p class="mt-2 text-sm text-gray-500">
              Memastikan setiap penghuni mendapatkan pengalaman terbaik setiap hari.
            </p>
          </div>
          <div
            class="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Rudi Hartono"
              class="mx-auto mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-primary-100"
            />
            <h4 class="text-lg font-semibold text-gray-900">Rudi Hartono</h4>
            <p class="text-sm text-primary-600">Head of Maintenance</p>
            <p class="mt-2 text-sm text-gray-500">
              Bertanggung jawab atas pemeliharaan fasilitas dan kenyamanan gedung.
            </p>
          </div>
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
          <RouterLink
            to="/signup"
            class="rounded-xl border-2 border-primary-600 px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-600 hover:text-white"
          >
            <i class="pi pi-user-plus mr-1"></i> Daftar Sekarang
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
