# Patricklee.nyc

This is a super simple Pandoc static site generator tied to my personal website https://patricklee.nyc.

# Quickstart

Build the site.

```
./build.sh
```

Spin up the bare bones dev server.

```
./dev.sh
```

# Blog folder

As part of the build process, the script generates a partial `blog.html` in the template directory which contains a sorted list of all the markdown files in the blog folder.
