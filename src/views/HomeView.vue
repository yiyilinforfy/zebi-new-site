<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import { onMounted } from 'vue'

onMounted(() => {
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



<!-- HERO -->
<section class="hero">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <div class="hero-eyebrow">Built for the solar age · 2026</div>
        <h1>
          The design platform<br>
          for AI infrastructure<br>
          <em>in the solar age<span class="punct">.</span></em>
        </h1>
        <p class="hero-sub">
          HelioMind OS designs, simulates, and optimizes the next generation of AI infrastructure — <strong>from Earth data centers to orbital compute networks</strong>. The world's hyperscalers, satellite operators, and sovereign AI programs are making thousand-billion-dollar bets with spreadsheets. We give them the platform they should have had a decade ago.
        </p>
        <div class="hero-actions">
          <a href="/product" class="btn-primary">
            <span>Open the platform</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#problem" class="btn-ghost">Read the thesis ↓</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orbit-vis">
          <div class="orbit-ring orbit-ring-1"></div>
          <div class="orbit-ring orbit-ring-2"></div>
          <div class="orbit-ring orbit-ring-3"></div>
          <div class="planet"></div>
          <div class="sat sat-1"></div>
          <div class="sat sat-2"></div>
          <div class="sat sat-3"></div>
        </div>
        <div class="hero-meta">
          <span class="blink">●</span> Live constellation telemetry · v0.1<br>
          21 AI satellites tracked · 5 POPS aggregate
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker">
  <div class="ticker-track">
    <span class="ticker-item">ADA Space · <span class="value">12 sats live</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">SpaceX D3 · <span class="value">1M-sat FCC filed</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Google Suncatcher · <span class="value">81-sat 2027</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Starcloud · <span class="value">H100 in orbit</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Blue Origin TeraWave · <span class="value">6 Tbps Q4 2027</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Three-Body · <span class="value">2,800 sats by 2030</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Falcon 9 · <span class="value">$3,400/kg</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Starship target · <span class="value">$200/kg</span></span>
    <span class="ticker-item sep">/</span>
    <!-- duplicate -->
    <span class="ticker-item">ADA Space · <span class="value">12 sats live</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">SpaceX D3 · <span class="value">1M-sat FCC filed</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Google Suncatcher · <span class="value">81-sat 2027</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Starcloud · <span class="value">H100 in orbit</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Blue Origin TeraWave · <span class="value">6 Tbps Q4 2027</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Three-Body · <span class="value">2,800 sats by 2030</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Falcon 9 · <span class="value">$3,400/kg</span></span>
    <span class="ticker-item sep">/</span>
    <span class="ticker-item">Starship target · <span class="value">$200/kg</span></span>
    <span class="ticker-item sep">/</span>
  </div>
</div>

<!-- PROBLEM -->
<section id="problem">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The thesis</div>
      <h2 class="section-title">Every AI infrastructure decision today is made <em>with spreadsheets and faith</em>.</h2>
      <p class="section-intro">
        The largest capital build-out in human history is happening at the worst-tooled moment in software's history. AI labs commit to gigawatts they cannot model. Satellite operators design constellations they cannot simulate. Sovereign programs spend tens of billions on intuition. HelioMind OS is what they should have used.
      </p>
    </div>

    <div class="problem-grid reveal">
      <div class="problem-cell">
        <div class="problem-num">i.</div>
        <div class="problem-stat"><em>$3.5T</em></div>
        <div class="problem-label">AI infrastructure capex through 2030</div>
        <p class="problem-body">
          Hyperscaler buildouts, sovereign AI programs, satellite constellations, edge inference fleets — every category compounding. No one has the tooling to optimize this spend.
        </p>
      </div>
      <div class="problem-cell">
        <div class="problem-num">ii.</div>
        <div class="problem-stat"><em>15+</em></div>
        <div class="problem-label">Orbital compute programs in flight</div>
        <p class="problem-body">
          SpaceX, Google, NVIDIA, Blue Origin, ADA Space, Starcloud, Astro-Future, Orbital Chenguang. Each independently rebuilding the same simulation tools. Each badly.
        </p>
      </div>
      <div class="problem-cell">
        <div class="problem-num">iii.</div>
        <div class="problem-stat"><em>0</em></div>
        <div class="problem-label">Existing design platforms in this category</div>
        <p class="problem-body">
          Chip design has Cadence and Synopsys, each $50B+ companies. AI infrastructure design has nothing. The empty seat at the most expensive table in technology.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- MODULES -->
<section id="modules" style="background: var(--bg-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The platform</div>
      <h2 class="section-title">Eleven modules. One <em>operating system</em> for AI infrastructure.</h2>
    </div>

    <div class="modules-intro-stack reveal">
      <div class="left"></div>
      <div class="right">
        <p>
          Each module solves one decision class that today consumes weeks of engineering time, biased vendor pitches, and Excel modeling. Used together, they replace the entire pre-deployment design pipeline for hyperscale AI infrastructure.
        </p>
        <p>
          Sold as SaaS to AI labs, as enterprise license to satellite operators, as design-build packages to sovereign programs. The data flywheel makes every customer's deployment make the platform smarter for the next one.
        </p>
      </div>
    </div>

    <div class="module-list">
      <div class="module-row" onclick="window.location.href='/product#tco'">
        <div class="module-num">/ 01</div>
        <div>
          <div class="module-name">Economic Engine<em>TCO across launch-cost curves</em></div>
        </div>
        <div class="module-desc">
          Live ten-year total-cost model comparing terrestrial, orbital-disposable, and serviceable-orbital architectures. Sensitivity-aware. Investment-grade output. Replaces the McKinsey deck.
        </div>
        <div class="module-tag">Shipped · v0.1</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#thermal'">
        <div class="module-num">/ 02</div>
        <div>
          <div class="module-name">Thermal Digital Twin<em>Chip die to deep space</em></div>
        </div>
        <div class="module-desc">
          Stefan-Boltzmann grounded simulator for any chip family — H100, Blackwell, Rubin, Trillium TPU, SpaceX D3. Models full thermal stack including burst scheduling and shadow geometry savings.
        </div>
        <div class="module-tag">Shipped · v0.1</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#constellation'">
        <div class="module-num">/ 03</div>
        <div>
          <div class="module-name">Constellation Builder<em>From MW to satellites to launches</em></div>
        </div>
        <div class="module-desc">
          Target compute capacity in, full deployment plan out. Petals, satellites, launches, capex breakdown, vehicle selection across Falcon 9 through Starship 2035. Visual constellation preview.
        </div>
        <div class="module-tag">Shipped · v0.1</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#moe'">
        <div class="module-num">/ 04</div>
        <div>
          <div class="module-name">Orbital MoE Designer<em>Expert-to-satellite topology</em></div>
        </div>
        <div class="module-desc">
          The breakthrough module. For any sparse model — Mixtral, Qwen3-MoE, DeepSeek-V3, GPT-OSS — computes optimal placement of experts across satellite types. Router placement, fault tolerance, hot-swap topology. Patent-pending.
        </div>
        <div class="module-tag">New · v0.2</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#sorter'">
        <div class="module-num">/ 05</div>
        <div>
          <div class="module-name">Workload Sorter<em>Sky or ground, per workload</em></div>
        </div>
        <div class="module-desc">
          Classification engine. Feed it any AI workload's compute graph, latency tolerance, data flow, privacy class — it tells you what fraction belongs in orbit, what stays on the ground, and why.
        </div>
        <div class="module-tag">New · v0.2</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#scheduler'">
        <div class="module-num">/ 06</div>
        <div>
          <div class="module-name">Burst Scheduler<em>Thermal and orbit-aware timing</em></div>
        </div>
        <div class="module-desc">
          Schedules compute around the thermal envelope and orbital position. Cold-side terminator passes get peak workloads. Eclipse periods get memory housekeeping. Saves 30-40% radiator mass per node.
        </div>
        <div class="module-tag">New · v0.2</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#market'">
        <div class="module-num">/ 07</div>
        <div>
          <div class="module-name">Competitive Map<em>Every player. Every architecture</em></div>
        </div>
        <div class="module-desc">
          Live tracker of 15+ orbital compute programs globally. Status, architecture bets, scale targets, funding. Filterable by region, business model, technology stack.
        </div>
        <div class="module-tag">Shipped · v0.1</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#routing'">
        <div class="module-num">/ 08</div>
        <div>
          <div class="module-name">Multi-Vendor Router<em>Capacity discovery across providers</em></div>
        </div>
        <div class="module-desc">
          For customers running workloads across ADA Space, Starcloud, SpaceX, and future providers. Live capacity feed, SLA-aware routing, single billing surface. The optional commercial layer.
        </div>
        <div class="module-tag">New · v0.2</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#architect'">
        <div class="module-num">/ 09</div>
        <div>
          <div class="module-name">Infrastructure Architect<em>The $10B decision wizard</em></div>
        </div>
        <div class="module-desc">
          Guided constraint-solver for board-level infrastructure decisions. "I have $10B and need 5 GW by 2028. Terrestrial, orbital, or hybrid? Which chip generation, cooling, orbit, refresh cadence?" Five-step flow produces an investment-grade design alternatives report.
        </div>
        <div class="module-tag">New · v0.3</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#risk'">
        <div class="module-num">/ 10</div>
        <div>
          <div class="module-name">Risk &amp; Regulatory Engine<em>Risk-adjusted TCO</em></div>
        </div>
        <div class="module-desc">
          Layers risk-adjusted cost on top of every design: export controls, spectrum coordination, debris probability, insurance, launch delay, sovereign data rules, environmental approvals, grid interconnection. The cost no one models — but everyone pays.
        </div>
        <div class="module-tag">New · v0.3</div>
      </div>

      <div class="module-row" onclick="window.location.href='/product#library'">
        <div class="module-num">/ 11</div>
        <div>
          <div class="module-name">Reference Design Library<em>Clone, modify, deploy</em></div>
        </div>
        <div class="module-desc">
          Prebuilt design patterns: terrestrial liquid-cooled AI campus, immersion-cooled sovereign center, LEO inference swarm, SSO solar training cluster, MoE-native orbital constellation, serviceable Zebi-Lattice. Customers clone what already works and modify.
        </div>
        <div class="module-tag">New · v0.3</div>
      </div>
    </div>
  </div>
</section>

<!-- ARCHITECTURE — Orbital AI Center 3-layer -->
<section id="architecture">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The architecture</div>
      <h2 class="section-title">HelioMind Orbital AI Center. Three layers, one <em>thesis</em>.</h2>
      <p class="section-intro">
        Treat orbit as a solar-powered, high-latency, delay-tolerant batch-compute layer. Keep storage, APIs, privacy, and customer access on Earth. The infrastructure is not a copy of cloud architecture lifted into space — it is a different beast designed for the physics of orbit.
      </p>
    </div>

    <div class="arch-stack reveal">
      <div class="arch-layer">
        <div class="arch-layer-num">i.</div>
        <div class="arch-layer-orbit">Low Earth Orbit · 500-700 km</div>
        <div class="arch-layer-name">LEO Inference <em>Swarm</em></div>
        <p class="arch-layer-purpose">Low-latency orbital inference at the imagery source. Workloads where data already lives in space and downlinking is the bottleneck.</p>
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
        <p class="arch-layer-purpose">Maximum sunlight orbit. 95% solar illumination. The economic engine of the architecture: compute-intensive, latency-tolerant, fully batched.</p>
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
        <p class="arch-layer-purpose">The control plane. Customer-facing APIs, sensitive data, regulatory governance, model registry, checkpoint management. Orbit follows what ground decides.</p>
        <div class="arch-layer-viz">
          <div class="arch-mini-vis">
            <div class="arch-earth" style="bottom: 0; background: radial-gradient(ellipse at 50% 0%, #2a3550, #0f1726 70%); box-shadow: 0 0 60px rgba(110, 201, 217, 0.3);"></div>
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

<!-- COMPUTE PETAL ANATOMY -->
<section id="petal" style="background: var(--bg-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The unit cell</div>
      <h2 class="section-title">The Compute Petal. Not a box — a <em>flower</em>.</h2>
      <p class="section-intro">
        Every AI satellite in the Zebi-Lattice architecture is a Compute Petal: a deployable structure with a compute core at the center, solar wing pointed at the sun, and radiator wing forever pointed away. Heat becomes a first-class compute resource, not a thermal problem.
      </p>
    </div>

    <div class="petal-anatomy reveal">
      <div class="petal-anatomy-vis">
        <svg class="petal-svg" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          <!-- Sun direction indicator -->
          <g opacity="0.6">
            <circle cx="60" cy="60" r="14" fill="#ff8359"/>
            <circle cx="60" cy="60" r="22" fill="none" stroke="#ff8359" stroke-width="0.5" stroke-dasharray="2 3"/>
            <text x="60" y="100" text-anchor="middle" fill="#969cae" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.5">SUN →</text>
          </g>

          <!-- Solar wing - oriented toward sun (upper left) -->
          <g>
            <polygon points="120,80 230,180 200,210 90,110" fill="rgba(255,131,89,0.15)" stroke="#ff8359" stroke-width="1"/>
            <line x1="120" y1="80" x2="200" y2="210" stroke="#ff8359" stroke-width="0.3" opacity="0.5"/>
            <line x1="155" y1="100" x2="170" y2="170" stroke="#ff8359" stroke-width="0.3" opacity="0.5"/>
            <line x1="135" y1="120" x2="180" y2="160" stroke="#ff8359" stroke-width="0.3" opacity="0.5"/>
            <text x="100" y="75" fill="#ff8359" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.2">SOLAR WING</text>
          </g>

          <!-- Compute core - center -->
          <g>
            <rect x="195" y="195" width="70" height="70" fill="#1a2030" stroke="#ff6b3d" stroke-width="1.5"/>
            <rect x="210" y="210" width="40" height="40" fill="none" stroke="#ff6b3d" stroke-width="0.5"/>
            <rect x="218" y="218" width="24" height="24" fill="#ff6b3d" opacity="0.3"/>
            <circle cx="230" cy="230" r="3" fill="#ff6b3d"/>
            <text x="230" y="285" text-anchor="middle" fill="#ff6b3d" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.2">COMPUTE CORE</text>
          </g>

          <!-- Radiator wing - opposite to sun (lower right) -->
          <g>
            <polygon points="260,250 370,350 340,380 230,280" fill="rgba(110,201,217,0.15)" stroke="#6ec9d9" stroke-width="1"/>
            <line x1="270" y1="265" x2="350" y2="370" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5"/>
            <line x1="290" y1="280" x2="335" y2="355" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5"/>
            <line x1="310" y1="295" x2="320" y2="340" stroke="#6ec9d9" stroke-width="0.3" opacity="0.5"/>
            <text x="365" y="390" text-anchor="end" fill="#6ec9d9" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.2">RADIATOR WING</text>
          </g>

          <!-- Deep space arrow -->
          <g opacity="0.6">
            <text x="400" y="420" text-anchor="end" fill="#a89bd9" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1.5">→ DEEP SPACE</text>
            <circle cx="400" cy="430" r="2" fill="#a89bd9"/>
          </g>

          <!-- Optical link arms -->
          <g>
            <line x1="195" y1="230" x2="120" y2="230" stroke="#d4a574" stroke-width="0.8" stroke-dasharray="3 2"/>
            <circle cx="120" cy="230" r="4" fill="none" stroke="#d4a574" stroke-width="1"/>
            <text x="115" y="220" text-anchor="end" fill="#d4a574" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1">OPTICAL ↔</text>

            <line x1="265" y1="230" x2="340" y2="230" stroke="#d4a574" stroke-width="0.8" stroke-dasharray="3 2"/>
            <circle cx="340" cy="230" r="4" fill="none" stroke="#d4a574" stroke-width="1"/>
            <text x="345" y="220" fill="#d4a574" font-family="JetBrains Mono, monospace" font-size="8" letter-spacing="1">↔ OPTICAL</text>
          </g>

          <!-- Antenna for RF fallback -->
          <g>
            <line x1="230" y1="195" x2="230" y2="160" stroke="#969cae" stroke-width="0.8"/>
            <polyline points="220,165 230,155 240,165" fill="none" stroke="#969cae" stroke-width="0.8"/>
            <text x="230" y="148" text-anchor="middle" fill="#5a6178" font-family="JetBrains Mono, monospace" font-size="7" letter-spacing="1">RF</text>
          </g>

          <!-- Cassette indicator on core -->
          <g opacity="0.7">
            <rect x="195" y="195" width="70" height="6" fill="#ff6b3d" opacity="0.4"/>
            <text x="262" y="200" fill="#ff6b3d" font-family="JetBrains Mono, monospace" font-size="6" letter-spacing="0.5">PC³</text>
          </g>
        </svg>
      </div>

      <div class="petal-module-list">
        <div class="petal-module">
          <div class="petal-module-num">/ 01</div>
          <div>
            <div class="petal-module-name">AI compute core</div>
            <div class="petal-module-desc">TPU, GPU, or space-hardened ASIC accelerator. Center of the petal. Houses the chip the workload runs on.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 02</div>
          <div>
            <div class="petal-module-name">Local SSD &amp; MRAM buffer</div>
            <div class="petal-module-desc">Temporary storage for training data, checkpoints, and operational logs. Radiation-hardened MRAM for critical state.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 03</div>
          <div>
            <div class="petal-module-name">Optical inter-satellite link</div>
            <div class="petal-module-desc">Laser communication to adjacent petals. Carries expert activations, gradients, and checkpoint state at Tbps speeds.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 04</div>
          <div>
            <div class="petal-module-name">RF fallback antenna</div>
            <div class="petal-module-desc">Low-rate emergency communication. Used during optical link outages or for low-priority telemetry downlink.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 05</div>
          <div>
            <div class="petal-module-name">Deployable solar wing</div>
            <div class="petal-module-desc">Primary power. Sun-pointed at all times in dawn-dusk SSO. Provides up to 95% duty cycle for compute-intensive workloads.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 06</div>
          <div>
            <div class="petal-module-name">Deployable radiator wing</div>
            <div class="petal-module-desc">Primary heat sink. Permanently shadowed from sun and Earth IR. Doubles as structural spine — Radiator-as-Structure design principle.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 07</div>
          <div>
            <div class="petal-module-name">Radiation-aware controller</div>
            <div class="petal-module-desc">Detects single-event upsets, manages reboots, migrates active workloads to redundant petals when radiation exposure exceeds thresholds.</div>
          </div>
        </div>
        <div class="petal-module">
          <div class="petal-module-num">/ 08</div>
          <div>
            <div class="petal-module-name">Edge scheduler</div>
            <div class="petal-module-desc">Decides locally whether to compute, downclock, or sleep based on thermal state, battery level, and orbit position. Thermal-first computing.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- QUOTE -->
<section class="quote-section">
  <div class="wrap">
    <div class="reveal">
      <div class="quote-mark">"</div>
      <p class="quote-text">
        Physics doesn't kill orbital AI compute. The economics do — until someone gives the builders a real platform to design against. We are that platform.
      </p>
      <div class="quote-attribution">HelioMind <em>founding principle</em> · 2026</div>
    </div>
  </div>
</section>

<!-- LANDSCAPE -->
<section id="landscape">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The landscape</div>
      <h2 class="section-title">Fifteen players. One <em>missing layer</em>.</h2>
      <p class="section-intro">
        Every serious orbital AI compute program is somewhere on this map. They build hardware. We build the platform they design hardware with — and the commercial layer that monetizes it to non-affiliated customers.
      </p>
    </div>

    <div class="compet-grid reveal">
      <div class="compet-card">
        <div class="compet-name">ADA Space</div>
        <div class="compet-region">China · Chengdu</div>
        <div class="compet-status live">12 sats operational</div>
        <p class="compet-bet">3,156-sat ITU. Three-Body Constellation. Hong Kong IPO May 2026 at ¥11.5B valuation.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">SpaceX</div>
        <div class="compet-region">USA · Hawthorne</div>
        <div class="compet-status planning">FCC filed</div>
        <p class="compet-bet">1M satellites. D3 space-hardened chip. Terafab joint venture for 1 TW/year.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">Google Suncatcher</div>
        <div class="compet-region">USA · Mountain View</div>
        <div class="compet-status research">Demo 2027</div>
        <p class="compet-bet">81-sat cluster, Trillium TPU, formation flight. Two prototypes launching 2027.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">Starcloud</div>
        <div class="compet-region">USA · Mountain View</div>
        <div class="compet-status live">H100 in orbit</div>
        <p class="compet-bet">5 GW long-term vision. Backed by Y Combinator, $1.1B unicorn.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">Blue Origin TeraWave</div>
        <div class="compet-region">USA · Kent</div>
        <div class="compet-status planning">Q4 2027 launch</div>
        <p class="compet-bet">5,408 LEO + 128 MEO. 6 Tbps optical. The downlink backbone everyone needs.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">Astro-Future Institute</div>
        <div class="compet-region">China · Beijing</div>
        <div class="compet-status research">2026 demo</div>
        <p class="compet-bet">16-sat GW data centers. Backed by Lenovo and Beijing municipal government.</p>
      </div>
      <div class="compet-card">
        <div class="compet-name">Orbital Chenguang</div>
        <div class="compet-region">China · CASC backed</div>
        <div class="compet-status planning">Chenguang-1 pending</div>
        <p class="compet-bet">15th Five-Year Plan tie-in. $8.4B in credit lines for GW-scale infrastructure.</p>
      </div>
      <div class="compet-card us">
        <div class="compet-name">HelioMind</div>
        <div class="compet-region">SG · Delaware</div>
        <div class="compet-status">The OS layer</div>
        <p class="compet-bet">Design platform for all of the above. Cadence/Synopsys for AI infrastructure. The OS no one else is building.</p>
      </div>
    </div>
  </div>
</section>

<!-- ROADMAP -->
<section id="roadmap" style="background: var(--bg-2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
  <div class="wrap">
    <div class="reveal">
      <div class="section-eyebrow">The plan</div>
      <h2 class="section-title">Four phases. <em>Forty-eight months</em>. One company.</h2>
      <p class="section-intro">
        Capital-efficient because the platform doesn't require us to own the satellites. Sequenced so each phase is funded by the prior phase's revenue, not the next phase's dilution.
      </p>
    </div>

    <div class="phases reveal">
      <div class="phase-row">
        <div class="phase-id">
          phase A
          <span class="big">01</span>
        </div>
        <div class="phase-content">
          <h3>Build the platform.</h3>
          <div class="phase-meta">Months <span>0—9</span> · $4M pre-seed · team of 6</div>
          <p>
            Ship HelioMind OS v1.0 with all ten modules in functional form. Sign three paid design contracts ($200-500k each) with a sovereign AI program, an emerging orbital builder, and one hyperscaler scenario-planning team.
          </p>
          <div class="phase-tags">
            <span class="phase-tag">Singapore EDB target</span>
            <span class="phase-tag">UAE G42 target</span>
            <span class="phase-tag">MoE patent filing</span>
            <span class="phase-tag">First $1M revenue</span>
          </div>
        </div>
      </div>

      <div class="phase-row">
        <div class="phase-id">
          phase B
          <span class="big">02</span>
        </div>
        <div class="phase-content">
          <h3>Land the anchor lab.</h3>
          <div class="phase-meta">Months <span>9—24</span> · $20M seed · team of 25</div>
          <p>
            Convert one of OpenAI, Anthropic, Google, Microsoft, Meta, xAI, or a Chinese frontier lab into a multi-year platform license. Expand to 15-25 active customers. Ship Orbital MoE Designer as the marquee differentiated module.
          </p>
          <div class="phase-tags">
            <span class="phase-tag">$15M ARR</span>
            <span class="phase-tag">3 core patents</span>
            <span class="phase-tag">Data flywheel begins</span>
            <span class="phase-tag">$120M valuation</span>
          </div>
        </div>
      </div>

      <div class="phase-row">
        <div class="phase-id">
          phase C
          <span class="big">03</span>
        </div>
        <div class="phase-content">
          <h3>Become the standard.</h3>
          <div class="phase-meta">Months <span>24—48</span> · $60M Series A · team of 80</div>
          <p>
            HelioMind referenced in every serious AI infrastructure design document globally. 50+ enterprise customers, 5+ sovereign deployments. Open-source the Workload Sorter; proprietary modules drive licensing revenue on top of SaaS.
          </p>
          <div class="phase-tags">
            <span class="phase-tag">$80-150M ARR</span>
            <span class="phase-tag">Unit-economics profitable</span>
            <span class="phase-tag">Series B candidacy</span>
            <span class="phase-tag">$1B+ valuation</span>
          </div>
        </div>
      </div>

      <div class="phase-row">
        <div class="phase-id">
          phase D
          <span class="big">04</span>
        </div>
        <div class="phase-content">
          <h3>Optional adjacencies.</h3>
          <div class="phase-meta">Months <span>48+</span> · public or strategic</div>
          <p>
            Only after Phase C is firmly profitable. Operate a small reference orbital cluster (10-50 MW) to validate our designs publicly. Expand into chip-design adjacency. Strategic conversation with Cadence/Synopsys-class acquirers.
          </p>
          <div class="phase-tags">
            <span class="phase-tag">Reference cluster</span>
            <span class="phase-tag">Chip design platform</span>
            <span class="phase-tag">IPO track or M&amp;A</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MOONSHOT -->
<section id="moonshot" class="moonshot-section">
  <div class="wrap">
    <div class="reveal">
      <div class="moonshot-eyebrow">The thirty-year horizon</div>
      <h2 class="section-title">Deep-Space <em>Photonic Matrix</em>.</h2>
      <p class="section-intro">
        Far beyond Phase D. A research pathway, not a near-term promise. At Earth-Moon Lagrange points and beyond, photonic compute pathways become feasible in sunshielded cryogenic environments. Self-healing robotic infrastructure replaces, recycles, and rebuilds modules without human repair crews. The Compute Petal architecture, scaled to deep space.
      </p>
    </div>

    <div class="moonshot-features reveal">
      <div class="moonshot-feature">
        <div class="moonshot-feature-num">/ 01 · Location</div>
        <div class="moonshot-feature-name">Earth-Moon L2 as a compute hub</div>
        <div class="moonshot-feature-desc">Gravitationally stable point, permanent sun access, far from terrestrial RF noise. The natural staging site for the first deep-space compute installations.</div>
      </div>
      <div class="moonshot-feature">
        <div class="moonshot-feature-num">/ 02 · Compute substrate</div>
        <div class="moonshot-feature-name">Cryogenic photonic pathways</div>
        <div class="moonshot-feature-desc">Sunshielded modules at &lt;77 K enable photonic and superconducting compute architectures impossible in Earth-side data centers. Specialized for training workloads, not inference.</div>
      </div>
      <div class="moonshot-feature">
        <div class="moonshot-feature-num">/ 03 · Materials</div>
        <div class="moonshot-feature-name">In-space manufactured structures</div>
        <div class="moonshot-feature-desc">Lunar regolith and asteroid-resource pathways enable larger structures than can be launched. Radiator wings 10× larger than current LEO designs become economically feasible.</div>
      </div>
      <div class="moonshot-feature">
        <div class="moonshot-feature-num">/ 04 · Operations</div>
        <div class="moonshot-feature-name">Self-healing robotic infrastructure</div>
        <div class="moonshot-feature-desc">Returnable Servicer Vehicles scaled up. Modules that replace, recycle, and rebuild without human repair crews. The PC³ cassette architecture extended to deep space lifecycles.</div>
      </div>
    </div>

    <div class="moonshot-caveat reveal">
      <strong>Caveat — read carefully</strong>
      Deep-space cold does not make heat disappear. Generated compute heat still requires radiator geometry, thermal conduction paths, and realistic chip packaging — the same physics that governs LEO. We treat the Deep-Space Photonic Matrix as a research pathway that informs the architecture, not a near-term hardware promise. HelioMind's business case is fully viable without any of this ever happening.
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="wrap">
    <div class="reveal">
      <h2>The platform you should have <em>used yesterday<span style="color: var(--orange); font-style: normal;">.</span></em></h2>
      <p>
        See every module. Run the simulations. Stress-test the economics. The platform is live in beta.
      </p>
      <div class="cta-actions">
        <a href="/product" class="btn-primary">
          <span>Open the platform</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="mailto:hello@heliomind.ai" class="btn-ghost">Schedule a demo →</a>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
  </main>
  <SiteFooter />
</template>
