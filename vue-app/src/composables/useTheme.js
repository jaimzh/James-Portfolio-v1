import { computed, ref, watchEffect } from 'vue'

const storageKey = 'jaimz-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(storageKey)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref(getInitialTheme())

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function setTheme(nextTheme) {
    theme.value = nextTheme
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  watchEffect(() => {
    if (typeof document === 'undefined') return

    document.documentElement.dataset.theme = theme.value
    document.documentElement.style.colorScheme = theme.value
    window.localStorage.setItem(storageKey, theme.value)
  })

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  }
}
