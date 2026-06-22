---
name: perf-audit
description: Runs a full performance audit of VGC Multicalc (Lighthouse desktop + DevTools trace) and saves the result as an HTML report in performance/
---

# /perf-audit

Runs a full Lighthouse mobile audit (homepage only) for VGC Multicalc, Smogon Calc, and Nerd of Now. Generates an HTML report with side-by-side score donuts and detailed improvement items for VGC only.

**IMPORTANT:** All steps must be executed **sequentially**, never in parallel. Running Lighthouse simultaneously stresses the CPU and distorts results.

---

## Step 1 — Lighthouse mobile — VGC Multicalc

```bash
npx lighthouse https://vgcmulticalc.com --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-vgc.json --chrome-flags="--headless --no-sandbox --incognito"
```

Wait for completion before continuing.

---

## Step 2 — Lighthouse mobile — Smogon Calc

```bash
npx lighthouse https://calc.pokemonshowdown.com/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-smogon.json --chrome-flags="--headless --no-sandbox --incognito"
```

Wait for completion before continuing.

---

## Step 3 — Lighthouse mobile — Nerd of Now

```bash
npx lighthouse https://nerd-of-now.github.io/NCP-VGC-Damage-Calculator/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=/tmp/lh-ncp.json --chrome-flags="--headless --no-sandbox --incognito"
```

Wait for completion before continuing.

---

## Step 4 — Extract data and generate the report

```bash
python3 -c "
import json, sys

def load(path):
    with open(path) as f:
        return json.load(f)

vgc   = load('/tmp/lh-vgc.json')
smg   = load('/tmp/lh-smogon.json')
ncp   = load('/tmp/lh-ncp.json')

def score(d, cat):
    s = d['categories'].get(cat, {}).get('score')
    return round(s * 100) if s is not None else 'N/A'

def val(d, audit):
    a = d['audits'].get(audit, {})
    return a.get('displayValue', 'N/A')

def num_val(d, audit):
    a = d['audits'].get(audit, {})
    return a.get('numericValue')

sites = [
    ('VGC Multicalc', vgc),
    ('Smogon Calc', smg),
    ('Nerd of Now', ncp),
]

cats = ['performance', 'accessibility', 'best-practices', 'seo']

print('=== SCORES ===')
for name, d in sites:
    scores = {c: score(d, c) for c in cats}
    print(f'{name}: {scores}')

print()
print('=== VGC METRICS ===')
for m in ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','interactive']:
    print(f'{m}: {val(vgc, m)}')

print()
print('=== VGC OPPORTUNITIES (score < 1) ===')
for k, a in vgc['audits'].items():
    if a.get('score') is not None and a['score'] < 1 and a.get('details', {}).get('type') == 'opportunity':
        savings = a.get('details', {}).get('overallSavingsMs')
        desc = a.get('title', k)
        display = a.get('displayValue', '')
        print(f'  [{round(a[\"score\"]*100)}] {desc} | {display}' + (f' | savings: {round(savings)}ms' if savings else ''))

print()
print('=== VGC DIAGNOSTICS (score < 1, not opportunity) ===')
for k, a in vgc['audits'].items():
    if a.get('score') is not None and a['score'] < 1 and a.get('details', {}).get('type') != 'opportunity' and a.get('details'):
        desc = a.get('title', k)
        display = a.get('displayValue', '')
        print(f'  [{round(a[\"score\"]*100)}] {desc} | {display}')
"
```

Capture the full output — you will use it to fill the HTML report template in Step 7.

---

## Step 5 — Read previous report (if exists)

Find the most recent file in `performance/` (by date in filename) and extract VGC Multicalc score and key metrics from it to calculate deltas. If no previous file exists, skip the delta section.

---

## Step 6 — Generate the report

Create `performance/YYYY-MM-DD.html` (current date). If a file with that date already exists, add suffix `-2`, `-3`, etc.

---

## Report format

Output must be a **standalone HTML file** that opens correctly in a browser without a server (no external JS/CSS dependencies — all styles and scripts inline).

The report must be written entirely in **English**.

### Layout overview

```
┌─────────────────────────────────────────────────────────┐
│  Performance Audit — VGC Multicalc — YYYY-MM-DD         │
│  Date · Branch · Commit                                 │
├──────────────────┬──────────────────┬───────────────────┤
│  VGC Multicalc   │  Smogon Calc     │  Nerd of Now      │
│  ◯96  ◯70  ◯96  │  ◯xx  ◯xx  ◯xx  │  ◯xx  ◯xx  ◯xx   │
│  ◯92             │  ◯xx             │  ◯xx              │
│  Perf Acc BP SEO │                  │                   │
├─────────────────────────────────────────────────────────┤
│  Key Metrics — VGC Multicalc                            │
│  FCP · LCP · TBT · CLS · Speed Index · TTI             │
├─────────────────────────────────────────────────────────┤
│  Opportunities   (only VGC, items with score < 1)       │
│  Diagnostics     (only VGC, items with score < 1)       │
├─────────────────────────────────────────────────────────┤
│  Delta vs previous run                                  │
└─────────────────────────────────────────────────────────┘
```

