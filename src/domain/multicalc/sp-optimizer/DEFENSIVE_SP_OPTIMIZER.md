# Defensive SP Optimizer

## Overview

The Defensive SP Optimizer calculates optimal SP (Stat Point) distributions for defensive Pokémon in VGC battles. It determines the minimum SP investment in HP, Defense, and Special Defense required to survive attacks from one or more opposing Pokémon (single attackers and/or pairs attacking together).

The optimizer returns an `OptimizationResult` containing the optimized SPs, an optional nature recommendation, a status (`success`, `not-needed`, `best-effort`, `impossible`) and a `TargetCoverage`. It supports a configurable `SurvivalThreshold` (2, 3 or 4, default 2), meaning: survive `threshold - 1` hits, including end-of-turn residuals such as burn chip or Leftovers recovery.

## Business Policy

### Survival Is Decided by KO Chance

A threat is survived when the **chance of being KO'd within `threshold - 1` hits is exactly zero** — not when the damage accumulated at the configured roll index stays below HP. The same criterion applies to single attackers and to attacker pairs.

An attacker with an 18.4% chance to 2HKO therefore counts as **not** protected.

### The Roll Index Selects Which Rolls Count

"Zero KO chance" is evaluated over the rolls the user chose to care about, not always over all sixteen. `truncateToRoll` keeps the weakest `rollIndex + 1` of every 16 rolls and discards the rest, and the whole KO-chance simulation — berry timing, end-of-turn residuals, multi-hit — runs on that truncated distribution.

| roll level | `rollIndex` | rolls considered | meaning                                      |
| ---------- | ----------- | ---------------- | -------------------------------------------- |
| high       | 15          | all 16           | no roll may KO — the strictest reading       |
| medium     | 7           | the 8 weakest    | tolerates KOs that need an above-median roll |
| low        | 0           | the minimum only | only the minimum roll must be survived       |

Two consequences worth stating, both measured over 250 scenarios:

- **High roll is unchanged.** `truncateToRoll` returns the array untouched at index 15, so every spread the optimizer produced before this rule existed is produced identically.
- **Lowering the roll never costs more SPs for the same coverage.** Truncating removes KO paths, it never adds them, so the minimal surviving spread can only shrink. Where a lower roll _does_ report a larger spread, it is because the laxer bar turned a previously impossible threat into a protectable one, and the extra SPs buy that extra Pokémon — coverage rises, never falls.

Truncation must reach every place that reasons about "the worst thing that can happen", or the two halves disagree. `MultiResult.certainlyKOs` is the subtle one: it prunes a row using the **maximum** roll of each hit, and that maximum has to come from the truncated distribution too, otherwise the prune discards rows the user would actually survive.

The two criteria only disagree when the defender holds a healing item. Accumulated damage lets a Sitrus Berry absorb every hit, but the berry heals once, so it reports survival where a real KO chance exists. Two shapes of the error:

- **Single attacker** — Umbreon + Sitrus at 0 SPs vs Rotom-Heat Overheat (Grassy, threshold 3) reads as needing nothing, despite a 2% chance to 2HKO.
- **Pair** — Dondozo + Figy Berry at `20 HP / 60 SpD` (228 HP) vs Great Tusk + Iron Bundle reads as protected, while the real answer is a **31.3% chance to OHKO**. Pairs are worse because both hits land in the same turn, so crediting the berry between them is never valid.

The error is confined to berries: across 11,520 pair comparisons the criteria diverge 110 times (0.95%), **every one of them on a defender holding a Berry**.

Note that raw combined damage is _not_ a valid survival test for a pair either. The two attacks resolve in sequence, so a berry can legitimately trigger between them: a pair dealing 270–318 against 240 HP can still be a `guaranteed 2HKO`. Only `MultiResult.survivesHits` models the ordering correctly.

### Coverage Is Reported, Not Only Used

