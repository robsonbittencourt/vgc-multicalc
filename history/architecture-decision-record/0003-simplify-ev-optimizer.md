# 0003 — Simplify the defensive EV optimizer (code size + processing)

Status: Proposed · Builds on the finder/cache rework (commits e56eba09..2c9cd48d) documented in `DEFENSIVE_EV_OPTIMIZER.md`.

## Context

`src/domain/multicalc/ev-optimizer` holds ~1.760 production lines across 12 files. The flow is finder-first: `OptimalSpreadFinder` resolves the vast majority of cases; the legacy chain (`SingleAttackerOptimizer` / `DoubleAttackerOptimizer` / `SolutionCombiner` / `RefinementStage`) only runs on genuine 508-EV budget conflicts. The heavy reference case runs in ~20ms against a 200ms budget, so performance is not a crisis — the goals here are less code, less allocation churn, and one real CPU lever, **without any output change**.

Prior verdicts that constrain this work (all documented in earlier sessions):

- `SolutionCombiner` and `RefinementStage` are **degradation policy**, not cost workarounds. Rewriting them as sweeps changes outputs. Agreed rule: no further reduction there without an explicit owner decision accepting different results.
- The `if (survives)` branch of `refineForDoubleAttackers` **is reachable** via HP-non-monotonic defenders (Sitrus Berry — Umbreon + 2× Weavile + Rotom-Heat scenario). Not dead code.
- The 2026-07-16 exhaustive sweep confirmed most downstream loops (`tryOptimizeForSecondStrongest`, `tryAddDoubleSolution`, `tryCombineSingleWithDouble` inner scans, `selectBestScenario` return-current, finder `polish` improvement body) are defensive/unreachable through the public API — but they were explicitly deferred to a future round gated on an owner decision, and `solution-combiner.spec.ts` exercises them directly.
- Known quality bug parked in this region: the combiner abandons double targets that still have a legal spread when Sitrus breaks binary-search monotonicity. A future rescue fix would reuse exactly these paths — another reason not to delete them casually.
- Cache invariants that must never break: cache only `damage` + `rawDesc` (never the whole `Result`); HP joins the double-cache key only for Berry holders; `clear()` at the start of every `optimize()`.

### Findings from the current code

1. **Hot path clones a full `Pokemon` per survival probe.** `SurvivalChecker.checkSurvivalWithEvs` / `checkSurvivalAgainstTwoAttackersWithEvs` do `defender.clone({ evs })` on every call. The finder calls them inside per-HP binary searches, the double escalation loop, and `polish` — worst case ≈ 33 HP × 33 Def × ~7 SpD probes ≈ 7.000+ clones per `optimize()`. Each clone runs `fromScratch` (species lookup + stat calc), `uuid()`, `MoveSet.clone()` (4 moves) and `higherStat`. The fallback chain already uses the cheap pattern (one `tempDefender` + `setEvs`). This is the main remaining CPU lever.
2. **`EvIntervalsCalc.getEvIntervals()` rebuilds the 33-value array on every call**, and it is called in every finder/combiner/optimizer method. It is a pure constant.
3. **`EvOptimizerUtils` rebuilds and sorts the combination grids on every call**: two-stat ≈ 1.089 objects, three-stat ≈ 20.000 objects + sort — on each fallback invocation. Both are pure functions of the fixed interval list.
4. **Four near-identical binary searches** over the same interval grid: `findMinStatIndexForSingles` and `findMinSpdIndexForDouble` (finder), `findMinStatIndex` and `findMinStatIndexForDouble` (combiner). ~140 lines that reduce to one helper + four small predicates.
5. **Dead assignments** in `SolutionCombiner.findMinStatIndex` (solution-combiner.ts:194-200): the first three `tempEvs` statements are fully overwritten by the next three.
6. **The orchestrator duplicates its epilogue and fallback skeleton.** `optimizeForSingleAttackers` is `computeSolution` with `strongestDoubleTarget = null`; the reserved-EVs application block and the zero-EV "not-needed" epilogue exist twice, nearly verbatim (~110 duplicated lines in defensive-ev-optimizer.ts).
7. **Parameter plumbing noise**: `threshold, rollIndex, rightIsDefender` (often plus `physicalStrongest, specialStrongest`) thread through 12+ signatures positionally, while `OptimizationContext`/`SpreadContext` already exist as types.

**Equivalence subtlety that any refactor must preserve:** finder probes clone with *partial* EVs `{hp, def, spd}`, which **zeroes the defender's offensive EVs** during checks; the combiner's `tempEvs` instead **preserves** `atk/spa/spe`. The two paths disagree today (observable only via defender-stat-dependent moves like Foul Play combined with `keepOffensiveEvs`). This plan replicates each path's current semantics exactly and does **not** unify them; unifying is a behavior change to raise separately.

## Decision

Simplify in five gated phases, ordered by risk. Default scope = phases 0–4, all required to be **output-identical**. Phase 5 is out of scope unless explicitly approved.

### Phase 0 — Safety net (no production change)

1. **Golden master**: scratchpad script (`node --import tsx`, tsx 4.23.1 devDep) that runs `optimize()` over a corpus and serializes `{evs, nature, status}` to JSON:
   - every scenario from `defensive-ev-optimizer.spec.ts` and `defensive-ev-optimizer.edge.spec.ts` (public API only);
   - a generated matrix: defenders (incl. Sitrus Berry and Leftovers holders, burn/sand residuals) × single/double/mixed attacker sets × thresholds 2/3/4 × `updateNature` × `keepOffensiveEvs` × `rightIsDefender` — target ≥ 2.000 calls, deterministic (fixed list, no RNG).
