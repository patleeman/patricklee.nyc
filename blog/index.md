---
layout: layouts/base.liquid
title: Writing
pagination:
  data: collections.post
  size: 10
  alias: posts
  reverse: true
---

{% include "layouts/post-list.liquid" %}

{% include "layouts/tag-cloud.liquid" %}
