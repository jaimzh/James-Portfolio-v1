import { computed, nextTick, ref, watchEffect } from 'vue'
import gsap from 'gsap'

const storageKey = 'jaimz-theme'
const transitionDuration = 1050

let activeViewTransition = null

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

    const buttonRect = event?.currentTarget?.getBoundingClientRect?.()

    // Both getBoundingClientRect() and the root view-transition snapshot use
    // layout-viewport CSS pixels. visualViewport is a different coordinate
    // space in Chrome when page zoom is not 100%.
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const x = buttonRect
      ? buttonRect.left + buttonRect.width / 2
      : Number.isFinite(event?.clientX)
        ? event.clientX
        : width / 2
    const y = buttonRect
      ? buttonRect.top + buttonRect.height / 2
      : Number.isFinite(event?.clientY)
        ? event.clientY
        : height / 2
    const endRadius =
      Math.max(
        Math.hypot(x, y),
        Math.hypot(width - x, y),
        Math.hypot(x, height - y),
        Math.hypot(width - x, height - y),
      ) + 16

    activeViewTransition?.skipTransition()
    document.documentElement.classList.add('theme-transitioning')
    gsap.globalTimeline.pause()

    const transition = document.startViewTransition(async () => {
      setTheme(nextTheme)
      await nextTick()
    })
    activeViewTransition = transition

    try {
      await transition.ready

      const reveal = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: transitionDuration,
          easing: 'cubic-bezier(.16, 1, .3, 1)',
          fill: 'both',
          pseudoElement: '::view-transition-new(root)',
        },
      )

      await reveal.finished
    } catch {
      // A newer click intentionally interrupts the previous transition.
    } finally {
      if (activeViewTransition === transition) {
        activeViewTransition = null
        document.documentElement.classList.remove('theme-transitioning')
        gsap.globalTimeline.resume()
      }
    }
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
