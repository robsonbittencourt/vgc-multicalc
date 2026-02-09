import { MAX_TOTAL_EVS, MIN_DAMAGE_PRODUCT_MULTIPLIER } from "./ev-optimizer-constants"
import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"
import { EvIntervalsCalculator } from "./ev-intervals-calculator"
import { EvOptimizerUtils } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

type MixedScenarioResult = {
  isValid: boolean
  minDef: number
  minSpd: number
}

@Injectable({
  providedIn: "root"
})
export class DoubleAttackerOptimizer {
  private evIntervalsCalculator = inject(EvIntervalsCalculator)
  private survivalChecker = inject(SurvivalChecker)
  private utils = inject(EvOptimizerUtils)

  optimizeForTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2): Stats {
    const attacker1IsPhysical = attacker1.moveSet.activeMove.category === "Physical"
    const attacker2IsPhysical = attacker2.moveSet.activeMove.category === "Physical"

    if (attacker1IsPhysical && attacker2IsPhysical) {
      return this.optimizeForTwoPhysicalAttackers(attacker1, attacker2, defender, field, threshold)
    } else if (!attacker1IsPhysical && !attacker2IsPhysical) {
      return this.optimizeForTwoSpecialAttackers(attacker1, attacker2, defender, field, threshold)
    } else {
      const physicalAttacker = attacker1IsPhysical ? attacker1 : attacker2
      const specialAttacker = attacker1IsPhysical ? attacker2 : attacker1
      return this.optimizeForMixedAttackers(physicalAttacker, specialAttacker, defender, field, threshold)
    }
  }

  private optimizeForTwoPhysicalAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      tempEvs.hp = evValue
      tempEvs.def = evValue
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)
    })

    const initialEv = evIntervals[minEvIntervalIndex]

    tempEvs.hp = initialEv
    tempEvs.def = initialEv
    tempEvs.spd = 0
    tempDefender.setEvs(tempEvs)

    if (!this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)) {
      return { hp: initialEv, atk: 0, def: initialEv, spa: 0, spd: 0, spe: 0 }
    }

    const initialDamageProduct = tempDefender.hp * tempDefender.def
    const minDamageProduct = initialDamageProduct * MIN_DAMAGE_PRODUCT_MULTIPLIER

    const hpValues = new Map<number, number>()
    const defValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      tempEvs.hp = hpEv
      tempEvs.def = 0
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defEv of evIntervals) {
      tempEvs.hp = 0
      tempEvs.def = defEv
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      defValues.set(defEv, tempDefender.def)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, defValues, minDamageProduct, (hp, def) => hp * def, "def")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      tempEvs.hp = combination.hp
      tempEvs.def = combination.def
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: 0, spe: 0 }
    }

    return { hp: initialEv, atk: 0, def: initialEv, spa: 0, spd: 0, spe: 0 }
  }

  private optimizeForTwoSpecialAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      tempEvs.hp = evValue
      tempEvs.def = 0
      tempEvs.spd = evValue
      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)
    })

    const initialEv = evIntervals[minEvIntervalIndex]

    tempEvs.hp = initialEv
    tempEvs.def = 0
    tempEvs.spd = initialEv
    tempDefender.setEvs(tempEvs)

    if (!this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)) {
      return { hp: initialEv, atk: 0, def: 0, spa: 0, spd: initialEv, spe: 0 }
    }

    const initialDamageProduct = tempDefender.hp * tempDefender.spd
    const minDamageProduct = initialDamageProduct * MIN_DAMAGE_PRODUCT_MULTIPLIER

    const hpValues = new Map<number, number>()
    const spdValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      tempEvs.hp = hpEv
      tempEvs.def = 0
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const spdEv of evIntervals) {
      tempEvs.hp = 0
      tempEvs.def = 0
      tempEvs.spd = spdEv
      tempDefender.setEvs(tempEvs)
      spdValues.set(spdEv, tempDefender.spd)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, spdValues, minDamageProduct, (hp, spd) => hp * spd, "spd")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      tempEvs.hp = combination.hp
      tempEvs.def = 0
      tempEvs.spd = combination.spd
      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: 0, spa: 0, spd: result.spd, spe: 0 }
    }

    return { hp: initialEv, atk: 0, def: 0, spa: 0, spd: initialEv, spe: 0 }
  }

  private optimizeForMixedAttackers(physicalAttacker: Pokemon, specialAttacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    let minHpIndex = evIntervals.length - 1
    let left = 0
    let right = evIntervals.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const hpEv = evIntervals[mid]

      const result = this.checkMixedScenario(hpEv, evIntervals, tempDefender, physicalAttacker, specialAttacker, field, threshold, MAX_TOTAL_EVS)

      if (result.isValid) {
        minHpIndex = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    const initialHp = evIntervals[minHpIndex]

    const finalResult = this.checkMixedScenario(initialHp, evIntervals, tempDefender, physicalAttacker, specialAttacker, field, threshold, MAX_TOTAL_EVS)
    const minDefEv = finalResult.minDef
    const minSpdEv = finalResult.minSpd

    let initialDef = 0
    let initialSpd = 0
    let foundInitial = false

    for (const defEv of evIntervals) {
      if (initialHp + defEv > MAX_TOTAL_EVS) continue
      for (const spdEv of evIntervals) {
        if (initialHp + defEv + spdEv > MAX_TOTAL_EVS) continue

        tempEvs.hp = initialHp
        tempEvs.def = defEv
        tempEvs.spd = spdEv
        tempDefender.setEvs(tempEvs)

        if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)) {
          initialDef = defEv
          initialSpd = spdEv
          foundInitial = true
          break
        }
      }
      if (foundInitial) break
    }

    if (!foundInitial) {
      return { hp: initialHp, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
    }

    const maxTotalEvs = initialHp + initialDef + initialSpd

    tempEvs.hp = initialHp
    tempEvs.def = initialDef
    tempEvs.spd = initialSpd
    tempDefender.setEvs(tempEvs)

    const initialDamageProduct = tempDefender.hp * (tempDefender.def + tempDefender.spd)
    const minDamageProduct = initialDamageProduct * MIN_DAMAGE_PRODUCT_MULTIPLIER

    const hpValues = new Map<number, number>()
    const defValues = new Map<number, number>()
    const spdValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      tempEvs.hp = hpEv
      tempEvs.def = 0
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defEv of evIntervals) {
      tempEvs.hp = 0
      tempEvs.def = defEv
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      defValues.set(defEv, tempDefender.def)
    }

    for (const spdEv of evIntervals) {
      tempEvs.hp = 0
      tempEvs.def = 0
      tempEvs.spd = spdEv
      tempDefender.setEvs(tempEvs)
      spdValues.set(spdEv, tempDefender.spd)
    }

    const combinations = this.utils.generateThreeStatCombinations(evIntervals, hpValues, defValues, spdValues, minDamageProduct, maxTotalEvs, minDefEv, minSpdEv, initialHp, initialDef, initialSpd)

    const result = this.utils.findBestValidCombination(combinations, combination => {
      tempEvs.hp = combination.hp
      tempEvs.def = combination.def
      tempEvs.spd = combination.spd
      tempDefender.setEvs(tempEvs)
      return this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: result.spd, spe: 0 }
    }

    return { hp: initialHp, atk: 0, def: initialDef, spa: 0, spd: initialSpd, spe: 0 }
  }

  private checkMixedScenario(hpEv: number, evIntervals: number[], tempDefender: Pokemon, physicalAttacker: Pokemon, specialAttacker: Pokemon, field: Field, threshold: SurvivalThreshold, maxTotalEvs: number): MixedScenarioResult {
    let minDefIndex = -1
    const tempEvs = { hp: hpEv, atk: tempDefender.evs.atk, def: 0, spa: tempDefender.evs.spa, spd: 0, spe: tempDefender.evs.spe }

    for (let defIndex = 0; defIndex < evIntervals.length; defIndex++) {
      const defEv = evIntervals[defIndex]
      if (hpEv + defEv > maxTotalEvs) continue

      tempEvs.def = defEv
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvival(physicalAttacker, tempDefender, field, threshold)) {
        minDefIndex = defIndex
        break
      }
    }

    if (minDefIndex === -1) return { isValid: false, minDef: 0, minSpd: 0 }

    let minSpdIndex = -1

    for (let spdIndex = 0; spdIndex < evIntervals.length; spdIndex++) {
      const spdEv = evIntervals[spdIndex]
      if (hpEv + spdEv > maxTotalEvs) continue

      tempEvs.def = 0
      tempEvs.spd = spdEv
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvival(specialAttacker, tempDefender, field, threshold)) {
        minSpdIndex = spdIndex
        break
      }
    }

    if (minSpdIndex === -1) return { isValid: false, minDef: 0, minSpd: 0 }

    const minDef = evIntervals[minDefIndex]
    const minSpd = evIntervals[minSpdIndex]
    const totalEvs = hpEv + minDef + minSpd

    if (totalEvs > maxTotalEvs) return { isValid: false, minDef: 0, minSpd: 0 }

    tempEvs.def = minDef
    tempEvs.spd = minSpd
    tempDefender.setEvs(tempEvs)

    const testMinResult = this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)

    if (testMinResult) return { isValid: true, minDef, minSpd }

    for (let defIndex = minDefIndex + 1; defIndex < Math.min(minDefIndex + 3, evIntervals.length); defIndex++) {
      const defEv = evIntervals[defIndex]
      if (hpEv + defEv + minSpd > maxTotalEvs) break

      tempEvs.def = defEv
      tempEvs.spd = minSpd
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)) {
        return { isValid: true, minDef: defEv, minSpd }
      }
    }

    for (let spdIndex = minSpdIndex + 1; spdIndex < Math.min(minSpdIndex + 3, evIntervals.length); spdIndex++) {
      const spdEv = evIntervals[spdIndex]
      if (hpEv + minDef + spdEv > maxTotalEvs) break

      tempEvs.def = minDef
      tempEvs.spd = spdEv
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)) {
        return { isValid: true, minDef, minSpd: spdEv }
      }
    }

    if (minDefIndex + 1 < evIntervals.length && minSpdIndex + 1 < evIntervals.length) {
      const defEv = evIntervals[minDefIndex + 1]
      const spdEv = evIntervals[minSpdIndex + 1]
      if (hpEv + defEv + spdEv <= maxTotalEvs) {
        tempEvs.def = defEv
        tempEvs.spd = spdEv
        tempDefender.setEvs(tempEvs)
        if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold)) {
          return { isValid: true, minDef: defEv, minSpd: spdEv }
        }
      }
    }

    return { isValid: false, minDef: 0, minSpd: 0 }
  }
}
