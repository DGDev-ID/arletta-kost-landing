<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const registerError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone: string): boolean {
  const re = /^08\d{8,12}$/
  return re.test(phone)
}

function validate(): boolean {
  let valid = true
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.password = ''
  errors.confirmPassword = ''
  registerError.value = ''

  if (!form.name.trim()) {
    errors.name = 'Nama lengkap wajib diisi.'
    valid = false
  } else if (form.name.trim().length < 3) {
    errors.name = 'Nama minimal 3 karakter.'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email wajib diisi.'
    valid = false
  } else if (!validateEmail(form.email)) {
    errors.email = 'Format email tidak valid.'
    valid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Nomor telepon wajib diisi.'
    valid = false
  } else if (!validatePhone(form.phone)) {
    errors.phone = 'Format nomor telepon tidak valid. Contoh: 081234567890'
    valid = false
  }

  if (!form.password.trim()) {
    errors.password = 'Password wajib diisi.'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
    valid = false
  }

  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi.'
    valid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Password tidak cocok.'
    valid = false
  }

  return valid
}

async function handleRegister() {
  if (!validate()) return

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))

  const result = authStore.register(form.name, form.email, form.phone, form.password)
  isLoading.value = false

  if (result.success) {
    toast.add({
      severity: 'success',
      summary: 'Registrasi Berhasil',
      detail: 'Akun Anda telah berhasil dibuat. Selamat datang!',
      life: 3000,
    })
    const redirectPath = (route.query.redirect as string) || '/dashboard'
    router.push(redirectPath)
  } else {
    registerError.value = result.message
  }
}
</script>

<template>
  <main class="flex min-h-screen">
    <!-- ===== Left Panel – Dark branding side ===== -->
    <div
      class="relative hidden w-1/2 overflow-hidden bg-dark-900 lg:flex lg:flex-col lg:justify-end"
    >
      <!-- Background Image with overlay -->
      <img
        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&h=1200&fit=crop"
        alt="Kamar kos nyaman"
        class="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        class="absolute inset-0 bg-linear-to-t from-dark-900 via-dark-900/70 to-transparent"
      ></div>

      <!-- Branding content -->
      <div class="relative z-10 p-12">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white"
          >
            A
          </div>
          <span class="text-2xl font-bold text-white"
            >Arletta<span class="text-accent-400">Kost</span></span
          >
        </div>
        <h2 class="text-3xl font-bold leading-tight text-white mb-3">
          Mulai Perjalananmu,<br />
          <span class="text-accent-400">Temukan Kos Ideal.</span>
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed max-w-md">
          Daftar sekarang dan nikmati kemudahan mencari kos dengan fasilitas terbaik dan lokasi
          strategis.
        </p>

        <!-- Testimonial mini -->
        <div class="mt-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
          <div class="flex items-center gap-1 mb-2">
            <i class="pi pi-star-fill text-accent-400 text-xs"></i>
            <i class="pi pi-star-fill text-accent-400 text-xs"></i>
            <i class="pi pi-star-fill text-accent-400 text-xs"></i>
            <i class="pi pi-star-fill text-accent-400 text-xs"></i>
            <i class="pi pi-star-fill text-accent-400 text-xs"></i>
          </div>
          <p class="text-gray-300 text-sm italic">
            "Kos terbaik yang pernah saya temukan. Fasilitas lengkap dan lingkungan sangat nyaman!"
          </p>
          <p class="text-gray-500 text-xs mt-2">— Budi, Penghuni sejak 2024</p>
        </div>
      </div>
    </div>

    <!-- ===== Right Panel – Form side ===== -->
    <div class="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 bg-white">
      <!-- Back to Home -->
      <RouterLink
        to="/"
        class="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary-600 self-start"
      >
        <i class="pi pi-arrow-left text-xs"></i>
        Back to Home
      </RouterLink>

      <div class="mx-auto w-full max-w-md">
        <!-- Heading -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
          <p class="mt-2 text-gray-500">Buat akun baru untuk menjadi penghuni ArlettaKost</p>
        </div>

        <!-- Global Error -->
        <div
          v-if="registerError"
          class="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <i class="pi pi-exclamation-circle text-lg"></i>
          <span>{{ registerError }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="mb-1.5 block text-sm font-semibold text-gray-700"
              >Nama Lengkap</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ><i class="pi pi-user text-sm"></i
              ></span>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Masukkan nama lengkap"
                :class="[
                  'w-full rounded-xl border py-3 pl-11 pr-4 text-sm transition-all focus:ring-2 focus:outline-none',
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20',
                ]"
              />
            </div>
            <p v-if="errors.name" class="mt-1.5 text-xs text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="mb-1.5 block text-sm font-semibold text-gray-700"
              >Email Address</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ><i class="pi pi-envelope text-sm"></i
              ></span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                :class="[
                  'w-full rounded-xl border py-3 pl-11 pr-4 text-sm transition-all focus:ring-2 focus:outline-none',
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20',
                ]"
              />
            </div>
            <p v-if="errors.email" class="mt-1.5 text-xs text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="mb-1.5 block text-sm font-semibold text-gray-700"
              >Nomor Telepon</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ><i class="pi pi-phone text-sm"></i
              ></span>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                placeholder="081234567890"
                :class="[
                  'w-full rounded-xl border py-3 pl-11 pr-4 text-sm transition-all focus:ring-2 focus:outline-none',
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20',
                ]"
              />
            </div>
            <p v-if="errors.phone" class="mt-1.5 text-xs text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="mb-1.5 block text-sm font-semibold text-gray-700"
              >Password</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ><i class="pi pi-lock text-sm"></i
              ></span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                :class="[
                  'w-full rounded-xl border py-3 pl-11 pr-12 text-sm transition-all focus:ring-2 focus:outline-none',
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20',
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-sm"></i>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1.5 text-xs text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="mb-1.5 block text-sm font-semibold text-gray-700"
              >Konfirmasi Password</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ><i class="pi pi-lock text-sm"></i
              ></span>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Ulangi password"
                :class="[
                  'w-full rounded-xl border py-3 pl-11 pr-12 text-sm transition-all focus:ring-2 focus:outline-none',
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20',
                ]"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i
                  :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  class="text-sm"
                ></i>
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1.5 text-xs text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-xl bg-success-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-success-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="!isLoading" class="flex items-center justify-center gap-2">
              Create Account <i class="pi pi-arrow-right"></i>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="pi pi-spinner pi-spin"></i> Memproses...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-5 flex items-center gap-4">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="text-sm text-gray-400">or</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-500">
          Already have an account?
          <RouterLink to="/login" class="font-semibold text-accent-600 hover:text-accent-700 ml-1"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </div>
  </main>
</template>
