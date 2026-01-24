---
trigger: always_on
---

## ESLint Rules

### Import Restrictions

- **Never use relative imports** (`../` or `../../`)
- Use path aliases instead
- ESLint will error on relative imports

### TypeScript Rules

- `@typescript-eslint/no-explicit-any`: Off (but prefer proper types)
- `@typescript-eslint/no-unused-vars`: Error (with exceptions for `_` prefix)
- Unused variables starting with `_` are allowed

## Angular Material

- Use Angular Material components when appropriate
- Import only needed modules/components
- Follow Material Design guidelines

## Domain Logic

- Business logic belongs in `src/lib/`
- Keep components focused on presentation
- Use services for shared business logic
- Domain models are in `src/lib/model/`

## Data Files

- Static data (movesets, pokemon data, etc.) is in `src/data/`
- These are TypeScript files exporting constants/objects
- Keep data files organized by domain

## Assets

- Images: `src/assets/`
  - Sprites: `src/assets/sprites/`
  - Icons: `src/assets/icons/`
  - Media: `src/assets/media/`
- Fonts: `src/assets/fonts/`
- Reference assets using `assets/` path (not `src/assets/`)

## Common Patterns

### Computed Properties

```typescript
readonly activePokemon = computed(() =>
  this.store.team().activePokemon()
)
```

### Signal Updates

```typescript
selectedPokemon = signal<Pokemon>(initialValue)
// Update:
this.selectedPokemon.set(newValue)
```

### Store State Updates

```typescript
updateState(newState: Partial<State>) {
  patchState(this, () => ({ ...this.state(), ...newState }))
}
```

## Best Practices

1. **Always use path aliases** - Never use relative imports
2. **Use signals for reactivity** - This is a zoneless app
3. **Keep components focused** - Single responsibility
4. **Use computed for derived state** - Avoid manual calculations in templates
5. **Inject dependencies** - Use `inject()` function
6. **Type everything** - Leverage TypeScript's type system
7. **Follow naming conventions** - Consistency across the codebase
8. **Write tests** - Especially for business logic
9. **Use ESLint** - Follow the configured rules
10. **Keep stores simple** - Complex logic should be in services
11. **Never use comments in the code unless if I ask**
12. **Place private functions below where they are first used** - Private methods should be defined after the first public method that uses them

## When Creating New Features

1. Determine if it's a `page`, `feature`, or `basic` component
2. Create component files (`.ts`, `.html`, `.scss`)
3. Use appropriate path alias for imports
4. Use signals for all reactive state
5. Inject stores/services using `inject()`
6. Add `data-cy` attributes for E2E testing
7. Write unit tests for business logic
8. Follow existing patterns in the codebase

## Code Formatting

### Prettier Configuration

The project uses Prettier with the following configuration (`.prettierrc.yaml`):

- `printWidth: 250` - Maximum line length
- `arrowParens: "avoid"` - Avoid parentheses around single arrow function parameters
- `bracketSameLine: true` - Put `>` of multi-line HTML/JSX elements on the same line
- `trailingComma: "none"` - No trailing commas
- `tabWidth: 2` - Use 2 spaces for indentation
- `semi: false` - No semicolons
- `singleQuote: false` - Use double quotes

### Formatting Rules

#### Spacing Around Control Structures

- **Always add blank lines around `if` statements** when they are not part of a chain
- **Add blank line before `if` statements** when they come after variable declarations
- **Add blank line after `if` statements** when they are followed by other statements (variables, returns, etc.)
- Use blank lines to separate logical blocks of code
- Multiple consecutive `if` statements should have blank lines between them when they are independent conditions

Example - Correct spacing:

```typescript
const multiplier = effectiveness1 * effectiveness2

if (multiplier === 0) return 0
if (multiplier === 0.25) return 0.25
if (multiplier === 0.5) return 0.5
if (multiplier === 1) return 1
if (multiplier === 2) return 2
if (multiplier === 4) return 4

return 1
```

Example - If/else chains (no blank line needed between if and else):

```typescript
if (this.typeEffectivenessService.isWeakness(finalEffectiveness)) {
  coverageType = "super-effective"
} else if (this.typeEffectivenessService.isResistance(finalEffectiveness)) {
  coverageType = "not-very-effective"
} else {
  coverageType = "none"
}
```

Example - If block followed by return statement (blank line required):

```typescript
getMoveType(row: DefensiveCoverageData | DefensiveCoverageByPokemonData): string | null {
  if (!this.isAgainstTeam()) {
    const typeData = row as DefensiveCoverageData
    return typeData?.moveType || null
  }

  return null
}
```

Example - Variable declaration before if statement (blank line required):

```typescript
secondTeamHasTeraBlast = computed(() => {
  const secondTeamValue = this.secondTeam()

  if (!secondTeamValue) return false

  return secondTeamValue.teamMembers.some(member => {
    if (member.pokemon.isDefault) return false

    const moves = [member.pokemon.moveSet.move1, member.pokemon.moveSet.move2, member.pokemon.moveSet.move3, member.pokemon.moveSet.move4]

    return moves.some(move => move && move.name === "Tera Blast")
  })
})
```

Example - If block followed by variable and return (blank lines required):

```typescript
getRowKey(row: DefensiveCoverageData | DefensiveCoverageByPokemonData): string {
  if (this.isAgainstTeam()) {
    const pokemonData = row as DefensiveCoverageByPokemonData
    return pokemonData?.targetPokemon?.id || ""
  }

  const typeData = row as DefensiveCoverageData

  return typeData?.moveType || ""
}
```

Example - Multiple if statements followed by return (blank line before return):

```typescript
getCellClass(effectiveness: TypeEffectiveness): string {
  if (effectiveness === 0) return "immune"
  if (effectiveness === 0.25 || effectiveness === 0.5) return "resistance"
  if (effectiveness === 2) return "weakness"
  if (effectiveness === 4) return "weakness-4x"

  return ""
}
```

#### Function Formatting

- **Always add blank line before `return` statements** unless it's a very simple function with only 2 lines (e.g., single variable declaration + return)
- **Always add a blank line after a closing `}` of an `if` block** when followed by any statement (variable declaration, return, etc.)
- **Add blank line between variable declarations and return statements** when they are not in the same logical block
- Add blank lines between logical sections within functions

Example:

```typescript
formatEffectiveness(effectiveness: TypeEffectiveness): string {
  if (effectiveness === 0) return "immune"
  if (effectiveness === 0.25) return "1/4"
  if (effectiveness === 0.5) return "1/2"
  if (effectiveness === 1) return ""
  if (effectiveness === 2) return "2x"
  if (effectiveness === 4) return "4x"

  return ""
}
```

#### General Formatting Guidelines

- Always run `npx prettier --write <file>` after making changes
- Follow the existing code style in the project
- When in doubt, check similar files in the codebase for formatting patterns
- Blank lines should separate:
  - Different logical blocks
  - Variable declarations from control structures
  - Return statements from preceding code (when not the only statement)

### Formatting Workflow

1. Make code changes
2. Run `npx prettier --write <file>` to format the file
3. Verify formatting with `npm run formatter`
4. Ensure all files follow the project's formatting style
