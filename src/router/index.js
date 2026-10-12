import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'ZEBI LAB' },
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta: { title: 'HelioMind OS · ZEBI LAB' },
    },
    {
      path: '/product/jasper',
      name: 'jasper',
      component: () => import('../views/JasperView.vue'),
      meta: { title: 'Zebi Jasper · ZEBI LAB' },
    },
    {
      path: '/mission',
      name: 'mission',
      component: () => import('../views/MissionView.vue'),
      meta: { title: 'Mission · ZEBI LAB' },
    },
    {
      path: '/join-us',
      name: 'join-us',
      component: () => import('../views/JoinUsView.vue'),
      meta: { title: 'Join · ZEBI LAB' },
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
      meta: { title: 'Plan · ZEBI LAB' },
    },
    {
      path: '/platform',
      redirect: '/product',
    },
  ],
})

router.afterEach((to) => {
  const nearestWithTitle = [...to.matched].reverse().find((record) => record.meta?.title)
  document.title = nearestWithTitle?.meta?.title || 'ZEBI LAB'
})

export default router
