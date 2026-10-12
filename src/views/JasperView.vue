<script setup>
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-platform.css'
import '@/assets/heliomind-jasper.css'
import jasperHeroImage from '@/assets/images/jasper-hero.jpg'

const router = useRouter()

function goTo(path) {
  router.push(path)
}

const useCases = [
  {
    title: 'Analyze satellite data',
    body: 'Spot anomalies, get clear summaries.',
    image:
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=300&auto=format&fit=crop',
  },
  {
    title: 'Find and explain information',
    body: 'Search research papers, mission docs and more.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&auto=format&fit=crop',
  },
  {
    title: 'Support daily operations',
    body: 'Get answers, troubleshoot, make better decisions.',
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300&auto=format&fit=crop',
  },
  {
    title: 'Enable small teams',
    body: 'Powerful, even with limited connectivity.',
    image:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=300&auto=format&fit=crop',
  },
]

const advantages = [
  {
    id: 'sovereignty',
    index: '01',
    label: 'Sovereignty',
    title: 'Canadian sovereignty.',
    titleEm: 'Human control.',
    principle:
      'Canadian sovereignty is a founding design principle. We want users to have meaningful choice over deployment, sensitive information, and the decisions made with AI.',
    direction:
      'Intelligence that can operate locally and remain useful when connectivity is limited, giving teams greater independence when it matters.',
  },
  {
    id: 'open-source',
    index: '02',
    label: 'Open source',
    title: 'Open by design.',
    titleEm: 'Yours to build upon.',
    principle:
      'We intend to release eligible ZEBI contributions under Apache 2.0. We believe useful technology should be easier for others to inspect, adapt, and build upon.',
    direction:
      'A compact foundation that teams can adapt to specialized work, with more portability and less dependence on a single provider.',
  },
  {
    id: 'voice',
    index: '03',
    label: 'Voice at the core',
    title: 'Precise meaning.',
    titleEm: 'A clearer voice.',
    principle:
      'Voice is a core product priority alongside text. We are focusing on accurate understanding, pronunciation, and a natural, consistent voice.',
    direction:
      'Spoken interaction that preserves technical terms and critical numbers, while making complex information easier to work with.',
  },
  {
    id: 'space',
    index: '04',
    label: 'Space & human purpose',
    title: 'Space at its heart.',
    titleEm: 'People at the center.',
    principle:
      'Jasper is designed for ground-based space research, small-satellite teams, and technical explorers. Consequential decisions remain with people.',
    direction:
      'A research companion that connects relevant knowledge, explains uncertainty, and helps more people participate in technical discovery.',
  },
  {
    id: 'progress',
    index: '05',
    label: 'Responsible progress',
    title: 'A smaller footprint.',
    titleEm: 'A growing horizon.',
    principle:
      'We are focused on a practical model and carefully evaluated improvements, with human oversight throughout the process.',
    direction:
      'Future versions that become more capable at specialized work while remaining practical for smaller teams to use and operate.',
  },
]
</script>

<template>
  <SiteHeader />
  <main class="jasper-page product-page">
    <section
      class="jasper-hero platform-hero"
      :style="{
        backgroundImage: `linear-gradient(90deg, rgba(7, 9, 14, 0.97) 0%, rgba(7, 9, 14, 0.9) 26%, rgba(7, 9, 14, 0.45) 48%, rgba(7, 9, 14, 0.08) 68%, rgba(7, 9, 14, 0.12) 100%), linear-gradient(180deg, rgba(7, 9, 14, 0.15) 0%, rgba(7, 9, 14, 0.02) 50%, rgba(7, 9, 14, 0.55) 100%), url(${jasperHeroImage})`,
      }"
    >
      <div class="wrap jasper-hero-grid">
        <div class="jasper-intro platform-hero-copy">
          <div class="hero-eyebrow">Our Product</div>
          <h1>
            <em>Zebi Jasper</em>
            <span class="jasper-title-sub">Space AI model</span>
          </h1>
          <p>
            Zebi Jasper is a compact AI assistant built for space research. It can listen, speak, and help
            teams work with technical information — with a focus on local control, open technology,
            and keeping people in charge.
          </p>
        </div>
      </div>
    </section>

    <section class="jasper-usecases">
      <div class="wrap">
        <div class="jasper-usecases-grid">
          <div class="jasper-usecases-intro">
            <h2>Real-world use cases</h2>
            <p>From data analysis to quick answers, Jasper helps space teams move faster.</p>
          </div>

          <article v-for="item in useCases" :key="item.title" class="jasper-usecase">
            <div class="jasper-usecase-media">
              <img :src="item.image" :alt="item.title" loading="lazy" />
            </div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="jasper-pillars" id="advantages" aria-labelledby="pillars-title">
      <div class="wrap">
        <div class="jasper-principles-header">
          <div>
            <p class="jasper-principles-eyebrow">The Jasper direction</p>
            <h2 id="pillars-title">
              Five principles.<em>One ambitious frontier.</em>
            </h2>
          </div>
          <p class="jasper-principles-intro">
            We are building Jasper around a simple idea: advanced intelligence should help people do
            meaningful technical work without taking control away from them. These five principles
            guide the way we approach the product.
          </p>
        </div>

        <div class="jasper-principles">
          <article
            v-for="item in advantages"
            :id="item.id"
            :key="item.id"
            class="jasper-principle"
          >
            <div class="jasper-principle-number">{{ item.index }} /</div>

            <div class="jasper-principle-title">
              <p class="jasper-principle-label">{{ item.label }}</p>
              <h3>{{ item.title }}<span>{{ item.titleEm }}</span></h3>
            </div>

            <div class="jasper-principle-description">
              <div>
                <h4>Our principle</h4>
                <p>{{ item.principle }}</p>
              </div>
              <div class="jasper-principle-direction">
                <h4>Our direction</h4>
                <p>{{ item.direction }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="jasper-ending">
          <div>
            <p class="jasper-principles-eyebrow">One ambitious frontier</p>
            <h2>
              Small should describe the footprint.<em>Not the ambition.</em>
            </h2>
          </div>
          <div class="jasper-ending-copy">
            <p>
              The future we are working toward is straightforward: you can ask a difficult question,
              bring relevant knowledge into focus, understand what is known and what is uncertain, and
              make the decision yourself.
            </p>
            <strong>
              Jasper is here to extend what people can explore — not to replace the people doing the
              work.
            </strong>
            <button type="button" class="btn-primary jasper-join-btn" @click="goTo('/join-us')">
              <span>Join us to build what’s next</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
      </div>
    </section>

    <aside class="jasper-status-foot-wrap">
      <div class="wrap">
        <p class="jasper-status-foot">
          Jasper is in research and development. Research horizons describe experimental
          objectives—not demonstrated capabilities, performance guarantees or availability
          announcements. The initial focus is ground-based research; no flight qualification is
          claimed. Planned Apache 2.0 releases apply to eligible ZEBI contributions. Third-party
          components retain their own terms.
        </p>
      </div>
    </aside>
  </main>
  <SiteFooter />
</template>
