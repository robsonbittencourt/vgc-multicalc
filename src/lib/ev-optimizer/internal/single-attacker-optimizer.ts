import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"
import { EvIntervalsCalculator } from "./ev-intervals-calculator"
import { EvOptimizerUtils } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

@Injectable({
  providedIn: "root"
})
export class SingleAttackerOptimizer {
  private evIntervalsCalculator = inject(EvIntervalsCalculator)
  private survivalChecker = inject(SurvivalChecker)
  private utils = inject(EvOptimizerUtils)

  findFirstValidSolution(attacker: Pokemon, defender: Pokemon, field: Field, isPhysical: boolean, threshold: SurvivalThreshold = 2): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      tempEvs.hp = evValue
      tempEvs.def = isPhysical ? evValue : 0
      tempEvs.spd = isPhysical ? 0 : evValue

      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvival(attacker, tempDefender, field, threshold)
    })

    const evValue = evIntervals[minEvIntervalIndex]

    if (isPhysical) {
      return { ...defender.evs, hp: evValue, def: evValue, spd: 0 }
    } else {
      return { ...defender.evs, hp: evValue, def: 0, spd: evValue }
    }
  }

  optimizeForAttacker(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2): Stats | null {
    const isPhysical = attacker.moveSet.activeMove.category == "Physical"
    const initialSolution = this.findFirstValidSolution(attacker, defender, field, isPhysical, threshold)

    const initialDefender = defender.clone({ evs: { hp: initialSolution.hp, def: initialSolution.def, spd: initialSolution.spd } })
    if (!this.survivalChecker.checkSurvival(attacker, initialDefender, field, threshold)) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const initialDamageProduct = isPhysical ? initialDefender.hp * initialDefender.def : initialDefender.hp * initialDefender.spd
    const minDamageProduct = initialDamageProduct * 0.9

    const hpValues = new Map<number, number>()
    const defSpdValues = new Map<number, number>()

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const hpEv of evIntervals) {
      tempEvs.hp = hpEv
      tempEvs.def = 0
      tempEvs.spd = 0
      tempDefender.setEvs(tempEvs)
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defSpdEv of evIntervals) {
      tempEvs.hp = 0
      tempEvs.def = isPhysical ? defSpdEv : 0
      tempEvs.spd = isPhysical ? 0 : defSpdEv
      tempDefender.setEvs(tempEvs)
      defSpdValues.set(defSpdEv, isPhysical ? tempDefender.def : tempDefender.spd)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, defSpdValues, minDamageProduct, (hp, defSpd) => hp * defSpd, isPhysical ? "def" : "spd")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      tempEvs.hp = combination.hp
      tempEvs.def = combination.def
      tempEvs.spd = combination.spd
      tempDefender.setEvs(tempEvs)

      return this.survivalChecker.checkSurvival(attacker, tempDefender, field, threshold)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: result.spd, spe: 0 }
    }

    return initialSolution
  }

  findMinDefForPhysicalAttacker(hpEv: number, physicalAttacker: Pokemon | null, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2): number | null {
    if (!physicalAttacker) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const tempDefender = defender.clone()
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const defEv of evIntervals) {
      if (hpEv + defEv > MAX_TOTAL_EVS) continue

      tempEvs.def = defEv
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvival(physicalAttacker, tempDefender, field, threshold)) {
        return defEv
      }
    }

    return null
  }
}
