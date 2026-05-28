<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import '@/assets/heliomind-brand.css'

const menuOpen = ref(false)
const route = useRoute()

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
  }
}

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)

watch(menuOpen, (open) => {
  document.body.classList.toggle('site-nav-open', open)
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('site-nav-open')
})
</script>

<template>
  <header class="site-nav" :class="{ 'is-menu-open': menuOpen }">
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
          <RouterLink to="/product">Product</RouterLink>
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
            <RouterLink to="/product" @click="closeMenu">Product</RouterLink>
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
