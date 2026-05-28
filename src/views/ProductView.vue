<script setup>
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-platform.css'
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import { initPlatformPage } from '@/scripts/platform-page.js'
import productHeroImage from '@/assets/images/product.jpg'

const router = useRouter()
const categoryIds = ['economics', 'physics', 'orchestration']
const quickJumpIds = ['thesis', 'architecture', 'unit-cell', 'modules', 'landscape']
const activeModuleId = ref(null)

function goTo(path) {
  router.push(path)
}

function toggleModule(moduleId) {
  activeModuleId.value = activeModuleId.value === moduleId ? null : moduleId
  nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!window.Chart || !window.Chart.instances) return
        Object.values(window.Chart.instances).forEach((chart) => {
          if (chart && typeof chart.resize === 'function') {
            chart.resize()
          }
        })
      })
    })
  })
}

function onCategoryTabClick(event, targetId) {
  event.preventDefault()
  const section = document.getElementById(targetId)
  if (!section) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const navHeight =
    document.querySelector('.platform-category-nav')?.getBoundingClientRect().height || 0
  const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - navHeight - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

function onQuickJumpClick(event, targetId) {
  event.preventDefault()
  const section = document.getElementById(targetId)
  if (!section) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const quickJumpHeight =
    document.querySelector('.platform-quick-jump')?.getBoundingClientRect().height || 0
  const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - quickJumpHeight - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

function updateActiveCategoryTab() {
  const tabs = document.querySelectorAll('.platform-category-tab')
  if (!tabs.length) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const navHeight =
    document.querySelector('.platform-category-nav')?.getBoundingClientRect().height || 0
  const offset = headerHeight + navHeight + 40
  let activeId = categoryIds[0]
  for (const id of categoryIds) {
    const section = document.getElementById(id)
    if (!section) continue
    const top = section.getBoundingClientRect().top
    if (top - offset <= 0) activeId = id
  }

  tabs.forEach((tab) => {
    const href = tab.getAttribute('href') || ''
    tab.classList.toggle('is-active', href === `#${activeId}`)
  })
}

function updateActiveQuickJumpTab() {
  const links = document.querySelectorAll('.platform-quick-jump-links a')
  if (!links.length) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const quickJumpHeight =
    document.querySelector('.platform-quick-jump')?.getBoundingClientRect().height || 0
  const offset = headerHeight + quickJumpHeight + 28

  let activeId = quickJumpIds[0]
  for (const id of quickJumpIds) {
    const section = document.getElementById(id)
    if (!section) continue
    const top = section.getBoundingClientRect().top
    if (top - offset <= 0) activeId = id
  }

  links.forEach((link) => {
    const href = link.getAttribute('href') || ''
    link.classList.toggle('is-active', href === `#${activeId}`)
  })
}

const loadChart = () =>
  new Promise((resolve) => {
    if (window.Chart) {
      resolve()
      return
    }
    const existing = document.querySelector('script[data-chartjs="true"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
    script.dataset.chartjs = 'true'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })

onMounted(async () => {
  await loadChart()
  initPlatformPage()
  updateActiveCategoryTab()
  updateActiveQuickJumpTab()
  window.addEventListener('scroll', updateActiveCategoryTab, { passive: true })
  window.addEventListener('scroll', updateActiveQuickJumpTab, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveCategoryTab)
  window.removeEventListener('scroll', updateActiveQuickJumpTab)
})
</script>

<template>
  <SiteHeader />
  <main>
<section
  class="platform-hero"
  :style="{
    backgroundImage: `linear-gradient(90deg, rgba(7, 9, 14, 0.97) 0%, rgba(7, 9, 14, 0.94) 28%, rgba(7, 9, 14, 0.58) 56%, rgba(7, 9, 14, 0.14) 100%), linear-gradient(180deg, rgba(7, 9, 14, 0.12) 0%, rgba(7, 9, 14, 0.04) 58%, rgba(7, 9, 14, 0.72) 84%, rgba(7, 9, 14, 0.96) 100%), url(${productHeroImage})`,
  }"
>
  <div class="wrap">
    <div class="platform-hero-copy">
      <div class="hero-eyebrow">Our Product</div>
      <h1><em>HelioMind OS</em> · Orbital Design System</h1>
      <h3 class="hero-kicker">Design the orbital AI stack with 11 connected engines.</h3>
      <p style="margin-bottom: 10px;">
        Start with the five core sections on this page - Architecture, Unit Cell, Modules, and
        Landscape. Follow the flow to understand how HelioMind OS is built, what it can do, and
        why it matters.
      </p>
    </div>
  </div>
</section>

<section class="platform-quick-jump">
  <div class="wrap">
    <div class="platform-quick-jump-links">
      <a href="#thesis" @click="onQuickJumpClick($event, 'thesis')"><span class="jump-num">01</span><span>Thesis</span></a>
      <a href="#architecture" @click="onQuickJumpClick($event, 'architecture')"><span class="jump-num">02</span><span>Architecture</span></a>
      <a href="#unit-cell" @click="onQuickJumpClick($event, 'unit-cell')"><span class="jump-num">03</span><span>Unit Cell</span></a>
      <a href="#modules" @click="onQuickJumpClick($event, 'modules')"><span class="jump-num">04</span><span>Modules</span></a>
      <a href="#landscape" @click="onQuickJumpClick($event, 'landscape')"><span class="jump-num">05</span><span>Landscape</span></a>
    </div>
  </div>
</section>

<section id="thesis" class="platform-thesis-section">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The thesis</div>
      <h2>
        Every AI infrastructure decision today is made <em>with spreadsheets and faith</em>.
      </h2>
      <p>
        The largest capital build-out in human history is happening at the worst-tooled moment in
        software's history. AI labs commit to gigawatts they cannot model. Satellite operators
        design constellations they cannot simulate. Sovereign programs spend tens of billions on
        intuition. HelioMind OS is what they should have used.
      </p>
    </div>

    <div class="problem-grid">
      <div class="problem-cell">
        <div class="problem-num">i.</div>
        <div class="problem-stat"><em>$3.5T</em></div>
        <div class="problem-label">AI infrastructure capex through 2030</div>
        <p class="problem-body">
          Hyperscaler buildouts, sovereign AI programs, satellite constellations, edge inference
          fleets - every category compounding. No one has the tooling to optimize this spend.
        </p>
      </div>
      <div class="problem-cell">
        <div class="problem-num">ii.</div>
        <div class="problem-stat"><em>15+</em></div>
        <div class="problem-label">Orbital compute programs in flight</div>
        <p class="problem-body">
          SpaceX, Google, NVIDIA, Blue Origin, ADA Space, Starcloud, Astro-Future, Orbital
          Chenguang. Each independently rebuilding the same simulation tools. Each badly.
        </p>
      </div>
      <div class="problem-cell">
        <div class="problem-num">iii.</div>
        <div class="problem-stat"><em>0</em></div>
        <div class="problem-label">Existing design platforms in this category</div>
        <p class="problem-body">
          Chip design has Cadence and Synopsys, each $50B+ companies. AI infrastructure design has
          nothing. The empty seat at the most expensive table in technology.
        </p>
      </div>
    </div>
  </div>
</section>

<section id="architecture" class="platform-knowledge-section">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The architecture</div>
      <h2>HelioMind Orbital AI Center. Three layers, one <em>thesis</em>.</h2>
      <p>
        Treat orbit as a solar-powered, high-latency, delay-tolerant batch-compute layer. Keep
        storage, APIs, privacy, and customer access on Earth. The infrastructure is not a copy of
        cloud architecture lifted into space - it is a different beast designed for the physics of
        orbit.
      </p>
    </div>

    <div class="arch-stack">
      <div class="arch-layer">
        <div class="arch-layer-num">i.</div>
        <div class="arch-layer-orbit">Low Earth Orbit · 500-700 km</div>
        <div class="arch-layer-name">LEO Inference <em>Swarm</em></div>
        <p class="arch-layer-purpose">
          Low-latency orbital inference at the imagery source. Workloads where data already lives in
          space and downlinking is the bottleneck.
        </p>
        <div class="arch-layer-viz">
          <div class="arch-mini-vis">
            <div class="arch-earth" style="bottom: 0;"></div>
            <div class="arch-orbit-line" style="width: 280px; height: 80px;"></div>
            <div class="arch-sat-dot" style="left: 20%; top: 38%;"></div>
            <div class="arch-sat-dot" style="left: 35%; top: 42%;"></div>
            <div class="arch-sat-dot" style="left: 50%; top: 40%;"></div>
            <div class="arch-sat-dot" style="left: 65%; top: 44%;"></div>
            <div class="arch-sat-dot" style="left: 80%; top: 38%;"></div>
          </div>
        </div>
        <div class="arch-layer-workloads">
          <div class="arch-layer-workloads-title">Suited workloads</div>
          <ul>
            <li>Earth observation, real-time analysis</li>
            <li>Commercial remote sensing</li>
            <li>Edge inference at imagery source</li>
            <li>Defense / sovereign tactical</li>
          </ul>
        </div>
      </div>

      <div class="arch-layer">
        <div class="arch-layer-num">ii.</div>
        <div class="arch-layer-orbit">Sun-synchronous · dawn-dusk</div>
        <div class="arch-layer-name">SSO Solar <em>Training Cluster</em></div>
        <p class="arch-layer-purpose">
          Maximum sunlight orbit. 95% solar illumination. The economic engine of the architecture:
          compute-intensive, latency-tolerant, fully batched.
        </p>
        <div class="arch-layer-viz">
          <div class="arch-mini-vis">
            <div class="arch-earth" style="bottom: 0;"></div>
            <div class="arch-orbit-line" style="width: 320px; height: 120px;"></div>
            <div class="arch-sat-dot" style="left: 15%; top: 25%; width: 10px; height: 10px;"></div>
            <div class="arch-sat-dot" style="left: 30%; top: 22%; width: 10px; height: 10px;"></div>
            <div class="arch-sat-dot" style="left: 45%; top: 20%; width: 10px; height: 10px;"></div>
            <div class="arch-sat-dot" style="left: 60%; top: 22%; width: 10px; height: 10px;"></div>
            <div class="arch-sat-dot" style="left: 75%; top: 25%; width: 10px; height: 10px;"></div>
          </div>
        </div>
        <div class="arch-layer-workloads">
          <div class="arch-layer-workloads-title">Suited workloads</div>
          <ul>
            <li>Frontier model training (offline)</li>
            <li>Synthetic data generation</li>
            <li>Model distillation, fine-tuning</li>
            <li>Climate / scientific batch runs</li>
          </ul>
        </div>
      </div>

      <div class="arch-layer">
        <div class="arch-layer-num">iii.</div>
        <div class="arch-layer-orbit">Ground · global gateway mesh</div>
        <div class="arch-layer-name">Earth-Orbit <em>Hybrid Scheduler</em></div>
        <p class="arch-layer-purpose">
          The control plane. Customer-facing APIs, sensitive data, regulatory governance, model
          registry, checkpoint management. Orbit follows what ground decides.
        </p>
        <div class="arch-layer-viz">
          <div class="arch-mini-vis">
            <div
              class="arch-earth"
              style="bottom: 0; background: radial-gradient(ellipse at 50% 0%, #2a3550, #0f1726 70%); box-shadow: 0 0 60px rgba(110, 201, 217, 0.3);"
            ></div>
            <div style="position: absolute; left: 25%; top: 50%; width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; box-shadow: 0 0 8px var(--cyan);"></div>
            <div style="position: absolute; left: 50%; top: 35%; width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; box-shadow: 0 0 8px var(--cyan);"></div>
            <div style="position: absolute; left: 75%; top: 50%; width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; box-shadow: 0 0 8px var(--cyan);"></div>
          </div>
        </div>
        <div class="arch-layer-workloads">
          <div class="arch-layer-workloads-title">Earth-side responsibilities</div>
          <ul>
            <li>Customer-facing APIs, billing</li>
            <li>Sensitive data, privacy governance</li>
            <li>Model registry, checkpoint store</li>
            <li>Orbit-aware workload routing</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="unit-cell" class="platform-knowledge-section alt">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The unit cell</div>
      <h2>The Compute Petal. Not a box - a <em>flower</em>.</h2>
      <p>
        Every AI satellite in the Zebi-Lattice architecture is a Compute Petal: a deployable
        structure with a compute core at the center, solar wing pointed at the sun, and radiator
        wing forever pointed away. Heat becomes a first-class compute resource, not a thermal
        problem.
      </p>
    </div>

    <div class="petal-anatomy">
      <div class="petal-anatomy-vis">
        <svg class="petal-svg" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            <circle cx="60" cy="60" r="14" fill="#ff8359" />
            <circle
              cx="60"
              cy="60"
              r="22"
              fill="none"
              stroke="#ff8359"
              stroke-width="0.5"
              stroke-dasharray="2 3"
            />
            <text
              x="60"
              y="100"
              text-anchor="middle"
              fill="#969cae"
              font-family="JetBrains Mono, monospace"
              font-size="9"
              letter-spacing="1.5"
            >
              SUN →
            </text>
          </g>
          <g>
            <polygon
              points="120,80 230,180 200,210 90,110"
              fill="rgba(255,131,89,0.15)"
              stroke="#ff8359"
              stroke-width="1"
            />
            <line
              x1="120"
              y1="80"
              x2="200"
              y2="210"
              stroke="#ff8359"
              stroke-width="0.3"
              opacity="0.5"
            />
            <line
              x1="155"
              y1="100"
              x2="170"
              y2="170"
              stroke="#ff8359"
              stroke-width="0.3"
              opacity="0.5"
            />
            <line
              x1="135"
              y1="120"
              x2="180"
              y2="160"
              stroke="#ff8359"
              stroke-width="0.3"
              opacity="0.5"
            />
            <text
              x="100"
              y="75"
              fill="#ff8359"
              font-family="JetBrains Mono, monospace"
              font-size="9"
              letter-spacing="1.2"
            >
              SOLAR WING
            </text>
          </g>
          <g>
            <rect x="195" y="195" width="70" height="70" fill="#1a2030" stroke="#ff6b3d" stroke-width="1.5" />
            <rect x="210" y="210" width="40" height="40" fill="none" stroke="#ff6b3d" stroke-width="0.5" />
            <rect x="218" y="218" width="24" height="24" fill="#ff6b3d" opacity="0.3" />
            <circle cx="230" cy="230" r="3" fill="#ff6b3d" />
            <text
              x="230"
              y="285"
              text-anchor="middle"
              fill="#ff6b3d"
              font-family="JetBrains Mono, monospace"
              font-size="9"
              letter-spacing="1.2"
            >
              COMPUTE CORE
            </text>
          </g>
          <g>
            <polygon
              points="260,250 370,350 340,380 230,280"
              fill="rgba(110,201,217,0.15)"
              stroke="#6ec9d9"
              stroke-width="1"
            />
            <line x1="270" y1="265" x2="350" y2="370" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5" />
            <line x1="290" y1="280" x2="335" y2="355" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5" />
            <line x1="310" y1="295" x2="320" y2="340" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5" />
            <text
              x="365"
              y="390"
              text-anchor="end"
              fill="#6ec9d9"
              font-family="JetBrains Mono, monospace"
              font-size="9"
              letter-spacing="1.2"
            >
              RADIATOR WING
            </text>
          </g>
        </svg>
      </div>
      <div class="petal-module-list">
        <div class="petal-module"><div class="petal-module-num">/ 01</div><div><div class="petal-module-name">AI compute core</div><div class="petal-module-desc">TPU, GPU, or space-hardened ASIC accelerator. Center of the petal. Houses the chip the workload runs on.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 02</div><div><div class="petal-module-name">Local SSD &amp; MRAM buffer</div><div class="petal-module-desc">Temporary storage for training data, checkpoints, and operational logs. Radiation-hardened MRAM for critical state.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 03</div><div><div class="petal-module-name">Optical inter-satellite link</div><div class="petal-module-desc">Laser communication to adjacent petals. Carries expert activations, gradients, and checkpoint state at Tbps speeds.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 04</div><div><div class="petal-module-name">RF fallback antenna</div><div class="petal-module-desc">Low-rate emergency communication. Used during optical link outages or for low-priority telemetry downlink.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 05</div><div><div class="petal-module-name">Deployable solar wing</div><div class="petal-module-desc">Primary power. Sun-pointed at all times in dawn-dusk SSO. Provides up to 95% duty cycle for compute-intensive workloads.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 06</div><div><div class="petal-module-name">Deployable radiator wing</div><div class="petal-module-desc">Primary heat sink. Permanently shadowed from sun and Earth IR. Doubles as structural spine - Radiator-as-Structure design principle.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 07</div><div><div class="petal-module-name">Radiation-aware controller</div><div class="petal-module-desc">Detects single-event upsets, manages reboots, migrates active workloads to redundant petals when radiation exposure exceeds thresholds.</div></div></div>
        <div class="petal-module"><div class="petal-module-num">/ 08</div><div><div class="petal-module-name">Edge scheduler</div><div class="petal-module-desc">Decides locally whether to compute, downclock, or sleep based on thermal state, battery level, and orbit position. Thermal-first computing.</div></div></div>
      </div>
    </div>
  </div>
</section>

<section id="modules" class="platform-modules-intro">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The platform</div>
      <h2>Eleven modules. One <em>operating system</em> for AI infrastructure.</h2>
      <p>
        Click each module card to open controls, charts, and outputs. Economics, Physics, and
        Orchestration modules are grouped below for fast exploration.
      </p>
    </div>
  </div>
</section>

<!-- <nav class="platform-category-nav" aria-label="Module categories">
  <div class="wrap platform-category-nav-inner">
    <a href="#economics" class="platform-category-tab" @click="onCategoryTabClick($event, 'economics')"
      >Economics</a
    >
    <a href="#physics" class="platform-category-tab" @click="onCategoryTabClick($event, 'physics')"
      >Physics</a
    >
    <a
      href="#orchestration"
      class="platform-category-tab"
      @click="onCategoryTabClick($event, 'orchestration')"
      >Orchestration</a
    >
  </div>
</nav> -->

<section id="economics" class="platform-category-band">
  <div class="wrap">
    <div class="platform-category-head">
      <h2>Economics</h2>
      <p>Answer "What does it cost?" — with confidence, not spreadsheets.</p>
    </div>
  </div>
</section>
<section class="module" id="tco">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'tco'"
      aria-controls="module-panel-tco"
      @click="toggleModule('tco')"
      @keydown.enter.prevent="toggleModule('tco')"
      @keydown.space.prevent="toggleModule('tco')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 01</div>
        <div>
          <h3 class="module-summary-title">Economic Engine</h3>
          <p class="module-summary-desc">Compare terrestrial vs orbital TCO over 10 years.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Launch: $1,500/kg → TCO: 2.4×</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'tco' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'tco' }">⌄</div>
    </div>
    <div id="module-panel-tco" class="module-collapse" :class="{ 'is-open': activeModuleId === 'tco' }">
      <div class="module-header">
        <div>
          <div class="module-meta">/ 01 · Economic Engine</div>
          <div class="module-title">TCO across <em>launch-cost curves</em>.</div>
        </div>
        <div class="module-description">
          Compare terrestrial vs orbital TCO over 10 years. Adjust launch cost ($/kg), chip
          refresh cycles, and energy price. See the orbital premium in real time. Launch cost to
          LEO is the single most sensitive variable.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Inputs</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Target compute capacity</span>
            <span class="control-label-value" id="tco-mw-label">100 MW</span>
          </div>
          <input type="range" id="tco-mw" min="10" max="1000" value="100" step="10" />
          <div class="control-hint">Inference-equivalent MW</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Launch cost</span>
            <span class="control-label-value" id="tco-launch-label">$1,500/kg</span>
          </div>
          <input type="range" id="tco-launch" min="100" max="3500" value="1500" step="100" />
          <div class="control-hint">Starship target $200/kg</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Satellite cost per watt</span>
            <span class="control-label-value" id="tco-satcost-label">$22/W</span>
          </div>
          <input type="range" id="tco-satcost" min="5" max="50" value="22" step="1" />
          <div class="control-hint">Payload BOM all-in</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Chip refresh cycle</span>
            <span class="control-label-value" id="tco-refresh-label">24 months</span>
          </div>
          <input type="range" id="tco-refresh" min="12" max="60" value="24" step="6" />
          <div class="control-hint">Blackwell → Rubin ≈ 18-24mo</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Terrestrial energy cost</span>
            <span class="control-label-value" id="tco-energy-label">$0.06/kWh</span>
          </div>
          <input type="range" id="tco-energy" min="0.03" max="0.20" value="0.06" step="0.01" />
          <div class="control-hint">Industrial rate · regional</div>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Terrestrial 10y TCO</div>
            <div class="kpi-value cyan" id="kpi-ground">$0.0B</div>
            <div class="kpi-sub">capex + opex</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Orbital disposable</div>
            <div class="kpi-value red" id="kpi-orbital-disp">$0.0B</div>
            <div class="kpi-sub">relaunch every cycle</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Serviceable orbital</div>
            <div class="kpi-value orange" id="kpi-zebi">$0.0B</div>
            <div class="kpi-sub">cassette swaps</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Cost multiple</div>
            <div class="kpi-value green" id="kpi-multiple">0.0×</div>
            <div class="kpi-sub">orbital vs ground</div>
          </div>
        </div>

        <div class="chart-container tall">
          <div class="chart-title">Cumulative TCO · USD billions over 10 years</div>
          <canvas id="tco-chart"></canvas>
        </div>

        <div class="verdict">
          <div class="verdict-label">Verdict</div>
          <div class="verdict-text" id="tco-verdict">Adjust the inputs to update the model.</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- THERMAL -->
<section class="module" id="risk">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'risk'"
      aria-controls="module-panel-risk"
      @click="toggleModule('risk')"
      @keydown.enter.prevent="toggleModule('risk')"
      @keydown.space.prevent="toggleModule('risk')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 09</div>
        <div>
          <h3 class="module-summary-title">Risk &amp; Regulatory Engine</h3>
          <p class="module-summary-desc">Add launch delay, insurance, and regulatory friction.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Risk overhead: +24%</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'risk' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'risk' }">⌄</div>
    </div>
    <div id="module-panel-risk" class="module-collapse" :class="{ 'is-open': activeModuleId === 'risk' }">
      <div class="module-header">
        <div>
          <div class="module-meta">/ 09 · Risk &amp; Regulatory Engine · NEW</div>
          <div class="module-title">Risk-adjusted TCO is the <em>only</em> TCO.</div>
        </div>
        <div class="module-description">
          Add expected risk costs — launch delay, insurance, debris probability, ITU spectrum
          coordination, and export controls. In space, no one hears your regulatory delay. But
          your P&amp;L does.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Deployment profile</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Architecture</span>
          </div>
          <select id="risk-arch">
            <option value="ground" selected>Terrestrial AI campus</option>
            <option value="orbital">Orbital constellation (LEO/SSO)</option>
            <option value="hybrid">Hybrid Earth-orbit</option>
            <option value="sovereign">Sovereign / defense classified</option>
          </select>
          <div class="control-hint">Drives the risk profile</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Base capex</span>
            <span class="control-label-value" id="risk-capex-label">$5B</span>
          </div>
          <input type="range" id="risk-capex" min="0.5" max="50" value="5" step="0.5" />
          <div class="control-hint">From economic engine output</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Region</span>
          </div>
          <select id="risk-region">
            <option value="us" selected>USA</option>
            <option value="eu">European Union</option>
            <option value="cn">China</option>
            <option value="me">Middle East (GCC)</option>
            <option value="sg">Singapore / SE Asia</option>
            <option value="in">India</option>
          </select>
          <div class="control-hint">Regulatory regime varies</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Insurance coverage</span>
            <span class="control-label-value" id="risk-ins-label">Standard</span>
          </div>
          <input type="range" id="risk-ins" min="0" max="3" value="1" step="1" />
          <div class="control-hint">None · standard · enhanced · sovereign</div>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Base TCO</div>
            <div class="kpi-value cyan" id="risk-kpi-base">$5.0B</div>
            <div class="kpi-sub">unrisked</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Risk overhead</div>
            <div class="kpi-value orange" id="risk-kpi-overhead">$1.2B</div>
            <div class="kpi-sub">expected cost</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Risk-adjusted TCO</div>
            <div class="kpi-value red" id="risk-kpi-adj">$6.2B</div>
            <div class="kpi-sub">true cost</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Schedule delay</div>
            <div class="kpi-value gold" id="risk-kpi-delay">+8 mo</div>
            <div class="kpi-sub">expected slip</div>
          </div>
        </div>

        <div class="risk-summary">
          <div class="chart-title">Risk profile by category</div>
          <div class="risk-bar-container" id="risk-bars"></div>
        </div>

        <div class="risk-grid">
          <div class="risk-category">
            <div class="risk-category-title">Regulatory · operational risks</div>
            <div id="risk-list-reg"></div>
          </div>
          <div class="risk-category">
            <div class="risk-category-title">Technical · execution risks</div>
            <div id="risk-list-tech"></div>
          </div>
        </div>

        <div class="verdict">
          <div class="verdict-label">Risk verdict</div>
          <div class="verdict-text" id="risk-verdict">—</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- REFERENCE DESIGN LIBRARY -->