Every result carries a `TargetCoverage`: how many threats the proposed spread survives (`covered`), how many the target list holds (`total`), how many it does not survive (`outOfReach`), and the name and KO chance of the worst one still standing (`bestTargetName`, `bestTargetKoChance`).

`total` counts **every** threat in the target list — each single attacker and each pair — including the lost causes the plans dropped. Reporting only the protectable ones would hide exactly what the user needs to see: a spread that protects 47 of 61 attackers is not "survives the OHKO", and saying so claims a safety the defender does not have. The same applies at zero SPs: `not-needed` with partial coverage means "nothing to buy here", not "nothing to fear".

Coverage is measured against the spread that is actually returned, with the chosen nature applied, so it never describes a different Pokémon than the one on screen.

Targets that carry no attack at all — every move is a status move — are still counted and still reported as covered. They are threats the defender faces and survives, so hiding them would shrink `total` below the number of Pokémon the user put on screen. Only an empty target list reports an empty coverage.

### Impossible Is Its Own Answer

When the best effort cannot push the KO chance below 1 — every threat is a guaranteed KO at every legal spread — the result is `impossible` rather than a `best-effort` carrying `koChance: 1`. The SPs are left untouched (only the reserved offensive ones survive), and there is nothing to apply.

The distinction is for the caller, not the search: both walk the same path, but `best-effort` means "this spread is the best available" while `impossible` means "no spread changes anything". Offering an Apply button for the latter proposes a change that does nothing.

### Protect What Is Possible

An attacker (or attacker pair) is **impossible** when the defender cannot survive it even with maximum defensive investment. Impossible threats are lost causes:

- They are discarded from optimization and never become the "strongest" of their category.
- They never abort the result: the optimizer protects every threat that can be protected.
- When **no** threat in the list can be protected, the optimizer falls back to a best effort (see below).
- Trivial threats (survived with 0 SPs) and immune matchups (zero damage) count as possible.

### Coverage Beats Cost

When 66 SPs cannot cover every threat, the optimizer maximizes the **number of threats protected** first, and only then minimizes the SPs spent. A spread that protects one extra attacker always wins over a cheaper spread that protects fewer. Ties in coverage are broken by lower total SPs, then by higher HP.

### Best Effort When Nothing Can Be Protected

There is always a spread to propose. When no degradation plan fits the budget — every threat is a lost cause, or the reserved offensive SPs leave too little room — the result is `best-effort` instead of a failure:

- Every threat is considered: every single attacker and every attacker pair in the target list, not only the strongest pair.
- The spread minimizes the **highest** KO chance among those threats (within `threshold - 1` hits at the configured roll index). Ties are broken by lower total SPs, then by higher HP.
- The reported `koChance` is that highest KO chance measured against the spread that is returned, so it always belongs to the attacker named in `bestTargetName`. The search reports the threat it optimized; the result reports the worst one still standing, and only the latter is true of the spread on screen.
- With `updateNature` the two defensive natures are candidates alongside the current one, and the one that reaches the lowest KO chance wins. Without it the nature is left alone (`nature: null`).
- When every spread is a guaranteed KO the status becomes `impossible` and the defensive SPs stay at zero — there is no spread worth proposing.
- Reserved SPs above 66 leave a budget of zero, so the only candidate is zero defensive SPs.
- A best effort that reaches a KO chance of **zero** is reported as `success` (or `not-needed` at zero SPs): the spread survives every threat, cheapest first, which is exactly the success criterion. This is not hypothetical. A healing Berry makes the maximum-bulk probes that classify threats as impossible die while a smaller spread survives — Farigiraf + Sitrus vs Adamant 92 Atk Sneasler + Modest 92 SpA Floette-Mega is a 63.3% OHKO at 32/32/32 but a guaranteed 2HKO at `21 HP / 12 Def / 31 SpD`. Those pairs used to answer `no-solution`.

