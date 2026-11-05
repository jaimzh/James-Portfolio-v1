---
title: 'Making my first JS library'
date: '2026-11-05'
---
# Making My First JavaScript Library

I’ve been working on Code Canvas, and one thing became very apparent pretty quickly: I needed two-finger tap to undo and three-finger tap to redo, just like Procreate on the iPad.

I use my iPad a lot when I’m working with Code Canvas, so this wasn’t just a random nice-to-have. It was the kind of interaction I had become used to. Once you have a gesture like that, going back to buttons feels a little painful.

## I had already tried this before

I’ll admit it: I had tried to make this work before and eventually gave up. I assumed it probably couldn’t be done properly on the web. In my head, this was a native iPad feature, and native features are usually where the web starts feeling limited.

Fast-forward a few months. I started another side quest: building a drawing app for SVGs. And, of course, I immediately needed two-finger tap to undo again.

At that point I thought: hook or by crook, I have to get this working.

## The basic idea

I tried to stop overcomplicating it and think about the problem logically. The basic pseudocode was something like this:

1. Register the first finger.
2. Wait for another finger to arrive.
3. If it arrives within a certain time interval, register it as part of the same gesture.
4. When all the fingers are lifted, work out what happened.
5. If two fingers tapped, undo. If three fingers tapped, redo.

Of course, the real world adds a few edge cases. What if the fingers arrive too far apart? What if someone starts tapping but slides their fingers? What if the gesture lasts too long? What if the fingers move in different directions?

The simple part was recognising that the fingers had to be registered within a time window. The more complicated part was making sure that ordinary movement, slow taps, diagonal swipes, and incomplete gestures did not accidentally trigger a handler.

## A prototype from my phone

I did some more research with Claude to check whether my approach made sense. To my surprise, it did. Since I wasn’t on my laptop at the time, I asked Claude for a basic throwaway prototype.

I honestly didn’t expect it to work.

But it did.

I tested it on my phone: two fingers to undo, three fingers to redo, and it actually worked. The prototype was rough, but it was good enough to prove that the idea wasn’t impossible after all. That was the moment I realised I might have something worth turning into a real project.

## Making it a little more useful

Once the basic version worked, I pushed it a bit further. I added support for more than just two-finger and three-finger taps, including four-finger gestures and swipes.

Did I need all of that immediately? Not really. But I figured I might use this in more projects later, and I wanted to understand where the idea could go.

After testing it and going through the code carefully, I made sure I understood what was happening both at a high level and, at least to a reasonable extent, at a lower level too. Then I thought: alright, let’s see if this can become an npm package.

## How the package works

The package listens for Pointer Events on an element you provide. That element could be a canvas, a drawing area, or another part of an app that should respond to gestures.

```ts
const removeGestures = fingerGestures(canvas, {
  tap: { 2: undo, 3: redo },
  swipe: { 3: { up: openMenu, down: closeMenu } },
})
```

When `fingerGestures` is called, it starts watching the canvas. It records when each pointer goes down, how close together the fingers arrived, how far they moved, and when they were released.

When the last finger lifts, the package decides what kind of gesture it was. A gesture can become a tap if the fingers stayed mostly still, or a swipe if they moved far enough in a mostly consistent direction. Gestures that do not meet the rules are rejected instead of accidentally triggering an action.

The function also returns a cleanup function. That is why it is stored in `removeGestures`. Calling `fingerGestures(...)` sets everything up immediately; calling `removeGestures()` later removes the listeners when the canvas is no longer needed.

So the pattern is basically:

> Set it up now, return the cleanup function, and clean it up later.

## Turning it into an npm package

I had never made an npm package before, so I did some research. One resource I found useful was [freeCodeCamp’s guide to creating and publishing your first npm package](https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/). It covered the basic process clearly enough to help me understand what needed to happen next.

The package is now called `finger-gestures`. The main reason for packaging it was simple: I expect I’ll want this interaction in more projects. I don’t want to rebuild the same gesture tracking logic every time. If I can make it reusable once, I can install it wherever I need it and focus on the actual project instead.

You can [try the live demo](https://finger-gestures.vercel.app/) or find the package on [npm](https://www.npmjs.com/package/finger-gestures).

## The unexpected part

For some reason, people other than me started using this package. I had not promoted it, shared it with anyone, or even really told people about it. Then I noticed it had passed 300 installs and was still getting installs every day.

Honestly, what do you mean? How did people even find this?

It is a small project, but seeing other people use it without me asking them to is surprisingly motivating. I made `finger-gestures` because I needed it for my own projects, and now it seems like it might be useful to other people too.