<section class="module" id="library">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'library'"
      aria-controls="module-panel-library"
      @click="toggleModule('library')"
      @keydown.enter.prevent="toggleModule('library')"
      @keydown.space.prevent="toggleModule('library')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 10</div>
        <div>
          <h3 class="module-summary-title">Reference Design Library</h3>
          <p class="module-summary-desc">Clone proven architectures. Start from what works.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">6 designs available</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'library' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'library' }">⌄</div>
    </div>
    <div
      id="module-panel-library"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'library' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 10 · Reference Design Library · NEW</div>
          <div class="module-title">Clone what already <em>works</em>.</div>
        </div>
        <div class="module-description">
          Clone proven architectures: liquid-cooled campus, LEO inference swarm, SSO solar
          training cluster, and Zebi-Lattice serviceable patterns. Why design from scratch when
          you can fork what already flies?
        </div>
      </div>

    <div class="output-panel">
      <div class="ref-design-grid" id="ref-design-grid">
        <!-- populated by JS -->
      </div>

      <div class="ref-design-detail" id="ref-design-detail">
        <!-- populated by JS -->
      </div>

      <div class="verdict">
        <div class="verdict-label">Library principle</div>
        <div class="verdict-text">
          Every reference design is built from <em>real numbers, real chips, real launch vehicles</em>. Cloning saves the customer six months of design work. Modifying takes minutes. The library is the platform's compounding asset.
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- MARKET LANDSCAPE -->

