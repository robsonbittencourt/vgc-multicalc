#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/site-config.sh"

dist_dir="${1:?usage: upload-shared-assets.sh <dist-dir>}"
prefix="shared/assets/"
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

declare -A remote_etags

while IFS=$'\t' read -r etag key; do
  remote_etags["$key"]="$etag"
done < <(aws s3api list-objects-v2 --bucket "$SITE_BUCKET" --prefix "$prefix" --output json --query 'Contents[].{key: Key, etag: ETag}' | jq -r '.[]? | "\(.etag | gsub("\""; ""))\t\(.key)"')

changed=0

while IFS= read -r -d '' file; do
  relative="${file#"$dist_dir"/assets/}"
  hash="$(md5sum < "$file" | cut -d' ' -f1)"

  if [ "${remote_etags["$prefix$relative"]:-}" != "$hash" ]; then
    mkdir -p "$work_dir/assets/$(dirname "$relative")"
    cp "$file" "$work_dir/assets/$relative"
    changed=$((changed + 1))
  fi
done < <(find "$dist_dir/assets" -type f -print0)

echo "Shared assets: $changed new or changed of ${#remote_etags[@]} published"

if [ "$changed" -gt 0 ]; then
  aws s3 cp "$work_dir/assets" "s3://$SITE_BUCKET/$prefix" --recursive --only-show-errors --cache-control "public, max-age=31536000, immutable"
fi
