<script setup>
import { RouterView } from 'vue-router'

import { useTheme } from '@/composables/useTheme'

useTheme()
</script>

<template>
  <div class="app-shell">
    <RouterView />
  </div>
</template>
