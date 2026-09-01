---
title: Your first FAQ
category: Getting started
description: From a single FAQ page to a searchable repository of hundreds of questions.
date: 2026-09-01
last_modified_at: 2026-09-01
read_time: 9
tags: [tutorial, faq, support, search]
---

A FAQ starts as one page and, if the product is any good, does not stay that
way. This guide covers all three sizes it grows through, and the one setting
that turns a long FAQ from a wall of text into something people can actually
search.

## Pick your scale

| Questions | Where they live | Why |
| --- | --- | --- |
| Up to ~25 | one page, front matter | everything in one file, nothing to wire up |
| ~25 to ~100 | one page per category | each category gets its own URL and sidebar entry |
| 100+ | files in `_data/`, pages reference them | content stops fighting with page config |

Start at the smallest one that fits. Moving up is a copy-paste; you do not have
to plan for it now.

## Scale 1 — a single page

Set `layout: faq` and list the questions. Nothing else is required:

~~~markdown
---
title: FAQ
layout: faq
category: Support
description: Quick answers to the questions we get most.
faq:
  - section: Billing
    q: Can I cancel at any time?
    a: |
      Yes. Cancel from **Settings → Billing**; access runs to the end of the
      period you already paid for.

  - section: Billing
    q: Do you offer refunds?
    a: |
      Within 14 days of purchase, no questions asked.

  - section: Account
    q: How do I change my email address?
    a: |
      **Settings → Profile → Email.** A confirmation link goes to the new
      address.
---

Optional intro paragraph, rendered above the accordion.
~~~

`section` is optional. Use it and each group becomes an `<h2>` that also
appears in the **On this page** panel — which is most of the navigation a FAQ
page needs.

## Scale 2 — one page per category

Past twenty-five questions a single page stops being scannable. Split by
category, one `layout: faq` page each — `_docs/faq-billing.md`,
`_docs/faq-account.md` — and drop `section` from the questions, because the
page title now carries it.

Then add them to `_data/navigation.yml` as their own sidebar group:

```yaml
  - title: FAQ
    icon: fa-solid fa-circle-question
    children:
      - { title: Billing,  url: /docs/faq-billing/ }
      - { title: Account,  url: /docs/faq-account/ }
```

## Scale 3 — questions in data files

At a few hundred questions, front matter becomes the problem: page
configuration and content are in the same file, and a YAML mistake in question
180 breaks the page.

Move the questions into `_data/` and point at them with `faq_data`. Create
`_data/faq-billing.yml` — note it is a bare list, with no `faq:` key:

```yaml
- section: Subscriptions
  q: Can I cancel at any time?
  a: |
    Yes. Cancel from **Settings → Billing**.

- section: Invoices
  q: Where do I find my invoices?
  a: |
    **Settings → Billing → Invoices.** They are also emailed on issue.
```

Then the page is only configuration:

~~~markdown
---
title: Billing FAQ
layout: faq
faq_data: faq-billing
---
~~~

`faq_data` is the file name without the extension, so `_data/faq-billing.yml`
becomes `faq_data: faq-billing`. Non-technical colleagues can then edit
questions without ever opening a page file.

## What makes it a repository: search

This is the part that matters, and it is on by default:

```yaml
docsteer:
  search:
    index_questions: true
```

With it, **every question becomes its own search result**, deep-linked to its
answer. Someone typing "refund" gets *"Do you offer refunds?"* and lands with
that question already open — not a result called "FAQ" that leaves them to
scroll.

Turn it off and a FAQ page is indexed as a single entry. The index is smaller,
but searching for anything in an answer only ever gets people to the page.

<div class="callout callout--tip">
  <span class="callout__icon"><i class="fa-solid fa-lightbulb"></i></span>
  <div>
    <p class="callout__title">Write the question in the reader's words</p>
    <p>The search scores a title match at 30 to 120 points and a body match at
    1 to 8. Since each question is now a title, phrasing it the way a user
    would type it is the single highest-leverage thing you can do:
    <em>"Why was my card declined?"</em> will be found; <em>"Payment
    authorisation failures"</em> will not.</p>
  </div>
</div>

## Two things that will bite you

**Renaming a question breaks its links.** The anchor is generated from the
question text, so *"Do you offer refunds?"* is `#do-you-offer-refunds`. Reword
it and every link your support team has ever pasted into a ticket goes dead —
it will still open the page, just not the answer. Fix typos freely; think twice
before rewording.

**Liquid does not run inside front matter.** `{% raw %}{{ '/docs/x/' | relative_url }}{% endraw %}`
in an answer is printed literally. Write internal links as plain
`[Deploying](/docs/deploying/)` and DocSteer rewrites them through your
`baseurl` for you.

## Standalone FAQ pages

`layout: faq` uses the documentation shell, so a FAQ page picks up the docs
sidebar wherever it lives. For a standalone page — say `/faq/` on a marketing
site — turn it off in the front matter:

```yaml
---
title: FAQ
layout: faq
sidebar: false
---
```

## When an answer outgrows the FAQ

Promote it to a full article when it needs more than a couple of short
paragraphs, screenshots, or a numbered procedure. Leave a one-line answer in
the FAQ that links to it: the question keeps its search entry and its anchor,
and the detail lives where there is room for it.

## Checklist

- [ ] Questions are phrased the way a user would type them
- [ ] `index_questions: true` (search for a word that only appears in an
      answer — you should get the question, not the page)
- [ ] Every deep link opens its answer, not just the page
- [ ] Long answers have been promoted to articles
- [ ] Sections are used, or the page is short enough not to need them

## Where to go next

- [Writing content]({{ '/docs/writing-content/#faq-pages' | relative_url }}) — the full front matter reference
- [Live search]({{ '/docs/live-search/' | relative_url }}) — how the index is built and scored
- [Your first knowledge base]({{ '/docs/first-knowledge-base/' | relative_url }}) — if the FAQ is turning into a help centre
