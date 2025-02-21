import { Generations, Move, Pokemon } from "@robsonbittencourt/calc"
import axios from "axios"

const LINE_SEPARATOR = "+----------------------------------------+"
const POKEMON_QUANTITY = 64

await smogonChaosData()

export async function smogonUsageList(date, reg) {
  try {
    const year = reg === "h" ? "2024" : "2025"
    return await axios.get(`https://www.smogon.com/stats/${date}/gen9vgc${year}reg${reg}bo3-1760.txt`)
  } catch (error) {
    console.error(error)
  }
}

export async function getSmogonData(date, reg) {
  try {
    const year = reg === "h" ? "2024" : "2025"
    const response = await axios.get(`https://www.smogon.com/stats/${date}/moveset/gen9vgc${year}reg${reg}bo3-1760.txt`)
    const parsedSmogonData = parseSmogonData(response.data)
    return parsedSmogonData
  } catch (error) {
    console.error(error)
  }
}

export async function smogonChaosData(date, reg) {
  try {
    const response = await axios.get(`https://www.smogon.com/stats/2025-01/chaos/gen9vgc2025reggbo3-0.json`)

    let count = 0

    return Object.entries(response.data.data).map(([pokemon, data]) => {
      if (count <= 10) {
        count++
        const speedValues = sumSpeedSpreads(pokemon, data.Spreads)

        console.log({
          pokemon,
          percentil50: calculatePercentile(speedValues, 50),
          percentil75: calculatePercentile(speedValues, 75),
          percentil90: calculatePercentile(speedValues, 90),
          percentil95: calculatePercentile(speedValues, 95)
        })
      }
    })
  } catch (error) {
    console.error(error)
  }
}

function sumSpeedSpreads(pokemon, spreads) {
  const speedSums = {}

  for (const key in spreads) {
    const nature = key.split(":")[0]
    const evSpeed = key.split(":")[1].split("/")[5]
    const value = spreads[key]

    const speed = new Pokemon(Generations.get(9), pokemon, { level: 50, nature, evs: { spe: evSpeed } }).stats.spe

    if (speedSums[speed]) {
      speedSums[speed] += value
    } else {
      speedSums[speed] = value
    }
  }

  return speedSums
}

function calculatePercentile(speedValues, percentile) {
  const sortedSpeeds = Object.entries(speedValues).sort((a, b) => a[0] - b[0])

  const totalCount = Object.values(speedValues).reduce((acc, count) => acc + count, 0)

  const rank = (percentile / 100) * totalCount

  let cumulativeCount = 0
  for (const [speed, count] of sortedSpeeds) {
    cumulativeCount += count

    if (cumulativeCount >= rank) {
      return speed
    }
  }

  return sortedSpeeds[sortedSpeeds.length - 1][0]
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
