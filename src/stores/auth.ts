import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { users, type User } from '@/data/users'

export interface AuthUser {
  id: number
  name: string
  email: string
  phone: string
  room: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // ---------- State ----------
  const user = ref<AuthUser | null>(null)
  const isAuthenticated = ref(false)

  // ---------- Getters ----------
  const currentUser = computed(() => user.value)
  const userName = computed(() => user.value?.name ?? '')

  // ---------- Actions ----------
  function login(email: string, password: string): { success: boolean; message: string } {
    const found: User | undefined = users.find((u) => u.email === email && u.password === password)

    if (!found) {
      return { success: false, message: 'Email atau password salah.' }
    }

    user.value = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      room: found.room,
    }
    isAuthenticated.value = true

    return { success: true, message: 'Login berhasil!' }
  }

  function register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): { success: boolean; message: string } {
    // Check if email already exists
    const exists = users.find((u) => u.email === email)
    if (exists) {
      return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain.' }
    }

    // Create new user and add to dummy data
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
      phone,
      room: null,
    }
    users.push(newUser)

    // Auto-login after registration
    user.value = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      room: newUser.room,
    }
    isAuthenticated.value = true

    return { success: true, message: 'Registrasi berhasil!' }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    currentUser,
    userName,
    login,
    register,
    logout,
  }
})
