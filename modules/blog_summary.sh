# Generates a blog summary partial in the template folder.
function generate_blog_summary {
    echo "Generating blog post partial"
    declare -a BLOG_POSTS
    while read file; do
        url_path=$(echo $file | sed "s:docs::g" | sed "s:\.md::g")
        date=$(grep "created:" $file | sed "s/created: //g")
        title=$(grep "title:" $file | sed "s/title: //g")
        BLOG_POSTS+=("$date;$title;$url_path")
    done < <(find "docs/blog" -name '*.md' ! -name "index.md")

    # Sort the blog posts by date
    IFS=$'\n' SORTED_BLOG_POSTS=( $(for j in "${BLOG_POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr) )

    template="<ul>\n"
    for ((i = 0; i < "${#SORTED_BLOG_POSTS[@]}"; i++)); do
        post_string=${SORTED_BLOG_POSTS[$i]}
        IFS=';' post=($post_string)
        template+="<li><a href=\"${post[2]}\">[${post[0]}] ${post[1]}</a></li>\n"
    done
    template+="</ul>\n"
    printf $template > "template/blog.html"
}