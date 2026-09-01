---
title: Your first docs site
category: Getting started
description: From the cloned theme to your own published documentation, in seven steps.
updated: 2026-09-01
read_time: 8
tags: [tutorial, getting-started, docs]
---

[Installation]({{ '/docs/installation/' | relative_url }}) left you with **DocSteer's own demo site**
running on your machine. This guide turns it into **your** documentation.

Work through it in order — it ends with a site you can publish.

<div class="callout callout--note">
  <span class="callout__icon"><i class="fa-solid fa-circle-info"></i></span>
  <div>
    <p class="callout__title">Building a help centre instead?</p>
    <p>If your content is a set of independent answers rather than a guide
    people read front to back, follow
    <a href="{{ '/docs/first-knowledge-base/' | relative_url }}">Your first knowledge base</a> instead.
    The two shapes need different navigation.</p>
  </div>
</div>

## 1. Clear the demo content

Everything DocSteer *is* lives in `_layouts`, `_includes`, `_sass` and
`assets` — you never need to touch those. The demo **content** is separate, and
all of it goes:

```bash
rm _docs/*.md          # the pages you are reading now
rm _posts/*.md         # the sample blog post
```

Leave everything else alone. In particular keep `search.json`, `404.html`,
`blog.md` and `license.md` — they are wiring, not content.

You now have a site with no pages. That is expected; the next step fixes it.

## 2. Make the site yours

Open `_config.yml` and edit the top block:

```yaml
title: Acme Docs
tagline: Everything you need to ship with Acme
description: >-
  Guides, references and troubleshooting for the Acme platform.

url: "https://acme.github.io"
baseurl: "/acme-docs"
```

<div class="callout callout--warning">
  <span class="callout__icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
  <div>
    <p class="callout__title">baseurl is the one that bites</p>
    <p>If the site will live at <code>username.github.io/repo-name</code>, then
    <code>baseurl</code> must be <code>"/repo-name"</code>. If it lives at the
    root of a domain, leave it empty. Get this wrong and every link and
    stylesheet 404s once deployed, while still working perfectly on
    localhost.</p>
  </div>
</div>

Then work down the `docsteer:` key and set `footer.copyright`, `social.github`
and `edit_page.repo`. Leave `buy_me_a_coffee.username` empty to hide the button.

Restart the server — `_config.yml` is only read at startup:

```bash
bundle exec jekyll serve --livereload
```

## 3. Write your first page

Create `_docs/getting-started.md`:

~~~markdown
---
title: Getting started
category: Getting started
description: Install Acme and make your first API call in five minutes.
updated: 2026-09-01
tags: [install, quickstart]
---

Acme runs anywhere Node 18+ runs.

## Install

```bash
npm install @acme/cli
```

## Make your first call

...
~~~

Only `title` is required. But fill in `description` too: it becomes the SEO
meta description **and** the excerpt in search results, so a page without one
looks empty when someone searches for it.

Visit `/docs/getting-started/` — the URL comes from
`collections.docs.permalink` in `_config.yml`.

## 4. Put it in the sidebar

The page exists, but nothing links to it. Open `_data/navigation.yml` and
replace the `sidebar:` list with your own groups:

```yaml
sidebar:
  - title: Getting started
    icon: fa-solid fa-rocket
    open: true
    children:
      - { title: Getting started, url: /docs/getting-started/ }
```

Two things happen automatically once a page is listed here:

- the **prev/next pager** at the bottom of each page follows this order;
- the group containing the current page expands on its own.

Update the `main:` list at the top of the same file for the navbar.

## 5. Give it a shape that scales

This is where most docs sites go wrong, so decide it now rather than at page
forty. Group by **what the reader is trying to do**, not by how your team is
organised:

| Group | Holds |
| --- | --- |
| Getting started | install, quickstart, core concepts |
| Guides | task-shaped pages — "how to do X" |
| Reference | exhaustive API / CLI / config listings |
| Troubleshooting | symptoms and fixes |

Three rules that keep it usable:

1. **Four to seven groups.** More than that and the sidebar stops being
   scannable.
2. **One page, one job.** If a page needs two `##` sections that share nothing,
   it is two pages.
3. **Order teaches.** The sidebar is the reading order for a newcomer, so put
   the page a first-time reader needs first, first.

## 6. Set the landing page

`index.md` is still DocSteer's marketing home. Either rewrite it, or send
visitors straight to the docs by pointing the navbar and hero button at your
first page.

Keep the home page short: for a docs site its only job is to get people into
the sidebar quickly.

## 7. Publish

Push to GitHub and enable the Actions workflow described in
[Deploying]({{ '/docs/deploying/' | relative_url }}). Every push to `main` rebuilds the site.

## Checklist before you share the link

- [ ] `url` and `baseurl` match where the site actually lives
- [ ] Every page has a `description`
- [ ] Search finds a phrase from your newest page (press <kbd>/</kbd>)
- [ ] The sidebar has no dead links
- [ ] `404.html` still resolves
- [ ] Both light and dark mode look right — toggle in the navbar

## Where to go next

- [Writing content]({{ '/docs/writing-content/' | relative_url }}) — callouts, code blocks, images,
  FAQ pages
- [Colour skins]({{ '/docs/skins/' | relative_url }}) — pick one of the six, or build your own
- [Navigation]({{ '/docs/navigation/' | relative_url }}) — badges, nested groups, the pager
