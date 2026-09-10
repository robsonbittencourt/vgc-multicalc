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
  - `npm run test` - Unit tests (Vitest), no watch. **Does NOT report coverage**
  - `npm run test-watch` - Unit tests in watch mode
  - `npx ng test --watch=false --coverage --exclude='**/*.performance.spec.ts'` - Unit tests with coverage report
- Do NOT skip tests when making logic changes - they catch regressions
- **NEVER run Cypress tests (`npm run e2e-test` or `npx cypress run`)**. The user handles all E2E testing locally. You must only run unit tests.

### Coverage

**The project is at 100% coverage (statements, branches, functions, lines) and MUST stay there.** Do not leave new code uncovered - the user should never have to point out that something you added has no test.

- **Any new or modified logic in a covered layer requires tests covering every line and every branch**, including the ones you consider defensive or unlikely
- A green suite does NOT prove coverage: `npm run test` reports none. When you add or change logic, run the coverage command above and check your files before reporting the work as done
- Read the result from `coverage/vgc-multicalc/lcov.info`: `LF`/`LH` (lines), `BRF`/`BRH` (branches), `FNF`/`FNH` (functions) must match per file. `FNDA:0,` marks an uncalled function and a trailing `,0` in a `BRDA:` line marks an uncovered branch
- A new `?? fallback`, `?.`, ternary or optional spread creates a branch that needs BOTH sides exercised - this is the most common way coverage silently drops

**Covered layers** (what the report measures): `src/domain/**` (multicalc, calc, data), `src/app/store/**`, `src/app/services/**`, and the plain `.ts` logic files under `src/app/features/`, `src/app/pages/`, `src/app/configuration/` and `src/app/shared/`.

**NOT covered by unit tests**: Angular components (`*.component.ts`), templates and styles. These are validated by Cypress E2E, which the user runs. Do NOT write unit tests for components to chase coverage, and do NOT count them as a gap.

If covering a branch is genuinely impossible through the public API, say so and ask - never lower the bar silently, and never change an expected value to make a test pass.

### Workflow

1. Make code changes
2. **If only adding/removing logs**: Skip prettier, lint, and tests
3. **If logic changes**: Format modified files: `npx prettier --write <modified-files>`, then run tests: `npm run test`
4. **If logic changed in a covered layer**: run the coverage command and confirm the files you touched are still at 100% before reporting the work as done
5. (Optional) Run lint if needed

## Code Review Checklist

- [ ] Uses path aliases (no relative imports)
- [ ] Uses signals for reactivity
- [ ] Standalone component
- [ ] Proper TypeScript types
- [ ] Follows naming conventions
- [ ] **Has appropriate tests and they pass**
- [ ] **Coverage still at 100% for the modified files** (covered layers only)
- [ ] Uses `inject()` for DI
- [ ] Follows project structure

## Build Commands

- **DO NOT run build commands** when only modifying CSS/SCSS files (`.css`, `.scss`, `.sass` files)
- Only run build commands when modifying TypeScript (`.ts`), HTML (`.html`), or configuration files
- CSS/SCSS changes are hot-reloaded by the development server and don't require a build

## File Modification Guidelines

- When editing only stylesheets (`.css`, `.scss`), skip the build step
- When editing TypeScript, HTML, or config files, run tests to verify behavior

## Reactive Patterns

- **Prefer events over effects**: Always prefer handling logic in response to UI events (e.g., `(click)`) rather than using `effect()` to watch state changes. Only use `effect()` when absolutely necessary for side effects that cannot be easily triggered by events.
