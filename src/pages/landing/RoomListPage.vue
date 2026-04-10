<script setup lang="ts">
import { ref, computed } from 'vue'
import { rooms, type RoomCategory } from '@/data/rooms'
import RoomListHeaderSection from '@/components/rooms/RoomListHeaderSection.vue'
import RoomFilterSection from '@/components/rooms/RoomFilterSection.vue'
import RoomGridSection from '@/components/rooms/RoomGridSection.vue'

type FilterCategory = 'semua' | RoomCategory

const selectedCategory = ref<FilterCategory>('semua')
const searchQuery = ref('')

const filteredRooms = computed(() => {
  return rooms.filter((room) => {
    const matchesCategory =
      selectedCategory.value === 'semua' || room.category === selectedCategory.value
    const matchesSearch =
      searchQuery.value === '' ||
      room.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const categoryOptions: { value: FilterCategory; label: string; icon: string }[] = [
  { value: 'semua', label: 'Semua', icon: 'pi pi-list' },
  { value: 'standard', label: 'Standard', icon: 'pi pi-home' },
  { value: 'superior', label: 'Superior', icon: 'pi pi-star' },
  { value: 'junior-suite', label: 'Junior Suite', icon: 'pi pi-crown' },
  { value: 'suite', label: 'Suite', icon: 'pi pi-building' },
]
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
      <RoomGridSection :rooms="filteredRooms" />
    </div>
  </main>
</template>
