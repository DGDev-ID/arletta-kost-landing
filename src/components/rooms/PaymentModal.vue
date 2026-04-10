<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { formatPrice, type Room } from '@/data/rooms'

const props = defineProps<{
  show: boolean
  room: Room
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const toast = useToast()
const paymentStep = ref<'summary' | 'processing' | 'success' | 'error'>('summary')
const selectedPayment = ref('bca_va')

const paymentMethods = [
  { id: 'bca_va', name: 'BCA Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'bni_va', name: 'BNI Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'bri_va', name: 'BRI Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'gopay', name: 'GoPay', icon: 'pi pi-wallet', category: 'E-Wallet' },
  { id: 'shopeepay', name: 'ShopeePay', icon: 'pi pi-wallet', category: 'E-Wallet' },
  { id: 'credit_card', name: 'Credit Card', icon: 'pi pi-credit-card', category: 'Kartu Kredit' },
]

function processPayment() {
  paymentStep.value = 'processing'

  // Simulate Midtrans payment processing (no backend)
  setTimeout(() => {
    // Simulate success (80% chance) or failure (20% chance)
    const isSuccess = Math.random() > 0.2
    if (isSuccess) {
      paymentStep.value = 'success'
      toast.add({
        severity: 'success',
        summary: 'Pembayaran Berhasil',
        detail: `Pembayaran untuk ${props.room.name} telah dikonfirmasi.`,
        life: 4000,
      })
    } else {
      paymentStep.value = 'error'
      toast.add({
        severity: 'error',
        summary: 'Pembayaran Gagal',
        detail: 'Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.',
        life: 4000,
      })
    }
  }, 2500)
}

function handleClose() {
  if (paymentStep.value === 'success') {
    emit('success')
  }
  emit('close')
  // Reset state after close animation
  setTimeout(() => {
    paymentStep.value = 'summary'
    selectedPayment.value = 'bca_va'
  }, 300)
}

function retryPayment() {
  paymentStep.value = 'summary'
}

// Reset when modal opens
onMounted(() => {
  paymentStep.value = 'summary'
})
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
        class="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="handleClose"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div v-if="show" class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <!-- Header -->
            <div
              class="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <i class="pi pi-credit-card text-lg text-primary-600"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Pembayaran</h3>
                  <p class="text-xs text-gray-500">Powered by Midtrans</p>
                </div>
              </div>
              <button
                @click="handleClose"
                class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
              >
                <i class="pi pi-times text-sm"></i>
              </button>
            </div>

            <!-- Step: Summary -->
            <div v-if="paymentStep === 'summary'" class="p-6">
              <!-- Room Info -->
              <div class="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div class="flex items-start gap-4">
                  <img
                    :src="room.image"
                    :alt="room.name"
                    class="h-16 w-16 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ room.name }}</h4>
                    <p class="text-sm text-gray-500">{{ room.size }}</p>
                    <p class="mt-1 text-lg font-bold text-primary-600">
                      {{ formatPrice(room.pricing.monthly)
                      }}<span class="text-sm font-normal text-gray-400">/bulan</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="mb-6 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Sewa 1 bulan</span>
                  <span class="text-gray-900">{{ formatPrice(room.pricing.monthly) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Deposit (1 bulan)</span>
                  <span class="text-gray-900">{{ formatPrice(room.pricing.monthly) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Biaya admin</span>
                  <span class="text-gray-900">{{ formatPrice(25000) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-900">Total</span>
                    <span class="text-xl font-bold text-primary-600">
                      {{ formatPrice(room.pricing.monthly * 2 + 25000) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="mb-6">
                <h4 class="mb-3 text-sm font-semibold text-gray-700">Metode Pembayaran</h4>
                <div class="space-y-2">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    :class="[
                      'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all',
                      selectedPayment === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-100 hover:border-gray-200',
                    ]"
                  >
                    <input
                      v-model="selectedPayment"
                      type="radio"
                      :value="method.id"
                      class="sr-only"
                    />
                    <div
                      :class="[
                        'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                        selectedPayment === method.id ? 'border-primary-500' : 'border-gray-300',
                      ]"
                    >
                      <div
                        v-if="selectedPayment === method.id"
                        class="h-2.5 w-2.5 rounded-full bg-primary-500"
                      ></div>
                    </div>
                    <i :class="method.icon" class="text-gray-500"></i>
                    <div class="flex-1">
                      <span class="text-sm font-medium text-gray-900">{{ method.name }}</span>
                    </div>
                    <span class="text-xs text-gray-400">{{ method.category }}</span>
                  </label>
                </div>
              </div>

              <!-- Sandbox Notice -->
              <div
                class="mb-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
              >
                <i class="pi pi-info-circle mt-0.5 text-sm text-amber-600"></i>
                <p class="text-xs text-amber-700">
                  <strong>Mode Sandbox:</strong> Ini adalah simulasi pembayaran Midtrans. Belum
                  terhubung ke backend, tidak ada transaksi nyata yang diproses.
                </p>
              </div>

              <!-- Pay Button -->
              <button
                @click="processPayment"
                class="w-full rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
              >
                Bayar {{ formatPrice(room.pricing.monthly * 2 + 25000) }}
              </button>
            </div>

            <!-- Step: Processing -->
            <div
              v-else-if="paymentStep === 'processing'"
              class="flex flex-col items-center px-6 py-16"
            >
              <div
                class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50"
              >
                <i class="pi pi-spin pi-spinner text-4xl text-primary-600"></i>
              </div>
              <h3 class="mb-2 text-xl font-bold text-gray-900">Memproses Pembayaran</h3>
              <p class="text-center text-sm text-gray-500">
                Mohon tunggu, pembayaran Anda sedang diproses melalui Midtrans...
              </p>
            </div>

            <!-- Step: Success -->
            <div
              v-else-if="paymentStep === 'success'"
              class="flex flex-col items-center px-6 py-12"
            >
              <div
                class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
              >
                <i class="pi pi-check-circle text-4xl text-green-600"></i>
              </div>
              <h3 class="mb-2 text-2xl font-bold text-gray-900">Pembayaran Berhasil!</h3>
              <p class="mb-2 text-center text-gray-500">
                Kamar <strong>{{ room.name }}</strong> telah berhasil dipesan dan dibayar.
              </p>
              <p class="mb-6 text-center text-sm text-gray-400">
                ID Transaksi:
                <code class="rounded bg-gray-100 px-2 py-0.5 text-gray-600"
                  >MID-{{ Date.now().toString(36).toUpperCase() }}</code
                >
              </p>
              <div class="flex w-full flex-col gap-3 sm:flex-row">
                <RouterLink
                  to="/dashboard"
                  class="flex-1 rounded-xl bg-primary-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Ke Dashboard
                </RouterLink>
                <button
                  @click="handleClose"
                  class="flex-1 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Tutup
                </button>
              </div>
            </div>

            <!-- Step: Error -->
            <div v-else-if="paymentStep === 'error'" class="flex flex-col items-center px-6 py-12">
              <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <i class="pi pi-times-circle text-4xl text-red-600"></i>
              </div>
              <h3 class="mb-2 text-2xl font-bold text-gray-900">Pembayaran Gagal</h3>
              <p class="mb-6 text-center text-gray-500">
                Terjadi kesalahan saat memproses pembayaran Anda. Silakan coba lagi.
              </p>
              <div class="flex w-full flex-col gap-3 sm:flex-row">
                <button
                  @click="retryPayment"
                  class="flex-1 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Coba Lagi
                </button>
                <button
                  @click="handleClose"
                  class="flex-1 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
