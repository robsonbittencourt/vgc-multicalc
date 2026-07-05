# 0003 — Dissolve `@lib`: move the base layer into `@multicalc` / `@calc`, kill the `smogon` name

Date: 2026-07-04 · Branch: `remove-sv` · Status: **Executed**

## Context

ADR 0002 moved every **domain feature** (probability-calc, type-coverage,
speed-calculator, ev-optimizer, damage-calculator) out of `src/lib` into
`@multicalc`, and every **browser/UI** artifact into the webapp (`@core`,
`@store`). It then *sealed* what was left of `@lib` as a "shared base layer" and
left its final home as an **open question** ("model / utils — base; final home
TBD").

This ADR closes that open question. The user's intent:

- **app** — pure view layer. Some rules may still live in components for now
  (deferred, per ADR 0002's later-cleanup phase).
- **multicalc** — *the app itself*, UI-free. Receives input, computes, returns.
  It owns its own domain model. Would back a future Android app, etc.
- **calc** — a separate, dependency-free domain. **Never** to be fused with the
  domain model (perf regression proven — see below). `calc` **may** depend on
  `@data` (see next point).
- **`@data` is infrastructure** — treat it as our "DB"/persistence-of-static-data
  layer. `calc` importing `@data` is a **legitimate downward dependency**, not a
  leak to fix.
- **`@lib` should not exist.** Dissolve it into the other scopes.

Target hierarchy (unchanged in spirit from ADR 0002, now with no `@lib`):

```
webapp  ──►  multicalc  ──►  calc  ──►  data
(UI)         (domain)        (engine)    (infra / "DB")
```

## ⚠️ Correction to ADR 0002 — the `smogon` block was based on a misread

ADR 0002 (section "⚠️ CRITICAL — smogon must NOT move") forbade moving `smogon`
to `@multicalc`, claiming the chain `calc → model/pokemon → smogon` — i.e. the
lowest scope (`calc`) depending on the middle scope (`model`), which would invert
the hierarchy.

**That chain does not exist.** There are two different `Pokemon` classes and the
ADR conflated them:

- `src/lib/calc/model/pokemon.ts` — the **engine's internal** `Pokemon`. This is
  the one every `@lib/calc/**` file imports (`result.ts`, `calculate.ts`,
  `stats.ts`, …). It depends on nothing outside `calc`.
- `src/lib/model/pokemon.ts` — the **domain** `Pokemon`. *It* imports
  `@lib/smogon/*` and `@calc`, and wraps a `SmogonPokemon` (`= @calc`'s Pokemon)
  internally.

Verified imports:

- `grep "@lib/model" src/lib/calc/**` → **nothing** (calc never imports the
  domain model).
- `src/lib/calc/**` imports `@lib/calc/model/pokemon` (engine-internal), a
  different file.
- `src/lib/model/pokemon.ts` imports `@lib/smogon/commom`,
  `@lib/smogon/smogon-pokemon-builder`, and `@calc` — all **downward**.

Real dependency direction:

```
@lib/model/pokemon (domain)  ──►  @lib/smogon  ──►  @calc  ──►  @lib/calc/model/pokemon (engine-internal)
```

No inversion. Moving `smogon` + `model` **up** into `@multicalc` is sound: they
sit *above* `calc`, not below it. **The ADR 0002 prohibition is retracted.**

## Non-negotiable constraint — do NOT unify the two `Pokemon`

Fusing the domain `Pokemon` with the calc `Pokemon` was already tried and
**reverted**: it caused a **+45–58% perf regression** (see memory
`project-unify-pokemon-model` and the perf benchmark ADR 0001). This ADR moves
files and renames symbols only. **The `calc` engine and its internal `Pokemon`
are not touched.** The domain `Pokemon` keeps wrapping a `CalcPokemon` exactly as
today.

## Current state (measured 2026-07-04)

What remains in `src/lib`:

| Sub-tree | Real role | Depends on |
|---|---|---|
| `lib/calc/**` | **the engine** (pure, exposed via `@calc`) | itself + `@data` + `@vgc-types` |
| `lib/model/**` (Pokemon, Move, Moveset, Team, Ability, Status, Field, Target, TeamMember) | **domain model** — consumed by `@multicalc` (45× pokemon, 36× field, 30× move…) | `@lib/smogon`, `@calc`, `@data` |
| `lib/smogon/commom.ts` + `lib/smogon/stat-calculator/**` | **stat math** (`chainMods`, `pokeRound`, `getModifiedStat`, paradox/QP, `getFinalSpeed`/`getFinalAttack`/…) | `@lib/model/*` (60× pokemon, 47× field, 27× move), `@calc`, `@data` |
| `lib/smogon/smogon-pokemon-builder.ts`, `lib/field-mapper.ts`, `lib/pokemon-by-regulation.ts` | **adapters** domain ↔ calc | `@lib/model`, `@calc`, `@configuration` |
| `lib/constants.ts`, `lib/types.ts`, `lib/default-pokemon.ts`, `lib/utils/**`, `lib/test-utils.ts` | generic leaves | little/nothing |

Enforced boundaries already in place (`eslint.config.js`): `@lib/calc/*`
internals are private (use `@calc`); `multicalc` can't import webapp; `@lib`
can't import `@multicalc`/webapp.

The word **"smogon" is vestigial**: 778 occurrences, and **every one refers to
`@calc`**, not the external `@smogon/calc` package (that engine was already
vendored into `src/lib/calc` by ADR 0001). Breakdown:

- `SmogonPokemon` / `as SmogonPokemon` (~187) — alias of `@calc`'s `Pokemon`.
- `smogonPokemon` field/var (~117) — an instance of `@calc`'s Pokemon held inside
  the domain model.
- `smogonField` / `smogonSide` / `smogonTarget` / `smogonAttacker` (~144) —
  `@calc` `Field`/`Side` objects.
- `SmogonField` / `SmogonTerrain` / `SmogonWeather` (~7) — `@calc` types.
- the `lib/smogon/` directory + `smogon-pokemon-builder.ts` + `commom.ts` (note:
  misspelled "commom").
- **0** occurrences in comments; **0** references to `smogon.com` / `@smogon`.

## Decisions (settled with the user)

1. **Scope of this round:** dissolve `@lib` entirely (big-bang, one restructure —
   not sliced into multiple commits).
2. **`calc` → `src/calc`.** It leaves `lib`; it is its own top scope. Its
   `@data/move-data` import (in `calc/model/move.ts`) **stays** — `@data` is infra
   the engine may consume.
3. **`lib/model/**` → `@multicalc`** (the domain model of multicalc).
4. **Stat math** (`commom.ts` + `stat-calculator/**`) → a stats module in
   **`@multicalc`** (e.g. `@multicalc/stats`), living next to `speed-calculator`,
   its biggest consumer. Rationale confirmed by deps: this code imports
   `@lib/model/*` heavily (domain), so it *must* sit at the domain level — it
   could **not** go into pure `calc` even if we wanted to.
5. **Adapters** (`smogon-pokemon-builder`, `field-mapper`, `pokemon-by-regulation`)
   → `@multicalc` as the calc anti-corruption layer, under neutral names.
6. **Kill the `smogon` name.** `Smogon*` symbols → `Calc*`
   (`SmogonPokemon`→`CalcPokemon`, `smogonField`→`calcField`,
   `smogonPokemon`→`calcPokemon`, `SmogonField`→`CalcField`, …). Directory/files
   lose "smogon": `smogon-pokemon-builder.ts` → `calc-pokemon-builder.ts` (or
   `pokemon-adapter.ts`); `commom.ts` → `stat-utils.ts` (also fixes the typo).
7. **Delete `@lib`** from `tsconfig.json` paths and from `eslint.config.js`; add
   boundaries for `src/calc/**` (pure: only `@data`/`@vgc-types`/self) and keep
   the `@multicalc` boundary (now also the home of model/stats/adapters).
8. **Execution:** write this plan and **stop**. No code changes until the user
   gives an explicit go.

## Target layout

```
src/
  calc/                      (was src/lib/calc)   — alias @calc, pure engine (+ @data)
  multicalc/
    model/                   (was src/lib/model)  — domain Pokemon/Move/Team/…
    stats/                   (was src/lib/smogon/commom + stat-calculator/**)
    adapters/                (was smogon-pokemon-builder, field-mapper, pokemon-by-regulation)
    damage-calculator/       (already here)
    ev-optimizer/            (already here)
    probability-calc/        (already here)
    speed-calculator/        (already here)
    type-coverage/           (already here)
  app/                       — webapp (unchanged this round; only import re-points)
  data/                      — infra ("DB")
```

Final enforced hierarchy: `app → multicalc → calc → data`.

## Migration plan (big-bang, but ordered internally so it's reviewable)

Everything below is **one restructuring change**. The ordering is how to *do* it
safely, not separate commits.

### A. Move `calc` out of `lib`

1. `git mv src/lib/calc src/calc` (physical move; keep engine internals intact).
2. Rewrite internal imports `@lib/calc/*` → `@calc/*` **only where already using
   the alias**; the engine's own `index.ts` uses relative `./…` and is unaffected.
   The many `@lib/calc/...` self-imports (guards, calculate, stats, …) become
   `@calc/...` — add a `@calc/*` path (in addition to the existing `@calc` barrel)
   or convert them to relative. **Decide:** keep the barrel-only public API
   (`@calc`) and make internals relative, OR add `@calc/*`. Recommend: internals
   relative, public stays `@calc` (matches "internals are private").
3. `tsconfig.json`: `@calc` → `./src/calc/index.ts` (path change only).
4. `eslint.config.js`: the `files: ["src/lib/calc/**"]` block becomes
   `files: ["src/calc/**"]`; keep "no `../*`, no reaching outside". Add: calc may
   import only `@data/*`, `@vgc-types/*`, and itself.

### B. Move the domain model → `@multicalc/model`

5. `git mv src/lib/model src/multicalc/model`.
6. Re-point every `@lib/model/*` importer → `@multicalc/model/*`
   (≈45+36+30+14+9+7+4 refs across `@multicalc` and `@app`).

### C. Move stat math → `@multicalc/stats`

7. `git mv src/lib/smogon/commom.ts src/multicalc/stats/stat-utils.ts` and
   `git mv src/lib/smogon/stat-calculator src/multicalc/stats/stat-calculator`.
8. Re-point importers: the 9 `@app/**` files importing
   `@lib/smogon/stat-calculator/...` (`getFinalSpeed`, `getFinalAttack`,
   `getFinalDefense`, …) and the `@multicalc/speed-calculator` files →
   `@multicalc/stats/...`.

### D. Move adapters → `@multicalc/adapters`

9. `git mv src/lib/smogon/smogon-pokemon-builder.ts
   src/multicalc/adapters/calc-pokemon-builder.ts`,
   `git mv src/lib/field-mapper.ts src/multicalc/adapters/field-mapper.ts`,
   `git mv src/lib/pokemon-by-regulation.ts
   src/multicalc/adapters/pokemon-by-regulation.ts` (+ their specs).
10. Note: the domain `model/pokemon.ts` imports the builder (`fromScratch`) and
    `commom` (`higherStat`); after B+C+D these become `@multicalc → @multicalc`.

### E. Dissolve the leaves

11. `constants.ts`, `types.ts`, `default-pokemon.ts`, `utils/**`, `test-utils.ts`:
    move to `@multicalc` where domain-only; anything genuinely shared by webapp
    *and* domain that shouldn't live in the domain becomes a thin `@multicalc`
    export or is inlined. (Most are domain-only — `PokemonParameters`, `Stats`,
    default pokemon, uuid, ev-sp-converter.)

### F. Rename the `smogon` vocabulary → `calc`

12. Symbol renames (mechanical, type-checked): `SmogonPokemon`→`CalcPokemon`
    (187), `smogonPokemon`→`calcPokemon` (117), `smogonField`→`calcField`,
    `smogonSide`→`calcSide`, `smogonTarget`→`calcTarget`,
    `smogonAttacker`→`calcAttacker` (144), `SmogonField`/`SmogonTerrain`/
    `SmogonWeather`→`Calc*` (7). Some files already use `as CalcPokemon` — this
    makes it uniform.
13. Do this **as part of the moves** so churn happens once. After F, `grep -ri
    smogon src` should return **0**.

### G. Seal the boundaries

14. `tsconfig.json`: delete `@lib/*`. (`@calc`, `@multicalc/*`, `@data/*`,
    `@vgc-types/*`, `@app/*` & friends remain.)
15. `eslint.config.js`: delete the `files: ["src/lib/**"]` block. Keep the
    `@multicalc` boundary (already forbids webapp imports). Add/confirm the
    `src/calc/**` boundary (only `@data`/`@vgc-types`/self). Add a probe to prove
    each boundary fires, then remove the probe.

### H. Update out-of-`src` references

16. `history/performance/run.mjs`, `tsconfig.spec.json`, and any scripts/skills
    that reference `src/lib/...` paths or `@lib` — repoint. (`run.mjs` referenced
    `src/store` in ADR 0002; check it for `@lib` too.)

## Verification (per project rules — `feedback-run-tests`, `perf`)

- `npx tsc --noEmit` clean (catches every missed import rename).
- `npm run test` — full suite green (1769+), **no assertions changed** (this is a
  move/rename; `feedback-never-game-tests` applies).
- ESLint clean; probe confirms `app→calc-internal`, `calc→multicalc`,
  `multicalc→app` are all flagged.
- `ng build` — bundle **not inflated** (watch the `main.ts`/`@data` static-import
  trap called out in ADR 0002; nothing here should pull `@data` into the initial
  chunk).
- **Perf benchmark** (ADR 0001 / `project-calc-perf-benchmark`): run
  `history/performance/run.mjs` — the domain/calc split is unchanged, so the calc
  benchmark must stay flat. Any regression = a `Pokemon` was accidentally fused;
  stop and revert (`project-unify-pokemon-model`).
- Run the app (desktop + mobile), smoke-test a damage calc and a speed calc.

## Consequences

**Good.** `@lib` gone; three honest scopes `app → multicalc → calc → data`, each
ESLint-enforced. The misleading "smogon" vocabulary is gone — names say `calc`.
The adapter/anti-corruption layer is explicit (`@multicalc/adapters`). `calc`
stays pure over `@data`.

**Cost / watch-outs.**

- Big-bang means a large diff; `tsc --noEmit` + the full suite are the safety net.
  Every move is `git mv` + import rewrite — mechanical and reversible.
- **Do not touch the engine's internal `Pokemon` or fuse models** — the only real
  risk here is a perf regression, and it only appears if someone "simplifies" the
  two Pokemon into one. This ADR explicitly forbids that.
- `@configuration` coupling, flagged as an open question in ADR 0002 — **resolved
  during execution, turned out to be moot.** By the time `pokemon-by-regulation.ts`
  was moved (step D), it only imported `@data/moveset-data` and
  `@data/top-usage-regulation` — its `@configuration` dependency from ADR 0002's
  snapshot no longer existed (removed at some point between the two ADRs). Grepped
  and confirmed: **zero** files under `src/multicalc/**` or `src/calc/**` import
  `@configuration`; all 16 consumers are exclusively under `src/app/**`, where it
  physically already lives (`src/app/core/configuration/`).

## Execution log (2026-07-04)

Executed as a single big-bang restructure, in the order A→H above. `src/lib` no
longer exists.

- **A — calc moved.** `src/lib/calc` → `src/calc`. Internal `@lib/calc/*` imports
  became `@calc/*` (added `@calc/*` path alongside the existing `@calc` barrel
  path). `tsconfig.json`, `tsconfig.spec.json`, and the ESLint `src/lib/calc/**`
  boundary block re-pointed to `src/calc/**`. 294 calc tests green in isolation.
- **B — domain model moved.** `src/lib/model` → `src/multicalc/model`. ~181 files
  re-pointed `@lib/model/*` → `@multicalc/model/*`. 870 multicalc tests green.
- **C — stat math moved.** `src/lib/smogon/commom.ts` →
  `src/multicalc/stats/stat-utils.ts` (typo fixed); `stat-calculator/` →
  `src/multicalc/stats/stat-calculator/`. Confirmed by dependency count during
  execution: this code imports `@lib/model/*` **60/47/27 times** (pokemon/field/
  move) — it could not have lived in pure `calc` even as an alternative; the
  `@multicalc/stats` placement was the only option consistent with the "don't
  fuse domain into calc" constraint.
- **D — adapters moved, done together with C.** Moving `commom.ts` immediately
  surfaced the boundary firing on `smogon-pokemon-builder.ts` (still physically
  in `@lib`, now importing `@multicalc/stats`) — proof the ESLint rule works, and
  a signal to not leave it half-migrated. Moved together:
  `smogon-pokemon-builder.ts` → `calc-pokemon-builder.ts`,
  `pokemon-name-normalizer.ts`, `field-mapper.ts`, `pokemon-by-regulation.ts`,
  all → `src/multicalc/adapters/`.
- **E — leaves dissolved.** `constants.ts`, `types.ts`, `default-pokemon.ts`,
  `test-utils.ts`, `utils/{uuid,ev-sp-converter}.ts` all turned out to be
  consumed by **both** `app` and `multicalc` (verified by grep before moving) —
  not domain-exclusive as ADR 0002 assumed. Moved to `src/multicalc/` root
  (webapp keeps importing them via `@multicalc/*`, which is an allowed direction).
  `src/lib` became empty and was removed. **`tsc --noEmit` clean at this point**
  — confirms no missed import.
- **F — `Smogon*` → `Calc*` rename.** Done in two passes: a targeted pattern pass
  for the known forms, then a catch-all substring pass (`Smogon`→`Calc`,
  `smogon`→`calc`) on the handful of files with less common forms
  (`fieldSmogon`, `moveSmogon`, `toSmogon`, `isSmogonParadoxAbility`,
  `SmogonPokemonBuilder`, …) that the first pass missed. Verified safe because
  "smogon" had **zero** occurrences in comments or URLs (checked in the analysis
  phase) — every occurrence was a code symbol referring to `@calc`. Confirmed
  post-rename: `grep -rli smogon src` → empty; `tsc --noEmit` clean (no
  identifier collisions from the bulk rename); full suite still 1769/1769 with
  **no assertions touched**.
- **G — boundaries sealed.** Removed `@lib/*` from `tsconfig.json` and the
  `src/lib/**` ESLint block entirely. Added an explicit `src/calc/**` boundary
  (previously only enforced `../*`) forbidding `@app/*`/`@multicalc/*`/webapp —
  matching the "calc may only depend on `@data` and itself" rule. Verified live
  with a throwaway probe file importing `@multicalc` from `src/calc/`: correctly
  flagged, then removed.
- **H — external references updated.** `history/performance/run.mjs` (the perf
  benchmark's own esbuild alias map, independent of tsconfig) had hardcoded
  `@calc: src/lib/calc/index.ts` and `@lib/: src/lib/`, plus a matching regex
  filter — updated to `src/calc/index.ts` and `@multicalc/`.
  `tools/smogon-data-parser/src/top-usage.js` (a **separate, legitimate** tool
  that scrapes real usage stats from smogon.com — not code referring to `@calc`)
  had one stale `@lib/types` in a generated-file template string — updated to
  `@multicalc/types`. `.agent/rules/general.md` and `.agent/rules/code-styles.md`
  (project rules read every session) still documented `@lib/*` as the path
  alias and `src/lib/` as where domain logic lives — updated to describe
  `@multicalc/*` / `@calc` instead, since those rules would otherwise mis-guide
  every future session.

### Final verification (all green)

- `npx tsc --noEmit` — clean.
- `npx eslint src` — clean (one **pre-existing, unrelated** error on
  `src/main.ts:18` — `provideUseSpsMode` unused —, confirmed present before this
  change via `git stash`; left untouched, out of scope).
- `npm run test` (via `ng test --watch=false`) — **1769/1769 green**, matching
  the exact count from ADR 0002's last checkpoint. No assertions changed
  anywhere in this ADR's execution.
- `ng build` — green, initial bundle **591.85 kB**, byte-identical to the
  pre-existing budget-warning baseline. No inflation.
- **Perf benchmark** (`node --expose-gc history/performance/run.mjs`, comparing
  against the 2026-07-03 baseline): first run showed `single ns/call +28.6%`
  with a background YouTube tab consuming CPU — re-run on an idle machine showed
  `single ns/call -8.4%`, `multi ns/call -37.3%`, `heap Δ` flat (3.84 vs 3.81 MB).
  **No regression** — the first reading was measurement noise, not a code
  effect, consistent with the fact that `src/calc`'s logic was not touched
  (only moved + import-path rewritten, which esbuild resolves to identical
  output). This directly validates the ADR's non-negotiable constraint: the two
  `Pokemon` classes were never fused.

### Deviations from the written plan

- Steps C and D were interleaved (not strictly sequential) because moving `C`
  first made `D`'s remaining `@lib` file fail the boundary immediately — doing
  them together avoided a mid-migration ESLint-red state.
- Step E (leaves) was pulled forward and finished in the same pass as B–D,
  rather than as a distinct later step, once it became clear (via dependency
  grep) that leaving `constants`/`types`/etc. in `@lib` while `model` moved out
  would immediately invert the boundary (`@lib → @multicalc`). The plan's
  ordering was directionally right but underestimated how tightly coupled the
  leaves already were to `model`.
- `.agent/rules/*.md` updates were not in the original plan (only "history/
  performance/run.mjs, tsconfig.spec.json, and scripts" were called out) — added
  after grepping the whole repo (excluding `node_modules`/`.git`) for `@lib`/
  `src/lib` and finding the project rule files were the only other hits besides
  this ADR itself.

### Follow-up (2026-07-04, same day) — closed the dormant `@configuration` boundary gap

`@configuration` (`src/app/core/configuration/*`) is a **separate tsconfig alias**
pointing at the same physical folder as part of `@core`, but the ESLint
boundaries for `src/multicalc/**` and `src/calc/**` only blocked `@core/*` —
`@configuration/*` didn't match that glob and was **not actually blocked**,
confirmed with a throwaway probe file (`import ... from "@configuration/feature-flags"`
inside `src/multicalc/` passed lint with no error before the fix). No file
currently imports it from there, so this was latent, not an active violation.

Contents: `feature-flags.ts` (reads `localStorage` — webapp by nature) and
`available-items.ts` (static per-format item list + a flag check). Decided to
leave the two files as-is (no split) since neither is consumed outside `app`.
Fixed by adding `@configuration/*` to the blocked-group list in both the
`src/calc/**` and `src/multicalc/**` ESLint blocks (`eslint.config.js`), next to
`@core/*`. Verified with the same probe (now correctly flagged in both scopes),
then full suite: `tsc --noEmit` clean, ESLint clean (same pre-existing
`main.ts` unused-var error, unrelated), 1769/1769 tests green.

### Follow-up (2026-07-04, same day) — `src/types/calc-types.ts` moved out of the src root

`src/types/calc-types.ts` (`@vgc-types/*` alias) was a lone top-level file
sitting directly under `src/`, outside every scope this ADR just organized.
Checked its consumers: **23 files in `@calc`** and **3 files in `@data`**
(`move-data.ts`, `moveset-data.ts`, `pokemon-data.ts`) — nothing in `app` or
`multicalc` touches it.

Because `@data` (the lowest layer / "DB") itself depends on these types, moving
the file *into* `src/calc` would create `data → calc`, inverting the one
legitimate direction (`calc → data`). So it isn't calc-only vocabulary — it's
the layer **below both**. Moved to `src/data/types.ts` (renamed from
`calc-types.ts`, dropping the now-inaccurate name and the redundant nested
`@data/types/calc-types` path this created before a second cleanup pass fixed
it to `@data/types`). The `@vgc-types/*` alias was deleted from `tsconfig.json`
and from `history/performance/run.mjs`'s own esbuild alias map (which mirrors
tsconfig independently); all 26 importers repointed `@vgc-types/*` →
`@data/types`. `src/types/` no longer exists — nothing sits directly under
`src/` outside a named scope anymore.

Verified: `tsc --noEmit` clean, ESLint clean (same pre-existing `main.ts`
error, unrelated), 1769/1769 tests green, `ng build` unchanged at 591.85 kB
initial (no bundle inflation).

### Follow-up (2026-07-04, same day) — moved the 9 loose Angular-CLI root files into `src/app`

`index.html`, `main.ts`, `main.server.ts`, `styles.scss`, `themes.css`,
`variables.scss`, `manifest.json`, `robots.txt`, `sitemap.xml` sat directly
under `src/`, outside every named scope. Checked consumers: all nine are
**webapp-only** (bootstrap, global styles, PWA/SEO metadata) — none touched by
`calc`, `data`, or `multicalc`. Moved all nine to `src/app/`, following the same
pattern ADR 0002 used for `src/assets` → `src/app/assets`.

Required config changes (all build-only, no runtime/URL contract changes):

- `angular.json`: `index`, `browser`, `server`, `styles` repointed to
  `src/app/...`; `stylePreprocessorOptions.includePaths` changed from `["src"]`
  to `["src/app"]`.
- `tsconfig.app.json`: `files` repointed to `src/app/main.ts` /
  `src/app/main.server.ts`.
- **`assets` had to change shape, not just path.** The original entries for
  `manifest.json`/`robots.txt`/`sitemap.xml` were plain strings
  (`"src/manifest.json"`). Angular's asset copier preserves the path *relative
  to `sourceRoot`* for plain-string entries — simply changing the string to
  `"src/app/manifest.json"` made the build emit `dist/browser/app/manifest.json`
  instead of `dist/browser/manifest.json` (caught by inspecting `dist/browser/`
  after the first attempt: found a spurious `dist/browser/app/` directory).
  Fixed by switching all three to the object form already used for the
  `assets/` folder, with an explicit `output: "."`:
  `{ "glob": "manifest.json", "input": "src/app", "output": "." }` (same for
  `robots.txt`, `sitemap.xml`).
- **`styles.scss`'s font `url("app/assets/fonts/...")` broke and was fixed.**
  Those URLs were written relative to the old `includePaths: ["src"]` base
  (`app/assets/fonts/...` resolved from `src/`). With the base now `src/app`,
  the same string would have needed `assets/fonts/...` — esbuild caught this
  immediately as unresolvable (`Could not resolve "app/assets/fonts/..."`) since
  it now doubled the `app/` segment. Fixed by dropping the leading `app/` from
  the five font URLs in `src/app/styles.scss`. (`how-to-use.component.scss`'s
  font URLs use a true relative path — `../../assets/fonts/...` — unaffected by
  `includePaths` and needed no change.)

**No production-facing risk**, verified concretely rather than assumed: this
only changes *where the Angular CLI reads source files from*, not the *output*
that ships to browsers. Confirmed byte-for-byte equivalent `dist/browser/`
structure after the fix — `manifest.json`/`robots.txt`/`sitemap.xml` at the dist
root (not nested), `index.html`'s `<link href="/manifest.json" rel="manifest">`
unchanged, `ngsw.json`'s (service worker) precache list still references
`/manifest.json` and `/assets/**` (public URLs, never `src/` paths — confirmed
`ngsw-config.json` only ever lists URL patterns, not source paths), bundle size
identical (591.85 kB initial), "Prerendered 19 static routes" unchanged. A
service worker on a client's machine only compares *served URL* content hashes
between deploys — since no served URL changed, an existing SW installation
updates exactly as it would for any normal deploy.

Verified: `tsc --noEmit` clean, ESLint clean (same pre-existing `main.ts`
error — now at `src/app/main.ts`, still unrelated), 1769/1769 tests green,
clean `ng build` green with the corrected `dist/browser/` structure confirmed
by direct inspection.

## Status

**Done.** `src/lib` no longer exists, and neither does any other loose top-level
file under `src/` — `src/types/` folded into `src/data/types.ts`, and the 9
Angular-CLI entry/config files (`index.html`, `main.ts`, `main.server.ts`,
`styles.scss`, `themes.css`, `variables.scss`, `manifest.json`, `robots.txt`,
`sitemap.xml`) moved into `src/app/`. `src/` now contains exactly four named
scopes (`app`, `multicalc`, `calc`, `data`) and nothing else. Hierarchy is
`app → multicalc → calc → data`, enforced by ESLint on all three internal edges,
including the `@configuration` gap closed above. No "smogon" left in the
codebase (0 occurrences). All verification green.
