import { build } from "esbuild"
import { fileURLToPath, pathToFileURL } from "node:url"
import { dirname, resolve, join } from "node:path"
import { readdirSync, readFileSync, writeFileSync, mkdtempSync, existsSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { performance } from "node:perf_hooks"
import { execSync } from "node:child_process"

import { ITERATIONS, MULTI_ITERATIONS, SINGLE_SCENARIOS, MULTI_SCENARIOS } from "./scenarios.mjs"
import { renderReport } from "./report.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, "..", "..")

const ALIASES = {
  "@calc": resolve(projectRoot, "src/lib/calc/index.ts"),
  "@lib/": resolve(projectRoot, "src/lib/") + "/",
  "@data/": resolve(projectRoot, "src/data/") + "/",
  "@configuration/": resolve(projectRoot, "src/configuration/") + "/",
  "@vgc-types/": resolve(projectRoot, "src/types/") + "/",
  "@store/": resolve(projectRoot, "src/store/") + "/"
}

function resolveFile(base) {
  const candidates = [base, base + ".ts", base + ".tsx", base + ".js", base + ".mjs", join(base, "index.ts"), join(base, "index.js")]
  for (const c of candidates) {
    if (existsSync(c) && statSync(c).isFile()) return c
  }
  return base
}

const aliasPlugin = {
  name: "vgc-aliases",
  setup(b) {
    b.onResolve({ filter: /^@(calc|lib|data|configuration|vgc-types|store)(\/|$)/ }, args => {
      if (args.path === "@calc") return { path: ALIASES["@calc"] }
      for (const [prefix, target] of Object.entries(ALIASES)) {
        if (prefix.endsWith("/") && args.path.startsWith(prefix)) {
          return { path: resolveFile(target + args.path.slice(prefix.length)) }
        }
      }
      return null
    })
  }
}

async function loadVendoredCalc() {
  const outdir = mkdtempSync(join(tmpdir(), "vgc-perf-"))
  const outfile = join(outdir, "calc.mjs")
  await build({
    entryPoints: [ALIASES["@calc"]],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    plugins: [aliasPlugin],
    logLevel: "silent"
  })
  return import(pathToFileURL(outfile).href)
}

function vendoredAdapter(calc) {
  const { Pokemon, Move, Field, calculate, calculateMulti } = calc
  return {
    single(s) {
      const a = new Pokemon(s.attacker, s.attackerOpts)
      const d = new Pokemon(s.defender)
      const m = new Move(s.move)
      const f = new Field()
      return () => calculate(a, d, m, f)
    },
    multi(s) {
      const attackers = s.attackers.map(x => new Pokemon(x.name, x.opts))
      const moves = s.attackers.map(x => new Move(x.move))
      const d = new Pokemon(s.defender)
      const f = new Field()
      return () => calculateMulti(attackers, d, moves, f)
    }
  }
}

function measure(adapter) {
  const singleCalls = SINGLE_SCENARIOS.map(s => adapter.single(s))
  const multiCalls = MULTI_SCENARIOS.map(s => adapter.multi(s))

  for (let i = 0; i < 2000; i++) singleCalls[i % singleCalls.length]()
  for (let i = 0; i < 500; i++) multiCalls[i % multiCalls.length]()

  if (global.gc) global.gc()
  const heapBefore = process.memoryUsage().heapUsed

  const tSingle0 = performance.now()
  for (let i = 0; i < ITERATIONS; i++) singleCalls[i % singleCalls.length]()
  const singleMs = performance.now() - tSingle0

  const tMulti0 = performance.now()
  for (let i = 0; i < MULTI_ITERATIONS; i++) multiCalls[i % multiCalls.length]()
  const multiMs = performance.now() - tMulti0

  const heapAfter = process.memoryUsage().heapUsed

  return {
    single: { iterations: ITERATIONS, totalMs: round(singleMs), nsPerCall: round((singleMs * 1e6) / ITERATIONS) },
    multi: { iterations: MULTI_ITERATIONS, totalMs: round(multiMs), nsPerCall: round((multiMs * 1e6) / MULTI_ITERATIONS) },
    heapDeltaMB: round((heapAfter - heapBefore) / 1024 / 1024, 2)
  }
}

const round = (n, d = 1) => Number(n.toFixed(d))

function gitInfo() {
  const run = c => {
    try {
      return execSync(c, { cwd: projectRoot }).toString().trim()
    } catch {
      return "unknown"
    }
  }
  return { branch: run("git rev-parse --abbrev-ref HEAD"), commit: run("git rev-parse --short HEAD") }
}

function previousSnapshot(currentDate) {
  const all = readdirSync(__dirname)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
  const earlier = all.filter(f => f !== `${currentDate}.json`)
  const pick = earlier.length > 0 ? earlier[earlier.length - 1] : all[all.length - 1]
  if (!pick) return null
  return JSON.parse(readFileSync(join(__dirname, pick), "utf8"))
}

async function main() {
  console.log("Bundling vendored calc…")
  const vendored = await loadVendoredCalc()

  console.log("Measuring vendored calc…")
  const current = measure(vendoredAdapter(vendored))

  const now = new Date()
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

  const prev = previousSnapshot(date)

  if (!prev) {
    console.error("No previous snapshot to compare against. The first snapshot (2026-07-03) is the baseline — restore it or a later one before running.")
    process.exit(1)
  }

  console.log(`Comparing against previous run: ${prev.date} (${prev.git?.commit ?? "?"})`)
  const baseline = { ...prev.current, source: `previous run — ${prev.date}` }

  const snapshot = { date, git: gitInfo(), current: { ...current, source: "vendored calc (this branch)" }, baseline }

  const jsonPath = join(__dirname, `${date}.json`)
  writeFileSync(jsonPath, JSON.stringify(snapshot, null, 2))
  console.log(`Wrote ${jsonPath}`)

  const htmlPath = join(__dirname, `${date}.html`)
  writeFileSync(htmlPath, renderReport(snapshot))
  console.log(`Wrote ${htmlPath}`)

  writeChangelog()

  printSummary(snapshot)
}

function writeChangelog() {
  const snaps = readdirSync(__dirname)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort()
    .reverse()
    .map(f => JSON.parse(readFileSync(join(__dirname, f), "utf8")))

  const pct = (cur, base) => {
    const d = ((cur - base) / base) * 100
    const cls = d > 2 ? "bad" : d < -2 ? "good" : "flat"
    return `<span class="delta ${cls}">${d >= 0 ? "+" : ""}${d.toFixed(1)}%</span>`
  }

  const rows = snaps
    .map(
      s => `
    <div class="day">
      <div class="day-header">
        <span class="day-date"><a href="${s.date}.html">${s.date}</a></span>
        <span class="day-meta">branch: ${s.git.branch} · commit: ${s.git.commit}</span>
      </div>
      <p class="entry">
        <code>calculate</code> ${s.current.single.nsPerCall} ns/call ${pct(s.current.single.nsPerCall, s.baseline.single.nsPerCall)} ·
        <code>calculateMulti</code> ${s.current.multi.nsPerCall} ns/call ${pct(s.current.multi.nsPerCall, s.baseline.multi.nsPerCall)}
        <span class="muted">vs ${s.baseline.source}</span>
      </p>
    </div>`
    )
    .join("")

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calc Performance Changelog — VGC Multicalc</title>
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0f1117; color: #e2e8f0; line-height: 1.6; padding: 2rem; max-width: 760px; }
      h1 { font-size: 1.5rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.25rem; }
      .subtitle { font-size: 0.8rem; color: #64748b; margin-bottom: 2.5rem; }
      .day { margin-bottom: 1.75rem; }
      .day-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.35rem; }
      .day-date { font-size: 1.05rem; font-weight: 800; }
      .day-date a { color: #f8fafc; text-decoration: none; }
      .day-date a:hover { color: #7dd3fc; }
      .day-meta { font-size: 0.75rem; color: #64748b; }
      .entry { font-size: 0.85rem; color: #cbd5e1; }
      .entry code { color: #7dd3fc; }
      .muted { color: #64748b; }
      .delta { font-weight: 700; font-variant-numeric: tabular-nums; }
      .delta.good { color: #4ade80; }
      .delta.bad { color: #f87171; }
      .delta.flat { color: #64748b; }
    </style>
  </head>
  <body>
    <h1>Calc Performance Changelog</h1>
    <p class="subtitle">History of calc engine benchmarks. The first run compares against the damage-calc package the calc was vendored from; later runs against the previous run.</p>
    ${rows}
  </body>
</html>`

  writeFileSync(join(__dirname, "CHANGELOG.html"), html)
  console.log(`Wrote ${join(__dirname, "CHANGELOG.html")}`)
}

function printSummary({ current, baseline }) {
  const pct = (cur, base) => {
    const d = ((cur - base) / base) * 100
    return `${d >= 0 ? "+" : ""}${d.toFixed(1)}%`
  }
  console.log("\n  metric                current      baseline     Δ")
  console.log(`  single ns/call        ${pad(current.single.nsPerCall)} ${pad(baseline.single.nsPerCall)} ${pct(current.single.nsPerCall, baseline.single.nsPerCall)}`)
  console.log(`  multi  ns/call        ${pad(current.multi.nsPerCall)} ${pad(baseline.multi.nsPerCall)} ${pct(current.multi.nsPerCall, baseline.multi.nsPerCall)}`)
  console.log(`  heap Δ MB             ${pad(current.heapDeltaMB)} ${pad(baseline.heapDeltaMB)}`)
  console.log(`\n  baseline = ${baseline.source}`)
}

const pad = v => String(v).padEnd(12)

main().catch(err => {
  console.error(err)
  process.exit(1)
})
