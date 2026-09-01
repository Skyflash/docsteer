---
title: Writing content
category: Customisation
description: Markdown conventions, callouts, code blocks and images.
date: 2026-09-01
last_modified_at: 2026-09-01
tags: [content]
---

DocSteer uses **kramdown (GFM)** with **Rouge** highlighting.

## Front matter

```yaml
---
title: Page title            # required
category: Guides             # shown as the eyebrow + search breadcrumb
description: One-line summary # SEO + search excerpt
date: 2026-09-01             # published; also datePublished in JSON-LD
last_modified_at: 2026-09-01 # shown in the meta row + dateModified
read_time: 4                 # optional, minutes
tags: [tag-a, tag-b]
toc: true                    # set false to hide the TOC
sidebar: true                # set false to hide the sidebar
---
```

## Headings & TOC

`##` and `###` headings get an auto ID, a hover anchor link, and an entry in the
**On this page** panel with scroll-spy. Nothing to configure.

## Callouts

Wrap a block in a `callout` div:

```html
<div class="callout callout--tip">
  <span class="callout__icon"><i class="fa-solid fa-lightbulb"></i></span>
  <div>
    <p class="callout__title">Pro tip</p>
    <p>Keep pages short and link generously.</p>
  </div>
</div>
```

<div class="callout callout--tip">
  <span class="callout__icon"><i class="fa-solid fa-lightbulb"></i></span>
  <div>
    <p class="callout__title">Pro tip</p>
    <p>Keep pages short and link generously.</p>
  </div>
</div>

Variants: `callout--note`, `callout--tip`, `callout--warning`, `callout--danger`.

## Code blocks

Fenced code blocks get a language class, theme-aware colours and a **Copy**
button (config `code.copy_button`).

````markdown
```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```
````

```js
export function greet(name) {
  return `Hello, ${name}!`;
}
```

## Images & the lightbox

Any image in the content area is click-to-zoom. Consecutive images form a
gallery you can arrow through.

```markdown
![Architecture diagram](/assets/images/diagram.png)
```

Opt a single image out with a class:

```html
<img src="/assets/images/logo.svg" class="no-lightbox" alt="Logo">
```

Provide a higher-res version for the zoomed view with `data-full`:

```html
<img src="thumb.jpg" data-full="full.jpg" alt="Screenshot">
```

## Tables, kbd, badges

| Key | Action |
| --- | --- |
| <kbd>/</kbd> | Open search |
| <kbd>Esc</kbd> | Close any overlay |

Inline badge: `<span class="badge">New</span>` →
<span class="badge">New</span>

## FAQ pages

Set `layout: faq` on any page and the questions render as an accordion, with
`schema.org/FAQPage` structured data emitted for you. Questions live in the
front matter:

```yaml
---
title: Support
layout: faq
faq:
  - section: Billing          # optional — groups become <h2> and feed the TOC
    q: Can I cancel anytime?
    a: |
      Yes. **Markdown** works here, including lists, links and code blocks.
---

Optional intro paragraph, rendered above the accordion.
```

Notes worth knowing:

- Each question gets an `id` slugified from its text, so
  `/docs/faq/#can-i-cancel-anytime` links straight to it and opens it.
- Answers are Markdown, but Liquid does **not** run inside front matter. Write
  internal links as plain `[Deploying](/docs/deploying/)` — the theme rewrites
  them through your `baseurl` automatically.
- The Q&A text is folded into `search.json`, so the live search finds answers
  even though they are not in the page body.
- For a long list reused across pages, put the same structure in
  `_data/faq.yml` and reference it with `faq_data: faq`.

Options live under `docsteer.faq` in `_config.yml`: `expand_first`,
`expand_all_button` and `schema`.
