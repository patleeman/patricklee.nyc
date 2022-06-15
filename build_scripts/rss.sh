#!/usr/bin/env bash

# https://stackoverflow.com/a/47438110
convert_date_format_822() {
  local INPUT_FORMAT="$1"
  local INPUT_DATE="$2"

  if [[ $(uname) == "Darwin" ]]; then
    # Mac OS X
    date -j -f "$INPUT_FORMAT" "$INPUT_DATE" +"%a, %d %b %Y %T %z"
  elif [[ $(uname) == "Linux" ]]; then
    # Linux
    date -d "$INPUT_DATE" +"%a, %d %b %Y %T %z"
  else
    # Unsupported system
    echo "Unsupported system"
  fi
}


# Generate a RSS2.0 Feed from markdown files
# https://cyber.harvard.edu/rss/rss.html
function generate_RSS_feed {
    echo "Generating RSS feed"
    declare items
    while read -r file; do
        url_path=$(echo "$file" | sed "s:docs\/::g" | sed "s:\.md::g")
        date=$(grep "created:" "$file" | sed "s/created: //g")
        converted_date=$(convert_date_format_822 "%Y-%m-%d" "$date")
        title=$(grep "title:" "$file" | sed "s/title: //g")
        items+=$(cat << END

    <item>
      <title>${title}</title>
      <description>${title}</description>
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

generate_RSS_feed