<section id="physics" class="platform-category-band">
  <div class="wrap">
    <div class="platform-category-head">
      <h2>Physics</h2>
      <p>Model the constraints that matter in space. (Hint: heat does not convect.)</p>
    </div>
  </div>
</section>
<section class="module" id="thermal">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'thermal'"
      aria-controls="module-panel-thermal"
      @click="toggleModule('thermal')"
      @keydown.enter.prevent="toggleModule('thermal')"
      @keydown.space.prevent="toggleModule('thermal')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 02</div>
        <div>
          <h3 class="module-summary-title">Thermal Digital Twin</h3>
          <p class="module-summary-desc">Pick any chip. See radiator area and mass.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">H100 → 156 m²</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'thermal' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'thermal' }">⌄</div>
    </div>
    <div
      id="module-panel-thermal"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'thermal' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 02 · Thermal Digital Twin</div>
          <div class="module-title">Chip die to <em>deep space</em>.</div>
        </div>
        <div class="module-description">
          Pick any chip — H100, Blackwell, TPU, or SpaceX D3. See how much radiator area you need
          and why burst scheduling saves mass. In vacuum, heat only radiates.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Node configuration</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Chip family</span>
          </div>
          <select id="th-chip">
            <option value="h100" data-tdp="700" data-tmax="92">NVIDIA H100 · 700W · 92°C</option>
            <option value="b200" selected data-tdp="1200" data-tmax="95">NVIDIA Blackwell B200 · 1200W · 95°C</option>
            <option value="gb200" data-tdp="2700" data-tmax="95">NVIDIA GB200 Superchip · 2700W</option>
            <option value="rubin" data-tdp="2300" data-tmax="100">NVIDIA Rubin · 2300W · 100°C</option>
            <option value="rubin-ultra" data-tdp="3600" data-tmax="105">NVIDIA Rubin Ultra · 3600W</option>
            <option value="trillium" data-tdp="600" data-tmax="90">Google Trillium TPU · 600W</option>
            <option value="d3" data-tdp="900" data-tmax="130">SpaceX D3 (space-hardened) · 130°C</option>
          </select>
          <div class="control-hint">D3 runs hot by design</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Node power</span>
            <span class="control-label-value" id="th-power-label">100 kW</span>
          </div>
          <input type="range" id="th-power" min="10" max="500" value="100" step="10" />
          <div class="control-hint">Heat to dissipate</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Radiator emissivity</span>
            <span class="control-label-value" id="th-emiss-label">0.92</span>
          </div>
          <input type="range" id="th-emiss" min="0.5" max="0.95" value="0.92" step="0.01" />
          <div class="control-hint">Selective black · 0.85-0.95</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Solar reflection penalty</span>
            <span class="control-label-value" id="th-solar-label">50 W/m²</span>
          </div>
          <input type="range" id="th-solar" min="0" max="200" value="50" step="10" />
          <div class="control-hint">0 in shadow-flying geom</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Burst factor</span>
            <span class="control-label-value" id="th-burst-label">1.0×</span>
          </div>
          <input type="range" id="th-burst" min="1.0" max="2.0" value="1.0" step="0.1" />
          <div class="control-hint">&gt;1.0 = smaller radiator</div>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Radiator area</div>
            <div class="kpi-value orange" id="kpi-radarea">0 m²</div>
            <div class="kpi-sub">deployable wing</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Heat flux</div>
            <div class="kpi-value cyan" id="kpi-heatflux">0 W/m²</div>
            <div class="kpi-sub">effective emission</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Radiator mass</div>
            <div class="kpi-value" id="kpi-radmass">0 kg</div>
            <div class="kpi-sub">≈ 1.2 kg/m²</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Total node mass</div>
            <div class="kpi-value green" id="kpi-nodemass">0 kg</div>
            <div class="kpi-sub">all subsystems</div>
          </div>
        </div>

        <div class="thermal-stack">
          <div class="thermal-flow">
            <div class="thermal-flow-title">Heat path · die to deep space</div>
            <div class="thermal-node hot"><span class="thermal-node-label">Chip die</span><span class="thermal-node-temp" id="t-die">95°C</span></div>
            <div class="thermal-arrow">↓</div>
            <div class="thermal-node hot"><span class="thermal-node-label">Pyrolytic graphite spreader</span><span class="thermal-node-temp" id="t-spreader">90°C</span></div>
            <div class="thermal-arrow">↓</div>
            <div class="thermal-node warm"><span class="thermal-node-label">Two-phase loop heat pipe</span><span class="thermal-node-temp" id="t-pipe">72°C</span></div>
            <div class="thermal-arrow">↓</div>
            <div class="thermal-node warm"><span class="thermal-node-label">Radiator panel</span><span class="thermal-node-temp" id="t-rad">57°C</span></div>
            <div class="thermal-arrow">↓</div>
            <div class="thermal-node cold"><span class="thermal-node-label">Deep space</span><span class="thermal-node-temp">~-270°C</span></div>
          </div>
          <div class="thermal-flow">
            <div class="thermal-flow-title">Subsystem mass budget</div>
            <div class="thermal-node warm"><span class="thermal-node-label">Compute payload</span><span class="thermal-node-temp" id="m-compute">480 kg</span></div>
            <div class="thermal-arrow">+</div>
            <div class="thermal-node warm"><span class="thermal-node-label">Solar array</span><span class="thermal-node-temp" id="m-solar">410 kg</span></div>
            <div class="thermal-arrow">+</div>
            <div class="thermal-node cool"><span class="thermal-node-label">Radiator + thermal</span><span class="thermal-node-temp" id="m-thermal">350 kg</span></div>
            <div class="thermal-arrow">+</div>
            <div class="thermal-node cool"><span class="thermal-node-label">Structure + avionics</span><span class="thermal-node-temp" id="m-structure">290 kg</span></div>
            <div class="thermal-arrow">+</div>
            <div class="thermal-node cold"><span class="thermal-node-label">Integration margin</span><span class="thermal-node-temp" id="m-margin">220 kg</span></div>
          </div>
        </div>

        <div class="verdict">
          <div class="verdict-label">Engineering verdict</div>
          <div class="verdict-text" id="th-verdict">Pick a chip family above.</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- CONSTELLATION -->
