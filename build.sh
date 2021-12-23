#!/bin/bash

if ! pandoc -v > /dev/null ; then
    echo "pandoc not found. Please install pandoc."
    exit 1
fi

WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOC_FOLDER=$WORKING_DIR/docs
BLOG_FOLDER=$DOC_FOLDER/blog
OUTPUT_FOLDER=$WORKING_DIR/build

function build_md_file {
    markdown_file=$1
    output_path=$(echo $1 | sed "s/\/docs\//\/build\//g" | sed "s/.md/.html/g")

    # Take markdown files in the docs folder that aren't named index.md and put
    # them into their own directory as an index.html file.
    if [[ $(basename $output_path) != "index.html" ]]; then
        output_path=$(echo $output_path | sed "s/.html/\/index.html/g")
    fi

    mkdir -p $(dirname $output_path)

    cp -R scripts/ $OUTPUT_FOLDER/scripts/
    cp -R styles/ $OUTPUT_FOLDER/styles/
    cp -R public/ $OUTPUT_FOLDER/public/

    pandoc $markdown_file \
        -o $output_path \
        -f gfm+yaml_metadata_block \
        --standalone \
        --css styles/styles.css \
        --template template/template.html \
        -T "Patrick Lee"


    printf "\nConverting $1\n\t=> $output_path"
}

echo "Cleaning up"
rm -rf $OUTPUT_FOLDER && mkdir build
rm template/blog.html

echo "Generating blog post partial"
declare -a BLOG_POSTS
while read file; do
    url_path=$(echo $file | sed "s:docs::g" | sed "s:\.md::g")
    date=$(grep "created:" $file | sed "s/created: //g")
    title=$(grep "title:" $file | sed "s/title: //g")
    BLOG_POSTS+=("$date;$title;$url_path")
done < <(find -f docs/blog/*.md ! -name "index.md")

# Sort the blog posts by date
IFS=$'\n' SORTED_BLOG_POSTS=( $(for j in "${BLOG_POSTS[@]}"; do echo $j; done | sort -t ";" -k 1 -nr) )

template="<ul>"
for ((i = 0; i < "${#SORTED_BLOG_POSTS[@]}"; i++)); do
    post_string=${SORTED_BLOG_POSTS[$i]}
    IFS=';' post=($post_string)
    template+="<li><a href=\"${post[2]}\">[${post[0]}] ${post[1]}</a></li>"
done
template+="</ul>"
echo $template > "template/blog.html"

echo "Building static website"
find $DOC_FOLDER -name "*.md" | while read file; do build_md_file "$file"; done
printf "\n\n"

echo "Build complete"