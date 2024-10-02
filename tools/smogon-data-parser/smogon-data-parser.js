import axios from 'axios'
import fs from 'fs'

const LINE_SEPARATOR = "+----------------------------------------+"
const POKEMON_QUANTITY = 250

const a = await createSpeedMetaFile("g")

export async function createSpeedMetaFile() {
  const regGData = await getSmogonData('g')
  const regHData = await getSmogonData('h')

  regGData.forEach(pokemonG => {
    if(regHData.find(pokemonH => pokemonH.name == pokemonG.name) == undefined) {
      regHData.push(pokemonG)
    }
  })

  let classContent = 
`export const SETDEX_SV: {[k: string]: any} = {
${printNewPokemon(regHData)}
};`

  fs.writeFileSync('src/data/movesets.ts', classContent)
}

function printNewPokemon(pokemon) {
  return pokemon.map(p => {
    return `
  "${p.name}": {
    "ability": "${p.ability}",
    "item": "${p.item}",
    "nature": "${p.nature}",
    "teraType": "${p.teraType}",
    "evs": {
      "hp": ${p.evs.hp},
      "atk": ${p.evs.atk},
      "def": ${p.evs.def},
      "spa": ${p.evs.spa},
      "spd": ${p.evs.spd},
      "spe": ${p.evs.spe}
    },
    "moves": [
      "${p.moves[0]}",
      "${p.moves[1]}",
      "${p.moves[2]}",
      "${p.moves[3]}"
    ]
  }`
  })
}

async function getSmogonData(reg) {
  try {
    const response = await axios.get(`https://www.smogon.com/stats/${getCurrentYearMonth()}/moveset/gen9vgc2024reg${reg}bo3-1760.txt`)
    const parsedSmogonData = parseSmogonData(response.data)
    return parsedSmogonData
  } catch (error) {
    console.error(error)
  }
}

function parseSmogonData(data) {
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

  const name = sections[0]
  const ability = extractAbility(sections)
  const item = extractItem(sections)
  const spreads = extractSpreads(sections)
  const nature = extractNature(spreads)
  const evs = extractEvs(spreads)
  const moves = extractMoves(sections)
  const teraType = extractTeraType(sections)

  return { name, teraType, ability, item, nature, evs, moves }
}

function extractSections(data) {
  return data.split(LINE_SEPARATOR)
    .filter(it => (it != "" && it != " "))
    .map(it => it.replaceAll("| ", ""))
    .map(it => it.trim())
}

function extractAbility(sections) {
  const abilities = sections[2]
    .split("\n")
    .map(it => it.replaceAll(/[0-9]+/g, "")
    .replace(".%", "").trim())
    .filter(it => it != "Abilities")

  return abilities[0]
}

function extractItem(sections) {
  const items = sections[3]
    .split("\n")
    .map(it => it.replaceAll(/[0-9]+/g, "")
    .replace(".%", "").trim())
    .filter(it => it != "Items" && it != "Other")

  const item = items.find(it => it == "Choice Scarf") ? "Choice Scarf" : items[0]
  
  return item
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
  const evs = { hp: Number(rawEvs[0]), atk: Number(rawEvs[1]), def: Number(rawEvs[2]), spa: Number(rawEvs[3]), spd: Number(rawEvs[4]), spe: Number(rawEvs[5])}

  return evs
}

function extractMoves(sections) {
  const moves = sections[5]
    .split("\n")
    .map(it => it.replaceAll(/[0-9]+/g, "")
    .replace(".%", "").trim())
    .filter(it => it != "Moves" && it != "Other")

  return moves.slice(0, 4)
}

function extractTeraType(sections) {
  const teraType = sections[6]
    .split("\n")
    .map(it => it.replaceAll(/[0-9]+/g, "")
    .replace(".%", "").trim())
    .filter(it => it != "Tera Types" && it != "Other")

  return teraType[0]
}

function getCurrentYearMonth() {
  const previouslyMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
  const adjustedMonth = previouslyMonthDate.getMonth() + 1
  
  const month = adjustedMonth < 10 ? "0" + adjustedMonth : adjustedMonth
  const year = new Date().getFullYear()

  return `${year}-${month}`
}