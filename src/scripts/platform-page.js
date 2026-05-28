export function initPlatformPage() {
  const Chart = window.Chart
  if (!Chart) {
    console.error('Chart.js failed to load')
    return
  }

// ============= CHART DEFAULTS =============
Chart.defaults.font.family = "'Inter Tight', system-ui, sans-serif";
Chart.defaults.color = '#969cae';
Chart.defaults.borderColor = '#1f2638';

function fmtUSD(n) {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(1) + 'k';
  return '$' + n.toFixed(0);
}

// ============= TCO MODULE =============
const tcoChartCtx = document.getElementById('tco-chart').getContext('2d');
let tcoChart = null;

function updateTCO() {
  const mw = parseFloat(document.getElementById('tco-mw').value);
  const launchCost = parseFloat(document.getElementById('tco-launch').value);
  const satCostPerW = parseFloat(document.getElementById('tco-satcost').value);
  const refreshMonths = parseFloat(document.getElementById('tco-refresh').value);
  const energyCost = parseFloat(document.getElementById('tco-energy').value);

  document.getElementById('tco-mw-label').textContent = mw + ' MW';
  document.getElementById('tco-launch-label').textContent = '$' + launchCost.toLocaleString() + '/kg';
  document.getElementById('tco-satcost-label').textContent = '$' + satCostPerW + '/W';
  document.getElementById('tco-refresh-label').textContent = refreshMonths + ' months';
  document.getElementById('tco-energy-label').textContent = '$' + energyCost.toFixed(2) + '/kWh';

  const groundCapexPerMW = 4e6;
  const groundCapex = mw * groundCapexPerMW;
  const groundRefreshes = Math.floor(120 / 36);
  const groundRefreshTotal = groundRefreshes * groundCapex * 0.5;
  const groundEnergyOpex = mw * 1000 * 1.3 * 8760 * energyCost * 10;
  const groundOpsOpex = groundCapex * 0.10 * 10;
  const groundTCO = groundCapex + groundRefreshTotal + groundEnergyOpex + groundOpsOpex;

  const satCapex = mw * 1e6 * satCostPerW;
  const massPerMW = 16000;
  const launchCapex = mw * massPerMW * launchCost;
  const orbitalRefreshes = Math.floor(120 / refreshMonths);
  const refreshCostDisposable = orbitalRefreshes * (satCapex + launchCapex) * 0.85;
  const orbitalOpsOpex = satCapex * 0.04 * 10;
  const orbitalDispTCO = satCapex + launchCapex + refreshCostDisposable + orbitalOpsOpex;

  const refreshCostZebi = orbitalRefreshes * ((satCapex * 0.45) + (satCapex * 0.05) + (launchCapex * 0.20));
  const rsvCapex = 500e6 * Math.ceil(mw / 100);
  const zebiTCO = satCapex + launchCapex + refreshCostZebi + orbitalOpsOpex + rsvCapex;

  document.getElementById('kpi-ground').textContent = fmtUSD(groundTCO);
  document.getElementById('kpi-orbital-disp').textContent = fmtUSD(orbitalDispTCO);
  document.getElementById('kpi-zebi').textContent = fmtUSD(zebiTCO);
  document.getElementById('kpi-multiple').textContent = (zebiTCO / groundTCO).toFixed(2) + '×';

  const years = Array.from({length: 11}, (_, i) => i);
  const groundCurve = years.map(y => {
    const c = groundCapex + groundCapex * 0.5 * Math.floor(y / 3);
    const o = mw * 1000 * 1.3 * 8760 * energyCost * y + groundCapex * 0.10 * y;
    return (c + o) / 1e9;
  });
  const orbitalDispCurve = years.map(y => {
    const refreshes = Math.floor(y * 12 / refreshMonths);
    const c = satCapex + launchCapex + refreshes * (satCapex + launchCapex) * 0.85;
    const o = satCapex * 0.04 * y;
    return (c + o) / 1e9;
  });
  const zebiCurve = years.map(y => {
    const refreshes = Math.floor(y * 12 / refreshMonths);
    const c = satCapex + launchCapex + refreshes * ((satCapex * 0.45) + (satCapex * 0.05) + (launchCapex * 0.20)) + rsvCapex;
    const o = satCapex * 0.04 * y;
    return (c + o) / 1e9;
  });

  if (tcoChart) tcoChart.destroy();
  tcoChart = new Chart(tcoChartCtx, {
    type: 'line',
    data: {
      labels: years.map(y => 'Yr ' + y),
      datasets: [
        { label: 'Terrestrial', data: groundCurve, borderColor: '#6ec9d9', backgroundColor: 'rgba(110, 201, 217, 0.08)', fill: true, tension: 0.3, borderWidth: 2, pointRadius: 2 },
        { label: 'Orbital disposable', data: orbitalDispCurve, borderColor: '#e0716e', backgroundColor: 'rgba(224, 113, 110, 0.06)', fill: true, tension: 0.3, borderWidth: 2, pointRadius: 2 },
        { label: 'Serviceable orbital', data: zebiCurve, borderColor: '#ff6b3d', backgroundColor: 'rgba(255, 107, 61, 0.1)', fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 3 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { color: '#e8eaf0', font: { size: 12 } } },
        tooltip: { backgroundColor: '#1a2030', borderColor: '#2b3349', borderWidth: 1, padding: 12, callbacks: { label: c => c.dataset.label + ': $' + c.parsed.y.toFixed(2) + 'B' } }
      },
      scales: {
        x: { grid: { color: '#1a2030' }, ticks: { color: '#969cae' } },
        y: { grid: { color: '#1a2030' }, ticks: { color: '#969cae', callback: v => '$' + v.toFixed(1) + 'B' } }
      }
    }
  });

  const mult = zebiTCO / groundTCO;
  let verdict = '';
  if (mult <= 1.0) verdict = `At these inputs Zebi-Lattice reaches <em>cost parity or better</em> versus terrestrial. The orbital premium becomes negative — sell premium and capture the spread.`;
  else if (mult <= 1.5) verdict = `Zebi-Lattice is <em>${mult.toFixed(2)}×</em> more expensive than ground. Tenable for sovereign and EO premium tiers paying 2-3× ground prices.`;
  else if (mult <= 3.0) verdict = `<em>${mult.toFixed(2)}×</em> more expensive. Niche only: defense, sovereign data residency, cislunar relay. Mainstream needs launch &lt; $500/kg.`;
  else verdict = `<em>${mult.toFixed(2)}×</em> more expensive. McCalip's baseline — savage economics. Drop launch or pivot to sovereign-only mix.`;
  document.getElementById('tco-verdict').innerHTML = verdict;
}

// ============= THERMAL MODULE =============
function updateThermal() {
  const chipSel = document.getElementById('th-chip');
  const chipOpt = chipSel.options[chipSel.selectedIndex];
  const chipTmax = parseFloat(chipOpt.dataset.tmax);

  const power = parseFloat(document.getElementById('th-power').value);
  const emiss = parseFloat(document.getElementById('th-emiss').value);
  const solarPenalty = parseFloat(document.getElementById('th-solar').value);
  const burst = parseFloat(document.getElementById('th-burst').value);

  document.getElementById('th-power-label').textContent = power + ' kW';
  document.getElementById('th-emiss-label').textContent = emiss.toFixed(2);
  document.getElementById('th-solar-label').textContent = solarPenalty + ' W/m²';
  document.getElementById('th-burst-label').textContent = burst.toFixed(1) + '×';

  const dT_total = 38;
  const T_rad_C = chipTmax - dT_total;
  const T_rad_K = T_rad_C + 273.15;
  const sigma = 5.67e-8;
  const heatFlux = emiss * sigma * Math.pow(T_rad_K, 4) - solarPenalty;
  const effectivePower = (power * 1000) / burst;
  const radArea = effectivePower / heatFlux;

  const radMass = radArea * 1.2;
  const computeMass = (power / 100) * 480;
  const solarMass = (power / 100) * 410;
  const thermalMass = radMass + 130;
  const structureMass = (power / 100) * 290;
  const marginMass = (computeMass + solarMass + thermalMass + structureMass) * 0.13;
  const nodeMass = computeMass + solarMass + thermalMass + structureMass + marginMass;

  document.getElementById('t-die').textContent = chipTmax + '°C';
  document.getElementById('t-spreader').textContent = (chipTmax - 5) + '°C';
  document.getElementById('t-pipe').textContent = (chipTmax - 23) + '°C';
  document.getElementById('t-rad').textContent = T_rad_C + '°C';

  document.getElementById('m-compute').textContent = Math.round(computeMass).toLocaleString() + ' kg';
  document.getElementById('m-solar').textContent = Math.round(solarMass).toLocaleString() + ' kg';
  document.getElementById('m-thermal').textContent = Math.round(thermalMass).toLocaleString() + ' kg';
  document.getElementById('m-structure').textContent = Math.round(structureMass).toLocaleString() + ' kg';
  document.getElementById('m-margin').textContent = Math.round(marginMass).toLocaleString() + ' kg';

  document.getElementById('kpi-radarea').textContent = Math.round(radArea).toLocaleString() + ' m²';
  document.getElementById('kpi-heatflux').textContent = Math.round(heatFlux).toLocaleString() + ' W/m²';
  document.getElementById('kpi-radmass').textContent = Math.round(radMass).toLocaleString() + ' kg';
  document.getElementById('kpi-nodemass').textContent = Math.round(nodeMass).toLocaleString() + ' kg';

  const chipName = chipOpt.textContent.split('·')[0].trim();
  let verdict = '';
  if (radArea < 80) verdict = `${chipName} at ${power} kW: only <em>${Math.round(radArea)} m²</em> of radiator. Lean design — single deployable wing.`;
  else if (radArea < 200) verdict = `${chipName} at ${power} kW: <em>${Math.round(radArea)} m² radiator</em>. Mainstream two-panel deployable.`;
  else if (radArea < 400) verdict = `${chipName} at ${power} kW: <em>${Math.round(radArea)} m² radiator</em>. Large structure — use burst scheduling to reduce.`;
  else verdict = `${chipName} at ${power} kW: <em>${Math.round(radArea)} m² required</em>. Physically challenging. Switch to space-hardened silicon or use burst mode.`;
  document.getElementById('th-verdict').innerHTML = verdict;
}

// ============= CONSTELLATION MODULE =============
const consChartCtx = document.getElementById('cons-chart').getContext('2d');
let consChart = null;

function updateConstellation() {
  const mw = parseFloat(document.getElementById('cons-mw').value);
  const petalMW = parseFloat(document.getElementById('cons-petal').value);
  const rocketSel = document.getElementById('cons-rocket');
  const rocketOpt = rocketSel.options[rocketSel.selectedIndex];
  const payload = parseFloat(rocketOpt.dataset.payload);
  const launchCostKg = parseFloat(rocketOpt.dataset.costPerKg);
  const nodeMass = parseFloat(document.getElementById('cons-nodemass').value);

  document.getElementById('cons-mw-label').textContent = mw + ' MW';
  document.getElementById('cons-petal-label').textContent = petalMW.toFixed(1) + ' MW';
  document.getElementById('cons-nodemass-label').textContent = nodeMass.toLocaleString() + ' kg';

  const petals = Math.ceil(mw / petalMW);
  const nodesPerPetal = 10;
  const totalNodes = petals * nodesPerPetal;
  const totalMass = totalNodes * nodeMass;
  const launches = Math.ceil(totalMass / payload);

  const satCapex = totalNodes * 10e6;
  const launchCapex = totalMass * launchCostKg;
  const tetherCapex = petals * 30e6;
  const rsvCapex = Math.ceil(petals / 5) * 500e6;
  const otherCapex = (satCapex + launchCapex + tetherCapex + rsvCapex) * 0.15;
  const totalCapex = satCapex + launchCapex + tetherCapex + rsvCapex + otherCapex;

  document.getElementById('kpi-petals').textContent = petals.toLocaleString();
  document.getElementById('kpi-sats').textContent = totalNodes.toLocaleString();
  document.getElementById('kpi-launches').textContent = launches.toLocaleString();
  document.getElementById('kpi-capex').textContent = fmtUSD(totalCapex);

  if (consChart) consChart.destroy();
  consChart = new Chart(consChartCtx, {
    type: 'bar',
    data: {
      labels: ['Satellites', 'Launches', 'Tethers + integration', 'Servicer fleet', 'Other (15%)'],
      datasets: [{
        data: [satCapex / 1e9, launchCapex / 1e9, tetherCapex / 1e9, rsvCapex / 1e9, otherCapex / 1e9],
        backgroundColor: ['#ff6b3d', '#6ec9d9', '#a89bd9', '#7fb685', '#d4a574'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#1a2030', padding: 12, callbacks: { label: c => '$' + c.parsed.x.toFixed(2) + 'B' } }
      },
      scales: {
        x: { grid: { color: '#1a2030' }, ticks: { color: '#969cae', callback: v => '$' + v.toFixed(1) + 'B' } },
        y: { grid: { color: '#1a2030' }, ticks: { color: '#e8eaf0' } }
      }
    }
  });
}

// ============= MOE DESIGNER =============
const expertTypes = {
  vision: ['Vision', 'Image+video understanding'],
  math: ['Math/Code', 'Reasoning, science'],
  climate: ['Climate', 'Earth systems modeling'],
  compress: ['Compression', 'Embeddings, summarization'],
  distill: ['Distillation', 'Smaller-model teacher'],
  safety: ['Safety', 'Output filtering'],
  checkpoint: ['Checkpoint', 'Weight backup'],
  general: ['General', 'Fallback expert']
};

const workloadActivations = {
  vision: ['vision', 'vision', 'vision', 'compress', 'safety'],
  math: ['math', 'math', 'math', 'distill', 'safety'],
  climate: ['climate', 'climate', 'vision', 'compress', 'safety'],
  distill: ['distill', 'distill', 'math', 'general', 'safety'],
  multi: ['vision', 'math', 'climate', 'compress', 'safety']
};

const workloadPrompts = {
  vision: '"Analyze this satellite image..."',
  math: '"Calculate orbital decay rate..."',
  climate: '"Predict North Pacific SST anomaly..."',
  distill: '"Distill 70B → 7B model..."',
  multi: '"Generate weather forecast video..."'
};

function renderMoE() {
  const modelSel = document.getElementById('moe-model');
  const modelOpt = modelSel.options[modelSel.selectedIndex];
  const totalExperts = parseInt(modelOpt.dataset.experts);
  const activeCount = parseInt(modelOpt.dataset.active);
  const workload = document.getElementById('moe-workload').value;

  const grid = document.getElementById('moe-experts');
  grid.innerHTML = '';

  // Show at most 32 experts for display
  const displayCount = Math.min(totalExperts, 32);
  const typeKeys = Object.keys(expertTypes);

  for (let i = 0; i < displayCount; i++) {
    const typeKey = typeKeys[i % typeKeys.length];
    const [name, desc] = expertTypes[typeKey];
    const div = document.createElement('div');
    div.className = 'moe-expert';
    div.dataset.type = typeKey;
    div.innerHTML = `
      <div class="moe-expert-type">${name}</div>
      <div class="moe-expert-id">E-${String(i + 1).padStart(3, '0')}</div>
      <div class="moe-expert-stat">Sat-${String((i % 12) + 1).padStart(2, '0')}</div>
    `;
    grid.appendChild(div);
  }

  if (totalExperts > 32) {
    const div = document.createElement('div');
    div.className = 'moe-expert';
    div.style.borderStyle = 'dashed';
    div.style.opacity = '0.6';
    div.innerHTML = `
      <div class="moe-expert-type">...</div>
      <div class="moe-expert-id">+${totalExperts - 32}</div>
      <div class="moe-expert-stat">more experts</div>
    `;
    grid.appendChild(div);
  }

  // Update KPIs
  document.getElementById('moe-kpi-active').textContent = activeCount + ' / ' + totalExperts;
  const sparsity = (1 - activeCount / totalExperts) * 100;
  document.getElementById('moe-kpi-bw').textContent = sparsity.toFixed(0) + '%';
  document.getElementById('moe-kpi-link').textContent = (12 + Math.random() * 20).toFixed(0) + ' Gbps';
  document.getElementById('moe-kpi-fault').textContent = activeCount >= 8 ? 'N+2' : 'N+1';

  document.getElementById('moe-router-display').textContent = workloadPrompts[workload];
}

function fireToken() {
  const workload = document.getElementById('moe-workload').value;
  const activations = workloadActivations[workload];
  const experts = document.querySelectorAll('.moe-expert');

  // Reset
  experts.forEach(e => e.classList.remove('active'));

  // Fire matching types
  let count = 0;
  experts.forEach((e, i) => {
    if (activations.includes(e.dataset.type) && count < 8) {
      setTimeout(() => e.classList.add('active'), count * 80);
      count++;
    }
  });

  // Update verdict
  const verdictMap = {
    vision: 'Vision experts dominate this token. Compression expert active for output. Safety filter mandatory.',
    math: 'Math/code experts handle the reasoning. Distillation expert ready to compress output for downlink.',
    climate: 'Climate model experts engaged. Vision expert co-activated for satellite imagery. Compression critical.',
    distill: 'Distillation experts active. Math expert provides teacher context. Output safety-filtered.',
    multi: 'Multimodal: vision + math + climate experts co-fire. Compression and safety mandatory.'
  };
  document.getElementById('moe-verdict').textContent = verdictMap[workload];
}

// ============= WORKLOAD SORTER =============
const workloadProfiles = {
  training: { latency: 1.0, compute: 0.95, locality: 0.5, batch: 0.95, privacy: 0.2, orbit: 92, reason: 'Massive compute, fully batchable, latency-tolerant.', reasonGround: 'Model checkpoints, training data staging.' },
  synth: { latency: 0.9, compute: 0.85, locality: 0.5, batch: 1.0, privacy: 0.1, orbit: 88, reason: 'Embarrassingly parallel, fully batched, no real-time constraints.', reasonGround: 'Output curation and dataset publishing.' },
  eo: { latency: 0.7, compute: 0.7, locality: 0.95, batch: 0.85, privacy: 0.3, orbit: 95, reason: 'Data already in orbit. Processing at the source eliminates downlink bottleneck.', reasonGround: 'Final result API serving.' },
  climate: { latency: 0.85, compute: 0.9, locality: 0.4, batch: 0.95, privacy: 0.2, orbit: 80, reason: 'Massive batch jobs, compute-heavy, days/weeks runtime fine.', reasonGround: 'Result visualization and storage.' },
  chat: { latency: 0.05, compute: 0.3, locality: 0.2, batch: 0.1, privacy: 0.6, orbit: 8, reason: 'Real-time chat requires sub-second latency. Wrong orbit physics.', reasonGround: 'Every aspect: latency, privacy, query routing.' },
  hft: { latency: 0.0, compute: 0.5, locality: 0.1, batch: 0.0, privacy: 0.95, orbit: 0, reason: 'Microsecond latency requirement. Physically impossible in orbit.', reasonGround: 'Entire workload. Co-located with exchange.' },
  video: { latency: 0.1, compute: 0.2, locality: 0.3, batch: 0.0, privacy: 0.5, orbit: 5, reason: 'Real-time, low latency, encoded for delivery.', reasonGround: 'Entire pipeline. Edge CDN appropriate.' },
  db: { latency: 0.15, compute: 0.2, locality: 0.4, batch: 0.2, privacy: 0.85, orbit: 3, reason: 'Transactional consistency, low latency, often private data.', reasonGround: 'All transactional load. Regional replication.' }
};

function updateSorter(preset) {
  const p = workloadProfiles[preset];
  if (!p) return;

  // Update bars
  document.getElementById('bar-latency').style.transform = `scaleX(${p.latency})`;
  document.getElementById('val-latency').textContent = p.latency > 0.5 ? 'High' : p.latency > 0.2 ? 'Med' : 'Low';

  document.getElementById('bar-compute').style.transform = `scaleX(${p.compute})`;
  document.getElementById('val-compute').textContent = p.compute > 0.7 ? 'High' : p.compute > 0.3 ? 'Med' : 'Low';

  document.getElementById('bar-locality').style.transform = `scaleX(${p.locality})`;
  document.getElementById('val-locality').textContent = p.locality > 0.7 ? 'Orbit' : p.locality > 0.4 ? 'Mixed' : 'Ground';

  document.getElementById('bar-batch').style.transform = `scaleX(${p.batch})`;
  document.getElementById('val-batch').textContent = p.batch > 0.7 ? 'High' : p.batch > 0.3 ? 'Med' : 'Low';

  document.getElementById('bar-privacy').style.transform = `scaleX(${p.privacy})`;
  document.getElementById('val-privacy').textContent = p.privacy > 0.7 ? 'High' : p.privacy > 0.3 ? 'Med' : 'Low';

  document.getElementById('bucket-orbit').textContent = p.orbit + '%';
  document.getElementById('bucket-ground').textContent = (100 - p.orbit) + '%';
  document.getElementById('reason-orbit').textContent = p.reason;
  document.getElementById('reason-ground').textContent = p.reasonGround;

  let verdict = '';
  if (p.orbit > 80) verdict = 'Strongly favors orbital. <em>Deploy the heavy lift to space</em>, keep thin orchestration on the ground.';
  else if (p.orbit > 40) verdict = 'Hybrid workload. <em>Split deliberately</em> — orbital tier captures the batch portion, ground handles user-facing slice.';
  else if (p.orbit > 10) verdict = 'Mostly ground. <em>Orbital is a niche</em> for this workload — only specific subroutines worth offshoring.';
  else verdict = 'Physically unsuited for orbit. <em>Stay terrestrial</em>. Real-time or privacy constraints make orbit a poor fit.';
  document.getElementById('sorter-verdict').innerHTML = verdict;
}

document.querySelectorAll('.workload-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.workload-preset').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateSorter(btn.dataset.preset);
  });
});

