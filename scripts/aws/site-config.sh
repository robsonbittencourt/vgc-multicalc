SITE_BUCKET="${SITE_BUCKET:-vgcmulticalc-site}"
DISTRIBUTION_ID="${DISTRIBUTION_ID:-EZWDB496OSBUN}"
ACTIVE_RELEASE_PARAMETER="${ACTIVE_RELEASE_PARAMETER:-/vgcmulticalc/site/active-release}"
RELEASES_TO_KEEP="${RELEASES_TO_KEEP:-5}"
RELEASE_NAME_PATTERN='^[0-9]{8}-[0-9]{6}-'

export AWS_PAGER=""

active_release() {
  aws ssm get-parameter --name "$ACTIVE_RELEASE_PARAMETER" --query Parameter.Value --output text | sed 's|^/releases/||'
}

list_releases() {
  aws s3api list-objects-v2 --bucket "$SITE_BUCKET" --prefix releases/ --delimiter / --query 'CommonPrefixes[].Prefix' --output text | tr '\t' '\n' | sed -n 's|^releases/\(.*\)/$|\1|p'
}

releases_newest_first() {
  local releases
  releases="$(list_releases)"
  { echo "$releases" | grep -E "$RELEASE_NAME_PATTERN" | sort -r; echo "$releases" | grep -vE "$RELEASE_NAME_PATTERN" | grep -v '^$'; } || true
}
