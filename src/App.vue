<script setup lang="ts">
import AppNavbar from '@/components/shared/AppNavbar.vue'
import AppFooter from '@/components/shared/AppFooter.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Toast position="top-right" />
    <AppNavbar />
    <div class="flex-1">
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped></style>
