#!/usr/bin/env bash

function build_md_file {
    markdown_file=$1
    short_link=$2
    output_path=$(echo "$1" | sed "s/\/docs\//\/build\//g" | sed "s/.md/.html/g")

    # Take markdown files in the docs folder that aren't named index.md and put
    # them into their own directory as an index.html file.
    if [[ $(basename "$output_path") != "index.html" ]]; then
        output_path=$(echo "$output_path" | sed "s/.html/\/index.html/g")
    fi

    mkdir -p $(dirname "$output_path")

    echo "$short_link"
    pandoc "$markdown_file" \
        -o "$output_path" \
        -f gfm+yaml_metadata_block \
        --standalone \
        --css styles/styles.css \
        --template template/template.html \
        --variable "short_link:$short_link" \
        -T "Patrick Lee"


    printf "\nConverting %s\n\t=> %s" "$1" "$output_path"
}