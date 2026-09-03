import { calculateDamage } from "@calc/engine/calculate"
import { DefensiveBoosts, nextDefensiveBoosts } from "@calc/engine/defensive-boost-ladder"
import { rawTypeEffectiveness } from "@calc/engine/guards"
import { clampBoost } from "@calc/engine/math"
import { DamageDistribution } from "@calc/model/damage-distribution"
import { getBerryResistType } from "@calc/model/items"
import { Result } from "@calc/model/result"

export class ProgressiveDefensiveDamage {
  private results: Result[]
  private recomputeDamageCache = new Map<string, number[][]>()

  constructor(results: Result[]) {
    this.results = results
  }

  turnDamages(startBoosts: DefensiveBoosts, rollIndex: number, typeBerryAvailable: boolean): { damages: number[]; nextBoosts: DefensiveBoosts; typeBerryAvailable: boolean } {
    const damages: number[] = []
    let boosts = { ...startBoosts }
    let berryAvailable = typeBerryAvailable

    for (let idx = 0; idx < this.results.length; idx++) {
      const subArrays = this.recomputeDamageAtBoosts(idx, boosts, berryAvailable)

      const summed = new DamageDistribution(subArrays).totalAt(rollIndex)
      damages.push(summed)

      subArrays.forEach(() => {
        boosts = this.applyHit(idx, boosts)
      })

      if (berryAvailable && this.consumesTypeBerry(this.results[idx])) {
        berryAvailable = false
      }
    }

    return { damages, nextBoosts: boosts, typeBerryAvailable: berryAvailable }
  }

  hitDamages(turns: number, startBoosts: DefensiveBoosts): number[][] {
    const damages: number[][] = []
    let boosts = { ...startBoosts }
    let berryAvailable = true

    for (let turn = 0; turn < turns; turn++) {
      for (let idx = 0; idx < this.results.length; idx++) {
        const subArrays = this.recomputeDamageAtBoosts(idx, boosts, berryAvailable)
        const consumesBerry = berryAvailable && this.consumesTypeBerry(this.results[idx])

        subArrays.forEach(sub => {
          damages.push(sub)
          boosts = this.applyHit(idx, boosts)
        })

        if (consumesBerry) {
          berryAvailable = false
        }
      }
    }

    return damages
  }

  private applyHit(resultIndex: number, boosts: DefensiveBoosts): DefensiveBoosts {
    const result = this.results[resultIndex]

    return nextDefensiveBoosts(result.defender, result.move, boosts)
  }

  private consumesTypeBerry(result: Result): boolean {
    const berryType = getBerryResistType(result.defender.item)

    if (berryType === undefined || !result.move.hasType(berryType)) return false

    const typeEffectiveness = rawTypeEffectiveness(result.attacker, result.defender, result.move, result.field)

    return typeEffectiveness > 1 || result.move.hasType("Normal")
  }

  private recomputeDamageAtBoosts(resultIndex: number, boosts: DefensiveBoosts, typeBerryAvailable: boolean): number[][] {
    const result = this.results[resultIndex]
    const def = clampBoost(boosts.def)
    const spd = clampBoost(boosts.spd)
    const cacheKey = `${resultIndex}:${def}:${spd}:${typeBerryAvailable ? 1 : 0}`
    const cached = this.recomputeDamageCache.get(cacheKey)

    if (cached) return cached

    const defender = result.defender.clone()
    defender.boosts.def = def
    defender.boosts.spd = spd

    if (!typeBerryAvailable) {
      defender.item = undefined
    }

    const recomputed = calculateDamage(result.attacker, defender, result.move, result.field)

    const subArrays = new DamageDistribution(recomputed.damage).subArrays()
    this.recomputeDamageCache.set(cacheKey, subArrays)

    return subArrays
  }
}
