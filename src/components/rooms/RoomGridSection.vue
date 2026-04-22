<script setup lang="ts">
import RoomCard from '@/components/rooms/RoomCard.vue'
import type { ApiRoom } from '@/services/api'

defineProps<{
  rooms: ApiRoom[]
}>()
</script>

<template>
  <!-- Room Grid -->
  <div v-if="rooms.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
  </div>

  <!-- Empty State -->
  <div v-else class="py-20 text-center">
    <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <i class="pi pi-search text-3xl text-gray-400"></i>
    </div>
    <h3 class="text-xl font-semibold text-gray-700">Kamar tidak ditemukan</h3>
    <p class="mt-2 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
  </div>
</template>
