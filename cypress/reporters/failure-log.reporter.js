"use strict"

const fs = require("fs")
const path = require("path")

const Base = require("mocha/lib/reporters/base")
const constants = require("mocha/lib/runner").constants

const { EVENT_TEST_FAIL, EVENT_TEST_PASS, EVENT_TEST_RETRY, EVENT_RUN_END, EVENT_SUITE_BEGIN } = constants

const logsPath = path.join(process.cwd(), "failure-logs")
const runId = process.env.E2E_RUN_ID
const historyRoot = path.join(process.cwd(), "e2e-history")

module.exports = FailureLogReporter

function FailureLogReporter(runner, options) {
  Base.call(this, runner, options)

  const entries = []
  const durations = []
  const tests = []
  let specFile = null

  runner.on(EVENT_SUITE_BEGIN, suite => {
    if (!specFile && suite.file) specFile = suite.file
  })

  runner.on(EVENT_TEST_PASS, test => {
    const retries = previousFailures(test).length

    durations.push({ title: test.fullTitle(), duration: test.duration, retries })
    tests.push(buildOutcome(test, retries > 0 ? "flaky" : "passed"))
  })

  runner.on(EVENT_TEST_RETRY, (test, err) => {
    entries.push(buildEntry(test, err, "retry", previousFailures(test).length))
  })

  runner.on(EVENT_TEST_FAIL, (test, err) => {
    entries.push(buildEntry(test, err, "fail", previousFailures(test).length))
    tests.push(buildOutcome(test, "failed"))
  })

  function previousFailures(test) {
    const title = titleOf(test)

    return entries.filter(entry => entry.title === title)
  }

  function buildOutcome(test, outcome) {
    const failures = previousFailures(test)
    const firstFailure = failures[0]

    return {
      title: titleOf(test),
      outcome,
      attempts: outcome === "failed" ? failures.length : failures.length + 1,
      duration: test.duration,
      error: firstFailure ? truncate(firstFailure.message, 300) : undefined,
      errorAt: firstFailure && firstFailure.codeFrame ? `${firstFailure.codeFrame.file}:${firstFailure.codeFrame.line}` : undefined
    }
  }

  runner.on(EVENT_RUN_END, () => {
    if (!specFile) return

    writeLog({
      runId,
      file: specFile,
      startedAt: runner.stats && runner.stats.start,
      endedAt: runner.stats && runner.stats.end,
      stats: runner.stats,
      slowestPassing: durations.sort((a, b) => b.duration - a.duration).slice(0, 5),
      tests,
      failures: entries
    })
  })
}

function titleOf(test) {
  return test.fullTitle ? test.fullTitle() : test.title
}

function truncate(text, size) {
  return text.length > size ? text.slice(0, size) + "…" : text
}

function buildEntry(test, err, kind, attempt) {
  const error = err || test.err || {}

  return {
    kind,
    title: titleOf(test),
    retry: attempt,
    duration: test.duration,
    timedOut: /timed out|timeout/i.test(error.message || ""),
    message: error.message || String(error),
    actual: safeValue(error.actual),
    expected: safeValue(error.expected),
    codeFrame: error.codeFrame ? { file: error.codeFrame.relativeFile, line: error.codeFrame.line, frame: error.codeFrame.frame } : null,
    stack: (error.stack || "").split("\n").slice(0, 12).join("\n")
  }
}

function safeValue(value) {
  if (value === undefined) return undefined

  try {
    const text = typeof value === "string" ? value : JSON.stringify(value)

    return truncate(text, 500)
  } catch (e) {
    return String(value)
  }
}

function writeLog(payload) {
  const fileName = `${payload.file.replace(/\\|\//g, "_")}.json`
  const content = JSON.stringify(payload, null, 2)

  fs.mkdirSync(logsPath, { recursive: true })
  fs.writeFileSync(path.join(logsPath, fileName), content)

  if (!runId) return

  const runPath = path.join(historyRoot, "runs", runId)
  const lines = payload.tests.map(test => JSON.stringify({ runId, spec: payload.file, ...test })).join("\n")

  fs.mkdirSync(runPath, { recursive: true })
  fs.writeFileSync(path.join(runPath, fileName), content)

  if (lines) fs.appendFileSync(path.join(historyRoot, "tests.jsonl"), lines + "\n")
}

FailureLogReporter.description = "Writes detailed failure diagnostics per spec file"
