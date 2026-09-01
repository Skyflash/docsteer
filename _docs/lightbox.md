---
title: Image lightbox
category: Features
description: Zoomable content images with galleries, captions and keyboard nav.
date: 2026-09-01
last_modified_at: 2026-09-01
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

## Try it — sample gallery

Three images, so they form a gallery. Click any one, then use
<kbd>←</kbd> / <kbd>→</kbd> to move between them and <kbd>Esc</kbd> to close.
Each shows the same layout in a different skin.

![Figure 1, aqua skin]({{ '/assets/images/sample-1.svg' | relative_url }})

![Figure 2, violet skin]({{ '/assets/images/sample-2.svg' | relative_url }})

![Figure 3, mint skin]({{ '/assets/images/sample-3.svg' | relative_url }})

<div class="callout callout--warning">
  <span class="callout__icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
  <div>
    <p class="callout__title">Give SVGs a width and height</p>
    <p>An SVG carrying only a <code>viewBox</code> has no intrinsic size, so the
    browser falls back to 300×150 — and since the lightbox caps size rather than
    forcing it, such an image opens <em>smaller</em> than it looked in the page.
    Put <code>width</code> and <code>height</code> on the <code>&lt;svg&gt;</code>
    element and the problem disappears. The theme also carries a fallback rule
    for SVGs that lack them.</p>
  </div>
</div>
