import fs from "fs"
import { getSmogonData } from "./smogon-data.js"

const MOVESET_MODULE_PREFIX = "export const SETDEX_SV: Record<string, any> = "

export async function createMovesetsFile(date, regulation) {
  const regGData = await getSmogonData(date, regulation)

  const smogonData = getUniquePokemons(regGData)

  writeInMovesetsFile(smogonData)
}

function writeInMovesetsFile(smogonData) {
  const updatedMovesets = updateMovesets(smogonData)

  let classContent = `${MOVESET_MODULE_PREFIX}${updatedMovesets}
`

  fs.writeFileSync("src/data/movesets.ts", classContent)
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

function readMovesets() {
  const data = fs.readFileSync("src/data/movesets.ts", "utf8")
  const rawJson = data.substring(MOVESET_MODULE_PREFIX.length)
  const jsonWithQuotes = rawJson.replace(/([\p{L}\p{M}0-9_]+):/gu, '"$1":')
  const jsonContent = JSON.parse(jsonWithQuotes)

  return jsonContent
}

function updateMovesets(newData) {
  const actualMovesets = readMovesets()
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
