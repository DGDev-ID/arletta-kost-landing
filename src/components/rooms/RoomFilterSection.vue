<script setup lang="ts">
defineProps<{
  searchQuery: string
  selectedCategory: string
  categoryOptions: { value: string; label: string; icon: string }[]
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
}>()

function onSearchInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:searchQuery', target.value)
}
</script>

<template>
  <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <!-- Search -->
    <div class="relative w-full sm:max-w-xs">
      <i
        class="pi pi-search pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"
      ></i>
      <input
        :value="searchQuery"
        @input="onSearchInput"
        type="text"
        placeholder="Cari kamar..."
        class="w-full rounded-xl border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
      />
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="opt in categoryOptions"
        :key="opt.value"
        @click="emit('update:selectedCategory', opt.value)"
        :class="[
          'flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all',
          selectedCategory === opt.value
            ? 'bg-primary-600 text-white shadow-sm'
            : 'bg-white text-gray-600 hover:bg-gray-100',
        ]"
      >
        <i :class="opt.icon" class="text-xs"></i>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
