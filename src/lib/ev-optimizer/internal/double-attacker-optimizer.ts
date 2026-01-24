import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats } from "@lib/types"
import { EvIntervalsCalculator } from "./ev-intervals-calculator"
import { EvOptimizerUtils } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

@Injectable({
  providedIn: "root"
})
export class DoubleAttackerOptimizer {
  private evIntervalsCalculator = inject(EvIntervalsCalculator)
  private survivalChecker = inject(SurvivalChecker)
  private utils = inject(EvOptimizerUtils)

  optimizeForTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): Stats {
    const attacker1IsPhysical = attacker1.moveSet.activeMove.category === "Physical"
    const attacker2IsPhysical = attacker2.moveSet.activeMove.category === "Physical"

    if (attacker1IsPhysical && attacker2IsPhysical) {
      return this.optimizeForTwoPhysicalAttackers(attacker1, attacker2, defender, field)
    } else if (!attacker1IsPhysical && !attacker2IsPhysical) {
      return this.optimizeForTwoSpecialAttackers(attacker1, attacker2, defender, field)
    } else {
      const physicalAttacker = attacker1IsPhysical ? attacker1 : attacker2
      const specialAttacker = attacker1IsPhysical ? attacker2 : attacker1
      return this.optimizeForMixedAttackers(physicalAttacker, specialAttacker, defender, field)
    }
  }

  private optimizeForTwoPhysicalAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      const tempDefender = defender.clone({ evs: { hp: evValue, def: evValue, spd: 0 } })
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field)
    })

    const initialEv = evIntervals[minEvIntervalIndex]
    const initialDefender = defender.clone({ evs: { hp: initialEv, def: initialEv, spd: 0 } })
    const initialDamageProduct = initialDefender.hp * initialDefender.def
    const minDamageProduct = initialDamageProduct * 0.95

    const hpValues = new Map<number, number>()
    const defValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: hpEv, def: 0, spd: 0 } })
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: 0, def: defEv, spd: 0 } })
      defValues.set(defEv, tempDefender.def)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, defValues, minDamageProduct, (hp, def) => hp * def, "def")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      const tempDefender = defender.clone({ evs: { hp: combination.hp, def: combination.def, spd: 0 } })
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: 0, spe: 0 }
    }

    return { hp: initialEv, atk: 0, def: initialEv, spa: 0, spd: 0, spe: 0 }
  }

  private optimizeForTwoSpecialAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      const tempDefender = defender.clone({ evs: { hp: evValue, def: 0, spd: evValue } })
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field)
    })

    const initialEv = evIntervals[minEvIntervalIndex]
    const initialDefender = defender.clone({ evs: { hp: initialEv, def: 0, spd: initialEv } })
    const initialDamageProduct = initialDefender.hp * initialDefender.spd
    const minDamageProduct = initialDamageProduct * 0.95

    const hpValues = new Map<number, number>()
    const spdValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: hpEv, def: 0, spd: 0 } })
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const spdEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: 0, def: 0, spd: spdEv } })
      spdValues.set(spdEv, tempDefender.spd)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, spdValues, minDamageProduct, (hp, spd) => hp * spd, "spd")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      const tempDefender = defender.clone({ evs: { hp: combination.hp, def: 0, spd: combination.spd } })
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: 0, spa: 0, spd: result.spd, spe: 0 }
    }

    return { hp: initialEv, atk: 0, def: 0, spa: 0, spd: initialEv, spe: 0 }
  }

  private optimizeForMixedAttackers(physicalAttacker: Pokemon, specialAttacker: Pokemon, defender: Pokemon, field: Field): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    let minHpIndex = evIntervals.length - 1
    let left = 0
    let right = evIntervals.length - 1

    const hasValidSolutionForHp = (hpEv: number): boolean => {
      let minDefIndex = -1

      for (let defIndex = 0; defIndex < evIntervals.length; defIndex++) {
        const defEv = evIntervals[defIndex]
        if (hpEv + defEv > 508) continue

        const tempDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: 0 } })
        if (this.survivalChecker.checkSurvival(physicalAttacker, tempDefender, field)) {
          minDefIndex = defIndex
          break
        }
      }

      if (minDefIndex === -1) return false

      let minSpdIndex = -1

      for (let spdIndex = 0; spdIndex < evIntervals.length; spdIndex++) {
        const spdEv = evIntervals[spdIndex]
        if (hpEv + spdEv > 508) continue

        const tempDefender = defender.clone({ evs: { hp: hpEv, def: 0, spd: spdEv } })
        if (this.survivalChecker.checkSurvival(specialAttacker, tempDefender, field)) {
          minSpdIndex = spdIndex
          break
        }
      }

      if (minSpdIndex === -1) return false

      const minDef = evIntervals[minDefIndex]
      const minSpd = evIntervals[minSpdIndex]
      const totalEvs = hpEv + minDef + minSpd

      if (totalEvs > 508) return false

      const testDefender = defender.clone({ evs: { hp: hpEv, def: minDef, spd: minSpd } })
      const testMinResult = this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, testDefender, field)

      if (testMinResult) return true

      for (let defIndex = minDefIndex + 1; defIndex < Math.min(minDefIndex + 3, evIntervals.length); defIndex++) {
        const defEv = evIntervals[defIndex]
        if (hpEv + defEv + minSpd > 508) break

        const tempDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: minSpd } })
        if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field)) {
          return true
        }
      }

      for (let spdIndex = minSpdIndex + 1; spdIndex < Math.min(minSpdIndex + 3, evIntervals.length); spdIndex++) {
        const spdEv = evIntervals[spdIndex]
        if (hpEv + minDef + spdEv > 508) break

        const tempDefender = defender.clone({ evs: { hp: hpEv, def: minDef, spd: spdEv } })
        if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field)) {
          return true
        }
      }

      if (minDefIndex + 1 < evIntervals.length && minSpdIndex + 1 < evIntervals.length) {
        const defEv = evIntervals[minDefIndex + 1]
        const spdEv = evIntervals[minSpdIndex + 1]
        if (hpEv + defEv + spdEv <= 508) {
          const tempDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })
          if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field)) {
            return true
          }
        }
      }

      return false
    }

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const hpEv = evIntervals[mid]

      const foundValid = hasValidSolutionForHp(hpEv)

      if (foundValid) {
        minHpIndex = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    const initialHp = evIntervals[minHpIndex]

    let initialDef = 0
    let initialSpd = 0
    let foundInitial = false

    for (const defEv of evIntervals) {
      if (initialHp + defEv > 508) continue
      for (const spdEv of evIntervals) {
        if (initialHp + defEv + spdEv > 508) continue

        const tempDefender = defender.clone({ evs: { hp: initialHp, def: defEv, spd: spdEv } })

        if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field)) {
          initialDef = defEv
          initialSpd = spdEv
          foundInitial = true
          break
        }
      }
      if (foundInitial) break
    }

    if (!foundInitial) {
      return { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    }

    const initialDefender = defender.clone({ evs: { hp: initialHp, def: initialDef, spd: initialSpd } })
    const initialDamageProduct = initialDefender.hp * (initialDefender.def + initialDefender.spd)
    const minDamageProduct = initialDamageProduct * 0.95

    const hpValues = new Map<number, number>()
    const defValues = new Map<number, number>()
    const spdValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: hpEv, def: 0, spd: 0 } })
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: 0, def: defEv, spd: 0 } })
      defValues.set(defEv, tempDefender.def)
    }

    for (const spdEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: 0, def: 0, spd: spdEv } })
      spdValues.set(spdEv, tempDefender.spd)
    }

    const combinations = this.utils.generateThreeStatCombinations(evIntervals, hpValues, defValues, spdValues, minDamageProduct)

    const result = this.utils.findBestValidCombination(combinations, combination => {
      const tempDefender = defender.clone({ evs: { hp: combination.hp, def: combination.def, spd: combination.spd } })
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: result.spd, spe: 0 }
    }

    return { hp: initialHp, atk: 0, def: initialDef, spa: 0, spd: initialSpd, spe: 0 }
  }
}
