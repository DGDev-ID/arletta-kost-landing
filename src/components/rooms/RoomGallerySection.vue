<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import type { Room } from '@/data/rooms'

const props = defineProps<{
  room: Room
  activeImage: number
}>()

const emit = defineEmits<{
  'update:activeImage': [value: number]
}>()

let autoSlideTimer: ReturnType<typeof setInterval> | null = null

function prev() {
  const newIdx = props.activeImage === 0 ? props.room.images.length - 1 : props.activeImage - 1
  emit('update:activeImage', newIdx)
}

function next() {
  const newIdx = props.activeImage === props.room.images.length - 1 ? 0 : props.activeImage + 1
  emit('update:activeImage', newIdx)
}

function goTo(idx: number) {
  emit('update:activeImage', idx)
}

function startAutoSlide() {
  stopAutoSlide()
  if (props.room.images.length < 2) return
  autoSlideTimer = setInterval(() => {
    next()
  }, 4000)
}

function stopAutoSlide() {
  if (autoSlideTimer !== null) {
    clearInterval(autoSlideTimer)
    autoSlideTimer = null
  }
}

// Restart timer when user manually changes slide
watch(
  () => props.activeImage,
  () => {
    startAutoSlide()
  },
)

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})
</script>

<template>
  <div>
    <!-- Main image with prev/next buttons -->
    <div
      class="group relative mb-4 overflow-hidden rounded-2xl"
      @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide"
    >
      <!-- Image with transition -->
      <Transition
        enter-active-class="transition duration-400 ease-out"
        enter-from-class="opacity-0 scale-105"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
        mode="out-in"
      >
        <img
          :key="activeImage"
          :src="room.images[activeImage]"
          :alt="`${room.name} foto ${activeImage + 1}`"
          class="h-80 w-full object-cover sm:h-96"
        />
      </Transition>

      <!-- Prev button -->
      <button
        v-if="room.images.length > 1"
        @click="prev"
        class="absolute top-1/2 left-3 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
        aria-label="Foto sebelumnya"
      >
        <i class="pi pi-chevron-left text-sm font-bold"></i>
      </button>

      <!-- Next button -->
      <button
        v-if="room.images.length > 1"
        @click="next"
        class="absolute top-1/2 right-3 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 group-hover:opacity-100"
        aria-label="Foto berikutnya"
      >
        <i class="pi pi-chevron-right text-sm font-bold"></i>
      </button>

      <!-- Dot indicators -->
      <div
        v-if="room.images.length > 1"
        class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5"
      >
        <button
          v-for="(_, idx) in room.images"
          :key="idx"
          @click="goTo(idx)"
          :class="[
            'h-1.5 rounded-full transition-all duration-300',
            activeImage === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
          ]"
          :aria-label="`Foto ${idx + 1}`"
        ></button>
      </div>

      <!-- Image counter -->
      <div
        v-if="room.images.length > 1"
        class="absolute top-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
      >
        {{ activeImage + 1 }} / {{ room.images.length }}
      </div>
    </div>

    <!-- Thumbnails -->
    <div v-if="room.images.length > 1" class="flex gap-3 overflow-x-auto pb-1">
      <button
        v-for="(img, idx) in room.images"
        :key="idx"
        @click="goTo(idx)"
        :class="[
          'h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
          activeImage === idx
            ? 'border-primary-600 ring-2 ring-primary-600/30'
            : 'border-transparent opacity-60 hover:opacity-100',
        ]"
      >
        <img :src="img" :alt="`${room.name} foto ${idx + 1}`" class="h-full w-full object-cover" />
      </button>
    </div>
  </div>
</template>
