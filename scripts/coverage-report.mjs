import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs"
import { join } from "path"

const ROOT = process.cwd()
const SUMMARY_PATH = join(ROOT, "coverage/vgc-multicalc/coverage-summary.json")
const FINAL_PATH = join(ROOT, "coverage/vgc-multicalc/coverage-final.json")
const OUTPUT_PATH = join(ROOT, "coverage/vgc-multicalc/dashboard.html")
const DETAIL_DIR = join(ROOT, "coverage/vgc-multicalc/files")

const summary = JSON.parse(readFileSync(SUMMARY_PATH, "utf-8"))
const { total, ...files } = summary
const finalCoverage = existsSync(FINAL_PATH) ? JSON.parse(readFileSync(FINAL_PATH, "utf-8")) : null

const LAYERS = [
  { key: "app", label: "App", match: p => p.includes("/src/app/") },
  { key: "domain", label: "Domain", match: p => p.includes("/src/domain/") },
  { key: "infrastructure", label: "Infrastructure", match: p => p.includes("/src/infrastructure/") },
  { key: "other", label: "Other", match: () => true }
]

function relativePath(absolutePath) {
  const idx = absolutePath.indexOf("/src/")

  return idx >= 0 ? absolutePath.slice(idx + 1) : absolutePath
}