// ============= BURST SCHEDULER =============
const schedulerStrategies = {
  naive: { name: 'Naive', peak: 100, avg: 100, mass: 0, savings: 0, verdict: 'Constant load. Radiator sized for worst-case continuous heat. <em>Wasteful</em>.' },
  solar: { name: 'Solar-only', peak: 100, avg: 95, mass: 5, savings: 0.05, verdict: 'Loads during sunlit periods only. Modest savings but ignores thermal opportunities.' },
  thermal: { name: 'Thermal-aware', peak: 100, avg: 65, mass: 35, savings: 0.35, verdict: 'Bursts during cold-side terminator passes. <em>Radiator shrinks 35% per node</em>.' },
  full: { name: 'Full', peak: 100, avg: 58, mass: 42, savings: 0.42, verdict: 'Thermal-aware bursts + eclipse-period housekeeping. <em>42% mass savings</em>, eclipse-tolerant inference.' }
};

const orbitConfigs = {
  'dawn-dusk': { sunlit: 95, terminator: 0, eclipse: 5 },
  'sso-noon': { sunlit: 65, terminator: 0, eclipse: 35 },
  'leo': { sunlit: 60, terminator: 0, eclipse: 40 }
};

let schedThermalChart = null;

function renderScheduler() {
  const strategy = document.getElementById('sched-strategy').value;
  const orbit = document.getElementById('sched-orbit').value;
  const s = schedulerStrategies[strategy];
  const o = orbitConfigs[orbit];

  // Build orbit timeline
  const timeline = document.getElementById('orbit-timeline');
  timeline.innerHTML = '';

  if (orbit === 'dawn-dusk') {
    timeline.innerHTML = `
      <div class="orbit-segment orbit-sunlit" style="left: 0; width: 47.5%;">Sunlit</div>
      <div class="orbit-segment orbit-terminator" style="left: 47.5%; width: 5%;">Dusk</div>
      <div class="orbit-segment orbit-sunlit" style="left: 52.5%; width: 42.5%;">Sunlit</div>
      <div class="orbit-segment orbit-eclipse" style="left: 95%; width: 5%;">Ecl</div>
    `;
  } else if (orbit === 'sso-noon') {
    timeline.innerHTML = `
      <div class="orbit-segment orbit-sunlit" style="left: 0; width: 32%;">Sunlit</div>
      <div class="orbit-segment orbit-terminator" style="left: 32%; width: 3%;">T</div>
      <div class="orbit-segment orbit-eclipse" style="left: 35%; width: 30%;">Eclipse</div>
      <div class="orbit-segment orbit-terminator" style="left: 65%; width: 3%;">T</div>
      <div class="orbit-segment orbit-sunlit" style="left: 68%; width: 32%;">Sunlit</div>
    `;
  } else {
    timeline.innerHTML = `
      <div class="orbit-segment orbit-sunlit" style="left: 0; width: 30%;">Sunlit</div>
      <div class="orbit-segment orbit-terminator" style="left: 30%; width: 2%;">T</div>
      <div class="orbit-segment orbit-eclipse" style="left: 32%; width: 36%;">Eclipse</div>
      <div class="orbit-segment orbit-terminator" style="left: 68%; width: 2%;">T</div>
      <div class="orbit-segment orbit-sunlit" style="left: 70%; width: 30%;">Sunlit</div>
    `;
  }

  // Build compute track
  const track = document.getElementById('sched-compute-track');
  track.innerHTML = '<div class="scheduler-track-label">Compute</div>';

  let tasks = [];
  if (strategy === 'naive') {
    tasks = [{ left: 0, width: 100, type: 'normal', label: '100% load' }];
  } else if (strategy === 'solar') {
    if (orbit === 'dawn-dusk') tasks = [{ left: 0, width: 95, type: 'normal', label: 'Run' }];
    else tasks = [{ left: 0, width: 32, type: 'normal', label: 'Run' }, { left: 68, width: 32, type: 'normal', label: 'Run' }];
  } else if (strategy === 'thermal') {
    // Burst at terminators when present
    if (orbit === 'dawn-dusk') {
      tasks = [
        { left: 0, width: 45, type: 'normal', label: 'Light' },
        { left: 47, width: 6, type: 'burst', label: 'BURST' },
        { left: 53, width: 42, type: 'normal', label: 'Light' }
      ];
    } else {
      tasks = [
        { left: 0, width: 30, type: 'normal', label: 'Light' },
        { left: 31, width: 5, type: 'burst', label: 'BURST' },
        { left: 65, width: 5, type: 'burst', label: 'BURST' },
        { left: 70, width: 30, type: 'normal', label: 'Light' }
      ];
    }
  } else { // full
    if (orbit === 'dawn-dusk') {
      tasks = [
        { left: 0, width: 45, type: 'normal', label: 'Inference' },
        { left: 47, width: 6, type: 'burst', label: 'BURST' },
        { left: 53, width: 42, type: 'normal', label: 'Inference' },
        { left: 95, width: 5, type: 'idle', label: 'Route' }
      ];
    } else {
      tasks = [
        { left: 0, width: 30, type: 'normal', label: 'Inference' },
        { left: 31, width: 5, type: 'burst', label: 'BURST' },
        { left: 36, width: 28, type: 'idle', label: 'Memory + route' },
        { left: 65, width: 5, type: 'burst', label: 'BURST' },
        { left: 70, width: 30, type: 'normal', label: 'Inference' }
      ];
    }
  }

  tasks.forEach(t => {
    const div = document.createElement('div');
    div.className = 'scheduler-task ' + t.type;
    div.style.left = t.left + '%';
    div.style.width = t.width + '%';
    div.textContent = t.label;
    track.appendChild(div);
  });

  // Build thermal chart
  const ctx = document.getElementById('sched-thermal-chart').getContext('2d');
  if (schedThermalChart) schedThermalChart.destroy();

  // 20-point curve representing radiator temp over orbital period
  const labels = Array.from({length: 20}, (_, i) => i);
  let tempCurve;
  if (strategy === 'naive') tempCurve = labels.map(() => 60 + Math.random() * 4);
  else if (strategy === 'solar') tempCurve = labels.map(i => i < 19 ? 58 + Math.random() * 3 : 35);
  else if (strategy === 'thermal') tempCurve = labels.map(i => {
    if (i === 9 || i === 10) return 75; // burst
    return 40 + Math.random() * 6;
  });
  else tempCurve = labels.map(i => {
    if (i === 6 || i === 13) return 78; // bursts
    if (i >= 7 && i <= 12) return 22 + Math.random() * 4; // eclipse low temp
    return 36 + Math.random() * 4;
  });

  schedThermalChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: tempCurve,
        borderColor: '#ff6b3d',
        backgroundColor: 'rgba(255, 107, 61, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { grid: { color: '#1a2030' }, ticks: { color: '#969cae', font: { size: 9 }, callback: v => v + '°C' }, min: 0, max: 100 }
      }
    }
  });

  // KPIs
  document.getElementById('sched-kpi-peak').textContent = s.peak + '%';
  document.getElementById('sched-kpi-avg').textContent = s.avg + '%';
  document.getElementById('sched-kpi-mass').textContent = Math.round(s.mass) + '%';
  const savings = s.savings * 100 * 4.4; // $4.4M per node × 50 MW × 10 nodes × % savings
  document.getElementById('sched-kpi-savings').textContent = '$' + Math.round(savings) + 'M';

  document.getElementById('sched-verdict').innerHTML = s.verdict;
}

