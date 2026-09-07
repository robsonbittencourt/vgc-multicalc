import { globSync, readFileSync } from "node:fs"

const arg = process.argv[2] ?? ""

if (!arg) {
  process.stdout.write("")
  process.exit(0)
}

const [file, rawLine] = arg.split(":")
const pattern = `cypress/e2e/**/${file}`

const matches = globSync(pattern)

if (matches.length === 0) {
  console.error(`Spec not found: ${pattern}`)
  process.exit(1)
}

if (matches.length > 1) {
  console.error(`Ambiguous spec name, matches:\n${matches.join("\n")}`)
  process.exit(1)
}

if (!rawLine) {
  process.stdout.write(`--spec\n${matches[0]}\n`)
  process.exit(0)
}

const line = Number(rawLine)

if (!Number.isInteger(line) || line < 1) {
  console.error(`Invalid line number: ${rawLine}`)
  process.exit(1)
}

const lines = readFileSync(matches[0], "utf8").split("\n")

if (line > lines.length) {
  console.error(`Line ${line} is past the end of ${matches[0]} (${lines.length} lines)`)
  process.exit(1)
}

const declaration = /^\s*(?:it|smoke|specify)(?:\.only|\.skip)?\(\s*(["'`])([\s\S]*?)\1/

let title = null

for (let i = line - 1; i >= 0; i--) {
  const found = lines[i].match(declaration)

  if (!found) continue

  if (found[1] === "`" && found[2].includes("${")) {
    console.error(`Test at line ${i + 1} uses a template literal title and cannot be selected by line.`)
    process.exit(1)
  }

  title = found[2]
  break
}

if (title === null) {
  console.error(`No test declaration found at or above line ${line} in ${matches[0]}`)
  process.exit(1)
}

process.stdout.write(`--spec\n${matches[0]}\n--expose\ntestTitle=${title}\n`)
