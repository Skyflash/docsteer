---
title: Your first knowledge base
category: Getting started
description: Turn the theme into a searchable help centre, with categories, articles and a FAQ.
date: 2026-09-01
last_modified_at: 2026-09-01
read_time: 9
tags: [tutorial, getting-started, knowledge-base, support]
---

A knowledge base is not a manual. Nobody reads it front to back — they arrive
from a search box with one problem and leave the moment it is solved.

That changes how you build it:

| | Docs site | Knowledge base |
| --- | --- | --- |
| Entry point | the first page in the sidebar | search, or a deep link from support |
| Reading order | matters | irrelevant |
| Page shape | a step in a sequence | one self-contained answer |
| Grouping | a learning path | flat, by topic |
| Success | the reader finishes | the reader leaves quickly |

Everything below follows from that. If your content *is* sequential, use
[Your first docs site]({{ '/docs/first-docs-site/' | relative_url }}) instead.

## 1. Clear the demo content

The theme itself lives in `_layouts`, `_includes`, `_sass` and `assets` — leave
those alone. The demo content goes:

```bash
rm _docs/*.md
rm _posts/*.md
```

Keep `search.json`, `404.html` and `license.md`: they are wiring, not content.

## 2. Name the collection after the job

`_docs/` is a docs word. A help centre reads better at `/kb/` or `/help/`.
In `_config.yml`, replace the `collections` and `defaults` blocks:

```yaml
collections:
  kb:
    output: true
    permalink: /kb/:path/

defaults:
  - scope: { path: "", type: "kb" }
    values:
      layout: doc
  - scope: { path: "" }
    values:
      layout: page
```

Rename the folder `_docs/` to `_kb/` to match, then point the search at it:

```yaml
docsteer:
  search:
    collections: [kb]
```

<div class="callout callout--warning">
  <span class="callout__icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
  <div>
    <p class="callout__title">Three places, not one</p>
    <p>A renamed collection has to be changed in <code>collections</code>,
    in <code>defaults</code> <em>and</em> in <code>search.collections</code>.
    Miss the last one and everything looks fine until you notice search returns
    nothing — the most reported DocSteer problem.</p>
  </div>
</div>

## 3. Make search the front door

On a docs site search is a convenience. Here it is the primary navigation, so
turn everything on and say what the box is for:

```yaml
docsteer:
  search:
    enabled: true
    collections: [kb]
    include_pages: true
    hotkey: true
    placeholder: "Describe your problem…"
    max_results: 10
```

`placeholder` is worth the thought. "Search" invites keywords; *"Describe your
problem…"* invites the sentence people actually have in their head, and your
article titles should match that sentence — see step 5.

## 4. Choose flat categories

Resist nesting. A support reader does not explore a tree; they scan for the
noun that matches their problem. Six to eight flat categories, named after the
user's world rather than your architecture:

```yaml
sidebar:
  - title: Account & billing
    icon: fa-solid fa-credit-card
    open: true
    children:
      - { title: Reset your password,      url: /kb/reset-password/ }
      - { title: Update payment details,   url: /kb/update-payment/ }

  - title: Installation
    icon: fa-solid fa-download
    children:
      - { title: System requirements,      url: /kb/requirements/ }

  - title: Errors & troubleshooting
    icon: fa-solid fa-triangle-exclamation
    children:
      - { title: "Error 403: forbidden",   url: /kb/error-403/ }
```

Note the group names: *Account & billing*, not *Subscription service*.
*Errors & troubleshooting*, not *Diagnostics*. Use the words a frustrated user
would type.

## 5. Write your first article

Title it with the **problem**, not the feature. Someone whose password fails
searches "reset password" — never "authentication module".

Create `_kb/reset-password.md`:

~~~markdown
---
title: Reset your password
category: Account & billing
description: What to do when you cannot sign in and the reset email never arrives.
last_modified_at: 2026-09-01
tags: [password, login, email, 403]
---

If you cannot sign in, reset your password from the login screen.

## Steps

1. Go to **Sign in** and choose *Forgot password*.
2. Enter the address you registered with.
3. Open the email and follow the link. It expires after one hour.

## If the email never arrives

- Check the spam folder.
- Confirm the address is the registered one — a typo fails silently.
- Wait five minutes; delivery is queued.

## Still stuck?

Contact support with your account email and the time you tried.
~~~

The shape that works, every time:

1. **One sentence** confirming they are in the right place.
2. **Numbered steps** for the happy path.
3. **A section for when it does not work** — this is the half that saves a
   support ticket, and the half most people forget to write.
4. **An escape hatch** to a human.

`tags` matter more here than on a docs site: they feed the search index, so add
the words a user would type that do not appear in your prose — error codes,
old product names, common misspellings.

## 6. Add a FAQ page

Short answers that do not deserve an article of their own belong on one FAQ
page, where they can be scanned in seconds. Create `_kb/faq.md` with
`layout: faq`:

~~~markdown
---
title: FAQ
layout: faq
category: Popular questions
description: Quick answers to the questions support gets most.
faq:
  - section: Billing
    q: Can I cancel at any time?
    a: |
      Yes. Cancel from **Settings → Billing**; access continues to the end of
      the period you already paid for.

  - section: Billing
    q: Do you offer refunds?
    a: |
      Within 14 days of purchase, no questions asked. Email support.

  - section: Account
    q: How do I change the email on my account?
    a: |
      **Settings → Profile → Email.** A confirmation link goes to the new
      address; the change applies once you click it.
---

Can't find your answer? Press <kbd>/</kbd> to search everything.
~~~

Questions render as an accordion, each one deep-linkable — so support can send
a customer straight to `/kb/faq/#do-you-offer-refunds`. The answers are folded
into the search index too, so they surface even though they are not in the page
body. Details in [Writing content]({{ '/docs/writing-content/#faq-pages' | relative_url }}).

<div class="callout callout--tip">
  <span class="callout__icon"><i class="fa-solid fa-lightbulb"></i></span>
  <div>
    <p class="callout__title">When to promote a FAQ entry</p>
    <p>If an answer needs more than one short paragraph, screenshots, or a
    numbered procedure, it has outgrown the FAQ. Give it its own article and
    leave a one-line answer behind that links to it.</p>
  </div>
</div>

## 7. Publish, then let the data drive it

Push and deploy as described in [Deploying]({{ '/docs/deploying/' | relative_url }}).

A knowledge base is only finished when people stop asking. Once it is live,
keep a note of what support gets asked that the KB does not answer, and write
that article next. That list — not your product roadmap — is the correct
backlog.

## Checklist before you share the link

- [ ] `search.collections` names your renamed collection
- [ ] Search finds an article by the words a user would type, not yours
- [ ] Every article has `tags` covering error codes and old names
- [ ] Every article ends with a way to reach a human
- [ ] Category names use the reader's vocabulary
- [ ] `url` and `baseurl` match where the site actually lives

## Where to go next

- [Live search]({{ '/docs/live-search/' | relative_url }}) — how the index is built and tuned
- [Writing content]({{ '/docs/writing-content/' | relative_url }}) — callouts, FAQ pages, images
- [SEO & performance]({{ '/docs/seo-performance/' | relative_url }}) — help Google answer for you
