<script setup>
import { ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import '@/assets/heliomind-home.css'
import '@/assets/heliomind-brand.css'
import joinusImage from '@/assets/images/joinus.jpg'

// 定义精简、实用的表单状态（移除了原 Email 输入）
const userName = ref('')
const userCity = ref('')
const userBio = ref('')
const rolesOpen = ref(false)

// 🔒 终极防爬虫设计：Base64 混淆与数组拆分运行时解密
// 目标邮箱：zebi1867@outlook.com
const obfuscatedMail = {
  p1: ['z', 'e', 'b', 'i'].join(''), // "zebi"
  p2: window.btoa('1867'),           // "MTg2Nw=="
  p3: ['o', 'u', 't', 'l', 'o', 'o', 'k', '.', 'c', 'o', 'm'].join('') // "outlook.com"
}

function getDecryptedEmail() {
  const part2 = window.atob(obfuscatedMail.p2)
  return `${obfuscatedMail.p1}${part2}@${obfuscatedMail.p3}`
}

function onProposalSubmit(event) {
  event.preventDefault()
  
  const nameVal = userName.value.trim()
  const cityVal = userCity.value.trim()
  const bioVal = userBio.value.trim()

  const targetEmail = getDecryptedEmail()
  
  // 严格按照要求的邮件主题: ZEBI LAB Application
  const subject = encodeURIComponent('ZEBI LAB Application')
  
  // 严格按照要求的邮件正文格式拼接
  const emailBody = encodeURIComponent(
    `ZEBI LAB Application\n\n` +
    `Name: ${nameVal}\n` +
    `Email: \n` + // 留空，用户用什么邮箱发，以后就用什么邮箱回复
    `City: ${cityVal}\n\n` +
    `Brief Introduction and Background:\n` +
    `${bioVal ? bioVal : 'No description provided.'}\n\n` +
    `Please attach your resume and portfolio before sending.`
  )
  
  // 唤起本地邮件客户端
  window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${emailBody}`
}

const roles = [
  'Systems Architect',
  'Thermal / Aerospace Engineer',
  'Frontend / Simulation Engineer',
  'AI Infrastructure Engineer',
  'Research Scientist (Physics / Orbital Mechanics)',
  'Product Designer (Technical)',
]

const whyItems = [
  {
    title: 'Work on a category-defining problem.',
    body: "You won't be building yet another chatbot or CRUD app. You'll be designing the simulation platform for trillion-dollar next-generation space infrastructure."
  },
  {
    title: 'Work with people who actually understand physics.',
    body: "Collaborate with an elite, multidisciplinary group of aerospace experts, systems thinkers, and frontend pioneers leveraging first-principles thinking."
  },
  {
    title: 'Long-term thesis over short-term hype.',
    body: "We are focused on the ultimate destination of compute. We value obsessive craftsmanship, technical rigor, and deep patience over trendy buzzwords."
  }
]
</script>

<template>
  <SiteHeader />
  <main class="join-page-container">
    <div class="starfield" />
    <div class="glow-orb" />

    <section
      class="join-hero"
      :style="{ backgroundImage: `linear-gradient(to bottom, rgba(7, 9, 14, 0.4), #07090e), url(${joinusImage})` }"
    >
      <div class="wrap grid-layout">
        <div class="join-hero-inner">
          <div class="section-eyebrow"><span class="mono-num">// 01</span> HUMAN CAPITAL PIPELINE</div>
          <h1 class="hero-main-title">Build for the <br><em>solar age</em>.</h1>
          <p class="join-subtitle">
            We are looking for builders, physicists, and systems engineers who refuse to work on comfortable, repetitive problems. Join us in engineering the software layer that powers autonomous intelligence in Earth orbit and beyond.
          </p>
          <div class="system-status-tags">
            <span class="status-tag"><span class="pulse-dot"></span>Core Infrastructure Open</span>
            <span class="status-tag">Pre-Seed / Stealth</span>
          </div>
        </div>

        <div class="proposal-console-wrapper">
          <div class="console-header">
            <div class="console-dots"><span></span><span></span><span></span></div>
            <div class="console-title">ZEBI LAB APPLICATION FORM</div>
          </div>
          
          <form class="proposal-form" @submit="onProposalSubmit">
            <div class="form-row-grid">
              <div class="form-group">
                <label class="form-label">NAME</label>
                <div class="input-glow-container">
                  <input
                    v-model="userName"
                    type="text"
                    class="console-input"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">CITY / TIMEZONE</label>
                <div class="input-glow-container">
                  <input
                    v-model="userCity"
                    type="text"
                    class="console-input"
                    placeholder="Current Location"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">BRIEF INTRODUCTION AND BACKGROUND</label>
              <div class="input-glow-container">
                <textarea
                  v-model="userBio"
                  class="console-textarea"
                  rows="4"
                  placeholder="Tell us about you..."
                  required
                ></textarea>
              </div>
            </div>

            <div class="resume-attachment-pointer">
              <div class="pointer-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="pointer-text">
                <span class="highlight">Please attach your resume and portfolio before sending.</span>
                <p>Your local mail client will initialize with your telemetry formatted. You may freely attach documents or links before transmitting.</p>
              </div>
            </div>

            <button type="submit" class="console-submit-btn">
              <span>Transmit Application</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="arrow-icon">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>

    <section class="join-section border-top">
      <div class="wrap narrow">
        <div class="section-eyebrow"><span class="mono-num">// 02</span> OPERATIONAL PHILOSOPHY</div>
        <h2 class="section-title">We are looking for people who...</h2>

        <div class="trait-list">
          <article class="trait-item">
            <div class="trait-num">01</div>
            <div class="trait-content">
              <h3>...see systems, not silos.</h3>
              <p>
                You natively think across hardware, software, physics, and orbital economics. The boundary between
                thermal dynamics and full-stack software architecture doesn't exist in your worldview.
              </p>
            </div>
          </article>

          <article class="trait-item">
            <div class="trait-num">02</div>
            <div class="trait-content">
              <h3>...are comfortable with first principles.</h3>
              <p>
                When there is no textbook, you fall back to pure physics. You derive, you simulate, you
                validate. Extreme ambiguity accelerates your focus rather than paralyzing it.
              </p>
            </div>
          </article>

          <article class="trait-item">
            <div class="trait-num">03</div>
            <div class="trait-content">
              <h3>...want to build for the long arc.</h3>
              <p>
                This is a multi-decade bet on global infrastructure. You are here because the engineering challenge is 
                profoundly complex and meaningful, not because it conforms to tech industry trends.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="join-section alt-bg">
      <div class="wrap narrow">
        <button
          type="button"
          class="roles-toggle"
          :aria-expanded="rolesOpen"
          @click="rolesOpen = !rolesOpen"
        >
          <div class="roles-toggle-left">
            <span class="section-eyebrow roles-eyebrow"><span class="mono-num">// 03</span> FUTURE TALENT POOL</span>
            <span class="roles-main-text">Upcoming Active Capabilities</span>
          </div>
          <span class="roles-chevron" :class="{ open: rolesOpen }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>

        <Transition name="slide-fade">
          <div v-show="rolesOpen" class="roles-panel">
            <div class="role-tags">
              <span v-for="role in roles" :key="role" class="role-tag">
                <span class="tag-dot"></span>{{ role }}
              </span>
            </div>
            <p class="roles-hint">
              [SYSTEM NOTE] Pipeline definitions are running simulation verifications. Secure your slot in our pipeline by submitting your telemetry above.
            </p>
          </div>
        </Transition>
      </div>
    </section>

    <section class="join-section">
      <div class="wrap narrow">
        <div class="section-eyebrow"><span class="mono-num">// 04</span> COGNITIVE ADVANTAGE</div>
        <h2 class="section-title">Why Zebi Lab</h2>
        <div class="why-grid">
          <article v-for="(item, idx) in whyItems" :key="item.title" class="why-card">
            <div class="why-card-glow"></div>
            <div class="card-index">0{{ idx + 1 }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="join-cta">
      <div class="wrap narrow">
        <div class="cta-inner">
          <h2 class="cta-title">
            The platform should have existed a decade ago.<br>
            We are engineering it <em>right now</em>.
          </h2>
          <p class="cta-footnote">
            We operate at pre-seed, pre-product-market-fit, and pre-hype velocity. If solving the foundational equations of space intelligence excites you more than it frightens you, welcome home.
          </p>
        </div>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
/* ==========================================================================
   CSS 变量体系与排版引擎
   ========================================================================== */
:deep(:root), .join-page-container {
  --bg: #07090e;
  --bg-2: #0c1018;
  --bg-3: #131825;
  --surface: rgba(26, 32, 48, 0.4);
  --border: rgba(31, 38, 56, 0.6);
  --border-strong: rgba(55, 65, 92, 0.8);
  --accent: #ff6b3d; /* 太空火橙色 */
  --accent-cyan: #4bf0cf;
  --text-1: #f3f5f9;
  --text-2: #8a95a5;
  --text-3: #4e5866;
  --font-display: 'Fraunces', serif;
  --font-sans: 'Inter Tight', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.join-page-container {
  background-color: var(--bg);
  color: var(--text-1);
  font-family: var(--font-sans);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

/* 布局控制 */
.grid-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 64px;
  align-items: center;
}

.glow-orb {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw;
  height: 40vh;
  background: radial-gradient(ellipse at center, rgba(255, 107, 61, 0.03), transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.section-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 24px;
}
.mono-num {
  color: var(--text-3);
  margin-right: 6px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 48px;
}

/* ==========================================================================
   Hero Left Panel
   ========================================================================== */
.join-hero {
  position: relative;
  padding-top: 160px;
  padding-bottom: 100px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border);
}

.hero-main-title {
  font-family: var(--font-display);
  font-size: clamp(38px, 5.5vw, 62px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-1);
  margin-bottom: 28px;
}
.hero-main-title em {
  font-style: italic;
  font-weight: 400;
}

.join-subtitle {
  font-size: 16px;
  line-height: 1.65;
  color: var(--text-2);
  margin-bottom: 36px;
  font-weight: 300;
}

.system-status-tags {
  display: flex;
  gap: 12px;
}
.status-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
  background: rgba(19, 24, 37, 0.6);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 100px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent-cyan);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--accent-cyan);
}

/* ==========================================================================
   申请控制台终端表单 (Proposal Terminal)
   ========================================================================== */
.proposal-console-wrapper {
  background: rgba(12, 16, 24, 0.75);
  border: 1px solid var(--border-strong);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03);
  overflow: hidden;
}

.console-header {
  background: rgba(19, 24, 37, 0.8);
  border-bottom: 1px solid var(--border);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.console-dots {
  display: flex;
  gap: 6px;
}
.console-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-strong);
}
.console-title {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--text-3);
}

