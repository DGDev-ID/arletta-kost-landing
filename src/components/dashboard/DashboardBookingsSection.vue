<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const bookingStore = useBookingStore()

const emit = defineEmits<{
  cancel: [bookingId: number]
}>()
</script>

<template>
  <div class="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">Riwayat Pemesanan</h2>
      <RouterLink
        to="/rooms"
        class="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
      >
        <i class="pi pi-plus text-xs"></i> Pesan Baru
      </RouterLink>
    </div>

    <div v-if="bookingStore.bookings.length === 0" class="py-12 text-center">
      <div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <i class="pi pi-inbox text-2xl text-gray-400"></i>
      </div>
      <p class="font-medium text-gray-500">Belum ada pemesanan</p>
      <RouterLink
        to="/rooms"
        class="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline"
      >
        Cari kamar sekarang <i class="pi pi-arrow-right text-xs"></i>
      </RouterLink>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="booking in bookingStore.bookings"
        :key="booking.id"
        class="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
      >
        <div>
          <p class="font-semibold text-gray-900">{{ booking.roomName }}</p>
          <p class="text-sm text-gray-500">Dipesan: {{ booking.date }}</p>
        </div>
        <div class="flex items-center gap-3">
          <span
            :class="[
              'rounded-full px-3 py-1 text-xs font-semibold',
              booking.status === 'pending' && 'bg-yellow-100 text-yellow-700',
              booking.status === 'confirmed' && 'bg-green-100 text-green-700',
              booking.status === 'cancelled' && 'bg-red-100 text-red-700',
            ]"
          >
            {{
              booking.status === 'pending'
                ? 'Menunggu'
                : booking.status === 'confirmed'
                  ? 'Dikonfirmasi'
                  : 'Dibatalkan'
            }}
          </span>
          <button
            v-if="booking.status === 'pending'"
            @click="emit('cancel', booking.id)"
            class="flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <i class="pi pi-times text-[10px]"></i> Batalkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
