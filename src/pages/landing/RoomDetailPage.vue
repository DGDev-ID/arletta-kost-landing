<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getRoomBySlug } from '@/data/rooms'
import { useAuthStore } from '@/stores/auth'
import { useBookingStore } from '@/stores/booking'
import { useToast } from 'primevue/usetoast'
import RoomGallerySection from '@/components/rooms/RoomGallerySection.vue'
import RoomInfoSection from '@/components/rooms/RoomInfoSection.vue'
import RoomBookingModal from '@/components/rooms/RoomBookingModal.vue'
import PaymentModal from '@/components/rooms/PaymentModal.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const bookingStore = useBookingStore()
const toast = useToast()

const slug = route.params.slug as string
const room = computed(() => getRoomBySlug(slug))

const activeImage = ref(0)
const showBookingModal = ref(false)
const showPaymentModal = ref(false)

function handleBooking() {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: 'warn',
      summary: 'Login Diperlukan',
      detail: 'Silakan login terlebih dahulu untuk memesan kamar.',
      life: 3000,
    })
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }

  if (!room.value) return

  // Show payment modal instead of directly booking
  showPaymentModal.value = true
}

function handlePaymentSuccess() {
  if (!room.value) return

  bookingStore.addBooking(room.value.name, room.value.slug)
  showPaymentModal.value = false
  showBookingModal.value = true
}

function closePaymentModal() {
  showPaymentModal.value = false
}

function closeModal() {
  showBookingModal.value = false
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 pt-24 pb-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <RouterLink
        to="/rooms"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary-600"
      >
        <i class="pi pi-arrow-left text-xs"></i>
        Kembali ke Daftar Kamar
      </RouterLink>

      <!-- Not Found -->
      <div v-if="!room" class="py-20 text-center">
        <div
          class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100"
        >
          <i class="pi pi-question-circle text-4xl text-gray-400"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-700">Kamar tidak ditemukan</h2>
        <RouterLink to="/rooms" class="mt-4 inline-block text-primary-600 hover:underline">
          Lihat semua kamar
        </RouterLink>
      </div>

      <!-- Room Detail -->
      <template v-else>
        <div class="grid gap-8 lg:grid-cols-2">
          <RoomGallerySection
            :room="room"
            :active-image="activeImage"
            @update:active-image="activeImage = $event"
          />
          <RoomInfoSection :room="room" @book="handleBooking" />
        </div>
      </template>
    </div>

    <RoomBookingModal :show="showBookingModal" :room-name="room?.name ?? ''" @close="closeModal" />

    <PaymentModal
      v-if="room"
      :show="showPaymentModal"
      :room="room"
      @success="handlePaymentSuccess"
      @close="closePaymentModal"
    />
  </main>
</template>
