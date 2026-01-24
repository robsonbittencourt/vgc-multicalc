---
trigger: always_on
---

## Code Quality and Validation

### Formatting

- **Format only modified files** using `npx prettier --write <file1> <file2> ...`
- Do NOT run `npm run formatter` (checks all files) after every change
- Only run full formatter check when explicitly requested or before final commit
- **Do NOT run prettier when only adding/removing console.log statements**

### Linting

- **Do NOT run `npm run lint` after every change**
- Run lint only when:
  - Explicitly requested by the user
  - Before final commit/PR
  - When fixing specific lint errors
- The `read_lints` tool only checks TypeScript errors, not ESLint rules
- **Do NOT run lint when only adding/removing console.log statements**

### Testing

- **Run tests only for logic changes** - changes that affect behavior or algorithms
- Do NOT run tests for:
  - Adding/removing console.log statements
  - Adding/removing comments
  - Formatting changes
  - Variable renaming (without logic change)
- Tests are critical to validate behavior is preserved when logic changes
- Available test commands:
  - `npm run test` - Unit tests (Jasmine/Karma) with coverage, no watch
  - `npm run test-watch` - Unit tests in watch mode
  - `npm run e2e-test` - E2E tests (Cypress)
- Do NOT skip tests when making logic changes - they catch regressions

### Workflow

1. Make code changes
2. **If only adding/removing logs**: Skip prettier, lint, and tests
3. **If logic changes**: Format modified files: `npx prettier --write <modified-files>`, then run tests: `npm run test`
4. (Optional) Run lint if needed

## Code Review Checklist

- [ ] Uses path aliases (no relative imports)
- [ ] Uses signals for reactivity
- [ ] Standalone component
- [ ] Proper TypeScript types
- [ ] Follows naming conventions
- [ ] **Has appropriate tests and they pass**
- [ ] Uses `inject()` for DI
- [ ] Follows project structure

## Build Commands

- **DO NOT run build commands** when only modifying CSS/SCSS files (`.css`, `.scss`, `.sass` files)
- Only run build commands when modifying TypeScript (`.ts`), HTML (`.html`), or configuration files
- CSS/SCSS changes are hot-reloaded by the development server and don't require a build

## File Modification Guidelines

- When editing only stylesheets (`.css`, `.scss`), skip the build step
- When editing TypeScript, HTML, or config files, run tests to verify behavior
