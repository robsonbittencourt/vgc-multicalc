---
description: Runs a full performance audit of VGC Multicalc (Lighthouse + DevTools trace) and saves the result as an HTML report in performance/
---

# /perf-audit

Runs a full performance audit of VGC Multicalc and saves the result in `performance/`.

**IMPORTANT:** All steps must be executed **sequentially**, never in parallel. Running Lighthouse or traces simultaneously stresses the CPU and distorts results.

---

## Step 1 — Clean build and server

Delete `dist/` to ensure no stale files. Then build and start the server with cache disabled (`-c-1`):

```bash
rm -rf dist
npm run build
npx http-server dist/browser -p 8080 -g -c-1 --silent &
sleep 3
```

---

## Step 2 — Lighthouse mobile — VGC Multicalc

```bash
npx lighthouse http://localhost:8080 --preset=perf --form-factor=mobile --output=json --output-path=/tmp/lh-vgc.json --chrome-flags="--headless --no-sandbox"
```

Wait for completion before continuing.

---

## Step 3 — Lighthouse mobile — Smogon Calc

```bash
npx lighthouse https://calc.pokemonshowdown.com/ --preset=perf --form-factor=mobile --output=json --output-path=/tmp/lh-smogon.json --chrome-flags="--headless --no-sandbox"
```

Wait for completion before continuing.

---

## Step 4 — Lighthouse mobile — Nerd of Now

```bash
npx lighthouse https://nerd-of-now.github.io/NCP-VGC-Damage-Calculator/ --preset=perf --form-factor=mobile --output=json --output-path=/tmp/lh-ncp.json --chrome-flags="--headless --no-sandbox"
```

Wait for completion before continuing.

---

## Step 5 — DevTools Trace — VGC Multicalc (7 routes, sequential)

For each route below, **one at a time**:
- `http://localhost:8080/`
- `http://localhost:8080/speed-calc`
- `http://localhost:8080/type-calc`
- `http://localhost:8080/probability-calc`
- `http://localhost:8080/how-to-use`
- `http://localhost:8080/team-vs-many`
- `http://localhost:8080/many-vs-team`

For each route:
1. `navigate_page` → route URL
2. `performance_start_trace` with `reload: true` and `autoStop: true` — wait for completion
3. `performance_analyze_insight` → `LCPBreakdown`
4. `performance_analyze_insight` → `ForcedReflow`
5. `performance_analyze_insight` → `DOMSize`
6. From the same trace, also capture **TBT** (Total Blocking Time) — sum of long-task blocking time between FCP and TTI. Available in the trace summary; if not surfaced by an insight, extract from the trace metadata.

Collect: LCP total, TTFB, Load delay, Load duration, Render delay, **TBT**, ForcedReflow total time (0ms if no issues), DOM total elements (n/a if no issues).

---

## Step 5b — INP measurement on key interaction (VGC home)

INP is interaction-driven and Lighthouse does not capture it reliably in headless mode. Measure it directly via a simulated interaction on the route most representative of real use: the **EV slider on the home page** (historical bottleneck — mat-slider was replaced).

1. `navigate_page` → `http://localhost:8080/`
2. Wait for the page to be interactive (`wait_for` a stable selector on a pokemon card)
3. `performance_start_trace` with `reload: false` and `autoStop: false`
4. Locate the first EV slider (`input[type="range"]` inside `.ev-slider`) via `take_snapshot`
5. Drive it through 5 value changes via `fill` or `press_key` (ArrowRight × 20 with small waits between) to generate real interaction events
6. `performance_stop_trace`
7. `performance_analyze_insight` → `INPBreakdown` (Input delay / Processing duration / Presentation delay)

Collect: INP total, Input delay, Processing duration, Presentation delay, interaction target.

If `INPBreakdown` is unavailable, fall back to the longest interaction event duration reported in the trace summary and note it as "approx INP".

---

## Step 6 — DevTools Trace — Smogon Calc (homepage only)

1. `navigate_page` → `https://calc.pokemonshowdown.com/`
2. `performance_start_trace` with `reload: true` — wait for completion
3. `performance_analyze_insight` → `LCPBreakdown`
4. `performance_analyze_insight` → `ForcedReflow`
5. `performance_analyze_insight` → `DOMSize`

---

## Step 7 — DevTools Trace — Nerd of Now (homepage only)