// ============= MULTI-VENDOR ROUTER =============
const providers = [
  { name: 'ADA Space', region: 'CN', basePrice: 1.20, baseLatency: 8, capacity: 0.6, sovereign: 'cn' },
  { name: 'Starcloud', region: 'US', basePrice: 2.40, baseLatency: 4, capacity: 0.25, sovereign: 'us' },
  { name: 'SpaceX AI Sat', region: 'US', basePrice: 1.80, baseLatency: 3, capacity: 0.85, sovereign: 'us' },
  { name: 'Google Suncatcher', region: 'US', basePrice: 3.50, baseLatency: 12, capacity: 0.4, sovereign: 'us' },
  { name: 'Sophia Space', region: 'US', basePrice: 2.10, baseLatency: 6, capacity: 0.15, sovereign: 'us' },
  { name: 'Astro-Future', region: 'CN', basePrice: 1.40, baseLatency: 7, capacity: 0.3, sovereign: 'cn' }
];

function renderRouter() {
  const hours = parseFloat(document.getElementById('route-hours').value);
  const latency = parseFloat(document.getElementById('route-latency').value);
  const priority = document.getElementById('route-priority').value;

  document.getElementById('route-hours-label').textContent = hours.toLocaleString();
  document.getElementById('route-latency-label').textContent = latency + ' min';

  // Filter providers
  let eligible = providers.filter(p => p.baseLatency <= latency);
  if (priority === 'sovereign') eligible = eligible.filter(p => p.sovereign !== 'cn');
  if (priority === 'cn-only') eligible = eligible.filter(p => p.sovereign === 'cn');

  // Sort by priority
  if (priority === 'cheap') eligible.sort((a, b) => a.basePrice - b.basePrice);
  else if (priority === 'fast') eligible.sort((a, b) => a.baseLatency - b.baseLatency);

  // Allocate
  let remaining = hours;
  const allocations = [];
  const maxPerProvider = priority === 'diverse' ? hours / Math.max(2, eligible.length) : Infinity;

  eligible.forEach(p => {
    if (remaining <= 0) return;
    const maxAlloc = Math.min(p.capacity * 1500, maxPerProvider);
    const alloc = Math.min(remaining, maxAlloc);
    if (alloc > 0) {
      allocations.push({ ...p, hours: alloc });
      remaining -= alloc;
    }
  });

  const totalCost = allocations.reduce((s, a) => s + a.hours * a.basePrice, 0);
  const avgLatency = allocations.length ? allocations.reduce((s, a) => s + a.baseLatency * a.hours, 0) / hours : 0;
  const take = totalCost * 0.20;

  document.getElementById('route-kpi-matched').textContent = allocations.length + ' / ' + providers.length;
  document.getElementById('route-kpi-cost').textContent = '$' + (totalCost - take).toFixed(0);
  document.getElementById('route-kpi-latency').textContent = avgLatency.toFixed(1) + ' min';
  document.getElementById('route-kpi-take').textContent = '$' + take.toFixed(0);

  const container = document.getElementById('routing-providers');
  container.innerHTML = '';

  providers.forEach(p => {
    const isRouted = allocations.find(a => a.name === p.name);
    const row = document.createElement('div');
    row.className = 'routing-provider' + (isRouted ? ' routed' : '');
    const cap = isRouted ? isRouted.hours / hours : p.capacity;
    row.innerHTML = `
      <div>
        <div class="routing-name">${p.name}</div>
        <div style="font-family: var(--mono); font-size: 10px; color: var(--text-3); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px;">${p.region}</div>
      </div>
      <div class="routing-capacity-bar"><div class="routing-capacity-fill" style="transform: scaleX(${cap})"></div></div>
      <div class="routing-price">$${p.basePrice.toFixed(2)}/hr</div>
      <div class="routing-latency">${p.baseLatency} min</div>
      <div class="routing-status ${isRouted ? 'routed' : ''}">${isRouted ? Math.round((isRouted.hours / hours) * 100) + '%' : 'idle'}</div>
    `;
    container.appendChild(row);
  });

  // Verdict
  let verdict;
  if (!allocations.length) verdict = 'No providers meet your constraints. <em>Loosen latency or change priority filter</em>.';
  else if (allocations.length === 1) verdict = `Single provider <em>${allocations[0].name}</em> wins the workload at $${allocations[0].basePrice}/hr.`;
  else {
    const names = allocations.slice(0, 3).map(a => a.name).join(', ');
    verdict = `Routed across <em>${allocations.length} providers</em>. ${names} take the majority. Cross-vendor failover built in.`;
  }
  document.getElementById('route-verdict').innerHTML = verdict;
}

