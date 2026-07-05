# 0002 — Move toward a hexagonal architecture: calc / multicalc / webapp

Date: 2026-07-03 · Branch: `remove-sv` · Status: Accepted (in progress)

## Naming update — physical folders renamed to domain / infrastructure / app

After the rollout below completed, the physical top-level folders were renamed
to make the hexagonal layers self-evident without relying on this doc to
"translate" them:

```
src/calc              → src/domain/calc
src/multicalc          → src/domain/multicalc
src/multicalc/adapters → src/infrastructure/adapters
src/data               → src/infrastructure/data
src/app                → unchanged
```

Rationale (debated at length, conclusions only — do not re-litigate):

- **`domain`** = `calc` + `multicalc`. Both are pure business logic, reusable
  outside the app's context (verified: zero production-code imports of
  `@store`/`@app`/`@core` anywhere under `multicalc`). `multicalc` is **not**
  "application" — orchestrating domain calculations to produce a domain result
  is still domain, not use-case orchestration.
- **`infrastructure`** = `data` (static game data) + `adapters` (translation
  glue between representations — the literal textbook meaning of "adapter").
  `adapters` legitimately imports `@calc`/`@multicalc`/`@data`; it is the seam
  between domain and infra, not a leaf like `data`.
- **`app`** stays `src/app` — renaming it breaks the Angular CLI's build/serve
  pipeline (confirmed via an angular-cli GitHub issue and Ionic forum report),
  and no real-world Angular hexagonal example found renames the CLI's own root.
  In practice `app` is presentation + application (orchestration) fused — this
  is normal in Angular, which has no structural seam between the two. The NgRx
  signal stores stay in `app`: they hold *application/session state* (user
  selections, active tab, mode toggles), not persisted domain data, so they
  are not infra.

Scope of the rename: **physical move + alias/boundary updates only.** No
orchestration was extracted, no service contract changed, no store touched.
New alias `@adapters`/`@adapters/*` added (`src/infrastructure/adapters`);
`@calc`, `@multicalc/*`, `@data/*` keep their names, only the resolved physical
path changed. ESLint boundaries updated to the new paths, with a new
`infrastructure/adapters` boundary block (may depend on `@data`, `@calc`,
`@multicalc` — must not import webapp/UI). Checkpoint: `tsc --noEmit` clean,
1769/1769 tests, lint clean (one unrelated pre-existing error untouched),
build green (587.99 kB initial, same pre-existing budget warning, no bundle
inflation).

Explicitly deferred (see "Infra / port candidates" section below — unchanged
by this rename): `user-data`, `configuration`, `feature-flags`, `model`/`utils`
final placement, and "emagrecer app" (extracting a thin `application`
orchestration layer out of the components) — all separate, larger design
decisions, not mechanical moves.

## Progress log

- **probability-calc — Step 1 done.** 4 services moved to
  `src/multicalc/probability-calc/`; `@multicalc/*` alias added; ESLint boundary
  block for `src/multicalc/**` added; `tsconfig.spec.json` includes
  `src/multicalc/**/*.spec.ts`. Boundary verified positively (a forbidden
  `@store` import is flagged). Tests + lint + build green.
- **probability-calc — Step 2 done.** `MoveProbabilityService` and
  `CombinedProbabilityService` now return `number` (raw probability in `[0,1]`);
  `PercentageFormatService` removed from the domain and reborn as
  `ProbabilityPercentPipe` in the webapp
  (`src/app/pages/probability-calc/pipes/`), applied with `| probabilityPercent`
  in templates. Service specs assert **exact** raw numbers (no `toBeCloseTo`;
  where float noise exists they compare against the same expression the service
  computes). Rounding is the front's job, tested in the pipe spec. Tests + lint
  + build green.

### Decision refinement (rollout of remaining features)

After the pilot, the rollout applies **Step 1 only** (move services + boundary)
to every domain feature, homogeneously. Formatting impurities (string→number)
and rule-leaks in components are deferred to a **later phase**, handled together
once everything is relocated. Rationale: moving a file is mechanical and
reversible; extracting a rule is a design change — don't mix them per feature.
`user-data` is **excluded** from this move phase (it is persistence → a port,
not a domain service to relocate).

