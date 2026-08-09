<script setup>
import { ref } from 'vue'

import HeroCard from '@/components/HeroCard.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import TechStack from '@/components/TechStack.vue'
import { usePortfolioAnimations } from '@/composables/usePortfolioAnimations'

const homeView = ref(null)

usePortfolioAnimations(homeView)
</script>

<template>
  <div ref="homeView" class="home-view">
    <SiteHeader />

    <main>
      <section id="hero" class="hero" aria-label="Profile intro">
        <HeroCard />
      </section>

      <hr class="divider" />

      <section id="stack" class="section" aria-labelledby="stack-title">
        <TechStack />
      </section>

      <hr class="divider" />

      <section id="projects" aria-labelledby="projects-title">
        <ProjectsSection />
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  margin-top: 4rem;
  padding: 5rem 1rem 2rem;
}

@media (min-width: 640px) {
  .hero {
    padding: 5rem 1.5rem 3rem;
  }
}
</style>
