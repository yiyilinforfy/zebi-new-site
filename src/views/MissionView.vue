<script setup>
import { RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import '@/assets/heliomind-brand.css'
import missionImage from '@/assets/images/mission.jpg'
</script>

<template>
  <SiteHeader />
  <main>
    <div class="starfield" />

    <section
      class="mission-hero"
      :style="{ backgroundImage: `linear-gradient(rgba(7, 9, 14, 0.52), rgba(7, 9, 14, 0.88)), url(${missionImage})` }"
    >
      <div class="wrap">
        <div class="mission-hero-inner">
          <h1 class="mission-title">
            We build the design layer for AI infrastructure in the solar age.
          </h1>
          <p class="mission-subtitle">
            The largest capital buildout in human history — from Earth data centers to orbital compute
            networks — is happening without a real design platform.<br>
            Zebi Lab exists to build that platform.
          </p>
          <RouterLink class="btn-primary mission-open-btn" to="/join-us">
            <span>Join the mission</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7 3M11 7L7 11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="wrap narrow">
        <div class="section-eyebrow">The gap</div>
        <p class="mission-copy">
          In the next decade, over $3 trillion will be spent on AI infrastructure. Hyperscalers, satellite
          operators, and sovereign AI programs are making thousand-billion-dollar bets — with spreadsheets,
          intuition, and vendor pitches.
        </p>
        <p class="mission-copy">
          No one has the tooling to design, simulate, and optimize this new class of infrastructure.
        </p>
        <p class="mission-copy">
          Chip design has Cadence and Synopsys. AI infrastructure design has nothing. Zebi Lab was founded
          to fill that empty seat at the most expensive table in technology.
        </p>
      </div>
    </section>

    <section class="mission-section alt">
      <div class="wrap">
        <div class="section-eyebrow">What we believe</div>
        <div class="thesis-grid">
          <article class="thesis-card">
            <h3>1. Orbit is a compute layer, not an afterthought.</h3>
            <p>
              Solar power, natural cooling, and global coverage make space an ideal home for
              latency-tolerant, compute-intensive AI workloads. The physics are different — so the
              architecture must be different.
            </p>
          </article>
          <article class="thesis-card">
            <h3>2. Heat is a first-class resource, not a thermal problem.</h3>
            <p>
              In space, every watt of compute becomes heat that must be radiated away. We design around
              this constraint, not against it. Thermal-aware computing is not optional — it's the
              foundation.
            </p>
          </article>
          <article class="thesis-card">
            <h3>3. The platform wins, not the hardware.</h3>
            <p>
              We don't need to own the satellites to design the system that designs the satellites. Zebi
              Lab builds the OS. Everyone else builds the hardware on top of it.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="wrap narrow">
        <div class="section-eyebrow">What we're building</div>
        <p class="mission-copy">
          HelioMind OS — the design, simulation, and optimization platform for AI infrastructure in the
          solar age.
        </p>
        <p class="mission-copy">
          Eleven modules covering economics, thermal physics, constellation sizing, sparse-model topology,
          workload classification, orbit-aware scheduling, multi-vendor routing, risk modeling, and
          reference architectures.
        </p>
        <p class="mission-copy">
          Used by AI labs, satellite operators, and sovereign programs to make billion-dollar decisions
          with confidence instead of faith.
        </p>
        <RouterLink class="btn-ghost mission-open-ghost" to="/product">Explore HelioMind →</RouterLink>
      </div>
    </section>

    <section class="mission-ask">
      <div class="wrap narrow">
        <h2 class="ask-title">
          This is a century-scale problem.<br>
          We're looking for century-scale people.
        </h2>
        <p class="ask-copy">
          Zebi Lab is a small, focused team of engineers, physicists, and systems thinkers. We're building
          the platform that should have existed a decade ago.
        </p>
        <p class="ask-copy">
          If that sounds like your kind of problem, we want to talk to you.
        </p>
        <RouterLink class="btn-primary mission-open-btn" to="/join-us">
          <span>Join us</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7H11M11 7L7 3M11 7L7 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RouterLink>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
.mission-hero {
  min-height: 88vh;
  padding: 180px 0 110px;
  background-size: cover;
  background-position: center 38%;
  border-bottom: 1px solid var(--border);
}

.mission-hero-inner {
  max-width: 860px;
  position: relative;
  z-index: 2;
}

.mission-title {
  font-family: var(--display);
  font-size: clamp(44px, 6vw, 78px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-bottom: 28px;
}

.mission-subtitle {
  font-size: 18px;
  color: var(--text-2);
  line-height: 1.62;
  max-width: 760px;
  margin-bottom: 40px;
}

.mission-section {
  padding: 110px 0;
  border-bottom: 1px solid var(--border);
}

.mission-section.alt {
  background: var(--bg-2);
}

.wrap.narrow {
  max-width: 980px;
}

.mission-copy {
  font-size: 18px;
  color: var(--text-2);
  line-height: 1.72;
  margin-bottom: 22px;
}

.mission-copy:last-of-type {
  margin-bottom: 0;
}

.thesis-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 26px;
}

.thesis-card {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 30px 26px;
}

.thesis-card h3 {
  font-family: var(--display);
  font-size: 30px;
  font-weight: 400;
  line-height: 1.12;
  margin-bottom: 14px;
  letter-spacing: -0.02em;
}

.thesis-card p {
  font-size: 15px;
  color: var(--text-2);
  line-height: 1.7;
}

.mission-open-btn {
  font-family: var(--mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 16px 32px;
  background: var(--orange);
  color: var(--bg);
  border-radius: 100px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
}

.mission-open-btn:hover {
  background: var(--orange-bright);
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(255, 107, 61, 0.25);
}

.mission-open-btn svg {
  transition: transform 0.2s;
}

.mission-open-btn:hover svg {
  transform: translateX(4px);
}

.mission-open-ghost {
  font-family: var(--mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-2);
  text-decoration: none;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.mission-open-ghost:hover {
  color: var(--text);
}

.mission-ask {
  padding: 120px 0 130px;
  text-align: center;
  background: radial-gradient(ellipse at center top, rgba(255, 107, 61, 0.1), transparent 70%);
}

.mission-ask .mission-open-btn {
  margin: 0 auto;
}

.ask-title {
  font-family: var(--display);
  font-size: clamp(38px, 5vw, 62px);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin-bottom: 24px;
}

.ask-copy {
  font-size: 18px;
  color: var(--text-2);
  line-height: 1.68;
  margin: 0 auto 14px;
  max-width: 780px;
}

.ask-copy:last-of-type {
  margin-bottom: 36px;
}

@media (max-width: 1100px) {
  .thesis-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mission-hero {
    padding-top: 150px;
  }
}
</style>