1. `navigate_page` → `https://nerd-of-now.github.io/NCP-VGC-Damage-Calculator/`
2. `performance_start_trace` with `reload: true` — wait for completion
3. `performance_analyze_insight` → `LCPBreakdown`
4. `performance_analyze_insight` → `ForcedReflow`
5. `performance_analyze_insight` → `DOMSize`

---

## Step 8 — Kill the server and browsers

```bash
pkill -f "http-server"
pkill -f "chrome"
```

---

## Step 9 — Extract Lighthouse data

```bash
python3 -c "
import json
vgc  = json.load(open('/tmp/lh-vgc.json'))
smg  = json.load(open('/tmp/lh-smogon.json'))
ncp  = json.load(open('/tmp/lh-ncp.json'))
sites = [('VGC', vgc), ('Smogon', smg), ('NCP', ncp)]
metrics = ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift']
for name, d in sites:
    score = round(d['categories']['performance']['score']*100)
    print(f'{name} score: {score}')
    for m in metrics:
        print(f'  {m}: {d[\"audits\"][m][\"displayValue\"]}')
"
```

---

## Step 10 — Read previous report (if exists)

Find the most recent file in `performance/` (by date in filename) and extract VGC Multicalc Lighthouse and Trace data from it to calculate deltas. If no previous file exists, skip the delta section.

---

## Step 11 — Generate the report

Create `performance/YYYY-MM-DD.html` (current date). If a file with that date already exists, add suffix `-2`, `-3`, etc.

---

## Report format

Output must be a **standalone HTML file** that opens correctly in a browser without a server (no external JS/CSS dependencies — use inline styles only).

The report must be written entirely in **English**.

