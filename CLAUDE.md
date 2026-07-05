# Claude Code Guidelines for VGC Multi Calc

This project follows strict rules defined in the `.claude/rules/` directory. Please read and follow all guidelines below.

## Core Rules

All rules are defined in the following files and MUST be followed in every interaction:

### 1. **General Rules** (`.claude/rules/general.md`)

Covers project overview, Git rules, agent behavior, Angular patterns, state management, TypeScript conventions, and best practices.

**Key Points:**

- **NEVER run git commands** - User handles all version control
- **Do NOT over-deliver** - Only implement what's explicitly requested
- Use **path aliases** (never `../` or `../../`)
- Standalone components with **signals** for reactivity
- Use `inject()` for dependency injection
- No components with constructor DI
- **NO COMMENTS** in code unless explicitly asked
- State management via NgRx Signal Store

### 2. **Code Style Rules** (`.claude/rules/code-styles.md`)

Covers ESLint rules, code organization, styling, domain logic, and code formatting with Prettier.

**Key Points:**

- Prettier config: `printWidth: 250`, `semi: false`, `singleQuote: false`, `arrowParens: "avoid"`
- **Spacing rules:** Blank lines around `if` statements, before `return` statements, after `}` of if blocks
- Use CSS variables for theming
- Avoid `::ng-deep` - prefer `input()` properties for customization
- **NO COMMENTS** - strict prohibition
- Private functions placement: after the first public method that uses them
- Test format: Given/When/Then (without comments)

### 3. **Quality & Validation Rules** (`.claude/rules/quality.md`)

Covers when to run prettier, lint, tests, and build commands.

**Key Points:**

- **Format only modified files:** `npx prettier --write <file>`
- Do NOT run full formatter (`npm run formatter`) after every change
- Do NOT run `npm run lint` after every change
- **Run tests ONLY for logic changes**, not for formatting or logging
- **NEVER run Cypress tests** - User handles E2E testing
- Don't run build for CSS/SCSS-only changes
- Prefer events over `effect()` for side effects

## Workflow Summary

1. **Code Changes** → Format modified files → Run tests (if logic changes)
2. **Follow all naming conventions** (PascalCase, camelCase, UPPER_SNAKE_CASE)
3. **Use signals for state** - zoneless Angular application
4. **No relative imports** - always use path aliases
5. **No comments** unless explicitly requested
6. **Type everything** with TypeScript strict mode

## Debugging CSS/Layout Issues

When the user reports a visual bug:

1. **Inspect before theorizing.** Ask the user to run a small DevTools snippet that dumps `getComputedStyle` of the suspect element. Do this BEFORE proposing any structural change. Most CSS bugs are one rule being overridden, not a fundamental design flaw.

2. **Suspect specificity first.** When a property "doesn't apply", grep for other selectors targeting the same element. A more specific selector overriding a base rule is the #1 cause of "CSS not working".

3. **One change at a time.** If a fix doesn't work, revert it before trying the next idea. Never stack speculative fixes — they compound and obscure the real cause.

4. **Match solution size to bug size.** A frozen column should be ~5 lines of CSS. If you find yourself adding JS listeners, viewChildren, effects, or template restructures to fix a CSS issue, stop and re-diagnose.

5. **Don't propose structural changes early.** Moving DOM, adding wrappers, or splitting components is a last resort, not a first instinct. Exhaust CSS-only options first.

Refer to the original rule files:

- `.claude/rules/general.md` - Project structure and patterns
- `.claude/rules/code-styles.md` - Code formatting and styling
- `.claude/rules/quality.md` - Testing and validation workflow