### Score donuts

Each site column shows 4 SVG donut charts (Performance, Accessibility, Best Practices, SEO). Use inline SVG — no canvas, no external libs.

Donut spec:

- Circle: r=40, cx=50, cy=50, viewBox="0 0 100 100"
- Track (background ring): stroke-width=10, color #334155
- Arc (score ring): stroke-width=10, stroke-dasharray computed from score (circumference = 2π×40 ≈ 251.2), stroke-dashoffset = circumference × (1 - score/100), stroke-linecap=round
- Score number centered in the donut, font-size 22px, font-weight 700
- Label below the donut, font-size 11px, color #94a3b8
- Color: ≥90 → #4ade80, ≥50 → #facc15, <50 → #f87171 (applies to both arc and number)
- Transform: rotate(-90deg) on the arc circle so it starts at the top

Each site column has its site name as a header above the 4 donuts. The 4 donuts are arranged in a 2×2 grid inside the column.

### Key Metrics table (VGC only)

A simple table with columns: Metric | Value | Status (pill). Show FCP, LCP, TBT, CLS, Speed Index, TTI. Use pill colors:

- FCP: good <1.8s, mid <3s
- LCP: good <2.5s, mid <4s
- TBT: good <200ms, mid <600ms
- CLS: good <0.1, mid <0.25
- Speed Index: good <3.4s, mid <5.8s
- TTI: good <3.8s, mid <7.3s

### Opportunities section (VGC only)

List each opportunity audit where score < 1. Each item shows:

- Title
- Estimated savings (if available) as a badge
- Display value

Style: same dark card as the Chrome report — each item is a row with a warning icon (▲ for score=0, ◯ for score>0), title, and savings badge on the right.

### Diagnostics section (VGC only)

Same style as Opportunities. List each diagnostic audit where score < 1 and type is not "opportunity".

### Delta vs previous run

Table: Metric | Previous | Current | Delta. Include: Performance score, LCP, TBT, CLS. Delta colored green if improved, red if regressed.

If no previous data, show a note instead.

---

