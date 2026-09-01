---
title: Navigation
category: Customisation
description: Configure the top navbar and the grouped sidebar from one data file.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [navigation, theming]
---

Navigation lives in **`_data/navigation.yml`** — two lists, `main` and
`sidebar`.

## Top navbar

```yaml
main:
  - title: Docs
    url: /docs/introduction/
    icon: fa-solid fa-book
  - title: Guides
    url: /docs/live-search/
    icon: fa-solid fa-compass
```

`icon` is any Font Awesome class and is optional.

## Sidebar

The sidebar is a list of **groups**, each with `children`:

```yaml
sidebar:
  - title: Getting started
    icon: fa-solid fa-rocket
    open: true              # force this group expanded
    children:
      - { title: Introduction, url: /docs/introduction/ }
      - { title: Installation, url: /docs/installation/ }

  - title: Customisation
    icon: fa-solid fa-paintbrush
    children:
      - { title: Colour skins, url: /docs/skins/, badge: "6" }
```

- The group containing the current page is expanded automatically.
- With `collapse_inactive: true` (config), other groups start collapsed.
- `badge` renders a small pill next to a link.

## Prev / next links

The **pager** at the bottom of every doc is derived from the flattened sidebar
order — no extra configuration. Reorder `navigation.yml` and the pager follows.

## Adding a page to the docs

1. Create `_docs/my-page.md` with front matter:

   ```yaml
   ---
   title: My page
   category: Guides
   description: One-line summary used for SEO and search.
   ---
   ```

2. Add it under a sidebar group in `_data/navigation.yml`.

The permalink is `/docs/my-page/` (set by `collections.docs.permalink` in
`_config.yml`).