// ============= INFRASTRUCTURE ARCHITECT WIZARD =============
const wizardState = {
  step: 0,
  budget: null,
  capacity: null,
  timeline: null,
  constraints: []
};

const wizardSteps = [
  {
    title: 'What\'s your <em>budget</em>?',
    hint: 'Total capex available for the build over its expected lifetime.',
    type: 'options',
    key: 'budget',
    options: [
      { value: 'small', label: '$500M – $2B', sub: 'Sovereign / mid-tier' },
      { value: 'medium', label: '$2B – $10B', sub: 'Hyperscaler tier 2' },
      { value: 'large', label: '$10B – $50B', sub: 'Frontier lab scale' },
      { value: 'mega', label: '$50B+', sub: 'Hyperscaler tier 1' }
    ]
  },
  {
    title: 'How much <em>compute</em> do you need?',
    hint: 'Target inference-equivalent capacity at full deployment.',
    type: 'options',
    key: 'capacity',
    options: [
      { value: 'pilot', label: '50 – 200 MW', sub: 'Pilot deployment' },
      { value: 'production', label: '200 MW – 1 GW', sub: 'Production scale' },
      { value: 'hyperscale', label: '1 – 5 GW', sub: 'Hyperscale build' },
      { value: 'gigascale', label: '5+ GW', sub: 'Frontier infrastructure' }
    ]
  },
  {
    title: 'What\'s your <em>timeline</em>?',
    hint: 'When do you need first capacity online and reach full operation?',
    type: 'options',
    key: 'timeline',
    options: [
      { value: 'aggressive', label: 'First MW &lt; 12 months', sub: 'Aggressive' },
      { value: 'standard', label: 'First MW in 18–24 months', sub: 'Standard' },
      { value: 'phased', label: '3–5 year phased rollout', sub: 'Phased' },
      { value: 'longview', label: '5–10 year horizon', sub: 'Long-view' }
    ]
  },
  {
    title: 'Any <em>constraints</em>?',
    hint: 'Select all that apply. The wizard prioritizes designs that satisfy these.',
    type: 'multi',
    key: 'constraints',
    options: [
      { value: 'sovereign', label: 'Sovereign data residency', sub: 'No CN, no US-only' },
      { value: 'green', label: 'Green / low-carbon power', sub: 'Carbon-aware' },
      { value: 'resilience', label: 'Multi-region resilience', sub: 'No single point' },
      { value: 'gridfree', label: 'Grid-independent', sub: 'Solar / off-grid' },
      { value: 'rapid', label: 'Rapid refresh cycles', sub: 'Chip generation churn' },
      { value: 'sec', label: 'Classified / secure', sub: 'Defense workloads' }
    ]
  },
  {
    title: 'Recommended <em>design alternatives</em>',
    hint: 'Three architectures ranked for your inputs. The highest-ranked one is recommended.',
    type: 'results'
  }
];

