# Changelog

All notable changes to DocSteer are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For a theme, that means:

- **Major** — a change that breaks an existing site on upgrade: a renamed
  `_config.yml` key, a removed include, a changed CSS class or custom property.
- **Minor** — new options, layouts or components that existing sites can ignore.
- **Patch** — fixes and documentation that change nothing you have configured.

## [1.0.0] — 2026-09-01

First public release.

### Added

- **Six colour skins** — `aqua`, `violet`, `mint`, `ember`, `graphite`, `clay`,
  each with a light and a dark palette, defined as one Sass map and emitted as
  CSS custom properties. Every skin's brand colour clears WCAG AA (4.5:1)
  against its own background.
- **Dark mode** following the OS by default, with a manual toggle stored in
  `localStorage` and no flash on load.
- **Live search** — a Liquid-generated JSON index and a keyboard-driven modal
  (<kbd>/</kbd> or <kbd>Ctrl/Cmd</kbd>+<kbd>K</kbd>), with no dependencies.
- **FAQ pages** — `layout: faq` renders an accordion built on native
  `<details>`, with per-question anchors, `schema.org/FAQPage` structured data,
  and each question indexed as its own search result linking straight to its
  answer. Questions live in page front matter or in a `_data/` file.
- **Documentation shell** — collapsible grouped sidebar, automatic "On this
  page" table of contents with scroll-spy, prev/next pager derived from the
  navigation order, and an edit-this-page link.
- **Image lightbox** with galleries, captions and keyboard navigation.
- **Code blocks** with a language label and an always-visible copy button.
- **Font Awesome 6.5.2 Free**, bundled locally by default so the site works
  offline and behind corporate firewalls; loading from a CDN is optional.
- **SEO** — `jekyll-seo-tag`, sitemap, RSS feed, Open Graph and JSON-LD.
- **Blog** support via `_posts`, with pagination.
- Getting-started tutorials for a docs site, a knowledge base and a FAQ.

### Known limitations

- The Sass sources still use `@import`. Dart Sass prints deprecation warnings;
  builds are otherwise clean. Migration to `@use`/`@forward` is planned for a
  future release and will not change any public class or custom property.
- FAQ question anchors are derived from the question text, so rewording a
  question changes its URL fragment and breaks existing deep links.

[1.0.0]: https://github.com/Skyflash/docsteer/releases/tag/v1.0.0
