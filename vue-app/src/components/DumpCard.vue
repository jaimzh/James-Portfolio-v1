<script setup>
import { FileText, LinkIcon } from '@lucide/vue'

import codeCanvasLogo from '@/assets/code-canvas-logo.svg'
import { getDumpHref, isExternalDump } from '@/utils/dumps'

defineProps({
  dump: {
    type: Object,
    required: true,
  },
})

function sourceLabel(source) {
  const labels = {
    'code-canvas': 'Code Canvas',
    external: 'External',
    portfolio: 'Markdown',
  }

  return labels[source] || source
}

function sourceIcon(source) {
  if (source === 'external') return LinkIcon
  return FileText
}

function isCodeCanvasDump(source) {
  return source === 'code-canvas'
}
</script>

<template>
  <a
    class="dump-card"
    :href="getDumpHref(dump)"
    :target="isExternalDump(dump) ? '_blank' : undefined"
    :rel="isExternalDump(dump) ? 'noopener noreferrer' : undefined"
  >
    <div class="dump-line">
      <span class="dump-title-group">
        <span class="dump-source-icon">
          <img
            v-if="isCodeCanvasDump(dump.source)"
            :src="codeCanvasLogo"
            :alt="sourceLabel(dump.source)"
            class="dump-source-logo"
          />
          <component v-else :is="sourceIcon(dump.source)" :size="14" :stroke-width="2" />
        </span>

        <h2 class="dump-title">{{ dump.title }}</h2>
      </span>

      <span class="dump-date">
        <time :datetime="dump.date">{{ dump.displayDate }}</time>
      </span>
    </div>
  </a>
</template>

<style scoped>
.dump-card {
  display: block;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--border);
  transition:
    color var(--transition-base),
    transform var(--transition-base);
}

.dump-card:hover,
.dump-card:focus-visible {
  transform: translateX(2px);
}

.dump-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  min-width: 0;
}

.dump-title-group {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  min-width: 0;
}

.dump-source-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-muted);
}

.dump-source-logo {
  width: 14px;
  height: 14px;
}

.dump-title {
  min-width: 0;
  overflow: hidden;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dump-date {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

@media (max-width: 520px) {
  .dump-line {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .dump-title {
    white-space: normal;
  }
}
</style>
