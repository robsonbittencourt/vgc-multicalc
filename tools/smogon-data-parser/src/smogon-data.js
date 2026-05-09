import { Generations, Move } from "@robsonbittencourt/calc"
import axios from "axios"

export const LINE_SEPARATOR = "+----------------------------------------+"
const POKEMON_QUANTITY = 64

export async function smogonUsageList(date, reg) {
  try {
    const year = date.substring(0, date.indexOf("-"))
    const format = reg.toUpperCase() === "MA" ? "championsvgc" : "vgc"
    return await axios.get(`https://www.smogon.com/stats/${date}/gen9${format}${year}reg${reg.toLowerCase()}bo3-1760.txt`)
  } catch (error) {
    console.error(error)
  }
}

export async function getSmogonData(date, reg) {
  try {
    const year = date.substring(0, date.indexOf("-"))
    const format = reg.toUpperCase() === "MA" ? "championsvgc" : "vgc"
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9${format}${year}reg${reg.toLowerCase()}bo3-1760.txt`)
    const parsedSmogonData = parseSmogonData(response.data)
    return parsedSmogonData
  } catch (error) {
    console.error(error)
  }
}

export function parseSmogonData(data) {
  const pokemonBlocks = splitSmogonDataIntoBlocks(data)
  return pokemonBlocks.map(p => parsePokemonData(p))
}

export function splitSmogonDataIntoBlocks(data) {
  return data
    .split(/\n\s*\+----------------------------------------\+\s*\n\s*\+----------------------------------------\+\s*\n/)
    .map(it => {
      let cleaned = it.trim()

      if (!cleaned.startsWith(LINE_SEPARATOR)) {
        cleaned = LINE_SEPARATOR + "\n" + cleaned
      }

      if (!cleaned.endsWith(LINE_SEPARATOR)) {
        cleaned = cleaned + "\n" + LINE_SEPARATOR
      }

      return cleaned
    })
    .slice(0, POKEMON_QUANTITY)
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

  const alternateSpreads = spreads.slice(1)

  return { name, teraType: teraType || "", ability, items, nature, alternateSpreads, evs, moves }
}

export function extractSections(data) {
  return data
    .split(LINE_SEPARATOR)
    .map(it => it.trim())
    .filter(it => it !== "")
    .map(it =>
      it
        .split("\n")
        .map(line => line.replace(/^\|\s?/, "").replace(/\s?\|$/, ""))
        .join("\n")
        .trim()
    )
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

function parseSpread(raw) {
  const nature = raw.substring(0, raw.indexOf(":"))
  const rawEvs = raw.substring(raw.indexOf(":") + 1).split("/")
  const evs = { hp: Number(rawEvs[0]), atk: Number(rawEvs[1]), def: Number(rawEvs[2]), spa: Number(rawEvs[3]), spd: Number(rawEvs[4]), spe: Number(rawEvs[5]) }
  return { nature, evs }
}

function extractSpreads(sections) {
  return sections[4]
    .split("\n")
    .map(it => it.trim())
    .map(it => it.substring(0, it.indexOf(" ")))
    .filter(it => it != "" && it != "Other")
    .map(parseSpread)
}

function extractNature(spreads) {
  return spreads[0].nature
}

function extractEvs(spreads) {
  return spreads[0].evs
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

  const mainMoves = allMoves.slice(0, 4).filter(it => it != "Nothing")

  while (mainMoves.length < 4) {
    mainMoves.push("")
  }

  return mainMoves
    .map(m => new Move(Generations.get(9), m))
    .sort((a, b) => b.bp - a.bp)
    .map(m => m.name)
}

function extractTeraType(sections) {
  const teraSection = sections[6]

  if (!teraSection || teraSection.includes("Teammates")) {
    return ""
  }

  const teraType = teraSection
    .split("\n")
    .map(it =>
      it
        .replaceAll(/[0-9]+/g, "")
        .replace(".%", "")
        .replace(" -", "")
        .trim()
    )
    .filter(it => it && it != "Tera Types" && it != "Other" && it != "Nothing")

  return teraType[0] ?? ""
}
