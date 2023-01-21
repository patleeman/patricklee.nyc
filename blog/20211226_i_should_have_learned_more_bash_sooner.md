---
layout: blog-post.liquid
title: I should have learned more bash sooner
date: 2021-12-26
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
  - programming
---

Bash tools are super powerful once you get a hang of using it. This whole blog is pretty much [a bunch of scripts and Pandoc](https://github.com/patleeman/patricklee.nyc/). Its pretty cool what you can build once you get over the learning curve.

I'm a few years into my career now and I've only really used shell scripts when working with CI. I've never felt totally comfortable with it, maybe it's because it feels like casting spells by uttering some obscure incantations? I mean look at one of the lines I put together to sort an array for this blog:

```bash
IFS=$'\n' SORTED_POSTS=( $(for j in "${POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr) )
```

What does all this mean?
`IFS=$'\n'` Hackily set the internal separator to newline so it stops breaking my strings up by spaces
`$(for j in "${POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr)` Loop through the $POSTS array (not shown) and sort by the first column delineated by ;
`SORTED_POSTS=( ... )` Create an array from the output of the previous command

Hell, this probably isn't even the right way to do what I wanted it to do, but it works for my use case. What's really cool though is just how powerful and terse it is. The difficulty lies in getting started with it.

Some of the Pros and Cons I've encountered so far:

Pros

- Portable between many different systems
- Plenty of information available online
- Very powerful and terse

Cons

- Learning curve is steep
- Lots of different ways to do X but somebody on the internet will tell you you're wrong
- Readability is not very good. If you want to share scripts with a team, you might want to choose something like Python.

So if I were to advise my slightly younger self:

- Take a few days and learn how to write bash scripts.
- Read up on the basics of bash scripting.
  - [Learn X in Y seconds](https://learnxinyminutes.com/docs/bash/)
  - [Bash Guide](http://mywiki.wooledge.org/BashGuide)
- Try writing some scripts to automate things (like setting up your [dotfiles repo](https://github.com/patleeman/dotfiles) sooner)
- If you find yourself reaching to some programming language to do something, try doing it in bash first.
- Don't bother with anything complicated interactively. Create a script file and execute it if its anything more than a one liner.
