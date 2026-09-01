---
title: FAQ
layout: faq
category: Reference
description: Common questions about DocSteer.
# The page's structured data is the FAQPage block the faq layout emits.
# Without this, the collection default would also label it a TechArticle.
seo:
  type: WebPage
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [faq, help, troubleshooting]
faq:
  # ── Licence and cost ────────────────────────────────────────
  - section: Licence and cost
    q: Is it really free?
    a: |
      Yes — MIT licensed, for personal and commercial use. The **Buy me a
      coffee** button is optional support, never a paywall. Hide it by leaving
      `buy_me_a_coffee.username` empty; hide the footer credit with
      `footer.show_credit: false`.

  - section: Licence and cost
    q: Do I have to credit DocSteer?
    a: |
      Appreciated, not required. The footer credit is on by default because it
      is how the theme gets found — but `footer.show_credit: false` removes it
      and the MIT licence does not ask for anything more.

  # ── Setup and hosting ───────────────────────────────────────
  - section: Setup and hosting
    q: Does it work on GitHub Pages?
    a: |
      Yes. Use the **GitHub Actions** workflow in [Deploying](/docs/deploying/)
      so you get Jekyll 4 and all three plugins. The classic "legacy" Pages
      build also works if you stick to its allowed plugin list.

  - section: Setup and hosting
    q: Can I have more than one docs section?
    a: |
      Yes. Add another collection in `_config.yml`, add it to
      `search.collections`, and add its pages to `_data/navigation.yml` under
      new groups.

  # ── Customising ─────────────────────────────────────────────
  - section: Customising
    q: How do I change the font?
    a: |
      Add a `<link>` to `_includes/head-custom.html` and override `--font-sans`
      in a small custom stylesheet, or directly in
      `_sass/docsteer/_tokens.scss`.

  - section: Customising
    q: How do I add a 7th colour skin?
    a: |
      See [Colour skins → Add a seventh skin](/docs/skins/#add-a-seventh-skin).

  - section: Customising
    q: How do I build a FAQ page like this one?
    a: |
      Set `layout: faq` on any page and list the questions under a `faq:` key
      in its front matter, each with a `q`, an `a` and an optional `section`.
      Answers are Markdown, so code blocks and links work as usual.

      For a long list shared across pages, put the same structure in
      `_data/faq.yml` and point at it with `faq_data: faq` instead.

  # ── Troubleshooting ─────────────────────────────────────────
  - section: Troubleshooting
    q: The colours don't change when I edit `_config.yml`
    a: |
      Restart `bundle exec jekyll serve` — `_config.yml` is only read at
      startup. Also check you edited the value under the `docsteer:` key, not a
      stray top-level one.

  - section: Troubleshooting
    q: Dark mode flashes white on load
    a: |
      That means the inline script in `_includes/head.html` was removed or
      moved below the stylesheet. It must run **before** `main.css` loads.

  - section: Troubleshooting
    q: Search returns nothing
    a: |
      - Confirm `search.json` is being generated (visit `/search.json`
        directly).
      - Check `search.collections` lists your collection name.
      - Very new pages need a rebuild.

  - section: Troubleshooting
    q: Something is broken — where do I report it?
    a: |
      Open an issue on the
      [GitHub repository](https://github.com/Skyflash/docsteer/issues).
---

Short answers to what people ask most. Can't find yours? Press <kbd>/</kbd> to
search the whole site, or [open an issue](https://github.com/Skyflash/docsteer/issues).