- **type-coverage — Step 1 done.** 3 services (`type-coverage`,
  `type-coverage-insights`, `type-effectiveness`) moved to
  `src/multicalc/type-coverage/`; 6 consumer components in `src/app/pages/type-calc/`
  re-pointed to `@multicalc/type-coverage/`. No store/browser coupling, so the
  boundary held with no design change. Tests (380) + lint green.
  - *Noted for the later cleanup phase (not touched now):* presentation impurities
    living in these services — `getCellClass()` (returns a **CSS class**),
    `formatEffectiveness()`, `getPokemonTeraType()`.
- **speed-calculator — done (first case that required a design change).** All 9
  files moved to `src/multicalc/speed-calculator/`; 8 consumers (in `@lib`,
  `@store`, and `@app/pages/speed-calc`) re-pointed to `@multicalc/speed-calculator/`.
  Unlike the previous features, `SpeedCalculatorService` **injected
  `CalculatorStore`** (to fetch targets/team), which the boundary forbids. Per the
  "domain receives data as arguments" rule, the store dependency was **inverted**:
  - New `SpeedTeamPokemon` interface (`{ opponents, team, myTeam }`); `orderedPokemon`
    takes it as a parameter; the 3 private store-reading methods
    (`opponentPokemon`/`teamPokemon`/`myTeamPokemon`) were removed.
  - The consumer `speed-scale.component.ts` (which already injects the store) now
    resolves those lists and passes them in.
  - The service spec was made store-free: a local `StoreStub` (same shape:
    `targets()/teams()/team()`) replaces `CalculatorStore`, so the domain test no
    longer imports `@store` (the boundary flagged it — working as intended). **No
    assertions changed**; only how each test supplies the data.
  Tests (98 across speed specs + consumers) + lint + build green.
  - *Lesson:* features whose services inject a store are **not** pure "move"
    steps — expect a small, local dependency inversion (component reads store →
    passes data). This is the boundary doing its job, and it is in-scope for the
    move (not deferred), because otherwise the file cannot cross the boundary at all.
- **ev-optimizer — done.** All files (root service + `internal/`) moved to
  `src/multicalc/ev-optimizer/`; 4 consumers (simple-calc + multi-calc, desktop
  + mobile) re-pointed. Production code injects **no** store, so it was a clean
  move. But the boundary flagged **5 specs** that imported `@store` — not for
  logic, but only to supply `{ provide: CalculatorStore, useValue: … }` needed by
  `DamageCalculatorService` (a transitive dep still in `@lib`). Fixed by
  extracting a shared test helper **`provideDamageCalculatorForTest()`** in
  `@lib/damage-calculator/damage-calculator-test-providers.ts` (where `@store` is
  a legitimate dependency); the ev-optimizer specs import that helper and no
  longer touch `@store`. No assertions changed (none asserted on the adjuster spy;
  it was a no-op). Tests (103) + lint + build green.
  - **KNOWN DEBT (temporary):** `@multicalc/ev-optimizer` imports
    `@lib/damage-calculator` (roll-level-config + `DamageCalculatorService` in
    survival-checker/refinement-stage/attacker-selector). Allowed by the boundary
    (`@multicalc → @lib` is not forbidden) but it is *promoted-domain depending on
    not-yet-promoted-domain*. **Closes automatically when damage-calculator moves
    to `@multicalc`.** Decision (user): accept and move on incrementally.
  - *Rule learned:* when a store import in a spec exists only to satisfy a
    transitive service's DI, extract a `provideXForTest()` helper in that
    service's own module rather than importing `@store` from the domain spec.

### ⚠️ CRITICAL — smogon must NOT move to @multicalc (needs discussion)

While scoping `smogon` (0 store, "should be a clean move"), found it is **not a
domain feature** — it is **base infrastructure of the model itself**:

