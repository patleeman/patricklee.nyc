#!/bin/bash

if ! pandoc -v > /dev/null ; then
    echo "pandoc not found. Please install pandoc."
    exit 1
fi

WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOC_FOLDER=$WORKING_DIR/docs
OUTPUT_FOLDER=$WORKING_DIR/build

function build_md_file {
    echo "Processing $1"
    markdown_file=$1
    output_file=$(basename $1 .md).html
    output_path=$OUTPUT_FOLDER/$output_file

    cp -R styles/ $OUTPUT_FOLDER/styles/

    pandoc $markdown_file \
        -o $output_path \
        -f gfm \
        --standalone \
        --css styles/styles.css \
        --template template/template.html
}

echo "Clearing output folder"
rm -rf $OUTPUT_FOLDER && mkdir build

echo "Building static website"
find $DOC_FOLDER -name "*.md" | while read file; do build_md_file "$file"; done
