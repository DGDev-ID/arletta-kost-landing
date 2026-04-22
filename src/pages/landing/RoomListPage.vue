<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { fetchRooms, type ApiRoom } from '@/services/api'
import RoomListHeaderSection from '@/components/rooms/RoomListHeaderSection.vue'
import RoomFilterSection from '@/components/rooms/RoomFilterSection.vue'
import RoomGridSection from '@/components/rooms/RoomGridSection.vue'

const selectedCategory = ref('semua')
const searchQuery = ref('')
const rooms = ref<ApiRoom[]>([])
const loading = ref(true)

const categoryOptions = ref<{ value: string; label: string; icon: string }[]>([
  { value: 'semua', label: 'Semua', icon: 'pi pi-list' },
])

async function loadRooms() {
  loading.value = true
  try {
    const params: Record<string, string | number> = { per_page: 50 }
    if (searchQuery.value) params.q = searchQuery.value
    
    console.log('📦 Fetching with params:', params)

    const res = await fetchRooms(params)
    rooms.value = res.data

    // Build dynamic category options from fetched data
    const catNames = new Set<string>()
    for (const room of res.data) {
      catNames.add(room.category.name)
    }
    // Reset to base option + dynamic ones
    categoryOptions.value = [
      { value: 'semua', label: 'Semua', icon: 'pi pi-list' },
      ...[...catNames].map(name => ({ value: name, label: name, icon: 'pi pi-tag' })),
    ]
  } catch {
    rooms.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadRooms)

// Debounced search
let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(loadRooms, 400)
})

// Filtered rooms (client-side category filter on already-fetched data)
import { computed } from 'vue'
const filteredRooms = computed(() => {
  if (selectedCategory.value === 'semua') return rooms.value
  return rooms.value.filter((r) => r.category.name === selectedCategory.value)
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 pt-24 pb-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <RoomListHeaderSection />
      <RoomFilterSection
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :category-options="categoryOptions"
        @update:search-query="searchQuery = $event"
        @update:selected-category="selectedCategory = $event"
      />

      <!-- Loading -->
      <div v-if="loading" class="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 6"
          :key="i"
          class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div class="h-48 animate-pulse bg-gray-200"></div>
          <div class="p-5 space-y-3">
            <div class="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div class="h-4 w-1/2 animate-pulse rounded bg-gray-100"></div>
          </div>
        </div>
      </div>

      <RoomGridSection v-else :rooms="filteredRooms" />
    </div>
  </main>
</template>
