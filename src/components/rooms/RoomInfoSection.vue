<script setup lang="ts">
import { formatPrice, type ApiRoom } from '@/services/api'

defineProps<{
  room: ApiRoom
}>()

const emit = defineEmits<{
  book: []
}>()
</script>

<template>
  <div>
    <div class="mb-2 flex flex-wrap items-center gap-3">
      <span
        :class="[
          'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
        ]"
      >
        <i
          :class="room.status === 'available' ? 'pi pi-check-circle' : 'pi pi-times-circle'"
          class="text-[10px]"
        ></i>
        {{ room.status === 'available' ? 'Tersedia' : room.status === 'maintenance' ? 'Maintenance' : 'Penuh' }}
      </span>
      <span
        class="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
      >
        <i class="pi pi-tag text-[10px]"></i>
        {{ room.category.name }}
      </span>
      <span
        v-if="room.gender"
        :class="[
          'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
          room.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-sky-100 text-sky-700',
        ]"
      >
        <i :class="room.gender === 'female' ? 'pi pi-venus' : 'pi pi-mars'" class="text-[10px]"></i>
        {{ room.gender === 'female' ? 'Khusus Wanita' : 'Khusus Pria' }}
      </span>
    </div>

    <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ room.category.name }} — {{ room.room_number }}</h1>
    <p class="mb-6 text-gray-500">
      <i class="pi pi-building mr-1 text-xs"></i>{{ room.kost.name }}
      <span v-if="room.kost.address"> · {{ room.kost.address }}</span>
    </p>

    <!-- Pricing Table -->
    <div v-if="room.pricings && room.pricings.length > 0" class="mb-6 overflow-hidden rounded-xl border border-gray-200">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-primary-700 text-white">
            <th class="px-4 py-3 text-left font-semibold">Durasi</th>
            <th class="px-4 py-3 text-right font-semibold">Harga</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(pricing, idx) in room.pricings"
            :key="pricing.id"
            :class="idx === 0 ? 'bg-accent-50' : 'bg-white hover:bg-gray-50'"
          >
            <td class="px-4 py-3 font-medium text-gray-700">
              <i class="pi pi-calendar mr-1.5 text-xs" :class="idx === 0 ? 'text-accent-500' : 'text-primary-400'"></i>
              {{ pricing.price_display.split(' / ')[1] || pricing.duration_days + ' hari' }}
            </td>
            <td class="px-4 py-3 text-right font-bold text-primary-600">
              {{ formatPrice(pricing.price) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Description -->
    <div v-if="room.category.description" class="mb-6">
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Deskripsi</h3>
      <p class="leading-relaxed text-gray-600">{{ room.category.description }}</p>
    </div>

    <!-- Facilities / Details -->
    <div v-if="room.details && room.details.length > 0" class="mb-8">
      <h3 class="mb-3 text-lg font-semibold text-gray-900">Fasilitas</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="detail in room.details"
          :key="detail.id"
          class="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          <i class="pi pi-check text-xs text-primary-500"></i>
          {{ detail.detail }}
        </span>
      </div>
    </div>

    <!-- Booking Button -->
    <button
      v-if="room.status === 'available'"
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
