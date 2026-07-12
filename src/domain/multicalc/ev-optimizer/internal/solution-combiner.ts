import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { AttackerContext, DoubleAttackerContext, OptimizationContext, SolutionSet } from "./ev-optimizer-types"
import { Field } from "@multicalc/model/field"
import { Pokemon } from "@multicalc/model/pokemon"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer/internal/ev-optimizer-types"
import { AttackerSelector } from "./attacker-selector"
import { EvIntervalsCalc } from "./ev-intervals-calc"
import { SingleAttackerOptimizer } from "./single-attacker-optimizer"
import { SurvivalChecker } from "./survival-checker"

export class SolutionCombiner {
  private evIntervalsCalc = new EvIntervalsCalc()

  constructor(
    private survivalChecker: SurvivalChecker = new SurvivalChecker(),
    private singleAttackerOptimizer: SingleAttackerOptimizer = new SingleAttackerOptimizer(),
    private attackerSelector: AttackerSelector = new AttackerSelector()
  ) {}

  combineThreeSolutions(solutions: SolutionSet, ctx: OptimizationContext, attackers: AttackerContext, doubleAttackers: DoubleAttackerContext): Stats | null {
    let { physicalSolution, specialSolution } = solutions
    const { doubleSolution } = solutions
    let { physicalAttacker, specialAttacker } = attackers
    const { physicalAttackers, specialAttackers } = attackers
    const { attacker1: doubleAttacker1, attacker2: doubleAttacker2 } = doubleAttackers
    const { defender, field, threshold, rollIndex } = ctx

    if (!doubleSolution) {
      const prioritizePhysical = physicalSolution && specialSolution ? physicalSolution.hp >= specialSolution.hp : true
      return this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers, threshold, rollIndex, ctx.rightIsDefender)
    }

    const testDefenderDouble = defender.clone({ evs: doubleSolution })

    if (physicalSolution && physicalAttacker) {
      const survivesPhysicalWithDouble = this.survivalChecker.checkSurvival(physicalAttacker, testDefenderDouble, field, threshold, rollIndex, ctx.rightIsDefender)

      if (survivesPhysicalWithDouble) {
        physicalSolution = null
        physicalAttacker = null
      }
    }

    if (specialSolution && specialAttacker) {
      const survivesSpecialWithDouble = this.survivalChecker.checkSurvival(specialAttacker, testDefenderDouble, field, threshold, rollIndex, ctx.rightIsDefender)

      if (survivesSpecialWithDouble) {
        specialSolution = null
        specialAttacker = null
      }
    }

    if (!physicalSolution && !specialSolution) {
      return doubleSolution
    }

    if (physicalSolution && specialSolution) {
      const prioritizePhysical = physicalSolution.hp >= specialSolution.hp
      const twoSolutionResult = this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers, threshold, rollIndex, ctx.rightIsDefender)!
      const finalResult = this.tryAddDoubleSolution(twoSolutionResult, doubleSolution, defender, field, doubleAttacker1, doubleAttacker2, threshold, rollIndex, ctx.rightIsDefender)

