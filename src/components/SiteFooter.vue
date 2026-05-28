<script setup>
import { RouterLink } from 'vue-router'
import '@/assets/heliomind-footer.css'
import '@/assets/heliomind-brand.css'
</script>

<template>
  <footer>
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand-block">
          <RouterLink to="/" class="brand brand-zebi">
            <img src="/logo.svg" alt="ZEBI LAB" class="brand-logo" width="44" height="44" />
            <span class="brand-wordmark">
              <span class="brand-title">ZEBI <span class="brand-accent">LAB</span></span>
            </span>
          </RouterLink>
          <p>
            Zebi Lab builds HelioMind OS — the design platform for AI infrastructure in the space. From Earth data centers to orbital compute networks.
          </p>
        </div>
        <div class="footer-col footer-col-pages">
          <div class="footer-col-title">Pages</div>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/product">Product</RouterLink></li>
            <li><RouterLink to="/plan">Plan</RouterLink></li>
            <li><RouterLink to="/mission">Mission</RouterLink></li>
            <li><RouterLink to="/join-us">Join Us</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 ZEBI LAB</div>
      </div>
    </div>
  </footer>
</template>
