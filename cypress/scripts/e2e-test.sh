out=$(node cypress/scripts/resolve-spec.mjs "$1") || exit 1

IFS='
'
set -f
set -- $out
set +f
unset IFS

npx cypress run --browser chrome --quiet "$@"
exit_code=$?

if [ $exit_code -eq 0 ]; then echo '✅ Tests PASSED successfully!\n'; else echo '❌ Tests FAILED.\n'; fi

exit $exit_code
