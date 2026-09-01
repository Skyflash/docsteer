# Changelog

All notable changes to DocSteer are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

For a theme, that means:

- **Major** — a change that breaks an existing site on upgrade: a renamed
  `_config.yml` key, a removed include, a changed CSS class or custom property.
- **Minor** — new options, layouts or components that existing sites can ignore.
- **Patch** — fixes and documentation that change nothing you have configured.

## [Unreleased]

### Fixed

- **The search index could be served from cache after publishing.** `search.json`
  was requested without a token, so a returning reader kept searching the index
  their browser had already stored and new pages were missing from the results.
  It now carries a build-time token — deliberately not the theme version used
  for CSS and JS, since the index changes with your content and not with the
  theme.

## [1.1.0] — 2026-09-01

Mobile navigation fixes, clickable tags, and correct structured data.

### Added

- **Tags open the search.** A tag in the doc footer is now a button that opens
  the search modal already showing that tag's results, instead of an inert
  badge. Tags were always part of the search index; nothing was letting a
  reader use them. With `search.enabled: false` they stay inert badges.
- **The mobile drawer carries the primary navigation.** The navbar's own links
  are hidden below 960px, so the drawer now lists them above the documentation
  tree, on every page.
- **Versioned assets.** The theme's CSS and JS are requested with a `?v=`
  token tied to the theme version, so a browser holding an older copy picks up
  the new one after an upgrade instead of serving stale JavaScript against new
  markup. `search.json` is deliberately not versioned: it changes with your
  content, not with the theme.

### Fixed

- **The navbar burger did nothing outside documentation pages.** Its handler
  was bound only when a sidebar existed, and the sidebar was rendered only for
  doc-shaped layouts — so on the home page, the blog, any `layout: page` and
  the 404 the button was dead. The drawer now renders everywhere.
- **The primary navigation was unreachable on phones.** `.navbar__links` is
  hidden below 960px and the drawer held only the documentation tree, so from
  a phone there was no route to the top-level pages from any page at all.
- **The site name disappeared below 560px**, leaving nothing on a phone that
  said what the site was called. The brand now truncates instead: the burger,
  the mark and the tool buttons keep their size, and a long title ellipsises.
- **Home link tiles were mostly empty space on phones.** Below 560px, where
  the grid is a single column, the icon moves beside the text instead of
  sitting on its own line, roughly halving the height of each tile.
- **A race in the search index loader.** A caller arriving while the fetch was
  in flight was handed a null index and threw. Reachable before this release
  by typing within 90ms of opening the modal.
- **The Updated row could show the build date.** A page with no date field fell
  through to `page.date`, which Jekyll invents for collection documents and
  sets to the moment of the build.

### Changed

- **Doc tags render as `<button class="badge badge--soft doc-tag">`** rather
  than `<span class="badge badge--soft">`. If you styled them with a selector
  like `.doc-tags span`, target `.doc-tag` instead. The appearance is
  unchanged.
- **`last_modified_at:` is now the preferred front matter field** for a page's
  modification date, because `jekyll-seo-tag` reads that name for
  `dateModified` and the doc layout can then print the same value. `updated:`
  still works and is read as a fallback.
- The demo site now documents, in **SEO & performance**, the `seo:` defaults to
  copy into your own `_config.yml` — `_config.yml` does not ship with the gem,
  so a fresh install labels every documentation page a `BlogPosting` and stamps
  it with the time of the build until you set them.

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

[1.1.0]: https://github.com/Skyflash/docsteer/releases/tag/v1.1.0
[1.0.0]: https://github.com/Skyflash/docsteer/releases/tag/v1.0.0
