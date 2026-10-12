<script setup>
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-platform.css'
import { onMounted, onUnmounted, nextTick, ref, computed } from 'vue'
import { initPlatformPage } from '@/scripts/platform-page.js'
import productHeroImage from '@/assets/images/product.jpg'
import validationSweepImage from '@/assets/images/zebi_v02_recode.png'
import zebiSimImage from '@/assets/images/zebi-sium.png'
import { ElImage } from 'element-plus'
import 'element-plus/es/components/image/style/css'
import 'element-plus/es/components/image-viewer/style/css'

const router = useRouter()
const categoryIds = ['economics', 'physics', 'orchestration']
const tocItems = [
  { id: 'thesis', label: 'Thesis', num: '01' },
  { id: 'validation', label: 'Validation', num: '02' },
  { id: 'position', label: 'Position', num: '03' },
  { id: 'findings', label: 'Findings', num: '04' },
  { id: 'architecture', label: 'Architecture', num: '05' },
  { id: 'unit-cell', label: 'Unit Cell', num: '06' },
  { id: 'modules', label: 'Modules', num: '07' },
  { id: 'landscape', label: 'Landscape', num: '08' },
]
const quickJumpIds = tocItems.map((item) => item.id)
const activeModuleId = ref(null)
const activeTocId = ref('thesis')
const isPageScrolled = ref(false)
const isTocOpen = ref(true)
const scrollRevealThreshold = 12
const showTocPanel = computed(() => isPageScrolled.value && isTocOpen.value)
const showTocToggle = computed(() => isPageScrolled.value && !isTocOpen.value)

function toggleToc(open) {
  isTocOpen.value = open
}

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

// [1,3,4,2,2]
function findDuplicate(nums) {

  let slow = nums[0]
  let fast = nums[0]

  while(slow !== fast){
    slow = nums[slow]
    fast = nums[nums[fast]]
  }

  slow = nums[0]

  while(slow !== fast){
    slow = nums[slow]
    fast = nums[fast]
  }
  return slow
    
}

function isHappy(n) {

  let slow = n
  let fast = n

  let getCal = (number) => number.toString().split('').map(Number).reduce((a,c)=> a + c*c, 0)

  do {
    slow = getCal(slow)
    fast = getCal(getCal(fast))
    if(slow === 1 || fast === 1){
      return true
    }
  } while(slow !== fast)

  return false
    
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

function scrollToSection(event, sectionId) {
  event.preventDefault()
  const section = document.getElementById(sectionId)
  if (!section) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const top = window.scrollY + section.getBoundingClientRect().top - headerHeight - 24
  window.scrollTo({ top, behavior: 'smooth' })
}

function updateActiveToc() {
  if (!isPageScrolled.value) return

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0
  const offset = headerHeight + 80

  let activeId = quickJumpIds[0]
  for (const id of quickJumpIds) {
    const section = document.getElementById(id)
    if (!section) continue
    const top = section.getBoundingClientRect().top
    if (top - offset <= 0) activeId = id
  }

  activeTocId.value = activeId
}

function onPageScroll() {
  isPageScrolled.value = window.scrollY > scrollRevealThreshold
  updateActiveCategoryTab()
  updateActiveToc()
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
  onPageScroll()
  window.addEventListener('scroll', onPageScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onPageScroll)
})
</script>

<template>
  <SiteHeader />
  <main class="product-page">
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
        Follow the page flow — Thesis, Validation, Position, Findings, Architecture, Unit Cell,
        Modules, Landscape — to understand how HelioMind OS is built, what it can do, and why it
        matters.
      </p>
    </div>
  </div>
</section>

<aside
  class="product-page-toc"
  :class="{ 'is-visible': showTocPanel }"
  :aria-hidden="!showTocPanel"
  aria-label="Table of contents"
>
  <div class="product-page-toc__head">
    <div class="product-page-toc__label">Table of contents</div>
    <button
      type="button"
      class="product-page-toc__close"
      aria-label="Hide table of contents"
      @click="toggleToc(false)"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M8 3L4 7L8 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
  <nav class="product-page-toc__nav">
    <a
      v-for="item in tocItems"
      :key="item.id"
      :href="`#${item.id}`"
      class="product-page-toc__link"
      :class="{ 'is-active': activeTocId === item.id }"
      @click="scrollToSection($event, item.id)"
    >
      <span class="product-page-toc__num">{{ item.num }}</span>
      <span class="product-page-toc__text">{{ item.label }}</span>
    </a>
  </nav>
</aside>

<button
  type="button"
  class="product-page-toc-toggle"
  :class="{ 'is-visible': showTocToggle }"
  :aria-hidden="!showTocToggle"
  aria-label="Show page navigation"
  @click="toggleToc(true)"
>
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 5H15M3 9H15M3 13H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>

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