function renderWizard() {
  const step = wizardSteps[wizardState.step];
  const panel = document.getElementById('wizard-panel');

  // Update step indicators
  document.querySelectorAll('.wizard-step').forEach((el, i) => {
    el.classList.toggle('active', i === wizardState.step);
    el.classList.toggle('done', i < wizardState.step);
  });

  document.getElementById('wizard-step-current').textContent = wizardState.step + 1;
  document.getElementById('wizard-back').disabled = wizardState.step === 0;

  const nextBtn = document.getElementById('wizard-next');
  nextBtn.textContent = wizardState.step === wizardSteps.length - 1 ? 'Start over ↻' : 'Continue →';

  if (step.type === 'options' || step.type === 'multi') {
    let html = `<div class="wizard-panel-title">${step.title}</div>`;
    html += `<div class="wizard-panel-hint">${step.hint}</div>`;
    html += `<div class="wizard-options">`;
    step.options.forEach(opt => {
      const selected = step.type === 'multi'
        ? wizardState.constraints.includes(opt.value)
        : wizardState[step.key] === opt.value;
      html += `<button class="wizard-option ${selected ? 'selected' : ''}" data-value="${opt.value}" data-key="${step.key}" data-type="${step.type}">
        <div class="wizard-option-label">${opt.label}</div>
        <div class="wizard-option-sub">${opt.sub}</div>
      </button>`;
    });
    html += `</div>`;
    panel.innerHTML = html;

    panel.querySelectorAll('.wizard-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        const key = btn.dataset.key;
        const type = btn.dataset.type;
        if (type === 'multi') {
          const idx = wizardState.constraints.indexOf(val);
          if (idx >= 0) wizardState.constraints.splice(idx, 1);
          else wizardState.constraints.push(val);
        } else {
          wizardState[key] = val;
        }
        renderWizard();
      });
    });

    document.getElementById('wizard-verdict-box').style.display = 'none';
  } else if (step.type === 'results') {
    renderWizardResults();
  }
}

