import { Generations, Pokemon } from "@robsonbittencourt/calc"
import axios from "axios"

const SPECIAL_POKEMON = {
  Aegislash: { calcName: "Aegislash-Shield", outputName: "Aegislash-Shield" },
  Meowstic: { calcName: "Meowstic-F", outputName: "Meowstic", alsoOutputAs: "Meowstic-F" }
}

function getCalcName(pokemonName) {
  return SPECIAL_POKEMON[pokemonName]?.calcName ?? pokemonName
}

function getOutputName(pokemonName) {
  return SPECIAL_POKEMON[pokemonName]?.outputName ?? pokemonName
}

export async function smogonSpeedData(date, reg) {
  const year = date.substring(0, date.indexOf("-"))
  const format = reg.toUpperCase() === "MA" ? "championsvgc" : "vgc"
  const url = `https://www.smogon.com/stats/${date}/chaos/gen9${format}${year}reg${reg.toLowerCase()}bo3-0.json`

  const response = await axios.get(url)

  const allPokemonInJson = Object.keys(response.data.data)

  const results = allPokemonInJson
    .map(pokemon => {
      const data = mergeWithMegaIfBase(pokemon, response.data.data)
      return generateStatistics(pokemon, data, date, reg)
    })
    .filter(result => result !== null)

  Object.entries(SPECIAL_POKEMON)
    .filter(([_, config]) => config.alsoOutputAs)
    .forEach(([pokemon, config]) => {
      const data = response.data.data[pokemon]
      if (data) {
        const pokemonName = getCalcName(pokemon)
        const stats = createStatisticsObject(pokemonName, data, date, config.alsoOutputAs, reg)
        results.push(stats)
      }
    })

  return results
}

function mergeWithMegaIfBase(pokemonName, allData) {
  const data = allData[pokemonName]

  if (!data) return data
  if (pokemonName.includes("-Mega")) return data

  const megaNames = Object.keys(allData).filter(name => name === `${pokemonName}-Mega` || name.startsWith(`${pokemonName}-Mega-`))

  if (megaNames.length === 0) return data

  const mergedSpreads = { ...data.Spreads }
  let mergedRawCount = data["Raw count"]

  megaNames.forEach(megaName => {
    const megaData = allData[megaName]
    if (!megaData) return

    mergedRawCount += megaData["Raw count"]

    for (const spread in megaData.Spreads) {
      mergedSpreads[spread] = (mergedSpreads[spread] ?? 0) + megaData.Spreads[spread]
    }
  })

  return { ...data, Spreads: mergedSpreads, "Raw count": mergedRawCount }
}

function generateStatistics(pokemon, data, date, reg) {
  if (pokemon.startsWith("Gourgeist-")) return null

  const pokemonName = getCalcName(pokemon)
  const outputName = getOutputName(pokemon)

  return createStatisticsObject(pokemonName, data, date, outputName, reg)
}

function createStatisticsObject(pokemonName, data, date, outputName, reg) {
  if (!data) {
    return {
      [outputName]: {
        referenceDate: date,
        baseSpeed: calculateSpeedBase(pokemonName),
        minSpeed: calculateMinSpeed(pokemonName),
        maxSpeed: calculateMaxSpeed(pokemonName),
        minSpeedWithIvZero: calculateMinSpeedWithIvZero(pokemonName),
        minSpeedWithNegativeNature: calculateMinSpeedWithNegativeNature(pokemonName),
        maxSpeedWithNature: calculateMaxSpeedWithNature(pokemonName),
        statistics: []
      }
    }
  }

  const statistics = []

  calculateUsage(data, pokemonName, statistics, reg)
  calculateParadoxAbilities(data, pokemonName, statistics)
  calculateChoiceScarf(data, pokemonName, statistics)

  return {
    [outputName]: {
      referenceDate: date,
      baseSpeed: calculateSpeedBase(pokemonName),
      minSpeed: calculateMinSpeed(pokemonName),
      maxSpeed: calculateMaxSpeed(pokemonName),
      minSpeedWithIvZero: calculateMinSpeedWithIvZero(pokemonName),
      minSpeedWithNegativeNature: calculateMinSpeedWithNegativeNature(pokemonName),
      maxSpeedWithNature: calculateMaxSpeedWithNature(pokemonName),
      choiceScarfPercentage: itemPercentage(data, "choicescarf"),
      choiceScarfIsMoreUsed: isMoreUsedItem(data, "choicescarf"),
      boosterEnergyPercentage: itemPercentage(data, "boosterenergy"),
      boosterEnergyIsMoreUsed: isMoreUsedItem(data, "boosterenergy"),
      statistics
    }
  }
}

function itemPercentage(data, item) {
  const total = data["Raw count"]
  const itemUsage = data.Items[item]

  return calculatePercentage(itemUsage, total)
}

function isMoreUsedItem(data, itemName) {
  if (!data.Items[itemName]) return false

  const maxValue = Math.max(...Object.values(data.Items))
  return data.Items[itemName] === maxValue
}

