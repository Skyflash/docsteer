---
title: SEO & performance
category: Features
description: What ships for search engines and how the theme stays fast.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [performance]
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

### Structured data: type and dates

`jekyll-seo-tag` emits one JSON-LD block per page, and left alone it gets two
things wrong on a documentation site.

**It labels every doc a `BlogPosting`.** Tell it otherwise in your own
`_config.yml` — the theme cannot do this for you, because defaults live in the
site's config and not in the theme:

```yaml
defaults:
  - scope: { path: "", type: "docs" }
    values:
      seo:
        type: TechArticle     # documentation, not blog posts
```

Pages whose structured data comes from somewhere else should opt out of that
default. A `layout: faq` page already emits its own `schema.org/FAQPage`, so
give it a neutral type rather than letting it claim to be an article too:

```yaml
seo:
  type: WebPage
```

**It invents dates.** Jekyll assigns collection documents without a `date:` one
equal to the build time, so `datePublished` ends up being the moment you last
ran `jekyll build` — a different value on every deploy. Give each page real
dates:

```yaml
date: 2026-04-12              # published — set once, then leave it
last_modified_at: 2026-09-01  # bump when you edit the page
```

`last_modified_at` is the field `jekyll-seo-tag` reads for `dateModified`, and
the same one the doc layout prints in the **Updated** row — so one field keeps
the page and its structured data in agreement. (`updated:` still works as a
fallback for pages written against DocSteer 1.0, but only for the visible row:
`jekyll-seo-tag` does not know that name.)

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
