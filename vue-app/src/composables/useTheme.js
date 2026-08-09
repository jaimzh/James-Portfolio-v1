import { computed, nextTick, ref, watchEffect } from 'vue'
import gsap from 'gsap'

const storageKey = 'jaimz-theme'
const transitionDuration = 600

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

  async function toggleTheme(event) {
    const nextTheme = isDark.value ? 'light' : 'dark'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reducedMotion) {
      setTheme(nextTheme)
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    document.documentElement.classList.add('theme-transitioning')
    gsap.globalTimeline.pause()

    const transition = document.startViewTransition(async () => {
      setTheme(nextTheme)
      await nextTick()
    })

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning')
      gsap.globalTimeline.resume()
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: transitionDuration,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
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