      if (finalResult) {
        return finalResult
      }
    }

    if (physicalSolution && !specialSolution) {
      return this.tryCombineSingleWithDouble(physicalSolution, doubleSolution, defender, field, physicalAttacker, doubleAttacker1, doubleAttacker2, threshold, rollIndex, ctx.rightIsDefender, true)
    }

    if (specialSolution && !physicalSolution) {
      return this.tryCombineSingleWithDouble(specialSolution, doubleSolution, defender, field, specialAttacker, doubleAttacker1, doubleAttacker2, threshold, rollIndex, ctx.rightIsDefender, false)
    }

    return doubleSolution
  }

  combineSolutions(
    physicalSolution: Stats | null,
    specialSolution: Stats | null,
    prioritizePhysical: boolean,
    defender: Pokemon,
    field: Field,
    physicalAttacker: Pokemon | null,
    specialAttacker: Pokemon | null,
    physicalAttackers: Pokemon[],
    specialAttackers: Pokemon[],
    threshold: SurvivalThreshold = 2,
    rollIndex = 15,
    rightIsDefender = true
  ): Stats | null {
    if (!physicalSolution && !specialSolution) {
      return null
    }

    if (!physicalSolution) {
      return { hp: specialSolution!.hp, atk: 0, def: 0, spa: 0, spd: specialSolution!.spd, spe: 0 }
    }

    if (!specialSolution) {
      return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
    }

    if (prioritizePhysical) {
      const remainingEvs = MAX_TOTAL_EVS - physicalSolution.hp - physicalSolution.def
      const spdToApply = Math.min(specialSolution.spd, remainingEvs)
      const result = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: spdToApply, spe: 0 }

      const survivesSpecial = this.survivalChecker.checkSurvivalWithEvs(specialAttacker!, defender, result, field, threshold, rollIndex, rightIsDefender)

      if (survivesSpecial) {
        return result
      }

      const baseResult = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }

      return this.tryOptimizeForSecondStrongest(baseResult, false, specialAttackers, specialAttacker, defender, field, threshold, rollIndex, rightIsDefender)
    } else {
      const remainingEvs = MAX_TOTAL_EVS - specialSolution.hp - specialSolution.spd
      const minDefNeeded = this.singleAttackerOptimizer.findMinDefForPhysicalAttacker(specialSolution.hp, physicalAttacker, defender, field, threshold, rollIndex, rightIsDefender)

      if (minDefNeeded === null) {
        const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
        return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field, threshold, rollIndex, rightIsDefender)
      }

      const defToApply = Math.min(minDefNeeded, remainingEvs)
      const result = { hp: specialSolution.hp, atk: 0, def: defToApply, spa: 0, spd: specialSolution.spd, spe: 0 }

      const survivesPhysical = this.survivalChecker.checkSurvivalWithEvs(physicalAttacker!, defender, result, field, threshold, rollIndex, rightIsDefender)

      if (survivesPhysical) {
        return result
      }

      const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }

      return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field, threshold, rollIndex, rightIsDefender)
    }
  }

  private tryOptimizeForSecondStrongest(baseResult: Stats, isPhysical: boolean, attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): Stats {
    const orderedAttackers = this.attackerSelector.findAllAttackersOrderedByStrength(attackers, strongestAttacker, defender, field, isPhysical, rollIndex, rightIsDefender)

    if (orderedAttackers.length === 0) {
      return baseResult
    }

    const totalEvsUsed = baseResult.hp + baseResult.def + baseResult.spd
    const remainingEvs = MAX_TOTAL_EVS - totalEvsUsed

    if (remainingEvs <= 0) {
      return baseResult
    }

    const evIntervals = this.evIntervalsCalc.getEvIntervals()

    for (const attacker of orderedAttackers) {
      if (isPhysical) {
        for (const defEv of evIntervals) {
          if (totalEvsUsed + defEv > MAX_TOTAL_EVS) break

          const testResult = { ...baseResult, def: defEv }

          if (this.survivalChecker.checkSurvivalWithEvs(attacker, defender, testResult, field, threshold, rollIndex, rightIsDefender)) {
            return testResult
          }
        }
      } else {
        for (const spdEv of evIntervals) {
          if (totalEvsUsed + spdEv > MAX_TOTAL_EVS) break

          const testResult = { ...baseResult, spd: spdEv }

          if (this.survivalChecker.checkSurvivalWithEvs(attacker, defender, testResult, field, threshold, rollIndex, rightIsDefender)) {
            return testResult
          }
        }
      }
    }

    return baseResult
  }

  private findMinStatIndex(attackers: Pokemon[], defender: Pokemon, field: Field, threshold: SurvivalThreshold, hpEv: number, stat: "def" | "spd", evIntervals: number[], tempDefender: Pokemon, rollIndex = 15, rightIsDefender = true): number {
    let low = 0
    let high = evIntervals.length - 1
    let result = -1

    const maxEv = evIntervals[high]
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    tempEvs[stat] = maxEv
    if (stat === "def") tempEvs.spd = 0
    else tempEvs.def = 0

    tempEvs.def = defender.evs.def
    tempEvs.spd = defender.evs.spd
    tempEvs[stat] = maxEv

    tempDefender.setEvs(tempEvs)

    if (!this.checkSurvivalAgainstAll(attackers, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
      return -1
    }

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const ev = evIntervals[mid]

      tempEvs[stat] = ev
      tempDefender.setEvs(tempEvs)

      if (this.checkSurvivalAgainstAll(attackers, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  tryAddDoubleSolution(
    currentSolution: Stats,
    doubleSolution: Stats,
    defender: Pokemon,
    field: Field,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    threshold: SurvivalThreshold,
    rollIndex = 15,
    rightIsDefender = true
  ): Stats | null {
    if (!doubleAttacker1 || !doubleAttacker2) {
      return null
    }

    const evIntervals = this.evIntervalsCalc.getEvIntervals()
    const currentTotalEvs = currentSolution.hp + currentSolution.def + currentSolution.spd
    const remainingEvs = MAX_TOTAL_EVS - currentTotalEvs

    if (remainingEvs <= 0) {
      if (this.survivalChecker.checkSurvivalAgainstTwoAttackersWithEvs(doubleAttacker1, doubleAttacker2, defender, currentSolution, field, threshold, rollIndex, rightIsDefender)) {
        return currentSolution
      }
      return null
    }

    const minHp = Math.max(currentSolution.hp, doubleSolution.hp)
    const minHpIndex = evIntervals.indexOf(minHp)

    let bestSolution: (Stats & { totalEvs: number }) | null = null
    const tempDefender = defender.clone()

    for (let hpIndex = minHpIndex; hpIndex < evIntervals.length; hpIndex++) {
      const hpEv = evIntervals[hpIndex]
      if (bestSolution && hpEv >= bestSolution.totalEvs) break

      for (const defEv of evIntervals) {
        if (bestSolution && hpEv + defEv >= bestSolution.totalEvs) break

        const minSpdIndex = this.findMinStatIndexForDouble(doubleAttacker1, doubleAttacker2, defender, field, threshold, hpEv, "def", defEv, "spd", evIntervals, tempDefender, rollIndex, rightIsDefender)

        if (minSpdIndex !== -1) {
          const spdEv = evIntervals[minSpdIndex]
          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs <= MAX_TOTAL_EVS) {
            if (!bestSolution || totalEvs < bestSolution.totalEvs || (totalEvs === bestSolution.totalEvs && hpEv > bestSolution.hp)) {
              bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
            }
          }
        }
      }
    }

    if (bestSolution) {
      return { hp: bestSolution.hp, atk: 0, def: bestSolution.def, spa: 0, spd: bestSolution.spd, spe: 0 }
    }

    return null
  }

  private findMinStatIndexForDouble(
    attacker1: Pokemon,
    attacker2: Pokemon,
    defender: Pokemon,
    field: Field,
    threshold: SurvivalThreshold,
    hpEv: number,
    fixedStat: "def" | "spd",
    fixedStatValue: number,
    statToOptimize: "def" | "spd",
    evIntervals: number[],
    tempDefender: Pokemon,
    rollIndex = 15,
    rightIsDefender = true
  ): number {
    let low = 0
    let high = evIntervals.length - 1
    let result = -1

    const maxEv = evIntervals[high]
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: defender.evs.def, spa: defender.evs.spa, spd: defender.evs.spd, spe: defender.evs.spe }

    tempEvs[fixedStat] = fixedStatValue
    tempEvs[statToOptimize] = maxEv

    tempDefender.setEvs(tempEvs)

    if (!this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
      return -1
    }

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const ev = evIntervals[mid]

      tempEvs[statToOptimize] = ev
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex, rightIsDefender)) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  private tryCombineSingleWithDouble(
    singleSolution: Stats,
    doubleSolution: Stats,
    defender: Pokemon,
    field: Field,
    singleAttacker: Pokemon | null,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    threshold: SurvivalThreshold,
    rollIndex: number,
    rightIsDefender: boolean,
    isPhysical: boolean
  ): Stats {
    if (!singleAttacker || !doubleAttacker1 || !doubleAttacker2) {
      return doubleSolution
    }

    const singleSpread: Stats = isPhysical ? { hp: singleSolution.hp, atk: 0, def: singleSolution.def, spa: 0, spd: 0, spe: 0 } : { hp: singleSolution.hp, atk: 0, def: 0, spa: 0, spd: singleSolution.spd, spe: 0 }
    const isDoubleSolutionInvalid = doubleSolution.hp === 0 && doubleSolution.def === 0 && doubleSolution.spd === 0

    if (isDoubleSolutionInvalid) {
      return singleSpread
    }

    const primaryStat = isPhysical ? "def" : "spd"
    const secondaryStat = isPhysical ? "spd" : "def"
    const evIntervals = this.evIntervalsCalc.getEvIntervals()

    let bestSolution: (Stats & { totalEvs: number }) | null = null
    const tempDefender = defender.clone()

    for (const hpEv of evIntervals) {
      if (bestSolution && hpEv >= bestSolution.totalEvs) break

      const minPrimaryIndex = this.findMinStatIndex([singleAttacker], defender, field, threshold, hpEv, primaryStat, evIntervals, tempDefender, rollIndex, rightIsDefender)
      if (minPrimaryIndex === -1) continue

      for (let primaryIndex = minPrimaryIndex; primaryIndex < evIntervals.length; primaryIndex++) {
        const primaryEv = evIntervals[primaryIndex]
        if (hpEv + primaryEv > MAX_TOTAL_EVS) break
        if (bestSolution && hpEv + primaryEv >= bestSolution.totalEvs) break

        const minSecondaryIndex = this.findMinStatIndexForDouble(doubleAttacker1, doubleAttacker2, defender, field, threshold, hpEv, primaryStat, primaryEv, secondaryStat, evIntervals, tempDefender, rollIndex, rightIsDefender)

        if (minSecondaryIndex !== -1) {
          const secondaryEv = evIntervals[minSecondaryIndex]
          const totalEvs = hpEv + primaryEv + secondaryEv

          if (totalEvs <= MAX_TOTAL_EVS) {
            if (!bestSolution || totalEvs < bestSolution.totalEvs || (totalEvs === bestSolution.totalEvs && hpEv > bestSolution.hp)) {
              bestSolution = { hp: hpEv, atk: 0, def: isPhysical ? primaryEv : secondaryEv, spa: 0, spd: isPhysical ? secondaryEv : primaryEv, spe: 0, totalEvs }
            }
          }
        }
      }
    }

    if (bestSolution) {
      return { hp: bestSolution.hp, atk: 0, def: bestSolution.def, spa: 0, spd: bestSolution.spd, spe: 0 }
    }

    return singleSpread
  }

  private checkSurvivalAgainstAll(attackers: Pokemon[], defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15, rightIsDefender = true): boolean {
    for (const attacker of attackers) {
      if (!this.survivalChecker.checkSurvival(attacker, defender, field, threshold, rollIndex, rightIsDefender)) {
        return false
      }
    }
    return true
  }
}