<section id="validation" class="platform-knowledge-section product-validation-section">
  <div class="wrap">
    <div class="platform-knowledge-head product-validation-head">
      <div class="platform-knowledge-eyebrow">Validation</div>
      <h2>The most valuable company on Earth just <em>proved our thesis</em>.</h2>
    </div>

    <div class="product-validation-grid">
      <div>
        <div class="product-validation-quote">
          The key constraint on AI's continued growth is physical — chip manufacturing, data-center infrastructure, and power generation. <em>The future of AI will be determined by control of the physical stack.</em>
        </div>
        <div class="product-validation-attribution">
          SpaceX · IPO prospectus, filed with the SEC · May 2026
        </div>
      </div>

      <div class="product-validation-readout">
        <div class="product-validation-readout-title">What the S-1 confirms for HelioMind</div>
        <div class="product-validation-stat-row">
          <div class="product-validation-stat-label">SpaceX IPO valuation — the scale of the bet on physical AI infrastructure</div>
          <div class="product-validation-stat-value"><em>$1.75T</em></div>
        </div>
        <div class="product-validation-stat-row">
          <div class="product-validation-stat-label">Orbit SpaceX chose for AI compute satellites — identical to our architecture</div>
          <div class="product-validation-stat-value">SSO</div>
        </div>
        <div class="product-validation-stat-row">
          <div class="product-validation-stat-label">First orbital AI compute deployment — the decision window opens now</div>
          <div class="product-validation-stat-value"><em>2028</em></div>
        </div>
        <div class="product-validation-stat-row">
          <div class="product-validation-stat-label">US electricity generation CAGR over 15 years, against exploding compute demand</div>
          <div class="product-validation-stat-value"><em>0.1%</em></div>
        </div>
        <div class="product-validation-takeaway">
          SpaceX builds a <strong>closed, vertically integrated stack</strong> for its own workloads. It will never be the neutral platform that helps everyone else design theirs.
        </div>
      </div>
    </div>

    <div class="product-contradiction">
      <div class="product-contradiction-header">The same company. Two different statements. Eighteen weeks apart.</div>
      <div class="product-contradiction-cols">
        <div class="product-contradiction-col">
          <div class="product-contradiction-label stage">On stage · Davos · January 2026</div>
          <div class="product-contradiction-text">
            Orbital AI is a <em>"no-brainer"</em> — achievable in two to three years. Cooling is solved by pointing a radiator away from the sun. More AI compute will be in orbit than on Earth within five years.
          </div>
          <div class="product-contradiction-source">— public remarks, World Economic Forum</div>
        </div>
        <div class="product-contradiction-col">
          <div class="product-contradiction-label filing">Under oath · SEC S-1 · May 2026</div>
          <div class="product-contradiction-text">
            Orbital data centers involve <em>"significant technical complexity and unproven technologies, and may not achieve commercial viability."</em>
          </div>
          <div class="product-contradiction-source">— IPO prospectus, filed with the SEC under legal liability</div>
        </div>
      </div>
      <div class="product-contradiction-resolve">
        <strong>This gap is the business.</strong> The whole industry is about to commit hundreds of billions on the strength of keynote promises — while the legal filings quietly admit the physics and economics are unproven. Someone has to be the rigorous, vendor-neutral layer that models the real numbers and tells builders the truth. That is HelioMind.
      </div>
    </div>
  </div>
</section>

<section id="position" class="platform-knowledge-section alt product-position-section">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">The position</div>
      <h2 class="product-position-statement">
        In the new space race led by SpaceX, HelioMind is not another competitor on the battlefield. We provide the intelligence platform that helps every participant navigate it.
      </h2>
    </div>

    <div class="product-position-cols">
      <div class="product-position-col">
        <div class="product-position-col-tag">The hyperscalers</div>
        <div class="product-position-col-title">Azure, AWS, GCP</div>
        <p class="product-position-col-body">
          SpaceX intends to undercut terrestrial data centers with free orbital solar power. Every cloud provider now needs to model a <strong>hybrid-orbit defense</strong> —— with the help of The Infrastructure Architect.
        </p>
      </div>
      <div class="product-position-col">
        <div class="product-position-col-tag">The sovereigns</div>
        <div class="product-position-col-title">Gulf &amp; European programs</div>
        <p class="product-position-col-body">
          As dependence on U.S.-controlled compute becomes a strategic vulnerability, sovereign wealth funds are seeking alternatives. Before committing tens of billions, they must be able to model, simulate, and design sovereign orbital compute networks on their own terms.
        </p>
      </div>
      <div class="product-position-col">
        <div class="product-position-col-tag">The orbital builders</div>
        <div class="product-position-col-title">ADA Space, Starcloud, Astro-Future</div>
        <p class="product-position-col-body">
          Real operators with hardware already in orbit, now facing a $1.75T competitor. To keep pace they must optimize thermal design and MoE routing at the frontier — exactly what the <strong>Thermal Twin and MoE Designer</strong> exist to do.
        </p>
      </div>
    </div>
  </div>
</section>

