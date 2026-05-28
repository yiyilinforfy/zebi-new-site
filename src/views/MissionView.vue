<script setup>
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import '@/assets/heliomind-brand.css'
import missionImage from '@/assets/images/mission.jpg'

const router = useRouter()

function goTo(path) {
  router.push(path)
}
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
            We're building the design platform for AI infrastructure in space.
          </h1>
          <p class="mission-subtitle">
            The largest capital buildout in human history — from Earth data centers to orbital compute
            networks — is happening without a real design platform.<br>
            Zebi Lab exists to build that platform.
          </p>
          <button type="button" class="btn-primary" @click="goTo('/join-us')">
            <span>Join the text-transform</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7H11M11 7L7 3M11 7L7 11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="wrap narrow">
        <div class="section-eyebrow">The gap</div>
        <p class="mission-copy">
          In the next decade, over $3 trillion will be spent on AI infrastructure. Hyperscalers, satellite operators, and sovereign programs are making trillion-dollar bets — with spreadsheets, intuition, and vendor pitches.
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
            <h3>3. The platform is the multiplier, not the hardware.</h3>
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
          HelioMind OS — the design, simulation, and optimization platform for AI infrastructure in space.
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
        <button type="button" class="btn-primary mission-product-btn" @click="goTo('/product')">
          Explore HelioMind →
        </button>
      </div>
    </section>

    <section class="mission-ask">
      <div class="wrap narrow">
        <h2 class="ask-title">
          This is a once-in-a-generation problem.<br>
          We're looking for a once-in-a-generation team.
        </h2>
        <p class="ask-copy">
          Zebi Lab is a small, focused team of engineers, physicists, and systems thinkers. We're building
          the platform that should have existed a decade ago.
        </p>
        <p class="ask-copy">
          If that sounds like your kind of problem, we want to talk to you.
        </p>
        <button type="button" class="btn-primary" @click="goTo('/join-us')">
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
        </button>
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

.mission-product-btn {
  margin-top: 16px;
}

.mission-ask {
  padding: 120px 0 130px;
  text-align: center;
  background: radial-gradient(ellipse at center top, rgba(255, 107, 61, 0.1), transparent 70%);
}

.mission-ask .btn-primary {
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
    min-height: auto;
    padding: 120px 0 72px;
    background-position: center 42%;
  }

  .mission-title {
    font-size: clamp(32px, 8.5vw, 44px);
  }

  .mission-subtitle {
    font-size: 16px;
    margin-bottom: 32px;
  }

  .mission-hero .btn-primary {
    width: 100%;
    justify-content: center;
    min-height: 48px;
  }

  .mission-section {
    padding: 72px 0;
  }

  .mission-copy {
    font-size: 16px;
  }

  .thesis-card {
    padding: 24px 20px;
  }

  .thesis-card h3 {
    font-size: 24px;
  }

  .mission-product-btn {
    width: 100%;
    justify-content: center;
    min-height: 48px;
  }

  .mission-ask {
    padding: 80px 0 88px;
  }

  .ask-title {
    font-size: clamp(30px, 8vw, 40px);
  }

  .ask-copy {
    font-size: 16px;
  }

  .mission-ask .btn-primary {
    width: 100%;
    justify-content: center;
    min-height: 48px;
  }
}

@media (max-width: 480px) {
  .mission-hero {
    padding-top: 108px;
  }
}
</style>
