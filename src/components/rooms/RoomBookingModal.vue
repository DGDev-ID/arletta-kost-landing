<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  show: boolean
  roomName: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <i class="pi pi-check-circle text-4xl text-green-600"></i>
          </div>
          <h3 class="mb-2 text-2xl font-bold text-gray-900">Pemesanan Berhasil!</h3>
          <p class="mb-6 text-gray-500">
            Kamar <strong>{{ roomName }}</strong> telah berhasil dipesan. Silakan cek dashboard Anda
            untuk melihat status pemesanan.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/dashboard"
              class="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Ke Dashboard
            </RouterLink>
            <button
              @click="emit('close')"
              class="flex-1 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
