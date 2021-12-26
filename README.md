# Patricklee.nyc

This is a super simple Pandoc static site generator tied to my personal website https://patricklee.nyc.

# Quickstart

Build the site.

```
./blog build
```

Spin up the bare bones dev server.

```
./blog serve
```

Create new blog posts or hot takes

```
./blog new (take|post) <title>
```

# Blog folder

As part of the build process, the script generates a partial `blog.html` in the template directory which contains a sorted list of all the markdown files in the blog folder.

# Takes folder

For hot takes. Micro blogging without the baggage.
