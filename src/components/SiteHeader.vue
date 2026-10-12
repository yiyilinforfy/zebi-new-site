<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import '@/assets/heliomind-brand.css'

const menuOpen = ref(false)
const isScrolled = ref(false)
const productMenuOpen = ref(false)
const mobileProductOpen = ref(false)
const route = useRoute()
let productMenuCloseTimer = null

const products = [
  {
    to: '/product',
    name: 'HelioMind OS',
    description: 'Orbital Design System',
    badge: null,
    match: (path) => path === '/product' || path === '/platform',
  },
  {
    to: '/product/jasper',
    name: 'ZEBI Jasper',
    description: 'A practical AI assistant for space research',
    badge: null,
    match: (path) => path.startsWith('/product/jasper'),
  },
]

const isProductActive = computed(() =>
  products.some((product) => product.match(route.path)),
)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
  mobileProductOpen.value = false
}

function openProductMenu() {
  if (productMenuCloseTimer) {
    clearTimeout(productMenuCloseTimer)
    productMenuCloseTimer = null
  }
  productMenuOpen.value = true
}

function closeProductMenu() {
  if (productMenuCloseTimer) {
    clearTimeout(productMenuCloseTimer)
    productMenuCloseTimer = null
  }
  productMenuOpen.value = false
}

function scheduleCloseProductMenu() {
  if (productMenuCloseTimer) clearTimeout(productMenuCloseTimer)
  productMenuCloseTimer = setTimeout(() => {
    productMenuOpen.value = false
    productMenuCloseTimer = null
  }, 180)
}

function toggleProductMenu(event) {
  event.preventDefault()
  event.stopPropagation()
  if (productMenuOpen.value) {
    closeProductMenu()
  } else {
    openProductMenu()
  }
}

function toggleMobileProduct() {
  mobileProductOpen.value = !mobileProductOpen.value
}

function onDocumentClick(event) {
  const target = event.target
  if (!(target instanceof Element)) return
  if (!target.closest('.nav-product')) {
    closeProductMenu()
  }
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    if (productMenuOpen.value) closeProductMenu()
    if (menuOpen.value) closeMenu()
  }
}

function onScroll() {
  isScrolled.value = window.scrollY > 12
}

watch(
  () => route.path,
  () => {
    closeMenu()
    closeProductMenu()
  },
)

watch(menuOpen, (open) => {
  document.body.classList.toggle('site-nav-open', open)
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocumentClick)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocumentClick)
  if (productMenuCloseTimer) clearTimeout(productMenuCloseTimer)
  document.body.classList.remove('site-nav-open')
})
</script>

<template>
  <header class="site-nav" :class="{ 'is-menu-open': menuOpen, 'is-scrolled': isScrolled }">
    <div class="wrap nav-wrap">
      <div class="nav-inner">
        <RouterLink to="/" class="brand brand-zebi" @click="closeMenu">
          <img src="/logo.svg" alt="ZEBI LAB" class="brand-logo" width="44" height="44" />
          <span class="brand-wordmark">
            <span class="brand-title">ZEBI <span class="brand-accent">LAB</span></span>
            <span class="brand-sub">AI infrastructure · space</span>
          </span>
        </RouterLink>

        <nav class="nav-links" aria-label="Primary">
          <RouterLink to="/">Home</RouterLink>

          <div
            class="nav-product"
            :class="{ 'is-open': productMenuOpen, 'is-active': isProductActive }"
            @mouseenter="openProductMenu"
            @mouseleave="scheduleCloseProductMenu"
            @focusin="openProductMenu"
          >
            <div class="nav-product-trigger">
              <RouterLink to="/product" class="nav-product-link">Product</RouterLink>
              <button
                type="button"
                class="nav-product-chevron"
                data-toggle-only="true"
                :aria-expanded="productMenuOpen"
                aria-haspopup="true"
                aria-controls="nav-product-menu"
                aria-label="Open product menu"
                @click="toggleProductMenu"
              >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              id="nav-product-menu"
              class="nav-product-menu"
              role="menu"
              aria-label="Products"
            >
              <div class="nav-product-menu-panel">
                <p class="nav-product-menu-label">Products</p>
                <div class="nav-product-grid">
                  <RouterLink
                    v-for="product in products"
                    :key="product.to"
                    :to="product.to"
                    class="nav-product-card"
                    :class="{ 'is-current': product.match(route.path) }"
                    role="menuitem"
                    @click="closeProductMenu"
                  >
                    <span class="nav-product-card-top">
                      <span class="nav-product-card-name">{{ product.name }}</span>
                      <span v-if="product.badge" class="nav-product-card-badge">{{ product.badge }}</span>
                    </span>
                    <span class="nav-product-card-desc">{{ product.description }}</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>

          <RouterLink to="/plan">Plan</RouterLink>
          <RouterLink to="/mission">Mission</RouterLink>
          <RouterLink to="/join-us">Join</RouterLink>
        </nav>

        <button
          type="button"
          class="nav-menu-btn"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          aria-controls="site-nav-mobile-menu"
          @click="toggleMenu"
        >
          <span class="nav-menu-btn-label">Menu</span>
          <span class="nav-menu-btn-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="nav-drawer">
      <div v-if="menuOpen" class="nav-mobile-root">
        <button
          type="button"
          class="nav-mobile-backdrop"
          aria-label="Close menu"
          @click="closeMenu"
        />
        <aside
          id="site-nav-mobile-menu"
          class="nav-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div class="nav-mobile-drawer-head">
            <span class="nav-mobile-drawer-label">Menu</span>
            <button
              type="button"
              class="nav-mobile-close"
              aria-label="Close menu"
              @click="closeMenu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <nav class="nav-mobile-links" aria-label="Mobile">
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>

            <div class="nav-mobile-product" :class="{ 'is-open': mobileProductOpen }">
              <div class="nav-mobile-product-row">
                <RouterLink
                  to="/product"
                  class="nav-mobile-product-link"
                  :class="{ 'is-active': isProductActive }"
                  @click="closeMenu"
                >
                  Product
                </RouterLink>
                <button
                  type="button"
                  class="nav-mobile-product-toggle"
                  :aria-expanded="mobileProductOpen"
                  aria-controls="nav-mobile-product-panel"
                  aria-label="Toggle product list"
                  @click="toggleMobileProduct"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-show="mobileProductOpen"
                id="nav-mobile-product-panel"
                class="nav-mobile-product-panel"
              >
                <RouterLink
                  v-for="product in products"
                  :key="product.to"
                  :to="product.to"
                  class="nav-mobile-product-item"
                  :class="{ 'is-current': product.match(route.path) }"
                  @click="closeMenu"
                >
                  <span class="nav-mobile-product-item-name">{{ product.name }}</span>
                  <span class="nav-mobile-product-item-desc">{{ product.description }}</span>
                </RouterLink>
              </div>
            </div>

            <RouterLink to="/plan" @click="closeMenu">Plan</RouterLink>
            <RouterLink to="/mission" @click="closeMenu">Mission</RouterLink>
            <RouterLink to="/join-us" @click="closeMenu">Join</RouterLink>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nav-drawer-enter-active,
.nav-drawer-leave-active {
  transition: opacity 0.22s ease;
}

.nav-drawer-enter-active .nav-mobile-drawer,
.nav-drawer-leave-active .nav-mobile-drawer {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-drawer-enter-from,
.nav-drawer-leave-to {
  opacity: 0;
}

.nav-drawer-enter-from .nav-mobile-drawer,
.nav-drawer-leave-to .nav-mobile-drawer {
  transform: translateX(100%);
}
</style>
