import fs from "fs"
import { Generations } from "@robsonbittencourt/calc"
import { getSmogonData } from "./smogon-data.js"
import { POKEDEX_NUMBERS } from "./pokedex-numbers.js"

const gen = Generations.get(9)
const movesByName = new Map([...gen.moves].map(m => [m.name, m]))
const naturesByName = new Map([...gen.natures].map(n => [n.name, n]))

function getMoveCategory(moveName) {
  if (!moveName) return null
  return movesByName.get(moveName)?.category ?? null
}

function getNatureEffect(natureName) {
  if (!natureName) return { plus: null, minus: null }
  const nature = naturesByName.get(natureName)
  return { plus: nature?.plus ?? null, minus: nature?.minus ?? null }
}

function isNatureCompatible(natureName, dominantCategory) {
  const { plus, minus } = getNatureEffect(natureName)
  if (dominantCategory === "Physical") {
    return minus !== "atk" && plus !== "spa"
  }
  if (dominantCategory === "Special") {
    return minus !== "spa" && plus !== "atk"
  }
  return true
}

function adjustSpread(nature, evs, alternateSpreads, moves) {
  const categories = moves.map(getMoveCategory).filter(c => c === "Physical" || c === "Special")
  const physicalCount = categories.filter(c => c === "Physical").length
  const specialCount = categories.filter(c => c === "Special").length

  if (physicalCount === specialCount) return { nature, evs }

  const dominantCategory = physicalCount > specialCount ? "Physical" : "Special"

  if (isNatureCompatible(nature, dominantCategory)) return { nature, evs }

  const compatible = alternateSpreads.find(s => isNatureCompatible(s.nature, dominantCategory))
  return compatible ?? { nature, evs }
}

const MOVESET_MODULE_PREFIX = "export const MOVESETS: Record<string, any> = "

export async function createMovesetsFile(date, regulation) {
  console.log(`⏳ [createMovesetsFile] Fetching moveset data for ${date} / ${regulation.toUpperCase()}...`)

  const regGData = await getSmogonData(date, regulation)

  if (!regGData) {
    throw new Error(`Failed to fetch Smogon moveset data for ${date} / ${regulation}`)
  }

  const smogonData = getUniquePokemons(regGData)

  writeInMovesetsFile(smogonData)

  const outputFile = "src/data/movesets.ts"
  console.log(`✅ [createMovesetsFile] '${outputFile}' updated successfully`)
}

function writeInMovesetsFile(smogonData) {
  const outputFile = "src/data/movesets.ts"
  const modulePrefix = MOVESET_MODULE_PREFIX

  const updatedMovesets = updateMovesets(smogonData, outputFile)

  let classContent = `${modulePrefix}${updatedMovesets}
`

  fs.writeFileSync(outputFile, classContent)
}

function getUniquePokemons(...pokemonArrays) {
  const pokemonMap = new Map()

  pokemonArrays.forEach(array => {
    array.forEach(pokemon => {
      pokemonMap.set(pokemon.name, pokemon)
    })
  })

  return Array.from(pokemonMap.values())
}

function readMovesets(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }

  const data = fs.readFileSync(filePath, "utf8")
  const rawJson = data.substring(MOVESET_MODULE_PREFIX.length)
  const jsonWithQuotes = rawJson.replace(/([\p{L}\p{M}0-9_]+):/gu, '"$1":')
  const jsonContent = JSON.parse(jsonWithQuotes)

  return jsonContent
}

const MEGA_BASE_OVERRIDES = {
  "Floette-Mega": "Floette-Eternal"
}

function getBaseName(megaName) {
  if (MEGA_BASE_OVERRIDES[megaName]) return MEGA_BASE_OVERRIDES[megaName]
  return megaName.replace(/-Mega(-[XY])?$/, "")
}

function isMega(name) {
  return name.includes("-Mega")
}

function updateMovesets(newData, filePath) {
  const actualMovesets = readMovesets(filePath)
  const updatedJson = { ...actualMovesets }
  const megaBaseNames = new Set()
  const processedBaseNames = new Set()
  const newDataByName = new Map(newData.map(p => [p.name, p]))

  newData.forEach(pokemon => {
    const { name, alternateSpreads, ...rest } = pokemon
    const { nature, evs } = adjustSpread(rest.nature, rest.evs, alternateSpreads, rest.moves)
    const entry = { ...rest, nature, evs }

    if (isMega(name)) {
      if (updatedJson[name]) {
        updatedJson[name] = { ...updatedJson[name], ...entry }
      } else {
        updatedJson[name] = entry
      }

      const baseName = getBaseName(name)

      if (!megaBaseNames.has(baseName)) {
        megaBaseNames.add(baseName)

        if (!processedBaseNames.has(baseName)) {
          const baseData = newDataByName.get(baseName)
          const existingAbility = updatedJson[baseName]?.ability
          const baseAbility = baseData?.ability ?? existingAbility
          const baseSource = baseData ? { ...baseData, ...adjustSpread(baseData.nature, baseData.evs, baseData.alternateSpreads, baseData.moves) } : entry
          const baseEntry = {
            ...(baseAbility ? { ability: baseAbility } : {}),
            nature: baseSource.nature,
            teraType: baseSource.teraType,
            evs: baseSource.evs,
            moves: baseSource.moves,
            items: baseSource.items
          }

          updatedJson[baseName] = baseEntry
        }
      }

      return
    }

    if (megaBaseNames.has(name)) {
      return
    }

    processedBaseNames.add(name)

    if (updatedJson[name]) {
      updatedJson[name] = { ...updatedJson[name], ...entry }
    } else {
      updatedJson[name] = entry
    }
  })

  const orderedJson = orderByPokedexNumber(updatedJson)

  return stringifyWithoutQuotes(orderedJson)
}

const NAME_ALIASES = {
  "Aegislash-Shield": "Aegislash"
}

function orderByPokedexNumber(jsonObject) {
  const keys = Object.keys(jsonObject)

  const numberFor = key => {
    const lookupName = NAME_ALIASES[key] ?? key
    return POKEDEX_NUMBERS[lookupName] ?? Infinity
  }

  const sortedKeys = [...keys].sort((a, b) => {
    const numA = numberFor(a)
    const numB = numberFor(b)

    if (numA !== numB) return numA - numB
    return a.localeCompare(b)
  })

  const result = {}
  for (const key of sortedKeys) {
    result[key] = jsonObject[key]
  }

  return result
}

function stringifyWithoutQuotes(jsonObject) {
  const jsonString = JSON.stringify(jsonObject, null, 2)
  const withoutQuotesInKeys = jsonString.replace(/"([A-Za-z0-9_]+)":/g, "$1:")
  const withOneLineArrays = withoutQuotesInKeys.replace(/\[\s*([\s\S]*?)\s*\]/g, (match, p1) => {
    return `[${p1.replace(/\s*,\s*/g, ", ")}]`
  })

  return withOneLineArrays
}
