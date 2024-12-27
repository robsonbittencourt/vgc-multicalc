import { Generations, Move } from "@robsonbittencourt/calc"
import axios from "axios"

const LINE_SEPARATOR = "+----------------------------------------+"
const POKEMON_QUANTITY = 64

export async function getSmogonData(date, reg) {
  try {
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9vgc2024reg${reg}bo3-1760.txt`)
    const parsedSmogonData = parseSmogonData(response.data)
    return parsedSmogonData
  } catch (error) {
    console.error(error)
  }
}

export function parseSmogonData(data) {
  const pokemon = data
    .split(` ${LINE_SEPARATOR} \n ${LINE_SEPARATOR} `)
    .map(it => {
      if (it.startsWith("+")) {
        it += LINE_SEPARATOR
        return it
      } else {
        return LINE_SEPARATOR + it
      }
    })
    .slice(0, POKEMON_QUANTITY)

  return pokemon.map(p => parsePokemonData(p))
}

function parsePokemonData(data) {
  const sections = extractSections(data)

  const name = extractName(sections)
  const ability = extractAbility(sections)
  const items = extractItems(sections)
  const spreads = extractSpreads(sections)
  const nature = extractNature(spreads)
  const evs = extractEvs(spreads)
  const moves = extractMoves(sections)
  const teraType = extractTeraType(sections)

  return { name, teraType, ability, items, nature, evs, moves }
}

function extractSections(data) {
  return data
    .split(LINE_SEPARATOR)
    .filter(it => it != "" && it != " ")
    .map(it => it.replaceAll("| ", ""))
    .map(it => it.trim())
}

function extractName(sections) {
  return sections[0]
}

function extractAbility(sections) {
  const abilities = sections[2]
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Abilities")

  return abilities[0]
}

function extractItems(sections) {
  const items = sections[3]
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Items" && it != "Other")

  return items
}

function extractSpreads(sections) {
  return sections[4]
    .split("\n")
    .map(it => it.trim())
    .map(it => it.substring(0, it.indexOf(" ")))
    .filter(it => it != "" && it != "Other")
}

function extractNature(spreads) {
  return spreads[0].substring(0, spreads[0].indexOf(":"))
}

function extractEvs(spreads) {
  const rawEvs = spreads[0].substring(spreads[0].indexOf(":") + 1).split("/")
  const evs = { hp: Number(rawEvs[0]), atk: Number(rawEvs[1]), def: Number(rawEvs[2]), spa: Number(rawEvs[3]), spd: Number(rawEvs[4]), spe: Number(rawEvs[5]) }

  return evs
}

function extractMoves(sections) {
  const allMoves = sections[5]
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Moves" && it != "Other")

  const mainMoves = allMoves.slice(0, 4)

  return mainMoves
    .map(m => new Move(Generations.get(9), m))
    .sort((a, b) => b.bp - a.bp)
    .map(m => m.name)
}

function extractTeraType(sections) {
  const teraType = sections[6]
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .trim()
    )
    .filter(it => it != "Tera Types" && it != "Other")

  return teraType[0]
}
