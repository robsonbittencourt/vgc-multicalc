---
name: perf-calc
description: Benchmarks the calc engine's damage functions (calculate / calculateMulti) on the current branch — execution time and memory — and writes an HTML report in history/performance/, comparing against the previous run.
---

# /perf-calc

Measures execution time and memory of the vendored calc engine's damage
functions (`calculate` and `calculateMulti`) on the **current branch** and
writes a dated HTML report plus a JSON snapshot to `history/performance/`,
comparing against the most recent previous snapshot.

Unlike `/perf-audit` (frontend, Lighthouse-based, manual orchestration), this
benchmark is fully scripted — the skill just runs it and reports the numbers.

## Step 1 — Run the benchmark

```bash
node --expose-gc history/performance/run.mjs
```

`--expose-gc` is required so the heap-delta measurement is accurate (the script
forces a GC both before and after the workload). It works without it, but heap
numbers get noisy.

**Heap delta measures retained memory, not allocation churn.** Without the
trailing GC the number reflects whatever garbage happened to be in flight when
the sample was taken, which swings ~3x between identical runs (measured: 1.0 to
3.65 MB for the same code). Snapshots taken before 2026-07-26 lack that
trailing GC, so their `heapDeltaMB` is not comparable with later ones — only
the ns/call columns are.

The script:

- bundles the vendored calc (`@calc`, with its `@`-aliases) on the fly via the
  esbuild that Angular already ships — no extra deps, no `dist` build needed;
- runs the scenarios in `scenarios.mjs` `REPETITIONS` times (default 5),
  measuring ns/call and heap delta, and reports the **median** of the runs —
  this machine's run-to-run noise is larger than most real changes, so a single
  run is not trustworthy on its own;
- compares against the most recent previous snapshot on disk;
- writes `YYYY-MM-DD.json` (raw snapshot), `YYYY-MM-DD.html` (report), and
  rebuilds `CHANGELOG.html` (index of all runs).

## Step 2 — Baseline

The baseline is always the most recent previous snapshot — so the delta shows
regressions/gains across branch changes, like `history/performance-frontend`.

The very first snapshot (`2026-07-03`) was measured against the `damage-calc`
package the calc was vendored from; that comparison code has since been removed,
since every later run compares against a prior snapshot. That first snapshot is
therefore the permanent baseline — **don't delete it**. If no earlier-day
snapshot exists, the run compares against the latest snapshot available
(including the same day); if none exists at all, it errors out.

## Step 3 — Report the result

Relay the printed summary table (single/multi ns/call, heap Δ, and the % delta
vs baseline). Point the user at `history/performance/YYYY-MM-DD.html` for the
full report and `CHANGELOG.html` for the history.

## Editing scenarios

The workload lives in `scenarios.mjs` (species/moves/EVs + iteration counts +
`REPETITIONS`). Raising `REPETITIONS` tightens the median at a linear cost in
wall time; lowering it below 3 makes the median meaningless.
Use real Champions species/move names so lookups resolve. Adding scenarios
changes the numbers, so a snapshot taken after an edit isn't comparable to ones
before it — note the change in the commit.

## Notes

- `history/performance/` is committable and not part of the Angular bundle.
- Never run Cypress here — this is a pure Node benchmark.