.proposal-form {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-2);
}

.input-glow-container {
  position: relative;
  background: rgba(7, 9, 14, 0.5);
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all 0.3s ease;
}
.input-glow-container:focus-within {
  border-color: rgba(255, 107, 61, 0.5);
  box-shadow: 0 0 14px rgba(255, 107, 61, 0.1);
}

.console-input, .console-textarea {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 12px 14px;
  color: var(--text-1);
  font-family: var(--font-sans);
  font-size: 14px;
}

.console-textarea {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  resize: vertical;
}

.console-input::placeholder, .console-textarea::placeholder {
  color: var(--text-3);
}

/* 新设计的自愿附件提示块 */
.resume-attachment-pointer {
  display: flex;
  gap: 14px;
  background: rgba(255, 107, 61, 0.02);
  border: 1px dashed rgba(255, 107, 61, 0.2);
  border-radius: 8px;
  padding: 16px;
}
.pointer-icon {
  color: var(--accent);
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}
.pointer-text .highlight {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-1);
  display: block;
  margin-bottom: 4px;
}
.pointer-text p {
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-2);
}

/* 控制台提交按钮 */
.console-submit-btn {
  width: 100%;
  background: linear-gradient(180deg, #ff7c52, #ff6b3d);
  border: 1px solid #ff8861;
  color: #ffffff;
  padding: 14px;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 107, 61, 0.2);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.console-submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(255, 107, 61, 0.3);
}
.console-submit-btn:hover .arrow-icon {
  transform: translateX(4px);
}
.arrow-icon {
  transition: transform 0.2s ease;
}

