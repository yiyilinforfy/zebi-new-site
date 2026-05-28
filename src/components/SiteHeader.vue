<script setup>
import { RouterLink } from 'vue-router'
import '@/assets/heliomind-brand.css'
</script>

<template>
  <nav>
    <div class="wrap">
      <div class="nav-inner">
        <RouterLink to="/" class="brand brand-zebi">
          <img src="/logo.svg" alt="ZEBI LAB" class="brand-logo" width="44" height="44" />
          <span class="brand-wordmark">
            <span class="brand-title">ZEBI <span class="brand-accent">LAB</span></span>
            <span class="brand-sub">AI infrastructure · solar age</span>
          </span>
        </RouterLink>

        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/product">Product</RouterLink>
          <RouterLink to="/mission">Mission</RouterLink>
          <RouterLink to="/join-us">Join Us</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
