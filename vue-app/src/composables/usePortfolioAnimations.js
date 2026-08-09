import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function animateProjectCards() {
  if (prefersReducedMotion()) return

  gsap.fromTo(
    '.project-card',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'transform',
    },
  )
}

export function usePortfolioAnimations(rootRef) {
  let animationContext
  let nameCycleCall

  function startNameCycle() {
    const names = ['James Henshaw', 'Jaimz H', 'Jaimz with a Z', 'Jaimz is a Dev', 'Him']
    const textEl = document.querySelector('.hero-name-text')
    const cursorEl = document.querySelector('.hero-name-cursor')

    if (!textEl || !cursorEl) return

    let currentIndex = 0

    function backspaceText(el, onComplete) {
      const currentText = el.textContent

      if (currentText.length === 0) {
        onComplete()
        return
      }

      const timeline = gsap.timeline({ onComplete })
      const charDelay = 0.6 / currentText.length

      for (let i = currentText.length; i >= 0; i -= 1) {
        timeline.call(
          () => {
            el.textContent = currentText.substring(0, i)
          },
          null,
          i === currentText.length ? 0 : `+=${charDelay}`,
        )
      }
    }

    function cycleNames() {
      const nextIndex = (currentIndex + 1) % names.length
      const nextName = names[nextIndex]

      gsap.set(cursorEl, { opacity: 1, animation: 'none' })

      backspaceText(textEl, () => {
        gsap.to(textEl, {
          delay: 0.3,
          duration: 0.7,
          text: { value: nextName, delimiter: '' },
          ease: 'none',
          onComplete: () => {
            gsap.set(cursorEl, {
              animation: 'cursorBlink 0.75s step-end infinite',
            })
            currentIndex = nextIndex
            nameCycleCall = gsap.delayedCall(3, cycleNames)
          },
        })
      })
    }

    nameCycleCall = gsap.delayedCall(3, cycleNames)
  }

  onMounted(async () => {
    await nextTick()

    if (prefersReducedMotion()) return

    animationContext = gsap.context(() => {
      gsap.fromTo(
        '.hero-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 },
      )

      gsap.fromTo(
        '.hero-avatar-wrap',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5 },
      )

      gsap.fromTo(
        '.hero-body > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.7,
        },
      )

      gsap.from('.card-about', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.card-about',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.utils.toArray('.divider').forEach((divider) => {
        gsap.from(divider, {
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: divider,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray('.section-heading').forEach((heading) => {
        gsap.from(heading, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray('.section-info').forEach((info) => {
        gsap.from(info, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.set('.tech-list > li', { y: 25, opacity: 0, scale: 0.9 })

      ScrollTrigger.batch('.tech-list > li', {
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            clearProps: 'transform',
          }),
        trigger: '.tech-list',
        start: 'top 85%',
        once: true,
      })

      gsap.set('.project-card', { y: 50, opacity: 0 })

      ScrollTrigger.batch('.project-card', {
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power2.out',
            clearProps: 'transform',
          }),
        start: 'top 80%',
        once: true,
      })

      ScrollTrigger.batch('.footer-socials li', {
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          }),
        start: 'top 90%',
        once: true,
      })

      gsap.from('.footer-text', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 90%',
          once: true,
        },
      })
    }, rootRef.value)

    startNameCycle()
  })

  onBeforeUnmount(() => {
    nameCycleCall?.kill()
    animationContext?.revert()
  })
}
