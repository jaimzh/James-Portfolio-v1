<script setup>
import { ArrowLeft } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import MarkdownContent from '@/components/MarkdownContent.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { getProjectByAttachedDump } from '@/data/projects'
import { getDumpBySlug } from '@/utils/dumps'

const route = useRoute()
const dump = computed(() => getDumpBySlug(route.params.slug))
const project = computed(() => getProjectByAttachedDump(dump.value?.slug))
const backDestination = computed(() =>
  project.value
    ? { name: 'project-dump', params: { projectId: project.value.id } }
    : { name: 'dumps' },
)
const backLabel = computed(() => (project.value ? `Back to ${project.value.name}` : 'Back to Dumps'))
</script>

<template>
  <div class="dump-post-view">
    <SiteHeader />

    <main v-if="dump" class="section dump-post">
      <div class="dump-post-topbar">
        <RouterLink class="back-link" :to="backDestination">
          <ArrowLeft :size="16" :stroke-width="2" />
          {{ backLabel }}
        </RouterLink>

        <time class="dump-date" :datetime="dump.date">{{ dump.displayDate }}</time>
      </div>

      <MarkdownContent :html="dump.html" />
    </main>

    <main v-else class="section dump-post">
      <RouterLink class="back-link" to="/dumps">
        <ArrowLeft :size="16" :stroke-width="2" />
        Back to Dumps
      </RouterLink>
      <h1 class="section-heading">Dump not found.</h1>
    </main>
  </div>
</template>

<style scoped>
.dump-post {
  padding-top: 8rem;
}

.dump-post-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.back-link:hover,
.back-link:focus-visible {
  color: var(--accent);
}

.dump-date {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

</style>
