import fs from "fs"
import { getSmogonData } from "./smogon-data.js"

const MOVESET_MODULE_PREFIX_SV = "export const SETDEX_SV: Record<string, any> = "
const MOVESET_MODULE_PREFIX_CHAMPIONS = "export const SETDEX_CHAMPIONS: Record<string, any> = "

export async function createMovesetsFile(date, regulation) {
  const regGData = await getSmogonData(date, regulation)

  const smogonData = getUniquePokemons(regGData)

  writeInMovesetsFile(smogonData, regulation)
}

function writeInMovesetsFile(smogonData, regulation) {
  const isChampions = regulation.toUpperCase() === "MA"
  const outputFile = isChampions ? "src/data/movesets-champions.ts" : "src/data/movesets.ts"
  const modulePrefix = isChampions ? MOVESET_MODULE_PREFIX_CHAMPIONS : MOVESET_MODULE_PREFIX_SV

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
  const modulePrefix = filePath.includes("champions") ? MOVESET_MODULE_PREFIX_CHAMPIONS : MOVESET_MODULE_PREFIX_SV
  const rawJson = data.substring(modulePrefix.length)
  const jsonWithQuotes = rawJson.replace(/([\p{L}\p{M}0-9_]+):/gu, '"$1":')
  const jsonContent = JSON.parse(jsonWithQuotes)

  return jsonContent
}

function updateMovesets(newData, filePath) {
  const actualMovesets = readMovesets(filePath)
  const updatedJson = { ...actualMovesets }

  newData.forEach(pokemon => {
    const { name, ...rest } = pokemon

    if (updatedJson[name]) {
      updatedJson[name] = { ...updatedJson[name], ...rest }
    } else {
      updatedJson[name] = rest
    }
  })

  return stringifyWithoutQuotes(updatedJson)
}

function stringifyWithoutQuotes(jsonObject) {
  const jsonString = JSON.stringify(jsonObject, null, 2)
  const withoutQuotesInKeys = jsonString.replace(/"([A-Za-z0-9_]+)":/g, "$1:")
  const withOneLineArrays = withoutQuotesInKeys.replace(/\[\s*([\s\S]*?)\s*\]/g, (match, p1) => {
    return `[${p1.replace(/\s*,\s*/g, ", ")}]`
  })

  return withOneLineArrays
}