- `@lib/model/pokemon.ts` is built on top of `SmogonPokemon` (`fromScratch`,
  `higherStat`), using it in ~50 places. The `Pokemon` class *is* a wrapper over
  smogon.
- `@lib/model/pokemon` is imported by **`@lib/calc`** (the lowest scope:
  `calc/engine/*`, `calc/index.ts`, …).

So the dependency chain is `calc → model/pokemon → smogon`. Moving `smogon` up to
`@multicalc` would create `calc → model → @multicalc` — the **lowest** scope
depending on the **middle** scope. That inverts the whole hierarchy and violates
the golden rule (`webapp → multicalc → calc`).

**Decision: smogon stays out of the `@multicalc` move.** It belongs in the base
layer alongside `model` (or inside `calc`). Where exactly `smogon` and `model`
live in the final scope map is an **open architectural question for discussion**
(they are shared base, below multicalc). Skipped for now; not moved.

### ⏸️ STOPPED HERE — damage-calculator needs design discussion (store mutation)

`damage-calculator` is the last large domain feature to move (3 services inject
the store, 22 consumers). Two of the three store touches are simple reads
(invertible like speed did):

- `damage-calculator.service.ts:179` — reads `calculatorStore.useSpsMode()` (a
  boolean flag).
- `damage-result-order.service.ts:34-35` — reads `store.targets()` to count
  tera/commander.

But the third is a **store mutation**, not a read:

- `damage-multi-calc.service.ts:53` — `activateBestMoveForTarget()` computes the
  best move (domain) and then **calls `this.store.activateMove(target.id, index)`**
  — a side effect on app state.

Inverting a mutation is a genuine design change, not a "pass the data in" move:
the domain method should **return** the intent (e.g. the best move index) and let
the webapp apply `store.activateMove`. This changes a public method's contract and
can affect observable behavior (when/whether the move gets activated), so it is
**out of scope for autonomous "move the files" work.**

**State: damage-calculator NOT moved.** All the smaller features are done. Next
session should decide, with the user, how the domain communicates the
`activateMove` intent back to the webapp before migrating damage-calculator.

### damage-calculator — Sub-step 1 DONE (mutation inverted); rest needs discussion

Migration was split into sub-steps (mutation → MenuStore → useSpsMode → targets →
move). Sub-step 1 is done and green; the rest was stopped because each remaining
inversion is a contract change across widely-consumed public methods, not a
mechanical move.

**✅ Sub-step 1 — store mutation inverted (done, 105 tests green + build).**
- `DamageMultiCalcService.bestMoveIndex(...)` is now **public**;
  `activateBestMoveForTarget` (which called `store.activateMove`) was removed.
- `DamageMultiCalcService` no longer injects `CalculatorStore`.
- The 7 call-sites in multi-calc (desktop + mobile) now do
  `store.activateMove(target.id, damageCalculator.bestMoveIndex(target, attacker, field))`
  — the components already inject the store. Argument order preserved exactly
  (in multi-calc the "target" is the attacker for the best-move calc).

**✅ Sub-step 2 — MenuStore + targets inverted in the two multi-calc services
(done, 1769 tests + build green).**
- New shared type `MultiCalcMode { oneVsManyActivated, manyVsOneActivated,
  oneVsManyBestMoveActivated }` (in `damage-result-order.service.ts`).
- `DamageMultiCalcService` no longer injects `MenuStore`;
  `calculateDamageForAll(..., mode, targetsWithSpecificCalc, secondAttacker?)`.
- `DamageResultOrderService` no longer injects `CalculatorStore`/`MenuStore`;
  `order(results, targetsWithSpecificCalc, mode)`. It stays **stateful** but the
  store-derived count now comes in as an argument.
- **Timing fidelity preserved via `initialize(count)`:** the service kept its
  constructor-seeded baseline behavior by exposing `initialize()`, which the two
  components call in their constructor with the initial count (= the old
  constructor read). Verified against the reordering-on-Tera/Commander spec — no
  assertions changed, only how the count is supplied.
- Both components compute `MultiCalcMode` (from menuStore flags) and
  `countTargetsWithSpecificCalc()` (from `store.targets()`) and pass them in.

