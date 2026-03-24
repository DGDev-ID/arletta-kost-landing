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
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const loginError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validate(): boolean {
  let valid = true
  errors.email = ''
  errors.password = ''
  loginError.value = ''

  if (!form.email.trim()) {
    errors.email = 'Email wajib diisi.'
    valid = false
  } else if (!validateEmail(form.email)) {
    errors.email = 'Format email tidak valid.'
    valid = false
  }

  if (!form.password.trim()) {
    errors.password = 'Password wajib diisi.'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
    valid = false
  }

  return valid
}

async function handleLogin() {
  if (!validate()) return

  isLoading.value = true
  await new Promise((resolve) => setTimeout(resolve, 800))

  const result = authStore.login(form.email, form.password)
  isLoading.value = false

  if (result.success) {
    toast.add({
      severity: 'success',
      summary: 'Login Berhasil',
      detail: 'Selamat datang kembali!',
      life: 3000,
    })
    const redirectPath = (route.query.redirect as string) || '/dashboard'
    router.push(redirectPath)
  } else {
    loginError.value = result.message
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
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=1200&fit=crop"
        alt="Interior kos modern"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
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
          Tempat Tinggal Nyaman,<br />
          <span class="text-accent-400">Harga Terjangkau.</span>
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed max-w-md">
          Bergabung dengan 200+ penghuni yang sudah merasakan kenyamanan tinggal di ArlettaKost.
        </p>
      </div>
    </div>

    <!-- ===== Right Panel – Form side ===== -->
    <div class="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24 bg-white">
      <!-- Back to Home -->
      <RouterLink
        to="/"
        class="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary-600 self-start"
      >
        <i class="pi pi-arrow-left text-xs"></i>
        Back to Home
      </RouterLink>

      <div class="mx-auto w-full max-w-md">
        <!-- Heading -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p class="mt-2 text-gray-500">Masuk ke akun Anda untuk mengelola kos</p>
        </div>

        <!-- Global Error -->
        <div
          v-if="loginError"
          class="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <i class="pi pi-exclamation-circle text-lg"></i>
          <span>{{ loginError }}</span>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="mb-1.5 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i class="pi pi-envelope text-sm"></i>
              </span>
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

          <!-- Password -->
          <div>
            <div class="mb-1.5 flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
              <a
                href="#"
                class="text-xs font-medium text-accent-600 hover:text-accent-700 transition-colors"
                >Forgot password?</a
              >
            </div>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i class="pi pi-lock text-sm"></i>
              </span>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
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

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-xl bg-success-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-success-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span v-if="!isLoading" class="flex items-center justify-center gap-2">
              Sign In
              <i class="pi pi-sign-in"></i>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="pi pi-spinner pi-spin"></i>
              Memproses...
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center gap-4">
          <div class="h-px flex-1 bg-gray-200"></div>
          <span class="text-sm text-gray-400">or</span>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center text-sm text-gray-500">
          Don't have an account?
          <RouterLink to="/signup" class="font-semibold text-accent-600 hover:text-accent-700 ml-1">
            Sign up for free
          </RouterLink>
        </p>

        <!-- Demo Credentials -->
        <div class="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
          <p class="mb-1 flex items-center gap-1 font-semibold text-gray-700">
            <i class="pi pi-info-circle"></i> Demo Login:
          </p>
          <p>
            Email:
            <code class="rounded bg-gray-200 px-1.5 py-0.5 text-gray-700">budi@email.com</code>
          </p>
          <p>
            Password:
            <code class="rounded bg-gray-200 px-1.5 py-0.5 text-gray-700">password123</code>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