function renderWizardResults() {
  const panel = document.getElementById('wizard-panel');
  const { budget, capacity, timeline, constraints } = wizardState;

  // Three design alternatives, scored on the inputs
  const designs = [
    {
      name: 'Terrestrial liquid-cooled campus',
      type: 'Ground · proven',
      cost: { small: 0.9, medium: 0.95, large: 1.0, mega: 1.0 }[budget] || 1.0,
      speed: { aggressive: 1.0, standard: 1.0, phased: 0.95, longview: 0.85 }[timeline] || 0.9,
      capacity_fit: 1.0,
      sovereign: constraints.includes('sovereign') ? 0.9 : 1.0,
      green: constraints.includes('green') ? 0.7 : 1.0,
      resilience: constraints.includes('resilience') ? 0.8 : 1.0,
      rapid: constraints.includes('rapid') ? 0.95 : 1.0,
      stats: { capex: { small: '$1.2B', medium: '$4.5B', large: '$18B', mega: '$60B' }[budget],
               timeline: { aggressive: '14 mo', standard: '20 mo', phased: '36 mo', longview: '60 mo' }[timeline],
               risk: 'Low', tco: '1.0×' },
      desc: 'Proven liquid-cooled hyperscale architecture. Lowest risk, fastest deployment, well-understood economics. Choose this unless you have a specific reason to leave Earth.'
    },
    {
      name: 'Hybrid Earth-orbit',
      type: 'Hybrid · emerging',
      cost: 0.85,
      speed: { aggressive: 0.6, standard: 0.85, phased: 1.0, longview: 1.0 }[timeline] || 0.8,
      capacity_fit: { pilot: 0.95, production: 0.9, hyperscale: 0.85, gigascale: 0.75 }[capacity] || 0.85,
      sovereign: constraints.includes('sovereign') ? 0.95 : 1.0,
      green: constraints.includes('green') ? 1.0 : 1.0,
      resilience: constraints.includes('resilience') ? 1.0 : 1.0,
      rapid: constraints.includes('rapid') ? 0.85 : 1.0,
      stats: { capex: { small: '$1.5B', medium: '$5.5B', large: '$22B', mega: '$75B' }[budget],
               timeline: { aggressive: '22 mo', standard: '30 mo', phased: '48 mo', longview: '72 mo' }[timeline],
               risk: 'Med', tco: '1.15×' },
      desc: 'Ground campus handles latency-critical inference and customer APIs. SSO solar cluster handles training and synthetic data. Best of both physics regimes.'
    },
    {
      name: 'Pure orbital constellation',
      type: 'Orbit · frontier',
      cost: 0.5,
      speed: { aggressive: 0.2, standard: 0.5, phased: 0.9, longview: 1.0 }[timeline] || 0.7,
      capacity_fit: { pilot: 1.0, production: 0.85, hyperscale: 0.6, gigascale: 0.4 }[capacity] || 0.7,
      sovereign: constraints.includes('sovereign') ? 0.85 : 1.0,
      green: constraints.includes('green') ? 1.0 : 1.0,
      resilience: 0.95,
      rapid: constraints.includes('rapid') ? 0.6 : 1.0,
      stats: { capex: { small: '$2.5B', medium: '$11B', large: '$45B', mega: '$150B' }[budget],
               timeline: { aggressive: '36 mo', standard: '48 mo', phased: '72 mo', longview: '96 mo' }[timeline],
               risk: 'High', tco: '2.4×' },
      desc: 'Fully space-based. Sovereign-defensible, grid-independent, solar-powered. Niche today, viable when launch costs drop below $500/kg.'
    }
  ];

  // Score each
  designs.forEach(d => {
    d.score = (d.cost * d.speed * d.capacity_fit * d.sovereign * d.green * d.resilience * d.rapid * 100);
  });

  designs.sort((a, b) => b.score - a.score);

  let html = `<div class="wizard-panel-title">${wizardSteps[4].title}</div>`;
  html += `<div class="wizard-panel-hint">${wizardSteps[4].hint}</div>`;

  designs.forEach((d, i) => {
    html += `
      <div class="wizard-result-card ${i === 0 ? 'recommended' : ''}">
        <div class="wizard-result-title">
          <div class="wizard-result-name">${d.name}</div>
          <div class="wizard-result-badge">${i === 0 ? 'Recommended · ' + d.score.toFixed(0) + '/100' : 'Alt #' + i + ' · ' + d.score.toFixed(0) + '/100'}</div>
        </div>
        <div class="wizard-result-stats">
          <div><div class="wizard-result-stat-label">Type</div><div class="wizard-result-stat-val" style="font-size: 14px; font-family: var(--mono);">${d.type}</div></div>
          <div><div class="wizard-result-stat-label">Est. capex</div><div class="wizard-result-stat-val">${d.stats.capex || '—'}</div></div>
          <div><div class="wizard-result-stat-label">Timeline</div><div class="wizard-result-stat-val">${d.stats.timeline || '—'}</div></div>
          <div><div class="wizard-result-stat-label">Risk · TCO mult</div><div class="wizard-result-stat-val">${d.stats.risk} · ${d.stats.tco}</div></div>
        </div>
        <div class="wizard-result-desc">${d.desc}</div>
      </div>
    `;
  });

  document.getElementById('wizard-panel').innerHTML = html;

  // Verdict
  const winner = designs[0];
  document.getElementById('wizard-verdict-box').style.display = 'block';
  document.getElementById('wizard-verdict').innerHTML = `Based on your inputs the architect recommends <em>${winner.name}</em>. ${winner.desc.split('.')[0]}. Clone the matching reference design in module 10 to get full specs.`;
}

document.getElementById('wizard-next').addEventListener('click', () => {
  if (wizardState.step === wizardSteps.length - 1) {
    // Reset
    wizardState.step = 0;
    wizardState.budget = null;
    wizardState.capacity = null;
    wizardState.timeline = null;
    wizardState.constraints = [];
  } else {
    wizardState.step++;
  }
  renderWizard();
});

document.getElementById('wizard-back').addEventListener('click', () => {
  if (wizardState.step > 0) {
    wizardState.step--;
    renderWizard();
  }
});

// ============= RISK & REGULATORY ENGINE =============
const riskProfiles = {
  ground: {
    reg: [
      { name: 'Power purchase agreement (PPA) delays', prob: 0.35, costPct: 0.08 },
      { name: 'Environmental permitting', prob: 0.25, costPct: 0.04 },
      { name: 'Grid interconnection slip', prob: 0.45, costPct: 0.06 },
      { name: 'Local zoning / political', prob: 0.15, costPct: 0.05 },
      { name: 'Insurance underwriting', prob: 0.20, costPct: 0.02 }
    ],
    tech: [
      { name: 'Cooling supply chain delay', prob: 0.40, costPct: 0.04 },
      { name: 'Chip allocation shortage', prob: 0.55, costPct: 0.07 },
      { name: 'Power transformer delay', prob: 0.50, costPct: 0.05 },
      { name: 'Construction overrun', prob: 0.60, costPct: 0.10 }
    ],
    baseDelay: 8
  },
  orbital: {
    reg: [
      { name: 'ITU spectrum coordination', prob: 0.40, costPct: 0.05 },
      { name: 'Export control (ITAR/EAR)', prob: 0.30, costPct: 0.04 },
      { name: 'Launch licensing (FAA/equiv.)', prob: 0.45, costPct: 0.03 },
      { name: 'Debris mitigation rules', prob: 0.50, costPct: 0.04 },
      { name: 'Insurance / launch underwriting', prob: 0.60, costPct: 0.08 }
    ],
    tech: [
      { name: 'Launch vehicle delay', prob: 0.65, costPct: 0.12 },
      { name: 'Satellite manufacturing slip', prob: 0.50, costPct: 0.08 },
      { name: 'On-orbit failure (sat loss)', prob: 0.20, costPct: 0.06 },
      { name: 'Thermal anomaly', prob: 0.30, costPct: 0.03 },
      { name: 'Ground station coordination', prob: 0.40, costPct: 0.04 }
    ],
    baseDelay: 14
  },
  hybrid: {
    reg: [
      { name: 'Cross-jurisdiction data flow', prob: 0.35, costPct: 0.06 },
      { name: 'Ground PPA delays', prob: 0.30, costPct: 0.05 },
      { name: 'Spectrum coordination', prob: 0.35, costPct: 0.04 },
      { name: 'Sovereign data residency conflicts', prob: 0.25, costPct: 0.07 },
      { name: 'Launch + ground insurance', prob: 0.45, costPct: 0.05 }
    ],
    tech: [
      { name: 'Integration complexity', prob: 0.55, costPct: 0.09 },
      { name: 'Earth-orbit handoff latency', prob: 0.40, costPct: 0.04 },
      { name: 'Workload scheduler bugs', prob: 0.35, costPct: 0.03 },
      { name: 'Multi-vendor coordination', prob: 0.50, costPct: 0.06 }
    ],
    baseDelay: 11
  },
  sovereign: {
    reg: [
      { name: 'Security clearance lifecycle', prob: 0.60, costPct: 0.10 },
      { name: 'Classified supply chain audit', prob: 0.50, costPct: 0.07 },
      { name: 'Personnel vetting delays', prob: 0.55, costPct: 0.04 },
      { name: 'Cross-border data restrictions', prob: 0.35, costPct: 0.06 },
      { name: 'Compliance recertification', prob: 0.40, costPct: 0.05 }
    ],
    tech: [
      { name: 'Bespoke crypto integration', prob: 0.45, costPct: 0.08 },
      { name: 'Air-gap operational complexity', prob: 0.50, costPct: 0.06 },
      { name: 'Classified facility build', prob: 0.55, costPct: 0.12 },
      { name: 'Chip sovereignty constraints', prob: 0.30, costPct: 0.05 }
    ],
    baseDelay: 12
  }
};

const regionMultipliers = {
  us: 1.0, eu: 1.15, cn: 0.85, me: 0.95, sg: 0.90, in: 1.05
};

const insuranceMultipliers = [1.3, 1.0, 0.85, 0.6]; // less coverage = more out-of-pocket risk
const insuranceLabels = ['None', 'Standard', 'Enhanced', 'Sovereign'];

