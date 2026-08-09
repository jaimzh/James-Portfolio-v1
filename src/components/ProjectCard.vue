<script setup>
import { ArrowUpRight, PenLine } from '@lucide/vue'
import { RouterLink } from 'vue-router'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <component
    :is="project.attachedDump ? RouterLink : 'a'"
    :id="`project-${project.id}`"
    :to="
      project.attachedDump
        ? { name: 'project-dump', params: { projectId: project.id } }
        : undefined
    "
    :href="project.attachedDump ? undefined : project.url"
    :target="project.attachedDump ? undefined : '_blank'"
    :rel="project.attachedDump ? undefined : 'noopener noreferrer'"
    class="project-card"
  >
    <div class="project-content">
      <div class="project-card-header">
        <h3 class="project-name">{{ project.name }}</h3>
        <span
          class="project-arrow"
          :title="project.attachedDump ? 'Open project dump' : 'Open live project'"
        >
          <PenLine
            v-if="project.attachedDump"
            :size="16"
            :stroke-width="1.8"
            aria-hidden="true"
          />
          <ArrowUpRight v-else :size="16" :stroke-width="1.8" aria-hidden="true" />
        </span>
      </div>

      <p class="project-desc">{{ project.description }}</p>

      <div class="project-tags" aria-label="Project tags">
        <span v-for="tag in project.tags" :key="tag" class="project-tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="project-image-wrapper">
      <div class="project-image">
        <img :src="project.previewImage" :alt="`${project.name} Preview`" loading="lazy" />
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--card-bg);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.project-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  height: 3px;
  background: var(--accent);
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.project-card:hover::before,
.project-card:focus-visible::before {
  transform: scaleX(1);
}

.project-card:hover,
.project-card:focus-visible {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.project-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: var(--space-md);
}

.project-name {
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
}

.project-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    transform var(--transition-fast);
}

.project-card:hover .project-arrow,
.project-card:focus-visible .project-arrow {
  color: var(--text-primary);
  transform: translate(2px, -2px);
}

.project-desc {
  flex: 1;
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.project-tag {
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--color-surface-muted);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
}

.project-image-wrapper {
  display: grid;
  overflow: hidden;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s var(--ease-standard) 0.2s;
}

.project-card:hover .project-image-wrapper,
.project-card:focus-visible .project-image-wrapper {
  grid-template-rows: 1fr;
}

.project-image {
  min-height: 0;
  overflow: hidden;
  border-top: 1px solid transparent;
  transition: border-color 0.4s ease;
}

.project-card:hover .project-image,
.project-card:focus-visible .project-image {
  border-top-color: var(--border);
}

.project-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img,
.project-card:focus-visible .project-image img {
  transform: scale(1.03);
}
</style>
