import axios from "axios"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { splitSmogonDataIntoBlocks, extractSections } from "./smogon-data.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function extractMetaMoves(date, regulation) {
  const metaDataMap = await buildMetaDataMap(date, regulation)
  updatePokemonDetailsWithMetaData(metaDataMap, regulation)
}

async function buildMetaDataMap(date, regulation) {
  const metaDataMap = new Map()

  try {
    const year = date.substring(0, date.indexOf("-"))
    const format = regulation.toUpperCase() === "MA" ? "championsvgc" : "vgc"
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9${format}${year}reg${regulation.toLowerCase()}bo3-1760.txt`)
    const pokemonDataList = parseSmogonMetaData(response.data)

    pokemonDataList.forEach(({ name, moves, items }) => {
      const pokemonKey = name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const normalizedMoves = moves.map(move => move.toLowerCase().replace(/[^a-z0-9]/g, "")).sort()
      const normalizedItems = items.map(item => item.toLowerCase().replace(/[^a-z0-9]/g, "")).sort()
      metaDataMap.set(pokemonKey, { moves: normalizedMoves, items: normalizedItems })
    })
  } catch (error) {
    console.error("❌ Error fetching Smogon data:", error.message)
  }

  return metaDataMap
}

function parseSmogonMetaData(data) {
  const pokemonBlocks = splitSmogonDataIntoBlocks(data)

  return pokemonBlocks.map(block => {
    const sections = extractSections(block)

    const name = sections[0]
    const items = extractAllItemsFromSection(sections[3])
    const moves = extractAllMovesFromSection(sections[5])

    return { name, items, moves }
  })
}

function extractAllItemsFromSection(itemsSection) {
  if (!itemsSection) return []

  const allItems = itemsSection
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Items" && it != "Other" && it != "")

  return allItems
}

function extractAllMovesFromSection(movesSection) {
  if (!movesSection) return []

  const allMoves = movesSection
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Moves" && it != "Other" && it != "")

  return allMoves
}

function updatePokemonDetailsWithMetaData(metaDataMap, regulation) {
  const isChampions = regulation.toUpperCase() === "MA"
  const fileName = isChampions ? "pokemon-details-champions.ts" : "pokemon-details.ts"
  const exportName = isChampions ? "POKEMON_DETAILS_CHAMPIONS" : "POKEMON_DETAILS"
  const pokemonDetailsPath = path.resolve(__dirname, `../../../src/data/${fileName}`)
  const fileContent = fs.readFileSync(pokemonDetailsPath, "utf-8")

  const startIndex = fileContent.indexOf(`export const ${exportName}`)
  if (startIndex === -1) {
    console.error(`❌ Could not find ${exportName} in file`)
    process.exit(1)
  }

  const preContent = fileContent.slice(0, startIndex)
  const rest = fileContent.slice(startIndex)

  const matchStart = rest.match(/=\s*{/)
  if (!matchStart) {
    console.error("❌ Could not find object start")
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
    console.error("❌ Could not find object end")
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
    console.error("❌ Error parsing POKEMON_DETAILS:", e.message)
    process.exit(1)
  }

  const updatedDetails = Object.entries(pokemonDetails).map(([key, value]) => {
    const pokemonKey = value.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    const metaData = metaDataMap.get(pokemonKey) || { moves: [], items: [] }

    return [
      key,
      {
        ...value,
        metaMoves: metaData.moves,
        metaItems: metaData.items
      }
    ]
  })

  const headerLines = preContent
    .trim()
    .split("\n")
    .filter(line => !line.includes("POKEMON_DETAILS"))
  const header = headerLines.join("\n")

  const newContent = `${header}

export const ${exportName}: Record<string, SpeciesData> = ${serializeObject(updatedDetails)}
`

  fs.writeFileSync(pokemonDetailsPath, newContent.trim() + "\n")
  console.log(`✅ ${fileName} updated with metaMoves and metaItems successfully`)
}

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
