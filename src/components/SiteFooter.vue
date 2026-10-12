<template>
  <footer class="site-footer">
    <p class="site-footer__copy">© 2026 ZEBI LAB</p>
  </footer>
</template>

<style scoped>
.site-footer {
  background: transparent;
  border-top: none;
  margin-top: 0;
  padding: 32px 0 40px;
}

.site-footer__copy {
  max-width: 1400px;
  margin: 0;
  padding: 0 200px;
  font-family: var(--mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  color: var(--text-3, #5a6178);
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .site-footer__copy {
    padding: 0 20px;
  }
}
</style>
