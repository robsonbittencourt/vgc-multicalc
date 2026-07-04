# 0001 — Vendor the calc engine and unify all game data into `src/data`

Date: 2026-07-03 · Branch: `remove-sv` · Status: Accepted

## Context

The app depended on `@robsonbittencourt/calc` (a fork of Smogon's damage-calc)
as an npm package. Game data was **duplicated**: the calc package carried its
own tables (`SPECIES`, `MOVES`, `ITEMS`, `ABILITIES`, `NATURES`) and the app
carried parallel tables (`POKEMON_DETAILS`, `MOVE_DETAILS`, …) with UI fields
(learnsets, descriptions, PP, sprites). On top of that, data was split by game
into `*-champions` variants merged at runtime, and the app shipped a second
"SV" mode alongside Champions.

Three problems compounded: two sources of truth per entity that could drift;
a gen-based calc API carrying machinery the app never used (it only ever runs
Champions); and SV-mode branches that were effectively dead in day-to-day use.

## Decision

Across five commits (`a412fcf9`, `69a17a7e`, `7dfeab16`, `537167e9`,
`fdd39695`):

1. **Vendor the calc** into `src/lib/calc` (engine + models). The app owns the
   engine source now, not a package version.
2. **Drop SV mode.** The app is Champions-only. Everywhere there was
   `if (isChampions()) {…} else {…SV…}`, the SV branch was dead code — removed,
   Champions body promoted.
3. **Unify data in `src/data`, one file per entity.** The engine no longer
   holds data tables. Each entity has a single source (`pokemon-data.ts`,
   `move-data.ts`, `item-data.ts`, `ability-data.ts`, `nature-data.ts`,
   `moveset-data.ts`) plus a `getXData(name)` accessor. Champions overrides were
   flattened into the base tables; `*-champions` files deleted.
4. **Extract shared structural types** to `src/types/calc-types.ts`
   (alias `@vgc-types`). Both `src/data` (owns the data) and `src/lib/calc`
   (owns the engine) depend on these types without either owning the other,
   avoiding an import cycle.

The engine reads all data through accessors that normalize the lookup key via
`toID()` (lowercase, strip non-alphanumerics). Every table's keys **are** the
`toID` of the entry's display name — verified: 0 mismatches across items (253),
abilities (313), moves (941), pokémon (1316). So `getXData(displayName)` always
resolves; normalization lives inside the accessor, not at the call site.

## Consequences

**Good.** One source of truth per entity — no more app/engine drift. The
gen-less engine is faster: benchmarked ~55–65% lower ns/call on `calculate` and
~68–75% on `calculateMulti` vs the gen-based package, with lower heap use (see
`history/performance/`). SV removal deleted a whole mode's worth of assets and
branches.

**Cost / watch-outs.**

- The calc is now vendored: upstream damage-calc fixes must be ported by hand.
- The engine imports from `src/data` — the vendored lib is no longer a
  self-contained island. This dependency inversion is deliberate; the ESLint
  boundary that isolates `lib/calc` was relaxed for it.
- Flattening Champions overrides means the Champions values (mostly PP, a few
  base powers) are now *the* values. One deliberate example: a move's base power
  was intentionally lowered in the merge, which shifted an E2E expectation
  (Calyrex-Shadow damage). That's correct, not a regression.
- Data lookups depend on the `key === toID(name)` invariant. If a future entry
  breaks it, the accessor returns `undefined` and the item/move silently
  disappears from the UI. Keep keys as `toID(name)`.

## Notes

- Parental Bond's second hit was reworked from an ability-string marker
  (`"Parental Bond (Child)"`) to a `move.isParentalBondChild` flag on a cloned
  move — the distinction lives on the move, which is what actually differs.
- `migrate-user-data.ts` collapses old `sv`/`champions`/flat localStorage
  buckets into a single `champions` bucket on load, preserving `themeData`.
- Availability (which pokémon/items show in the UI) stays a **separate layer**
  (`src/configuration`, top-usage/regulation) — the data files are just data.
