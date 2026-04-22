<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { formatPrice, type ApiRoom } from '@/services/api'

defineProps<{
  room: ApiRoom
}>()
</script>

<template>
  <RouterLink
    :to="`/rooms/${room.id}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        v-if="room.images && room.images.length > 0"
        :src="room.images[0].url"
        :alt="room.category.name + ' — ' + room.room_number"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-gray-100">
        <i class="pi pi-image text-4xl text-gray-300"></i>
      </div>
      <!-- Availability Badge -->
      <span
        :class="[
          'absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        ]"
      >
        <i
          :class="room.status === 'available' ? 'pi pi-check-circle' : 'pi pi-times-circle'"
          class="text-[10px]"
        ></i>
        {{ room.status === 'available' ? 'Tersedia' : room.status === 'maintenance' ? 'Maintenance' : 'Penuh' }}
      </span>
      <!-- Category Badge -->
      <span
        class="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
      >
        <i class="pi pi-tag text-[10px]"></i>
        {{ room.category.name }}
      </span>
      <!-- Gender Badge -->
      <span
        v-if="room.gender"
        :class="[
          'absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          room.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-sky-100 text-sky-700',
        ]"
      >
        <i :class="room.gender === 'female' ? 'pi pi-venus' : 'pi pi-mars'" class="text-[10px]"></i>
        {{ room.gender === 'female' ? 'Wanita' : 'Pria' }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5">
      <h3 class="mb-1 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
        {{ room.category.name }} — {{ room.room_number }}
      </h3>
      <p class="mb-3 flex items-center gap-1 text-sm text-gray-500">
        <i class="pi pi-building text-xs"></i> {{ room.kost.name }}
      </p>

      <!-- Facilities Preview -->
      <div v-if="room.details && room.details.length > 0" class="mb-4 flex flex-wrap gap-1.5">
        <span
          v-for="(detail, idx) in room.details.slice(0, 3)"
          :key="idx"
          class="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700"
        >
          {{ detail.detail }}
        </span>
        <span
          v-if="room.details.length > 3"
          class="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
        >
          +{{ room.details.length - 3 }} lainnya
        </span>
      </div>

      <!-- Price -->
      <div class="mt-auto flex items-center justify-between">
        <div>
          <span class="text-lg font-bold text-primary-600">{{ formatPrice(room.minimum_price) }}</span>
          <span class="text-sm text-gray-400">/bulan</span>
        </div>
        <span
          class="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-primary-700"
        >
          Lihat Detail <i class="pi pi-arrow-right text-[10px]"></i>
        </span>
      </div>
    </div>
  </RouterLink>
</template>
