<script setup>
import DumpCard from '@/components/DumpCard.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { dumps } from '@/utils/dumps'
</script>

<template>
  <div class="dumps-view">
    <SiteHeader />

    <main class="section dumps-page" aria-labelledby="dumps-title">
      <h1 id="dumps-title" class="section-heading">Notes, links, and little thoughts.</h1>
      <p class="section-info">
        Markdown posts live here. Code Canvas and external dumps open where they were made.
      </p>

      <div class="dumps-list">
        <DumpCard v-for="dump in dumps" :key="dump.slug" :dump="dump" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dumps-page {
  padding-top: 8rem;
}

.dumps-page :deep(.section-heading) {
  font-weight: var(--font-weight-semibold);
}

.dumps-list {
  display: grid;
  margin-top: var(--space-2xl);
}
</style>
