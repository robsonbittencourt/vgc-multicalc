import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Team } from "@multicalc/model/team"
import { MoveProbability } from "./move-probability"

export class ConsistencyScore {
  private moveProbability = new MoveProbability()

  consistencyScore(pokemon: Pokemon, field: Field, logisticSlope = 10, logisticMidpoint = 0.85, lowAccuracyPenalty = 6, multiImperfectPenalty = 0.16, scaleExponent = 0.4): number | null {
    const moveSet = pokemon.moveSet

    if (moveSet.activeMove.name == "Struggle") return null

    const accValues = moveSet.moves.map(m => this.moveProbability.effectiveAccuracy(m, pokemon, field))

    const logisticAt1 = 1 / (1 + Math.exp(-logisticSlope * (1 - logisticMidpoint)))
    const logisticValues = accValues.map(a => 1 / (1 + Math.exp(-logisticSlope * (a - logisticMidpoint))) / logisticAt1)

    const penalized = logisticValues.map((logValue, i) => {
      const a = accValues[i]
      return logValue * Math.exp(-lowAccuracyPenalty * (1 - a))
    })

    const n = penalized.length
    const safePenalized = penalized.map(p => Math.max(p, 0.0001))
    const geometricMean = Math.exp(safePenalized.reduce((acc, x) => acc + Math.log(x), 0) / n)

    const imperfectCount = accValues.filter(a => a < 1).length
    const multiPenalty = Math.exp(-multiImperfectPenalty * Math.max(0, imperfectCount - 1))

    const raw = 100 * geometricMean * multiPenalty
    const final = 100 * Math.pow(raw / 100, scaleExponent)

    return Math.round(Number(final.toFixed(4)))
  }

  teamConsistencyScore(team: Team, field: Field, alpha = 0.6): number {
    const scores = team.teamMembers.map(m => this.consistencyScore(m.pokemon, field)).filter((s): s is number => s !== null)

    if (scores.length === 0) return 0

    const mean = scores.reduce((acc, s) => acc + s, 0) / scores.length

    const safeScores = scores.map(s => Math.max(s, 0.0001))
    const geom = Math.exp(safeScores.reduce((acc, s) => acc + Math.log(s), 0) / safeScores.length)

    const blend = alpha * mean + (1 - alpha) * geom

    return Number(blend.toFixed(4))
  }
}
