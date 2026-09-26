#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/site-config.sh"

release="${1:-}"

if [ -z "$release" ]; then
  active="$(active_release)"
  release="$(releases_newest_first | grep -A1 -x "$active" | sed -n 2p || true)"
fi

if [ -z "$release" ]; then
  echo "No release older than the active one" >&2
  exit 1
fi

echo "Rolling back to $release"
"$(dirname "$0")/switch-release.sh" "$release"