function calculateSpeedBase(pokemon) {
  return new Pokemon(Generations.get(9), pokemon).species.baseStats.spe
}

function calculateMinSpeedWithIvZero(pokemon) {
  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Quiet", evs: { spe: 0 }, ivs: { spe: 0 } }).stats.spe
}

function calculateMinSpeedWithNegativeNature(pokemon) {
  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Quiet", evs: { spe: 0 }, ivs: { spe: 31 } }).stats.spe
}

function calculateMinSpeed(pokemon) {
  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Serious", evs: { spe: 0 } }).stats.spe
}

function calculateMaxSpeed(pokemon) {
  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Serious", evs: { spe: 252 } }).stats.spe
}

function calculateMaxSpeedWithNature(pokemon) {
  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Timid", evs: { spe: 252 } }).stats.spe
}

function calculateUsage(data, pokemon, statistics, reg) {
  const total = data["Raw count"]
  const countBySpeedEvs = aggregateSpeedSpreads(pokemon, data.Spreads, reg)

  const topThreeUsage = Object.entries(countBySpeedEvs)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)

  const result = topThreeUsage
    .filter(([speed, info]) => hasRelevantUsage(info.count, total))
    .map(([speed, info]) => buildStatistic(info.count, countBySpeedEvs, speed, total, info.speedEv, info.nature))
    .sort((a, b) => a.speed - b.speed)

  statistics.push(...result)
}

function calculateParadoxAbilities(data, pokemon, statistics) {
  if (hasAbility(data, "protosynthesis") || hasAbility(data, "quarkdrive")) {
    const total = data["Raw count"]
    const speed = pokemonSpeedPlus50percent(pokemon)
    const boosterExists = hasItem(data, "boosterenergy")
    const percentage = boosterExists ? calculatePercentage(data.Items.boosterenergy, total) : 0

    statistics.push({ type: "booster", speed, percentile: 100, percentage, speedEv: 252, nature: "" })
  }
}

function calculateChoiceScarf(data, pokemon, statistics) {
  if (hasItem(data, "choicescarf")) {
    const total = data["Raw count"]
    const percentage = calculatePercentage(data.Items.choicescarf, total)
    const isRelevantUsage = percentage >= 5

    if (isRelevantUsage) {
      const speed = pokemonSpeedPlus50percent(pokemon)
      statistics.push({ type: "scarf", speed, percentile: 100, percentage, speedEv: 252, nature: "" })
    }
  }
}

function aggregateSpeedSpreads(pokemon, spreads, reg) {
  const speedSpreads = {}

  const orderedSpreads = Object.fromEntries(Object.entries(spreads).sort((a, b) => b[1] - a[1]))

  for (const key in orderedSpreads) {
    const nature = key.split(":")[0]
    const speedEv = key.split(":")[1].split("/")[5]
    const count = orderedSpreads[key]

    const speed = calculateSpeedValue(pokemon, nature, speedEv, reg)

    if (speedSpreads[speed]) {
      speedSpreads[speed].count += count
    } else {
      speedSpreads[speed] = { count, nature, speedEv }
    }
  }

  return speedSpreads
}

function calculateSpeedValue(pokemon, nature, speedEv, reg) {
  const negativeSpeedNatures = ["Brave", "Quiet", "Relaxed", "Sassy"]
  const isChampions = reg.toUpperCase() === "MA"
  const ivs = isChampions ? { spe: 31 } : negativeSpeedNatures.includes(nature) ? { spe: 0 } : { spe: 31 }

  return new Pokemon(Generations.get(9), pokemon, { level: 50, nature, evs: { spe: speedEv }, ivs }).stats.spe
}

function hasRelevantUsage(count, total) {
  const relevantPercentage = 10
  return calculatePercentage(count, total) > relevantPercentage
}

function buildStatistic(count, countBySpeedEvs, speed, total, speedEv, nature) {
  const percentile = calculatePercentage(sumUntilEvTarget(countBySpeedEvs, speed), total)
  const percentage = calculatePercentage(count, total)
  return { type: "usage", speed: Number(speed), percentile, percentage, speedEv: Number(speedEv), nature }
}

function sumUntilEvTarget(speedValues, speed) {
  const orderedKeys = Object.keys(speedValues)
    .map(Number)
    .sort((a, b) => a - b)

  let sum = 0

  for (const key of orderedKeys) {
    sum += speedValues[key].count
    if (key === Number(speed)) break
  }

  return sum
}

function hasAbility(data, ability) {
  return Object.keys(data.Abilities).includes(ability)
}

function hasItem(data, item) {
  return Object.keys(data.Items).includes(item)
}

function pokemonSpeedPlus50percent(pokemon) {
  return Math.floor(new Pokemon(Generations.get(9), pokemon, { level: 50, nature: "Timid", evs: { spe: 252 } }).stats.spe * 1.5)
}

function calculatePercentage(value, total) {
  if (!value) return 0

  return Math.round((value * 100) / total)
}
