<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import homeHeroImage from '@/assets/images/home-hero.jpg'

const router = useRouter()
const mailObfuscation = {
  local: ['z', 'e', 'b', 'i'].join(''),
  encodedNumber: window.btoa('1867'),
  domain: ['o', 'u', 't', 'l', 'o', 'o', 'k', '.', 'c', 'o', 'm'].join(''),
}

const tickerNews = ref([
  { source: 'ADA Space', title: '12 sats live', description: 'Orbital compute constellation is now operating in production.', image: '', url: '#' },
  { source: 'SpaceX D3', title: '1M-sat FCC filed', description: 'Large-scale filing signals aggressive orbital AI infrastructure plans.', image: '', url: '#' },
  { source: 'Google Suncatcher', title: '81-sat 2027', description: 'Sun-powered orbital training architecture moves toward deployment.', image: '', url: '#' },
  { source: 'Starcloud', title: 'H100 in orbit', description: 'GPU workloads in orbit continue proving real-world viability.', image: '', url: '#' },
])

function goTo(path) {
  router.push(path)
}

function getJoinUsEmail() {
  return `${mailObfuscation.local}${window.atob(mailObfuscation.encodedNumber)}@${mailObfuscation.domain}`
}

function openJobApplication(roleTitle) {
  const subject = encodeURIComponent(`Application: ${roleTitle}`)
  window.location.href = `mailto:${getJoinUsEmail()}?subject=${subject}`
}

