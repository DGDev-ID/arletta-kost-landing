<script setup lang="ts">
import type { Feature } from '@/data/features'

defineProps<{
  feature: Feature
}>()
</script>

<template>
  <div
    class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
  >
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50">
      <i :class="[feature.icon, 'text-2xl text-primary-600']"></i>
    </div>
    <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ feature.title }}</h3>
    <p class="leading-relaxed text-gray-500">{{ feature.description }}</p>
  </div>
</template>
