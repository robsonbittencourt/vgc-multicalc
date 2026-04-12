# Claude Code Guidelines for VGC Multi Calc

This project follows strict rules defined in the `.agent/rules/` directory. Please read and follow all guidelines below.

## Core Rules

All rules are defined in the following files and MUST be followed in every interaction:

### 1. **General Rules** (`.agent/rules/general.md`)

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

### 2. **Code Style Rules** (`.agent/rules/code-styles.md`)

Covers ESLint rules, code organization, styling, domain logic, and code formatting with Prettier.

**Key Points:**

- Prettier config: `printWidth: 250`, `semi: false`, `singleQuote: false`, `arrowParens: "avoid"`
- **Spacing rules:** Blank lines around `if` statements, before `return` statements, after `}` of if blocks
- Use CSS variables for theming
- Avoid `::ng-deep` - prefer `input()` properties for customization
- **NO COMMENTS** - strict prohibition
- Private functions placement: after the first public method that uses them
- Test format: Given/When/Then (without comments)

### 3. **Quality & Validation Rules** (`.agent/rules/quality.md`)

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

## When in Doubt

Refer to the original rule files:

- `.agent/rules/general.md` - Project structure and patterns
- `.agent/rules/code-styles.md` - Code formatting and styling
- `.agent/rules/quality.md` - Testing and validation workflow
