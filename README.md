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

### Quick Jot dumps

Use `kind: 'quick-jot'` to link a published Quick Jot note from the Dumps page, just like a Code Canvas entry. Copy `src/content/templates/quick-jot.md.example` into `src/content/dumps/`, rename it to a descriptive `.md` filename, and fill in the metadata:

```md
---
title: 'Your note title'
date: '2026-10-16'
kind: 'quick-jot'
url: 'PASTE_YOUR_PUBLIC_QUICK_JOT_LINK_HERE'
---
```

| Field | Value |
| --- | --- |
| `title` | The note title displayed in Dumps. |
| `date` | Publication date in `YYYY-MM-DD` format; controls sorting. |
| `kind` | Always `quick-jot` for Quick Jot notes. |
| `url` | The full public `https://` link to the note. |
| `slug` | Optional unique identifier; defaults to the filename without `.md`. |

No article body is needed. Entries appear automatically in the existing date-sorted Dumps list and open the note in a new tab. The example stays outside the loaded dumps folder so it does not publish an unfinished link.

`src/components/QuickJotLogo.vue` renders the artwork from `src/assets/quickjot_logo_export.svg` as an inline SVG so it follows the same theme and hover colours as the Code Canvas icon. Keep it in sync with future logo updates. It uses `aria-hidden="true"` and `focusable="false"` because the adjacent note title labels the link.
