#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/site-config.sh"

release="${1:?usage: switch-release.sh <release-name>}"

if ! aws s3api head-object --bucket "$SITE_BUCKET" --key "releases/$release/index.html" > /dev/null 2>&1; then
  echo "Release '$release' not found (releases/$release/index.html missing)" >&2
  exit 1
fi

origin_path="/releases/$release"
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

aws cloudfront get-distribution-config --id "$DISTRIBUTION_ID" > "$work_dir/current.json"
etag="$(jq -r .ETag "$work_dir/current.json")"
current_path="$(jq -r '.DistributionConfig.Origins.Items[] | select(.Id == "site") | .OriginPath' "$work_dir/current.json")"

aws ssm put-parameter --name "$ACTIVE_RELEASE_PARAMETER" --value "$origin_path" --overwrite > /dev/null

if [ "$current_path" = "$origin_path" ]; then
  echo "Distribution already serves $origin_path"
else
  jq --arg path "$origin_path" '.DistributionConfig | (.Origins.Items[] | select(.Id == "site") | .OriginPath) = $path' "$work_dir/current.json" > "$work_dir/updated.json"
  aws cloudfront update-distribution --id "$DISTRIBUTION_ID" --if-match "$etag" --distribution-config "file://$work_dir/updated.json" > /dev/null
  echo "Switching $current_path -> $origin_path, waiting for the distribution to deploy..."
  aws cloudfront wait distribution-deployed --id "$DISTRIBUTION_ID"
fi

invalidation_id="$(aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*' --query Invalidation.Id --output text)"
echo "Invalidating cache ($invalidation_id)..."
aws cloudfront wait invalidation-completed --distribution-id "$DISTRIBUTION_ID" --id "$invalidation_id"
echo "Serving release $release"
