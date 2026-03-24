<script setup lang="ts">
import { formatPrice, categoryMeta, type Room } from '@/data/rooms'

defineProps<{
  room: Room
}>()

const emit = defineEmits<{
  book: []
}>()
</script>

<template>
  <div>
    <div class="mb-2 flex items-center gap-3">
      <span
        :class="[
          'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        ]"
      >
        <i
          :class="room.available ? 'pi pi-check-circle' : 'pi pi-times-circle'"
          class="text-[10px]"
        ></i>
        {{ room.available ? 'Tersedia' : 'Penuh' }}
      </span>
      <span
        :class="[
          'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          categoryMeta[room.category].color,
        ]"
      >
        <i :class="categoryMeta[room.category].icon" class="text-[10px]"></i>
        {{ categoryMeta[room.category].label }}
      </span>
    </div>

    <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ room.name }}</h1>
    <p class="mb-6 text-gray-500">Ukuran: {{ room.size }}</p>

    <!-- Price -->
    <div class="mb-6 rounded-xl bg-primary-50 p-4">
      <p class="text-sm text-gray-500">Harga per bulan</p>
      <p class="text-3xl font-bold text-primary-600">{{ formatPrice(room.price) }}</p>
    </div>

    <!-- Description -->
    <div class="mb-6">
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Deskripsi</h3>
      <p class="leading-relaxed text-gray-600">{{ room.description }}</p>
    </div>

    <!-- Facilities -->
    <div class="mb-8">
      <h3 class="mb-3 text-lg font-semibold text-gray-900">Fasilitas</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(facility, idx) in room.facilities"
          :key="idx"
          class="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          <i class="pi pi-check text-xs text-primary-500"></i>
          {{ facility }}
        </span>
      </div>
    </div>

    <!-- Booking Button -->
    <button
      v-if="room.available"
      @click="emit('book')"
      class="w-full rounded-xl bg-primary-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
    >
      Pesan Kamar Ini
    </button>
    <div
      v-else
      class="w-full rounded-xl bg-gray-300 px-8 py-3.5 text-center text-lg font-semibold text-gray-500"
    >
      Kamar Tidak Tersedia
    </div>
  </div>
</template>
