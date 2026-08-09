<script setup>
import { FileText, LinkIcon } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import codeCanvasLogo from '@/assets/code-canvas-logo.svg'
import { getDumpHref, opensExternally } from '@/utils/dumps'

defineProps({
  dump: {
    type: Object,
    required: true,
  },
})

function kindIcon(kind) {
  if (kind === 'external') return LinkIcon
  return FileText
}
</script>

<template>
  <component
    :is="opensExternally(dump) ? 'a' : RouterLink"
    class="dump-card"
    :to="opensExternally(dump) ? undefined : getDumpHref(dump)"
    :href="opensExternally(dump) ? getDumpHref(dump) : undefined"
    :target="opensExternally(dump) ? '_blank' : undefined"
    :rel="opensExternally(dump) ? 'noopener noreferrer' : undefined"
  >
    <div class="dump-line">
      <span class="dump-title-group">
        <span class="dump-source-icon">
          <img
            v-if="dump.kind === 'code-canvas'"
            :src="codeCanvasLogo"
            alt="Code Canvas"
            class="dump-source-logo"
          />
          <component v-else :is="kindIcon(dump.kind)" :size="14" :stroke-width="2" />
        </span>

        <h2 class="dump-title">{{ dump.title }}</h2>
      </span>

      <span class="dump-date">
        <time :datetime="dump.date">{{ dump.displayDate }}</time>
      </span>
    </div>
  </component>
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
  width: 18px;
  height: 18px;
  max-width: none;
  object-fit: contain;
  transition: filter var(--transition-fast);
}

.dump-card:hover .dump-source-logo,
.dump-card:focus-visible .dump-source-logo {
  filter: brightness(0);
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
