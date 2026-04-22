<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchStats, formatPrice, type StatsData } from '@/services/api'

const stats = ref<StatsData | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    stats.value = await fetchStats()
  } catch {
    // silently fail — show fallback
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="-mt-12 relative z-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <!-- Loading state -->
      <div
        v-if="loading"
        class="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-4 md:gap-8 md:p-8"
      >
        <div v-for="i in 4" :key="i" class="text-center">
          <div class="mx-auto h-8 w-16 animate-pulse rounded bg-gray-200"></div>
          <div class="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-gray-100"></div>
        </div>
      </div>

      <!-- Data loaded -->
      <div
        v-else-if="stats"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow-xl md:gap-8 md:p-8"
      >
        <div class="text-center">
          <p class="text-3xl font-bold text-primary-600">{{ stats.available_rooms }}+</p>
          <p class="mt-1 flex items-center justify-center gap-1 text-sm text-gray-500">
            <i class="pi pi-home text-xs"></i> Kamar Tersedia
          </p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-primary-600">{{ stats.total_rooms }}</p>
          <p class="mt-1 flex items-center justify-center gap-1 text-sm text-gray-500">
            <i class="pi pi-building text-xs"></i> Total Kamar
          </p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-primary-600">{{ stats.total_categories }}</p>
          <p class="mt-1 flex items-center justify-center gap-1 text-sm text-gray-500">
            <i class="pi pi-list text-xs"></i> Tipe Kamar
          </p>
        </div>
        
      </div>
    </div>
  </section>
</template>
