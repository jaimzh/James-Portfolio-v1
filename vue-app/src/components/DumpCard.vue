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
          <span
            v-if="isCodeCanvasDump(dump.source)"
            :style="{ '--logo-url': `url(${codeCanvasLogo})` }"
            role="img"
            :aria-label="sourceLabel(dump.source)"
            class="dump-source-logo"
          ></span>
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
  position: relative;
  display: block;
  padding: 1.45rem 0;
  transition:
    color var(--transition-base),
    transform var(--transition-base);
}

.dump-card::before,
.dump-card::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
}

.dump-card::before {
  background: var(--border);
}

.dump-card::after {
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-smooth);
}

.dump-card:hover,
.dump-card:focus-visible {
  transform: translateX(3px);
}

.dump-card:hover::after,
.dump-card:focus-visible::after {
  transform: scaleX(1);
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
  transition: color var(--transition-fast);
}

.dump-card:hover .dump-source-icon,
.dump-card:focus-visible .dump-source-icon {
  color: var(--text-primary);
}

.dump-source-logo {
  width: 14px;
  height: 14px;
  background: currentColor;
  mask: var(--logo-url) center / contain no-repeat;
  -webkit-mask: var(--logo-url) center / contain no-repeat;
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
  transition: color var(--transition-fast);
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
