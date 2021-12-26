# Generates a blog summary partial in the template folder.
function generate_post_summary {
    echo "Generating $1 post partial"
    declare -a POSTS
    while read file; do
        url_path=$(echo $file | sed "s:docs::g" | sed "s:\.md::g")
        date=$(grep "created:" $file | sed "s/created: //g")
        title=$(grep "title:" $file | sed "s/title: //g")
        POSTS+=("$date;$title;$url_path")
    done < <(find "docs/$1" -name '*.md' ! -name "index.md")

    # Sort the blog posts by date
    IFS=$'\n' SORTED_POSTS=( $(for j in "${POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr) )

    template="<ul>\n"
    for ((i = 0; i < "${#SORTED_POSTS[@]}"; i++)); do
        post_string=${SORTED_POSTS[$i]}
        IFS=';' post=($post_string)
        template+="<li><a href=\"${post[2]}\">[${post[0]}] ${post[1]}</a></li>\n"
    done
    template+="</ul>\n"
    printf $template > "template/$1.html"
}