**✅ Sub-step 3 — `useSpsMode` inverted via InjectionToken (done).**
- New `USE_SPS_MODE` token (`@multicalc/damage-calculator/use-sps-mode.token.ts`),
  `providedIn: root`, default factory `() => () => false`. The service injects the
  token instead of `CalculatorStore`; `formatDescription` calls `this.useSpsMode()`.
- The webapp overrides it with the real store via `provideUseSpsMode()` in
  `src/app/core/providers/use-sps-mode.provider.ts`, registered in `main.ts`.
  Chosen a token (not threading a flag through public methods) because `useSpsMode`
  is global display config, not per-call data.
- **Bundle gotcha (important):** first attempt imported `CalculatorStore` **directly
  in `main.ts`** for the factory. That pulled the store — and transitively
  `@data`'s `MOVESETS` — into the **initial** bundle (routes are lazy, so the store
  is normally only in lazy chunks): +1.5 MB, budget error. Fix: put the factory in
  a **separate `@core/providers` file**; the `inject(CalculatorStore)` inside a
  lazily-executed factory tree-shakes fine and the store stays in lazy chunks.
  Lesson: don't statically import store/`@data`-pulling modules into `main.ts`.
- Note `useSpsMode` defaults to **true** in app state, so a `() => false` default
  would have been a real UX regression — the override must be wired.

**✅ MOVE DONE — damage-calculator is now `@multicalc/damage-calculator`.**
All 3 services store-free → moved the whole dir (incl. `calc-adjuster/`) to
`src/multicalc/damage-calculator/`; **46 files** re-pointed from
`@lib/damage-calculator/` to `@multicalc/damage-calculator/`. **This auto-closed
the ev-optimizer temp debt** (its imports are now `@multicalc → @multicalc`).
`main.ts` imports the adjusters from `@multicalc` now. Full suite (1769) + lint
(whole `src/multicalc` boundary clean) + build (bundle not inflated) green.

Once all three services are store-free: move to `@multicalc/damage-calculator`,
rewrite imports (**this auto-closes the ev-optimizer temp debt**), and fix specs
that provide the store via `provideDamageCalculatorForTest()`.

### webapp scope — browser/UI services moved out of `src/lib` (done)

Moved 10 browser/UI services from `src/lib/*.service.ts` to
`src/app/core/services/` (alias `@core/services/`): `app-update`,
`back-navigation`, `chunk-error-recovery`, `device-detector`, `json-ld`,
`network-status`, `pwa-install`, `snackbar`, `sprite`, `theme` (+ specs). 29
consumer imports re-pointed `@lib/<svc>.service` → `@core/services/<svc>.service`.
Verified no `@multicalc` service imported any of them (direction already correct),
and the multicalc ESLint boundary already forbids `@core/*`, so the rule now guards
this too. Full suite (1769) + lint + build green; bundle not inflated.

What remains top-level in `src/lib` is **not** browser/UI — it's domain/base
(`default-pokemon`, `field-mapper`, `pokemon-by-regulation`, `types`, `constants`,
`test-utils`) plus `feature-flags` (config, borderline).
These stay for now; their final home is part of the base-layer question below.

### Store scope — `src/store` moved to webapp (done)

Analysis showed the store needs **no inversions** like the domain features did —
it *is* webapp by definition. The store importing `@lib/*`/`@calc`/`@data` is a
correct dependency (base layer downward); only 3 threads crossed the boundary the
wrong way, and all three disappeared by relocation/cleanup alone (no intents
needed):

1. `theme-store → @core/services/theme.service` — only imported the `Color`/`Theme`
   **types**; became webapp→webapp once relocated.
2. `automatic-field-service` (was in `@lib`, mutating `FieldStore` directly) —
   user decided it's **webapp** (UI orchestration, not domain/calc logic), so it
   moved alongside the store to `src/app/store/automatic-field/`.
