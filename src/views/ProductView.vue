<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-platform.css'
import { onMounted } from 'vue'
import { initPlatformPage } from '@/scripts/platform-page.js'

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
})
</script>

<template>
  <SiteHeader />
  <main>
<section class="platform-hero">
  <div class="wrap">
    <div class="hero-eyebrow">Platform · v0.3 · all eleven modules</div>
    <h1>The platform builders <em>should have had</em> a decade ago.</h1>
    <p>Eight live modules covering economics, thermal physics, constellation sizing, sparse-model topology, workload classification, orbit-aware scheduling, multi-vendor routing, and competitive landscape. All numbers tunable. All math grounded in current public data.</p>
    <div class="hero-stats">
      <div>
        <div class="hero-stat-label">Modules shipped</div>
        <div class="hero-stat-value"><em>11</em></div>
        <div class="hero-stat-sub">all live · v0.3</div>
      </div>
      <div>
        <div class="hero-stat-label">Customer segments</div>
        <div class="hero-stat-value"><em>3</em></div>
        <div class="hero-stat-sub">labs · operators · sovereign</div>
      </div>
      <div>
        <div class="hero-stat-label">Players tracked</div>
        <div class="hero-stat-value"><em>15+</em></div>
        <div class="hero-stat-sub">live competitive intel</div>
      </div>
      <div>
        <div class="hero-stat-label">Capital efficiency</div>
        <div class="hero-stat-value"><em>$80M</em></div>
        <div class="hero-stat-sub">to profitability · 48 mo</div>
      </div>
    </div>
  </div>
</section>

<!-- ECONOMIC ENGINE -->
<section class="module" id="tco">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 01 · Economic Engine</div>
        <div class="module-title">TCO across <em>launch-cost curves</em>.</div>
      </div>
      <div class="module-description">
        Live ten-year cost model comparing terrestrial, orbital-disposable, and serviceable-orbital architectures. Slide any parameter to see how it cascades through the economics. The verdict updates in real time.
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
</section>

<!-- THERMAL -->
<section class="module" id="thermal">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 02 · Thermal Digital Twin</div>
        <div class="module-title">Chip die to <em>deep space</em>.</div>
      </div>
      <div class="module-description">
        Stefan-Boltzmann grounded simulator. Pick any chip family from H100 through Rubin Ultra or SpaceX D3. Watch the radiator area inflate or contract based on emissivity, solar geometry, and burst scheduling. The math is real.
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
</section>

<!-- CONSTELLATION -->
<section class="module" id="constellation">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 03 · Constellation Builder</div>
        <div class="module-title">From <em>MW</em> to satellites to launches.</div>
      </div>
      <div class="module-description">
        Pick a target capacity and launch vehicle. Get the full deployment plan: petals, satellites, total mass, launches, and capex breakdown.
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
</section>

<!-- MOE DESIGNER -->
<section class="module" id="moe">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 04 · Orbital MoE Designer · NEW</div>
        <div class="module-title">Expert-to-satellite <em>topology</em>.</div>
      </div>
      <div class="module-description">
        For any sparse Mixture-of-Experts model, compute optimal placement of experts across specialized satellite types. Click "send token" to watch the router activate the relevant experts. This is the differentiated module.
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
</section>

<!-- WORKLOAD SORTER -->
<section class="module" id="sorter">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 05 · Workload Sorter · NEW</div>
        <div class="module-title">Sky or ground, <em>per workload</em>.</div>
      </div>
      <div class="module-description">
        Pick a workload preset or define your own. The sorter classifies it across five dimensions and tells you what fraction belongs in orbit vs. ground, with the reasoning.
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
</section>

<!-- BURST SCHEDULER -->
<section class="module" id="scheduler">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 06 · Burst Scheduler · NEW</div>
        <div class="module-title">Thermal- and <em>orbit-aware</em> timing.</div>
      </div>
      <div class="module-description">
        One full orbital period (≈ 95 minutes for dawn-dusk SSO). Watch the scheduler place compute bursts into cold-side terminator passes and routing-only housekeeping into eclipse periods. Radiator mass saved compounds across the constellation.
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
</section>

<!-- MULTI-VENDOR ROUTER -->
<section class="module" id="routing">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 07 · Multi-Vendor Router · NEW</div>
        <div class="module-title">Capacity discovery across <em>providers</em>.</div>
      </div>
      <div class="module-description">
        Customers submit workloads. HelioMind routes across ADA Space, Starcloud, SpaceX, and future providers based on price, latency, and SLA. Single billing surface, multi-vendor capacity. The optional commercial layer that compounds the platform.
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
</section>

<!-- INFRASTRUCTURE ARCHITECT WIZARD -->
<section class="module" id="architect">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 08 · Infrastructure Architect · NEW</div>
        <div class="module-title">The <em>$10B decision</em> wizard.</div>
      </div>
      <div class="module-description">
        Guided five-step constraint solver. State your budget, capacity target, timeline, and risk tolerance. The wizard generates investment-grade design alternatives across terrestrial, orbital, and hybrid architectures. The output is a deliverable, not a slider.
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
</section>

<!-- RISK & REGULATORY ENGINE -->
<section class="module" id="risk">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 09 · Risk &amp; Regulatory Engine · NEW</div>
        <div class="module-title">Risk-adjusted TCO is the <em>only</em> TCO.</div>
      </div>
      <div class="module-description">
        Every infrastructure decision carries hidden costs no spreadsheet captures: launch delays, regulatory friction, insurance, debris probability, sovereign data rules, grid interconnection failures. The engine layers expected risk-cost on top of the base TCO.
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
</section>

<!-- REFERENCE DESIGN LIBRARY -->
<section class="module" id="library">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 10 · Reference Design Library · NEW</div>
        <div class="module-title">Clone what already <em>works</em>.</div>
      </div>
      <div class="module-description">
        Six prebuilt design patterns covering the full architecture space. Each is a complete, parameterized starting point: cost model, thermal stack, chip selection, deployment plan, risk profile. Customers fork what already works and modify the parameters they care about.
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
</section>

<!-- MARKET LANDSCAPE -->
<section class="module" id="market">
  <div class="wrap">
    <div class="module-header">
      <div>
        <div class="module-meta">/ 11 · Competitive Landscape</div>
        <div class="module-title">Every player. Every <em>architecture bet</em>.</div>
      </div>
      <div class="module-description">
        Fifteen orbital compute programs globally. Status, scale, architecture, and funding tracked. HelioMind sells to all of them — they are customers, not competitors.
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
</section>
  </main>
  <SiteFooter />
</template>
