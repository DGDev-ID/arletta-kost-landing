export type RoomCategory = 'ekonomi' | 'standard' | 'deluxe' | 'premium' | 'suite'

export interface Room {
  id: number
  name: string
  slug: string
  price: number
  size: string
  category: RoomCategory
  type: 'putra' | 'putri' | 'campur'
  available: boolean
  image: string
  images: string[]
  facilities: string[]
  description: string
}

/** Label & icon mapping for room categories */
export const categoryMeta: Record<RoomCategory, { label: string; icon: string; color: string }> = {
  ekonomi: { label: 'Ekonomi', icon: 'pi pi-wallet', color: 'bg-gray-100 text-gray-700' },
  standard: { label: 'Standard', icon: 'pi pi-home', color: 'bg-blue-100 text-blue-700' },
  deluxe: { label: 'Deluxe', icon: 'pi pi-star', color: 'bg-yellow-100 text-yellow-700' },
  premium: { label: 'Premium', icon: 'pi pi-crown', color: 'bg-purple-100 text-purple-700' },
  suite: { label: 'Suite', icon: 'pi pi-building', color: 'bg-amber-100 text-amber-700' },
}

export const rooms: Room[] = [
  {
    id: 1,
    name: 'Kamar Deluxe A1',
    slug: 'kamar-deluxe-a1',
    price: 1500000,
    size: '3x4 m',
    category: 'deluxe',
    type: 'putra',
    available: true,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    ],
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari', 'Meja Belajar'],
    description:
      'Kamar deluxe dengan fasilitas lengkap, cocok untuk mahasiswa atau pekerja. Dilengkapi AC, WiFi cepat, dan kamar mandi dalam. Lokasi strategis dekat kampus dan pusat perbelanjaan.',
  },
  {
    id: 2,
    name: 'Kamar Standard B2',
    slug: 'kamar-standard-b2',
    price: 1000000,
    size: '3x3 m',
    category: 'standard',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    ],
    facilities: ['WiFi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari'],
    description:
      'Kamar standard yang nyaman dengan harga terjangkau. Cocok untuk mahasiswi yang mencari tempat tinggal aman dan bersih dengan fasilitas memadai.',
  },
  {
    id: 3,
    name: 'Kamar Premium C1',
    slug: 'kamar-premium-c1',
    price: 2000000,
    size: '4x4 m',
    category: 'premium',
    type: 'campur',
    available: true,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'Kamar Mandi Dalam',
      'Kasur Spring Bed',
      'Lemari',
      'Meja Belajar',
      'TV',
      'Kulkas Mini',
    ],
    description:
      'Kamar premium terluas dengan fasilitas terlengkap. Dilengkapi TV, kulkas mini, spring bed premium, dan AC. Ideal untuk profesional muda yang menginginkan kenyamanan maksimal.',
  },
  {
    id: 4,
    name: 'Kamar Ekonomi D1',
    slug: 'kamar-ekonomi-d1',
    price: 750000,
    size: '2.5x3 m',
    category: 'ekonomi',
    type: 'putra',
    available: false,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'],
    facilities: ['WiFi', 'Kasur', 'Lemari'],
    description:
      'Kamar ekonomi dengan harga paling terjangkau. Meskipun berukuran compact, kamar ini tetap nyaman dan bersih. Cocok untuk pelajar dengan budget terbatas.',
  },
  {
    id: 5,
    name: 'Kamar Deluxe A2',
    slug: 'kamar-deluxe-a2',
    price: 1500000,
    size: '3x4 m',
    category: 'deluxe',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari', 'Meja Belajar'],
    description:
      'Kamar deluxe untuk putri dengan fasilitas lengkap dan keamanan terjamin. Area khusus putri dengan akses kartu dan CCTV 24 jam.',
  },
  {
    id: 6,
    name: 'Kamar Standard B3',
    slug: 'kamar-standard-b3',
    price: 1100000,
    size: '3x3.5 m',
    category: 'standard',
    type: 'campur',
    available: true,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ez637a745?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1598928506311-c55ez637a745?w=800&h=600&fit=crop'],
    facilities: ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Kasur', 'Lemari'],
    description:
      'Kamar standard plus dengan tambahan AC. Lokasi di lantai 2 dengan pemandangan taman. Suasana tenang dan nyaman untuk istirahat.',
  },
  {
    id: 7,
    name: 'Suite Royal E1',
    slug: 'suite-royal-e1',
    price: 3000000,
    size: '5x5 m',
    category: 'suite',
    type: 'campur',
    available: true,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d955e4f68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    ],
    facilities: [
      'AC',
      'WiFi',
      'Kamar Mandi Dalam',
      'Kasur King Size',
      'Lemari Walk-in',
      'Meja Kerja',
      'TV 43"',
      'Kulkas',
      'Balkon Pribadi',
      'Water Heater',
    ],
    description:
      'Suite eksklusif dengan ruangan terluas dan fasilitas premium. Dilengkapi balkon pribadi, kasur king size, dan kulkas full-size. Pengalaman tinggal mewah layaknya apartemen.',
  },
  {
    id: 8,
    name: 'Kamar Ekonomi D2',
    slug: 'kamar-ekonomi-d2',
    price: 800000,
    size: '3x3 m',
    category: 'ekonomi',
    type: 'putri',
    available: true,
    image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop'],
    facilities: ['WiFi', 'Kasur', 'Lemari', 'Kamar Mandi Dalam'],
    description:
      'Kamar ekonomi khusus putri dengan harga terjangkau. Sudah termasuk kamar mandi dalam dan WiFi. Lingkungan aman dengan akses khusus putri.',
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