3. `export-poke.service → @store/calculator-store` — the service is webapp-pure
   (injects `MatDialog`, opens `TeamExportModalComponent`, uses CDK). Its
   `inject(CalculatorStore)` was **dead code** (never referenced in the body) —
   removed, along with the matching `storeMock`/provider in its spec.

Executed: `src/store` → `src/app/store` (alias `@store` kept, only the physical
path changed in `tsconfig.json`, `tsconfig.spec.json`, and
`history/performance/run.mjs`); `automatic-field-service(.spec)` moved with it;
`user-data` (export-poke, pdf-export, poke-paste-parser, resolver, `user-data.ts`)
moved from `@lib/user-data` to `@store/user-data` — it's persistence/webapp, not
domain. Checkpoint green: `tsc --noEmit` clean, 1769/1769 tests, ESLint clean,
build OK (591.85 kB initial, same pre-existing budget warning, no bundle
inflation). No `@multicalc` file touches `@store` (boundary already blocked it).

### Base scope — `@lib` sealed as the shared base layer (done)

With every domain feature and every webapp artifact moved out, `@lib` is now the
pure base (`model`, `smogon`, `utils`, `calc`, `types`, `constants`,
`default-pokemon`, `field-mapper`, `pokemon-by-regulation`, `feature-flags`,
`test-utils`). Its internal flow is already unidirectional and downward:
`utils/types` (leaves) ← `model` ← `smogon` (stat calculators, 148 refs to model)
and `calc` (pure engine, exposed via `@calc`), all depending only on `@data` and
each other.

**One inverted dependency remained and was removed:** `model/team-member.ts` had a
`damageResult: DamageResult` field importing `@multicalc` — the *only* `@lib →
@multicalc` import in the codebase. Proven dead (never assigned anywhere; the
constructor only takes `(pokemon, active)`; the sole literal `.damageResult`
reference was its own declaration) — a leftover from an older design where the
result lived on the team member. Field + import deleted.

Added an ESLint boundary for `files: ["src/lib/**/*.ts"]` forbidding `@app/*`,
`@basic/*`, `@features/*`, `@pages/*`, `@core/*`, `@store/*`, `@multicalc/*` —
"@lib is the shared base layer; dependencies point downward only." Verified the
rule actually fires (probe file) and that `@lib` is clean (prod + specs). This
seals the full hierarchy: `webapp → @multicalc → @lib(base) / @calc`, each edge
now ESLint-enforced. Checkpoint: tsc clean, 1769/1769 tests, ESLint clean.

### webapp scope — `src/assets` moved into `src/app/assets` (done)

`src/assets` (fonts, icons, media, sprites, PDF, screenshots) is webapp-only static
content, so it moved to `src/app/assets`. The public URL stays `/assets/...` —
only the physical path in the repo changed. `angular.json`'s `assets` build option
switched from a plain path to the object form (`{ input: "src/app/assets", glob:
"**/*", output: "assets" }`) so the output location is unaffected. `ngsw-config.json`
already referenced the public URL (`/assets/**`), not the physical path, so it
needed no change.

Two SCSS files resolved fonts as build-time file paths (not runtime URLs) via
esbuild's CSS resource resolution, and broke: `src/styles.scss` (`url("assets/fonts/...")`,
resolved via `stylePreprocessorOptions.includePaths: ["src"]` → now
`url("app/assets/fonts/...")`) and `how-to-use.component.scss` (relative
`../../../assets/fonts/...` from `src/app/pages/how-to-use/` → now `../../assets/fonts/...`,
since the base moved one level down). All other ~50 references across
HTML/TS/SCSS are runtime URL strings (`assets/sprites/...` etc.) and needed no
change, confirmed by grepping for TS module imports of asset paths (none exist).

Verified end-to-end: `ng build` green (591.85 kB initial, same pre-existing
warning), `dist/browser/assets/**` output unchanged, served the built app locally
and confirmed both a font and a sprite resolve with HTTP 200 at `/assets/...`.
1769/1769 tests + ESLint clean.

