---
title: Blog
permalink: /blog/
description: Release notes and announcements for DocSteer.
sidebar: false
toc: false
---

{% if site.posts.size == 0 %}
No posts yet.
{% else %}
<div class="grid-2" style="margin-top:var(--sp-5)">
  {% for post in site.posts %}
  <a class="card" href="{{ post.url | relative_url }}" style="color:inherit">
    <p class="doc-head__eyebrow">{{ post.date | date: "%b %-d, %Y" }}</p>
    <h3 style="margin:var(--sp-2) 0">{{ post.title }}</h3>
    <p class="text-soft" style="font-size:.92rem">{{ post.description | default: post.excerpt | strip_html | truncatewords: 26 }}</p>
  </a>
  {% endfor %}
</div>
{% endif %}
