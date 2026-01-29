import axios from "axios"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const POKEMON_DETAILS_PREFIX = "export const POKEMON_DETAILS: Record<string, SpeciesData> = "
const LINE_SEPARATOR = "+----------------------------------------+"

export async function extractMetaMoves(date, regulation) {
  const metaMovesMap = await buildMetaMovesMap(date, regulation)
  updatePokemonDetailsWithMetaMoves(metaMovesMap)
}

async function buildMetaMovesMap(date, regulation) {
  const metaMovesMap = new Map()

  try {
    const year = date.substring(0, date.indexOf("-"))
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9vgc2026reg${regulation}bo3-1760.txt`)
    const pokemonDataList = parseSmogonMovesData(response.data)

    pokemonDataList.forEach(({ name, moves }) => {
      const pokemonKey = name.toLowerCase().replace(/[^a-z0-9]/g, "")
      const normalizedMoves = moves.map(move => move.toLowerCase().replace(/[^a-z0-9]/g, "")).sort()
      metaMovesMap.set(pokemonKey, normalizedMoves)
    })
  } catch (error) {
    console.error("❌ Error fetching Smogon data:", error.message)
  }

  return metaMovesMap
}

function parseSmogonMovesData(data) {
  const pokemonBlocks = data.split(` ${LINE_SEPARATOR} \n ${LINE_SEPARATOR} `).map(it => {
    if (it.startsWith("+")) {
      return it + LINE_SEPARATOR
    } else {
      return LINE_SEPARATOR + it
    }
  })

  return pokemonBlocks.slice(0, 64).map(block => {
    const sections = block
      .split(LINE_SEPARATOR)
      .filter(it => it != "" && it != " ")
      .map(it => it.replaceAll("| ", ""))
      .map(it => it.trim())

    const name = sections[0]
    const moves = extractAllMovesFromSection(sections[5])

    return { name, moves }
  })
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

function updatePokemonDetailsWithMetaMoves(metaMovesMap) {
  const pokemonDetailsPath = path.resolve(__dirname, "../../../src/data/pokemon-details.ts")
  const fileContent = fs.readFileSync(pokemonDetailsPath, "utf-8")

  const startIndex = fileContent.indexOf("export const POKEMON_DETAILS")
  if (startIndex === -1) {
    console.error("❌ Could not find POKEMON_DETAILS in file")
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
    pokemonDetails = eval("(" + objectString + ")")
  } catch (e) {
    console.error("❌ Error parsing POKEMON_DETAILS:", e.message)
    process.exit(1)
  }

  const updatedDetails = Object.entries(pokemonDetails).map(([key, value]) => {
    const pokemonKey = value.name.toLowerCase().replace(/[^a-z0-9]/g, "")
    const metaMoves = metaMovesMap.get(pokemonKey) || []

    return [
      key,
      {
        ...value,
        metaMoves: metaMoves
      }
    ]
  })

  const headerLines = preContent
    .trim()
    .split("\n")
    .filter(line => !line.includes("POKEMON_DETAILS"))
  const header = headerLines.join("\n")

  const newContent = `${header}

export const POKEMON_DETAILS: Record<string, SpeciesData> = ${serializeObject(updatedDetails)}
`

  fs.writeFileSync(pokemonDetailsPath, newContent.trim() + "\n")
  console.log("✅ pokemon-details.ts updated with metaMoves successfully")
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
    const entries = Object.entries(obj).map(([key, val]) => {
      const formatted = `${pad(lvl)}${key}: ${formatValue(val, lvl)}`
      return formatted
    })
    return `{\n${entries.join(",\n")}\n${pad(lvl - 1)}}`
  }

  return serialize(Object.fromEntries(obj), 1)
}
