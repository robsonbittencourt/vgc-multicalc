import { Injectable } from "@angular/core"
import { MoveSet } from "@lib/model/moveset"
import { Team } from "@lib/model/team"

@Injectable({
  providedIn: "root"
})
export class ConsistencyScoreService {
  /**
   * Calculates the consistency score of a MoveSet based on the accuracy of its moves.
   *
   * The calculation follows these steps:
   * 1. Logistic transformation: Converts accuracies (0-1) using a normalized logistic curve
   * 2. Exponential penalty: Applies an exponential penalty for moves with low accuracy
   * 3. Geometric mean: Calculates the geometric mean of penalized values (balances sensitivity to low values)
   * 4. Multi-imperfect penalty: Applies an additional penalty when there are multiple imperfect moves
   * 5. Raw score: Multiplies the geometric mean by the multi-imperfect penalty
   * 6. Final scaling: Applies a power transformation to compress/scale the final score
   *
   * Adjustable variables to make the score more or less punitive:
   *
   * @param logisticSlope (default: 10) - Controls the slope of the logistic curve.
   *   Higher values = steeper transition between high/low scores = more punitive
   *   Lower values = smoother transition = less punitive
   *
   * @param logisticMidpoint (default: 0.85) - Midpoint of the logistic curve (reference accuracy).
   *   Lower values = curve shifted left = more punitive (requires higher accuracy)
   *   Higher values = curve shifted right = less punitive (accepts lower accuracy)
   *
   * @param lowAccuracyPenalty (default: 6) - Intensity of the exponential penalty for low accuracy.
   *   Higher values = more severe penalty for moves with low accuracy = more punitive
   *   Lower values = gentler penalty = less punitive
   *
   * @param multiImperfectPenalty (default: 0.16) - Penalty for having multiple imperfect moves.
   *   Higher values = more severe penalty when there are multiple moves with accuracy < 100% = more punitive
   *   Lower values = gentler penalty = less punitive
   *
   * @param scaleExponent (default: 0.4) - Exponent of the final power transformation.
   *   Lower values = compresses high scores more = more punitive (reduced difference between scores)
   *   Higher values = maintains more difference between scores = less punitive
   *
   * @returns Score from 0-100 or null if the moveSet contains only Struggle
   */
  consistencyScore(moveSet: MoveSet, logisticSlope = 10, logisticMidpoint = 0.85, lowAccuracyPenalty = 6, multiImperfectPenalty = 0.16, scaleExponent = 0.4): number | null {
    if (moveSet.activeMove.name == "Struggle") return null

    const accuracies = moveSet.moves.map(m => m.accuracy)
    const accValues = accuracies.map(a => a / 100)

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

  /**
   * Calculates the consistency score of the entire team using a combination of arithmetic and geometric means.
   *
   * @param team - The complete team
   * @param alpha - Weight of the blend between arithmetic and geometric means (default: 0.6).
   *   Higher values = more weight on arithmetic mean (less punitive for unbalanced teams)
   *   Lower values = more weight on geometric mean (more punitive for unbalanced teams)
   *
   * @returns Score from 0-100
   */
  teamConsistencyScore(team: Team, alpha = 0.6): number {
    const scores = team.teamMembers.map(m => this.consistencyScore(m.pokemon.moveSet)).filter((s): s is number => s !== null)

    if (scores.length === 0) return 0

    const mean = scores.reduce((acc, s) => acc + s, 0) / scores.length

    const safeScores = scores.map(s => Math.max(s, 0.0001))
    const geom = Math.exp(safeScores.reduce((acc, s) => acc + Math.log(s), 0) / safeScores.length)

    const blend = alpha * mean + (1 - alpha) * geom

    return Number(blend.toFixed(4))
  }
}
