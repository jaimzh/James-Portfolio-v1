<script setup>
const stackItems = [
  {
    name: 'Python',
    icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M13 2h6a4 4 0 0 1 4 4v6.4a3.4 3.4 0 0 1-3.4 3.4h-7.3A4.3 4.3 0 0 0 8 20.1v2.6H6a4 4 0 0 1-4-4v-5.6a4 4 0 0 1 4-4h10V8.4H9V6a4 4 0 0 1 4-4Zm-.9 4.8a1.35 1.35 0 1 0 0-2.7 1.35 1.35 0 0 0 0 2.7Zm6.9 23.2h-6a4 4 0 0 1-4-4v-6.4a3.4 3.4 0 0 1 3.4-3.4h7.3a4.3 4.3 0 0 0 4.3-4.3V9.3h2a4 4 0 0 1 4 4v5.6a4 4 0 0 1-4 4H16v.7h7V26a4 4 0 0 1-4 4Zm.9-4.1a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7Z"/></svg>`,
  },
  {
    name: 'Flutter',
    icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="m18.9 14.8-8.1 8.1 8.1 8.1h9.2L20 22.9l8.1-8.1h-9.2ZM18.9 1 3.9 16l4.6 4.6L28.1 1h-9.2Z"/></svg>`,
  },
  {
    name: 'JavaScript',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 3h18v18H3V3Zm9.6 14.2c.4.8 1.2 1.4 2.5 1.4 1.5 0 2.6-.8 2.6-2.2 0-1.3-.8-1.8-2.2-2.4-.8-.3-1.1-.5-1.1-.9s.3-.7.8-.7c.4 0 .7.2 1 .7l1.2-.8c-.5-.9-1.2-1.3-2.2-1.3-1.4 0-2.3.9-2.3 2.1 0 1.3.8 1.8 1.9 2.2.9.4 1.4.6 1.4 1.1 0 .4-.4.8-1.1.8-.8 0-1.2-.4-1.5-1l-1 .9Zm-4.8.1c.4.8 1.1 1.3 2.3 1.3 1.4 0 2.4-.8 2.4-2.5V11H11v5c0 .8-.3 1.1-.8 1.1s-.7-.3-1-.8l-1.4 1Z"/></svg>`,
  },
  {
    name: 'React',
    icon: `<svg viewBox="-11.5 -10.2 23 20.4" aria-hidden="true"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  },
  {
    name: 'Next.js',
    icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2a14 14 0 1 0 8.2 25.3L12.3 10.2a1 1 0 0 0-.8-.4h-1.2a1 1 0 0 0-1 1V23h2V13.4l11.2 15.1A14 14 0 0 0 16 2Zm5.1 8h2v12.1l-2-3V10Z"/></svg>`,
  },
  {
    name: 'MongoDB',
    icon: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.2 2.2c-.1 0-.3.3-.6.6-3.7 3.2-6.1 7.7-6.1 12.7 0 4.9 2.4 9.2 6 12l.2 2.5h.6c.1-1 .3-1.9.5-2.8 3.4-2.5 5.7-6.5 5.7-11 0-5.5-2.3-10.3-6.3-14Zm-.3 20.8s0-10.5.3-10.5c.3 0 .6 13.4.6 13.4-.5-.1-.9-2.1-.9-2.9Z"/></svg>`,
  },
  {
    name: 'Figma',
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 3H9a3 3 0 0 0 0 6m3-6v6m0-6h3a3 3 0 0 1 0 6m-3 0H9m3 0h3m-3 0v6m-3-6a3 3 0 0 0 0 6m6-6a3 3 0 1 1-3 3 3 3 0 0 1 3-3ZM12 15H9m3 0v3a3 3 0 1 1-3-3"/></svg>`,
  },
]
</script>

<template>
  <div>
    <h2 id="stack-title" class="section-heading">Tech Stack</h2>
    <p class="section-info">Tools, frameworks, and languages I use.</p>

    <ul class="tech-list" aria-label="Tech stack">
      <li v-for="item in stackItems" :key="item.name">
        <span class="tech-icon" v-html="item.icon"></span>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: var(--space-xl);
}

.tech-list li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  cursor: default;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);
}

.tech-list li:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.tech-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: currentColor;
}

.tech-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