<section id="findings" class="platform-knowledge-section product-findings-section">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">Validated findings</div>
      <h2>We tested our own thesis. <em>Here is what the physics said.</em></h2>
    </div>

    <div class="product-findings-body">
      <div class="product-findings-block">
        <p>
          We tested the obvious thesis — that intelligent expert placement resolves the bandwidth-vs-thermal conflict in orbital MoE serving. Our absolute-physics validation (9,000 scenarios plus an analytical boundary decomposition) showed it does not: once radiators are sized to balanced load, thermally-balanced placement is already near-optimal, and sophisticated optimization adds a median of <strong>0.0%</strong>. We publish this as design guidance — measure your router imbalance; choose your radiator-sizing policy deliberately; co-design capacity slack with thermal headroom; deploy a simple, auditable balanced-placement policy as the flight rule; and don't buy placement software you don't need. Zebi sells validated answers, including "you don't need an optimizer here." Published study:
          <a class="product-findings-citation" href="https://doi.org/10.5281/zenodo.20635834" target="_blank" rel="noopener">Zhang (2026), doi:10.5281/zenodo.20635834</a>.
        </p>
      </div>

      <div class="product-findings-block">
        <h3 class="product-findings-subtitle">Zebi-Q — the active frontier: thermal-adaptive precision</h3>
        <p>
          Placement redistributes a fixed heat total — our validation closed that lever. Quantization shrinks the total — a different physics handle, and the one that moves the needle. Evidence status, labeled exactly:
        </p>
        <ul class="product-findings-list">
          <li class="product-findings-evidence product-findings-evidence--established"><strong>ESTABLISHED:</strong> in the thermally binding regime, thermal structure dominates placement; balanced placement is near-optimal (our 2026 validation study).</li>
          <li class="product-findings-evidence product-findings-evidence--modeled"><strong>MODELED</strong> (Phase 1, pre-registered analytical gate, passed): with conservative system-level INT8 energy factors (~1.5×, derived from published per-operation data — Horowitz, ISSCC 2014 — not measured), 40% of placement-unfixable thermal configurations become feasible; median precision duty cycle ≈ 0.55.</li>
          <li class="product-findings-evidence product-findings-evidence--measured"><strong>MEASURED</strong> (Phases 2a–2b, complete): INT8 quantization costs <strong>+0.01%</strong> perplexity at full corpus on both a 30B-class MoE (Qwen3-30B-A3B — the DynaExq benchmark family) and OLMoE-1B-7B — accuracy-free across a 30× scale range. Measured decode energy on Grace-Blackwell silicon: 16-bit→INT8 <strong>1.58×</strong>, inside the modeled band — the feasibility gate stands on measured ground, flipping 48.9% of placement-unfixable configurations. Measured 16-bit→INT4-as-deployed: only 1.77× at +2.6–3.0% perplexity — far below modeled INT4 optimism in memory-bound decode. Honest consequences: the INT8 plateau is where the value is, and the hardest ~9% of thermal configurations are radiator-sizing problems no precision software closes.</li>
          <li class="product-findings-evidence product-findings-evidence--next"><strong>DEMONSTRATED</strong> (Phase 3, closed-loop controller, complete): a controller that reads a modeled time-varying orbital radiator envelope and a measured serving-power signal, and selects expert precision in real time, holds dissipation under capacity with <strong>zero sustained violations</strong> across two full 90-minute orbits — exactly where a static full-precision policy violates the envelope in the sunlit binding phase. With INT8 the rescue is accuracy-free; with INT4 the controller meters a real and honestly-reported quality cost, but only when the binding envelope leaves no choice. We also report a target the controller did not meet, rather than tuning it away: it held full precision for roughly 10% of each orbit against a planned 35%, because its measured-power safety backstop proved more conservative than the open-loop design arithmetic — by a factor of about 3.5, and in the safe direction. That a measured controller is more cautious than the design math predicted is itself the most transferable finding of the study.</li>
          <li class="product-findings-evidence product-findings-evidence--next"><strong>NEXT:</strong> per-expert rather than process-level precision switching, an online workload-skew estimator in place of a fixed configuration label, and validation beyond a single desktop device class.</li>
        </ul>
        <p>
          Positioned honestly against prior art: SpaceMoE (HKU/Xidian, 2026) names thermal-budget-adaptive expert quantization an open problem; DynaExq (2025) demonstrates dynamic expert-level precision allocation under <em>memory</em> budgets. Our delta is the <em>time-varying orbital thermal</em> budget and the duty-cycle feasibility mathematics. Published studies: the <a class="product-findings-citation" href="https://doi.org/10.5281/zenodo.20635950" target="_blank" rel="noopener">thermal-adaptive precision study (Zhang, 2026)</a> and the <a class="product-findings-citation" href="https://doi.org/10.5281/zenodo.20713300" target="_blank" rel="noopener">closed-loop controller demonstration (Zhang, 2026)</a>.
        </p>
        <p>
          One further result reshapes how the lever should be applied. When we replaced the synthetic routing priors of the analytical work with routing traces measured from a real Mixture-of-Experts model, thermal feasibility turned out to be strongly workload-dependent. Per-layer routing skew is roughly 2.8 for natural-language serving but rises to roughly 7.4 for code, which makes a code-heavy serving mix about twice as hard thermally and in need of proportionally more radiator margin. English prose is the benign outlier; code, mathematics, and low-resource multilingual workloads all cluster at the hard end. Workload mix is therefore a first-order radiator-sizing variable, not a second-order detail — and a sparser, frontier-scale MoE sits closer to the radiator-bound end across every workload than our headline figures alone would suggest. Published study: <a class="product-findings-citation" href="https://doi.org/10.5281/zenodo.20651168" target="_blank" rel="noopener">Zhang (2026), doi:10.5281/zenodo.20651168</a>.
        </p>
      </div>

      <div class="product-findings-block">
        <h3 class="product-findings-subtitle">How we work</h3>
        <p>
          Our research process is built around falsification, not confirmation. Every claim is subjected to a pre-registered truth gate with the explicit goal of proving it wrong. Negative findings are reported, not buried. Simulations are labeled as simulations, measurements as measurements, and no performance threshold is revised after the data is observed. <br><br> Four studies have been released as open-access preprints:
        </p>
        <ul class="product-findings-preprint-list">
          <li class="product-findings-preprint-item">
            <a class="product-findings-citation product-findings-citation--block" href="https://doi.org/10.5281/zenodo.20635834" target="_blank" rel="noopener">
              <span class="product-findings-paper-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 1.75H9.5L12.75 5V14.25H4V1.75Z" stroke="currentColor" stroke-width="1.2" />
                  <path d="M9.5 1.75V5H12.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6 7.25H10.75M6 9.25H10.75M6 11.25H9.25" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
                </svg>
              </span>
              Placement Negative Result
            </a>
          </li>
          <li class="product-findings-preprint-item">
            <a class="product-findings-citation product-findings-citation--block" href="https://doi.org/10.5281/zenodo.20635950" target="_blank" rel="noopener">
              <span class="product-findings-paper-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 1.75H9.5L12.75 5V14.25H4V1.75Z" stroke="currentColor" stroke-width="1.2" />
                  <path d="M9.5 1.75V5H12.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6 7.25H10.75M6 9.25H10.75M6 11.25H9.25" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
                </svg>
              </span>
              Thermal-Adaptive Precision Study
            </a>
          </li>
          <li class="product-findings-preprint-item">
            <a class="product-findings-citation product-findings-citation--block" href="https://doi.org/10.5281/zenodo.20651168" target="_blank" rel="noopener">
              <span class="product-findings-paper-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 1.75H9.5L12.75 5V14.25H4V1.75Z" stroke="currentColor" stroke-width="1.2" />
                  <path d="M9.5 1.75V5H12.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6 7.25H10.75M6 9.25H10.75M6 11.25H9.25" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
                </svg>
              </span>
              Measured-Routing and Domain-Dependence Study
            </a>
          </li>
          <li class="product-findings-preprint-item">
            <a class="product-findings-citation product-findings-citation--block" href="https://doi.org/10.5281/zenodo.20713300" target="_blank" rel="noopener">
              <span class="product-findings-paper-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M4 1.75H9.5L12.75 5V14.25H4V1.75Z" stroke="currentColor" stroke-width="1.2" />
                  <path d="M9.5 1.75V5H12.75" stroke="currentColor" stroke-width="1.2" />
                  <path d="M6 7.25H10.75M6 9.25H10.75M6 11.25H9.25" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" />
                </svg>
              </span>
              Closed-Loop Controller Demonstration
            </a>
          </li>
        </ul>
      </div>

      <!-- Zebi-Sim: the studies, made runnable -->
      <div class="product-findings-block product-findings-block--sim">
        <h3 class="product-findings-subtitle">
          Zebi-Sim <span class="product-findings-sim-subtitle">—— From research papers to orbital decisions.</span>
        </h3>
        <p>
          The four studies above established the thermal, power, and inference foundations for
          running AI in space. Zebi-Sim brings those findings together into a single simulator: enter
          a satellite configuration and AI workload, and it determines whether the model can operate
          within its available power and thermal budget. When full-precision inference is not viable,
          it recommends quantized deployment paths such as INT8 and INT4 that remain operational in
          orbit.
        </p>
        <p>
          Every assumption is visible. Every result is traceable. Every number is linked to
          <em>measured data, derived values, modeled estimates, or stated assumptions</em>.
        </p>
        <div class="product-findings-sim-figure">
          <ElImage
            class="product-findings-sim-image"
            :src="zebiSimImage"
            :preview-src-list="[zebiSimImage]"
            :initial-index="0"
            preview-teleported
            alt="Zebi-Sim — orbital MoE feasibility engine"
          />
          <div class="product-findings-sim-caption">
            Fig — Zebi-Sim, the orbital MoE feasibility engine. Click to enlarge.
          </div>
        </div>
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
          <p class="module-summary-desc">TCO optimization across deployment profiles.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Stochastic deployment profile simulation</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'tco' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'tco' }">⌄</div>
    </div>
    <div id="module-panel-tco" class="module-collapse" :class="{ 'is-open': activeModuleId === 'tco' }">
      <div class="module-header">
        <div>
          <div class="module-meta">/ 01 · Economic Engine</div>
          <div class="module-title">TCO optimization across <em>deployment profiles</em>.</div>
        </div>
        <div class="module-description">
          Evaluate sensitivity equations for highly heterogenous capital build-outs. Modulate
          execution metrics including cargo launch vectors, orbital component hardware depreciation
          intervals, and primary power metrics to resolve asset convergence curves.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Simulation Framework</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Target compute scaling</span>
            <span class="control-label-value" id="tco-mw-label">100 MW</span>
          </div>
          <input type="range" id="tco-mw" min="10" max="1000" value="100" step="10" />
          <div class="control-hint">Inference-equivalent MW</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Launch variable cost</span>
            <span class="control-label-value" id="tco-launch-label">$1,500/kg</span>
          </div>
          <input type="range" id="tco-launch" min="100" max="3500" value="1500" step="100" />
          <div class="control-hint">Starship target $200/kg</div>
        </div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Space hardware BOM</span>
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
            <span class="control-label-text">Terrestrial power rate</span>
            <span class="control-label-value" id="tco-energy-label">$0.06/kWh</span>
          </div>
          <input type="range" id="tco-energy" min="0.03" max="0.20" value="0.06" step="0.01" />
          <div class="control-hint">Industrial rate · regional</div>
        </div>
      </div>

      <div class="output-panel">
        <div class="kpi-grid">
          <div class="kpi">
            <div class="kpi-label">Terrestrial Base TCO</div>
            <div class="kpi-value cyan" id="kpi-ground">$0.0B</div>
            <div class="kpi-sub">capex + opex</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Orbital disposable</div>
            <div class="kpi-value red" id="kpi-orbital-disp">$0.0B</div>
            <div class="kpi-sub">relaunch every cycle</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Zebi Serviceable Array</div>
            <div class="kpi-value orange" id="kpi-zebi">$0.0B</div>
            <div class="kpi-sub">cassette swaps</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Efficiency Delta</div>
            <div class="kpi-value green" id="kpi-multiple">0.0×</div>
            <div class="kpi-sub">orbital vs ground</div>
          </div>
        </div>

        <div class="chart-container tall">
          <div class="chart-title">Cumulative TCO Simulation · USD billions</div>
          <canvas id="tco-chart"></canvas>
        </div>

        <div class="verdict">
          <div class="verdict-label">Stochastic Evaluation</div>
          <div class="verdict-text" id="tco-verdict">Calibrating economic curves based on physical constraints...</div>
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
          <p class="module-summary-desc">Thermal modeling from silicon junction to vacuum.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Stefan-Boltzmann boundary mapping</div>
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
          <div class="module-title">Thermal modeling from <em>silicon junction to vacuum</em>.</div>
        </div>
        <div class="module-description">
          Analytic engine mapping thermal limits using the Stefan-Boltzmann radiation law.
          Determines configuration geometry and radiative dissipation footprints across active
          liquid loop systems under microgravity parameters.
        </div>
      </div>

    <div class="panel-grid">
      <div class="control-panel">
        <div class="control-panel-header">Hardware Specification</div>

        <div class="control">
          <div class="control-label">
            <span class="control-label-text">Silicon substrate</span>
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
            <span class="control-label-text">Aggregate node load</span>
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
            <div class="kpi-label">Required Radiator Area</div>
            <div class="kpi-value orange" id="kpi-radarea">0 m²</div>
            <div class="kpi-sub">deployable wing</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Effective Heat Flux</div>
            <div class="kpi-value cyan" id="kpi-heatflux">0 W/m²</div>
            <div class="kpi-sub">effective emission</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Radiator Structural Mass</div>
            <div class="kpi-value" id="kpi-radmass">0 kg</div>
            <div class="kpi-sub">thermal subsystem only</div>
          </div>
          <div class="kpi">
            <div class="kpi-label">Subsystem Structural Mass</div>
            <div class="kpi-value green" id="kpi-nodemass">0 kg</div>
            <div class="kpi-sub">full node estimate</div>
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
          <div class="verdict-label">Thermodynamic Analysis</div>
          <div class="verdict-text" id="th-verdict">Awaiting control parameter matrix input...</div>
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
          <p class="module-summary-desc">Expert-to-satellite topology under hard radiator physics.</p>
        </div>
      </div>
      <div class="module-summary-side">
        <div class="module-summary-preview">Validated · see findings</div>
        <div class="module-summary-toggle">{{ activeModuleId === 'moe' ? 'Collapse' : 'Expand' }}</div>
      </div>
      <div class="module-summary-arrow" :class="{ 'is-open': activeModuleId === 'moe' }">⌄</div>
    </div>
    <div id="module-panel-moe" class="module-collapse" :class="{ 'is-open': activeModuleId === 'moe' }">
      <div class="module-header">
        <div>
          <div class="module-meta">/ 04 · Orbital MoE Designer · Validated</div>
          <div class="module-title">Expert-to-satellite <em>topology</em>.</div>
        </div>
        <div class="module-description">
          For any sparse model — Mixtral, Qwen3-MoE, DeepSeek-V3, GPT-OSS — maps expert-to-satellite topology under hard radiator physics. Our own 9,000-scenario validation showed thermally-balanced placement is already near-optimal — so this module ships that answer as design guidance, including when you don't need placement software at all.
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
            <td class="name">SpaceX</td>
            <td class="geo">US · Starbase TX</td>
            <td><span class="tag planning">IPO S-1 filed</span></td>
            <td>Orbital AI compute in SSO from 2028. Terafab chip program with Tesla + Intel.</td>
            <td>IPO at ~$1.75T</td>
            <td>Closed vertical stack — a non-customer, not a competitor</td>
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
      <div class="compet-card"><div class="compet-name">SpaceX</div><div class="compet-region">USA · Starbase TX</div><div class="compet-status planning">IPO S-1 filed</div><p class="compet-bet">Orbital AI compute in SSO from 2028. Terafab chip program with Tesla + Intel. IPO at ~$1.75T. Closed vertical stack — a non-customer, not a competitor.</p></div>
      <div class="compet-card"><div class="compet-name">Google Suncatcher</div><div class="compet-region">USA · Mountain View</div><div class="compet-status research">Demo 2027</div><p class="compet-bet">81-sat cluster, Trillium TPU, formation flight. Two prototypes launching 2027.</p></div>
      <div class="compet-card"><div class="compet-name">Starcloud</div><div class="compet-region">USA · Mountain View</div><div class="compet-status live">H100 in orbit</div><p class="compet-bet">5 GW long-term vision. Backed by Y Combinator, $1.1B unicorn.</p></div>
      <div class="compet-card"><div class="compet-name">Blue Origin TeraWave</div><div class="compet-region">USA · Kent</div><div class="compet-status planning">Q4 2027 launch</div><p class="compet-bet">5,408 LEO + 128 MEO. 6 Tbps optical. The downlink backbone everyone needs.</p></div>
      <div class="compet-card"><div class="compet-name">Astro-Future Institute</div><div class="compet-region">China · Beijing</div><div class="compet-status research">2026 demo</div><p class="compet-bet">16-sat GW data centers. Backed by Lenovo and Beijing municipal government.</p></div>
      <div class="compet-card"><div class="compet-name">Orbital Chenguang</div><div class="compet-region">China · CASC backed</div><div class="compet-status planning">Chenguang-1 pending</div><p class="compet-bet">15th Five-Year Plan tie-in. $8.4B in credit lines for GW-scale infrastructure.</p></div>
      <div class="compet-card us"><div class="compet-name">HelioMind</div><div class="compet-region">SG · Delaware</div><div class="compet-status">The OS layer</div><p class="compet-bet">Design platform for all of the above. Cadence/Synopsys for AI infrastructure. The OS no one else is building.</p></div>
    </div>
  </div>
