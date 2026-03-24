export interface Feature {
  icon: string
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: 'pi pi-shield',
    title: 'Keamanan 24 Jam',
    description:
      'Dilengkapi CCTV dan satpam yang berjaga selama 24 jam untuk keamanan dan kenyamanan penghuni.',
  },
  {
    icon: 'pi pi-wifi',
    title: 'WiFi Super Cepat',
    description:
      'Internet WiFi berkecepatan tinggi tersedia di seluruh area kos untuk mendukung aktivitas Anda.',
  },
  {
    icon: 'pi pi-sparkles',
    title: 'Bersih & Terawat',
    description:
      'Pembersihan area umum dilakukan setiap hari. Lingkungan kos selalu terjaga kebersihan dan kerapiannya.',
  },
  {
    icon: 'pi pi-map-marker',
    title: 'Lokasi Strategis',
    description:
      'Dekat dengan kampus, pusat perbelanjaan, rumah sakit, dan akses transportasi umum.',
  },
  {
    icon: 'pi pi-car',
    title: 'Parkir Luas',
    description: 'Area parkir yang luas dan aman untuk motor maupun mobil penghuni kos.',
  },
  {
    icon: 'pi pi-objects-column',
    title: 'Dapur Bersama',
    description:
      'Dapur bersama yang lengkap dengan peralatan memasak untuk kebutuhan sehari-hari penghuni.',
  },
]
