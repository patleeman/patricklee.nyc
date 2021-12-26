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
        template="<ul>\n"
        for ((i = 0; i < "${#SORTED_POSTS[@]}"; i++)); do
            post_string=${SORTED_POSTS[$i]}
            IFS=';' post=($post_string)
            template+="<li><a href=\"${post[2]}\">[${post[0]}] ${post[1]}</a></li>\n"
        done
        template+="</ul>\n"
        printf $template > "template/$1.html"
    elif [ "$1" == "takes" ]; then
        template=""
        for ((i = 0; i < "${#SORTED_POSTS[@]}"; i++)); do
            post_string=${SORTED_POSTS[$i]}
            IFS=';' post=($post_string)
            template+="<div class=\"card\">
                <div class=\"card-content\">
                    <div class=\"media\">
                        <div class=\"media-content\">
                            <p class=\"title is-4\"><a href=\"${post[2]}\">${post[1]}</a></p>
                        </div>
                    </div>
                    <div class=\"content\">
                        ${post[3]}
                    </div>
                    <div class=\"level\">
                        <div class=\"level-left\">
                            <div class=\"level-item\">
                                <small>${post[0]}</small>
                            </div>
                        </div>
                        <div class=\"level-right\">
                            <div class=\"level-item\">
                                <a href=\"${post[2]}\">Permalink</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>"
        done
        template+="\n"
        printf $template > "template/$1.html"
    fi
}