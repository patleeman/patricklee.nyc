
function generate_shortcut {
    file_name="$1"
    docs_folder="$2"
    output_folder=$3

    if [[ "$(basename $file_name)" == "index.md" ]]; then
        printf "\nSkipping shortcut generation for $file_name"
        return 0
    fi

    # Shortcut is first 4 letters of md5(file_name)
    short_name=$(echo "$file_name" | md5 | cut -c1-4)
    short_name_folder="$output_folder/s/$short_name"
    short_name_file="$short_name_folder/index.html"

    if [[ -f $short_name_file ]]; then
        echo "ERROR: Shortcut collision: $short_name_file"
        exit 1
    fi

    mkdir -p $short_name_folder
    touch $short_name_file

    docs_folder_length=${#docs_folder}
    docs_folder_length=$((docs_folder_length + 1))
    redirect_path=$(echo "$file_name" | cut -c"$docs_folder_length"- | sed 's/\.md//')
    template="<html><head><meta http-equiv=\"refresh\" content=\"0; url=$redirect_path\"></head></html>"
    echo $template > "$short_name_file"
}