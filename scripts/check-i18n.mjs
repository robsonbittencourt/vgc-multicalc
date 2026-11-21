import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const APP = join(ROOT, "src/app")
const I18N = join(APP, "i18n")

const SELF_TRANSLATING = ["app-input", "app-input-select", "app-input-autocomplete", "app-widget", "app-how-to-use-subpage"]
const TS_FIELDS = ["header", "description", "group", "label", "title"]
const UNTRANSLATED = new Set(["Pokémon", "SP", "EV", "SPs", "EVs", "VGCPastes", "Champions", "OTS", "Paste", "English", "Español", "2HKO", "3HKO", "4HKO+"])

const files = dir => readdirSync(dir).flatMap(name => (statSync(join(dir, name)).isDirectory() ? files(join(dir, name)) : [join(dir, name)]))

const literals = expression => [...expression.matchAll(/'((?:[^'\\]|\\.)+)'|"((?:[^"\\]|\\.)+)"/g)].map(match => (match[1] ?? match[2]).replace(/\\'/g, "'"))

function templateTexts(source) {
  const texts = []

  for (const match of source.matchAll(/\(([^()]*)\)\s*\|\s*t\b/g)) texts.push(...literals(match[1].includes("?") ? match[1].slice(match[1].indexOf("?")) : match[1]))
  for (const match of source.matchAll(/(?<![\w)]|\w:\s?)('(?:[^'\\]|\\.)+'|"(?:[^"\\]|\\.)+")\s*\|\s*t\b/g)) texts.push(...literals(match[1]))

  for (const element of SELF_TRANSLATING) {
    for (const match of source.matchAll(new RegExp(`<${element}\\b[^>]*>`, "g"))) {
      for (const attribute of match[0].matchAll(/\s(label|title)="([^"{}]+)"|\[(label|title)\]="'([^']+)'"/g)) texts.push(attribute[2] ?? attribute[4])
    }
  }

  return texts
}

function codeTexts(source) {
  const texts = []

  for (const match of source.matchAll(/\b(?:uiText|translate\(\)|translate)\(\s*([^,)]*)/g)) texts.push(...literals(match[1]))
  for (const match of source.matchAll(new RegExp(`\\b(?:${TS_FIELDS.join("|")}):\\s*"((?:[^"\\\\]|\\\\.)+)"`, "g"))) texts.push(match[1])

  return texts
}

function dictionary(file) {
  const source = readFileSync(file, "utf8")
  const keys = new Set()

  for (const match of source.matchAll(/^ {2}(?:"((?:[^"\\]|\\.)*)"|([A-Za-z_$][\w$]*)):/gm)) keys.add(match[1] !== undefined ? JSON.parse(`"${match[1]}"`) : match[2])

  return keys
}

const used = new Map()

for (const file of files(APP)) {
  if (file.includes("/i18n/") || file.endsWith(".spec.ts") || (file.includes("/how-to-use/") && file.includes("/content/"))) continue

  const source = readFileSync(file, "utf8")
  const texts = file.endsWith(".html") ? templateTexts(source) : file.endsWith(".component.ts") || file.endsWith(".ts") ? codeTexts(source) : []

  for (const text of texts) {
    if (!/[A-Za-z]/.test(text) || UNTRANSLATED.has(text) || text.includes("{{")) continue

    used.set(text, [...(used.get(text) ?? []), relative(ROOT, file)])
  }
}

const languages = readdirSync(I18N).filter(name => statSync(join(I18N, name)).isDirectory())
let missingCount = 0

for (const language of languages) {
  const keys = dictionary(join(I18N, language, "ui.ts"))
  const missing = [...used.keys()].filter(text => !keys.has(text)).sort()

  missingCount += missing.length

  for (const text of missing) console.error(`${language}: missing ${JSON.stringify(text)} (${[...new Set(used.get(text))].slice(0, 2).join(", ")})`)
}

console.log(`${used.size} texts checked in ${languages.join(", ")}: ${missingCount} missing`)

process.exit(missingCount ? 1 : 0)
