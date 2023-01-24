#!/bin/bash

function print_help {
    echo "Usage: ./blog new <title>     Create a new blog post"
}

# Generate new blog posts
function new {
    if [[ ! $1 ]]; then
        echo "Please specify a title."
        print_help
        exit 1
    fi

    date=$(date +"%Y-%m-%d")
    filename="$(date +"%Y%m%d")_$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed s/\ /_/g).md"
    filepath="blog/$filename"

    if [ -f "$filepath" ]; then
        echo "$filepath already exists"
        exit 1
    fi

    frontmatter="---
layout: blog-post.liquid
title: $1
description:
date: $date
permalink: \"blog/{{ title | slugify }}/index.html\"
tags:
  - post
---
"
    echo -e "$frontmatter" > "$filepath"
    # Open the file in VS Code to edit
    code "$filepath"
}


case $1 in
    new)
        new "$2"
        ;;
    *)
        print_help
        ;;
esac