`SpreadSearch.bestAgainst` searches one threat at a time and prunes whole regions with a **lower bound** on the KO chance, evaluated at the bulkiest spread the budget allows for that HP slab or that row. A region is dropped when its bound already exceeds the best chance found, or ties it while costing more SPs. A bound of 1 at 32 HP / 32 Def / 32 SpD — the same deliberately illegal upper bound `findStrongestDoubleTarget` uses — means every legal spread is a guaranteed KO, so the answer is zero SPs without scanning anything.

Which bound applies depends on the item:

- **No Berry**: the KO chance itself is the bound, because damage falls with every defensive stat and nothing reverses it.
- **Berry**: the chance is not monotonic (a fatter spread can switch the Berry off), so the bound credits the Berry as extra HP from the start — `hp + recovery` against `maxHp + recovery`, with no trigger. Any real KO still happens under that bound, so it never overstates the chance. The end-of-turn term must be the **combined** one (`currentEotDamage`); using the stored `eot` heals less than reality and breaks the bound — measured, it lifted the bound above the real chance at 4,869 points under Grassy Terrain.

Validated over 180 scenarios (Sitrus and Figy, thresholds 2-4, no field / sand / Grassy, a multi-hit move): the bound never exceeded the real chance, and 100 comparisons against the full grid returned the same spread.

| case                                          | shape          | measured |
| --------------------------------------------- | -------------- | -------- |
| Snorlax, sand, vs Garchomp + Chi-Yu           | no Berry, pair | ~50ms    |
| Farigiraf + Sitrus vs Sneasler + Floette-Mega | Berry, pair    | ~37ms    |

## Architecture

Three concepts, one search engine:

```mermaid
flowchart TD
    Start([optimize]) --> Classify[AttackerSelector:<br/>classify threats, discard impossible,<br/>pick nature and strongest per category]
    Classify --> Plans[Degradation plans:<br/>ordered subsets of threats]
    Plans --> Search[SpreadSearch.minimalSpread<br/>per plan]
    Search --> Score[Score each spread:<br/>coverage, then cost, then HP]
    Score --> Full{Covers every<br/>possible threat?}
    Full -->|Yes| Reserved[Apply reserved SPs]
    Full -->|No| Enrich[Enrich: add an uncovered threat<br/>to the winning plan and re-search]
    Enrich --> Reserved
    Plans -->|no plan yields a spread| BestEffort[Best effort:<br/>lowest KO chance, then cost, then HP]
    BestEffort --> Reserved
    Reserved --> End([OptimizationResult])
```

### `Threat`

A threat is one attacker or a pair attacking together. It answers `survivedBy(defender, ctx)` and declares which defensive stats it depends on (`def`, `spd`, or both). Single and double attackers share this one interface, so the rest of the optimizer never branches on which kind it holds.

**Single attacker** — `Result.survivesHits(threshold - 1)`, guarded by a cheap pre-filter: if HP minus the damage accumulated at the roll index still exceeds the maximum single roll, survival is certain and the expensive path is skipped.

**Pair** — `MultiResult.survivesHits(threshold - 1)`, with the pre-filter deliberately **absent**.

The asymmetry is deliberate and measured; it is the kind of thing that looks like an oversight and should not be "fixed" in either direction:

|        | pre-filter | why                                                                                                                                                                                                  |
| ------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| single | present    | removing it costs 25% in aggregate, even though it prunes nothing in the worst case                                                                                                                  |
| pair   | absent     | `MultiResult.damageWithRemainingUntilTurn` runs `afterTurn`, walking ten turns and recomputing residuals — the guard costs about what the real answer costs. Ting-Lu: 41.6ms with it, 32.7ms without |

`MultiResult.survivesHits` recomputes end-of-turn damage rather than reading the stored `eot`. This is required for correctness: `CachedDamageCalc` keys `eot` on HP only for Berry holders, but Leftovers recovery is `maxHP / 16` and therefore HP-dependent, so a cached `eot` can be stale. Recomputing inside `survivesHits` keeps the cache key narrow — widening the key to include HP also fixes it, but costs 63% in cache misses.

