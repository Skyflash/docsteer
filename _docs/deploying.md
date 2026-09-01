---
title: Deploying
category: Reference
description: Ship the site to GitHub Pages, Netlify, Vercel or any static host.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [setup]
---

The build output is a plain static site in `_site/` — host it anywhere.

## GitHub Pages (Actions — recommended)

`jekyll-seo-tag`, `jekyll-sitemap` and `jekyll-feed` are all allowed, and
Actions lets you use Jekyll 4.

**The workflow already ships in the theme** at `.github/workflows/pages.yml` —
if you forked or cloned, you have it. There is one manual step: in
**Settings → Pages**, set *Source* to **GitHub Actions**. Nothing deploys until
you do.

{% raw %}
```yaml
name: Deploy site

on:
  push:
    branches: [main]
  workflow_dispatch:          # re-deploy from the Actions tab

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.3"
          bundler-cache: true
      - id: pages
        uses: actions/configure-pages@v5
      - name: Build
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
{% endraw %}

### Project site sub-path

If the site lives at `https://user.github.io/repo/`, set:

```yaml
url: "https://user.github.io"
baseurl: "/repo"
```

All theme links use `relative_url`, so they resolve correctly.

The workflow also passes `--baseurl` from `configure-pages`, which overrides
`_config.yml` at build time. That means a deploy still works if you forget to
update `baseurl` after renaming the repository — but your **local** preview
would then be wrong, so keep `_config.yml` correct anyway.

## Netlify / Vercel / Cloudflare Pages

- **Build command:** `bundle exec jekyll build`
- **Publish directory:** `_site`
- **Environment:** `JEKYLL_ENV=production`, `RUBY_VERSION=3.3`

## Custom domain

Add a `CNAME` file with your domain, or configure it in your host's dashboard,
and set `url:` to the final `https://` origin.
