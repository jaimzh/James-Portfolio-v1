<script setup>
import resumeUrl from '@/assets/James-Henshaw-resume.pdf'

defineProps({
  showLinks: {
    type: Boolean,
    default: true,
  },
})

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/jaimzh',
    external: true,
    icon: `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/Jaimz_with_a_Z',
    external: true,
    icon: `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:jameshenshaw10@gmail.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
  {
    label: 'CV',
    href: resumeUrl,
    download: true,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  },
]
</script>

<template>
  <footer class="site-footer">
    <ul v-if="showLinks" class="footer-socials">
      <li v-for="link in socialLinks" :key="link.label">
        <a
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :aria-label="link.label"
          :download="link.download ? '' : undefined"
          class="social-link"
        >
          <span class="social-icon" v-html="link.icon"></span>
          <span class="social-text">{{ link.label }}</span>
        </a>
      </li>
    </ul>

    <p class="footer-text">&copy; 2026 James Henshaw. Built by Jaimz.</p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 3rem 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-socials {
  display: flex;
  flex-flow: row wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  background: var(--card-bg);
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.social-link:hover,
.social-link:focus-visible {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.social-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
  color: inherit;
}

.social-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.social-text {
  line-height: 1;
}

.footer-text {
  color: var(--text-muted);
  font-size: 0.8rem;
}
</style>
