import axios from "axios"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { splitSmogonDataIntoBlocks, extractSections } from "./smogon-data.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NO_ITEM = "Nothing"

function toID(text) {
  const lower = `${text}`.toLowerCase()

  if (lower === "flabébé") return "flabebe"

  return lower.replace(/[^a-z0-9]+/g, "")
}

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
      const pokemonKey = toID(name)
      const sortedMoves = [...moves].sort()
      const sortedItems = [...items].sort()
      metaDataMap.set(pokemonKey, { moves: sortedMoves, items: sortedItems })
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
    .filter(it => it != "Items" && it != "Other" && it != NO_ITEM && it != "")

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

const MOVESET_DECLARATION = "export const MOVESETS = "
const MOVESET_SUFFIX = " as const satisfies Record<string, Moveset>"

function loadMovesets() {
  const movesetPath = path.resolve(__dirname, "../../../src/domain/data/moveset-data.ts")
  const content = fs.readFileSync(movesetPath, "utf-8")

  const declarationIndex = content.indexOf(MOVESET_DECLARATION)

  if (declarationIndex === -1) {
    throw new Error(`[extractMetaMoves] Could not find '${MOVESET_DECLARATION}' in moveset-data.ts`)
  }

  const start = declarationIndex + MOVESET_DECLARATION.length
  const end = content.indexOf(MOVESET_SUFFIX, start)
  const objectString = end === -1 ? content.slice(start) : content.slice(start, end)

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
        megaStones.add(item)
      }
    }
  }

  return [...megaStones].sort()
}

const MOVESETS_DECLARATION = "export const POKEMON_MOVESETS: Record<string, PokemonMoveset> = "

function updatePokemonDetailsWithMetaData(metaDataMap) {
  const fileName = "pokemon-moveset.ts"
  const pokemonMovesetPath = path.resolve(__dirname, `../../../src/domain/data/${fileName}`)
  const fileContent = fs.readFileSync(pokemonMovesetPath, "utf-8")

  const movesets = loadMovesets()
  const namesById = loadPokemonNamesById()

  const declarationIndex = fileContent.indexOf(MOVESETS_DECLARATION)

  if (declarationIndex === -1) {
    throw new Error(`[extractMetaMoves] Could not find '${MOVESETS_DECLARATION}' in ${fileName}`)
  }

  const header = fileContent.slice(0, declarationIndex)
  const objectString = fileContent.slice(declarationIndex + MOVESETS_DECLARATION.length)

  let pokemonMovesets
  try {
    pokemonMovesets = JSON.parse(quoteUnquotedKeys(objectString.trimEnd()))
  } catch (e) {
    throw new Error(`[extractMetaMoves] Failed to parse POKEMON_MOVESETS: ${e.message}`)
  }

  const updatedMovesets = Object.entries(pokemonMovesets).map(([key, value]) => {
    const metaData = metaDataMap.get(key)

    if (!metaData) {
      return [key, value]
    }

    let metaItems = metaData.items

    if (metaItems.length === 0) {
      const megaStones = getMegaStoneItemsForBase(namesById.get(key) ?? key, movesets)

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

  const newContent = `${header}${MOVESETS_DECLARATION}${serializeObject(updatedMovesets)}
`

  fs.writeFileSync(pokemonMovesetPath, newContent.trimEnd() + "\n")
  console.log(`✅ [extractMetaMoves] '${fileName}' updated successfully`)
}

function loadPokemonNamesById() {
  const pokemonDataPath = path.resolve(__dirname, "../../../src/domain/data/pokemon-data.ts")
  const content = fs.readFileSync(pokemonDataPath, "utf-8")
  const namesById = new Map()

  for (const match of content.matchAll(/^ {2}"?([A-Za-z0-9_-]+)"?: \{\n {4}name: "([^"]+)"/gm)) {
    namesById.set(match[1], match[2])
  }

  return namesById
}

function quoteUnquotedKeys(rawJson) {
  return rawJson.replace(/"(?:[^"\\]|\\.)*"|([\p{L}\p{M}0-9_]+)\s*:/gu, (match, key) => (key ? `"${key}":` : match))
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
