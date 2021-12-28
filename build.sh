#!/bin/bash

if ! pandoc -v > /dev/null ; then
    echo "pandoc not found. Please install pandoc."
    exit 1
fi

# Source the modules so we have access to their functions
for f in modules/*.sh; do
    if [[ -r $f ]] && [[ -f $f ]]; then
        source $f
    fi
done


WORKING_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOC_FOLDER=$WORKING_DIR/docs
BLOG_FOLDER=$DOC_FOLDER/blog
OUTPUT_FOLDER=$WORKING_DIR/build

echo "Cleaning up"
rm -rf $OUTPUT_FOLDER && mkdir build

# Execute our modules to generate partials
generate_post_summary "blog"
generate_post_summary "takes"

echo "Building static website"
find $DOC_FOLDER -name "*.md" | while read file; do build_md_file "$file"; done
printf "\n\n"

echo "Build complete"