### `SpreadSearch`

The single engine. Given a set of threats, it returns the minimal spread (HP/Def/SpD, each ≤ 32 SP, total ≤ 66 SP) that survives all of them, or `null`.

1. Threats are bucketed by the stats they depend on: Def-only, SpD-only, and coupled (mixed pairs, which need both).
2. For each HP value over the SP range, it finds the minimum Def that satisfies the Def-only threats and the minimum SpD for the SpD-only ones; for coupled threats it escalates Def while searching SpD.
3. Candidates are ranked by total SPs ascending, ties broken by higher HP, with early breaks once no better total is reachable.

The coupled SpD scan is capped by the remaining SP budget — `best.totalSps` once a candidate exists, otherwise `MAX_SPS` — minus the HP and Def already committed. Without that cap the scan walks to 32 SP on every `(hp, def)` pair and only then discards the spreads that break the 66 SP limit, which is most of them once HP and Def are large.

#### Skipping hopeless rows

Before scanning SpD for a given `(hp, def)`, the search asks `Threat.certainlyKOs` at the **highest** SpD in range. If the answer is yes, the whole row is skipped: one probe replaces up to 33.

`MultiResult.certainlyKOs(hits)` is a pure damage comparison — no KO-chance simulation:

```
hits × maxDamagePerTurn  ≥  currentHp + maxBerryRecovery + hits × max(0, eotHealing)
```

It takes the **maximum** roll of every hit (so the left side is a damage path that really exists) against the **most generous** healing the defender could receive (so the right side can only be an over-estimate). If the defender still reaches 0, that roll path is a KO, so the KO chance is above zero and the spread does not survive. The maximum is taken over the rolls the `rollIndex` keeps, so a row is only pruned when it dies on a roll the user actually asked about.

The row-level conclusion follows because damage is monotonic in the defensive stat — that is plain arithmetic, unaffected by the berry timing that breaks monotonicity of _survival_. Less SpD means at least as much damage, and the healing terms do not depend on SpD, so a row that dies at the top of its range dies everywhere in it.

This is the mirror image of the single-attacker pre-filter: one proves survival cheaply, the other proves death cheaply, and both fall back to the full evaluation when they cannot decide.

Both directions of the bound must stay conservative. Over-estimating healing or under-estimating damage only weakens the prune; the reverse would silently return worse spreads. Verified across 1,890 configurations — 7 defenders × 6 items × 5 attacker pairs (including a multi-hit move) × 3 fields × 3 thresholds — where the filter fired on 74,079 rows with **zero** cases of a surviving spread being skipped.

The winner needs no post-trimming, and none is attempted. Every SP _is_ a stat breakpoint, so stepping one SP down always yields the previous breakpoint's stat — one point lower than the minimum the search just proved necessary. A greedy trimming pass is therefore structurally incapable of finding a reduction (confirmed empirically: 326 attempts across the suite, zero reductions).

Every probe mutates a single reused defender via `setSps` with offensive SPs zeroed — no cloning inside the loops, and every probe passes through `SurvivalMemo`.

**Monotonicity:** the stat search is binary by default. When the defender holds a Berry, `scansLinearly` switches every axis to an ascending linear scan.

Binary search requires survival to be monotonic along the axis — once a stat value survives, every larger one must too. **Healing berries break that property on all three axes, HP included.** Investing in a defensive stat can switch the berry _off_: with less defense the first hit drops the defender below the 50% trigger, the berry heals, and the second hit lands against restored HP; with more defense the damage stops just above the trigger, the berry never fires, and the second hit kills. Pairs make this sharper, since both hits resolve in the same turn with the trigger window between them.

The effect is rare but real. Sweeping Def and SpD with HP pinned, over 6 defenders × 3 berries × 4 mixed pairs × 4 HP values, 5 axes out of 864 are non-monotonic on each side:

```
DEF  Ting-Lu/Figy  hp164 spd0:  TTTTfffffffffffffffffffffffffffff
SPD  Ting-Lu/Figy  hp164 def0:  Tffffffffffffffffffffffffffffffff
```

Ting-Lu survives at 0 Def and dies at 20; survives at 0 SpD and dies at 4.

On a `Tffff…` axis a binary search probes the middle, finds `f`, and concludes nothing below works — returning a far larger index or −1, i.e. a worse spread or a false `no-solution`. The linear scan is load-bearing on all three axes and must not be optimized away for berry holders; it is what makes the result the true minimum of the grid regardless of monotonicity.

### Degradation plans

When the full set of threats does not fit in 66 SPs, the optimizer does not "combine partial solutions" — it drops threats. Plans are ordered subsets, from the complete set down to a single category:

1. every survivable attacker of both categories + the strongest pair
2. strongest of each category + the pair
3. every survivable attacker, no pair
4. strongest of each category, no pair
5. prioritized category + pair, then the other category + pair
6. pair alone
7. prioritized category alone, then the other alone

Each plan is searched with the same engine and scored by coverage → cost → HP. If the winner still leaves threats uncovered, the **enrich** step adds one uncovered threat at a time to the winning plan and re-searches, keeping any result that raises coverage.

## Caching

Three independent caches, all scoped to a single `optimize()` call.

### Spread cache (`SpreadSearch`)

Memoizes `minimalSpread` by the **set** of threats — the key sorts the threat ids, so plans holding the same threats in a different order share the result. The memo is exact: the search depends only on the threat set and on the `SpreadSearch` state, which is fixed for the whole call.

It is not a micro-optimization. `enrich` routinely re-searches a set that `bestChoice` already searched, and in the worst known case that single duplicate accounts for **70% of the runtime** (2226ms of 3194ms).

### `SurvivalMemo`

Memoizes the answer to `survivedBy`. Each degradation plan builds its own `Threat` instances for the same attackers, so the memo is owned by `SpreadOptimizer` and passed down — it cannot live inside a `Threat`. Measured: **63% of all probes are repeats** across plans.

- Key: attacker/partner WeakMap ids plus the context, mapping to `(hp << 20) | (def << 10) | spd`.
- The spread key uses **stats, not SPs**: `updateNature` changes stats while leaving SPs untouched.
- The key must stay numeric. A template-string key costs ~9µs per hit — close enough to the price of recomputing that the memo stops paying for itself.

### `CachedDamageCalc`

Caches per-stat damage results:

- Key: attacker reference (WeakMap id), move name, second attacker, side orientation, and the defender's Def/SpD. **HP is deliberately absent.**
- Only `damage` and `rawDesc` are cached — never the whole `Result`, because results capture the defender reference and multi-turn math reads its current HP.
- Cache misses store the prepared calculation, so subsequent hits rebuild a `Result` cheaply against the live defender.

Leaving HP out of the key is what makes this cache useful at all. The search walks a 33³ grid of `(hp, def, spd)`; with HP in the key every point is a unique entry and the hit rate is zero. Without it, the same `(def, spd)` is computed once and reused across all 33 HP values.

That is sound because **damage does not depend on the defender's HP** — verified over 246,960 comparisons across defenders, berries, fields and attacker pairs, with zero differences. The cached `eot` _is_ HP-dependent (94,325 of those same comparisons differ), but nothing in the optimizer reads it: the pair path calls only `survivesHits`, which recomputes end-of-turn damage from the live defender. The single-attacker cache has always omitted HP, so this is one rule rather than two.