function slugForPath(relPath) {
  return relPath.replace(/[/\\]/g, "__").replace(/\.ts$/, "") + ".html"
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function computeLineCoverage(entry) {
  const lineStatementHits = new Map()

  for (const key of Object.keys(entry.statementMap)) {
    const { line } = entry.statementMap[key].start
    const hits = entry.s[key]
    const current = lineStatementHits.get(line)

    lineStatementHits.set(line, current === undefined ? hits : Math.min(current, hits))
  }

  const lineBranchStatus = new Map()

  for (const key of Object.keys(entry.branchMap)) {
    const { line } = entry.branchMap[key].loc
    const hitCounts = entry.b[key]
    const hasHit = hitCounts.some(h => h > 0)
    const hasMiss = hitCounts.some(h => h === 0)

    if (hasMiss && hasHit) lineBranchStatus.set(line, "partial")
    else if (hasMiss && !lineBranchStatus.has(line)) lineBranchStatus.set(line, lineBranchStatus.get(line) === "partial" ? "partial" : "miss")
  }

  return { lineStatementHits, lineBranchStatus }
}

function classifyLine(lineNumber, lineStatementHits, lineBranchStatus) {
  const branchStatus = lineBranchStatus.get(lineNumber)

  if (branchStatus === "partial") return "partial"

  if (!lineStatementHits.has(lineNumber)) return branchStatus === "miss" ? "miss" : "neutral"

  const hits = lineStatementHits.get(lineNumber)

  if (hits === 0) return "miss"
  if (branchStatus === "miss") return "partial"

  return "hit"
}

function buildDetailPage(relPath, entry) {
  let source

  try {
    source = readFileSync(join(ROOT, relPath), "utf-8")
  } catch {
    return null
  }

  const { lineStatementHits, lineBranchStatus } = computeLineCoverage(entry)
  const lines = source.split("\n")

  const rows = lines
    .map((lineText, idx) => {
      const lineNumber = idx + 1
      const status = classifyLine(lineNumber, lineStatementHits, lineBranchStatus)

      return `<tr class="line-${status}"><td class="line-no">${lineNumber}</td><td class="line-code"><pre>${escapeHtml(lineText) || " "}</pre></td></tr>`
    })
    .join("")

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${relPath} — Coverage Detail</title>
<style>
  :root {
    --bg: #0d1117;
    --bg-elevated: #161b22;
    --border: #2a3038;
    --text: #e6edf3;
    --text-muted: #8b949e;
    --hit: rgba(63, 185, 80, 0.12);
    --miss: rgba(248, 81, 73, 0.16);
    --partial: rgba(210, 153, 34, 0.16);
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 24px;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
  }

  h1 { font-size: 15px; font-family: ui-monospace, "SF Mono", Consolas, monospace; font-weight: 600; margin: 0 0 4px; }

  .back { color: var(--text-muted); font-size: 12.5px; text-decoration: none; }
  .back:hover { color: var(--text); }

  .legend { margin: 12px 0 20px; font-size: 12px; color: var(--text-muted); display: flex; gap: 16px; }
  .legend span { display: inline-flex; align-items: center; gap: 6px; }
  .legend i { width: 10px; height: 10px; border-radius: 2px; display: inline-block; }
  .legend .hit i { background: var(--hit); border: 1px solid rgba(63, 185, 80, 0.5); }
  .legend .partial i { background: var(--partial); border: 1px solid rgba(210, 153, 34, 0.5); }
  .legend .miss i { background: var(--miss); border: 1px solid rgba(248, 81, 73, 0.5); }

  table { border-collapse: collapse; width: 100%; font-family: ui-monospace, "SF Mono", Consolas, monospace; font-size: 12.5px; }

  td.line-no { color: var(--text-muted); text-align: right; padding: 0 14px; user-select: none; width: 50px; border-right: 1px solid var(--border); }
  td.line-code { padding: 0 14px; white-space: pre; }
  td.line-code pre { margin: 0; white-space: pre; }

  tr.line-hit { background: var(--hit); }
  tr.line-miss { background: var(--miss); }
  tr.line-partial { background: var(--partial); }
</style>
</head>
<body>

<a class="back" href="../dashboard.html">← Back to dashboard</a>
<h1>${relPath}</h1>

<div class="legend">
  <span class="hit"><i></i>Covered</span>
  <span class="partial"><i></i>Partially covered (branch)</span>
  <span class="miss"><i></i>Not covered</span>
</div>

<table>
${rows}
</table>

</body>
</html>`
}

function layerFor(path) {
  return LAYERS.find(layer => layer.match(path)).key
}

const SCORE_METRICS = ["lines", "branches", "functions", "statements"]

function weakestMetric(fileMetrics) {
  return SCORE_METRICS.reduce((weakest, key) => (fileMetrics[key].pct < fileMetrics[weakest].pct ? key : weakest), SCORE_METRICS[0])
}

const fileEntries = Object.entries(files).map(([absPath, metrics]) => {
  const weakest = weakestMetric(metrics)

  return {
    absPath,
    path: relativePath(absPath),
    layer: layerFor(absPath),
    metrics,
    weakestMetricKey: weakest,
    weakestMetricPct: metrics[weakest].pct
  }
})

const layerTotals = LAYERS.map(layer => {
  const layerFiles = fileEntries.filter(f => f.layer === layer.key)
  const sum = key => layerFiles.reduce((acc, f) => acc + f.metrics[key].covered, 0)
  const sumTotal = key => layerFiles.reduce((acc, f) => acc + f.metrics[key].total, 0)

  const pct = key => (sumTotal(key) === 0 ? 100 : (100 * sum(key)) / sumTotal(key))

  return {
    ...layer,
    fileCount: layerFiles.length,
    lines: pct("lines"),
    branches: pct("branches"),
    functions: pct("functions"),
    statements: pct("statements")
  }
}).filter(l => l.fileCount > 0)

const worstFiles = [...fileEntries].sort((a, b) => a.weakestMetricPct - b.weakestMetricPct).slice(0, 15)

function pctClass(pct) {
  if (pct >= 90) return "good"
  if (pct >= 75) return "warn"

  return "bad"
}

function bar(pct) {
  return `<div class="bar"><div class="bar-fill ${pctClass(pct)}" style="width:${pct.toFixed(1)}%"></div></div>`
}

function fmt(pct) {
  return `${pct.toFixed(1)}%`
}

const layerCardsHtml = layerTotals
  .map(
    l => `
  <div class="layer-card">
    <div class="layer-card-header">
      <span class="layer-name">${l.label}</span>
      <span class="layer-count">${l.fileCount} files</span>
    </div>
    <div class="metric-row"><span>Lines</span>${bar(l.lines)}<span class="pct ${pctClass(l.lines)}">${fmt(l.lines)}</span></div>
    <div class="metric-row"><span>Branches</span>${bar(l.branches)}<span class="pct ${pctClass(l.branches)}">${fmt(l.branches)}</span></div>
    <div class="metric-row"><span>Functions</span>${bar(l.functions)}<span class="pct ${pctClass(l.functions)}">${fmt(l.functions)}</span></div>
    <div class="metric-row"><span>Statements</span>${bar(l.statements)}<span class="pct ${pctClass(l.statements)}">${fmt(l.statements)}</span></div>
  </div>`
  )
  .join("")

if (finalCoverage && !existsSync(DETAIL_DIR)) mkdirSync(DETAIL_DIR, { recursive: true })

function detailLinkFor(f) {
  if (!finalCoverage) return null

  const entry = finalCoverage[f.absPath]

  if (!entry) return null

  const page = buildDetailPage(f.path, entry)

  if (!page) return null

  const slug = slugForPath(f.path)

  writeFileSync(join(DETAIL_DIR, slug), page)

  return `files/${slug}`
}

function fileRow(f, metricKey, showMetricLabel) {
  const m = f.metrics[metricKey]
  const metricLabel = showMetricLabel ? `<div class="metric-label">${metricKey}</div>` : ""
  const detailLink = detailLinkFor(f)
  const pathCell = detailLink ? `<a class="path-link" href="${detailLink}" title="${f.path}">${f.path}</a>` : f.path

  return `<tr>
    <td class="path" title="${f.path}">${pathCell}</td>
    <td class="layer-cell"><span class="tag tag-${f.layer}">${f.layer}</span></td>
    <td class="metric-cell">${metricLabel}${bar(m.pct)}</td>
    <td class="pct ${pctClass(m.pct)}">${fmt(m.pct)}</td>
  </tr>`
}

const worstFilesHtml = worstFiles.map(f => fileRow(f, f.weakestMetricKey, true)).join("")

const generatedAt = new Date().toLocaleString("en-US")

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Coverage Dashboard — VGC Multicalc</title>
<style>
  :root {
    --bg: #0d1117;
    --bg-elevated: #161b22;
    --bg-card: #1c2129;
    --border: #2a3038;
    --text: #e6edf3;
    --text-muted: #8b949e;
    --good: #3fb950;
    --warn: #d29922;
    --bad: #f85149;
    --accent: #58a6ff;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    padding: 32px;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
  }

  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 16px; margin: 40px 0 14px; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 8px; }

  .subtitle { color: var(--text-muted); margin: 0 0 28px; font-size: 13px; }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 8px;
  }

  .summary-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 18px;
  }

  .summary-card .label { color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
  .summary-card .value { font-size: 30px; font-weight: 600; }
  .summary-card .detail { color: var(--text-muted); font-size: 12px; margin-top: 4px; }

  .value.good { color: var(--good); }
  .value.warn { color: var(--warn); }
  .value.bad { color: var(--bad); }

  .layer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .layer-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 18px;
  }

  .layer-card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
  }

  .layer-name { font-weight: 600; }
  .layer-count { color: var(--text-muted); font-size: 12px; }

  .metric-row {
    display: grid;
    grid-template-columns: 80px 1fr 50px;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--text-muted);
  }

  .bar {
    background: var(--bg-elevated);
    border-radius: 4px;
    height: 6px;
    overflow: hidden;
  }

  .bar-fill { height: 100%; border-radius: 4px; }
  .bar-fill.good { background: var(--good); }
  .bar-fill.warn { background: var(--warn); }
  .bar-fill.bad { background: var(--bad); }

  .pct { font-weight: 600; text-align: center; }
  .pct.good { color: var(--good); }
  .pct.warn { color: var(--warn); }
  .pct.bad { color: var(--bad); }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  table col.col-file { width: auto; }
  table col.col-layer { width: 220px; }
  table col.col-metric { width: 220px; }
  table col.col-covered { width: 220px; }

  th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    padding: 10px 24px;
    border-bottom: 1px solid var(--border);
  }

  th.th-center {
    text-align: center;
  }

  td {
    padding: 9px 24px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg-elevated); }

  td.path { font-family: ui-monospace, "SF Mono", Consolas, monospace; font-size: 12.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .path-link { color: inherit; text-decoration: none; }
  .path-link:hover { color: var(--accent); text-decoration: underline; }
  td.muted { color: var(--text-muted); font-size: 12px; text-align: right; }
  td.layer-cell { text-align: center; }

  td.metric-cell { text-align: center; }
  td.metric-cell .bar { display: inline-block; width: 100px; }
  td.metric-cell .metric-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 4px; }

  .tag {
    display: inline-block;
    font-size: 10.5px;
    padding: 2px 7px;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .tag-domain { background: #1f3a2e; color: var(--good); }
  .tag-app { background: #1f2b3a; color: var(--accent); }
  .tag-infrastructure { background: #3a2f1f; color: var(--warn); }
  .tag-other { background: #2a2a2a; color: var(--text-muted); }

  footer { margin-top: 40px; color: var(--text-muted); font-size: 12px; }

  @media (max-width: 900px) {
    .summary-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
</head>
<body>

<h1>Coverage Dashboard</h1>
<p class="subtitle">VGC Multicalc · generated on ${generatedAt}</p>

<div class="summary-grid">
  <div class="summary-card">
    <div class="label">Lines</div>
    <div class="value ${pctClass(total.lines.pct)}">${fmt(total.lines.pct)}</div>
    <div class="detail">${total.lines.covered} / ${total.lines.total}</div>
  </div>
  <div class="summary-card">
    <div class="label">Branches</div>
    <div class="value ${pctClass(total.branches.pct)}">${fmt(total.branches.pct)}</div>
    <div class="detail">${total.branches.covered} / ${total.branches.total}</div>
  </div>
  <div class="summary-card">
    <div class="label">Functions</div>
    <div class="value ${pctClass(total.functions.pct)}">${fmt(total.functions.pct)}</div>
    <div class="detail">${total.functions.covered} / ${total.functions.total}</div>
  </div>
  <div class="summary-card">
    <div class="label">Statements</div>
    <div class="value ${pctClass(total.statements.pct)}">${fmt(total.statements.pct)}</div>
    <div class="detail">${total.statements.covered} / ${total.statements.total}</div>
  </div>
</div>

<h2>Coverage by layer</h2>
<div class="layer-grid">
  ${layerCardsHtml}
</div>

<h2>Files with lowest overall coverage (top 15)</h2>
<table>
  <colgroup><col class="col-file" /><col class="col-layer" /><col class="col-metric" /><col class="col-covered" /></colgroup>
  <thead><tr><th>File</th><th class="th-center">Layer</th><th class="th-center">Weakest metric</th><th class="th-center">Covered</th></tr></thead>
  <tbody>${worstFilesHtml}</tbody>
</table>

<footer>Generated from coverage-summary.json</footer>

</body>
</html>`

writeFileSync(OUTPUT_PATH, html)

console.log(`\nDashboard generated at file://${OUTPUT_PATH}\n`)
