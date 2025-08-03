#!/bin/bash

get_commit_description() {
  echo $(git rev-list --max-count=1 --no-commit-header --format=%b $1)
}

get_recent_tags() {
  echo $(git tag --sort=-creatordate | head -n 2)
}

get_commits_between_tags() {
  local tag1=$1
  local tag2=$2
  git log "$tag2".."$tag1" --pretty=format:"%h %H %s"
}

get_commit_scope() {
  commit_message=$1
  commit_scope=$(echo "$commit_message" | cut -d ':' -f 1)

  if [ "$commit_scope" == "feat" ]; then
    commit_scope="feature"
  fi

  if [ -z "$commit_scope" ] || [[ ! "$commit_message" =~ ":" ]]; then
    commit_scope="feature"
  fi

  echo "$commit_scope"
}

get_badge_color() {
  commit_scope=$1
  if [ "$commit_scope" == "fix" ]; then
    echo "red"
  elif [ "$commit_scope" == "chore" ]; then
    echo "blue"
  else
    echo "green"
  fi
}

generate_badge_template() {
  local sha_resumido=$1
  local sha=$2
  local commit_scope=$3
  local badge_color=$4
  local commit_message=$(remove_commit_scope "$5")
  
  echo "| [![Static Badge](https://img.shields.io/badge/${sha_resumido}-${commit_scope}-${badge_color})](https://github.com/robsonbittencourt/vgc-multicalc/commit/${sha}) | ${commit_message} |"
}

generate_release_notes() {
  local commits=$1

  echo "# VGC Multi Calc ${tags[0]} Release Notes
  ## Changes
  ### Features
  | Commit  | Description                                              |
  |-------|----------------------------------------------------------|"

  local features=()
  local fixes=()
  local chores=()

  while IFS=" " read -r sha_resumido sha commit_message; do
    commit_scope=$(get_commit_scope "$commit_message")
    badge_color=$(get_badge_color "$commit_scope")
    badge_line=$(generate_badge_template "$sha_resumido" "$sha" "$commit_scope" "$badge_color" "$commit_message")

    case "$commit_scope" in
      feature) features+=("$badge_line") ;;
      fix)     fixes+=("$badge_line") ;;
      chore)   chores+=("$badge_line") ;;
    esac
  done <<< "$commits"

  for line in "${features[@]}"; do echo "$line"; done
  for line in "${fixes[@]}"; do echo "$line"; done
  for line in "${chores[@]}"; do echo "$line"; done

  echo -e "\n"
}

generate_changes_link() {
  local tag1=$1
  local tag2=$2
  echo "[All changes since the last version](https://github.com/robsonbittencourt/vgc-multicalc/compare/${tag2}...${tag1})"
  echo -e ""
}

generate_commit_templates() {
  local commits=$1

  while IFS=" " read -r sha_resumido sha commit_message; do
    echo "### $(remove_commit_scope "$commit_message")"
    commit_description=$(get_commit_description $sha_resumido)

    if [ -n "$commit_description" ]; then
      echo "${commit_description}"
    fi
    
    echo -e ""
  done <<< "$commits"
}

remove_commit_scope() {
  echo "$1" | sed 's/^.*: //'
}

tags=($(get_recent_tags))

commits=$(get_commits_between_tags ${tags[0]} ${tags[1]})

generate_release_notes "$commits"

generate_changes_link ${tags[0]} ${tags[1]}

generate_commit_templates "$commits"
