import './assets/main.css'
import './assets/heliomind-brand.css'
import './assets/heliomind-mobile.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import homeHeroImage from '@/assets/images/home-hero.jpg'
import productHeroImage from '@/assets/images/product.jpg'
import planHeroImage from '@/assets/images/plan.jpg'
import missionHeroImage from '@/assets/images/mission.jpg'
import joinUsHeroImage from '@/assets/images/joinus.jpg'

function restoreSpaPathFrom404Redirect() {
  const url = new URL(window.location.href)
  const redirectedPath = url.searchParams.get('__spa')
  if (!redirectedPath) return

  // Protect against malformed or external values.
  const safePath = redirectedPath.startsWith('/') ? redirectedPath : '/'
  window.history.replaceState(null, '', safePath)
}

function preloadImage(href, fetchPriority = 'auto') {
  if (!href || document.querySelector(`link[rel="preload"][as="image"][href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = href
  if (fetchPriority !== 'auto') {
    link.setAttribute('fetchpriority', fetchPriority)
  }
  document.head.appendChild(link)
}

;[
  [homeHeroImage, 'high'],
  [productHeroImage, 'auto'],
  [planHeroImage, 'auto'],
  [missionHeroImage, 'auto'],
  [joinUsHeroImage, 'auto'],
].forEach(([href, priority]) => preloadImage(href, priority))

restoreSpaPathFrom404Redirect()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
