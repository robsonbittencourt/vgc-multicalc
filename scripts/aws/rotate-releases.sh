#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/site-config.sh"

active="$(active_release)"
kept=0

while read -r release; do
  [ -z "$release" ] && continue

  if [ "$release" = "$active" ]; then
    echo "keep   $release (active)"
    continue
  fi

  if [ "$kept" -lt $((RELEASES_TO_KEEP - 1)) ]; then
    kept=$((kept + 1))
    echo "keep   $release"
    continue
  fi

  echo "delete $release"
  aws s3 rm "s3://$SITE_BUCKET/releases/$release/" --recursive --only-show-errors
done < <(releases_newest_first)
