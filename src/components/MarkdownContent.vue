<script setup>
defineProps({
  html: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="markdown-body" v-html="html"></article>
</template>

<style scoped>
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

.markdown-body :deep(h1:first-child) {
  margin-top: 0;
}

.markdown-body :deep(p) {
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
  line-height: 1.7;
}

.markdown-body :deep(a) {
  color: var(--accent);
  font-weight: var(--font-weight-semibold);
}
</style>
