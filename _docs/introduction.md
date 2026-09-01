---
title: Introduction
category: Getting started
description: What DocSteer is, who it is for, and how it is put together.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [overview, jekyll, theme]
---

**DocSteer** is a Jekyll theme for **technical documentation, support portals
and internal knowledge bases**. It is built to be fast, accessible and easy to
customise without touching the internals.

## Highlights

- **Six colour skins** — `aqua`, `violet`, `mint`, `ember`, `graphite`,
  `clay` — each with light and dark variants.
- **Live search** — a prebuilt JSON index and a keyboard-friendly modal
  (`/` or <kbd>⌘</kbd><kbd>K</kbd>). No external library.
- **Image lightbox** — click any content image to zoom, with galleries and
  captions.
- **Auto table of contents** with scroll-spy, generated from your headings.
- **SEO ready** — `jekyll-seo-tag`, sitemap, RSS feed, Open Graph, JSON-LD.
- **Zero framework** — a few kB of vanilla JS, compressed CSS, deferred scripts.

> **Note:** DocSteer works both as a cloned starter repo *and* as a published
> theme gem. Most users just fork the repo — see [Installation]({{ '/docs/installation/' | relative_url }}).

## How it is organised

| Folder | What lives there |
| --- | --- |
| `_layouts/` | `default`, `home`, `doc`, `page` |
| `_includes/` | Header, sidebar, footer, search modal, TOC — small and overridable |
| `_sass/docsteer/` | One partial per concern; **all colours in `_skins.scss`** |
| `assets/js/` | `main.js`, `search.js`, `lightbox.js` — independent, dependency-free |
| `_data/navigation.yml` | Top nav + grouped sidebar |
| `_docs/` | This documentation, as a Jekyll collection |

## Next steps

1. [Install and run it locally]({{ '/docs/installation/' | relative_url }})
2. [Configure the theme]({{ '/docs/configuration/' | relative_url }})
3. [Pick a colour skin]({{ '/docs/skins/' | relative_url }})
4. [Wire up your navigation]({{ '/docs/navigation/' | relative_url }})
