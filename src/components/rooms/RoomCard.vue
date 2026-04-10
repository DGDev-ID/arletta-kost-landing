<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { formatPrice, categoryMeta, type Room } from '@/data/rooms'

defineProps<{
  room: Room
}>()
</script>

<template>
  <RouterLink
    :to="`/rooms/${room.slug}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="room.image"
        :alt="room.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Availability Badge -->
      <span
        :class="[
          'absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        ]"
      >
        <i
          :class="room.available ? 'pi pi-check-circle' : 'pi pi-times-circle'"
          class="text-[10px]"
        ></i>
        {{ room.available ? 'Tersedia' : 'Penuh' }}
      </span>
      <!-- Category Badge -->
      <span
        :class="[
          'absolute top-3 left-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          categoryMeta[room.category].color,
        ]"
      >
        <i :class="categoryMeta[room.category].icon" class="text-[10px]"></i>
        {{ categoryMeta[room.category].label }}
      </span>
      <!-- Type Badge -->
      <span
        :class="[
          'absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
          room.type === 'putri' ? 'bg-pink-100 text-pink-700' : 'bg-sky-100 text-sky-700',
        ]"
      >
        <i :class="room.type === 'putri' ? 'pi pi-venus' : 'pi pi-mars'" class="text-[10px]"></i>
        {{ room.type === 'putri' ? 'Wanita' : 'Pria' }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5">
      <h3 class="mb-1 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
        {{ room.name }}
      </h3>
      <p class="mb-3 flex items-center gap-1 text-sm text-gray-500">
        <i class="pi pi-expand text-xs"></i> {{ room.size }}
      </p>

      <!-- Facilities Preview -->
      <div class="mb-4 flex flex-wrap gap-1.5">
        <span
          v-for="(facility, idx) in room.facilities.slice(0, 3)"
          :key="idx"
          class="rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700"
        >
          {{ facility }}
        </span>
        <span
          v-if="room.facilities.length > 3"
          class="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
        >
          +{{ room.facilities.length - 3 }} lainnya
        </span>
      </div>

      <!-- Price -->
      <div class="mt-auto flex items-center justify-between">
        <div>
          <span class="text-lg font-bold text-primary-600">{{ formatPrice(room.price) }}</span>
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
