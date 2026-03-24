<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const emit = defineEmits<{
  logout: []
}>()
</script>

<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm">
    <h2 class="mb-4 text-lg font-semibold text-gray-900">Profil Penghuni</h2>
    <div class="space-y-3">
      <div>
        <p class="text-xs text-gray-400">Nama Lengkap</p>
        <p class="font-medium text-gray-900">{{ authStore.currentUser?.name }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">Email</p>
        <p class="font-medium text-gray-900">{{ authStore.currentUser?.email }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">Telepon</p>
        <p class="font-medium text-gray-900">{{ authStore.currentUser?.phone }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">Kamar</p>
        <p class="font-medium text-gray-900">
          {{ authStore.currentUser?.room ?? 'Belum menghuni' }}
        </p>
      </div>
    </div>
    <button
      @click="emit('logout')"
      class="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
    >
      <i class="pi pi-sign-out"></i>
      Logout
    </button>
  </div>
</template>