const designMatrixModules = [
  {
    num: '/ 01',
    title: 'Economic Engine',
    subtitle: 'TCO across launch-cost curves',
    description:
      'Simulate sensitivity to launch vehicles, hardware depreciation cycles, and energy costs. Replaces speculation with stochastically sound cost models.',
    href: '/product#tco',
  },
  {
    num: '/ 02',
    title: 'Thermal Digital Twin',
    subtitle: 'Chip die to deep space vacuum',
    description:
      'Grounded in the Stefan-Boltzmann radiation law. Models interface drops across multi-phase cooling loop pipelines in microgravity environments.',
    href: '/product#thermal',
  },
  {
    num: '/ 03',
    title: 'Orbital MoE Designer',
    subtitle: 'Sparse expert topological mapping',
    description:
      'Calculates optimal placement of deep neural network experts across hardware swarms to compress required link bandwidth up to 50x.',
    href: '/product#moe',
  },
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
    <div class="starfield"></div>

    <section
      class="hero portal-hero"
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

    <section class="home-credibility">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Operational Boundaries</div>
          <h2 class="section-title">Defining the <em>Zebi Credibility Principle.</em></h2>
        </div>
        <div class="cred-grid reveal">
          <article class="cred-col is">
            <div class="cred-tag">// WHAT WE ARE</div>
            <ul class="cred-list">
              <li>
                <strong>A Software Architecture Platform</strong>: We design HelioMind OS, an EDA
                layer developed for simulating and scaling frontier computational networks.
              </li>
              <li>
                <strong>Physics-Grounded Estimators</strong>: Every model in our cockpit is anchored
                in absolute thermo-physical constants and launch-cost curves.
              </li>
              <li>
                <strong>Neutral Infrastructure Tooling</strong>: We empower cloud consortia,
                sovereign programs, and deep learning labs to simulate alternate infrastructure
                paradigms before committing capex.
              </li>
            </ul>
          </article>
          <article class="cred-col is-not">
            <div class="cred-tag">// WHAT WE ARE NOT</div>
            <ul class="cred-list">
              <li>
                <strong>Not a Satellite Hardware Fab</strong>: We do not manufacture silicon,
                construct spacecraft hardware, or operate satellite constellations.
              </li>
              <li>
                <strong>Not a High-Risk Speculative Bet</strong>: We are a software-first
                enterprise; our viability is decoupled from individual aerospace execution
                parameters.
              </li>
              <li>
                <strong>Not a Compute Brokerage</strong>: We do not operate an open cloud computing
                marketplace or trade third-party server capacity.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="home-philosophy">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Philosophical Core</div>
          <h2 class="section-title">
            Aligning the thermodynamics of silicon with the
            <em>infinite resources of the sun.</em>
          </h2>
        </div>
        <div class="mv-container reveal">
          <article class="mv-box">
            <div class="mv-tag">// Our Mission</div>
            <p class="mv-text">
              To untether global intelligence from the finite resource boundaries of Earth. By
              building the standard software architecture for space-based computation, we enable
              computing systems to capture <em>unattenuated solar energy</em> and unlock ultimate
              scaling limits.
            </p>
          </article>
          <article class="mv-box">
            <div class="mv-tag">// Our Vision</div>
            <p class="mv-text">
              To establish <strong>HelioMind OS</strong> as the indispensable, vendor-neutral
              intelligence layer for interplanetary infrastructure. A world where hyperscalers,
              sovereign nations, and orbital operators do not guess, but design using the absolute
              <em>laws of deep-space physics</em>.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="home-live-signal">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Constellation Telemetry</div>
          <h2 class="section-title">Space AI <em>Live Signal</em></h2>
          <p class="home-signal-intro">
            Synchronize real-time global aerospace developments and core deep-space computational
            metrics directly to the interface.
          </p>
        </div>
        <div class="news-container reveal">
          <div class="news-header-row">
            <div class="news-title-tag">
              <span class="news-blink"></span>
              Deep Space Telemetry Stream // Active
            </div>
          </div>
          <div class="news-grid">
            <a
              v-for="(item, idx) in tickerNews"
              :key="`${item.title}-${idx}`"
              class="news-item"
              :href="item.url || '#'"
              :target="item.url && item.url.startsWith('http') ? '_blank' : '_self'"
              rel="noopener noreferrer"
            >
              <div class="news-item-media">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="news-item-image" />
                <div v-else class="news-item-placeholder"></div>
              </div>
              <div class="news-item-content">
                <div class="news-meta">Signal Source: {{ item.source }} // Live feed</div>
                <div class="news-heading">{{ item.title }}</div>
                <p v-if="item.description" class="news-desc">{{ item.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="home-macro-trends">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Macro-Economic Backdrop</div>
          <h2 class="section-title">
            The unavoidable physics driving <em>infrastructure offshoring.</em>
          </h2>
          <p class="home-signal-intro">
            Global cloud consortia and front-line compute labs face equivalent physical constraints:
            terrestrial energy bottlenecks combined with heavy junction thermal expansion are
            pushing network design to orbital vectors.
          </p>
        </div>
        <div class="grid-3 reveal">
          <article class="cell">
            <div class="cell-num">01 //</div>
            <div class="cell-stat">100×</div>
            <div class="cell-label">Compute vs Grid Mismatch</div>
            <p>
              As structural transistor density and thermal dissipation rates compound, AI workload
              scaling is rapidly outstripping conventional terrestrial grid capacities.
            </p>
          </article>
          <article class="cell">
            <div class="cell-num">02 //</div>
            <div class="cell-stat">5.4×</div>
            <div class="cell-label">Unattenuated Solar Advantage</div>
            <p>
              By operating outside atmospheric dispersion limits, solar irradiance arrays achieve
              more than five times the conversion efficiency of terrestrial fields.
            </p>
          </article>
          <article class="cell">
            <div class="cell-num">03 //</div>
            <div class="cell-stat">EDA</div>
            <div class="cell-label">The Missing Software Architecture</div>
            <p>
              The semiconductor explosion generated massive EDA infrastructure. Heterogeneous,
              hyper-scale compute deployment design tools are wide open. This is Zebi space.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="home-design-matrix">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">The Sandbox Suite</div>
          <h2 class="section-title">Integrated Design Matrix</h2>
        </div>
        <div class="module-list reveal">
          <button
            v-for="module in designMatrixModules"
            :key="module.title"
            type="button"
            class="module-row"
            @click="goTo(module.href)"
          >
            <div class="m-num">{{ module.num }}</div>
            <div class="m-title">
              {{ module.title }}
              <span>{{ module.subtitle }}</span>
            </div>
            <p class="m-desc">{{ module.description }}</p>
          </button>
        </div>
      </div>
    </section>

    <section class="home-join-engineer">
      <div class="wrap">
        <div class="reveal">
          <div class="section-eyebrow">Zebi Lab Crew</div>
          <h2 class="section-title">Help us engineer the <em>Solar AI Civilization.</em></h2>
        </div>
        <div class="join-grid reveal">
          <div class="join-manifesto">
            <p>
              We reject standard technology design methodologies. At <strong>Zebi Lab</strong>, we
              only accept the fundamental laws of physics as hard constraints.
            </p>
            <p>
              We are a high-density, flat-topology cluster of systems architects, aerospace hardware
              advisors, and distributed computing experts. If you want to govern kilowatts per
              metric ton under space environments, transmit credentials below.
            </p>
          </div>
          <div class="jobs-list">
            <button
              type="button"
              class="job-card"
              @click="openJobApplication('Distributed MoE Network Architect')"
            >
              <div>
                <div class="job-title">Distributed MoE Network Architect</div>
                <div class="job-dept">Compute Layer // Singapore or Palo Alto</div>
              </div>
              <div class="job-arrow">→</div>
            </button>
            <button
              type="button"
              class="job-card"
              @click="openJobApplication('Spacecraft Thermal Systems Engineer')"
            >
              <div>
                <div class="job-title">Spacecraft Thermal Systems Engineer</div>
                <div class="job-dept">Physical Stack // Delaware or Remote</div>
              </div>
              <div class="job-arrow">→</div>
            </button>
            <button type="button" class="btn-primary home-join-btn" @click="goTo('/join-us')">
              Join Zebi Lab
            </button>
          </div>
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

.home-credibility,
.home-philosophy,
.home-live-signal,
.home-macro-trends,
.home-design-matrix,
.home-join-engineer {
  border-top: 1px solid var(--border);
}

.home-credibility,
.home-philosophy,
.home-live-signal,
.home-macro-trends,
.home-design-matrix {
  padding: 88px 0;
}

.home-join-engineer {
  padding: 88px 0 110px;
}

.cred-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  margin-top: 40px;
}

.cred-col {
  padding: 40px 34px;
  background: var(--bg-2);
}

.cred-col.is {
  border-left: 2px solid var(--cyan);
}

.cred-col.is-not {
  border-left: 2px solid var(--red);
}

.cred-tag {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.cred-col.is .cred-tag {
  color: var(--cyan);
}

.cred-col.is-not .cred-tag {
  color: var(--red);
}

.cred-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cred-list li {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.65;
}

.cred-list li strong {
  color: var(--text);
}

.mv-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 40px;
}

.mv-box {
  border: 1px solid var(--border);
  background: var(--bg-2);
  padding: 34px 28px;
}

.mv-tag {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 14px;
}

.mv-text {
  font-family: var(--display);
  font-size: 22px;
  line-height: 1.45;
  color: var(--text-2);
}

.mv-text em {
  color: var(--orange);
}

.mv-text strong {
  color: var(--text);
  font-weight: 500;
}

.home-signal-intro {
  margin-top: 12px;
  color: var(--text-2);
  font-size: 16px;
  max-width: 760px;
  line-height: 1.6;
}

.news-container {
  margin-top: 28px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  padding: 26px;
}

.news-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 14px;
  margin-bottom: 14px;
}

.news-title-tag {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cyan);
  display: flex;
  align-items: center;
  gap: 8px;
}

