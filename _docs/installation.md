---
title: Installation
category: Getting started
description: Get a local copy running in about two minutes.
updated: 2026-09-01
tags: [install, ruby, bundler]
---

## Requirements

- Ruby **2.7+** (3.x recommended)
- `bundler` (`gem install bundler`)

## Option A — fork the starter repo (recommended)

```bash
# 1. Fork https://github.com/Skyflash/docsteer on GitHub, then:
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
bundle install

# 3. Run the dev server
bundle exec jekyll serve --livereload
```

Open <http://localhost:4000>. Edit `_config.yml`, drop Markdown files in
`_docs/`, and you are done.

## Option B — use it as a theme gem

Add to your site's `Gemfile`:

```ruby
gem "jekyll-theme-docsteer", "~> 1.0"
```

And to `_config.yml`:

```yaml
theme: jekyll-theme-docsteer
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed
```

Then copy `search.json`, `_data/navigation.yml` and an `index.md` from this
repo into your site, and run `bundle install && bundle exec jekyll serve`.

> **Tip:** to see which files the theme provides, run
> `bundle info --path jekyll-theme-docsteer`.

## Windows notes

The bundled `Gemfile` already includes `wdm`, `tzinfo-data` and `webrick`, which
Windows needs. If `jekyll serve` cannot bind a port, add `--port 4001`.
