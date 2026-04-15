<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getRoomBySlug } from '@/data/rooms'
import RoomGallerySection from '@/components/rooms/RoomGallerySection.vue'
import RoomInfoSection from '@/components/rooms/RoomInfoSection.vue'
import PaymentModal from '@/components/rooms/PaymentModal.vue'

const route = useRoute()

const slug = route.params.slug as string
const room = computed(() => getRoomBySlug(slug))

const activeImage = ref(0)
const showPaymentModal = ref(false)

function handleBooking() {
  if (!room.value) return
  showPaymentModal.value = true
}

function handlePaymentSuccess() {
  showPaymentModal.value = false
}

function closePaymentModal() {
  showPaymentModal.value = false
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

    <PaymentModal
      v-if="room"
      :show="showPaymentModal"
      :room="room"
      @success="handlePaymentSuccess"
      @close="closePaymentModal"
    />
  </main>
</template>
