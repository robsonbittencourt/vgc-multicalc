# 0002 — Hexagonal architecture: domain / infrastructure / app

Status: Accepted · Builds on ADR 0001 (which vendored the calc engine behind `@calc`).

## Context

`src/lib` had become a catch-all mixing pure calculation, domain logic, and
browser/UI services; `src/store` held all app state. There was no enforced
direction between these concerns.

## Decision

Reorganize the project toward a hexagonal architecture with a single,
ESLint-enforced dependency direction:

```
app  ──►  multicalc (domain)  ──►  calc (pure calculation)
```

- **domain may use Angular DI** (`@Injectable`/`inject()`) but never
  Component/template/CSS.
- **the domain receives data as arguments** (Pokemon/Move/Field/Team). It does
  not read or mutate app state; where a service used to touch a store, the
  dependency was inverted (component reads the store and passes data in, or the
  domain returns an intent the app applies).
- **NgRx signal stores are app**, not infrastructure — they hold session/UI
  state (selections, active tab, mode), not persisted domain data.

## Final layout

Physical folders were renamed so the layers are self-evident:

```
src/domain/calc              (was src/calc)      — pure engine, public API @calc
src/domain/multicalc          (was src/multicalc) — domain logic, per feature
src/infrastructure/adapters   (was src/multicalc/adapters) — @adapters
src/infrastructure/data       (was src/data)      — static game data, @data
src/app                       — presentation + orchestration + stores (unchanged;
                                renaming breaks the Angular CLI)
```

Aliases (`@calc`, `@multicalc/*`, `@data`, `@adapters`) resolve to the new paths;
ESLint boundaries enforce the downward-only rule on every layer.

## Outcome

- Every domain feature (probability-calc, type-coverage, speed-calculator,
  ev-optimizer, damage-calculator) moved out of `src/lib` into the domain layer,
  each behind the boundary. Store couplings were inverted where present.
- Browser/UI services (theme, sprite, device-detector, pwa, snackbar, …) moved to
  `@core/services`; `src/store` and `user-data` moved into `src/app`.
- `smogon` and `model` stayed in the base layer: `calc → model → smogon` is the
  low-level chain, so promoting them to the domain would invert the hierarchy.
- Formatting impurities were pushed to the edge (e.g. probabilities return raw
  numbers; a pipe formats them in the UI).

## Open / deferred

- **`user-data`** (serialization/persistence) should become a driven **port**
  implemented in the app; currently lives under `@store/user-data`.
- **`configuration`** is consumed by both the base layer and the app — final home
  (fold into base vs. split) still to decide.
- Extracting a thin **application** orchestration layer out of the components is a
  larger, separate decision.
