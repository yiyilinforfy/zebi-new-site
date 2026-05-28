<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import homeHeroImage from '@/assets/images/home-hero.jpg'

const router = useRouter()

const tickerNews = ref([
  { source: 'ADA Space', title: '12 sats live', description: 'Orbital compute constellation is now operating in production.', image: '', url: '#' },
  { source: 'SpaceX D3', title: '1M-sat FCC filed', description: 'Large-scale filing signals aggressive orbital AI infrastructure plans.', image: '', url: '#' },
  { source: 'Google Suncatcher', title: '81-sat 2027', description: 'Sun-powered orbital training architecture moves toward deployment.', image: '', url: '#' },
  { source: 'Starcloud', title: 'H100 in orbit', description: 'GPU workloads in orbit continue proving real-world viability.', image: '', url: '#' },
])

const tickerItems = computed(() => [...tickerNews.value, ...tickerNews.value])

function handleNewsClick(url) {
  if (!url || url === '#') return
  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    router.push(url)
  }
}

function goTo(path) {
  router.push(path)
}

const pillars = [
  {
    title: 'Orbit Economics',
    description:
      'Model the true cost of space AI. Launch vehicles, satellite BOM, on-orbit refresh, deorbit. Compare against terrestrial.',
    href: '/product#economics',
  },
  {
    title: 'Space Physics',
    description:
      'Simulate thermal radiation, orbital dynamics, solar power budgets. Heat is the first-class constraint in vacuum.',
    href: '/product#physics',
  },
  {
    title: 'Orbital Orchestration',
    description:
      'Schedule workloads around thermal windows. Route expert models across satellite types. Decide what belongs in space.',
    href: '/product#orchestration',
  },
]

const spaceProductForms = [
  { label: 'LEO Inference Swarm', href: '/product#constellation' },
  { label: 'SSO Solar Training Cluster', href: '/product#scheduler' },
  { label: 'Hybrid Earth-Orbit', href: '/product#sorter' },
  { label: 'Serviceable Zebi-Lattice', href: '/product#library' },
]

const spaceUsers = [
  'Satellite operators',
  'Space-hardened chip designers',
  'Sovereign space programs',
  'Orbital compute startups',
]

onMounted(() => {
  fetch('https://cdn.jsdelivr.net/gh/yiyilinforfy/zebi-site@main/public/news.json')
    .then((response) => response.json())
    .then((data) => {
      if (!Array.isArray(data?.news) || data.news.length === 0) return
      tickerNews.value = data.news
        .map((item) => ({
          source: item?.source || 'News',
          title: item?.title || '',
          description: item?.description || '',
          image: item?.image || '',
          url: item?.url || '#',
        }))
        .filter((item) => item.title)
    })
    .catch(() => {})

  const reveals = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )
  reveals.forEach((node) => io.observe(node))
})
</script>