2. **Benchmark**: median of ≥ 15 runs for three cases — the heavy Ting-Lu perf-spec case (finder + fallback), a pure-singles case, and a Sitrus fallback case. Record baseline medians.
3. **Gate applied after every phase**: `npm run test` green + golden JSON byte-identical + medians not worse than baseline. Any diff = revert the step and re-diagnose; never fix forward on top of a red gate.

The script and JSON live in the session scratchpad, never committed.

### Phase 1 — Dead code and constants (zero risk)

1. Delete the dead `tempEvs` assignments in `SolutionCombiner.findMinStatIndex`.
2. Replace the `EvIntervalsCalc` class with an exported frozen constant `EV_INTERVALS` next to the other constants. `ev-intervals-calc.spec.ts` keeps its exact expected values (`[0, 4, 12, …, 252]`, 33 entries) retargeted at the constant.
3. Precompute the two ordered grids as lazily-initialized module constants derived from `EV_INTERVALS`; `EvOptimizerUtils` disappears into that module. Pure function of a constant ⇒ identical by construction; removes ~20k allocations + sort per fallback call.

Expected: −60 to −80 lines, less GC pressure in the fallback path.

### Phase 2 — One binary search (structural, output-identical)

Extract `minIndexSurviving(lowIndex, survivesAt: (ev: number) => boolean): number` (max-check first, then binary search — exactly the current shape) and express the four searches as predicates at their call sites. Predicates keep their current defender construction (clone-based in the finder, `setEvs`-based in the combiner) so this phase cannot change outputs even where the two styles differ.

Expected: −~70 lines.

### Phase 3 — Kill clone-per-probe in the finder (the CPU lever)

`OptimalSpreadFinder` holds one `tempDefender = defender.clone()` per `findOptimal` call and mutates it with `setEvs` (the combiner's proven pattern), instead of going through the `*WithEvs` clone-per-call helpers.

- Preserve probe semantics exactly: `setEvs({ hp, atk: 0, def, spa: 0, spd, spe: 0 })` — offensive EVs zeroed, as the partial-EV clone does today.
- Cache keys are `(def, spd)`-based and orthogonal to the defender instance; `setEvs` recalculates stats and `originalCurrrentHp`, so live `defender.hp` reads and the Berry HP-in-key rule stay correct.
- Afterwards the `*WithEvs` variants on `SurvivalChecker` have zero callers (only finder and combiner used them; no spec touches them — verified) → delete both.

Expected: the dominant allocation cost in the hot path disappears. Measure with the Phase 0 benchmark; no number is promised, the gate is only "not worse", the goal is a visible drop in the heavy case.

### Phase 4 — Deduplicate the orchestrator (−~110 lines, careful)

Two steps, each gated:

1. Extract shared helpers for the duplicated epilogues: reserved-EVs application (508 validation + merge) and the zero-EV "not-needed"/no-solution closing block.
2. Merge `optimizeForSingleAttackers` into `computeSolution` as the `strongestDoubleTarget = null` case. Differences to prove equivalent first:
   - The single flow's early `no-solution` returns (`physicalStrongest && !physicalOptimized`, same for special) are unreachable: the strongest attacker is selected as survivable at hp 252 / def-or-spd 252 — a spread inside the ≤508 grid `SingleAttackerOptimizer` scans — so `optimizeForAttacker` always finds at least that spread. Confirm via lcov over the full suite + golden corpus before removing.
   - The single flow's "no physical and no special attackers ⇒ return current EVs" guard must survive the merge for the no-double-pairs case.

### Phase 5 — OPTIONAL, requires explicit owner approval (recommended: not now)

Removal of the sweep-verified defensive policy branches (`tryOptimizeForSecondStrongest` scan loops, `tryAddDoubleSolution`, `tryCombineSingleWithDouble` inner grid scan, `selectBestScenario` return-current, finder `polish`). Arguments against doing it in this round: they are policy with direct spec coverage, the parked Sitrus-monotonicity bug fix would land exactly there, and the prior agreement requires a per-branch decision. If ever approved: one branch per iteration, each with its own gate, updating `solution-combiner.spec.ts` expectations only with the owner reviewing each change.

### Context-object cleanup (optional rider on Phase 2 or 4)

Thread one `OptimizationContext` through the internal signatures instead of positional `threshold/rollIndex/rightIsDefender`. Pure plumbing, but it rewrites `solution-combiner.spec.ts` call sites — read that spec first and keep its assertions untouched.

## Rejected alternatives

- **Rewrite combiner/refinement as grid sweeps** — changes outputs; previously vetoed without an explicit decision to accept different (even if better) spreads.
- **Cache whole `Result` objects** — proven divergent (5/5) because results capture the defender and multi-turn math reads live HP.
- **Unify domain/calc `Pokemon` to make clones cheap** — attempted and aborted (+45–58% engine regression).
- **Fuse the `impossibleDouble` re-run of `findOptimal`** — the cache makes the second pass cheap; fusing complicates the finder for a rare path.
- **Nested-map cache keys instead of strings** — no evidence the key building matters; only revisit with profiler data.

## Consequences

- ~250–350 fewer production lines (~20%) with byte-identical behavior on a ≥2.000-case golden corpus.
- Hot path stops allocating thousands of `Pokemon` clones per `optimize()`; fallback stops rebuilding sorted grids.
- `SurvivalChecker` shrinks to the two mutation-friendly checks; one binary search instead of four.
- The policy chain (combiner/refinement) remains untouched, keeping the documented Sitrus rescue-fix landing zone intact.
- `DEFENSIVE_EV_OPTIMIZER.md` must be updated at the end (cache section, finder description, performance notes).
- Known-issue recorded, not fixed here: finder probes zero offensive EVs while combiner preserves them — observable with defender-stat-dependent moves (e.g. Foul Play) + `keepOffensiveEvs`; unifying is a separate behavior decision.
