"use strict"

const fs = require("fs")
const path = require("path")

const Base = require("mocha/lib/reporters/base")
const constants = require("mocha/lib/runner").constants

const { EVENT_TEST_FAIL, EVENT_TEST_PASS, EVENT_TEST_RETRY, EVENT_RUN_END, EVENT_SUITE_BEGIN } = constants

const logsPath = path.join(process.cwd(), "failure-logs")

module.exports = FailureLogReporter

function FailureLogReporter(runner, options) {
  Base.call(this, runner, options)

  const entries = []
  const durations = []
  let specFile = null

  runner.on(EVENT_SUITE_BEGIN, suite => {
    if (!specFile && suite.file) specFile = suite.file
  })

  runner.on(EVENT_TEST_PASS, test => {
    durations.push({ title: test.fullTitle(), duration: test.duration, retries: test.currentRetry() })
  })

  runner.on(EVENT_TEST_RETRY, (test, err) => {
    entries.push(buildEntry(test, err, "retry"))
  })

  runner.on(EVENT_TEST_FAIL, (test, err) => {
    entries.push(buildEntry(test, err, "fail"))
  })

  runner.on(EVENT_RUN_END, () => {
    if (!specFile) return

    writeLog({
      file: specFile,
      startedAt: runner.stats && runner.stats.start,
      endedAt: runner.stats && runner.stats.end,
      stats: runner.stats,
      slowestPassing: durations.sort((a, b) => b.duration - a.duration).slice(0, 5),
      failures: entries
    })
  })
}

function buildEntry(test, err, kind) {
  const error = err || test.err || {}

  return {
    kind,
    title: test.fullTitle ? test.fullTitle() : test.title,
    retry: test.currentRetry ? test.currentRetry() : null,
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

    return text.length > 500 ? text.slice(0, 500) + "…" : text
  } catch (e) {
    return String(value)
  }
}

function writeLog(payload) {
  if (!fs.existsSync(logsPath)) fs.mkdirSync(logsPath, { recursive: true })

  const fileName = payload.file.replace(/\\|\//g, "_")

  fs.writeFileSync(path.join(logsPath, `${fileName}.json`), JSON.stringify(payload, null, 2))
}

FailureLogReporter.description = "Writes detailed failure diagnostics per spec file"