<template>
  <SiteHeader />
  <main>
    <section class="nasa-stream-section" aria-label="Latest Space News">
      <div class="nasa-roll-mask">
        <div class="nasa-roll-wrap">
          <div class="nasa-roll-track">
            <div
              v-for="(item, idx) in tickerItems"
              :key="idx"
              class="nasa-mini-card"
              :class="{ clickable: item.url && item.url !== '#' }"
              @click="handleNewsClick(item.url)"
            >
              <div class="nasa-mini-media">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="nasa-mini-img" />
                <div v-else class="nasa-mini-placeholder"></div>
              </div>
              <div class="nasa-mini-info">
                <span class="nasa-mini-badge">{{ item.source }}</span>
                <span class="nasa-mini-title">{{ item.title }}</span>
              </div>
              <span class="nasa-mini-divider">//</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="starfield"></div>

    <section
      class="hero hero-below-ticker portal-hero"
      :style="{ backgroundImage: `linear-gradient(90deg, rgba(7, 9, 14, 0.96) 0%, rgba(7, 9, 14, 0.9) 28%, rgba(7, 9, 14, 0.55) 56%, rgba(7, 9, 14, 0.12) 100%), linear-gradient(180deg, rgba(7, 9, 14, 0) 58%, rgba(7, 9, 14, 0.72) 82%, rgba(7, 9, 14, 0.98) 100%), url(${homeHeroImage})` }"
    >
      <div class="wrap">
        <div class="hero-grid">
          <div>
            <h1>Zebi Lab</h1>
            <p class="hero-kicker">Space compute research lab.</p>
            <p class="portal-defined-answer">We're building the design platform for AI in New Space Age.</p>
            <p class="hero-sub">
              From LEO inference swarms to SSO solar training clusters. From thermal radiation to orbital scheduling. From spreadsheets to simulation.
            </p>
            <div class="hero-actions">
              <button type="button" class="btn-primary" @click="goTo('/product')">
                <span>Explore HelioMind</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <button type="button" class="btn-primary btn-thesis" @click="goTo('/join-us')">
                <span>Join the team</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
            <p class="hero-mission-meta">ZEBI LAB · space · 2026</p>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="portal-defined">
      <div class="wrap">
        <div class="reveal portal-defined-inner">
          <p class="portal-defined-label">Zebi Lab is a research institution focused on one question</p>
          <p class="portal-defined-question">
            How do you design, simulate, and optimize AI infrastructure when compute lives in space?
          </p>
          <p class="portal-defined-answer">
            Not on Earth. Not in a data center. In orbit. Where power comes from the sun, heat radiates into deep space, and latency is measured in minutes — not milliseconds.
          </p>
          <br>
          <p class="portal-defined-answer">
            <strong>HelioMind OS</strong> is our first answer.
          </p>
        </div>
      </div>
    </section> -->

    <section class="portal-product" id="heliomind">
      <div class="wrap">
        <div class="portal-product-grid reveal">
          <div>
            <div class="section-eyebrow">Our first product</div>
            <h2 class="section-title">HelioMind OS</h2>
            <p class="hero-kicker">The design platform for space AI infrastructure.</p>
            <p class="portal-defined-answer">It helps you answer questions that no one has ever had to ask before:</p>
            <br>
            <ul class="portal-question-list">
              <li>Should this workload run in orbit or on the ground?</li>
              <li>How much radiator do I need for a 1 MW satellite in LEO?</li>
              <li>Which chip survives the radiation environment of SSO?</li>
              <li>What's the 10-year cost of launching, operating, and refreshing a 500-sat constellation?</li>
            </ul>
            <p class="portal-product-foot">Eleven modules. One platform. Built by Zebi Lab.</p>
          </div>
          <div class="hero-visual portal-product-visual">
            <div class="orbit-vis">
              <div class="orbit-ring orbit-ring-1"></div>
              <div class="orbit-ring orbit-ring-2"></div>
              <div class="orbit-ring orbit-ring-3"></div>
              <div class="planet"></div>
              <div class="sat sat-1"></div>
              <div class="sat sat-2"></div>
              <div class="sat sat-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="portal-pillars" style="background: var(--bg-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Our Product Aims</div>
          <h2 class="section-title">Three pillars.</h2>
        </div>
        <div class="pillar-grid reveal">
          <button
            v-for="pillar in pillars"
            :key="pillar.title"
            type="button"
            class="pillar-card"
            @click="goTo(pillar.href)"
          >
            <div class="pillar-card-top">
              <h3>{{ pillar.title }}</h3>
              <span class="pillar-arrow" aria-hidden="true">→</span>
            </div>
            <p>{{ pillar.description }}</p>
            <div class="pillar-note">{{ pillar.note }}</div>
          </button>
        </div>
      </div>
    </section>


        <!-- What you can design with HelioMind OS -->
        <section class="portal-showcase">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Design library</div>
          <h2 class="section-title showcase-title" style="margin-bottom: 70px;">What you can design <em>with HelioMind OS</em></h2>
        </div>

        <div class="showcase-grid reveal">
          <div class="showcase-card" @click="goTo('/product#constellation')">
            <div class="showcase-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.2"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="1.2"/>
                <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="1.2"/>
                <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="1.2"/>
                <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="1.2"/>
              </svg>
            </div>
            <div class="showcase-card-content">
              <h3>LEO Inference Swarm</h3>
              <p>500-700 km low Earth orbit. Process Earth observation imagery at the source. Disposable inference satellites with annual refresh.</p>
              <span class="showcase-card-link">Explore →</span>
            </div>
          </div>

          <div class="showcase-card" @click="goTo('/product#scheduler')">
            <div class="showcase-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M12 17L12 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M2 12L7 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M17 12L22 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2"/>
                <path d="M12 9L12 12L14 13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="showcase-card-content">
              <h3>SSO Solar Training Cluster</h3>
              <p>Dawn-dusk sun-synchronous orbit. 95% solar duty cycle. Designed for training-heavy workloads that tolerate orbital latency.</p>
              <span class="showcase-card-link">Explore →</span>
            </div>
          </div>

          <div class="showcase-card" @click="goTo('/product#sorter')">
            <div class="showcase-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M12 18L12 22" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M2 12L6 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M18 12L22 12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <path d="M6 6L8 8M18 18L16 16M18 6L16 8M6 18L8 16" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="showcase-card-content">
              <h3>Hybrid Earth-Orbit</h3>
              <p>Ground campus for latency-critical inference and APIs. SSO cluster for training and synthetic data. Best of both physics regimes.</p>
              <span class="showcase-card-link">Explore →</span>
            </div>
          </div>

          <div class="showcase-card" @click="goTo('/product#library')">
            <div class="showcase-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.2"/>
                <path d="M8 4L8 20" stroke="currentColor" stroke-width="1.2"/>
                <path d="M16 4L16 20" stroke="currentColor" stroke-width="1.2"/>
                <path d="M4 8H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M4 12H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M18 8H20" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M18 12H20" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="showcase-card-content">
              <h3>Serviceable Zebi-Lattice</h3>
              <p>Tethered satellite lattice with swappable PC³ compute cassettes. Robotic Returnable Servicer Vehicle for 18-month chip refresh.</p>
              <span class="showcase-card-link">Explore →</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Used by the teams building the space AI future -->
    <section class="portal-ecosystem">
      <div class="wrap">
        <div class="ecosystem-inner reveal">
          <h2 class="section-title showcase-title" style="margin-bottom: 70px;">Who uses <em>HelioMind OS?</em></h2>
          <div class="ecosystem-grid">
            <div class="ecosystem-category">
              <div class="ecosystem-category-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" stroke-width="1.2" fill="none"/>
                </svg>
              </div>
              <h4>Satellite operators</h4>
              <p>Designing orbital compute constellations from first principles</p>
            </div>
            <div class="ecosystem-category">
              <div class="ecosystem-category-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.2"/>
                  <path d="M9 8H15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                  <path d="M9 12H15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                  <path d="M9 16H13" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
              </div>
              <h4>Space-hardened chip designers</h4>
              <p>Validating thermal and radiation tolerance pre-silicon</p>
            </div>
            <div class="ecosystem-category">
              <div class="ecosystem-category-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.2"/>
                </svg>
              </div>
              <h4>Sovereign space programs</h4>
              <p>Building independent, air-gapped AI capacity</p>
            </div>
            <div class="ecosystem-category">
              <div class="ecosystem-category-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" stroke-width="1.2" fill="none"/>
                  <path d="M9 9L15 12L9 15V9Z" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>
              <h4>Orbital compute startups</h4>
              <p>Accelerating from concept to constellation design</p>
            </div>
          </div>

          <!-- <div class="ecosystem-logos">
            <div class="ecosystem-logos-track">
              <span>ADA Space</span>
              <span>SpaceX</span>
              <span>Google Suncatcher</span>
              <span>Starcloud</span>
              <span>Blue Origin</span>
              <span>Astro-Future</span>
              <span>Orbital Chenguang</span>
            </div>
          </div> -->
        </div>
      </div>
    </section>



    <section class="portal-join">
      <div class="wrap">
        <div class="portal-join-card reveal">
          <h2 class="section-title">We're a small team. <em>We're looking for more.</em></h2>
          <p class="section-intro portal-join-copy">
            If you're an engineer, physicist, or systems thinker who wants to build the platform for the space, we want to talk to you.
          </p>
          <button type="button" class="btn-primary" @click="goTo('/join-us')">
            <span>Join Zebi Lab</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>


<style scoped>
.hero-below-ticker {
  padding-top: 40px;
  min-height: calc(100vh - 56px);
}


/* Ticker (restored full visual style) */
.nasa-stream-section {
  background: #07090e;
  border-bottom: 1px solid rgba(31, 38, 56, 0.5);
  padding: 92px 0 12px;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.nasa-roll-mask {
  position: relative;
  width: 100%;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%);
}

.nasa-roll-wrap {
  display: flex;
  width: 100%;
}

.nasa-roll-track {
  display: flex;
  white-space: nowrap;
  width: max-content;
  animation: nasa-infinite-roll 50s linear infinite;
}

.nasa-roll-track:hover {
  animation-play-state: paused;
}

.nasa-mini-card {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  transition: opacity 0.2s ease;
}

.nasa-mini-card.clickable {
  cursor: pointer;
}

.nasa-mini-card:hover .nasa-mini-title {
  color: #ff6b3d;
}

.nasa-mini-media {
  width: 32px;
  height: 22px;
  border-radius: 3px;
  overflow: hidden;
  background: #0c1018;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.nasa-mini-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nasa-mini-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 61, 0.1), transparent);
}

.nasa-mini-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nasa-mini-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  color: #ff6b3d;
  background: rgba(255, 107, 61, 0.06);
  border: 1px solid rgba(255, 107, 61, 0.12);
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 500;
}

