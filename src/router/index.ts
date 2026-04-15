import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/landing/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('@/pages/landing/RoomListPage.vue'),
    },
    {
      path: '/rooms/:slug',
      name: 'room-detail',
      component: () => import('@/pages/landing/RoomDetailPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/landing/AboutPage.vue'),
    },
  ],
})

export default router