</section>

<section class="product-landscape-showcase">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <div class="platform-knowledge-eyebrow">Design library</div>
      <h2>What you can design <em>with HelioMind OS</em></h2>
    </div>
    <div class="product-showcase-grid">
      <button type="button" class="product-showcase-card" @click="goTo('/product#constellation')">
        <div class="product-showcase-title">LEO Inference Swarm</div>
        <p>
          500-700 km low Earth orbit. Process Earth observation imagery at the source with
          disposable inference satellites and annual refresh.
        </p>
      </button>
      <button type="button" class="product-showcase-card" @click="goTo('/product#scheduler')">
        <div class="product-showcase-title">SSO Solar Training Cluster</div>
        <p>
          Dawn-dusk sun-synchronous orbit with 95% solar duty cycle, designed for training-heavy
          workloads that tolerate orbital latency.
        </p>
      </button>
      <button type="button" class="product-showcase-card" @click="goTo('/product#sorter')">
        <div class="product-showcase-title">Hybrid Earth-Orbit</div>
        <p>
          Ground campus for latency-critical inference and APIs, SSO cluster for training and
          synthetic data. Best of both physics regimes.
        </p>
      </button>
      <button type="button" class="product-showcase-card" @click="goTo('/product#library')">
        <div class="product-showcase-title">Serviceable Zebi-Lattice</div>
        <p>
          Tethered satellite lattice with swappable PC-cube compute cassettes and robotic service
          cycles for rapid chip refresh.
        </p>
      </button>
    </div>
  </div>
