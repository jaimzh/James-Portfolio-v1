import { createRouter, createWebHistory } from 'vue-router'

import DumpPostView from '@/views/DumpPostView.vue'
import DumpsView from '@/views/DumpsView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectDumpView from '@/views/ProjectDumpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dumps',
      name: 'dumps',
      component: DumpsView,
    },
    {
      path: '/dumps/:slug',
      name: 'dump-post',
      component: DumpPostView,
    },
    {
      path: '/projects/:projectId/dump',
      name: 'project-dump',
      component: ProjectDumpView,
    },
  ],
})

export default router
