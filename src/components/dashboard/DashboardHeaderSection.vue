<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">
      Selamat Datang, <span class="text-primary-600">{{ authStore.userName }}</span>
    </h1>
    <p class="mt-2 text-gray-500">Kelola informasi kos Anda di sini</p>
  </div>
</template>