function updateRisk() {
  const arch = document.getElementById('risk-arch').value;
  const capex = parseFloat(document.getElementById('risk-capex').value);
  const region = document.getElementById('risk-region').value;
  const ins = parseInt(document.getElementById('risk-ins').value);

  document.getElementById('risk-capex-label').textContent = '$' + capex.toFixed(1) + 'B';
  document.getElementById('risk-ins-label').textContent = insuranceLabels[ins];

  const profile = riskProfiles[arch];
  const regionMult = regionMultipliers[region];
  const insMult = insuranceMultipliers[ins];

  // Calculate expected risk cost
  let regCost = 0;
  profile.reg.forEach(r => { regCost += r.prob * r.costPct; });
  let techCost = 0;
  profile.tech.forEach(r => { techCost += r.prob * r.costPct; });

  const totalRiskPct = (regCost + techCost) * regionMult * insMult;
  const riskOverhead = capex * totalRiskPct;
  const adjustedTCO = capex + riskOverhead;
  const expectedDelay = Math.round(profile.baseDelay * regionMult);

  document.getElementById('risk-kpi-base').textContent = '$' + capex.toFixed(1) + 'B';
  document.getElementById('risk-kpi-overhead').textContent = '$' + riskOverhead.toFixed(2) + 'B';
  document.getElementById('risk-kpi-adj').textContent = '$' + adjustedTCO.toFixed(2) + 'B';
  document.getElementById('risk-kpi-delay').textContent = '+' + expectedDelay + ' mo';

  // Render bars
  const barCategories = [
    { label: 'Regulatory', value: regCost * regionMult * insMult },
    { label: 'Technical', value: techCost * regionMult * insMult },
    { label: 'Schedule', value: expectedDelay / 24 },
    { label: 'Insurance gap', value: 0.05 * (3 - ins) },
    { label: 'Composite', value: totalRiskPct }
  ];

  const barsHtml = barCategories.map(b => `
    <div class="risk-bar-row">
      <div class="risk-bar-label">${b.label}</div>
      <div class="risk-bar-track"><div class="risk-bar-fill" style="transform: scaleX(${Math.min(1, b.value * 2.5)});"></div></div>
      <div class="risk-bar-value" style="color: ${b.value > 0.25 ? '#e0716e' : b.value > 0.15 ? '#d4a574' : '#7fb685'}">${(b.value * 100).toFixed(1)}%</div>
    </div>
  `).join('');
  document.getElementById('risk-bars').innerHTML = barsHtml;

  // Risk lists
  function renderRiskList(items) {
    return items.map(r => {
      const cost = r.prob * r.costPct * capex;
      const sev = cost < 0.05 ? 'low' : cost < 0.20 ? 'med' : cost < 0.50 ? 'high' : 'severe';
      return `<div class="risk-item">
        <div class="risk-name">${r.name}</div>
        <div class="risk-prob">${(r.prob * 100).toFixed(0)}%</div>
        <div class="risk-cost ${sev}">$${cost.toFixed(2)}B</div>
      </div>`;
    }).join('');
  }
  document.getElementById('risk-list-reg').innerHTML = renderRiskList(profile.reg);
  document.getElementById('risk-list-tech').innerHTML = renderRiskList(profile.tech);

  // Verdict
  const ratio = riskOverhead / capex;
  let verdict;
  if (ratio < 0.15) verdict = `Risk overhead is <em>${(ratio * 100).toFixed(1)}%</em> of base capex. Well-controlled profile. Standard underwriting acceptable.`;
  else if (ratio < 0.25) verdict = `Risk overhead is <em>${(ratio * 100).toFixed(1)}%</em>. Material but manageable. Tighten insurance and phase the build to derisk.`;
  else if (ratio < 0.40) verdict = `Risk overhead is <em>${(ratio * 100).toFixed(1)}%</em> — significant. Consider phased deployment, multi-vendor strategy, sovereign insurance tier.`;
  else verdict = `Risk overhead is <em>${(ratio * 100).toFixed(1)}%</em> — savage. The arch + region + insurance combination is undertooled. Restructure before committing capital.`;
  document.getElementById('risk-verdict').innerHTML = verdict;
}

