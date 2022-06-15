#!/usr/bin/env bash

# Generates a blog summary partial in the template folder.
function generate_post_summary {
    echo "Generating $1 post partial"
    declare -a POSTS
    while read file; do
        url_path=$(echo $file | sed "s:docs::g" | sed "s:\.md::g")
        date=$(grep "created:" $file | sed "s/created: //g")
        title=$(grep "title:" $file | sed "s/title: //g")
        html=$(pandoc $file)
        POSTS+=("$date;$title;$url_path;$html")
    done < <(find "docs/$1" -name '*.md' ! -name "index.md")

    # Sort the blog posts by date
    IFS=$'\n' SORTED_POSTS=( $(for j in "${POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr) )

    if [ "$1" == "blog" ]; then
        template="<table class=\"table is-fullwidth\"><thead><tr><th>Date</th><th>Title</th></tr></thead><tbody>"
        for ((i = 0; i < "${#SORTED_POSTS[@]}"; i++)); do
            post_string=${SORTED_POSTS[$i]}
            IFS=';' post=($post_string)
            template+="<tr><td><strong>${post[0]}</strong></td><td><a href=\"${post[2]}\">${post[1]}</a></td></tr>\n"
        done
        template+="</tbody></table>\n"
        printf $template > "template/$1.html"
    elif [ "$1" == "takes" ]; then
        template="<table class=\"table is-fullwidth\"><thead><tr><th>Date</th><th>Title</th><th>Take</th><th></th></tr></thead><tbody>"
        for ((i = 0; i < "${#SORTED_POSTS[@]}"; i++)); do
            post_string=${SORTED_POSTS[$i]}
            IFS=';' post=($post_string)
            template+="<tr>
                <td><strong>${post[0]}</strong></td>
                <td>${post[1]}</td><td>${post[3]}</td>
                <td><a href=\"${post[2]}\">link</a></td>
            </tr>\n"
        done
        template+="</tbody></table>\n"
        printf $template > "template/$1.html"
    fi
}