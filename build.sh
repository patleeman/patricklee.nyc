#!/bin/bash

if ! pandoc -v > /dev/null ; then
    echo "pandoc not found. Please install pandoc."
    exit 1
fi

WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOC_FOLDER=$WORKING_DIR/docs
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

    cp -R styles/ $OUTPUT_FOLDER/styles/
    cp -R public/ $OUTPUT_FOLDER/public/

    pandoc $markdown_file \
        -o $output_path \
        -f gfm+yaml_metadata_block \
        --standalone \
        --css styles/styles.css \
        --template template/template.html


    echo "Processed $1 to $output_path"
}

echo "Clearing output folder"
rm -rf $OUTPUT_FOLDER && mkdir build

echo "Building static website"
find $DOC_FOLDER -name "*.md" | while read file; do build_md_file "$file"; done
