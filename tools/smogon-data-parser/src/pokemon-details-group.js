import fs from "fs"
import path from "path"

const topUsagePath = path.resolve("src/domain/data/top-usage-regulation.ts")

const POKEMON_DATA_DECLARATION = "export const POKEMON_DATA = "
const POKEMON_DATA_SUFFIX = " satisfies Record<string, PokemonDataCore>"

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
      const quotedKey = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : `"${key}"`
      return `${pad(lvl)}${quotedKey}: ${formatValue(val, lvl)}${comma}`
    })
    return `{\n${formatted.join("\n")}\n${pad(lvl - 1)}}`
  }

  return serialize(Object.fromEntries(obj), 1)
}

export async function pokemonDetailsGroup(regulation = "mb") {
  const pokemonDataPath = path.resolve("src/domain/data/pokemon-data.ts")

  console.log(`⏳ [pokemonDetailsGroup] Updating group for regulation ${regulation.toUpperCase()}...`)

  const pokemonFileContent = fs.readFileSync(pokemonDataPath, "utf-8")
  const topUsageContent = fs.readFileSync(topUsagePath, "utf-8")

  const topNames = extractTopNames(topUsageContent, regulation)
  const { header, objectString, footer } = splitDataFile(pokemonFileContent)

  let pokemonData

  try {
    pokemonData = JSON.parse(quoteUnquotedKeys(objectString))
  } catch (e) {
    console.error("❌ [pokemonDetailsGroup] Failed to parse POKEMON_DATA:", e.message)
    process.exit(1)
  }

  const finalOrder = Object.entries(pokemonData).map(([key, value]) => {
    return [key, { ...value, group: groupFor(value.name, topNames) }]
  })

  const newContent = `${header}${POKEMON_DATA_DECLARATION}${serializeObject(finalOrder)}${POKEMON_DATA_SUFFIX}
${footer}`

  fs.writeFileSync(pokemonDataPath, newContent.trimEnd() + "\n")
  console.log(`✅ [pokemonDetailsGroup] '${path.basename(pokemonDataPath)}' updated successfully`)
}

function groupFor(name, topNames) {
  const index = topNames.findIndex(n => n.toLowerCase() === String(name).toLowerCase())

  if (index === -1) return "Regular"
  if (index < 50) return "Meta"

  return "Low usage"
}

function extractTopNames(topUsageContent, regulation) {
  const regulationKey = regulation.toUpperCase()
  const topMatch = topUsageContent.match(new RegExp(`${regulationKey}:\\s*\\[([\\s\\S]*?)\\]`, "m"))

  if (!topMatch) {
    console.error(`❌ [pokemonDetailsGroup] Could not extract top usage list for ${regulationKey}.`)
    process.exit(1)
  }

  return topMatch[1]
    .split(",")
    .map(name => name.trim().replace(/["']/g, ""))
    .filter(Boolean)
}

function splitDataFile(fileContent) {
  const declarationIndex = fileContent.indexOf(POKEMON_DATA_DECLARATION)

  if (declarationIndex === -1) {
    console.error("❌ [pokemonDetailsGroup] Could not find POKEMON_DATA export.")
    process.exit(1)
  }

  const start = declarationIndex + POKEMON_DATA_DECLARATION.length
  const suffixIndex = fileContent.indexOf(POKEMON_DATA_SUFFIX, start)

  if (suffixIndex === -1) {
    console.error(`❌ [pokemonDetailsGroup] Could not find '${POKEMON_DATA_SUFFIX}'.`)
    process.exit(1)
  }

  return {
    header: fileContent.slice(0, declarationIndex),
    objectString: fileContent.slice(start, suffixIndex),
    footer: fileContent.slice(suffixIndex + POKEMON_DATA_SUFFIX.length).replace(/^\n/, "")
  }
}

function quoteUnquotedKeys(rawJson) {
  return rawJson.replace(/"(?:[^"\\]|\\.)*"|([\p{L}\p{M}0-9_]+)\s*:/gu, (match, key) => (key ? `"${key}":` : match))
}
