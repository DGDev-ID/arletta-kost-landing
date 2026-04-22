<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import RoomCard from '@/components/rooms/RoomCard.vue'
import { fetchRooms, type ApiRoom } from '@/services/api'

const featuredRooms = ref<ApiRoom[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetchRooms({ status: 'available', per_page: 3 })
    featuredRooms.value = res.data
  } catch {
    // silently fail
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <span
          class="mb-2 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700"
        >
          Kamar Unggulan
        </span>
        <h2 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Pilihan Kamar Terbaik</h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-500">
          Temukan kamar yang sesuai dengan kebutuhan dan budget Anda. Semua kamar dilengkapi
          fasilitas modern dan lingkungan yang bersih.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 3"
          :key="i"
          class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div class="h-48 animate-pulse bg-gray-200"></div>
          <div class="p-5 space-y-3">
            <div class="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div class="h-4 w-1/2 animate-pulse rounded bg-gray-100"></div>
            <div class="h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-else-if="featuredRooms.length === 0" class="py-12 text-center text-gray-400">
        Belum ada kamar tersedia.
      </div>

      <!-- Rooms Grid -->
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RoomCard v-for="room in featuredRooms" :key="room.id" :room="room" />
      </div>

      <div class="mt-10 text-center">
        <RouterLink
          to="/rooms"
          class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg"
        >
          Lihat Semua Kamar
          <i class="pi pi-arrow-right text-sm"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
