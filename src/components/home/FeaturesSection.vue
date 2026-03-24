<script setup lang="ts">
import FeatureCard from '@/components/home/FeatureCard.vue'
import { features } from '@/data/features'
</script>

<template>
  <section id="features" class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <span
          class="mb-2 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700"
        >
          Keunggulan Kami
        </span>
        <h2 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Mengapa Memilih ArlettaKost?
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-500">
          Kami berkomitmen memberikan pengalaman tinggal terbaik dengan fasilitas lengkap dan
          pelayanan prima.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard v-for="(feature, idx) in features" :key="idx" :feature="feature" />
      </div>
    </div>
  </section>
</template>
