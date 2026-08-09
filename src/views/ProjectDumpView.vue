<script setup>
import { ArrowLeft, ArrowUpRight } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ReadingLayout from '@/components/ReadingLayout.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { getProjectById } from '@/data/projects'
import { getDumpBySlug } from '@/utils/dumps'

const route = useRoute()
const project = computed(() => getProjectById(route.params.projectId))
const linkedDump = computed(() => getDumpBySlug(project.value?.attachedDump))
</script>

<template>
  <div class="project-dump-view">
    <SiteHeader />

    <main v-if="project" class="section project-dump">
      <div class="project-primary">
        <RouterLink class="back-link" :to="{ path: '/', hash: '#projects' }">
          <ArrowLeft :size="16" :stroke-width="2" aria-hidden="true" />
          Back to Projects
        </RouterLink>

        <article class="project-overview">
          <div class="project-copy">
            <div class="project-heading-row">
              <h1 class="project-title">{{ project.name }}</h1>

              <a class="project-link" :href="project.url" target="_blank" rel="noopener noreferrer">
                Visit project
                <ArrowUpRight :size="15" :stroke-width="2" aria-hidden="true" />
              </a>
            </div>

            <p class="project-description">{{ project.description }}</p>

            <div class="project-tags" aria-label="Project tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
            </div>
          </div>

          <img
            class="project-preview"
            :src="project.previewImage"
            :alt="`${project.name} preview`"
          />
        </article>
      </div>

      <div v-if="linkedDump" class="linked-dump">
        <time v-if="linkedDump.date" class="dump-date" :datetime="linkedDump.date">
          {{ linkedDump.displayDate }}
        </time>

        <ReadingLayout
          v-if="linkedDump.kind === 'markdown'"
          :html="linkedDump.html"
          :headings="linkedDump.headings"
        />

        <a
          v-else
          class="external-dump-link"
          :href="linkedDump.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {{ linkedDump.title }}
          <ArrowUpRight :size="16" :stroke-width="2" aria-hidden="true" />
        </a>
      </div>

      <p v-else class="empty-state">The linked dump could not be found.</p>
    </main>

    <main v-else class="section project-dump not-found">
      <RouterLink class="back-link" :to="{ path: '/', hash: '#projects' }">
        <ArrowLeft :size="16" :stroke-width="2" aria-hidden="true" />
        Back to Projects
      </RouterLink>
      <h1>Project not found.</h1>
    </main>

    <SiteFooter :show-links="false" />
  </div>
</template>

<style scoped>
.project-dump-view {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.project-dump {
  width: 100%;
  flex: 1;
  max-width: 1280px;
  padding-top: 8rem;
}

.project-primary {
  max-width: var(--container);
  margin-inline: auto;
}

.back-link,
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.back-link:hover,
.back-link:focus-visible,
.project-link:hover,
.project-link:focus-visible {
  color: var(--text-primary);
}

.project-overview {
  overflow: hidden;
  margin-top: var(--space-xl);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--card-bg);
}

.project-copy {
  padding: 1.5rem;
}

.project-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-lg);
}

.project-title {
  color: var(--text-primary);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.project-link {
  flex-shrink: 0;
}

.project-description {
  max-width: 65ch;
  margin-top: var(--space-md);
  color: var(--text-secondary);
  line-height: 1.7;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: var(--space-lg);
}

.project-tag {
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--color-surface-muted);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
}

.project-preview {
  width: 100%;
  max-height: 440px;
  border-top: 1px solid var(--border);
  object-fit: cover;
  object-position: top;
}

.linked-dump {
  margin-top: var(--space-2xl);
}

.dump-date {
  display: block;
  max-width: var(--container);
  margin-bottom: var(--space-lg);
  margin-inline: auto;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.external-dump-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.empty-state {
  margin-top: var(--space-2xl);
  color: var(--text-secondary);
}

.not-found h1 {
  margin-top: var(--space-xl);
}

@media (max-width: 560px) {
  .project-heading-row {
    flex-direction: column;
    gap: var(--space-sm);
  }
}

@media (min-width: 640px) {
  .project-copy {
    padding: 2rem;
  }
}
</style>
