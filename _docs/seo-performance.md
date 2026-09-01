---
title: SEO & performance
category: Features
description: What ships for search engines and how the theme stays fast.
updated: 2026-09-01
tags: [seo, performance, lighthouse, meta]
---

## SEO

| Concern | Handled by |
| --- | --- |
| `<title>`, meta description, canonical | `jekyll-seo-tag` (`{% raw %}{% seo %}{% endraw %}` in `head.html`) |
| Open Graph & Twitter cards | `jekyll-seo-tag` (uses `title`, `description`, `image`) |
| JSON-LD structured data | `jekyll-seo-tag` |
| `sitemap.xml` | `jekyll-sitemap` |
| RSS / Atom feed | `jekyll-feed` → `/feed.xml` |
| Per-page description | `description:` front matter (also feeds search) |
| Social share image | `image:` front matter, or `docsteer.logo` |

Set a site-wide default image and Twitter handle:

```yaml
defaults:
  - scope: { path: "" }
    values:
      image: /assets/images/og-default.png
twitter:
  username: your_handle
social:
  name: Your Project
  links:
    - https://github.com/your-username/your-repo
```

Add verification / custom tags in `_includes/head-custom.html` — it is empty by
design so upgrades never overwrite it.

## Performance

- **No framework.** ~7 kB of vanilla JS total (`main` + `search` + `lightbox`),
  all `defer`red.
- **Compressed CSS** via `sass: { style: compressed }`, one request.
- **`color-scheme` + inline pre-paint script** prevents dark-mode flash.
- Font Awesome is **bundled locally** (`woff2` only) with a `preload` on the
  solid face; no third-party request. **`preload`** also warms the search index.
- Content images should use `loading="lazy"` (kramdown: add it in HTML, or via a
  hook) and explicit dimensions to avoid layout shift.
- `prefers-reduced-motion` is respected globally.

### Going further

- Subset Font Awesome to just the icons you use (see the official
  `fontawesome-subset` tooling) and drop the unused `webfonts/` files.
- Add `jekyll-minifier` for HTML minification in production.
- Serve behind a CDN; everything is static and cache-friendly.