<section class="module" id="constellation">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'constellation'"
      aria-controls="module-panel-constellation"
      @click="toggleModule('constellation')"
      @keydown.enter.prevent="toggleModule('constellation')"
      @keydown.space.prevent="toggleModule('constellation')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 03</div>
        <div>
          <h3 class="module-summary-title">Constellation Builder</h3>
          <p class="module-summary-desc">From MW to satellites to launches.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">50 MW → 500 sats</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'constellation' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'constellation' }">
        ⌄
      </div>
    </div>
    <div
      id="module-panel-constellation"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'constellation' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 03 · Constellation Builder</div>
          <div class="module-title">From <em>MW</em> to satellites to launches.</div>
        </div>
        <div class="module-description">
          Input target MW. Get petals, satellites, launches, and capex from Falcon 9 through
          Starship 2035. Petals → satellites → launches: the full orbital bill of materials.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Deployment</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Target capacity</span>
            <span class="control-label-value" id="cons-mw-label">50 MW</span>
          </div>
          <input type="range" id="cons-mw" min="1" max="1000" value="50" step="1" />
          <div class="control-hint">Aggregate compute power</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Power per petal</span>
            <span class="control-label-value" id="cons-petal-label">1 MW</span>
          </div>
          <input type="range" id="cons-petal" min="0.5" max="5" value="1" step="0.5" />
          <div class="control-hint">Penn sweet spot 1-2 MW</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Launch vehicle</span>
          </div>
          <select id="cons-rocket">
            <option value="falcon9" data-payload="22000" data-cost-per-kg="3000">Falcon 9 · 22t · $3,000/kg</option>
            <option value="newglenn" data-payload="45000" data-cost-per-kg="2000">New Glenn · 45t · $2,000/kg</option>
            <option value="starship-2026" selected data-payload="100000" data-cost-per-kg="1500">Starship 2026 · 100t · $1,500/kg</option>
            <option value="starship-2030" data-payload="150000" data-cost-per-kg="500">Starship 2030 · 150t · $500/kg</option>
            <option value="starship-2035" data-payload="200000" data-cost-per-kg="150">Starship 2035 · 200t · $150/kg</option>
          </select>
          <div class="control-hint">Payload to LEO</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Mass per 100kW node</span>
            <span class="control-label-value" id="cons-nodemass-label">1,600 kg</span>
          </div>
          <input type="range" id="cons-nodemass" min="800" max="2500" value="1600" step="100" />
          <div class="control-hint">From thermal module</div>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Petals</div>
            <div class="kpi-value orange" id="kpi-petals">0</div>
            <div class="kpi-sub">1 km tethers</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Satellites</div>
            <div class="kpi-value cyan" id="kpi-sats">0</div>
            <div class="kpi-sub">≈ 10 per petal</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Launches</div>
            <div class="kpi-value" id="kpi-launches">0</div>
            <div class="kpi-sub">to deploy fleet</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Total capex</div>
            <div class="kpi-value green" id="kpi-capex">$0B</div>
            <div class="kpi-sub">sat + launch + integ.</div>
          </div>
        </div>

        <div class="chart-container">
          <div class="chart-title">Capex breakdown · USD billions</div>
          <canvas id="cons-chart"></canvas>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- MOE DESIGNER -->
