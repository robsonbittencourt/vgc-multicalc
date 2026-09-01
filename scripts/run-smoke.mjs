import cypress from "cypress"
import { execSync } from "node:child_process"

const GREEN = "\x1b[32m"
const RED = "\x1b[31m"
const GREY = "\x1b[90m"
const BOLD = "\x1b[1m"
const RESET = "\x1b[0m"

const specs = execSync("grep -rl 'smoke(' cypress/e2e --include=*.cy.ts", { encoding: "utf8" }).trim().split("\n").filter(Boolean)

if (specs.length === 0) {
  console.error("No spec tagged with smoke() was found.")
  process.exit(1)
}

const results = await cypress.run({
  quiet: true,
  spec: specs.join(","),
  config: { expose: { smoke: true } }
})

if (results.status === "failed") {
  console.error(`\n${RED}Could not start the smoke run: ${results.message}${RESET}\n`)
  process.exit(1)
}

printReport(results)

function printReport(run) {
  const line = "─".repeat(72)

  console.log(`\n${BOLD}Smoke report${RESET}`)
  console.log(GREY + line + RESET)

  for (const spec of run.runs) {
    for (const test of spec.tests) {
      const name = test.title.join(" › ").replace(" [smoke]", "")
      const failed = test.state === "failed"
      const mark = failed ? `${RED}✗${RESET}` : `${GREEN}✓${RESET}`
      const time = `${GREY}${formatDuration(test.duration ?? 0)}${RESET}`

      console.log(`${mark} ${name} ${time}`)
      console.log(`${GREY}    ${spec.spec.relative}${RESET}`)

      if (failed) console.log(`${RED}    ${firstLine(test.displayError)}${RESET}`)
    }
  }

  console.log(GREY + line + RESET)

  const passed = run.totalPassed
  const failed = run.totalFailed
  const summary = failed > 0 ? `${RED}${failed} failing${RESET}, ${passed} passing` : `${GREEN}${passed} passing${RESET}`

  console.log(`${BOLD}${summary}${RESET} ${GREY}in ${specs.length} specs, ${formatDuration(run.totalDuration)}${RESET}\n`)

  if (failed > 0) process.exit(1)
}

function formatDuration(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
}

function firstLine(error) {
  return (error ?? "").split("\n")[0]
}