The exception is damage the engine derives from the target's current HP, where HP joins the key. For a single attacker that is a move that reads it (`readsTargetHp`: Brine, Hard Press, Crush Grip, Wring Out, Super Fang, Ruination, Endeavor, Pain Split). For a pair it is also a target whose ability weakens only the first hit (`weakensOnlyFirstHit`: Multiscale, Shadow Shield, Tera Shell), because the second hit lands against whatever HP the first one left. Without it the cache served Super Fang against another HP (117 instead of 133), Endeavor as a 3HKO instead of a 2HKO, and read a Multiscale Dragonite as a `guaranteed 2HKO` against a pair with a real 70.3% chance to OHKO. Putting HP in every pair key instead fixes the same bugs but made the best-effort scan of a Sitrus pair 3.8x slower (313ms → 1193ms).

The defender's converted `PokemonCalc` is deliberately **not** cached here. `SurvivalMemo` already absorbs the repeats one level up, so this layer sees mostly fresh spreads and the extra cache costs more than it saves.

## Attacker Selection and Priority

`AttackerSelector` classifies each attacker by category and survival class:

- **survivable**: needs investment (dies at 0 SPs, lives at max).
- **impossible**: dies even at max investment — excluded from strongest selection and constraints.
- **trivial/immune**: survives at 0 SPs — no constraint, still "possible".

The strongest attacker per category is the highest one-turn damage among non-impossible attackers. With `updateNature = true`, Def- and SpD-boosting natures are compared by total survivable count (max damage as tiebreaker). Only the strongest survivable pair becomes a constraint; weaker pairs are not modeled.

`findStrongestDoubleTarget` screens pairs against a defender holding **32 HP / 32 Def / 32 SpD** — 96 SPs, a spread no real Pokémon can have. That is deliberate: it is an upper bound on bulk, used only to discard pairs that are hopeless even in the best case. Being over-generous only lets a hopeless pair through, and `SpreadSearch` then fails to find a spread for it and the degradation plans drop it — the cost is wasted work, never a wrong answer.

Replacing it with the bulkiest _legal_ spreads is wrong, and the failure is not obvious. Bulk is not monotonic for Berry holders: against Great Tusk + Iron Bundle, Dondozo with a Figy Berry **dies** at 32/32/1 (42.2% OHKO) but **survives** at 15/4, because the extra HP lifts it above the berry's 50% trigger so the berry never fires. Any fixed set of "bulkiest" legal probes therefore misses spreads that do survive, and the pair gets discarded as impossible when it is not.

## SP Values

The optimizer works in SPs. Every SP is a stat-changing breakpoint, so the search space per stat is simply `0..32` (33 values).

## Constants

- **`MAX_SPS`**: 66
- **`MAX_SPS_PER_STAT`**: 32

## Reserved SPs Support

With `keepOffensiveSps = true`, existing ATK/SPA/SPE SPs are preserved. Note that survival probes always zero the offensive SPs, so a defender-Attack-dependent move (Foul Play) is probed against 0 Atk.

The reserved SPs are **subtracted from the search budget up front** — `SpreadSearch` is constructed with `66 - reserved` and never proposes a spread that does not fit. Searching with the full 66 and rejecting the answer afterwards is what the optimizer used to do, and it turned every over-budget case into `no-solution`; measured over 366 scenarios with reserved SPs, a quarter of those failures (27 of 108) had a within-budget spread that protected at least one threat.

The reduced budget makes "impossible" ambiguous, and the two meanings must not be confused:

- **A lost cause** is a threat that no spread survives even with the **full 66 SP**. These are dropped, and the remaining threats are still protected.
- **Merely unaffordable** is a threat that 66 SP could protect but the leftover budget cannot. These are _not_ lost causes: reporting `not-needed` for them would claim a safety the defender does not have.

`withoutSpread` therefore probes lost causes with an unbounded `SpreadSearch`, not the budget-limited one. With the budget-limited search it would conclude "nothing is protectable, so nothing needs protecting" and answer `not-needed` for a defender facing a guaranteed 2HKO.

When every degradation plan overflows the budget, `bestFeasibleSubset` falls back to the cheapest single-threat spread that does fit, and `enrich` grows it back toward full coverage.

