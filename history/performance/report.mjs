export function renderReport(snapshot) {
  const { date, git, current, baseline } = snapshot

  const delta = (cur, base) => {
    const d = ((cur - base) / base) * 100
    const sign = d >= 0 ? "+" : ""
    const cls = d > 2 ? "bad" : d < -2 ? "good" : "flat"
    return `<span class="delta ${cls}">${sign}${d.toFixed(1)}%</span>`
  }

  const row = (label, cur, base, unit) => `
    <tr>
      <td class="metric">${label}</td>
      <td class="num">${cur}${unit}</td>
      <td class="num muted">${base}${unit}</td>
      <td class="num">${delta(cur, base)}</td>
    </tr>`

  const heapRow = `
    <tr>
      <td class="metric">Heap Δ</td>
      <td class="num">${current.heapDeltaMB} MB</td>
      <td class="num muted">${baseline.heapDeltaMB} MB</td>
      <td class="num">${delta(current.heapDeltaMB, baseline.heapDeltaMB)}</td>
    </tr>`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calc Performance — ${date}</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #0f1117; color: #e2e8f0; line-height: 1.6;
        padding: 2rem; max-width: 760px;
      }
      h1 { font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.25rem; }
      .subtitle { font-size: 0.8rem; color: #64748b; margin-bottom: 2rem; }
      .meta { font-size: 0.78rem; color: #94a3b8; margin-bottom: 2rem; }
      .meta code { color: #7dd3fc; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
      th {
        text-align: left; font-size: 0.72rem; text-transform: uppercase;
        letter-spacing: 0.05em; color: #64748b; font-weight: 600;
        padding: 0.5rem 0.75rem; border-bottom: 1px solid #1e293b;
      }
      th.num { text-align: right; }
      td { padding: 0.65rem 0.75rem; border-bottom: 1px solid #161b26; font-size: 0.9rem; }
      td.metric { color: #cbd5e1; font-weight: 500; }
      td.num { text-align: right; font-variant-numeric: tabular-nums; }
      td.muted, .muted { color: #64748b; }
      .delta { font-weight: 700; font-variant-numeric: tabular-nums; }
      .delta.good { color: #4ade80; }
      .delta.bad { color: #f87171; }
      .delta.flat { color: #64748b; }
      .note {
        font-size: 0.75rem; color: #64748b; margin-top: 1.5rem;
        border-left: 2px solid #1e293b; padding-left: 0.75rem;
      }
    </style>
  </head>
  <body>
    <h1>Calc Engine Performance</h1>
    <p class="subtitle">Damage calc functions — execution time &amp; memory</p>
    <p class="meta">
      Run <strong>${date}</strong> · branch <code>${git.branch}</code> · commit <code>${git.commit}</code><br />
      Current: ${current.source} · Baseline: ${baseline.source}
    </p>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th class="num">Current</th>
          <th class="num">Baseline</th>
          <th class="num">Δ</th>
        </tr>
      </thead>
      <tbody>
        ${row("calculate — ns/call", current.single.nsPerCall, baseline.single.nsPerCall, " ns")}
        ${row("calculate — total", current.single.totalMs, baseline.single.totalMs, " ms")}
        ${row("calculateMulti — ns/call", current.multi.nsPerCall, baseline.multi.nsPerCall, " ns")}
        ${row("calculateMulti — total", current.multi.totalMs, baseline.multi.totalMs, " ms")}
        ${heapRow}
      </tbody>
    </table>
    <p class="note">
      ${current.single.iterations.toLocaleString()} single-target and
      ${current.multi.iterations.toLocaleString()} multi-target iterations, cycling through
      ${"" + SINGLE_COUNT} single / ${MULTI_COUNT} multi scenarios. Δ &lt; 0 is faster.
      Green = faster than baseline, red = slower (&gt;2% threshold).
    </p>
  </body>
</html>`
}

import { SINGLE_SCENARIOS, MULTI_SCENARIOS } from "./scenarios.mjs"
const SINGLE_COUNT = SINGLE_SCENARIOS.length
const MULTI_COUNT = MULTI_SCENARIOS.length
