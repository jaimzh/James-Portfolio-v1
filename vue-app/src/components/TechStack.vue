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
    icon: `<svg fill="#000000" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23.749 30.005c-0.119 0.063-0.109 0.083 0.005 0.025 0.037-0.015 0.068-0.036 0.095-0.061 0-0.021 0-0.021-0.1 0.036zM23.989 29.875c-0.057 0.047-0.057 0.047 0.011 0.016 0.036-0.021 0.068-0.041 0.068-0.047 0-0.027-0.016-0.021-0.079 0.031zM24.145 29.781c-0.057 0.047-0.057 0.047 0.011 0.016 0.037-0.021 0.068-0.043 0.068-0.048 0-0.025-0.016-0.020-0.079 0.032zM24.303 29.688c-0.057 0.047-0.057 0.047 0.009 0.015 0.037-0.020 0.068-0.041 0.068-0.047 0-0.025-0.016-0.020-0.077 0.032zM24.516 29.547c-0.109 0.073-0.147 0.12-0.047 0.068 0.067-0.041 0.181-0.131 0.161-0.131-0.043 0.016-0.079 0.043-0.115 0.063zM14.953 0.011c-0.073 0.005-0.292 0.025-0.484 0.041-4.548 0.412-8.803 2.86-11.5 6.631-1.491 2.067-2.459 4.468-2.824 6.989-0.129 0.88-0.145 1.14-0.145 2.333 0 1.192 0.016 1.448 0.145 2.328 0.871 6.011 5.147 11.057 10.943 12.927 1.043 0.333 2.136 0.563 3.381 0.704 0.484 0.052 2.577 0.052 3.061 0 2.152-0.24 3.969-0.771 5.767-1.688 0.276-0.14 0.328-0.177 0.291-0.208-0.88-1.161-1.744-2.323-2.609-3.495l-2.557-3.453-3.203-4.745c-1.068-1.588-2.14-3.172-3.229-4.744-0.011 0-0.025 2.109-0.031 4.681-0.011 4.505-0.011 4.688-0.068 4.792-0.057 0.125-0.151 0.229-0.276 0.287-0.099 0.047-0.188 0.057-0.661 0.057h-0.541l-0.141-0.088c-0.088-0.057-0.161-0.136-0.208-0.229l-0.068-0.141 0.005-6.271 0.011-6.271 0.099-0.125c0.063-0.077 0.141-0.14 0.229-0.187 0.131-0.063 0.183-0.073 0.724-0.073 0.635 0 0.74 0.025 0.907 0.208 1.296 1.932 2.588 3.869 3.859 5.812 2.079 3.152 4.917 7.453 6.312 9.563l2.537 3.839 0.125-0.083c1.219-0.813 2.328-1.781 3.285-2.885 2.016-2.308 3.324-5.147 3.767-8.177 0.129-0.88 0.145-1.141 0.145-2.333 0-1.193-0.016-1.448-0.145-2.328-0.871-6.011-5.147-11.057-10.943-12.928-1.084-0.343-2.199-0.577-3.328-0.697-0.303-0.031-2.371-0.068-2.631-0.041zM21.5 9.688c0.151 0.072 0.265 0.208 0.317 0.364 0.027 0.084 0.032 1.823 0.027 5.74l-0.011 5.624-0.989-1.52-0.995-1.521v-4.083c0-2.647 0.011-4.131 0.025-4.204 0.047-0.167 0.161-0.307 0.313-0.395 0.124-0.063 0.172-0.068 0.667-0.068 0.463 0 0.541 0.005 0.645 0.063z"/></g></svg>`,
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