</section>

<section id="engineering-log" class="wrap engineering-log">
  <div class="section-header engineering-log__header">
    <div class="hero-eyebrow engineering-log__eyebrow">
      Zebi Lab // Empirical Validation
    </div>
    <h2 class="section-title engineering-log__title">
      From 45,000 orbital stress tests to <em><span class="engineering-version-highlight">HelioMind v0.3</span>.</em>
    </h2>
    <p class="engineering-log__lead">
      Reliable space software cannot rely on ideal theoretical models. We stress-tested our routing algorithms across 45,000 extreme orbital scenarios—and used that failure data to engineer thermal-aware routing in <span class="engineering-version-highlight">HelioMind v0.3</span>.
    </p>
  </div>

  <div class="engineering-log__panel">
    <div class="engineering-log__grid">
      <div class="engineering-log__figure">
        <ElImage
          class="engineering-log__image"
          :src="validationSweepImage"
          :preview-src-list="[validationSweepImage]"
          :initial-index="0"
          preview-teleported
          alt="Zebi Lab v0.2 Validation Sweep Output"
        />
        <div class="engineering-log__caption">
          Fig 2.1 — Telemetry crash plots of standard clustering algorithms under peak thermal stress. Click to enlarge.
        </div>
      </div>

      <div class="engineering-log__copy">
        <div class="engineering-log__label">
          // Diagnostic Memorandum //
        </div>

        <p class="engineering-log__paragraph engineering-log__paragraph--bright">
          The chart on the left captures a critical industry failure. When simulated orbital nodes hit peak workloads, standard bandwidth-heavy algorithms completely collapse under severe power and thermal limits.
        </p>

        <p class="engineering-log__paragraph">
          Our HelioMind v0.2 diagnostic sweep revealed why: the optimization engine was calculating data constraints using theoretical software shares, completely ignoring the continuous, absolute wattage drops caused by overheating hardware. This gap resulted in a 0% task rescue rate under peak operational stress.
        </p>

        <div class="engineering-log__conclusion">
          <p>
            Instead of treating this as an unavoidable hardware constraint, we used this failure data to re-engineer our stack. In the upcoming <span class="engineering-version-highlight">HelioMind v0.3</span>, dynamic thermal parameters are integrated directly into the core routing layers—transforming a dangerous physical bottleneck into a resilient software advantage.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="product-landscape-ecosystem">
  <div class="wrap">
    <div class="platform-knowledge-head">
      <h2>Who uses <em>HelioMind OS?</em></h2>
    </div>
    <div class="product-ecosystem-grid">
      <article class="product-ecosystem-card">
        <h4>Satellite operators</h4>
        <p>Designing orbital compute constellations from first principles.</p>
      </article>
      <article class="product-ecosystem-card">
        <h4>Space-hardened chip designers</h4>
        <p>Validating thermal and radiation tolerance pre-silicon.</p>
      </article>
      <article class="product-ecosystem-card">
        <h4>Sovereign space programs</h4>
        <p>Building independent, air-gapped AI capacity.</p>
      </article>
      <article class="product-ecosystem-card">
        <h4>Orbital compute startups</h4>
        <p>Accelerating from concept to constellation design.</p>
      </article>
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

