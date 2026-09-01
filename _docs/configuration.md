---
title: Configuration
category: Getting started
description: Every option under the docsteer key in _config.yml.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [setup, theming]
---

All theme options live under a single `docsteer:` key in `_config.yml`.
Restart `jekyll serve` after changing it.

## Appearance

```yaml
docsteer:
  skin: aqua          # aqua | violet | mint | ember | graphite | clay
  mode: auto          # auto (follow OS) | light | dark
  skin_switcher: true # show the palette dropdown in the navbar
  mode_switcher: true # show the light/dark toggle
```

## Sidebar & TOC

```yaml
  sidebar:
    enabled: true
    collapse_inactive: true   # collapse groups that don't contain the current page
    sticky: true
  toc:
    enabled: true
    min_headings: 2           # hide the TOC on short pages
```

Disable either per page in front matter:

```yaml
---
sidebar: false
toc: false
---
```

## Search

```yaml
  search:
    enabled: true
    collections: [docs]       # which collections feed the index
    include_pages: true       # also index regular pages with a title
    hotkey: true              # "/" and Cmd/Ctrl-K open search
    placeholder: "Search the docs…"
    max_results: 8
```

Exclude a single page from the index with `search: false` in its front matter.

## Lightbox & code

```yaml
  lightbox:
    enabled: true             # add class "no-lightbox" to any <img> to opt out
  code:
    copy_button: true
    line_numbers: false
```

## Font Awesome

```yaml
  fontawesome:
    enabled: true
    source: local            # local (bundled) | cdn
    cdn_url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    cdn_integrity: ""         # only for source: cdn — must match the file exactly
```

- **`local`** (default) serves Font Awesome 6.5.2 Free from
  `assets/vendor/fontawesome/` — no third-party request, works offline and
  behind corporate firewalls. `woff2` only (~300 kB, all browsers since ~2016).
- **`cdn`** loads it from cdnjs instead. Only add `cdn_integrity` if you have
  verified the SRI hash for that exact file — a wrong hash makes the browser
  **block the stylesheet**, so all icons disappear.
- `enabled: false` drops Font Awesome entirely (you then supply your own icons).

## Branding, footer, coffee

```yaml
  logo: /assets/images/logo.svg
  favicon: /assets/images/favicon.png
  footer:
    show_credit: true
    copyright: "Your Company"
    links:
      - { label: "Home", url: "/" }
  buy_me_a_coffee:
    username: "yourname"      # empty = hidden everywhere
    label: "Buy me a coffee"
    show_in: [navbar, footer] # subset of navbar | sidebar | toc | footer
  social:
    github: "your-username/your-repo"   # "owner/repo" or just "owner"
    linkedin: "https://www.linkedin.com/in/your-profile"
    email: "hello@example.com"          # rendered as a mailto: link
    twitter:                            # handle, without the @
    mastodon:                           # full URL
    discord:                            # full invite URL
    rss: true
```

Every social value is optional — leave it empty and the icon disappears. They
render as icons in the footer; the navbar shows only the GitHub one.

<div class="callout callout--note">
  <span class="callout__icon"><i class="fa-solid fa-circle-info"></i></span>
  <div>
    <p class="callout__title">A public mailto: gets harvested</p>
    <p>Publishing an address as a <code>mailto:</code> link on every page means
    spam crawlers will find it. Use a role address such as
    <code>support@</code> rather than a personal one, or leave
    <code>email</code> empty and point people at your issue tracker.</p>
  </div>
</div>

## Edit-this-page & analytics

```yaml
  edit_page:
    enabled: true
    repo: "https://github.com/your-username/your-repo"
    branch: "main"
    path: ""                  # sub-path if your site is not at repo root
  analytics:
    plausible_domain:         # e.g. docs.example.com
    ga4_id:                   # e.g. G-XXXXXXX
```

See [Colour skins]({{ '/docs/skins/' | relative_url }}) next.
