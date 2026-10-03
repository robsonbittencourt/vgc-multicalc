#!/usr/bin/env bash
set -euo pipefail

module_dir="$(cd "$(dirname "$0")/../../infra/modules/pastes" && pwd)"
source_dir="$module_dir/lambda"
out_dir="$module_dir/.build/paste-page"

if [ ! -f "$source_dir/og-assets/moves.json" ] || [ ! -f "$source_dir/og-assets/mega-stones.json" ]; then
  echo "og-assets missing. Run 'npm run og-assets' first." >&2
  exit 1
fi

rm -rf "$out_dir"
mkdir -p "$out_dir"
cp "$source_dir"/*.mjs "$source_dir/package.json" "$source_dir/package-lock.json" "$out_dir/"
cp -r "$source_dir/fonts" "$source_dir/og-assets" "$out_dir/"

(cd "$out_dir" && npm ci --omit=dev --os=linux --cpu=arm64 --libc=glibc --no-audit --no-fund --loglevel=error)

ls "$out_dir/node_modules/@resvg"
du -sh "$out_dir"
