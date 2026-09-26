#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/site-config.sh"

dist_dir="${DIST_DIR:-dist/browser}"
tag="${1:-$(git describe --tags --always)}"
release="$(date -u +%Y%m%d-%H%M%S)-$(echo "$tag" | tr -c 'A-Za-z0-9._-' '-' | sed 's/-*$//')"
target="s3://$SITE_BUCKET/releases/$release/"

if [ ! -f "$dist_dir/index.html" ] || [ ! -f "$dist_dir/404.html" ]; then
  echo "$dist_dir is incomplete (index.html or 404.html missing). Build with 'npm run build'." >&2
  exit 1
fi

no_cache=(--include "*.html" --include "ngsw.json" --include "ngsw-worker.js" --include "safety-worker.js" --include "worker-basic.min.js" --include "manifest.json" --include "robots.txt" --include "sitemap.xml")
exclude_no_cache=()

for ((i = 1; i < ${#no_cache[@]}; i += 2)); do
  exclude_no_cache+=(--exclude "${no_cache[i]}")
done

echo "Uploading release $release"
aws s3 cp "$dist_dir" "$target" --recursive --only-show-errors "${exclude_no_cache[@]}" --cache-control "public, max-age=31536000, immutable"
aws s3 cp "$dist_dir" "$target" --recursive --only-show-errors --exclude "*" "${no_cache[@]}" --cache-control "public, max-age=0, must-revalidate, s-maxage=31536000"

"$(dirname "$0")/switch-release.sh" "$release"
"$(dirname "$0")/rotate-releases.sh"
