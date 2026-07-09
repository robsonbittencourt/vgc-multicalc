import { calculateDamage } from "@calc/engine/calculate"
import { getBerryResistType } from "@calc/model/items"
import { extractDamageSubArrays, Result } from "@calc/model/result"

export class StaminaBoostSimulator {
  private results: Result[]
  private recomputeDamageCache = new Map<string, number[][]>()

  constructor(results: Result[]) {
    this.results = results
  }

  turnDamages(startBoost: number, rollIndex: number, typeBerryAvailable: boolean): { damages: number[]; nextBoost: number; typeBerryAvailable: boolean } {
    const damages: number[] = []
    let boost = startBoost
    let berryAvailable = typeBerryAvailable

    for (let idx = 0; idx < this.results.length; idx++) {
      const subArrays = this.recomputeDamageAtBoost(idx, boost, berryAvailable)

      const summed = subArrays.reduce((acc, sub) => acc + sub[Math.min(rollIndex, sub.length - 1)], 0)
      damages.push(summed)
      boost = Math.min(boost + subArrays.length, 6)

      if (berryAvailable && this.consumesTypeBerry(this.results[idx])) {
        berryAvailable = false
      }
    }

    return { damages, nextBoost: boost, typeBerryAvailable: berryAvailable }
  }

  hitDamages(turns: number, startBoost: number): number[][] {
    const damages: number[][] = []
    let boost = startBoost
    let berryAvailable = true

    for (let turn = 0; turn < turns; turn++) {
      for (let idx = 0; idx < this.results.length; idx++) {
        const subArrays = this.recomputeDamageAtBoost(idx, boost, berryAvailable)
        const consumesBerry = berryAvailable && this.consumesTypeBerry(this.results[idx])

        subArrays.forEach(sub => {
          damages.push(sub)
          boost = Math.min(boost + 1, 6)
        })

        if (consumesBerry) {
          berryAvailable = false
        }
      }
    }

    return damages
  }

  private consumesTypeBerry(result: Result): boolean {
    const berryType = getBerryResistType(result.defender.item)

    return berryType !== undefined && result.move.hasType(berryType)
  }

  private recomputeDamageAtBoost(resultIndex: number, defBoost: number, typeBerryAvailable: boolean): number[][] {
    const result = this.results[resultIndex]
    const boost = Math.max(-6, Math.min(defBoost, 6))
    const cacheKey = `${resultIndex}:${boost}:${typeBerryAvailable ? 1 : 0}`
    const cached = this.recomputeDamageCache.get(cacheKey)

    if (cached) return cached

    const defender = result.defender.clone()
    defender.boosts.def = boost

    if (!typeBerryAvailable) {
      defender.item = undefined
    }

    const recomputed = calculateDamage(result.attacker, defender, result.move, result.field)

    const subArrays = extractDamageSubArrays(recomputed.damage)
    this.recomputeDamageCache.set(cacheKey, subArrays)

    return subArrays
  }
}
