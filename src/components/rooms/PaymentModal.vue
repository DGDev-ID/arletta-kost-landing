<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { formatPrice, type ApiRoom, type ApiPricing } from '@/services/api'

const props = defineProps<{
  show: boolean
  room: ApiRoom
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const toast = useToast()
const paymentStep = ref<'guest-form' | 'summary' | 'processing' | 'success' | 'error'>('guest-form')
const selectedPayment = ref('bca_va')
const selectedPricingId = ref<number | null>(null)

const guestForm = reactive({ name: '', email: '', phone: '' })
const formErrors = reactive({ name: '', email: '', phone: '' })

// Sorted pricings by duration
const sortedPricings = computed(() =>
  [...(props.room.pricings ?? [])].sort((a, b) => a.duration_days - b.duration_days)
)

// Auto-select first pricing
onMounted(() => {
  resetState()
})

const selectedPricing = computed<ApiPricing | null>(() => {
  if (!selectedPricingId.value && sortedPricings.value.length > 0) {
    return sortedPricings.value[0]
  }
  return sortedPricings.value.find((p) => p.id === selectedPricingId.value) ?? null
})

const paymentMethods = [
  { id: 'bca_va', name: 'BCA Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'bni_va', name: 'BNI Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'bri_va', name: 'BRI Virtual Account', icon: 'pi pi-building', category: 'Bank Transfer' },
  { id: 'gopay', name: 'GoPay', icon: 'pi pi-wallet', category: 'E-Wallet' },
  { id: 'shopeepay', name: 'ShopeePay', icon: 'pi pi-wallet', category: 'E-Wallet' },
  { id: 'credit_card', name: 'Credit Card', icon: 'pi pi-credit-card', category: 'Kartu Kredit' },
]

function validateGuestForm(): boolean {
  formErrors.name = ''
  formErrors.email = ''
  formErrors.phone = ''
  let valid = true
  if (!guestForm.name.trim()) {
    formErrors.name = 'Nama lengkap wajib diisi.'
    valid = false
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!guestForm.email.trim()) {
    formErrors.email = 'Email wajib diisi.'
    valid = false
  } else if (!emailRe.test(guestForm.email)) {
    formErrors.email = 'Format email tidak valid.'
    valid = false
  }
  if (!guestForm.phone.trim()) {
    formErrors.phone = 'No. HP wajib diisi.'
    valid = false
  } else if (!/^[0-9+]{8,15}$/.test(guestForm.phone.replace(/\s/g, ''))) {
    formErrors.phone = 'No. HP tidak valid (8-15 angka).'
    valid = false
  }
  return valid
}

function getDurationLabel(): string {
  if (!selectedPricing.value) return ''
  return selectedPricing.value.price_display.split('Rp')[0] || `${selectedPricing.value.duration_days} hari`
}

function getRentalPrice(): number {
  return selectedPricing.value?.price ?? 0
}

function getDeposit(): number {
  // Deposit = cheapest pricing (monthly)
  return sortedPricings.value.length > 0 ? sortedPricings.value[0].price : 0
}

function getTotalPrice(): number {
  return getRentalPrice() + getDeposit() + 25000
}

function roomDisplayName(): string {
  return `${props.room.category.name} — ${props.room.room_number}`
}

function roomImageUrl(): string | null {
  return props.room.images?.[0]?.url ?? null
}

function submitGuestForm() {
  if (validateGuestForm()) paymentStep.value = 'summary'
}

function processPayment() {
  paymentStep.value = 'processing'
  setTimeout(() => {
    if (Math.random() > 0.2) {
      paymentStep.value = 'success'
      toast.add({
        severity: 'success',
        summary: 'Pembayaran Berhasil',
        detail: `Pemesanan ${roomDisplayName()} atas nama ${guestForm.name} dikonfirmasi.`,
        life: 4000,
      })
    } else {
      paymentStep.value = 'error'
      toast.add({
        severity: 'error',
        summary: 'Pembayaran Gagal',
        detail: 'Terjadi kesalahan. Silakan coba lagi.',
        life: 4000,
      })
    }
  }, 2500)
}

function handleClose() {
  if (paymentStep.value === 'success') emit('success')
  emit('close')
  setTimeout(resetState, 300)
}

function retryPayment() {
  paymentStep.value = 'summary'
}

function resetState() {
  paymentStep.value = 'guest-form'
  selectedPayment.value = 'bca_va'
  selectedPricingId.value = sortedPricings.value.length > 0 ? sortedPricings.value[0].id : null
  guestForm.name = ''
  guestForm.email = ''
  guestForm.phone = ''
  formErrors.name = ''
  formErrors.email = ''
  formErrors.phone = ''
}
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
          <div
            v-if="show"
            class="w-full max-w-lg overflow-y-auto max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-4"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                  <i class="pi pi-credit-card text-lg text-primary-600"></i>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">
                    <template v-if="paymentStep === 'guest-form'">Data Pemesan</template>
                    <template v-else-if="paymentStep === 'summary'">Konfirmasi Pembayaran</template>
                    <template v-else-if="paymentStep === 'processing'">Memproses...</template>
                    <template v-else-if="paymentStep === 'success'">Berhasil</template>
                    <template v-else>Pembayaran Gagal</template>
                  </h3>
                  <p class="text-xs text-gray-500">
                    <template v-if="paymentStep === 'guest-form'"
                      >Isi data diri untuk melanjutkan</template
                    >
                    <template v-else>Powered by Midtrans</template>
                  </p>
                </div>
              </div>
              <button
                @click="handleClose"
                class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
              >
                <i class="pi pi-times text-sm"></i>
              </button>
            </div>

            <!-- ── Step: Guest Form ── -->
            <div v-if="paymentStep === 'guest-form'" class="p-6">
              <!-- Room mini-info -->
              <div
                class="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <img v-if="roomImageUrl()" :src="roomImageUrl()!" :alt="roomDisplayName()" class="h-12 w-12 rounded-lg object-cover" />
                <div v-else class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
                  <i class="pi pi-image text-gray-400"></i>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ roomDisplayName() }}</p>
                  <p class="text-xs font-bold text-primary-600">
                    {{ formatPrice(getRentalPrice())
                    }}<span class="font-normal text-gray-400">/bulan</span>
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <!-- Name -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i
                      class="pi pi-user absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                    ></i>
                    <input
                      v-model="guestForm.name"
                      type="text"
                      placeholder="Contoh: Budi Santoso"
                      :class="[
                        'w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-primary-300',
                        formErrors.name
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 bg-white focus:border-primary-400',
                      ]"
                      @keyup.enter="submitGuestForm"
                    />
                  </div>
                  <p v-if="formErrors.name" class="mt-1 text-xs text-red-500">
                    {{ formErrors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700">
                    Alamat Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i
                      class="pi pi-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                    ></i>
                    <input
                      v-model="guestForm.email"
                      type="email"
                      placeholder="contoh@email.com"
                      :class="[
                        'w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-primary-300',
                        formErrors.email
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 bg-white focus:border-primary-400',
                      ]"
                      @keyup.enter="submitGuestForm"
                    />
                  </div>
                  <p v-if="formErrors.email" class="mt-1 text-xs text-red-500">
                    {{ formErrors.email }}
                  </p>
                </div>

                <!-- Phone -->
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700">
                    No. HP / WhatsApp <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <i
                      class="pi pi-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400"
                    ></i>
                    <input
                      v-model="guestForm.phone"
                      type="tel"
                      placeholder="08123456789"
                      :class="[
                        'w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-primary-300',
                        formErrors.phone
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 bg-white focus:border-primary-400',
                      ]"
                      @keyup.enter="submitGuestForm"
                    />
                  </div>
                  <p v-if="formErrors.phone" class="mt-1 text-xs text-red-500">
                    {{ formErrors.phone }}
                  </p>
                </div>

                <!-- Duration Selection — dynamic from API pricings -->
                <div v-if="sortedPricings.length > 0">
                  <label class="mb-2.5 block text-sm font-medium text-gray-700">
                    Durasi Sewa <span class="text-red-500">*</span>
                  </label>
                  <div class="grid gap-2" :class="sortedPricings.length <= 3 ? `grid-cols-${sortedPricings.length}` : 'grid-cols-2 sm:grid-cols-3'">
                    <label
                      v-for="pricing in sortedPricings"
                      :key="pricing.id"
                      class="relative cursor-pointer"
                    >
                      <input
                        v-model="selectedPricingId"
                        type="radio"
                        :value="pricing.id"
                        class="sr-only"
                      />
                      <div
                        :class="[
                          'rounded-xl border-2 p-3 text-center transition-all min-h-24 flex flex-col justify-center',
                          selectedPricingId === pricing.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 bg-white hover:border-gray-300',
                        ]"
                      >
                        <p class="text-xs font-bold text-gray-900">
                          {{ pricing.price_display.split(' / ')[1] || pricing.duration_days + ' hari' }}
                        </p>
                        <p class="text-xs text-primary-600 font-semibold mt-1">
                          {{ formatPrice(pricing.price) }}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <button
                @click="submitGuestForm"
                class="mt-6 w-full rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
              >
                Lanjut ke Pembayaran
                <i class="pi pi-arrow-right ml-2 text-sm"></i>
              </button>
            </div>

            <!-- ── Step: Summary ── -->
            <div v-else-if="paymentStep === 'summary'" class="p-6">
              <!-- Room Info -->
              <div class="mb-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div class="flex items-start gap-4">
                  <img
                    v-if="roomImageUrl()"
                    :src="roomImageUrl()!"
                    :alt="roomDisplayName()"
                    class="h-16 w-16 rounded-lg object-cover"
                  />
                  <div v-else class="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
                    <i class="pi pi-image text-xl text-gray-400"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">{{ roomDisplayName() }}</h4>
                    <p class="text-sm text-gray-500">{{ room.kost.name }}</p>
                    <p class="mt-1 text-lg font-bold text-primary-600">
                      {{ formatPrice(room.minimum_price)
                      }}<span class="text-sm font-normal text-gray-400">/bulan</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Guest Info summary -->
              <div
                class="mb-4 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm"
              >
                <p class="mb-1 font-semibold text-primary-800">Data Pemesan</p>
                <div class="flex flex-col gap-0.5 text-primary-700">
                  <span><i class="pi pi-user mr-1.5 text-xs"></i>{{ guestForm.name }}</span>
                  <span><i class="pi pi-envelope mr-1.5 text-xs"></i>{{ guestForm.email }}</span>
                  <span><i class="pi pi-phone mr-1.5 text-xs"></i>{{ guestForm.phone }}</span>
                  <span v-if="selectedPricing"><i class="pi pi-calendar mr-1.5 text-xs"></i>Durasi: {{ selectedPricing.price_display.split(' / ')[1] || selectedPricing.duration_days + ' hari' }}</span>
                </div>
                <button
                  @click="paymentStep = 'guest-form'"
                  class="mt-2 text-xs text-primary-500 underline hover:text-primary-700"
                >
                  Ubah data
                </button>
              </div>

              <!-- Price Breakdown -->
              <div class="mb-5 space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Sewa {{ selectedPricing ? (selectedPricing.price_display.split(' / ')[1] || selectedPricing.duration_days + ' hari') : '' }}</span>
                  <span class="text-gray-900">{{ formatPrice(getRentalPrice()) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Deposit</span>
                  <span class="text-gray-900">{{ formatPrice(getDeposit()) }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Biaya admin</span>
                  <span class="text-gray-900">{{ formatPrice(25000) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-900">Total</span>
                    <span class="text-xl font-bold text-primary-600">
                      {{ formatPrice(getTotalPrice()) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="mb-5">
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
                  <strong>Mode Sandbox:</strong> Simulasi pembayaran Midtrans. Tidak ada transaksi
                  nyata yang diproses.
                </p>
              </div>

              <!-- Pay Button -->
              <button
                @click="processPayment"
                class="w-full rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
              >
                Bayar {{ formatPrice(getTotalPrice()) }}
              </button>
            </div>

            <!-- ── Step: Processing ── -->
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

            <!-- ── Step: Success ── -->
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
              <p class="mb-1 text-center text-gray-500">
                Kamar <strong>{{ roomDisplayName() }}</strong> telah berhasil dipesan.
              </p>
              <p class="mb-1 text-center text-sm text-gray-500">
                Atas nama: <strong>{{ guestForm.name }}</strong>
              </p>
              <p class="mb-1 text-center text-xs text-gray-400">
                Konfirmasi dikirim ke
                <span class="font-medium text-gray-600">{{ guestForm.email }}</span>
              </p>
              <p class="mb-6 text-center text-xs text-gray-400">
                ID Transaksi:
                <code class="rounded bg-gray-100 px-2 py-0.5 text-gray-600"
                  >MID-{{ Date.now().toString(36).toUpperCase() }}</code
                >
              </p>
              <button
                @click="handleClose"
                class="w-full rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Selesai
              </button>
            </div>

            <!-- ── Step: Error ── -->
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