<style scoped>
.product-page :is(
  .platform-knowledge-head p,
  .problem-body,
  .product-position-col-body,
  .product-findings-body,
  .product-findings-body p,
  .product-findings-evidence,
  .product-validation-stat-label,
  .product-validation-takeaway,
  .product-contradiction-resolve,
  .arch-layer-purpose,
  .arch-layer-workloads li,
  .petal-module-desc,
  .module-description,
  .module-description p,
  .compet-bet,
  .product-showcase-card p,
  .product-ecosystem-card p,
  .engineering-log__lead,
  .engineering-log__paragraph,
  .engineering-log__conclusion p
) {
  font-family: var(--product-body-font);
  font-size: var(--product-body-size);
  color: var(--product-body-color);
  line-height: var(--product-body-line-height);
}

.product-page :is(
  .problem-body strong,
  .product-position-col-body strong,
  .product-findings-body strong,
  .product-findings-evidence strong:not(:first-child),
  .engineering-log__paragraph strong
) {
  color: var(--text);
  font-weight: 500;
}

.product-validation-section {
  position: relative;
  overflow: hidden;
}

.product-validation-section::before {
  content: '';
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 107, 61, 0.06), transparent 65%);
  pointer-events: none;
}

.product-validation-head {
  margin-bottom: 40px;
}

