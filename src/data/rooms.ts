export type RoomCategory = 'standard' | 'superior' | 'junior-suite' | 'suite'

export interface RoomPricing {
  monthly: number
  sixMonths: number
  twelveMonths: number
}

export interface Room {
  id: number
  name: string
  slug: string
  price: number
  pricing: RoomPricing
  size: string
  category: RoomCategory
  type: 'putra' | 'putri'
  available: boolean
  image: string
  images: string[]
  facilities: string[]
  description: string
}

/** Label & icon mapping for room categories */
export const categoryMeta: Record<RoomCategory, { label: string; icon: string; color: string }> = {
  standard: { label: 'Standard Room', icon: 'pi pi-home', color: 'bg-blue-100 text-blue-700' },
  superior: { label: 'Superior Room', icon: 'pi pi-star', color: 'bg-yellow-100 text-yellow-700' },
  'junior-suite': {
    label: 'Junior Suite',
    icon: 'pi pi-crown',
    color: 'bg-purple-100 text-purple-700',
  },
  suite: { label: 'Suite Room', icon: 'pi pi-building', color: 'bg-amber-100 text-amber-700' },
}

export const rooms: Room[] = [
  // ── Standard Room — Putri ────────────────────────────────────────────────
  {
    id: 1,
    name: 'Standard Room 101',
    slug: 'standard-room-101',
    price: 1500000,
    pricing: { monthly: 1500000, sixMonths: 8500000, twelveMonths: 16500000 },
    size: '3x4 m',
    category: 'standard',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur',
      'Lemari',
      'Meja Kerja',
      'Akses Keycard',
    ],
    description:
      'Standard Room khusus wanita yang nyaman dengan fasilitas lengkap. Dilengkapi AC, TV, air panas, dan WiFi cepat. Lingkungan aman dengan akses keycard dan CCTV 24 jam.',
  },
  {
    id: 2,
    name: 'Standard Room 102',
    slug: 'standard-room-102',
    price: 1500000,
    pricing: { monthly: 1500000, sixMonths: 8500000, twelveMonths: 16500000 },
    size: '3x4 m',
    category: 'standard',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur',
      'Lemari',
      'Meja Kerja',
      'Akses Keycard',
    ],
    description:
      'Standard Room putri lantai 1 dengan akses mudah. Full furnished dengan TV, AC, air panas, dan WiFi. Zona khusus wanita dengan keamanan terjamin.',
  },
  {
    id: 3,
    name: 'Standard Room 201',
    slug: 'standard-room-201',
    price: 1500000,
    pricing: { monthly: 1500000, sixMonths: 8500000, twelveMonths: 16500000 },
    size: '3x4 m',
    category: 'standard',
    type: 'putri',
    available: false,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur',
      'Lemari',
      'Meja Kerja',
      'Akses Keycard',
    ],
    description:
      'Standard Room putri lantai 2 dengan pemandangan taman. Suasana tenang, full furnished, dilengkapi AC, TV, air panas, dan WiFi.',
  },

  // ── Superior Room — Putri ────────────────────────────────────────────────
  {
    id: 4,
    name: 'Superior Room 301',
    slug: 'superior-room-301',
    price: 1800000,
    pricing: { monthly: 1800000, sixMonths: 10800000, twelveMonths: 20100000 },
    size: '4x4 m',
    category: 'superior',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur Spring Bed',
      'Lemari',
      'Meja Kerja',
      'Kulkas Mini',
      'Akses Keycard',
    ],
    description:
      'Superior Room putri lebih luas dengan fasilitas premium. Dilengkapi kasur spring bed, kulkas mini, TV, AC, dan air panas. Zona eksklusif wanita dengan keamanan 24 jam.',
  },
  {
    id: 5,
    name: 'Superior Room 302',
    slug: 'superior-room-302',
    price: 1800000,
    pricing: { monthly: 1800000, sixMonths: 10800000, twelveMonths: 20100000 },
    size: '4x4 m',
    category: 'superior',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded637a745?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded637a745?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur Spring Bed',
      'Lemari',
      'Meja Kerja',
      'Kulkas Mini',
      'Akses Keycard',
    ],
    description:
      'Superior Room putri lantai 3 dengan pemandangan kota. Full furnished dengan spring bed, kulkas mini, TV, AC, air panas, dan WiFi berkecepatan tinggi.',
  },
  {
    id: 6,
    name: 'Superior Room 401',
    slug: 'superior-room-401',
    price: 1800000,
    pricing: { monthly: 1800000, sixMonths: 10800000, twelveMonths: 20100000 },
    size: '4x4 m',
    category: 'superior',
    type: 'putri',
    available: false,
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur Spring Bed',
      'Lemari',
      'Meja Kerja',
      'Kulkas Mini',
      'Akses Keycard',
    ],
    description:
      'Superior Room putri lantai 4 paling privat. Dilengkapi spring bed, kulkas mini, TV, AC, dan air panas. Zona eksklusif wanita.',
  },

  // ── Junior Suite — Putra ─────────────────────────────────────────────────
  {
    id: 7,
    name: 'Junior Suite 301',
    slug: 'junior-suite-301',
    price: 2300000,
    pricing: { monthly: 2300000, sixMonths: 14500000, twelveMonths: 28500000 },
    size: '5x5 m',
    category: 'junior-suite',
    type: 'putra',
    available: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'Kulkas',
      'Akses Keycard',
    ],
    description:
      'Junior Suite putra dengan kulkas tersendiri — ideal untuk pria yang ingin menyimpan makanan sendiri. Dilengkapi kasur king size, lemari walk-in, kulkas, TV, AC, air panas, dan WiFi.',
  },
  {
    id: 8,
    name: 'Junior Suite 401',
    slug: 'junior-suite-401',
    price: 2300000,
    pricing: { monthly: 2300000, sixMonths: 14500000, twelveMonths: 28500000 },
    size: '5x5 m',
    category: 'junior-suite',
    type: 'putra',
    available: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'Kulkas',
      'Akses Keycard',
    ],
    description:
      'Junior Suite putra lantai 4 dengan kulkas pribadi. Full furnished dengan kasur king size, lemari walk-in, kulkas, TV, AC, air panas, dan WiFi. Pemandangan terbaik dari lantai tertinggi.',
  },

  // ── Suite Room — Putra ───────────────────────────────────────────────────
  {
    id: 9,
    name: 'Suite Room 201',
    slug: 'suite-room-201',
    price: 3000000,
    pricing: { monthly: 3000000, sixMonths: 17500000, twelveMonths: 34500000 },
    size: '6x6 m',
    category: 'suite',
    type: 'putra',
    available: true,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV 43"',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'Kulkas',
      'Dapur Lengkap',
      'Kompor',
      'Ruang Tamu',
      'Balkon Pribadi',
      'Akses Keycard',
    ],
    description:
      'Suite Room putra eksklusif dengan dapur lengkap, ruang tamu, dan balkon pribadi. Layaknya apartemen mewah dengan TV 43", kasur king size, kulkas full-size, dan semua fasilitas terbaik.',
  },
  {
    id: 10,
    name: 'Suite Room 301',
    slug: 'suite-room-301',
    price: 3000000,
    pricing: { monthly: 3000000, sixMonths: 17500000, twelveMonths: 34500000 },
    size: '6x6 m',
    category: 'suite',
    type: 'putra',
    available: true,
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV 43"',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'Kulkas',
      'Dapur Lengkap',
      'Kompor',
      'Ruang Tamu',
      'Balkon Pribadi',
      'Akses Keycard',
    ],
    description:
      'Suite Room putra lantai 3 dengan dapur lengkap dan balkon pribadi menghadap kota. Pengalaman tinggal premium layaknya apartemen eksekutif.',
  },
  {
    id: 11,
    name: 'Suite Room 401',
    slug: 'suite-room-401',
    price: 3000000,
    pricing: { monthly: 3000000, sixMonths: 17500000, twelveMonths: 34500000 },
    size: '6x6 m',
    category: 'suite',
    type: 'putra',
    available: false,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded637a745?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded637a745?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'TV 43"',
      'Air Panas',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'Kulkas',
      'Dapur Lengkap',
      'Kompor',
      'Ruang Tamu',
      'Balkon Pribadi',
      'Akses Keycard',
    ],
    description:
      'Suite Room putra lantai 4 penthouse — paling privat dan eksklusif. Dengan dapur lengkap, ruang tamu, balkon dengan pemandangan terbaik, dan semua fasilitas premium.',
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug)
}

export function getAvailableRooms(): Room[] {
  return rooms.filter((room) => room.available)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