`src/configuration` was analyzed for the same move but **deferred**: it's
consumed both by `@lib/pokemon-by-regulation.ts` (base layer, forbidden from
importing `@app/*` by the new boundary) and by webapp components — moving it into
`app` would invert the hierarchy. Needs a dedicated decision (fold into `@lib` vs.
split), not done in this pass.

### Infra / port candidates (pending — not touched yet)

Consolidated list of things that are conceptually **infrastructure or a driven
port**, currently living elsewhere, whose relocation is deferred (each is a
design change, not a mechanical move):

- **`user-data` (export-poke, pdf-export, poke-paste-parser, resolver) → port.**
  Persistence/serialization to the outside world — the textbook driven adapter.
  Currently in `@store/user-data`. Should become a **port (interface)**
  implemented in the webapp.
- **`configuration` → deferred.** Consumed by both the base layer
  (`pokemon-by-regulation.ts`) and webapp components; naive move inverts the
  hierarchy. Needs a dedicated decision (fold into base vs. split).
- **`feature-flags` → borderline (config), final home TBD.** Config, not
  browser/UI; stayed in the base layer for now.
- **`model` / `utils` → shared base, final home TBD.** Base layer below the
  domain; where exactly they land is still open.

Note: the NgRx signal **stores** (`CalculatorStore`, `MenuStore`, `FieldStore`,
`SpeedCalcOptionsStore`) are **not** in this list — they hold *application/session
state* (what the user selected, active tab, mode), not persisted domain data, so
they correctly belong to the webapp/app layer, not infra.

## Rollout status snapshot

| Feature | Status | Notes |
|---|---|---|
| probability-calc | ✅ moved (Step 1+2) | pipe extracted |
| type-coverage | ✅ moved (Step 1) | CSS-impurities noted for later |
| speed-calculator | ✅ moved | store inversion (read) |
| ev-optimizer | ✅ moved | spec test-helper; temp dep on @lib/damage-calculator |
| smogon | ⛔ not moving | base infra of model; would invert hierarchy |
| damage-calculator | ✅ moved | mutation + MenuStore + targets + useSpsMode all inverted; dir moved to @multicalc; closed ev-optimizer temp debt |
| browser/UI services (theme, sprite, device-detector, …) | ✅ moved | `@lib` → `@core/services` |
| store + automatic-field + user-data | ✅ moved | `src/store` → `@store` (alias kept, path only); automatic-field + user-data joined it |
| @lib base layer | ✅ sealed | removed dead `TeamMember.damageResult` (only `@lib→@multicalc` import); ESLint boundary added forbidding upward imports |
| model / utils | — base | shared base below multicalc; final home TBD |

## Context

ADR 0001 vendored the calc engine into `src/lib/calc` behind a public boundary
(`@calc`, enforced by ESLint). That internalization was the prerequisite for
this step: reorganizing the project toward a **hexagonal architecture** — not
100% by the book, but in that direction — with three scopes and a single,
unidirectional dependency flow.

```
webapp  ──►  multicalc  ──►  calc
(UI)         (domain)        (pure calculation)
```

- **calc** — the calculation itself. Already isolated (`src/lib/calc`, `@calc`).
- **multicalc** — the domain app (teams, opponents, speed calc, probability, …).
  All logic, modularized per feature. **Not** tied to the UI.
- **webapp** — the Angular UI (components, CSS, templates). **No** domain logic;
  it only orchestrates the domain.

Today `src/lib` is the bag to untangle: it mixes calc (isolated), domain
(`probability-calc`, `speed-calculator`, `ev-optimizer`, `smogon`, `model`, …)
and pure browser/UI services (`device-detector`, `theme`, `pwa-install`,
`sprite`, `snackbar`). `src/store` is all app/UI state.

## Decision

Adopt three scopes with a hard dependency direction `webapp → multicalc → calc`,
enforced the same way `@calc` already is.

1. **Physical boundary via folders + ESLint** (no Nx/monorepo for now).
   Incremental refactor.
2. **Angular in the domain**: multicalc *may* use `@Injectable`/`inject()` (DI is
   convenient and already used) but *never* Component/template/CSS.
