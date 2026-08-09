<script setup>
import { Moon, Sun } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { useTheme } from '@/composables/useTheme'

const navLinks = [
  { label: 'Home', to: { path: '/', hash: '#hero' }, sectionId: 'hero' },
  { label: 'Stack', to: { path: '/', hash: '#stack' }, sectionId: 'stack' },
  { label: 'Projects', to: { path: '/', hash: '#projects' }, sectionId: 'projects' },
]

const route = useRoute()
const activeSection = ref('hero')
const isDumpsRoute = computed(() => route.path.startsWith('/dumps'))
const { isDark, toggleTheme } = useTheme()

let navObserver

onMounted(() => {
  const sections = document.querySelectorAll('section[id]')

  navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    },
  )

  sections.forEach((section) => navObserver.observe(section))
})

onBeforeUnmount(() => {
  navObserver?.disconnect()
})
</script>

<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Main Navigation">
      <ul class="nav-list">
        <li v-for="link in navLinks" :key="link.sectionId">
          <RouterLink
            :class="{ active: !isDumpsRoute && activeSection === link.sectionId }"
            :to="link.to"
          >
            {{ link.label }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :class="{ active: isDumpsRoute }" to="/dumps">Dumps</RouterLink>
        </li>
      </ul>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <Sun v-if="isDark" :size="15" :stroke-width="2" aria-hidden="true" />
        <Moon v-else :size="15" :stroke-width="2" aria-hidden="true" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: var(--space-md);
  left: 50%;
  z-index: 100;
  width: auto;
  padding: var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  transform: translateX(-50%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition:
    background-color var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.navbar {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  justify-content: center;
}

.nav-list {
  display: flex;
  gap: 0.125rem;
}

.nav-list a {
  display: inline-flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-xs);
  transition:
    background var(--transition-fast),
    color var(--transition-fast);
}



.nav-list a:hover{
  opacity: 90%;
}

.nav-list a:hover,
.nav-list a:focus-visible,
.nav-list a.active {
  background: var(--accent);
  color: var(--on-accent);
  outline: none;
 
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--text-secondary);
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
  outline: none;
}

@media (min-width: 640px) {
  .nav-list {
    gap: 0.25rem;
  }

  .nav-list a {
    font-size: var(--font-size-sm);
    padding: 0.4rem 0.9rem;
  }
}
</style>
