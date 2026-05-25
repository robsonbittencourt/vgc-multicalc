import fs from "fs"
import path from "path"

const pokemonDetailsPath = path.resolve("src/data/pokemon-details-champions.ts")
const topUsagePath = path.resolve("src/data/top-usage-regulation.ts")

const pokemonFileContent = fs.readFileSync(pokemonDetailsPath, "utf-8")
const topUsageContent = fs.readFileSync(topUsagePath, "utf-8")

const maRegulationMatch = topUsageContent.match(/MA:\s*\[((?:.|\n)*?)\]/m)
if (!maRegulationMatch) {
  console.error("❌ Não foi possível extrair a lista do top usage MA.")
  process.exit(1)
}

const topNames = maRegulationMatch[1].split(",").map(name => name.trim().replace(/["']/g, ""))

const startIndex = pokemonFileContent.indexOf("export const POKEMON_DETAILS")
if (startIndex === -1) {
  console.error("❌ Não foi possível encontrar POKEMON_DETAILS.")
  process.exit(1)
}

const preContent = pokemonFileContent.slice(0, startIndex)
const rest = pokemonFileContent.slice(startIndex)

const matchStart = rest.match(/=\s*{/)
if (!matchStart) {
  console.error("❌ Não foi possível encontrar o início do objeto.")
  process.exit(1)
}

const braceIndex = rest.indexOf("{", matchStart.index)
let open = 0
let endIndex = -1

for (let i = braceIndex; i < rest.length; i++) {
  if (rest[i] === "{") open++
  else if (rest[i] === "}") open--
  if (open === 0) {
    endIndex = i
    break
  }
}

if (endIndex === -1) {
  console.error("❌ Não foi possível encontrar o final do objeto.")
  process.exit(1)
}

const objectString = rest.slice(braceIndex, endIndex + 1)

let pokemonDetails
try {
  const sanitized = objectString
    .replace(/(\n\s+)([a-zA-Z0-9\-]+):\s*{/g, '$1"$2": {')
    .replace(/(\n\s+)(name|abilities|learnset|metaMoves|metaItems|group):/g, '$1"$2":')
    .replace(/:\s*\[/g, ": [")
    .replace(/,\s*}/g, "}")
    .replace(/,\s*\]/g, "]")
  pokemonDetails = JSON.parse(sanitized)
} catch (e) {
  console.error("❌ Erro ao interpretar POKEMON_DETAILS:", e.message)
  process.exit(1)
}

const originalOrder = Object.entries(pokemonDetails)

const byName = Object.fromEntries(originalOrder.map(([k, v]) => [v.name.toLowerCase(), [k, v]]))

const topKeysOrdered = topNames.map(n => byName[n.toLowerCase()]).filter(Boolean)

const usedKeys = new Set(topKeysOrdered.map(([k]) => k))

const remainingKeys = originalOrder.filter(([k]) => !usedKeys.has(k))

const finalOrder = [...topKeysOrdered, ...remainingKeys].map(([key, value]) => {
  const index = topNames.findIndex(n => n.toLowerCase() === value.name.toLowerCase())
  let group = "Regular"
  if (index >= 0 && index < 50) group = "Meta"
  else if (index >= 50) group = "Low usage"
  return [key, { ...value, group }]
})

function serializeObject(obj, indent = 2) {
  const pad = lvl => " ".repeat(lvl * indent)

  function formatValue(val, lvl) {
    if (Array.isArray(val)) {
      if (val.length === 0) return "[]"
      const items = val.map(v => formatValue(v, lvl + 1)).join(", ")
      return `[${items}]`
    } else if (typeof val === "object" && val !== null) {
      return serialize(val, lvl + 1)
    } else if (typeof val === "string") {
      return `"${val}"`
    } else {
      return String(val)
    }
  }

  function serialize(obj, lvl = 1) {
    const entries = Object.entries(obj)
    const formatted = entries.map(([key, val], idx) => {
      const isLast = idx === entries.length - 1
      const comma = isLast ? "" : ","
      const quotedKey = key.includes("-") ? `"${key}"` : key
      return `${pad(lvl)}${quotedKey}: ${formatValue(val, lvl)}${comma}`
    })
    return `{\n${formatted.join("\n")}\n${pad(lvl - 1)}}`
  }

  return serialize(Object.fromEntries(obj), 1)
}

const headerLines = preContent
  .trim()
  .split("\n")
  .filter(line => !line.includes("POKEMON_DETAILS"))
const header = headerLines.join("\n")

const newContent = `${header}

export const POKEMON_DETAILS_CHAMPIONS: Record<string, SpeciesData> = ${serializeObject(finalOrder)}
`

fs.writeFileSync(pokemonDetailsPath, newContent.trim() + "\n")
console.log("✅ 'pokemon-details-champions.ts' atualizado com sucesso com 'group' e ordem do top usage MA.")
