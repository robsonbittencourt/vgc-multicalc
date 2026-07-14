import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { EvIntervalsCalc } from "./ev-intervals-calc"
import { EvOptimizerUtils } from "./ev-optimizer-utils"
import { SurvivalChecker } from "./survival-checker"

export class DoubleAttackerOptimizer {
  private evIntervalsCalc = new EvIntervalsCalc()
  private utils = new EvOptimizerUtils()

  constructor(private survivalChecker: SurvivalChecker = new SurvivalChecker()) {}

  optimizeForTwoAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold = 2, rollIndex = 15, rightIsDefender = true): Stats | null {
    const attacker1IsPhysical = attacker1.moveSet.activeMove.category === "Physical"
    const attacker2IsPhysical = attacker2.moveSet.activeMove.category === "Physical"

    if (attacker1IsPhysical && attacker2IsPhysical) {
      return this.optimizeForSameCategoryAttackers(attacker1, attacker2, defender, field, threshold, rollIndex, rightIsDefender, true)
    } else if (!attacker1IsPhysical && !attacker2IsPhysical) {
      return this.optimizeForSameCategoryAttackers(attacker1, attacker2, defender, field, threshold, rollIndex, rightIsDefender, false)
    } else {
      const physicalAttacker = attacker1IsPhysical ? attacker1 : attacker2
      const specialAttacker = attacker1IsPhysical ? attacker2 : attacker1
      return this.optimizeForMixedAttackers(physicalAttacker, specialAttacker, defender, field, threshold, rollIndex, rightIsDefender)
    }
  }

  private optimizeForSameCategoryAttackers(attacker1: Pokemon, attacker2: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex: number, rightIsDefender: boolean, isPhysical: boolean): Stats | null {
    const evIntervals = this.evIntervalsCalc.getEvIntervals()
    const combinations = this.utils.generateOrderedTwoStatGrid(evIntervals)

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const combination of combinations) {
      tempEvs.hp = combination.hp
      tempEvs.def = isPhysical ? combination.secondary : 0
      tempEvs.spd = isPhysical ? 0 : combination.secondary
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return { hp: combination.hp, atk: 0, def: tempEvs.def, spa: 0, spd: tempEvs.spd, spe: 0 }
      }
    }

    return null
  }

  private optimizeForMixedAttackers(physicalAttacker: Pokemon, specialAttacker: Pokemon, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex: number, rightIsDefender = true): Stats | null {
    const evIntervals = this.evIntervalsCalc.getEvIntervals()
    const combinations = this.utils.generateOrderedThreeStatGrid(evIntervals)

    const tempDefender = defender.clone()
    const tempEvs = { hp: 0, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    for (const combination of combinations) {
      tempEvs.hp = combination.hp
      tempEvs.def = combination.def
      tempEvs.spd = combination.spd
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(physicalAttacker, specialAttacker, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        return { hp: combination.hp, atk: 0, def: combination.def, spa: 0, spd: combination.spd, spe: 0 }
      }
    }

    return null
  }
}
