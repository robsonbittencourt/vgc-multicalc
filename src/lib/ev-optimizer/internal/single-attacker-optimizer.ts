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
export class SingleAttackerOptimizer {
  private evIntervalsCalculator = inject(EvIntervalsCalculator)
  private survivalChecker = inject(SurvivalChecker)
  private utils = inject(EvOptimizerUtils)

  findFirstValidSolution(attacker: Pokemon, defender: Pokemon, field: Field, isPhysical: boolean): Stats {
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const minEvIntervalIndex = this.utils.findMinimumEvViaBinarySearch(evIntervals, evValue => {
      const tempDefender = defender.clone({
        evs: {
          hp: evValue,
          def: isPhysical ? evValue : 0,
          spd: isPhysical ? 0 : evValue
        }
      })

      return this.survivalChecker.checkSurvival(attacker, tempDefender, field)
    })

    const evValue = evIntervals[minEvIntervalIndex]

    if (isPhysical) {
      return { ...defender.evs, hp: evValue, def: evValue, spd: 0 }
    } else {
      return { ...defender.evs, hp: evValue, def: 0, spd: evValue }
    }
  }

  optimizeForAttacker(attacker: Pokemon, defender: Pokemon, field: Field): Stats {
    const isPhysical = attacker.moveSet.activeMove.category == "Physical"
    const initialSolution = this.findFirstValidSolution(attacker, defender, field, isPhysical)
    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    const initialDefender = defender.clone({ evs: { hp: initialSolution.hp, def: initialSolution.def, spd: initialSolution.spd } })

    const initialDamageProduct = isPhysical ? initialDefender.hp * initialDefender.def : initialDefender.hp * initialDefender.spd
    const minDamageProduct = initialDamageProduct * 0.90

    const hpValues = new Map<number, number>()
    const defSpdValues = new Map<number, number>()

    for (const hpEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: hpEv, def: 0, spd: 0 } })
      hpValues.set(hpEv, tempDefender.hp)
    }

    for (const defSpdEv of evIntervals) {
      const tempDefender = defender.clone({ evs: { hp: 0, def: isPhysical ? defSpdEv : 0, spd: isPhysical ? 0 : defSpdEv } })
      defSpdValues.set(defSpdEv, isPhysical ? tempDefender.def : tempDefender.spd)
    }

    const combinations = this.utils.generateTwoStatCombinations(evIntervals, hpValues, defSpdValues, minDamageProduct, (hp, defSpd) => hp * defSpd, isPhysical ? "def" : "spd")

    const result = this.utils.findBestValidCombination(combinations, combination => {
      const tempDefender = defender.clone({ evs: { hp: combination.hp, def: combination.def, spd: combination.spd } })
      return this.survivalChecker.checkSurvival(attacker, tempDefender, field)
    })

    if (result) {
      return { hp: result.hp, atk: 0, def: result.def, spa: 0, spd: result.spd, spe: 0 }
    }

    return initialSolution
  }

  findMinDefForPhysicalAttacker(hpEv: number, physicalAttacker: Pokemon | null, defender: Pokemon, field: Field): number | null {
    if (!physicalAttacker) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    for (const defEv of evIntervals) {
      if (hpEv + defEv > 508) continue

      const tempDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: 0 } })

      if (this.survivalChecker.checkSurvival(physicalAttacker, tempDefender, field)) {
        return defEv
      }
    }

    return null
  }
}