.product-validation-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

.product-validation-quote {
  font-family: var(--display);
  font-size: clamp(22px, 2.6vw, 30px);
  font-weight: 400;
  line-height: 1.28;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  color: var(--text);
}

.product-validation-quote em {
  font-style: italic;
  color: var(--orange);
}

.product-validation-attribution {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-left: 16px;
  border-left: 2px solid var(--orange);
}

.product-validation-readout {
  background: var(--bg-2);
  border: 1px solid var(--border);
  padding: 28px;
}

.product-validation-readout-title {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--orange);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.product-validation-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}

.product-validation-stat-row:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.product-validation-stat-label {
  max-width: 62%;
}

.product-validation-stat-value {
  font-family: var(--display);
  font-size: 20px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.product-validation-stat-value em {
  font-style: italic;
  color: var(--orange);
  font-weight: 300;
}

.product-validation-takeaway {
  margin-top: 22px;
  padding: 16px 18px;
  background: var(--orange-soft);
  border-left: 2px solid var(--orange);
}

.product-validation-takeaway strong {
  color: var(--orange);
  font-weight: 600;
}

.product-contradiction {
  margin-top: 48px;
  border: 1px solid var(--border);
  background: var(--bg-2);
}

.product-contradiction-header {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--orange);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 28px;
  border-bottom: 1px solid var(--border);
}

.product-contradiction-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.product-contradiction-col {
  padding: 28px;
}

.product-contradiction-col:first-child {
  border-right: 1px solid var(--border);
}

.product-contradiction-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-contradiction-label.stage {
  color: var(--text-3);
}

.product-contradiction-label.filing {
  color: var(--cyan);
}

.product-contradiction-label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.product-contradiction-text {
  font-family: var(--display);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: var(--text);
}

.product-contradiction-text em {
  font-style: italic;
  color: var(--orange);
}

.product-contradiction-source {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--text-3);
  letter-spacing: 0.08em;
  margin-top: 14px;
}

.product-contradiction-resolve {
  padding: 20px 28px;
  border-top: 1px solid var(--border);
  background: var(--orange-soft);
}

.product-contradiction-resolve strong {
  color: var(--orange);
  font-weight: 600;
}

.product-position-statement {
  max-width: 900px;
}

.product-position-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}

.product-position-col {
  background: var(--bg);
  padding: 32px 28px;
}

.product-position-col-tag {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 16px;
}

.product-position-col-title {
  font-family: var(--display);
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin-bottom: 12px;
  line-height: 1.25;
  color: var(--text);
}

.product-findings-section .platform-knowledge-head {
  margin-bottom: 40px;
}

.product-findings-body {
  width: 100%;
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.product-findings-block + .product-findings-block {
  margin-top: 48px;
  padding-top: 48px;
  border-top: 1px solid var(--border);
}

.product-findings-block p {
  margin: 0 0 20px;
}

.product-findings-block p:last-child {
  margin-bottom: 0;
}

.product-findings-subtitle {
  font-family: var(--display);
  font-size: clamp(22px, 2.4vw, 28px);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 20px;
}

.product-findings-list {
  margin: 8px 0 28px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.product-findings-evidence strong:first-child {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  margin-right: 8px;
  margin-bottom: 6px;
  border-radius: 3px;
  vertical-align: baseline;
}

.product-findings-evidence--established strong:first-child {
  color: #9ec5f0;
  background: rgba(107, 159, 212, 0.14);
}

.product-findings-evidence--modeled strong:first-child {
  color: #b4c0e8;
  background: rgba(139, 159, 212, 0.14);
}

.product-findings-evidence--measured strong:first-child {
  color: var(--orange-bright);
  background: var(--orange-soft);
}

.product-findings-evidence--next strong:first-child {
  color: var(--text-3);
  background: rgba(255, 255, 255, 0.06);
}

#findings .product-findings-citation {
  color: var(--orange);
  font-family: var(--sans);
  font-size: inherit;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: rgba(255, 107, 61, 0.55);
  text-underline-offset: 3px;
  cursor: pointer;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

#findings .product-findings-citation:hover {
  color: var(--orange-bright);
  text-decoration-color: var(--orange-bright);
}

#findings .product-findings-citation:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.product-findings-preprint-list {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
}

.product-findings-preprint-item {
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-2) 62%, transparent 38%);
}

#findings .product-findings-citation--block {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  line-height: 1.45;
  text-decoration: none;
}

.product-findings-paper-icon {
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  color: color-mix(in srgb, var(--orange) 80%, #fff 20%);
}

.product-findings-paper-icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.product-findings-preprint-item:hover {
  border-color: color-mix(in srgb, var(--orange) 35%, var(--border) 65%);
}

.product-findings-sim-subtitle {
  font-style: italic;
  /* color: var(--orange); */
  font-weight: 400;
}

.product-findings-sim-figure {
  margin-top: 4px;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: #05070b;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.product-findings-sim-image {
  width: 100%;
  display: block;
  cursor: zoom-in;
}

.product-findings-sim-image :deep(.el-image__inner) {
  width: 100%;
  height: auto;
  display: block;
}

.product-findings-sim-caption {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--text-3);
  text-align: center;
  padding: 12px 14px 14px;
  border-top: 1px solid var(--border);
}

.product-findings-sim-name {
  color: var(--text);
}

