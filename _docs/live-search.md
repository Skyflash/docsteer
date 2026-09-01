---
title: Live search
category: Features
description: How the client-side search index is built and tuned.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [search, performance]
---

Search is **100% client-side** and needs no service. At build time Jekyll
renders `search.json` — one record per page — and `assets/js/search.js` loads it
on first use, then scores matches as you type.

## Opening search

- Click the magnifier in the navbar (or the box on the home / sidebar)
- Press <kbd>/</kbd> or <kbd>⌘</kbd><kbd>K</kbd> / <kbd>Ctrl</kbd><kbd>K</kbd>
- Navigate results with <kbd>↑</kbd> <kbd>↓</kbd>, open with <kbd>↵</kbd>,
  dismiss with <kbd>Esc</kbd>

## What gets indexed

Controlled by `_config.yml`:

```yaml
docsteer:
  search:
    collections: [docs]   # add your own collections here
    include_pages: true   # regular pages that have a title
    max_results: 8
```

Each record stores `title`, `url`, `category`, `tags`, a short `excerpt`
(`description` or the first ~32 words) and up to ~220 words of stripped body
text. Exclude a page with `search: false` in its front matter.

## Scoring, briefly

`search.js` splits the query into terms and requires **every term** to appear
somewhere in a record. Title matches weigh heaviest (exact › prefix ›
substring), then earlier body positions. Matched terms are `<mark>`-highlighted
in the results.

## Performance

- The index is `preload`ed as `fetch` in `<head>` and parsed once, on demand.
- Typical docs sites produce a 20–150 kB JSON file; it gzips to a few kB.
- If your site is very large, split collections or lower the body word cap in
  `search.json`.

## Swapping in Lunr / Pagefind

Not required, but easy: keep `search.json`, replace the matcher inside
`search.js`'s `loadIndex()` / `onInput()` with your library of choice. The
modal markup and keyboard handling stay the same.
