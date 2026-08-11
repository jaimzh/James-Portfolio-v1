---
title: 'Building Code Canvas'
date: '2026-08-11'
---

# Building Code Canvas

Code Canvas is an infinite spatial whiteboard for people who do not always think in a straight line. Instead of forcing every idea into a list of files or tabs, it gives code, diagrams, notes, and experiments a shared visual space.

This dump is a growing record of why I built it, how the pieces fit together, and what I learned while turning the idea into a working product.

## The idea

Most development tools separate different parts of the thinking process. Code lives in an editor, diagrams live somewhere else, and quick notes usually end up scattered across several apps.

I wanted to explore a different workflow: one canvas where related ideas could remain visually connected. The position of an item should carry meaning, not just its filename or place in a folder.

## The problem

Non-linear work becomes difficult when every tool expects a linear workflow. Constantly switching between editors, diagram tools, notes, and browser previews breaks context and makes it harder to see how ideas relate to one another.

Code Canvas tries to reduce that fragmentation by bringing those materials into one workspace without turning the interface into a crowded dashboard.

## What I built

The project combines nine custom interactive tools inside an infinite canvas. Each tool represents a different kind of thought or working material.

### A spatial workspace

The canvas is the main interface rather than a secondary navigation layer. Items can be positioned near the ideas they relate to, allowing the workspace itself to become part of the explanation.

### Live code editors

Code editors live directly on the canvas, making it possible to write and inspect code without leaving the surrounding context. Monaco Editor provides the familiar editing experience inside those tools.

### Diagrams, notes, and experiments

Mermaid diagrams, voice notes, and sandboxed HTML environments can sit beside the code they describe. The goal is not to replace every specialist application, but to keep connected thinking in one place.

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
