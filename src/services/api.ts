/**
 * API Service — Arletta Kost Landing Page
 *
 * Centralized API client that fetches data from the Laravel backend.
 * All components should use these functions instead of static data imports.
 */

// ─── Base URL ──────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

// ─── Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface StatsData {
  total_kosts: number
  total_rooms: number
  available_rooms: number
  total_categories: number
  avg_price: number
  featured_kosts: FeaturedKost[]
}

export interface FeaturedKost {
  id: number
  name: string
  address: string
  description: string
  image_url: string | null
  available_rooms: number
  min_price: number
}

export interface FeaturedCategory {
  id: number
  name: string
  description: string
  kost_id: number
  kost_name: string
  image_url: string | null
  available_rooms: number
  total_rooms: number
  min_price: number
}

export interface ApiPricing {
  id: number
  duration_days: number
  price: number
  price_display: string
}

export interface ApiDetail {
  id: number
  detail: string
  icon: string
}

export interface ApiImage {
  id: number
  url: string
}

export interface ApiRoom {
  id: number
  room_number: string
  status: 'available' | 'occupied' | 'maintenance'
  gender: 'male' | 'female' | string | null
  category: {
    id: number
    name: string
    description: string
  }
  kost: {
    id: number
    name: string
    address: string
  }
  images: ApiImage[]
  details: ApiDetail[]
  pricings: ApiPricing[]
  minimum_price: number
  maximum_price: number
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

// ─── Fetch Helper ──────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  const json: ApiResponse<T> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? 'Request failed')
  }

  return json.data
}

// ─── Public API Functions ──────────────────────────────────────────

/** GET /api/stats — Landing page statistics */
export async function fetchStats(): Promise<StatsData> {
  return apiFetch<StatsData>('/stats')
}

/** GET /api/featured-kosts — Featured kosts for homepage */
export async function fetchFeaturedKosts(limit = 6): Promise<FeaturedKost[]> {
  return apiFetch<FeaturedKost[]>(`/featured-kosts?limit=${limit}`)
}

/** GET /api/featured-categories — Featured categories */
export async function fetchFeaturedCategories(limit = 6): Promise<FeaturedCategory[]> {
  return apiFetch<FeaturedCategory[]>(`/featured-categories?limit=${limit}`)
}

/** GET /api/rooms — List rooms globally */
export async function fetchRooms(params?: {
  status?: string
  gender?: string
  category_id?: number
  q?: string
  per_page?: number
  page?: number
}): Promise<PaginatedResponse<ApiRoom>> {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set('status', params.status)
  if (params?.gender) searchParams.set('gender', params.gender)
  if (params?.category_id) searchParams.set('category_id', String(params.category_id))
  if (params?.q) searchParams.set('q', params.q)
  if (params?.per_page) searchParams.set('per_page', String(params.per_page))
  if (params?.page) searchParams.set('page', String(params.page))

  const qs = searchParams.toString()
  return apiFetch<PaginatedResponse<ApiRoom>>(`/rooms${qs ? `?${qs}` : ''}`)
}

/** GET /api/rooms/{id} — Single room detail */
export async function fetchRoom(id: number): Promise<ApiRoom> {
  return apiFetch<ApiRoom>(`/rooms/${id}`)
}

/** GET /api/categories/{id} — Category detail with pricings & promos */
export async function fetchCategory(id: number) {
  return apiFetch(`/categories/${id}`)
}

/** GET /api/search — Unified search */
export async function searchAll(q: string, type = 'all') {
  return apiFetch(`/search?q=${encodeURIComponent(q)}&type=${type}`)
}

/** POST /api/inquiries — Contact form submission */
export async function submitInquiry(data: {
  name: string
  email: string
  phone: string
  message: string
  kost_id?: number
}): Promise<{ id: number }> {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  const json: ApiResponse<{ id: number }> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? 'Gagal mengirim pesan.')
  }

  return json.data
}

// ─── Utility: Format price ─────────────────────────────────────────

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
