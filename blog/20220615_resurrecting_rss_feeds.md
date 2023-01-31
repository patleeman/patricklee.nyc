---
layout: blog-post.liquid
title: Resurrecting RSS feeds
date: 2022-06-15
permalink: "blog/{{ title | slugify }}/index.html"
tags:
  - post
  - programming
---

## The good ole days

> **Update (2023-01-21): I've migrated this blog to [eleventy](https://www.11ty.dev/) and use its built in RSS/Atom feed generator now.**

Back when I was a young lad, RSS feeds were _the_ way to stay up to date on news, blogs, and other content. You'd find sites you liked, then add their content to your RSS feed reader and then you'd be able to go to a single place to view all your news and content. You'd be able to curate a large number of sites and read new items on a daily basis. Those were the days!

Then digital advertising got big, there was real money to be made from eyeballs on your website, so slowly sites began guarding their RSS feed content, ultimately getting rid of them altogether. You wanted people engaging with your site, not with your content, and slowly content began shifting to social media.

Back then, all you needed was your Google Reader feed. These days, content is gated within small walled gardens. If you aren't a member of these walled gardens, forget seeing the content! When my feeds started dying, I switched to Digg and then Reddit and Hacker News.

The thing I miss most about syndicated feeds, is that it was so much easier to receive updates for smaller bloggers and news sources. Social media and Reddit are great at surfacing new content, but if I want to follow along with a small time writer, there isn't much recourse. These days you'd have to follow somebody's Twitter or their Substack, but it just isn't as easy as it used to be.

Today I set up a RSS reader ([NetNewsWire](https://netnewswire.com/))and I'm going to attempt to curate my feed with authors I'm interested in hearing from. I also added a RSS feed to this blog, so others can subscribe to my feed and read what I'm writing about. It won't replace Reddit or Hacker news for me, but I hope I can supplement that content!

Subscribe to this blog's [feed](https://patricklee.nyc/rss.xml).

## Aside: Adding a RSS feed to this blog

Since I decided to go ahead and re-invent the wheel for this personal blog and build my own Pandoc powered static site generator, I needed a way to generate RSS feeds.

The [RSS 2.0 spec](https://cyber.harvard.edu/rss/rss.html) is pretty simple, so why not just generate my own `rss.xml` file then?

Using a pretty simple bash script, I just parse my directory of markdown files and assemble the feed:

```bash
function generate_RSS_feed {
    echo "Generating RSS feed"
    declare items
    while read -r file; do
        url_path=$(echo "$file" | sed "s:docs\/::g" | sed "s:\.md::g")
        date=$(grep "created:" "$file" | sed "s/created: //g")
        converted_date=$(convert_date_format_822 "%Y-%m-%d" "$date")
        title=$(grep "title:" "$file" | sed "s/title: //g")
        html=$(pandoc "$file")
        items+=$(cat << END
    <item>
      <title>${title}</title>
      <description><![CDATA[${html}]]></description>
      <link>https://patricklee.nyc/$url_path</link>
      <pubDate>${converted_date}</pubDate>
    </item>
END
)
    done < <(find "docs/blog" -name '*.md' ! -name "index.md")
    pub_date=$(date -R)
    template=$(cat << END
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Patricklee.nyc</title>
    <link>https://patricklee.nyc/</link>
    <description>Software engineering and general geekery</description>
    <language>en-us</language>
    <pubDate>${pub_date}</pubDate>
    ${items}
  </channel>
</rss>
END
)
    touch "build/rss.xml"
    echo -e "$template" > "build/rss.xml"
}
```

All this does is parse the frontmatter section of the markdown file to get some basic metadata, then use Pandoc to convert the file to html. It then assembles the XML file and writes it to `rss.xml`. This function runs at the end of my blog's [build chain](https://github.com/patleeman/patricklee.nyc/blob/master/build.sh), but it can be run isolated as well.

See the [script here](https://github.com/patleeman/patricklee.nyc/blob/master/build_scripts/rss.sh).

I'm actually quite happy with this collection of bash scripts and Pandoc to generate my static site. The whole thing is stupid simple, there is zero magic, its ugly but functional and it is very narrowly scoped. There is very little that can go wrong and not many dependencies. For a blog that I want to infrequently update and keep around for a long time, its perfect and won't rot once a new JS framework gains popularity.