Use the following structure and styling as reference:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Performance Audit — VGC Multicalc — YYYY-MM-DD</title>
<style>
  /* Reset & base */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f1117; color: #ffffff; line-height: 1.6; padding: 2rem; }
  h1 { font-size: 1.75rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.25rem; }
  h2 { font-size: 0.85rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 2.5rem 0 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }
  p, li { color: #94a3b8; font-size: 0.9rem; }

  /* Header meta */
  .meta { display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 0.75rem 0 2rem; }
  .meta span { font-size: 0.8rem; color: #64748b; }
  .meta strong { color: #94a3b8; }

  /* Score cards */
  .score-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
  .score-card { background: #1e293b; border-radius: 12px; padding: 1.25rem 1.5rem; border: 1px solid #334155; }
  .score-card .site { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
  .score-card .score-val { font-size: 2.5rem; font-weight: 800; line-height: 1; }
  .score-card .score-label { font-size: 0.75rem; color: #64748b; margin-top: 0.25rem; }
  .score-good { color: #4ade80; }
  .score-mid  { color: #facc15; }
  .score-bad  { color: #f87171; }

  /* Tables */
  .table-wrap { overflow-x: auto; margin-bottom: 1rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  thead tr { background: #1e293b; }
  th { padding: 0.65rem 1rem; text-align: left; color: #94a3b8; font-weight: 600; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; }
  td { padding: 0.6rem 1rem; border-bottom: 1px solid #1e293b; color: #cbd5e1; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #1e293b; }
  .highlight td { color: #f8fafc; font-weight: 500; }

  /* Delta badges */
  .delta-good { color: #4ade80; font-weight: 600; }
  .delta-bad  { color: #f87171; font-weight: 600; }
  .delta-neu  { color: #64748b; }

  /* Metric pill */
  .pill { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
  .pill-good { background: #14532d; color: #4ade80; }
  .pill-mid  { background: #713f12; color: #facc15; }
  .pill-bad  { background: #450a0a; color: #f87171; }

  /* Notes */
  .notes { background: #1e293b; border-left: 3px solid #334155; border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; }
  .notes ul { padding-left: 1.25rem; }
  .notes li { margin-bottom: 0.4rem; }

  /* Section note */
  .section-note { font-size: 0.8rem; color: #475569; margin-bottom: 1rem; font-style: italic; }
</style>
</head>
<body>

<h1>Performance Audit — VGC Multicalc</h1>
<div class="meta">
  <span><strong>Date:</strong> YYYY-MM-DD</span>
  <span><strong>Build:</strong> main-XXXXXXXX.js</span>
  <span><strong>Branch:</strong> branch-name</span>
  <span><strong>Commit:</strong> abc1234 commit message</span>
</div>

<h2>Lighthouse Score — Mobile Throttled</h2>
<p class="section-note">Mobile device simulation with CPU and network throttling. Closest to real user experience.</p>
<div class="score-grid">
  <!-- one card per site, score colored by value: >=90 good, >=50 mid, <50 bad -->
  <div class="score-card">
    <div class="site">VGC Multicalc</div>
    <div class="score-val score-good">85</div>
    <div class="score-label">Performance Score</div>
  </div>
  <!-- ... Smogon, NCP -->
</div>

<h2>Lighthouse Metrics — Mobile Throttled</h2>
<div class="table-wrap">
<table>
  <thead><tr><th>Metric</th><th>What it measures</th><th>VGC Multicalc</th><th>Smogon Calc</th><th>Nerd of Now</th></tr></thead>
  <tbody>
    <tr><td>LCP</td><td>Time until the largest visible element appears</td><td>Xs</td><td>Xs</td><td>Xs</td></tr>
    <tr><td>FCP</td><td>Time until the first pixel of content appears</td><td>Xs</td><td>Xs</td><td>Xs</td></tr>
    <tr><td>TBT</td><td>Total time the page is frozen and unresponsive</td><td>Xms</td><td>Xms</td><td>Xms</td></tr>
    <tr><td>CLS</td><td>Layout shift/jump while loading (visual stability)</td><td>X</td><td>X</td><td>X</td></tr>
  </tbody>
</table>
</div>

<h2>Core Web Vitals by Route — DevTools Trace (no throttling, local)</h2>
<p class="section-note">Direct measurement via Chrome DevTools. No throttling — use for relative comparison between routes and runs, not as an absolute user-facing value.</p>
<div class="table-wrap">
<table>
  <thead><tr><th>Site / Route</th><th>LCP</th><th>TTFB</th><th>Load delay</th><th>Render delay</th><th>TBT</th><th>ForcedReflow</th><th>DOM elements</th></tr></thead>
  <tbody>
    <!-- VGC routes -->
    <tr class="highlight"><td>VGC — /</td><td>702ms</td>...</tr>
    <!-- Smogon and NCP homepages -->
    <tr><td>Smogon — /</td><td>Xms</td>...</tr>
    <tr><td>NCP — /</td><td>Xms</td>...</tr>
  </tbody>
</table>
</div>

<h2>INP — Simulated EV Slider Interaction (VGC home)</h2>
<p class="section-note">Real interaction-driven measurement. Lighthouse headless does not capture INP reliably; this section is the canonical INP number for the report.</p>
<div class="table-wrap">
<table>
  <thead><tr><th>Target</th><th>INP</th><th>Input delay</th><th>Processing</th><th>Presentation delay</th><th>Status</th></tr></thead>
  <tbody>
    <tr class="highlight"><td>EV slider (home)</td><td>Xms</td><td>Xms</td><td>Xms</td><td>Xms</td><td><span class="pill pill-good">Good</span></td></tr>
  </tbody>
</table>
</div>
<p class="section-note">INP thresholds: Good &lt; 200ms · Needs improvement 200–500ms · Poor &gt; 500ms.</p>

<h2>Delta vs Previous Run</h2>
<!-- If first run: show a note "First run — no previous data." -->
<div class="table-wrap">
<table>
  <thead><tr><th>Metric</th><th>Previous</th><th>Current</th><th>Delta</th></tr></thead>
  <tbody>
    <tr><td>Score</td><td>X</td><td>X</td><td class="delta-good">+X</td></tr>
    <!-- ... -->
  </tbody>
</table>
</div>

<h2>Notes</h2>
<div class="notes">
  <ul>
    <li>Observations about regressions, improvements, anomalies, or relevant context.</li>
  </ul>
</div>

</body>
</html>
```

---

## Important notes

- All steps are **sequential** — wait for each one to finish before starting the next
- Always build with `npm run build` (production), never `ng serve`
- Server must be on port 8080 with `-g` (gzip) and `-c-1` (no cache)
- Lighthouse headless inflates Speed Index and TTI — do not include them in the report
- DevTools trace has no throttling: use for relative comparison between routes and runs, not as absolute values
- **INP is measured via real interaction (Step 5b), not Lighthouse** — headless Lighthouse cannot generate the interaction events INP requires
- **TBT is collected both globally (Lighthouse, throttled) and per route (trace, unthrottled)** — they are not directly comparable; report both
- The `performance/` folder is committable and is not included in the Angular bundle (not under `assets`)
- Output files are `.html`, not `.md` — `latest.html` is always overwritten with the latest run
