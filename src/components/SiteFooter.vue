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
            The design, simulation, and optimization platform for AI infrastructure in the solar age. From Earth data centers to orbital compute networks.
          </p>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Navigate</div>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/product">Product</RouterLink></li>
            <li><RouterLink to="/mission">Mission</RouterLink></li>
            <li><RouterLink to="/join-us">Join Us</RouterLink></li>
          </ul>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Product</div>
          <ul>
            <li><a href="/product#tco">Economic Engine</a></li>
            <li><a href="/product#thermal">Thermal Twin</a></li>
            <li><a href="/product#moe">Orbital MoE</a></li>
            <li><a href="/product#sorter">Workload Sorter</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 ZEBI LAB · AI infrastructure in the solar age</div>
        <!-- <div>v0.2 · all numbers illustrative · not for distribution</div> -->
      </div>
    </div>
  </footer>
</template>