@media (max-width: 768px) {
  .product-findings-block + .product-findings-block {
    margin-top: 36px;
    padding-top: 36px;
  }

  .product-findings-subtitle {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .product-findings-list {
    gap: 18px;
    margin-bottom: 22px;
  }

  .product-findings-preprint-list {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  #findings .product-findings-citation--block {
    padding: 11px 12px;
  }
}

@media (max-width: 900px) {
  .product-validation-grid,
  .product-contradiction-cols,
  .product-position-cols {
    grid-template-columns: 1fr;
  }

  .product-contradiction-col:first-child {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .product-validation-stat-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .product-validation-stat-label {
    max-width: none;
  }
}

.product-page-toc {
  position: fixed;
  top: calc(var(--site-nav-height, 72px) + 28px);
  left: max(16px, calc((100vw - min(100vw, 1400px)) / 2 - 184px));
  z-index: 30;
  width: 168px;
  max-height: calc(100vh - var(--site-nav-height, 72px) - 56px);
  overflow-x: clip;
  overflow-y: auto;
  padding: 4px 0;
  overscroll-behavior-x: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-10px);
  scrollbar-width: thin;
  transition:
    opacity 0.22s ease,
    visibility 0.22s ease,
    transform 0.22s ease;
}

.product-page-toc.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
}

.product-page-toc__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 14px;
}

.product-page-toc__label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-3);
}

.product-page-toc__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-2);
  color: var(--text-2);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.product-page-toc__close:hover {
  color: var(--text);
  border-color: color-mix(in srgb, var(--orange) 40%, var(--border) 60%);
  background: var(--surface);
}

.product-page-toc__close:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.product-page-toc-toggle {
  position: fixed;
  top: calc(var(--site-nav-height, 72px) + 28px);
  left: max(16px, calc((100vw - min(100vw, 1400px)) / 2 - 184px));
  z-index: 30;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg);
  color: var(--text-2);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateX(-8px);
  transition:
    opacity 0.22s ease,
    visibility 0.22s ease,
    transform 0.22s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.product-page-toc-toggle.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(0);
}

.product-page-toc-toggle:hover {
  color: var(--orange);
  border-color: color-mix(in srgb, var(--orange) 45%, var(--border) 55%);
}

.product-page-toc-toggle:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.product-page-toc__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  overflow-x: hidden;
}

.product-page-toc__link {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
  padding: 7px 10px;
  border-left: 2px solid transparent;
  font-size: 12px;
  line-height: 1.35;
  color: var(--text-2);
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.product-page-toc__link:hover {
  color: var(--text);
  background: color-mix(in srgb, var(--surface) 60%, transparent 40%);
}

.product-page-toc__link:focus-visible {
  outline: 2px solid var(--orange);
  outline-offset: 2px;
}

.product-page-toc__link.is-active {
  color: var(--orange);
  border-left-color: var(--orange);
  background: color-mix(in srgb, var(--orange-soft) 70%, transparent 30%);
}

.product-page-toc__num {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--text-3);
  flex-shrink: 0;
}

.product-page-toc__link.is-active .product-page-toc__num {
  color: var(--orange);
}

.product-page-toc__text {
  font-weight: 500;
  min-width: 0;
  overflow-wrap: anywhere;
}

@media (max-width: 1023px) {
  .product-page-toc,
  .product-page-toc-toggle {
    display: none;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .product-page-toc,
  .product-page-toc-toggle {
    left: 16px;
    width: 148px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-page-toc {
    transition: none;
  }

  .product-page-toc__link {
    transition: none;
  }
}

.platform-hero {
  background-size:
    cover,
    cover,
    auto 100%;
  background-position:
    left top,
    center,
    right center;
}

.engineering-log {
  margin-top: 120px;
  margin-bottom: 120px;
}

.engineering-log__header {
  margin-bottom: 48px;
  padding-right: 0;
}

.engineering-log__eyebrow {
  font-family: monospace;
  color: #ff6b00;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 11px;
}

.engineering-log__title {
  font-size: 32px;
  font-weight: 500;
  color: #fff;
  margin-top: 12px;
  letter-spacing: -0.02em;
}

.engineering-log__lead {
  margin-top: 12px;
  max-width: 750px;
}

.engineering-version-highlight {
  color: #ff6b00;
  font-weight: 600;
  text-shadow: 0 0 24px rgba(255, 107, 0, 0.35);
}

.engineering-log__panel {
  background: rgba(12, 16, 24, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 44px;
  backdrop-filter: blur(15px);
  border-radius: 4px;
}

.engineering-log__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: stretch;
}

.engineering-log__figure {
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
  background: #05070b;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.engineering-log__image {
  width: 100%;
  display: block;
  cursor: zoom-in;
  filter: saturate(0.95) contrast(1.05);
}

.engineering-log__image :deep(.el-image__inner) {
  width: 100%;
  height: auto;
  display: block;
}

.engineering-log__caption {
  font-family: monospace;
  font-size: 11px;
  color: #525866;
  margin-top: 12px;
  text-align: center;
  letter-spacing: 0.05em;
}

.engineering-log__copy {
  padding-right: 0;
}

.engineering-log__label {
  font-family: monospace;
  font-size: 11px;
  color: #ff6b00;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 16px;
}

.engineering-log__paragraph {
  margin-bottom: 20px;
}

.engineering-log__paragraph--bright {
  margin-bottom: 16px;
}

.engineering-log__conclusion {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 20px;
}

.engineering-log__conclusion p {
  font-weight: 500;
}

@media (max-width: 960px) {
  .engineering-log__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .platform-hero {
    background-size:
      cover,
      cover,
      auto 100%;
    background-position:
      left top,
      center,
      right center;
  }

  .engineering-log__header {
    padding-right: 0;
  }

  .engineering-log__panel {
    padding: 28px 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
  }

  .engineering-log__copy {
    padding-right: 0;
  }

  .engineering-log__figure {
    padding: 16px;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
  }
}
</style>
