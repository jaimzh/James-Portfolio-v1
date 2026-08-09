<script setup>
import { ArrowLeft } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import SiteHeader from '@/components/SiteHeader.vue'
import { getDumpBySlug } from '@/utils/dumps'

const route = useRoute()
const dump = computed(() => getDumpBySlug(route.params.slug))
</script>

<template>
  <div class="dump-post-view">
    <SiteHeader />

    <main v-if="dump" class="section dump-post">
      <div class="dump-post-topbar">
        <RouterLink class="back-link" to="/dumps">
          <ArrowLeft :size="16" :stroke-width="2" />
          Back to Dumps
        </RouterLink>

        <time class="dump-date" :datetime="dump.date">{{ dump.displayDate }}</time>
      </div>

      <article class="markdown-body" v-html="dump.html"></article>
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

.markdown-body {
  color: var(--text-primary);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-sm);
  line-height: 1.2;
}

.markdown-body :deep(p) {
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
}

.markdown-body :deep(a) {
  color: var(--accent);
  font-weight: var(--font-weight-semibold);
}
</style>
