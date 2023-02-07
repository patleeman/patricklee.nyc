---
layout: blog-post.liquid
title: How I use Obsidian
description:
date: 2023-02-07
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
  - knowledge-management
---

## Introduction

[Obsidian](https://obsidian.md/) is all the rage right now in the productivity tool market, especially with software engineers. Similar to my note-taking app [Collate Notes](https://github.com/collateapp) which I built in 2016 it utilizes a Markdown file format with a YAML "front matter" section on top (a-la [Jekyll's doc format](https://jekyllrb.com/docs/front-matter/)) to handle document metadata.

This local-file first approach means that your data is durable, since it's just markdown files in a folder structure. Even if Obsidian goes out of business, the data is still there and easily usable.

It also means that you need to develop your own way of using it. The tool does not dictate how you organize your data, you need to come up with your own system.

## My System

### Keeping it simple

There are a lot of systems out there like the [PARA Method](https://fortelabs.com/blog/para/) which have several folders to organize your data depending on the context of the information. PARA requires an Archive, Projects, Areas, and Resources folder and has rules on where to store specific kinds of information.

I tried it for a while and realized that more often than not I would spend time trying to figure out if something was an Area, or Resource, or Project. It's not worth the mental overhead. I want a super simple system that just stays out of my way.

### Organizing Knowledge

I have two "areas" in my note-taking system. An "Inbox" where I keep anything active that I'm currently working on or need access to, which is the root of the vault. And a `Knowledge` folder inside that where I put everything when I'm done with it. That's it.

It looks like this:

```
!Knowledge/
<everything else>
```

The workflow looks like this:

- I want to write something down.
- I create a new file in the root of the folder and write it down.
- If I want to group stuff together, I create a folder.
- Once I'm no longer working on this thing, or I don't need it anymore. Move it to the Knowledge folder.

The Knowledge folder has subfolders, that help me organize information into smaller buckets. I have buckets for things like:

- My Home
- Business Ideas
- Finance
- Fitness
- Health
- Knowledge Management
- Work
- Software Engineering
- Writing

The main purpose of the Knowledge folder is to keep information around if I need it, but just tuck it away out of sight, so I can focus on the important stuff.

### Task Management

The other piece of my system is task management. I've tried all sorts of apps out there to manage tasks, and this one is the simplest and keeps tasks close to knowledge.

For example, if I'm working in a document where I'm ideating, collecting information from various sources, or writing thoughts, it is handy to be able to drop tasks into the same document.

I use the [Tasks Plugin](https://obsidian-tasks-group.github.io/obsidian-tasks/) to aggregate my tasks from across my whole vault, and tags to add context to tasks.

A task looks like this (Emojis are used by the [tasks plugin](https://obsidian-tasks-group.github.io/obsidian-tasks/) to add metadata).

```
- [ ] Take out the garbage 🔼 📅 2023-02-08 #personal
```

I have a `Tasks` note where I aggregate all my tasks using a [query](https://obsidian-tasks-group.github.io/obsidian-tasks/queries/) and ensure it's grouped by tags.

<pre>
```tasks
(not done) OR (done date is today)
group by tags
sort by urgency
short mode
```
</pre>

## Conclusion

That's the system that's currently working for me. Everyone comes up with their own system based on their preferences, so do what feels right for you. This is how I'm currently managing things, and I'll use it as long as it [sticks](/blog/note-taking-hell/).
