<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  headings: {
    type: Array,
    default: () => [],
  },
})

const activeId = ref('')
let ticking = false
let mounted = false

function updateActiveHeading() {
  ticking = false
  const headingElements = props.headings
    .map((heading) => document.getElementById(heading.id))
    .filter(Boolean)

  if (!headingElements.length) return

  const currentHeading = headingElements.reduce((current, heading) => {
    return heading.getBoundingClientRect().top <= 160 ? heading : current
  }, headingElements[0])

  activeId.value = currentHeading.id
}

function handleScroll() {
  if (ticking) return

  ticking = true
  window.requestAnimationFrame(updateActiveHeading)
}

watch(
  () => props.headings,
  async () => {
    if (!mounted) return

    await nextTick()
    updateActiveHeading()
  },
)

onMounted(async () => {
  mounted = true
  await nextTick()
  updateActiveHeading()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  mounted = false
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <aside v-if="headings.length" class="table-of-contents" aria-label="Table of contents">
    <details class="toc-mobile">
      <summary>On this page</summary>
      <nav>
        <a
          v-for="heading in headings"
          :key="heading.id"
          :href="`#${heading.id}`"
          :class="['toc-link', `toc-link-level-${heading.level}`]"
          :aria-current="activeId === heading.id ? 'location' : undefined"
        >
          {{ heading.text }}
        </a>
      </nav>
    </details>

    <nav class="toc-desktop">
      <p class="toc-label">On this page</p>
      <a
        v-for="heading in headings"
        :key="heading.id"
        :href="`#${heading.id}`"
        :class="['toc-link', `toc-link-level-${heading.level}`]"
        :aria-current="activeId === heading.id ? 'location' : undefined"
      >
        {{ heading.text }}
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.toc-desktop {
  display: none;
}

.toc-mobile {
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.toc-mobile summary {
  padding: var(--space-sm) 0;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
}

.toc-mobile nav {
  display: grid;
  gap: 0.15rem;
  padding: 0 0 var(--space-sm);
}

.toc-link {
  display: block;
  padding: 0.3rem 0 0.3rem var(--space-sm);
  border-left: 1px solid var(--border);
  color: var(--text-muted);
  line-height: 1.35;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);
}

.toc-link:hover,
.toc-link:focus-visible,
.toc-link[aria-current='location'] {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.toc-link-level-2 {
  padding-left: var(--space-lg);
}

.toc-link-level-3 {
  padding-left: var(--space-xl);
}

@media (min-width: 1000px) {
  .table-of-contents {
    min-width: 0;
  }

  .toc-mobile {
    display: none;
  }

  .toc-desktop {
    display: block;
  }

  .toc-label {
    margin-bottom: var(--space-sm);
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}
</style>
