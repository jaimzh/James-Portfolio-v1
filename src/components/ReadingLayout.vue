<script setup>
import MarkdownContent from '@/components/MarkdownContent.vue'
import TableOfContents from '@/components/TableOfContents.vue'

defineProps({
  html: {
    type: String,
    required: true,
  },
  headings: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="reading-layout">
    <div class="reading-layout-toc">
      <TableOfContents :headings="headings" />
    </div>

    <MarkdownContent :html="html" />

    <div class="reading-layout-balance" aria-hidden="true"></div>
  </div>
</template>

<style scoped>
.reading-layout {
  display: grid;
  gap: var(--space-xl);
}

.reading-layout-toc:empty,
.reading-layout-balance {
  display: none;
}

@media (min-width: 1000px) {
  .reading-layout {
    grid-template-columns: minmax(130px, 1fr) minmax(0, var(--container)) minmax(130px, 1fr);
    gap: clamp(1.5rem, 3vw, 3rem);
    align-items: start;
  }

  .reading-layout-toc,
  .reading-layout-toc:empty,
  .reading-layout-balance {
    display: block;
  }

  .reading-layout-toc {
    position: sticky;
    top: 7rem;
    max-height: calc(100vh - 9rem);
    overflow-y: auto;
  }
}
</style>