.nasa-mini-title {
  font-family: 'Fraunces', serif;
  font-size: 14px;
  font-weight: 400;
  color: #f3f5f9;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.nasa-mini-divider {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #1f2638;
  margin-left: 8px;
}

@keyframes nasa-infinite-roll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

@media (max-width: 1024px) {
  .nasa-roll-mask {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .nasa-roll-wrap {
    overflow: hidden;
  }
}

@media (max-width: 768px) {
  .nasa-mini-title { font-size: 13px; }
  .nasa-mini-card { padding: 0 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .nasa-roll-track {
    animation: none !important;
    transform: none !important;
  }
}

.portal-hero {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;
}

.portal-hero .wrap {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding-left: 221px;
  padding-right: 40px;
}

.portal-hero .hero-grid {
  grid-template-columns: 1fr;
  gap: 0;
}

.portal-hero .hero-grid > div:first-child {
  max-width: 760px;
  margin-left: 0;
  margin-right: auto;
  padding: 24px 0 8px;
  text-align: left;
  justify-self: start;
  align-self: start;
}

.portal-hero h1,
.portal-hero .hero-kicker,
.portal-hero .hero-sub,
.portal-hero .hero-mission-meta {
  text-align: left;
}

@media (max-width: 900px) {
  .portal-hero .wrap {
    padding-left: 20px;
    padding-right: 20px;
  }

  .portal-hero {
    background-position: 72% center;
  }

  .portal-hero .hero-grid > div:first-child {
    padding-top: 8px;
  }
}

.hero-mission-meta {
  margin-top: 24px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-3);
}

.btn-thesis {
  background: transparent;
  color: var(--cyan);
  border: 1px solid color-mix(in srgb, var(--cyan) 55%, var(--border) 45%);
}

.btn-thesis:hover {
  background: color-mix(in srgb, var(--cyan) 14%, transparent 86%);
  border-color: var(--cyan);
  box-shadow: 0 14px 30px rgba(110, 201, 217, 0.2);
}

.portal-defined-label {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 20px;
}

.portal-defined-inner {
  border: 1px solid color-mix(in srgb, var(--orange) 35%, var(--border) 65%);
  background: color-mix(in srgb, var(--bg-2) 90%, black 10%);
  padding: 48px 40px;
}

.pillar-note {
  margin-top: 16px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-3);
}

.portal-audience-forms {
  padding-top: 64px;
  padding-bottom: 56px;
}

.portal-audience-users {
  padding-top: 56px;
  padding-bottom: 88px;
  border-top: none;
}

.portal-audience-forms .portal-audience-inner,
.portal-audience-users .portal-audience-inner {
  max-width: 980px;
  margin: 0 auto;
  padding: 26px 22px;
  border: 1px solid var(--border);
  background:
    radial-gradient(ellipse at top, rgba(255, 107, 61, 0.06), transparent 62%),
    color-mix(in srgb, var(--bg-2) 86%, black 14%);
}

.portal-audience-forms .portal-audience-label,
.portal-audience-users .portal-audience-label {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
  margin-bottom: 16px;
}

.portal-chip {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 10px 18px;
  background: rgba(12, 16, 24, 0.5);
  transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
}

.portal-chip-action {
  cursor: pointer;
}

.portal-chip-action:hover {
  color: var(--text);
  border-color: rgba(255, 107, 61, 0.4);
  background: rgba(255, 107, 61, 0.1);
  transform: translateY(-1px);
}

.portal-chip-action:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}
</style>

