---
title: Image lightbox
category: Features
description: Zoomable content images with galleries, captions and keyboard nav.
updated: 2026-09-01
tags: [lightbox, images, media]
---

Every image inside the article body becomes a **click-to-zoom** target. No
markup required.

## Behaviour

- Click (or focus + <kbd>Enter</kbd>) an image to open the overlay
- Multiple images on a page form a **gallery**: <kbd>←</kbd> / <kbd>→</kbd> to
  move, the counter shows `3 / 8`
- <kbd>Esc</kbd> or a click on the backdrop closes it
- The caption comes from the image `alt` text, or a `<figcaption>` if present

## Opt out

```html
<img src="/assets/images/logo.svg" class="no-lightbox" alt="Logo">
```

Images already wrapped in a link are skipped automatically.

## High-resolution zoom

Serve a small image in the page and a large one in the lightbox:

```html
<img src="screenshot-800.jpg"
     data-full="screenshot-2000.jpg"
     alt="The dashboard, annotated" loading="lazy">
```

## Disable globally

```yaml
docsteer:
  lightbox:
    enabled: false
```

When disabled, `lightbox.js` is not even loaded.

## Sample gallery

![A soft blue gradient placeholder](https://placehold.co/1200x700/2f81f7/ffffff?text=Figure+1)

![A green gradient placeholder](https://placehold.co/1200x700/0f9d6e/ffffff?text=Figure+2)

![A purple gradient placeholder](https://placehold.co/1200x700/7c5cff/ffffff?text=Figure+3)
