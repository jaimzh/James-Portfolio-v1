<script setup>
import { ref } from 'vue'

import avatarImage from '@/assets/hero/animatedframe3.svg'
import glassesImage from '@/assets/hero/staticglasses.svg'
import { useTheme } from '@/composables/useTheme'

const glassesActive = ref(false)
const { toggleTheme } = useTheme()

const hero = {
  name: 'James Henshaw',
  avatarAlt: 'James Henshaw - Frontend Developer',
  bio: `I try to code and build cool things, mostly websites, scripts and sometimes
mobile/desktop apps. Honestly whatever I can get my hands on and tinker with.`,
  about: `Let's do this one last time, I was bitten by a radioactive spider but decided
that lifestyle wasn't for me. Now I try to code and make animations every now and then.
I'm not there yet, but I'm hoping someday I'll be competent enough to build or create
anything I can think of. For now, I have so much to learn.`,
}

function toggleGlasses() {
  glassesActive.value = !glassesActive.value
}

function toggleThemeFromAvatar(event) {
  toggleGlasses()

  if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
    toggleTheme(event)
    return
  }

  const avatarBounds = event.currentTarget.getBoundingClientRect()

  toggleTheme({
    clientX: avatarBounds.left + avatarBounds.width / 2,
    clientY: avatarBounds.top + avatarBounds.height / 2,
  })
}
</script>

<template>
  <article class="hero-card">
    <svg
      class="hero-pattern"
      viewBox="0 0 8480 4940"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path d="M479.086 0 8479.5 366.5l-432.87 4215.22L.14 3471.62 479.086 0Z" />
      <path d="m0 3503 8019.85 735.5v567.67L0 3503Z" />
      <path d="m0 3633 8046.49 1110.1-16.1 116.65L0 3633Z" />
      <path d="m0 3713 8046.49 1110.1-16.1 116.65L0 3713Z" />
    </svg>

    <div class="hero-wrapper">
      <header class="hero-header">
        <figure
          class="hero-avatar-wrap"
          :class="{ 'glasses-active': glassesActive }"
          role="button"
          tabindex="0"
          aria-label="Toggle color theme"
          @click="toggleGlasses"
          @dblclick="toggleThemeFromAvatar"
        
          @keydown.enter="toggleThemeFromAvatar"
          @keydown.space.prevent="toggleThemeFromAvatar"
        >
          <img :src="glassesImage" alt="" aria-hidden="true" class="glasses" />
          <img :src="avatarImage" :alt="hero.avatarAlt" class="hero-avatar" />
        </figure>

        <div class="hero-body">
          <div class="hero-info">
            <h1 class="hero-name">
              <span class="hero-name-text">{{ hero.name }}</span>
              <span class="hero-name-cursor" aria-hidden="true">|</span>
            </h1>

            <p class="hero-bio">
              {{ hero.bio }}
            </p>
          </div>

          <div class="hero-actions">
            <a href="mailto:jameshenshaw10@gmail.com" class="btn btn-secondary">
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      <hr class="card-divider" />

      <div class="card-about">
        <p class="card-about-bio">
          {{ hero.about }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.hero-card {
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  border: 2px solid var(--hero-border);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  box-shadow: var(--hero-shadow);
}

.hero-pattern {
  position: absolute;
  bottom: 170px;
  z-index: 0;
  width: 125%;
  height: 125%;
  color: var(--hero-pattern-color);
  fill: currentColor;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}

.hero-wrapper {
  position: relative;
  z-index: 3;
  padding: 2rem 1.25rem;
}

.hero-header {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 1.5rem;
  color: var(--text-primary);
  text-align: center;
}

.hero-avatar-wrap {
  position: relative;
  cursor: pointer;
}

.hero-avatar-wrap > img {
  transition:
    scale 0.18s ease,
    opacity 0.35s ease,
    transform 0.45s ease;
}

.hero-avatar-wrap:active > img {
  scale: 0.94;
}

.glasses {
  position: absolute;
  left: 0.1rem;
  z-index: 2;
  width: 150px;
  height: 150px;
  opacity: 0;
  pointer-events: none;
  transform: translateX(80px) scale(1);
  transition:
    opacity 0.35s ease,
    transform 0.45s ease;
}

.hero-avatar-wrap:hover .glasses,
.hero-avatar-wrap.glasses-active .glasses {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.hero-avatar {
  width: 150px;
  height: 150px;
  padding: 0.4rem;
  border: 4px solid var(--avatar-border);
  border-radius: 50%;
  object-fit: cover;
}

.hero-body {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 1.25rem;
}

.hero-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.hero-name {
  display: inline-flex;
  align-items: center;
  gap: 0.05em;
  height: calc(1.75rem * 1.6);
  color: var(--hero-pattern-text);
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.02em;
}

.hero-name-text {
  display: inline-block;
  white-space: nowrap;
}

.hero-name-cursor {
  display: inline-block;
  margin-left: 1px;
  color: var(--hero-pattern-text);
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1;
  user-select: none;
  animation: cursorBlink 0.75s step-end infinite;
}

.hero-bio {
  color: var(--hero-pattern-text);
  font-size: 0.95rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-secondary {
  border: 1px solid var(--accent);
  background: var(--card-bg);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.card-divider {
  width: 100%;
  height: 1px;
  margin: 1.5rem 0;
  border: 0;
  background: var(--border);
}

.card-about {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-about-bio {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

@keyframes cursorBlink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@media (min-width: 640px) {
  .hero-card {
    max-width: 752px;
    margin-inline: auto;
  }

  .hero-wrapper {
    padding: 3rem 2.5rem;
  }

  .hero-pattern {
    bottom: 240px;
    scale: 1.5;
  }

  .glasses,
  .hero-avatar {
    width: 230px;
    height: 230px;
  }

  .hero-header {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  .hero-info {
    align-items: start;
  }

  .hero-name {
    height: calc(2.5rem * 1.6);
    font-size: 2.5rem;
  }

  .hero-actions {
    justify-content: flex-start;
  }
}
</style>