<section class="module" id="scheduler">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'scheduler'"
      aria-controls="module-panel-scheduler"
      @click="toggleModule('scheduler')"
      @keydown.enter.prevent="toggleModule('scheduler')"
      @keydown.space.prevent="toggleModule('scheduler')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 06</div>
        <div>
          <h3 class="module-summary-title">Burst Scheduler</h3>
          <p class="module-summary-desc">Schedule compute around thermal windows.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Save 38% radiator mass</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'scheduler' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'scheduler' }">⌄</div>
    </div>
    <div
      id="module-panel-scheduler"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'scheduler' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 06 · Burst Scheduler · NEW</div>
          <div class="module-title">Thermal- and <em>orbit-aware</em> timing.</div>
        </div>
        <div class="module-description">
          Schedule compute around thermal windows. Cold-side terminator passes get peak workloads
          and save 30-40% radiator mass. The sun giveth power and taketh thermal headroom.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Schedule strategy</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Strategy</span>
          </div>
          <select id="sched-strategy">
            <option value="naive">Naive · constant load</option>
            <option value="solar">Solar-only · sunlit bursts</option>
            <option value="thermal" selected>Thermal-aware · cold-side bursts</option>
            <option value="full">Full · thermal + eclipse routing</option>
          </select>
          <div class="control-hint">Higher = more sophisticated</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Orbit type</span>
          </div>
          <select id="sched-orbit">
            <option value="dawn-dusk" selected>Dawn-dusk SSO · 95% sunlit</option>
            <option value="sso-noon">Noon-midnight SSO · 65%</option>
            <option value="leo">Equatorial LEO · 60%</option>
          </select>
          <div class="control-hint">Affects eclipse duration</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Workload mix</span>
          </div>
          <select id="sched-mix">
            <option value="training" selected>Training-heavy</option>
            <option value="inference">Inference-heavy</option>
            <option value="mixed">Mixed</option>
          </select>
          <div class="control-hint">Different burst patterns</div>
        </div>

        <button id="sched-replay" style="width: 100%; padding: 14px; background: var(--orange); color: var(--bg); border: none; font-family: var(--mono); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; margin-top: 24px;">▶ Replay orbit</button>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Peak utilization</div>
            <div class="kpi-value orange" id="sched-kpi-peak">94%</div>
            <div class="kpi-sub">vs 100% baseline</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Avg radiator load</div>
            <div class="kpi-value cyan" id="sched-kpi-avg">62%</div>
            <div class="kpi-sub">of peak design</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Mass savings</div>
            <div class="kpi-value green" id="sched-kpi-mass">38%</div>
            <div class="kpi-sub">smaller radiator</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Capex saved · 50 MW</div>
            <div class="kpi-value gold" id="sched-kpi-savings">$152M</div>
            <div class="kpi-sub">at constellation scale</div>
          </div>
        </div>

        <div class="scheduler-orbit-strip">
          <div class="chart-title">Orbital phase · one 95-minute period</div>
          <div class="orbit-timeline" id="orbit-timeline"></div>

          <div style="margin-top: 24px;">
            <div class="chart-title">Compute scheduling track</div>
            <div class="scheduler-track" id="sched-compute-track">
              <div class="scheduler-track-label">Compute</div>
            </div>

            <div class="chart-title" style="margin-top: 16px;">Radiator temperature profile</div>
            <div class="scheduler-thermal-track">
              <canvas id="sched-thermal-chart"></canvas>
            </div>
          </div>
        </div>

        <div class="verdict">
          <div class="verdict-label">Scheduler verdict</div>
          <div class="verdict-text" id="sched-verdict">The thermal-aware scheduler exploits cold-side terminator passes for peak compute.</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- MULTI-VENDOR ROUTER -->

