<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBookingStore } from '@/stores/booking'
import { useToast } from 'primevue/usetoast'
import DashboardHeaderSection from '@/components/dashboard/DashboardHeaderSection.vue'
import DashboardStatsSection from '@/components/dashboard/DashboardStatsSection.vue'
import DashboardProfileSection from '@/components/dashboard/DashboardProfileSection.vue'
import DashboardBookingsSection from '@/components/dashboard/DashboardBookingsSection.vue'

const router = useRouter()
const authStore = useAuthStore()
const bookingStore = useBookingStore()
const toast = useToast()

function handleLogout() {
  authStore.logout()
  bookingStore.clearBookings()
  toast.add({
    severity: 'info',
    summary: 'Logout Berhasil',
    detail: 'Anda telah keluar dari akun.',
    life: 3000,
  })
  router.push('/')
}

function handleCancelBooking(bookingId: number) {
  bookingStore.cancelBooking(bookingId)
  toast.add({
    severity: 'warn',
    summary: 'Pemesanan Dibatalkan',
    detail: 'Pesanan kamar telah dibatalkan.',
    life: 3000,
  })
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 pt-24 pb-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <DashboardHeaderSection />
      <DashboardStatsSection />
      <div class="grid gap-6 lg:grid-cols-3">
        <DashboardProfileSection @logout="handleLogout" />
        <DashboardBookingsSection @cancel="handleCancelBooking" />
      </div>
    </div>
  </main>
</template>