3. **Store & user-data**: the NgRx Signal Store is a **webapp** detail. The
   domain receives data as arguments (Pokemon/Move/Field). `user-data`
   (persistence) becomes a **port** (interface) implemented in the webapp.

### Pilot: `probability-calc` (baby-steps)

Chosen because its logic is already well separated and the data flow is already
unidirectional: the 4 domain services (`percentage-format`,
`combined-probability`, `move-probability`, `consistency-score`) receive
`Pokemon/Move/Field/Team` as arguments and **inject no store**. Components read
`CalculatorStore`/`FieldStore` and pass the data down. Internal graph:
`PercentageFormat ← Combined, Move`; `Move ← Consistency`.

The only presentation impurity in the domain is `PercentageFormatService`
(returns `string`), consumed only by `combined` and `move` — which is why those
expose strings. `consistency-score` is already number-pure.

**Step 1 — Move services + ESLint boundary (signatures unchanged).**
Smallest verifiable diff; validates the boundary mechanics first.

1. Create `src/multicalc/probability-calc/` and move the 4 services (+ specs).
   Keep `@Injectable` and current signatures (formatting still returns `string`
   for now).
2. `tsconfig.json`: add `@multicalc/*` → `./src/multicalc/*` (mirrors `@lib/*`;
   a `@calc`-style barrel is a later goal, not part of the pilot).
3. Components: switch imports `@lib/probability-calc/<svc>` →
   `@multicalc/probability-calc/<svc>`. No other component change.
4. `eslint.config.js`: replicate the `files: ["src/lib/calc/**"]` block for
   `files: ["src/multicalc/**"]`, forbidding imports from `@app/*`, `@store/*`,
   `@pages/*`, `@features/*`, `@core/*` and from Angular *components*
   (`@angular/core` DI stays allowed). `@lib/model` stays reachable — shared domain.

*Acceptance:* `npm run test` green; ESLint flags a multicalc→webapp/store import;
app behaves identically.

**Step 2 — Remove the formatting impurity (domain → number).**
After step 1 is green.

1. `MoveProbabilityService` and `CombinedProbabilityService` return `number`
   (interfaces `SingleTargetProbabilities` etc. become `number`).
2. `PercentageFormatService` leaves multicalc and moves to the webapp.
3. Consumer components format at the edge (call the format service when displaying).
4. Update the services' specs (assert numbers).

*Acceptance:* tests green; no service under `src/multicalc/**` imports formatting;
UI shows the same text as before.

### Architecture goal (beyond the pilot — not executed now)

- `@multicalc` barrel (public index like `@calc`) per feature, ESLint blocking subpaths.
- Migrate the remaining domain features out of `src/lib`: `speed-calculator`,
  `ev-optimizer`, `smogon`, `damage-calculator`, `type-coverage`, `user-data`
  (as a **port**). `model` becomes the multicalc base.
- Browser/UI services (`device-detector`, `theme`, `pwa-install`, `sprite`,
  `snackbar`, `network-status`, …) and `src/store/*` → **webapp** scope.
- Rename/consolidate `src/lib` as the scopes mature.

## Consequences

**Good.** Enforced, unidirectional dependencies (`webapp → multicalc → calc`).
Domain becomes testable without TestBed/UI. The pilot is mostly a change of
address + a boundary rule, not a rewrite, because the data flow is already clean.

**Cost / watch-outs.**

- Known small leaks stay in components for now (out of pilot scope):
  `Math.floor(...*100)` (`pokemon-probability.component.ts:35`), `Math.round`,
  the `0..100` clamp duplicated in `combined-probability.component.ts:72`, and the
  `!isDefault` rule duplicated in `team-probability.component.ts:60` (already in
  `consistency-score.service.ts:44`).
- Two-step sequence is intentional: changing return types string→number forces
  touching components, so it must come *after* the pure move.

## Verification

- `npm run test` (never vitest/jest directly; never Cypress) after each step with
  logic changes.
- `npx prettier --write` on touched files only.
- Run ESLint to confirm the new boundary rule fires when violated.
- Run the app, open probability-calc (desktop + mobile) — same numbers/text.
