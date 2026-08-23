---
title: 'Building Code Canvas'
date: '2026-08-11'
---

# Building Code Canvas

Code Canvas is an infinite spatial whiteboard for people who do not always think in a straight line. Instead of forcing every idea into a list of files or tabs, it gives code, diagrams, notes, and experiments a shared visual space.

This dump is a growing record of why I built Code Canvas, how the pieces fit together, and what I learned while turning the idea into a working product.

## The idea


Most development tools separate different parts of the thinking process. Code lives in an editor, diagrams live somewhere else, and quick notes usually end up scattered across several apps.

I wanted to explore a different workflow: one canvas where related ideas could remain visually connected. The position of an item should carry meaning, not just its filename or place in a folder.

I simply wanted to draw over code to put it as bluntly as possible, i am a visual learner and i figured, it'd be easier to draw over code or notes in an infinte whiteboard like canvas

I also hated the fact that Notion was a little bit too limiting, i could not draw over markdown or record voice notes there, so i was like "hey why not just build my own Documenting app", but in my pursuit for silver i made gold accidently. I genuinely think codecanvas might be the most overpowered note taking app ever, that fits **MY** specifications and needs exaclty the way i want it. 

## The problem

Non-linear work becomes difficult when every tool expects a linear workflow. Constantly switching between editors, diagram tools, notes, and browser previews breaks context and makes it harder to see how ideas relate to one another.

I wrote notes about code in Notion or Obsidian and switching to vscode or even a browser article when doing some kind of research became overwhelming.

Code Canvas tries to reduce that fragmentation by bringing those materials and more into one workspace without turning the interface into a crowded dashboard....well, depending on how organized you are

## What I built

The project combines ~~nine~~ twelve custom interactive tools built ontop of [tldraw's](https://www.tldraw.com) infinite canvas. Each tool represents a different kind of thought or working material.

### Cross Platform Project Sync
You create an account, and all your code canvas projects are securely stored on the cloud, you can organize your projects into folders, share projects as live links, import, export...man i really should get to finish code canvas's official documentation (-ヘ-｀)

### Code Card
Import code snippets or an entire code base as a properly syntax highlighted Code Cards....jeez that barely explains anything, i'll attatch images later and fill up the remaining 10 or 9 tools 


## Technology choices

Code Canvas is built with Next.js and TypeScript. Tldraw provides the spatial canvas foundation, Monaco Editor powers the embedded code-editing experience, and MongoDB is part of the full-stack application architecture.

These technologies each solve a specific part of the product, but the more important challenge is making them feel like one coherent workspace rather than several tools placed next to each other.

## The design challenge

Adding more tools is easy. Keeping nine tools understandable is much harder.

Every tool needs to feel discoverable without permanently competing for attention. That means keeping controls restrained, making interactions predictable, and allowing the content on the canvas to remain visually dominant.

## What I learned

Building Code Canvas reinforced that spatial software needs a different design mindset from a normal page-based application. Position, scale, selection, and movement all become part of the interface language.

It also showed me that technical integration is only half the work. Even when each tool works independently, the product succeeds only when moving between those tools feels natural.

## Where it is going

Code Canvas is still evolving. I am continuing to refine how its tools connect, how work is organized, and how the workspace can remain fast and understandable as a canvas grows.

This dump will grow alongside the project with implementation notes, difficult decisions, failed experiments, and the solutions that survive.