.news-blink {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 8px var(--cyan);
  animation: signalBlink 1.8s infinite;
}

@keyframes signalBlink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

.news-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.news-item {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  text-decoration: none;
  border-left: 2px solid var(--border);
  padding: 6px 0 6px 14px;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.news-item:hover {
  border-left-color: var(--orange);
  background: color-mix(in srgb, var(--bg-2) 84%, var(--orange-soft) 16%);
}

.news-item-media {
  width: 120px;
  height: 72px;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg);
}

.news-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-item-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 61, 0.1), rgba(110, 201, 217, 0.08));
}

.news-item-content {
  min-width: 0;
}

.news-meta {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.news-heading {
  font-family: var(--display);
  font-size: 18px;
  color: var(--text);
  line-height: 1.35;
}

.news-desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  margin-top: 38px;
}

.cell {
  background: var(--bg-2);
  padding: 34px 28px;
}

.cell-num {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--orange);
  margin-bottom: 16px;
}

.cell-stat {
  font-family: var(--display);
  font-size: 42px;
  line-height: 1;
  margin-bottom: 12px;
  color: var(--text);
}

.cell-label {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin-bottom: 14px;
}

.cell p {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.62;
}

.module-list {
  margin-top: 34px;
  border-top: 1px solid var(--border);
}

.module-row {
  width: 100%;
  display: grid;
  grid-template-columns: 72px 1.1fr 2fr;
  gap: 22px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: inherit;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  cursor: pointer;
}

.module-row:hover {
  background: linear-gradient(90deg, rgba(255, 107, 61, 0.08), transparent);
}

.m-num {
  font-family: var(--mono);
  color: var(--orange);
  font-size: 12px;
}

.m-title {
  font-family: var(--display);
  font-size: 24px;
  color: var(--text);
  line-height: 1.2;
}

.m-title span {
  display: block;
  margin-top: 6px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--orange);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.m-desc {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.64;
}

.join-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  margin-top: 30px;
}

.join-manifesto {
  display: grid;
  gap: 16px;
}

.join-manifesto p {
  font-family: var(--display);
  font-size: 22px;
  line-height: 1.5;
  color: var(--text-2);
}

.join-manifesto strong {
  color: var(--text);
}

.jobs-list {
  display: grid;
  gap: 12px;
}

.job-card {
  width: 100%;
  text-align: left;
  font: inherit;
  appearance: none;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid var(--border);
  background: var(--bg-2);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.job-card:hover {
  border-color: var(--orange);
  transform: translateY(-2px);
}

.job-title {
  font-family: var(--display);
  color: var(--text);
  font-size: 20px;
}

.job-dept {
  margin-top: 4px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--orange);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.job-arrow {
  color: var(--text-3);
  font-size: 18px;
}

.home-join-btn {
  margin-top: 10px;
  justify-content: center;
}

@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .module-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .join-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-credibility,
  .home-philosophy,
  .home-live-signal,
  .home-macro-trends,
  .home-design-matrix {
    padding: 64px 0;
  }

  .home-join-engineer {
    padding: 64px 0 84px;
  }

  .cred-grid,
  .mv-container {
    grid-template-columns: 1fr;
  }

  .cred-col,
  .mv-box,
  .news-container,
  .cell {
    padding: 22px 18px;
  }

  .mv-text,
  .join-manifesto p {
    font-size: 18px;
  }

  .home-signal-intro {
    font-size: 14px;
  }

  .news-heading {
    font-size: 16px;
  }

  .news-item {
    grid-template-columns: 1fr;
    padding-left: 10px;
  }

  .news-item-media {
    width: 100%;
    height: 150px;
  }

  .m-title {
    font-size: 20px;
  }

  .job-title {
    font-size: 17px;
  }
}
</style>

