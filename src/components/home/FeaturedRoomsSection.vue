<script setup lang="ts">
import { RouterLink } from 'vue-router'
import RoomCard from '@/components/rooms/RoomCard.vue'
import { rooms } from '@/data/rooms'

const featuredRooms = rooms.filter((r) => r.available).slice(0, 3)
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

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
