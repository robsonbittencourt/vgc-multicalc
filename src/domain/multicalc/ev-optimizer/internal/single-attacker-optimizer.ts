import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { EvIntervalsCalc } from "./ev-intervals-calc"
import { EvOptimizerUtils } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

export class SingleAttackerOptimizer {
  private evIntervalsCalc = new EvIntervalsCalc()
  private utils = new EvOptimizerUtils()

  constructor(private survivalChecker: SurvivalChecker = new SurvivalChecker()) {}

  optimizeForAttacker(attacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2, rollIndex = 15, rightIsDefender = true): Stats | null {
    const isPhysical = attacker.moveSet.activeMove.category == "Physical"
    const evIntervals = this.evIntervalsCalc.getEvIntervals()
    const combinations = this.utils.generateOrderedTwoStatGrid(evIntervals)

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const combination of combinations) {
      tempEvs.hp = combination.hp
      tempEvs.def = isPhysical ? combination.secondary : 0
      tempEvs.spd = isPhysical ? 0 : combination.secondary
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvival(attacker, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return { hp: combination.hp, atk: 0, def: tempEvs.def, spa: 0, spd: tempEvs.spd, spe: 0 }
      }
    }

    return null
  }

  findMinDefForPhysicalAttacker(hpEv: number, physicalAttacker: Pokemon | null, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2, rollIndex = 15, rightIsDefender = true): number | null {
    if (!physicalAttacker) {
      return null
    }

    const evIntervals = this.evIntervalsCalc.getEvIntervals()
    const tempDefender = defender.clone()
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const defEv of evIntervals) {
      if (hpEv + defEv > MAX_TOTAL_EVS) continue

      tempEvs.def = defEv
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvival(physicalAttacker, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return defEv
      }
    }

    return null
  }
}