### Full HTML template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Performance Audit — VGC Multicalc — YYYY-MM-DD</title>
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #0f1117;
        color: #ffffff;
        line-height: 1.6;
        padding: 2rem;
        max-width: 1100px;
        margin: 0 auto;
      }
      h1 {
        font-size: 1.6rem;
        font-weight: 700;
        color: #f8fafc;
        margin-bottom: 0.25rem;
      }
      h2 {
        font-size: 0.75rem;
        font-weight: 600;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 2.5rem 0 1rem;
        border-bottom: 1px solid #334155;
        padding-bottom: 0.5rem;
      }
      .meta {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        margin: 0.5rem 0 2rem;
      }
      .meta span {
        font-size: 0.8rem;
        color: #64748b;
      }
      .meta strong {
        color: #94a3b8;
      }

      /* Score comparison grid */
      .score-comparison {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .site-column {
        background: #1e293b;
        border-radius: 12px;
        border: 1px solid #334155;
        padding: 1.25rem;
      }
      .site-column.highlight {
        border-color: #4ade80;
      }
      .site-name {
        font-size: 0.7rem;
        font-weight: 600;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 1rem;
        text-align: center;
      }
      .donuts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .donut-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .donut-label {
        font-size: 0.65rem;
        color: #64748b;
        text-align: center;
        letter-spacing: 0.03em;
      }

      /* Audit items (Opportunities & Diagnostics) */
      .audit-list {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      .audit-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.65rem 1rem;
        background: #0f1117;
        border-bottom: 1px solid #1e293b;
      }
      .audit-item:first-child {
        border-radius: 8px 8px 0 0;
      }
      .audit-item:last-child {
        border-radius: 0 0 8px 8px;
        border-bottom: none;
      }
      .audit-item:only-child {
        border-radius: 8px;
      }
      .audit-icon {
        font-size: 0.75rem;
        flex-shrink: 0;
      }
      .audit-icon.warn {
        color: #f87171;
      }
      .audit-icon.info {
        color: #94a3b8;
      }
      .audit-title {
        font-size: 0.85rem;
        color: #cbd5e1;
        flex: 1;
      }
      .audit-display {
        font-size: 0.8rem;
        color: #64748b;
      }
      .savings-badge {
        font-size: 0.7rem;
        font-weight: 600;
        color: #fb923c;
        background: #431407;
        border-radius: 999px;
        padding: 0.15rem 0.5rem;
        white-space: nowrap;
      }

      /* Metrics table */
      .table-wrap {
        overflow-x: auto;
        margin-bottom: 1rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.85rem;
      }
      thead tr {
        background: #1e293b;
      }
      th {
        padding: 0.6rem 1rem;
        text-align: left;
        color: #94a3b8;
        font-weight: 600;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        white-space: nowrap;
      }
      td {
        padding: 0.6rem 1rem;
        border-bottom: 1px solid #1e293b;
        color: #cbd5e1;
      }
      tr:last-child td {
        border-bottom: none;
      }

      /* Pills */
      .pill {
        display: inline-block;
        padding: 0.15rem 0.5rem;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 600;
      }
      .pill-good {
        background: #14532d;
        color: #4ade80;
      }
      .pill-mid {
        background: #713f12;
        color: #facc15;
      }
      .pill-bad {
        background: #450a0a;
        color: #f87171;
      }

      /* Delta */
      .delta-good {
        color: #4ade80;
        font-weight: 600;
      }
      .delta-bad {
        color: #f87171;
        font-weight: 600;
      }
      .delta-neu {
        color: #64748b;
      }

      .section-note {
        font-size: 0.78rem;
        color: #475569;
        margin-bottom: 1rem;
        font-style: italic;
      }
      .empty-note {
        font-size: 0.85rem;
        color: #475569;
        padding: 1rem;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Performance Audit — VGC Multicalc</h1>
    <div class="meta">
      <span><strong>Date:</strong> YYYY-MM-DD</span>
      <span><strong>Branch:</strong> branch-name</span>
      <span><strong>Commit:</strong> abc1234 — commit message</span>
      <span><strong>Mode:</strong> Lighthouse Mobile · Throttled</span>
    </div>

    <h2>Lighthouse Scores</h2>
    <div class="score-comparison">
      <!-- Repeat for each site. VGC column gets class "highlight" -->
      <div class="site-column highlight">
        <div class="site-name">VGC Multicalc</div>
        <div class="donuts-grid">
          <!-- 4 donuts: Performance, Accessibility, Best Practices, SEO -->
          <!-- Use inline SVG per spec above -->
        </div>
      </div>
      <div class="site-column">
        <div class="site-name">Smogon Calc</div>
        <div class="donuts-grid"><!-- donuts --></div>
      </div>
      <div class="site-column">
        <div class="site-name">Nerd of Now</div>
        <div class="donuts-grid"><!-- donuts --></div>
      </div>
    </div>

    <h2>Key Metrics — VGC Multicalc</h2>
    <p class="section-note">Desktop, no throttling. Thresholds follow Core Web Vitals and Lighthouse desktop targets.</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Description</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <!-- One row per metric with pill status -->
        </tbody>
      </table>
    </div>

    <h2>Opportunities — VGC Multicalc</h2>
    <p class="section-note">Audits where improvements would directly reduce load time.</p>
    <div class="audit-list">
      <!-- One .audit-item per opportunity with score < 1 -->
      <!-- Icon: ▲ (warn) for score=0, ◯ (info) for 0<score<1 -->
    </div>

    <h2>Diagnostics — VGC Multicalc</h2>
    <p class="section-note">Additional information about page performance that does not directly map to a metric.</p>
    <div class="audit-list">
      <!-- One .audit-item per diagnostic with score < 1 -->
    </div>

    <h2>Delta vs Previous Run</h2>
    <!-- Note: "First run — no previous data." if no prior file -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Previous</th>
            <th>Current</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          <!-- Score, LCP, TBT, CLS -->
        </tbody>
      </table>
    </div>
  </body>
</html>
```

---

## Important notes

- All steps are **sequential** — wait for each one to finish before starting the next
- `--form-factor=mobile --only-categories=performance,accessibility,best-practices,seo` runs all 4 categories with mobile CPU/network throttling — matches what Google PageSpeed Insights and Core Web Vitals measure. Do NOT use `--preset=perf` as it omits accessibility/best-practices/seo.
- Always audit the production URL `https://vgcmulticalc.com` — no local build needed
- The `performance/` folder is committable and is not included in the Angular bundle (not under `assets`)
- Output files are `.html` — if a file with today's date exists, suffix with `-2`, `-3`, etc.
- **Never run Cypress tests** — user handles E2E testing
- Delta section compares against the most recent previous `.html` file in `performance/` — parse the previous file to extract the VGC scores/metrics embedded in it