// ============= REFERENCE DESIGN LIBRARY =============
const refDesigns = [
  {
    id: 'liquid-campus',
    type: 'Terrestrial · proven',
    name: 'Liquid-cooled AI campus',
    desc: 'Standard hyperscaler liquid-cooled architecture. Direct-to-chip cooling, redundant power, multi-vendor chip allocation.',
    meta: { Scale: '1 GW', Capex: '$16B', Timeline: '24 mo' },
    detail: {
      title: 'Liquid-cooled <em>AI campus</em>',
      specs: [
        ['Capacity', '1 GW IT load'],
        ['Cooling', 'Direct-to-chip liquid · PUE 1.15'],
        ['Chip', 'NVIDIA Blackwell B200 → Rubin refresh 24mo'],
        ['Power', '850 MW solar + 150 MW grid backup'],
        ['Network', '800 Gbps InfiniBand fabric'],
        ['Location', 'Texas / Arizona · low energy cost'],
        ['Total capex', '$16B'],
        ['Operating cost', '$1.8B/yr'],
        ['Risk profile', 'Low (regulated, proven)']
      ],
      narrative: 'The default choice for hyperscale AI training. Proven architecture, well-understood supply chain, predictable economics. Liquid cooling at 30 kW/rack handles next-generation accelerators with margin. Solar+grid hybrid keeps energy cost below 4¢/kWh effective. Risk profile dominated by chip allocation timing and PPA negotiations — both well-mapped problems with standard playbooks.'
    }
  },
  {
    id: 'immersion-sovereign',
    type: 'Terrestrial · sovereign',
    name: 'Immersion-cooled sovereign center',
    desc: 'Dielectric immersion cooling for high-density AI workloads. Air-gapped, sovereign-data compliant, military-grade physical security.',
    meta: { Scale: '200 MW', Capex: '$4.5B', Timeline: '30 mo' },
    detail: {
      title: 'Immersion-cooled <em>sovereign center</em>',
      specs: [
        ['Capacity', '200 MW IT load'],
        ['Cooling', 'Two-phase immersion · PUE 1.03'],
        ['Chip', 'Domestic ASIC or licensed Blackwell-equivalent'],
        ['Power', 'Dedicated nuclear PPA (SMR)'],
        ['Network', 'Air-gapped optical fabric'],
        ['Location', 'EU / GCC / Singapore · sovereign jurisdiction'],
        ['Total capex', '$4.5B'],
        ['Operating cost', '$520M/yr'],
        ['Risk profile', 'Medium (security clearance lifecycle)']
      ],
      narrative: 'Built for sovereign AI programs that need full data residency, defense-grade security, and supply-chain independence. Immersion cooling enables 100+ kW/rack densities without water consumption — critical for arid regions. SMR-backed power eliminates grid dependence. Higher per-MW cost is the price of complete control. Risk mostly comes from personnel clearance and classified supply chain audits.'
    }
  },
  {
    id: 'leo-inference',
    type: 'Orbit · LEO',
    name: 'LEO inference swarm',
    desc: 'Disposable inference satellites in 500-700 km LEO. Earth-observation imagery processed at the source. Annual refresh cadence.',
    meta: { Scale: '50 MW · 500 sats', Capex: '$4.2B', Timeline: '36 mo' },
    detail: {
      title: 'LEO inference <em>swarm</em>',
      specs: [
        ['Capacity', '50 MW aggregate · 500 satellites'],
        ['Per-satellite', '100 kW compute · 1,600 kg'],
        ['Chip', 'SpaceX D3 or space-hardened Blackwell'],
        ['Orbit', '500-700 km LEO · 53° inclination'],
        ['Cooling', 'Deployable radiator · 180 m² per sat'],
        ['Launch', 'Starship · 10 launches @ $1,500/kg'],
        ['Total capex', '$4.2B'],
        ['Operating cost', '$320M/yr'],
        ['Risk profile', 'High (launch + on-orbit failure)']
      ],
      narrative: 'Optimized for Earth-observation workloads where data already lives in orbit. SAR and hyperspectral imagery gets processed before downlink — only the intelligence flows to Earth, not the raw petabytes. Disposable architecture (no servicing) keeps engineering simple; annual refresh cycle assumed for chip generation. Best deployed where launch cost is below $1,500/kg and customer mix is heavily EO-centric.'
    }
  },
  {
    id: 'sso-training',
    type: 'Orbit · SSO',
    name: 'SSO solar training cluster',
    desc: 'Dawn-dusk sun-synchronous orbit for batch training. 95% sunlight duty cycle, deep-radiator cold-side architecture.',
    meta: { Scale: '500 MW · 200 sats', Capex: '$22B', Timeline: '48 mo' },
    detail: {
      title: 'SSO solar <em>training cluster</em>',
      specs: [
        ['Capacity', '500 MW aggregate · 200 large satellites'],
        ['Per-satellite', '2.5 MW compute · 8,000 kg'],
        ['Chip', 'Space-hardened Rubin Ultra · 3,600W'],
        ['Orbit', '800 km dawn-dusk SSO · 98.7° inclination'],
        ['Cooling', 'Shadow-flying tethered radiator · 4,200 m²'],
        ['Launch', 'Starship 2030 · 32 launches @ $500/kg'],
        ['Total capex', '$22B'],
        ['Operating cost', '$1.4B/yr'],
        ['Risk profile', 'High (frontier technology)']
      ],
      narrative: 'The flagship orbital architecture. Dawn-dusk SSO provides 95% sunlight illumination — the highest solar duty cycle of any orbit short of the Moon. Shadow-flying tethered radiator geometry (Penn paper, 2025) keeps the cold side permanently shadowed from sun and Earth IR. Designed for training-heavy workloads that tolerate the orbital downlink bottleneck. Requires Starship-class launch economics ($500/kg) to be cost-competitive against terrestrial.'
    }
  },
  {
    id: 'zebi-lattice',
    type: 'Orbit · serviceable',
    name: 'Zebi-Lattice serviceable',
    desc: 'Tethered satellite lattice with swappable PC³ compute cassettes. Robotic Returnable Servicer Vehicle for 18-month chip refresh.',
    meta: { Scale: '100 MW · 100 nodes', Capex: '$8.5B', Timeline: '60 mo' },
    detail: {
      title: 'Zebi-Lattice <em>serviceable</em>',
      specs: [
        ['Capacity', '100 MW · 100 nodes on 10 tethers'],
        ['Per-tether', '10 petals @ 1 MW each, 1 km tether'],
        ['Cassette', 'PC³ swappable · 18-24 month refresh'],
        ['Servicer', 'Returnable Servicer Vehicle · 1 per 5 tethers'],
        ['Cooling', 'Shadow-flying radiator-as-structure'],
        ['Orbit', '700 km dawn-dusk SSO'],
        ['Total capex', '$8.5B'],
        ['Operating cost', '$640M/yr (incl. RSV ops)'],
        ['Risk profile', 'Severe (multiple firsts)']
      ],
      narrative: 'The HelioMind hardware thesis if and only if Phase C succeeds. Serviceability solves the chip-refresh problem that kills disposable architectures: instead of relaunching the whole satellite when a new GPU generation ships, the RSV swaps just the compute cassette. Per-cycle refresh capex drops ~70%. Several engineering firsts: robotic on-orbit cassette swap, tethered formation flight at 1 km scale, deployable radiator wings as structural elements. Not for the faint of heart — but the only orbital architecture with a credible path to terrestrial cost parity.'
    }
  },
  {
    id: 'deep-space',
    type: 'Moonshot · research',
    name: 'Deep-Space Photonic Matrix',
    desc: 'Earth-Moon L2 cryogenic photonic compute. ISRU manufactured structures, self-healing robotic infrastructure. 30-year horizon.',
    meta: { Scale: 'Research', Capex: 'TBD', Timeline: '20+ yr' },
    detail: {
      title: 'Deep-Space <em>Photonic Matrix</em>',
      specs: [
        ['Location', 'Earth-Moon L2 Lagrange point'],
        ['Compute', 'Photonic + superconducting cryogenic'],
        ['Operating temp', '< 77 K (sunshielded)'],
        ['Structure', 'In-space manufactured (ISRU)'],
        ['Operations', 'Self-healing robotic'],
        ['Timeline', '20-30 years to first prototype'],
        ['Status', 'Research pathway only'],
        ['Confidence', 'Low — long horizon'],
        ['Business dependency', 'None — pure thought leadership']
      ],
      narrative: 'The Deep-Space Photonic Matrix is a 30-year horizon vision, not a near-term plan. At L2 with proper sunshielding, photonic and superconducting compute architectures impossible on Earth become feasible. In-space manufacturing via ISRU enables structures dramatically larger than any launch vehicle could lift. Self-healing robotics handle the operational lifecycle without human crews. Important caveat: deep-space cold does not make heat disappear; generated heat still requires real radiator geometry. We treat this as research pathway informing the architecture, not a hardware commitment. HelioMind\'s business case is fully viable without any of this happening.'
    }
  }
];

let selectedRefDesign = 'liquid-campus';

function renderRefLibrary() {
  const grid = document.getElementById('ref-design-grid');
  grid.innerHTML = refDesigns.map(d => `
    <div class="ref-design-card ${d.id === selectedRefDesign ? 'selected' : ''}" data-id="${d.id}">
      <div class="ref-design-type">${d.type}</div>
      <div class="ref-design-name">${d.name}</div>
      <div class="ref-design-desc">${d.desc}</div>
      <div class="ref-design-meta">
        ${Object.entries(d.meta).map(([k, v]) => `
          <div>
            <div class="ref-design-meta-label">${k}</div>
            <div class="ref-design-meta-value">${v}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.ref-design-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedRefDesign = card.dataset.id;
      renderRefLibrary();
    });
  });

  const d = refDesigns.find(r => r.id === selectedRefDesign);
  document.getElementById('ref-design-detail').innerHTML = `
    <div class="ref-design-detail-header">
      <div class="ref-design-detail-title">${d.detail.title}</div>
      <div class="wizard-result-badge" style="background: var(--orange); color: var(--bg);">${d.type}</div>
    </div>
    <div class="ref-design-detail-body">
      <ul class="ref-design-spec-list">
        ${d.detail.specs.map(([k, v]) => `<li><span class="key">${k}</span><span class="val">${v}</span></li>`).join('')}
      </ul>
      <div class="ref-design-narrative">
        <p>${d.detail.narrative}</p>
      </div>
    </div>
  `;
}

// ============= INIT =============
['tco-mw', 'tco-launch', 'tco-satcost', 'tco-refresh', 'tco-energy'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateTCO);
});
['th-power', 'th-emiss', 'th-solar', 'th-burst'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateThermal);
});
document.getElementById('th-chip').addEventListener('change', updateThermal);
['cons-mw', 'cons-petal', 'cons-nodemass'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateConstellation);
});
document.getElementById('cons-rocket').addEventListener('change', updateConstellation);

document.getElementById('moe-model').addEventListener('change', renderMoE);
document.getElementById('moe-workload').addEventListener('change', renderMoE);
document.getElementById('moe-send').addEventListener('click', fireToken);

document.getElementById('sched-strategy').addEventListener('change', renderScheduler);
document.getElementById('sched-orbit').addEventListener('change', renderScheduler);
document.getElementById('sched-mix').addEventListener('change', renderScheduler);
document.getElementById('sched-replay').addEventListener('click', renderScheduler);

['route-hours', 'route-latency'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderRouter);
});
document.getElementById('route-priority').addEventListener('change', renderRouter);
document.getElementById('route-submit').addEventListener('click', renderRouter);

// New v0.3 modules
['risk-capex', 'risk-ins'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateRisk);
});
document.getElementById('risk-arch').addEventListener('change', updateRisk);
document.getElementById('risk-region').addEventListener('change', updateRisk);

// Active section highlighting
const sections = document.querySelectorAll('section.module');
const navPills = document.querySelectorAll('.nav-pill');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top;
    if (top <= 200) current = s.id;
  });
  navPills.forEach(p => {
    p.classList.remove('active');
    if (p.getAttribute('href') === '#' + current) p.classList.add('active');
  });
});

// Initial calls
updateTCO();
updateThermal();
updateConstellation();
renderMoE();
updateSorter('training');
renderScheduler();
renderRouter();
renderWizard();
updateRisk();
renderRefLibrary();
}