<section id="orchestration" class="platform-category-band">
  <div class="wrap">
    <div class="platform-category-head">
      <h2>Orchestration</h2>
      <p>Decide what goes where, when, and through which vendor.</p>
    </div>
  </div>
</section>
<section class="module" id="moe">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'moe'"
      aria-controls="module-panel-moe"
      @click="toggleModule('moe')"
      @keydown.enter.prevent="toggleModule('moe')"
      @keydown.space.prevent="toggleModule('moe')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 04</div>
        <div>
          <h3 class="module-summary-title">Orbital MoE Designer</h3>
          <p class="module-summary-desc">Place expert layers across satellite types.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">8/64 experts active</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'moe' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'moe' }">⌄</div>
    </div>
    <div id="module-panel-moe" class="module-collapse" :class="{ 'is-open': activeModuleId === 'moe' }">
      <div class="module-header">
        <div>
          <div class="module-meta">/ 04 · Orbital MoE Designer · NEW</div>
          <div class="module-title">Expert-to-satellite <em>topology</em>.</div>
        </div>
        <div class="module-description">
          Place Mixture-of-Experts model layers across satellite types with optimal
          expert-to-satellite topology. Patent-pending. Not every expert belongs on every
          satellite.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Model + topology</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Sparse model</span>
          </div>
          <select id="moe-model">
            <option value="mixtral" data-experts="8" data-active="2">Mixtral 8x22B · 8 experts · top-2</option>
            <option value="qwen3" selected data-experts="64" data-active="8">Qwen3-MoE · 64 experts · top-8</option>
            <option value="deepseek" data-experts="256" data-active="8">DeepSeek-V3 · 256 experts · top-8</option>
            <option value="gpt-oss" data-experts="128" data-active="4">GPT-OSS · 128 experts · top-4</option>
            <option value="frontier" data-experts="512" data-active="16">Frontier sparse · 512 · top-16</option>
          </select>
          <div class="control-hint">Active experts per token</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Workload type</span>
          </div>
          <select id="moe-workload">
            <option value="vision">Vision · EO imagery</option>
            <option value="math" selected>Math + code · reasoning</option>
            <option value="climate">Climate · weather modeling</option>
            <option value="distill">Model distillation</option>
            <option value="multi">Multimodal generation</option>
          </select>
          <div class="control-hint">Determines which experts fire</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Router location</span>
          </div>
          <select id="moe-router">
            <option value="ground" selected>Ground gateway</option>
            <option value="gateway-sat">Gateway satellite</option>
            <option value="distributed">Distributed routing</option>
          </select>
          <div class="control-hint">Trade-off: latency vs. resilience</div>
        </div>

        <div style="margin-top: 24px;">
          <button id="moe-send" style="width: 100%; padding: 14px; background: var(--orange); color: var(--bg); border: none; font-family: var(--mono); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s;">▶ Send token through router</button>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Active experts</div>
            <div class="kpi-value orange" id="moe-kpi-active">8 / 64</div>
            <div class="kpi-sub">per token</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Bandwidth saved</div>
            <div class="kpi-value green" id="moe-kpi-bw">88%</div>
            <div class="kpi-sub">vs dense model</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Sat-to-sat link load</div>
            <div class="kpi-value cyan" id="moe-kpi-link">12 Gbps</div>
            <div class="kpi-sub">peak active</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Fault tolerance</div>
            <div class="kpi-value gold" id="moe-kpi-fault">N+2</div>
            <div class="kpi-sub">redundancy</div>
          </div>
        </div>

        <div class="moe-viz">
          <div class="moe-router">
            <div class="moe-router-box">
              <div class="moe-router-label">Router · ground gateway</div>
              <div class="moe-router-value" id="moe-router-display">"Calculate orbital decay..."</div>
            </div>
          </div>
          <div class="moe-grid" id="moe-experts"></div>
        </div>

        <div class="verdict">
          <div class="verdict-label">Topology insight</div>
          <div class="verdict-text" id="moe-verdict">Click "send token" to see which experts activate for this workload.</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- WORKLOAD SORTER -->
<section class="module" id="sorter">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'sorter'"
      aria-controls="module-panel-sorter"
      @click="toggleModule('sorter')"
      @keydown.enter.prevent="toggleModule('sorter')"
      @keydown.space.prevent="toggleModule('sorter')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 05</div>
        <div>
          <h3 class="module-summary-title">Workload Sorter</h3>
          <p class="module-summary-desc">Sky or ground? Per workload.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">85% orbit / 15% ground</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'sorter' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'sorter' }">⌄</div>
    </div>
    <div
      id="module-panel-sorter"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'sorter' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 05 · Workload Sorter · NEW</div>
          <div class="module-title">Sky or ground, <em>per workload</em>.</div>
        </div>
        <div class="module-description">
          Feed any AI workload compute graph, latency tolerance, and data flow. Get the optimal
          split between orbit and ground — and why that split wins.
        </div>
      </div>

    <div class="output-panel">
      <div class="workload-presets" id="workload-presets">
        <button class="workload-preset selected" data-preset="training"><div class="workload-preset-name">Large-scale training</div><div class="workload-preset-tag">Frontier model</div></button>
        <button class="workload-preset" data-preset="synth"><div class="workload-preset-name">Synthetic data gen</div><div class="workload-preset-tag">Bulk batch</div></button>
        <button class="workload-preset" data-preset="eo"><div class="workload-preset-name">EO image analysis</div><div class="workload-preset-tag">Satellite-source</div></button>
        <button class="workload-preset" data-preset="climate"><div class="workload-preset-name">Climate sim</div><div class="workload-preset-tag">Scientific</div></button>
        <button class="workload-preset" data-preset="chat"><div class="workload-preset-name">Chat assistant</div><div class="workload-preset-tag">Real-time</div></button>
        <button class="workload-preset" data-preset="hft"><div class="workload-preset-name">HFT execution</div><div class="workload-preset-tag">Microsecond</div></button>
        <button class="workload-preset" data-preset="video"><div class="workload-preset-name">Video conference</div><div class="workload-preset-tag">Real-time</div></button>
        <button class="workload-preset" data-preset="db"><div class="workload-preset-name">Database query</div><div class="workload-preset-tag">Transactional</div></button>
      </div>

      <div class="sorter-input-area">
        <div class="sorter-input-row">
          <div class="sorter-input-label">Latency tolerance</div>
          <div class="sorter-bar-track"><div class="sorter-bar-fill" id="bar-latency"></div></div>
          <div class="sorter-bar-value" id="val-latency">High</div>
        </div>
        <div class="sorter-input-row">
          <div class="sorter-input-label">Compute intensity</div>
          <div class="sorter-bar-track"><div class="sorter-bar-fill" id="bar-compute"></div></div>
          <div class="sorter-bar-value" id="val-compute">High</div>
        </div>
        <div class="sorter-input-row">
          <div class="sorter-input-label">Data locality (source)</div>
          <div class="sorter-bar-track"><div class="sorter-bar-fill" id="bar-locality"></div></div>
          <div class="sorter-bar-value" id="val-locality">Ground</div>
        </div>
        <div class="sorter-input-row">
          <div class="sorter-input-label">Batch-ability</div>
          <div class="sorter-bar-track"><div class="sorter-bar-fill" id="bar-batch"></div></div>
          <div class="sorter-bar-value" id="val-batch">High</div>
        </div>
        <div class="sorter-input-row">
          <div class="sorter-input-label">Privacy class</div>
          <div class="sorter-bar-track"><div class="sorter-bar-fill" id="bar-privacy"></div></div>
          <div class="sorter-bar-value" id="val-privacy">Low</div>
        </div>
      </div>

      <div class="sorter-result">
        <div class="sorter-bucket orbit">
          <div class="sorter-bucket-label">Orbit allocation</div>
          <div class="sorter-bucket-value" id="bucket-orbit">85%</div>
          <div class="sorter-bucket-reason" id="reason-orbit">High batch tolerance, compute-heavy, low latency requirement.</div>
        </div>
        <div class="sorter-bucket ground">
          <div class="sorter-bucket-label">Ground allocation</div>
          <div class="sorter-bucket-value" id="bucket-ground">15%</div>
          <div class="sorter-bucket-reason" id="reason-ground">Final aggregation, model checkpointing, user-facing API.</div>
        </div>
      </div>

      <div class="verdict">
        <div class="verdict-label">Recommendation</div>
        <div class="verdict-text" id="sorter-verdict">This workload is well-suited for orbital deployment with thin ground-side orchestration.</div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- BURST SCHEDULER -->
