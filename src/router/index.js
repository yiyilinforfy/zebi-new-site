import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/mission',
      name: 'mission',
      component: () => import('../views/MissionView.vue'),
    },
    {
      path: '/join-us',
      name: 'join-us',
      component: () => import('../views/JoinUsView.vue'),
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
    },
    {
      path: '/platform',
      redirect: '/product',
    },
  ],
})

export default router
