# James Henshaw Portfolio

A personal portfolio built with Vue and Vite. It includes animated project cards, project-linked Markdown dumps, standalone notes, theme switching, and responsive layouts.

## Project structure

```text
src/
├── assets/          Images, SVG artwork, global styles, and the résumé
├── components/      Reusable interface components
├── composables/     Theme and animation behavior
├── content/dumps/   Markdown posts and external dump metadata
├── data/            Project information
├── router/          Application routes
├── utils/           Markdown loading and dump lookup helpers
└── views/           Route-level page components

public/              Static favicon and manifest files
legacy-vanilla/      Archived version of the original vanilla website
```

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Adding a project

1. Add a descriptively named preview image to `src/assets/projects/`.
2. Import the image in `src/data/projects.js`.
3. Add the project object to the exported `projects` array.
4. If the project has a Markdown dump, add `attachedDump` with the Markdown filename without `.md`.

## Adding a dump

Add a Markdown file to `src/content/dumps/`:

```md
---
title: 'Building Something'
date: '2026-08-09'
---

# Building Something

Write the article here.
```

Markdown is the default dump kind. External entries can use `kind: 'external'`, while Code Canvas entries can use `kind: 'code-canvas'` and provide a `url`.
