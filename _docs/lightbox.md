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

## Try it — sample gallery

Three images, so they form a gallery. Click any one, then use
<kbd>←</kbd> / <kbd>→</kbd> to move between them and <kbd>Esc</kbd> to close.
Each shows the same layout in a different skin.

![The DocSteer layout in the aqua skin, light mode]({{ '/assets/images/sample-layout-aqua.svg' | relative_url }})

![The DocSteer layout in the violet skin, dark mode]({{ '/assets/images/sample-layout-violet.svg' | relative_url }})

![The DocSteer layout in the mint skin, light mode]({{ '/assets/images/sample-layout-mint.svg' | relative_url }})

<div class="callout callout--note">
  <span class="callout__icon"><i class="fa-solid fa-circle-info"></i></span>
  <div>
    <p class="callout__title">These are served from the theme</p>
    <p>They are local SVG files, not calls to a placeholder service. A theme
    that bundles its icons so a site works offline and behind a corporate
    firewall should not then fetch its own demo images from a third party.</p>
  </div>
</div>