## Performance

The KO-chance criterion makes every probe more expensive than a damage comparison would be. That cost is paid down in the calculation engine, not by weakening the criterion. See `src/domain/calc/engine/ko-chance.ts`:

- `Result.survivesHits(n)` mirrors `getKOChance` but stops the ladder at `n` hits instead of always walking to 4 and formatting text. Exact by construction — no monotonicity assumption.
- `MultiResult.survivesHits(n)` evaluates **only turn `n`**, not every turn from 1 to `n`. `computeMultiHitKOChance` accumulates KO probability across all rows it is given, and turn `n`'s damage matrix is turn `n-1`'s extended by one more turn — so the chance is non-decreasing in the turn and the final turn subsumes the earlier ones. Verified over 11,025 distributions: zero monotonicity violations and zero disagreements with the per-turn loop. `getHKO` still iterates, because it needs the _first_ turn that can KO.
- `combine()` is memoized, which matters for multi-hit moves that otherwise rebuild a 4096-entry array with two sorts per call.
- `computeKOChance` iterates unique damage values with weights rather than all 4096 entries (a multi-hit distribution has ~10 distinct values).

With those in place `koChance()` costs 0.557ms for a multi-hit move rather than 16.7ms, and `survivesHits` accounts for only **5% of total optimizer time** — the criterion is not the bottleneck.

### Where the time actually goes

Cost is concentrated on **a defender holding a healing Berry together with at least one mixed pair**: the berry forces a linear scan on every axis, so the coupled search is a 33³ grid. What used to dominate was _proving a plan has no solution_ — walking that whole grid to conclude nothing survives. The `certainlyKOs` row prune removes most of it, since hopeless rows are exactly the ones an overwhelming-damage bound can settle in one probe. Two cases are pinned in the performance suite:

| case                                | shape                                                   | measured | note                                                                             |
| ----------------------------------- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- |
| Dondozo + Sitrus, sand, threshold 3 | two mixed pairs **sharing** attackers with the singles  | ~46ms    | worst case reproducible in the UI; the spread cache does the heavy lifting       |
| Ting-Lu + Sitrus, threshold 3       | one mixed pair sharing **no** attacker with the singles | ~85ms    | defeats both `SurvivalMemo` and the spread cache, so it pays full price per plan |

The gap between the two is the whole point: sharing attackers across plans is what the caches exploit, and a pair that shares nothing pays full price on every plan.

Two further candidates were measured and rejected. An early exit from `computeMultiHitKOChance` on the first KO returns ~2%, because the KO is normally found in the last row anyway. Caching the defender's converted `PokemonCalc` is a net loss, for the reason given above.

### Measuring

`npm run perf` runs `history/performance/performance-suite.mjs` — a plain Node script that bundles the domain with esbuild and exits non-zero when a case exceeds its threshold. Each case is run 5 times and the **median** is compared, since single samples on a loaded machine swing 2-3x on the cheap cases.

**Performance is deliberately not measured through the test runner.** `ng test` enables istanbul instrumentation, which inflated these same cases by 2x to 8x — enough to make cases that run in 10ms and 17ms fail a 100ms threshold, and to make the Dondozo case read ~1900ms instead of ~50ms. On top of that, each iteration paid the Angular build. Every threshold here is calibrated against uninstrumented execution.

The same applies to exploratory work — sweeps, A/B comparisons, hunting counterexamples. Import `loadDomain` from `history/performance/bundle.mjs`, which resolves the project's path aliases.

## Limitations

- Only HP/DEF/SPD are optimized; offensive SPs can be preserved, not optimized.
- Critical hits are ignored.
- Damage is modeled as constant per turn (stat-stage escalation like Torch Song is not projected across turns).
- Nature selection considers defensive natures only.
- Only the strongest attacker pair is modeled; other pairs in the target list are ignored, except by the best effort.
