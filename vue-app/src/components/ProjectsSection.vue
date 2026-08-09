<script setup>
import { computed, ref } from 'vue'

import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'

const pageSize = 5
const currentPage = ref(0)

const pageCount = computed(() => Math.ceil(projects.length / pageSize))

const visibleProjects = computed(() => {
  const start = currentPage.value * pageSize
  return projects.slice(start, start + pageSize)
})

const isFirstPage = computed(() => currentPage.value === 0)
const isLastPage = computed(() => currentPage.value === pageCount.value - 1)

function goToPage(page) {
  currentPage.value = page
}

function goToPreviousPage() {
  if (!isFirstPage.value) {
    currentPage.value -= 1
  }
}

function goToNextPage() {
  if (!isLastPage.value) {
    currentPage.value += 1
  }
}
</script>

<template>
  <div class="section">
    <h2 id="projects-title" class="section-heading">Projects</h2>
    <p class="section-info">A curated selection of recent projects and designs</p>

    <div class="projects-grid">
      <ProjectCard v-for="project in visibleProjects" :key="project.id" :project="project" />
    </div>

    <div class="carousel-dots">
      <div class="dots-wrapper" role="group" aria-label="Project pages">
        <button
          class="pagination-btn pagination-prev"
          type="button"
          :disabled="isFirstPage"
          aria-label="Go to previous project page"
          @click="goToPreviousPage"
        >
          Previous
        </button>

        <button
          v-for="page in pageCount"
          :key="page"
          class="dot"
          :class="{ active: currentPage === page - 1 }"
          type="button"
          :aria-label="`Go to project page ${page}`"
          :aria-current="currentPage === page - 1 ? 'page' : 'false'"
          @click="goToPage(page - 1)"
        ></button>

        <button
          class="pagination-btn pagination-next"
          type="button"
          :disabled="isLastPage"
          aria-label="Go to next project page"
          @click="goToNextPage"
        >
          Next
        </button>
      </div>

      <span class="page-counter"> Page {{ currentPage + 1 }} of {{ pageCount }} </span>
    </div>
  </div>
</template>

<style scoped>
.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: var(--space-xl);
}

.carousel-dots {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--container);
  margin: var(--space-xl) auto 0;
  gap: var(--space-md);
}

.dots-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: var(--card-bg);
  box-shadow: var(--shadow-sm);
}

.page-counter {
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.3px;
  text-align: right;
}

.pagination-btn,
.dot {
  border: 0;
  font: inherit;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.pagination-btn {
  min-height: 2rem;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: var(--font-weight-bold);
}

.pagination-btn:hover,
.pagination-btn:focus-visible {
  background: var(--color-surface-muted);
  color: var(--text-primary);
}

.pagination-btn:disabled {
  color: var(--text-muted);
  cursor: not-allowed;
  opacity: 0.55;
}

.pagination-btn:disabled:hover {
  background: transparent;
  color: var(--text-muted);
}

.dot {
  width: 0.65rem;
  height: 0.65rem;
  padding: 0;
  border-radius: 50%;
  background: var(--text-muted);
}

.dot.active {
  background: var(--accent);
  transform: scale(1.2);
}

.dot:hover,
.dot:focus-visible {
  background: var(--text-secondary);
}

.pagination-btn:focus-visible,
.dot:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@media (max-width: 520px) {
  .carousel-dots {
    align-items: flex-start;
    flex-direction: column;
  }

  .dots-wrapper {
    width: 100%;
    overflow-x: auto;
    justify-content: flex-start;
  }
}
</style>
