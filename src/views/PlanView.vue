<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-brand.css'
import planImage from '@/assets/images/plan.jpg'
</script>

<template>
  <SiteHeader />
  <main class="plan-page-container">
    <div class="starfield"></div>

    <section
      class="plan-hero"
      :style="{
        backgroundImage: `linear-gradient(90deg, rgba(7, 9, 14, 0.92) 0%, rgba(7, 9, 14, 0.8) 40%, rgba(7, 9, 14, 0.56) 68%, rgba(7, 9, 14, 0.84) 100%), linear-gradient(180deg, rgba(7, 9, 14, 0.45) 0%, rgba(7, 9, 14, 0.78) 66%, rgba(7, 9, 14, 0.92) 100%), url(${planImage})`,
      }"
    >
      <div class="wrap">
        <div class="plan-hero-inner">
          <div class="section-eyebrow">Our plan</div>
          <h1 class="section-title">Four phases. <em>Forty-eight months</em>. One company.</h1>
          <p class="section-intro">
            Capital-efficient because the platform does not require us to own the satellites.
            Sequenced so each phase is funded by the prior phase's revenue, not the next phase's
            dilution.
          </p>
        </div>
      </div>
    </section>

    <section
      id="roadmap"
      class="plan-roadmap"
    >
      <div class="wrap">
        <div class="phases">
          <div class="phase-row">
            <div class="phase-id">
              phase A
              <span class="big">01</span>
            </div>
            <div class="phase-content">
              <h3>Build the platform.</h3>
              <div class="phase-meta">Months <span>0-9</span> · $4M pre-seed · team of 6</div>
              <p>
                Ship HelioMind OS v1.0 with all ten modules in functional form. Sign three paid
                design contracts ($200-500k each) with a sovereign AI program, an emerging orbital
                builder, and one hyperscaler scenario-planning team.
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
              <div class="phase-meta">Months <span>9-24</span> · $20M seed · team of 25</div>
              <p>
                Convert one of OpenAI, Anthropic, Google, Microsoft, Meta, xAI, or a Chinese
                frontier lab into a multi-year platform license. Expand to 15-25 active customers.
                Ship Orbital MoE Designer as the marquee differentiated module.
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
              <div class="phase-meta">Months <span>24-48</span> · $60M Series A · team of 80</div>
              <p>
                HelioMind referenced in every serious AI infrastructure design document globally.
                50+ enterprise customers, 5+ sovereign deployments. Open-source the Workload
                Sorter; proprietary modules drive licensing revenue on top of SaaS.
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
                Only after Phase C is firmly profitable. Operate a small reference orbital cluster
                (10-50 MW) to validate our designs publicly. Expand into chip-design adjacency.
                Strategic conversation with Cadence/Synopsys-class acquirers.
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
  </main>
  <SiteFooter />
</template>

<style scoped>
.plan-page-container {
  --bg: #07090e;
  --bg-2: #0c1018;
  --surface: #1a2030;
  --border: #1f2638;
  --text: #e8eaf0;
  --text-2: #969cae;
  --text-3: #5a6178;
  --orange: #ff6b3d;
  --display: 'Fraunces', serif;
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Inter Tight', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.16;
  background-image:
    radial-gradient(1px 1px at 12% 23%, white, transparent),
    radial-gradient(1px 1px at 67% 71%, white, transparent),
    radial-gradient(1.5px 1.5px at 84% 14%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 33% 88%, white, transparent),
    radial-gradient(2px 2px at 45% 50%, rgba(255, 255, 255, 0.5), transparent);
  background-size: 800px 800px;
}

.wrap {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 200px;
  position: relative;
  z-index: 1;
}

.plan-hero {
  min-height: 82vh;
  padding: 170px 0 96px;
  background-size: cover;
  background-position: 72% center;
  background-repeat: no-repeat;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.plan-hero-inner {
  max-width: 860px;
}

.plan-roadmap {
  background-color: var(--bg-2);
  border-top: none;
  border-bottom: 1px solid var(--border);
  padding: 80px 0 120px;
}

.section-eyebrow {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--orange);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.section-title {
  font-family: var(--display);
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.025em;
  max-width: 900px;
  margin-bottom: 28px;
}

.section-title em {
  font-style: italic;
  font-weight: 300;
  color: var(--orange);
}

.section-intro {
  font-family: var(--sans);
  font-size: 18px;
  color: var(--text-2);
  max-width: 680px;
  line-height: 1.55;
  margin-bottom: 70px;
}

.phases {
  margin-top: 40px;
  border-top: 1px solid var(--border);
}

.phase-row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 60px;
  padding: 64px 0;
  border-bottom: 1px solid var(--border);
}

.phase-id {
  font-family: var(--display);
  font-size: 14px;
  color: var(--orange);
  letter-spacing: 0.1em;
  font-style: italic;
}

.phase-id .big {
  font-size: 72px;
  font-style: normal;
  font-weight: 300;
  display: block;
  color: var(--text);
  line-height: 1;
  margin-top: 8px;
  letter-spacing: -0.04em;
}

.phase-content h3 {
  font-family: var(--display);
  font-size: 32px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.phase-meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.phase-meta span {
  color: var(--orange);
}

.phase-content p {
  font-family: var(--sans);
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.7;
  max-width: 700px;
  margin-bottom: 16px;
}

.phase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.phase-tag {
  font-family: var(--mono);
  font-size: 10px;
  padding: 4px 10px;
  background: var(--surface);
  color: var(--text-2);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 100px;
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .wrap {
    padding: 0 20px;
  }

  .plan-hero {
    min-height: auto;
    padding: 120px 0 64px;
    background-position: 64% center;
  }

  .plan-roadmap {
    padding: 64px 0 84px;
  }

  .phase-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 40px 0;
  }

  .phase-id .big {
    font-size: 52px;
  }

  .phase-content h3 {
    font-size: 26px;
  }

  .section-intro {
    font-size: 16px;
    margin-bottom: 46px;
  }
}
</style>
