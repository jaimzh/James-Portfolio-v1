import browserImage from '@/assets/projects/ai-browser-gateway.png'
import autosortImage from '@/assets/projects/autosort.png'
import calebCazImage from '@/assets/projects/caleb-caz.png'
import codeCanvasImage from '@/assets/projects/code-canvas.png'
import cortexImage from '@/assets/projects/cortex.png'
import diffStudioImage from '@/assets/projects/diff-studio.png'
import lnnkImage from '@/assets/projects/lnnk.png'
import orbitImage from '@/assets/projects/orbit.png'
import pitchPackImage from '@/assets/projects/pitch-pack.png'
import roadmapImage from '@/assets/projects/roadmap-projects.png'
import simplrImage from '@/assets/projects/simplr.png'

export const projects = [
  {
    id: 'code-canvas',
    name: 'Code Canvas',
    description:
      'A fullstack infinite, spatial whiteboard for non-linear thinkers, featuring nine custom interactive tools including live code editors, Mermaid diagrams, voice notes, and sandboxed HTML environments.',
    attachedDump: 'building-code-canvas',
    url: 'https://code-canvas-tldraw.vercel.app/',
    previewImage: codeCanvasImage,
    tags: ['Next.js', 'TypeScript', 'Tldraw', 'MongoDB', 'Monaco Editor'],
  },
  {
    id: 'caleb-caz',
    name: 'Caleb Caz Portfolio',
    description:
      'A polished portfolio website designed and built for a client, featuring smooth animations and a modern layout.',
    url: 'https://caleb-caz.vercel.app/',
    previewImage: calebCazImage,
    tags: ['React', 'CSS', 'Framer Motion'],
  },
  {
    id: 'lnnk',
    name: 'Lnnk',
    description:
      'A minimal URL shortener for creating short links and QR codes, with lightweight CDN-style file sharing.',
    url: 'https://lnkkk.click/',
    previewImage: lnnkImage,
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Zod'],
  },
  {
    id: 'simplr',
    name: 'Simplr',
    description:
      'Simplr is a Chrome extension that provides instant word definitions and AI-powered text simplification directly on any webpage without leaving your current tab.',
    url: 'https://simplr-landing-page.vercel.app/',
    previewImage: simplrImage,
    tags: ['JavaScript', 'Chrome API', 'HTML/CSS'],
  },
  {
    id: 'pitch-pack',
    name: 'PitchPack',
    description:
      'An AI-powered outreach suite for content creators that generates tailored emails, DMs, and campaign strategies based on creator profiles.',
    url: 'https://pitchpack.vercel.app/',
    previewImage: pitchPackImage,
    tags: ['Next.js', 'TypeScript', 'Gemini API', 'Zustand'],
  },
  {
    id: 'ai-browser-gateway',
    name: 'AI Browser Gateway',
    description:
      'A local FastAPI gateway that turns a browser-based AI assistant into an HTTP API using Playwright and Chrome automation.',
    url: 'https://github.com/jaimzh/ai-browser-gateway',
    previewImage: browserImage,
    tags: ['Python', 'FastAPI', 'Playwright', 'Browser Automation', 'AI'],
  },
  {
    id: 'cortex-engine',
    name: 'Cortex',
    description:
      'A private, context-aware, voice-driven workspace assistant and headless text engine that integrates local-first AI and system tools to manipulate screen text and execute commands.',
    url: 'https://github.com/jaimzh/cortex-voice-engine',
    previewImage: cortexImage,
    tags: ['Python', 'Whisper AI', 'Ollama', 'LLM', 'Automation'],
  },
  {
    id: 'autosort',
    name: 'AutoSort',
    description:
      'A smart file organization utility desktop app featuring a Python-powered rule engine and a live-pulse Flutter dashboard to automate digital cleanup.',
    url: 'https://auto-sort-landing.vercel.app/',
    previewImage: autosortImage,
    tags: ['Python', 'FastAPI', 'Flutter', 'Windows'],
  },
  {
    id: 'orbit-shortcut-tool',
    name: 'Orbit',
    description:
      'A lightweight floating radial keyboard shortcut launcher for Windows. JSON configurable. Always on top.',
    url: 'https://github.com/jaimzh/orbit-shortcut-tool',
    previewImage: orbitImage,
    tags: ['Dart', 'Flutter', 'Windows'],
  },
  {
    id: 'diff-studio',
    name: 'Diff Studio',
    description:
      'A private, ephemeral, client-side code comparison tool featuring side-by-side Monaco editors, visual diffing, and integrated local-first AI analysis.',
    url: 'https://diff-studio.vercel.app/',
    previewImage: diffStudioImage,
    tags: ['React', 'TypeScript', 'Vite', 'Monaco Editor', 'Zustand'],
  },
  {
    id: 'roadmap-sh-projects',
    name: 'Roadmap.sh Python Projects',
    description: 'A collection of all my python fullstack/backend roadmap.sh projects.',
    url: 'https://github.com/jaimzh/Roadmap.sh-Python-Projects',
    previewImage: roadmapImage,
    tags: ['Python', 'Backend', 'Roadmap.sh', 'Full-Stack'],
  },
]

export function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId)
}

export function getProjectByAttachedDump(attachedDump) {
  return projects.find((project) => project.attachedDump === attachedDump)
}
