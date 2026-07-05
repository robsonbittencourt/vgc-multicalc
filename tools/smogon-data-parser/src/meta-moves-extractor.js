import axios from "axios"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { splitSmogonDataIntoBlocks, extractSections } from "./smogon-data.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function extractMetaMoves(date, regulation) {
  console.log(`⏳ [extractMetaMoves] Extracting meta moves and items for ${date} / ${regulation.toUpperCase()}...`)

  const metaDataMap = await buildMetaDataMap(date, regulation)
  updatePokemonDetailsWithMetaData(metaDataMap)
}

async function buildMetaDataMap(date, regulation) {
  const metaDataMap = new Map()

  try {
    const year = date.substring(0, date.indexOf("-"))
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9championsvgc${year}reg${regulation.toLowerCase()}bo3-1760.txt`)
    const pokemonDataList = parseSmogonMetaData(response.data)

    pokemonDataList.forEach(({ name, moves, items }) => {
      const pokemonKey = name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const normalizedMoves = moves.map(move => move.toLowerCase().replace(/[^a-z0-9]/g, "")).sort()
      const normalizedItems = items.map(item => item.toLowerCase().replace(/[^a-z0-9]/g, "")).sort()
      metaDataMap.set(pokemonKey, { moves: normalizedMoves, items: normalizedItems })
    })
  } catch (error) {
    throw new Error(`[extractMetaMoves] Failed to fetch Smogon data: ${error.message}`)
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

function loadMovesets() {
  const movesetFile = "movesets.ts"
  const movesetPath = path.resolve(__dirname, `../../../src/infrastructure/data/${movesetFile}`)
  const content = fs.readFileSync(movesetPath, "utf-8")

  const startIndex = content.indexOf("{")
  const endIndex = content.lastIndexOf("}")
  const objectString = content.slice(startIndex, endIndex + 1)

  return eval(`(${objectString})`)
}

function getMegaStoneItemsForBase(baseName, movesets) {
  const megaKeys = Object.keys(movesets).filter(key => key.startsWith(`${baseName}-Mega`))
  const megaStones = new Set()

  for (const key of megaKeys) {
    const items = movesets[key]?.items || []
    for (const item of items) {
      const normalized = item.toLowerCase().replace(/[^a-z0-9]/g, "")
      if (normalized.endsWith("ite") || normalized.endsWith("itex") || normalized.endsWith("itey")) {
        megaStones.add(normalized)
      }
    }
  }

  return [...megaStones].sort()
}

function updatePokemonDetailsWithMetaData(metaDataMap) {
  const fileName = "pokemon-details.ts"
  const exportName = "POKEMON_DETAILS"
  const pokemonDetailsPath = path.resolve(__dirname, `../../../src/infrastructure/data/${fileName}`)
  const fileContent = fs.readFileSync(pokemonDetailsPath, "utf-8")

  const movesets = loadMovesets()

  const startIndex = fileContent.indexOf(`export const ${exportName}`)
  if (startIndex === -1) {
    throw new Error(`[extractMetaMoves] Could not find ${exportName} in file`)
  }

  const preContent = fileContent.slice(0, startIndex)
  const rest = fileContent.slice(startIndex)

  const matchStart = rest.match(/=\s*{/)
  if (!matchStart) {
    throw new Error("[extractMetaMoves] Could not find object start")
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
    throw new Error("[extractMetaMoves] Could not find object end")
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
    throw new Error(`[extractMetaMoves] Failed to parse POKEMON_DETAILS: ${e.message}`)
  }

  const updatedDetails = Object.entries(pokemonDetails).map(([key, value]) => {
    const pokemonKey = value.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    const metaData = metaDataMap.get(pokemonKey)

    if (!metaData) {
      return [key, value]
    }

    let metaItems = metaData.items
    if (metaItems.length === 0) {
      const megaStones = getMegaStoneItemsForBase(value.name, movesets)
      if (megaStones.length > 0) {
        metaItems = megaStones
      }
    }

    return [
      key,
      {
        ...value,
        metaMoves: metaData.moves,
        metaItems
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
  console.log(`✅ [extractMetaMoves] '${fileName}' updated successfully`)
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
