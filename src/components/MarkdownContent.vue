<script setup>
import mermaid from 'mermaid'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  html: {
    type: String,
    required: true,
  },
})

const markdownBody = ref(null)
const renderKey = ref(0)
let themeObserver

function getMermaidTheme() {
  if (typeof document === 'undefined') return 'neutral'

  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral'
}

async function renderMermaid() {
  await nextTick()

  const diagrams = markdownBody.value?.querySelectorAll('.mermaid')

  if (!diagrams?.length) return

  try {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: getMermaidTheme(),
    })

    await mermaid.run({
      nodes: diagrams,
    })
  } catch (error) {
    diagrams.forEach((diagram) => {
      diagram.classList.add('mermaid-error')
    })
    console.error('Unable to render Mermaid diagram:', error)
  }
}

onMounted(() => {
  renderMermaid()

  themeObserver = new MutationObserver((mutations) => {
    const themeChanged = mutations.some((mutation) => mutation.attributeName === 'data-theme')

    if (!themeChanged) return

    renderKey.value += 1
    renderMermaid()
  })

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
})

watch(() => props.html, renderMermaid)
</script>

<template>
  <article :key="renderKey" ref="markdownBody" class="markdown-body" v-html="html"></article>
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

.markdown-body :deep(h1[id]),
.markdown-body :deep(h2[id]),
.markdown-body :deep(h3[id]) {
  scroll-margin-top: 6rem;
}

.markdown-body :deep(p) {
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
  line-height: 1.7;
}

.markdown-body :deep(a) {
  color: var(--accent);
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  text-decoration-color: var(--text-muted);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
  transition:
    color var(--transition-fast),
    text-decoration-color var(--transition-fast);
}

.markdown-body :deep(a:hover),
.markdown-body :deep(a:focus-visible) {
  color: var(--accent-hover);
  text-decoration-color: currentColor;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 0 0 var(--space-md);
  padding-left: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.markdown-body :deep(ul) {
  list-style: disc;
}

.markdown-body :deep(ol) {
  list-style: decimal;
}

.markdown-body :deep(li) {
  margin-bottom: var(--space-xs);
}

.markdown-body :deep(li > ul),
.markdown-body :deep(li > ol) {
  margin-top: var(--space-xs);
  margin-bottom: 0;
}

.markdown-body :deep(li::marker) {
  color: var(--text-muted);
}

.markdown-body :deep(.mermaid) {
  width: 100%;
  margin: var(--space-xl) 0;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  padding: var(--space-md);
}

.markdown-body :deep(.mermaid svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.markdown-body :deep(.mermaid-error) {
  color: var(--text-secondary);
  white-space: pre-wrap;
}
</style>