/* ==========================================================================
   Traits Section 
   ========================================================================== */
.join-section {
  padding: 100px 0;
  position: relative;
  z-index: 1;
}
.join-section.border-top {
  border-top: 1px solid var(--border);
}
.join-section.alt-bg {
  background-color: var(--bg-2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.trait-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.trait-item {
  display: flex;
  gap: 32px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(31, 38, 56, 0.3);
}
.trait-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.trait-num {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--accent);
  padding-top: 4px;
}

.trait-content h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
}

.trait-content p {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-2);
  font-weight: 300;
}

/* ==========================================================================
   Hiring Roles 
   ========================================================================== */
.roles-toggle {
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.roles-toggle-left {
  display: flex;
  flex-direction: column;
}

.roles-main-text {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--text-1);
  margin-top: 4px;
}

.roles-chevron {
  color: var(--text-3);
  transition: transform 0.3s, color 0.2s;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.roles-chevron.open {
  transform: rotate(180deg);
  border-color: var(--accent);
  color: var(--accent);
}

.roles-panel {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px dashed var(--border);
}

.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.role-tag {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--bg-3);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 100px;
  color: var(--text-2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--accent-cyan);
}

.roles-hint {
  margin-top: 28px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-3);
  background: rgba(19, 24, 37, 0.3);
  padding: 12px 16px;
  border-left: 2px solid var(--border-strong);
}

/* ==========================================================================
   Why Zebi Lab Grid 
   ========================================================================== */
.why-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.why-card {
  background: linear-gradient(180deg, rgba(12, 16, 24, 0.8), rgba(7, 9, 14, 0.9));
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 36px 28px;
  position: relative;
  transition: all 0.3s ease;
}
.why-card:hover {
  border-color: rgba(255, 107, 61, 0.3);
  transform: translateY(-4px);
}

.card-index {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-3);
  margin-bottom: 24px;
}

.why-card h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 14px;
}

.why-card p {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.6;
}

/* ==========================================================================
   Closing CTA 
   ========================================================================== */
.join-cta {
  padding: 80px 0 140px;
}

.cta-inner {
  background: radial-gradient(circle at center top, rgba(255, 107, 61, 0.05), transparent 60%);
  padding: 80px 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 107, 61, 0.05);
  text-align: center;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 24px;
}

.cta-footnote {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.6;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
  font-family: var(--font-display);
}

/* Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* ==========================================================================
   Responsive Breakpoints
   ========================================================================== */
@media (max-width: 1100px) {
  .grid-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  
  .why-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .join-hero {
    padding-top: 120px;
  }
  
  .form-row-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .proposal-console-wrapper {
    margin-top: 12px;
  }
  
  .proposal-form {
    padding: 20px;
  }
}
</style>