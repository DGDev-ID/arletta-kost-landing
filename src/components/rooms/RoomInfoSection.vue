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
      <span
        :class="[
          'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.type === 'putri' ? 'bg-pink-100 text-pink-700' : 'bg-sky-100 text-sky-700',
        ]"
      >
        <i :class="room.type === 'putri' ? 'pi pi-venus' : 'pi pi-mars'" class="text-[10px]"></i>
        {{ room.type === 'putri' ? 'Khusus Wanita' : 'Khusus Pria' }}
      </span>
    </div>

    <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ room.name }}</h1>
    <p class="mb-6 text-gray-500">Ukuran: {{ room.size }}</p>

    <!-- Pricing Table -->
    <div class="mb-6 overflow-hidden rounded-xl border border-gray-200">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-primary-700 text-white">
            <th class="px-4 py-3 text-left font-semibold">Durasi</th>
            <th class="px-4 py-3 text-right font-semibold">Harga</th>
            <th class="px-4 py-3 text-right font-semibold text-primary-200">Per Bulan</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr class="bg-accent-50">
            <td class="px-4 py-3 font-medium text-gray-700">
              <i class="pi pi-calendar mr-1.5 text-accent-500 text-xs"></i>1 Bulan
            </td>
            <td class="px-4 py-3 text-right font-bold text-primary-600">
              {{ formatPrice(room.pricing.monthly) }}
            </td>
            <td class="px-4 py-3 text-right text-gray-400">—</td>
          </tr>
          <tr class="bg-white hover:bg-gray-50">
            <td class="px-4 py-3 font-medium text-gray-700">
              <i class="pi pi-calendar mr-1.5 text-primary-400 text-xs"></i>6 Bulan
            </td>
            <td class="px-4 py-3 text-right font-bold text-primary-600">
              {{ formatPrice(room.pricing.sixMonths) }}
            </td>
            <td class="px-4 py-3 text-right text-xs text-gray-400">
              {{ formatPrice(Math.round(room.pricing.sixMonths / 6)) }}/bln
            </td>
          </tr>
          <tr class="bg-white hover:bg-gray-50">
            <td class="px-4 py-3 font-medium text-gray-700">
              <i class="pi pi-calendar mr-1.5 text-green-400 text-xs"></i>12 Bulan
            </td>
            <td class="px-4 py-3 text-right font-bold text-primary-600">
              {{ formatPrice(room.pricing.twelveMonths) }}
            </td>
            <td class="px-4 py-3 text-right text-xs text-gray-400">
              {{ formatPrice(Math.round(room.pricing.twelveMonths / 12)) }}/bln
            </td>
          </tr>
        </tbody>
      </table>
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