<section class="module" id="routing">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'routing'"
      aria-controls="module-panel-routing"
      @click="toggleModule('routing')"
      @keydown.enter.prevent="toggleModule('routing')"
      @keydown.space.prevent="toggleModule('routing')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 07</div>
        <div>
          <h3 class="module-summary-title">Multi-Vendor Router</h3>
          <p class="module-summary-desc">Route across ADA Space, SpaceX, Starcloud.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">3 providers matched</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'routing' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'routing' }">⌄</div>
    </div>
    <div
      id="module-panel-routing"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'routing' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 07 · Multi-Vendor Router · NEW</div>
          <div class="module-title">Capacity discovery across <em>providers</em>.</div>
        </div>
        <div class="module-description">
          Route workloads across ADA Space, Starcloud, SpaceX, and future providers. Single billing
          surface, multi-vendor capacity. The OS layer that monetizes everyone else's hardware.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Workload request</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">GPU-hours requested</span>
            <span class="control-label-value" id="route-hours-label">500</span>
          </div>
          <input type="range" id="route-hours" min="10" max="10000" value="500" step="10" />
          <div class="control-hint">Inference equivalent</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Max latency tolerance</span>
            <span class="control-label-value" id="route-latency-label">5 min</span>
          </div>
          <input type="range" id="route-latency" min="1" max="60" value="5" step="1" />
          <div class="control-hint">Higher = more providers eligible</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Routing priority</span>
          </div>
          <select id="route-priority">
            <option value="cheap" selected>Cheapest available</option>
            <option value="fast">Fastest available</option>
            <option value="sovereign">Sovereign-only (no CN)</option>
            <option value="cn-only">China sovereign</option>
            <option value="diverse">Diversified (50/50)</option>
          </select>
          <div class="control-hint">Strategy filter</div>
        </div>

        <button id="route-submit" style="width: 100%; padding: 14px; background: var(--orange); color: var(--bg); border: none; font-family: var(--mono); font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; margin-top: 24px;">▶ Route workload</button>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Providers matched</div>
            <div class="kpi-value orange" id="route-kpi-matched">3 / 6</div>
            <div class="kpi-sub">eligible vendors</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Total cost</div>
            <div class="kpi-value green" id="route-kpi-cost">$900</div>
            <div class="kpi-sub">all-in billed</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Avg latency</div>
            <div class="kpi-value cyan" id="route-kpi-latency">3.2 min</div>
            <div class="kpi-sub">to first token</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">HelioMind take</div>
            <div class="kpi-value gold" id="route-kpi-take">$180</div>
            <div class="kpi-sub">20% margin</div>
          </div>
        </div>

        <div class="chart-title">Provider routing</div>
        <div class="routing-providers" id="routing-providers"></div>

        <div class="verdict">
          <div class="verdict-label">Routing decision</div>
          <div class="verdict-text" id="route-verdict">Click "route workload" to see the cross-provider allocation.</div>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- INFRASTRUCTURE ARCHITECT WIZARD -->
<section class="module" id="architect">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'architect'"
      aria-controls="module-panel-architect"
      @click="toggleModule('architect')"
      @keydown.enter.prevent="toggleModule('architect')"
      @keydown.space.prevent="toggleModule('architect')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 08</div>
        <div>
          <h3 class="module-summary-title">Infrastructure Architect</h3>
          <p class="module-summary-desc">5-step wizard for $10B decisions.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">3 design alternatives</div>
        <div class="module-summary-toggle">
          {{ activeModuleId === 'architect' ? 'Collapse' : 'Expand' }}
        </div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'architect' }">⌄</div>
    </div>
    <div
      id="module-panel-architect"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'architect' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 08 · Infrastructure Architect · NEW</div>
          <div class="module-title">The <em>$10B decision</em> wizard.</div>
        </div>
        <div class="module-description">
          Guided 5-step wizard. Input budget, capacity, timeline, and constraints. Get
          investment-grade architecture alternatives. "I have $10B and need 5 GW by 2028" becomes
          solvable.
        </div>
      </div>

    <div class="output-panel">
      <div class="wizard-steps" id="wizard-steps">
        <div class="wizard-step active" data-step="0"><span class="wizard-step-num">01</span>Budget</div>
        <div class="wizard-step" data-step="1"><span class="wizard-step-num">02</span>Capacity</div>
        <div class="wizard-step" data-step="2"><span class="wizard-step-num">03</span>Timeline</div>
        <div class="wizard-step" data-step="3"><span class="wizard-step-num">04</span>Constraints</div>
        <div class="wizard-step" data-step="4"><span class="wizard-step-num">05</span>Results</div>
      </div>

      <div class="wizard-panel" id="wizard-panel">
        <!-- populated by JS -->
      </div>

      <div class="wizard-nav">
        <button class="wizard-btn secondary" id="wizard-back" disabled>← Back</button>
        <div style="font-family: var(--mono); font-size: 11px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase;">
          Step <span id="wizard-step-current">1</span> of 5
        </div>
        <button class="wizard-btn" id="wizard-next">Continue →</button>
      </div>

      <div class="verdict" id="wizard-verdict-box" style="display: none;">
        <div class="verdict-label">Architect's recommendation</div>
        <div class="verdict-text" id="wizard-verdict">—</div>
      </div>
    </div>
    </div>
  </div>
</section>

