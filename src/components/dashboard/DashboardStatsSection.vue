<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useBookingStore } from '@/stores/booking'

const authStore = useAuthStore()
const bookingStore = useBookingStore()
</script>

<template>
  <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
        <i class="pi pi-home text-xl text-primary-600"></i>
      </div>
      <p class="text-sm text-gray-500">Kamar Saat Ini</p>
      <p class="mt-1 text-lg font-bold text-gray-900">
        {{ authStore.currentUser?.room ?? 'Belum ada' }}
      </p>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
        <i class="pi pi-list text-xl text-green-600"></i>
      </div>
      <p class="text-sm text-gray-500">Total Pesanan</p>
      <p class="mt-1 text-lg font-bold text-gray-900">{{ bookingStore.bookings.length }}</p>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
        <i class="pi pi-clock text-xl text-yellow-600"></i>
      </div>
      <p class="text-sm text-gray-500">Menunggu Konfirmasi</p>
      <p class="mt-1 text-lg font-bold text-gray-900">
        {{ bookingStore.bookings.filter((b) => b.status === 'pending').length }}
      </p>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-sm">
      <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
        <i class="pi pi-phone text-xl text-blue-600"></i>
      </div>
      <p class="text-sm text-gray-500">Kontak Anda</p>
      <p class="mt-1 text-lg font-bold text-gray-900">{{ authStore.currentUser?.phone }}</p>
    </div>
  </div>
</template>
