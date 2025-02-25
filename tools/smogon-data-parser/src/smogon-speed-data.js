import { Generations, Pokemon } from "@robsonbittencourt/calc"
import axios from "axios"

export async function smogonSpeedData(date, reg) {
  const response = await axios.get(`https://www.smogon.com/stats/${date}/chaos/gen9vgc2025reg${reg}bo3-0.json`)

  return Object.entries(response.data.data).map(([pokemon, data]) => generateStatistics(pokemon, data))
}

function generateStatistics(pokemon, data) {
  const total = data["Raw count"]
  const countBySpeedEvs = aggregateSpeedSpreads(pokemon, data.Spreads)

  const topThreeUsage = Object.entries(countBySpeedEvs)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)

  const statistics = topThreeUsage
    .filter(([speed, info]) => hasRelevantUsage(info.count, total))
    .map(([speed, info]) => buildStatistic(info.count, countBySpeedEvs, speed, total, info.speedEv, info.nature))
    .sort((a, b) => a.speed - b.speed)

  return { [pokemon]: statistics }
}

function aggregateSpeedSpreads(pokemon, spreads) {
  const speedSpreads = {}

  for (const key in spreads) {
    const nature = key.split(":")[0]
    const speedEv = key.split(":")[1].split("/")[5]
    const count = spreads[key]

    const speed = new Pokemon(Generations.get(9), pokemon, { level: 50, nature, evs: { spe: speedEv } }).stats.spe

    if (speedSpreads[speed]) {
      speedSpreads[speed].count += count
    } else {
      speedSpreads[speed] = { count, nature, speedEv }
    }
  }

  return speedSpreads
}

function hasRelevantUsage(count, total) {
  const relevantPercentage = 10
  return calculatePercentage(count, total) > relevantPercentage
}

function buildStatistic(count, countBySpeedEvs, speed, total, speedEv, nature) {
  const percentile = calculatePercentage(sumUntilEvTarget(countBySpeedEvs, speed), total)
  const percentage = calculatePercentage(count, total)
  return { speed: Number(speed), percentile, percentage, speedEv: Number(speedEv), nature }
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

function calculatePercentage(value, total) {
  return Math.round((value * 100) / total)
}