<!-- RISK & REGULATORY ENGINE -->
<section class="module" id="market">
  <div class="wrap">
    <div
      class="module-summary-card"
      role="button"
      tabindex="0"
      :aria-expanded="activeModuleId === 'market'"
      aria-controls="module-panel-market"
      @click="toggleModule('market')"
      @keydown.enter.prevent="toggleModule('market')"
      @keydown.space.prevent="toggleModule('market')"
    >
      <div class="module-summary-main">
        <div class="module-summary-id">/ 11</div>
        <div>
          <h3 class="module-summary-title">Competitive Landscape</h3>
          <p class="module-summary-desc">Track 15+ orbital compute programs.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">15+ players tracked</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'market' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'market' }">⌄</div>
    </div>
    <div
      id="module-panel-market"
      class="module-collapse"
      :class="{ 'is-open': activeModuleId === 'market' }"
    >
      <div class="module-header">
        <div>
          <div class="module-meta">/ 11 · Competitive Landscape</div>
          <div class="module-title">Every player. Every <em>architecture bet</em>.</div>
        </div>
        <div class="module-description">
          Track 15+ orbital compute programs globally by status, architecture, scale targets, and
          funding. Know who is flying what — and where HelioMind can sell.
        </div>
      </div>

    <div class="output-panel" style="padding: 0;">
      <table class="compet-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Region</th>
            <th>Status</th>
            <th>Architecture</th>
            <th>Scale target</th>
            <th>Backing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="name">ADA Space (国星宇航)</td>
            <td class="geo">CN · Chengdu</td>
            <td><span class="tag active">12 sats live</span></td>
            <td>2,800-sat AI supercomputer, 744 TOPS/sat</td>
            <td>1,000 POPS aggregate</td>
            <td>HK IPO ¥11.5B</td>
          </tr>
          <tr>
            <td class="name">SpaceX (AI Sat Mini)</td>
            <td class="geo">US · Hawthorne</td>
            <td><span class="tag planning">FCC filed</span></td>
            <td>1M sats, D3 chip, Terafab integration</td>
            <td>1 TW/year</td>
            <td>IPO 2026 ~$1.75T</td>
          </tr>
          <tr>
            <td class="name">Google (Suncatcher)</td>
            <td class="geo">US · Mountain View</td>
            <td><span class="tag research">Demo 2027</span></td>
            <td>81-sat cluster, Trillium TPU, formation flight</td>
            <td>Terawatts long-term</td>
            <td>Alphabet internal</td>
          </tr>
          <tr>
            <td class="name">Starcloud</td>
            <td class="geo">US · Mountain View</td>
            <td><span class="tag active">H100 in orbit</span></td>
            <td>Disposable inference sats, NVIDIA Inception</td>
            <td>5 GW (4km panels)</td>
            <td>$1.1B unicorn, YC</td>
          </tr>
          <tr>
            <td class="name">Blue Origin TeraWave</td>
            <td class="geo">US · Kent</td>
            <td><span class="tag planning">Q4 2027 launch</span></td>
            <td>5,408-sat backbone, 6 Tbps optical</td>
            <td>Pipes for everyone</td>
            <td>Bezos personal</td>
          </tr>
          <tr>
            <td class="name">Astro-Future Institute</td>
            <td class="geo">CN · Beijing</td>
            <td><span class="tag research">2026 demo</span></td>
            <td>16-sat laser-linked GW data centers</td>
            <td>Gigawatt-scale</td>
            <td>Lenovo + Beijing gov</td>
          </tr>
          <tr>
            <td class="name">Orbital Chenguang</td>
            <td class="geo">CN · CASC backed</td>
            <td><span class="tag planning">Chenguang-1</span></td>
            <td>GW-scale infrastructure (15FYP)</td>
            <td>GW (Five-Year Plan)</td>
            <td>$8.4B credit</td>
          </tr>
          <tr>
            <td class="name">Orbital Inference</td>
            <td class="geo">US</td>
            <td><span class="tag planning">2027 first launch</span></td>
            <td>Small-sat mesh, disposable inference</td>
            <td>10,000 sats long-term</td>
            <td>a16z Speedrun</td>
          </tr>
          <tr>
            <td class="name">Sophia Space</td>
            <td class="geo">US</td>
            <td><span class="tag planning">Pre-launch</span></td>
            <td>Modular tile design</td>
            <td>Modular scaling</td>
            <td>NVIDIA Inception</td>
          </tr>
          <tr>
            <td class="name">Lonestar Data Holdings</td>
            <td class="geo">US</td>
            <td><span class="tag active">Moon storage 2025</span></td>
            <td>Lunar surface data center</td>
            <td>Petabyte on Moon</td>
            <td>Phison partnership</td>
          </tr>
          <tr>
            <td class="name">Cowboy Space</td>
            <td class="geo">US</td>
            <td><span class="tag research">Own rocket dev</span></td>
            <td>Vertical including launch</td>
            <td>TBD</td>
            <td>$275M (Bhatt)</td>
          </tr>
          <tr>
            <td class="name">Axiom Space</td>
            <td class="geo">US</td>
            <td><span class="tag active">2 nodes launched</span></td>
            <td>Station-attached DC, Spacebilt tiles</td>
            <td>Commercial station</td>
            <td>NASA partnership</td>
          </tr>
          <tr>
            <td class="name">Aetherflux</td>
            <td class="geo">US</td>
            <td><span class="tag research">Concept</span></td>
            <td>Space solar power + AI dual-use</td>
            <td>Power-first model</td>
            <td>$50M (Tripathi)</td>
          </tr>
          <tr style="background: linear-gradient(90deg, var(--orange-soft), transparent);">
            <td class="name" style="color: var(--orange);">HelioMind (us)</td>
            <td class="geo">SG · Delaware</td>
            <td><span class="tag us">Phase A · design</span></td>
            <td><strong>The OS for all of the above</strong></td>
            <td>$80-150M ARR by 2028</td>
            <td>$15M seed target</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="verdict" style="margin-top: 32px;">
      <div class="verdict-label">Strategic position</div>
      <div class="verdict-text">
        HelioMind sells to every player above. They build hardware; we build the platform they design hardware with. The data flywheel turns every customer engagement into <em>compounding advantage no one else can replicate</em>.
      </div>
    </div>
    </div>
  </div>
</section>
  
<section id="landscape" class="platform-knowledge-section">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The landscape</div>
      <h2>Fifteen players. One <em>missing layer</em>.</h2>
      <p>
        Every serious orbital AI compute program is somewhere on this map. They build hardware. We
        build the platform they design hardware with - and the commercial layer that monetizes it to
        non-affiliated customers.
      </p>
    </div>

    <div class="compet-grid">
      <div class="compet-card"><div class="compet-name">ADA Space</div><div class="compet-region">China · Chengdu</div><div class="compet-status live">12 sats operational</div><p class="compet-bet">3,156-sat ITU. Three-Body Constellation. Hong Kong IPO May 2026 at ¥11.5B valuation.</p></div>
      <div class="compet-card"><div class="compet-name">SpaceX</div><div class="compet-region">USA · Hawthorne</div><div class="compet-status planning">FCC filed</div><p class="compet-bet">1M satellites. D3 space-hardened chip. Terafab joint venture for 1 TW/year.</p></div>
      <div class="compet-card"><div class="compet-name">Google Suncatcher</div><div class="compet-region">USA · Mountain View</div><div class="compet-status research">Demo 2027</div><p class="compet-bet">81-sat cluster, Trillium TPU, formation flight. Two prototypes launching 2027.</p></div>
      <div class="compet-card"><div class="compet-name">Starcloud</div><div class="compet-region">USA · Mountain View</div><div class="compet-status live">H100 in orbit</div><p class="compet-bet">5 GW long-term vision. Backed by Y Combinator, $1.1B unicorn.</p></div>
      <div class="compet-card"><div class="compet-name">Blue Origin TeraWave</div><div class="compet-region">USA · Kent</div><div class="compet-status planning">Q4 2027 launch</div><p class="compet-bet">5,408 LEO + 128 MEO. 6 Tbps optical. The downlink backbone everyone needs.</p></div>
      <div class="compet-card"><div class="compet-name">Astro-Future Institute</div><div class="compet-region">China · Beijing</div><div class="compet-status research">2026 demo</div><p class="compet-bet">16-sat GW data centers. Backed by Lenovo and Beijing municipal government.</p></div>
      <div class="compet-card"><div class="compet-name">Orbital Chenguang</div><div class="compet-region">China · CASC backed</div><div class="compet-status planning">Chenguang-1 pending</div><p class="compet-bet">15th Five-Year Plan tie-in. $8.4B in credit lines for GW-scale infrastructure.</p></div>
      <div class="compet-card us"><div class="compet-name">HelioMind</div><div class="compet-region">SG · Delaware</div><div class="compet-status">The OS layer</div><p class="compet-bet">Design platform for all of the above. Cadence/Synopsys for AI infrastructure. The OS no one else is building.</p></div>
    </div>
  </div>
</section>

<section class="platform-status-cta">
  <div class="wrap">
    <div class="platform-status-card">
      <div class="platform-status-actions">
        <button type="button" class="btn-primary platform-status-btn" @click="goTo('/')">
          Back to Zebi Lab
        </button>
        <button
          type="button"
          class="btn-primary btn-thesis platform-status-btn"
          @click="goTo('/join-us')"
        >
          Join the team
        </button>
      </div>
    </div>
  </div>
</section>

  </main>
  <SiteFooter />
</template>
