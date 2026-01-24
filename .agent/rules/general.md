---
trigger: always_on
---

---

## alwaysApply: true

# VGC Multi Calc - Angular Project Rules

## Project Overview

This is an Angular 20.3.12 application for Pokémon VGC (Video Game Championships) damage and probability calculations. The project uses modern Angular patterns including signals, standalone components, and is zoneless.

## Core Technologies

- **Angular**: 20.3.12 (latest)
- **State Management**: NgRx Signal Store (@ngrx/signals)
- **Reactivity**: Angular Signals (zoneless application)
- **UI Framework**: Angular Material
- **Testing**: Cypress (E2E), Jasmine/Karma (Unit)
- **TypeScript**: 5.9.3 with strict mode enabled

## Project Structure

```
src/
├── app/              # Angular components
│   ├── core/        # Main/core components (header, main, not-found)
│   ├── features/     # Feature-specific components
│   ├── pages/        # Page-level components
│   └── basic/        # Reusable utility components
├── assets/           # Static assets (fonts, icons, sprites, media)
├── data/             # Data files and stores
│   └── store/        # NgRx Signal Store implementations
└── lib/              # Domain logic and business rules
```

## Path Aliases (TypeScript)

Always use path aliases instead of relative imports:

- `@app/*` → `src/app/*`
- `@basic/*` → `src/app/basic/*`
- `@features/*` → `src/app/features/*`
- `@pages/*` → `src/app/pages/*`
- `@core/*` → `src/app/core/*`
- `@data/*` → `src/data/*`
- `@lib/*` → `src/lib/*`

**Never use relative imports like `../` or `../../`** - use path aliases instead.

## Angular Component Patterns

### Standalone Components

All components must be standalone:

```typescript
@Component({
  selector: "app-example",
  imports: [/* dependencies */],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss"
})
```

### Signals for Reactivity

- Use Angular Signals (`signal()`, `computed()`, `effect()`) for all reactive state
- This is a **zoneless** application - do not rely on Zone.js
- Use `input()` and `output()` for component communication
- Use `model()` for two-way binding

### Dependency Injection

- Use `inject()` function instead of constructor injection:

```typescript
export class MyComponent {
  store = inject(CalculatorStore)
  service = inject(MyService)
}
```

### Component Selectors

- Component selectors: `app-*` prefix, kebab-case (e.g., `app-probability-calc`)
- Directive selectors: `app` prefix, camelCase (e.g., `appDirective`)

## State Management (NgRx Signal Store)

### Store Pattern

- All stores extend `signalStore` from `@ngrx/signals`
- Use `withState()` for initial state
- Use `withHooks()` for lifecycle hooks
- Use `patchState()` to update state
- Use `computed()` for derived state

Example:

```typescript
export class MyStore extends signalStore(
  { protectedState: false },
  withState({
    /* initial state */
  }),
  withHooks({
    /* hooks */
  })
) {
  // Methods that use patchState
}
```

### Store Location

- Stores are located in `src/data/store/`
- Import stores using `@data/store/*` path alias

## TypeScript Conventions

### Strict Mode

- TypeScript strict mode is enabled
- Always provide explicit types
- Use `any` only when absolutely necessary (ESLint allows it, but prefer proper types)
- Use `Partial<>`, `Record<>`, and utility types appropriately

### Type Definitions

- Domain types are in `src/lib/types.ts`
- Store-specific types are co-located with stores
- Use descriptive type names

### Naming Conventions

- Classes: PascalCase (e.g., `CalculatorStore`)
- Interfaces/Types: PascalCase (e.g., `PokemonState`)
- Variables/Functions: camelCase (e.g., `activePokemon`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_TEAM_SIZE`)
- Files: kebab-case (e.g., `calculator-store.ts`)

## Code Organization

### Imports Order

1. Angular core imports
2. Angular feature imports
3. Third-party library imports
4. Path alias imports (grouped by alias)
5. Relative imports (avoid when possible)

Example:

```typescript
import { Component, computed, inject } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { signalStore, withState } from "@ngrx/signals"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"
```

### File Structure

Each component should have:

- `.ts` - Component class
- `.html` - Template
- `.scss` - Styles
- `.spec.ts` - Unit tests (if applicable)

## Styling

### CSS Variables

- Use CSS variables for theming: `var(--text)`, `var(--highlight)`, etc.
- Defined in `src/themes.css` and `src/variables.scss`

### SCSS Organization

- Use SCSS for component styles
- Follow BEM-like naming when appropriate
- Use CSS custom properties for dynamic values

## Testing

- In tests that depends of a value, create with a random value and inform this. Avoid generic tests like expect x is greater than 0. I want to validate real values.

### Unit Tests

- Use Jasmine for unit tests
- Test files: `*.spec.ts`
- Location: Co-located with source files
- Always use the Given/When/Then format. Without comments, just a space between the blocks.

### E2E Tests

- Use Cypress for E2E tests
- Location: `cypress/e2e/`
- Page objects: `cypress/page-object/`
- Always try encapsulate page access in page objects. Avoid cy.get in tests directly.

### Test Data Attributes

- Use `data-cy` attributes for Cypress selectors
- Example: `data-cy="team-score-donut"`
