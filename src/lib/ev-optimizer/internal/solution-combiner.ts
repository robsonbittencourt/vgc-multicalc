import { MAX_TOTAL_EVS } from "./ev-optimizer-constants"
import { AttackerContext, DoubleAttackerContext, OptimizationContext, SolutionSet } from "./ev-optimizer-types"
import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats, SurvivalThreshold } from "@lib/types"
import { AttackerSelector } from "./attacker-selector"
import { EvIntervalsCalculator } from "./ev-intervals-calculator"
import { SingleAttackerOptimizer } from "./single-attacker-optimizer"
import { SurvivalChecker } from "./survival-checker"

@Injectable({
  providedIn: "root"
})
export class SolutionCombiner {
  private evIntervalsCalculator = inject(EvIntervalsCalculator)
  private survivalChecker = inject(SurvivalChecker)
  private singleAttackerOptimizer = inject(SingleAttackerOptimizer)
  private attackerSelector = inject(AttackerSelector)

  combineThreeSolutions(solutions: SolutionSet, ctx: OptimizationContext, attackers: AttackerContext, doubleAttackers: DoubleAttackerContext): Stats | null {
    let { physicalSolution, specialSolution } = solutions
    const { doubleSolution } = solutions
    let { physicalAttacker, specialAttacker } = attackers
    const { physicalAttackers, specialAttackers } = attackers
    const { attacker1: doubleAttacker1, attacker2: doubleAttacker2 } = doubleAttackers
    const { defender, field, threshold, rollIndex } = ctx

    if (!doubleSolution) {
      const prioritizePhysical = physicalSolution && specialSolution ? physicalSolution.hp >= specialSolution.hp : true
      return this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers, threshold, rollIndex)
    }

    const testDefenderDouble = defender.clone({ evs: doubleSolution })

    if (physicalSolution && physicalAttacker) {
      const survivesPhysicalWithDouble = this.survivalChecker.checkSurvival(physicalAttacker, testDefenderDouble, field, threshold, rollIndex)

      if (survivesPhysicalWithDouble) {
        physicalSolution = null
        physicalAttacker = null
      }
    }

    if (specialSolution && specialAttacker) {
      const survivesSpecialWithDouble = this.survivalChecker.checkSurvival(specialAttacker, testDefenderDouble, field, threshold, rollIndex)

      if (survivesSpecialWithDouble) {
        specialSolution = null
        specialAttacker = null
      }
    }

    if (!physicalSolution && !specialSolution) {
      return doubleSolution
    }

    if (physicalSolution && specialSolution) {
      const optimizedCombined = this.findOptimizedCombinedSolution(
        physicalSolution,
        specialSolution,
        doubleSolution,
        defender,
        field,
        physicalAttacker,
        specialAttacker,
        doubleAttacker1,
        doubleAttacker2,
        threshold,
        physicalAttackers,
        specialAttackers,
        rollIndex
      )

      if (optimizedCombined) {
        return optimizedCombined
      }
    }

    if (physicalSolution && specialSolution) {
      const prioritizePhysical = physicalSolution.hp >= specialSolution.hp
      const twoSolutionResult = this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers, threshold, rollIndex)

      if (twoSolutionResult) {
        const finalResult = this.tryAddDoubleSolution(twoSolutionResult, doubleSolution, defender, field, doubleAttacker1, doubleAttacker2, threshold, rollIndex)
        if (finalResult) {
          return finalResult
        }
      }
    }

    if (physicalSolution && !specialSolution) {
      return this.tryCombinePhysicalWithDouble(physicalSolution, doubleSolution, defender, field, physicalAttacker, doubleAttacker1, doubleAttacker2, threshold, rollIndex)
    }

    if (specialSolution && !physicalSolution) {
      return this.tryCombineSpecialWithDouble(specialSolution, doubleSolution, defender, field, specialAttacker, doubleAttacker1, doubleAttacker2, threshold, rollIndex)
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
    rollIndex = 15
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

    const optimizedCombined = this.findOptimizedCombinedSolution(physicalSolution, specialSolution, null, defender, field, physicalAttacker, specialAttacker, null, null, threshold, physicalAttackers, specialAttackers, rollIndex)

    if (optimizedCombined) {
      return optimizedCombined
    }

    if (prioritizePhysical) {
      const remainingEvs = MAX_TOTAL_EVS - physicalSolution.hp - physicalSolution.def
      const spdToApply = Math.min(specialSolution.spd, remainingEvs)
      const result = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: spdToApply, spe: 0 }

      if (physicalAttacker && specialAttacker) {
        const survivesPhysical = this.survivalChecker.checkSurvivalWithEvs(physicalAttacker, defender, result, field, threshold, rollIndex)
        const survivesSpecial = this.survivalChecker.checkSurvivalWithEvs(specialAttacker, defender, result, field, threshold, rollIndex)

        if (survivesPhysical && survivesSpecial) {
          return result
        } else {
          if (!survivesSpecial) {
            const baseResult = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
            return this.tryOptimizeForSecondStrongest(baseResult, false, specialAttackers, specialAttacker, defender, field, threshold, rollIndex)
          }
        }
      }

      return result
    } else {
      const remainingEvs = MAX_TOTAL_EVS - specialSolution.hp - specialSolution.spd
      const minDefNeeded = this.singleAttackerOptimizer.findMinDefForPhysicalAttacker(specialSolution.hp, physicalAttacker, defender, field, threshold, rollIndex)

      if (minDefNeeded === null) {
        const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
        return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field, threshold, rollIndex)
      }

      const defToApply = Math.min(minDefNeeded, remainingEvs)
      const result = { hp: specialSolution.hp, atk: 0, def: defToApply, spa: 0, spd: specialSolution.spd, spe: 0 }

      if (physicalAttacker && specialAttacker) {
        const survivesPhysical = this.survivalChecker.checkSurvivalWithEvs(physicalAttacker, defender, result, field, threshold, rollIndex)
        const survivesSpecial = this.survivalChecker.checkSurvivalWithEvs(specialAttacker, defender, result, field, threshold, rollIndex)

        if (survivesPhysical && survivesSpecial) {
          return result
        } else {
          if (!survivesPhysical) {
            const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
            return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field, threshold, rollIndex)
          }
        }
      }

      return result
    }
  }

  private tryOptimizeForSecondStrongest(baseResult: Stats, isPhysical: boolean, attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15): Stats {
    const orderedAttackers = this.attackerSelector.findAllAttackersOrderedByStrength(attackers, strongestAttacker, defender, field, isPhysical, rollIndex)

    if (orderedAttackers.length === 0) {
      return baseResult
    }

    const totalEvsUsed = baseResult.hp + baseResult.def + baseResult.spd
    const remainingEvs = MAX_TOTAL_EVS - totalEvsUsed

    if (remainingEvs <= 0) {
      return baseResult
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    for (const attacker of orderedAttackers) {
      if (isPhysical) {
        for (const defEv of evIntervals) {
          if (totalEvsUsed + defEv > MAX_TOTAL_EVS) break

          const testResult = { ...baseResult, def: defEv }

          if (this.survivalChecker.checkSurvivalWithEvs(attacker, defender, testResult, field, threshold, rollIndex)) {
            return testResult
          }
        }
      } else {
        for (const spdEv of evIntervals) {
          if (totalEvsUsed + spdEv > MAX_TOTAL_EVS) break

          const testResult = { ...baseResult, spd: spdEv }

          if (this.survivalChecker.checkSurvivalWithEvs(attacker, defender, testResult, field, threshold, rollIndex)) {
            return testResult
          }
        }
      }
    }

    return baseResult
  }

  findOptimizedCombinedSolution(
    physicalSolution: Stats,
    specialSolution: Stats,
    doubleSolution: Stats | null,
    defender: Pokemon,
    field: Field,
    physicalAttacker: Pokemon | null,
    specialAttacker: Pokemon | null,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    threshold: SurvivalThreshold,
    physicalAttackers: Pokemon[] = [],
    specialAttackers: Pokemon[] = [],
    rollIndex = 15
  ): Stats | null {
    if (!physicalAttacker || !specialAttacker) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const minHpIndex = 0

    let bestSolution: (Stats & { totalEvs: number }) | null = null
    const tempDefender = defender.clone()

    for (let hpIndex = minHpIndex; hpIndex < evIntervals.length; hpIndex++) {
      const hpEv = evIntervals[hpIndex]
      if (bestSolution && hpEv >= bestSolution.totalEvs) break

      const minDefIndex = this.findMinStatIndex([physicalAttacker, ...physicalAttackers], defender, field, threshold, hpEv, "def", evIntervals, tempDefender, rollIndex)
      if (minDefIndex === -1) continue

      const minSpdIndex = this.findMinStatIndex([specialAttacker, ...specialAttackers], defender, field, threshold, hpEv, "spd", evIntervals, tempDefender, rollIndex)
      if (minSpdIndex === -1) continue

      if (doubleSolution && doubleAttacker1 && doubleAttacker2) {
        const defEv = evIntervals[minDefIndex]
        const spdEv = evIntervals[minSpdIndex]
        const totalEvs = hpEv + defEv + spdEv

        if (totalEvs > MAX_TOTAL_EVS) continue

        const evs = { hp: hpEv, def: defEv, spd: spdEv }
        const survivesPhysical = this.survivalChecker.checkSurvivalWithEvs(physicalAttacker, defender, evs, field, threshold, rollIndex)
        const survivesSpecial = this.survivalChecker.checkSurvivalWithEvs(specialAttacker, defender, evs, field, threshold, rollIndex)
        const survivesDouble = this.survivalChecker.checkSurvivalAgainstTwoAttackersWithEvs(doubleAttacker1, doubleAttacker2, defender, evs, field, threshold, rollIndex)

        if (survivesPhysical && survivesSpecial && survivesDouble) {
          if (!bestSolution || totalEvs < bestSolution.totalEvs) {
            bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
          }
        }
      } else {
        const defEv = evIntervals[minDefIndex]
        const spdEv = evIntervals[minSpdIndex]
        const totalEvs = hpEv + defEv + spdEv

        if (totalEvs > MAX_TOTAL_EVS) continue

        const evs = { hp: hpEv, def: defEv, spd: spdEv }

        const survivesPhysical = this.survivalChecker.checkSurvivalWithEvs(physicalAttacker, defender, evs, field, threshold, rollIndex)
        const survivesSpecial = this.survivalChecker.checkSurvivalWithEvs(specialAttacker, defender, evs, field, threshold, rollIndex)

        if (survivesPhysical && survivesSpecial) {
          if (!bestSolution || totalEvs < bestSolution.totalEvs) {
            bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
          }
        }
      }
    }

    if (bestSolution) {
      return { hp: bestSolution.hp, atk: 0, def: bestSolution.def, spa: 0, spd: bestSolution.spd, spe: 0 }
    }

    return null
  }

  private findMinStatIndex(attackers: Pokemon[], defender: Pokemon, field: Field, threshold: SurvivalThreshold, hpEv: number, stat: "def" | "spd", evIntervals: number[], tempDefender: Pokemon, rollIndex = 15): number {
    let low = 0
    let high = evIntervals.length - 1
    let result = -1

    const maxEv = evIntervals[high]
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: 0, spa: defender.evs.spa, spd: 0, spe: defender.evs.spe }

    // Check with max EV first
    tempEvs[stat] = maxEv
    if (stat === "def") tempEvs.spd = 0
    else tempEvs.def = 0

    // If checking def, spd must be 0? The original code did:
    // ...hp: hpEv, [stat]: maxEv }
    // It kept the other stat from defender.evs?
    // Let's check original code:
    // const maxDefender = defender.clone({ evs: { ...defender.evs, hp: hpEv, [stat]: maxEv } })
    // It spreads defender.evs.
    // In findOptimizedCombinedSolution, we see:
    // const minDefIndex = this.findMinStatIndex(..., defender, ...)
    // And defender comes from context.
    // Wait, in findOptimizedCombinedSolution loop, we are checking survival against physical OR special attackers separately.
    // If calculating minDefIndex for physical, we likely don't care about SpD.
    // BUT the original code used ...defender.evs.
    // If defender has 0 EVs initially (likely), then it's 0.
    // Let's assume we can set the other defensive stat to 0 or keep it.
    // To match exact behavior, we should respect what's passed in.
    // However, looking at usage:
    // minDefIndex is found considering ONLY physical attackers. Max Def, 0 SpD usually?
    // Actually, `defender.evs` might have values?
    // In `findOptimizedCombinedSolution`, `defender` is passed from `ctx`.
    // We should safely implement `setEvs` to match `...defender.evs` + overrides.

    // Actually, to be safe and efficient:
    // We can just update the specific stats we are changing on tempDefender.
    // tempDefender should already be a clone of defender when passed in, or we should set it to match defender state first?
    // In the loop of findOptimizedCombinedSolution, we want to reuse the SAME object.
    // So we should update it.

    tempEvs.def = defender.evs.def
    tempEvs.spd = defender.evs.spd
    tempEvs[stat] = maxEv

    tempDefender.setEvs(tempEvs)

    if (!this.checkSurvivalAgainstAll(attackers, tempDefender, field, threshold, rollIndex)) {
      return -1
    }

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const ev = evIntervals[mid]

      tempEvs[stat] = ev
      tempDefender.setEvs(tempEvs)

      if (this.checkSurvivalAgainstAll(attackers, tempDefender, field, threshold, rollIndex)) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  tryAddDoubleSolution(currentSolution: Stats, doubleSolution: Stats, defender: Pokemon, field: Field, doubleAttacker1: Pokemon | null, doubleAttacker2: Pokemon | null, threshold: SurvivalThreshold, rollIndex = 15): Stats | null {
    if (!doubleAttacker1 || !doubleAttacker2) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const currentTotalEvs = currentSolution.hp + currentSolution.def + currentSolution.spd
    const remainingEvs = MAX_TOTAL_EVS - currentTotalEvs

    if (remainingEvs <= 0) {
      if (this.survivalChecker.checkSurvivalAgainstTwoAttackersWithEvs(doubleAttacker1, doubleAttacker2, defender, currentSolution, field, threshold, rollIndex)) {
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

        const minSpdIndex = this.findMinStatIndexForDouble(doubleAttacker1, doubleAttacker2, defender, field, threshold, hpEv, "def", defEv, "spd", evIntervals, tempDefender, rollIndex)

        if (minSpdIndex !== -1) {
          const spdEv = evIntervals[minSpdIndex]
          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs <= MAX_TOTAL_EVS) {
            if (!bestSolution || totalEvs < bestSolution.totalEvs) {
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
    rollIndex = 15
  ): number {
    let low = 0
    let high = evIntervals.length - 1
    let result = -1

    const maxEv = evIntervals[high]
    const tempEvs = { hp: hpEv, atk: defender.evs.atk, def: defender.evs.def, spa: defender.evs.spa, spd: defender.evs.spd, spe: defender.evs.spe }

    tempEvs[fixedStat] = fixedStatValue
    tempEvs[statToOptimize] = maxEv

    tempDefender.setEvs(tempEvs)

    if (!this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex)) {
      return -1
    }

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const ev = evIntervals[mid]

      tempEvs[statToOptimize] = ev
      tempDefender.setEvs(tempEvs)

      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(attacker1, attacker2, tempDefender, field, threshold, rollIndex)) {
        result = mid
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return result
  }

  tryCombinePhysicalWithDouble(
    physicalSolution: Stats,
    doubleSolution: Stats,
    defender: Pokemon,
    field: Field,
    physicalAttacker: Pokemon | null,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    threshold: SurvivalThreshold,
    rollIndex = 15
  ): Stats {
    if (!physicalAttacker || !doubleAttacker1 || !doubleAttacker2) {
      return doubleSolution
    }

    const isDoubleSolutionInvalid = doubleSolution.hp === 0 && doubleSolution.def === 0 && doubleSolution.spd === 0

    if (isDoubleSolutionInvalid) {
      return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    let bestSolution: (Stats & { totalEvs: number }) | null = null
    const tempDefender = defender.clone()

    for (const hpEv of evIntervals) {
      if (bestSolution && hpEv >= bestSolution.totalEvs) break

      const minDefIndex = this.findMinStatIndex([physicalAttacker], defender, field, threshold, hpEv, "def", evIntervals, tempDefender, rollIndex)
      if (minDefIndex === -1) continue

      for (let defIndex = minDefIndex; defIndex < evIntervals.length; defIndex++) {
        const defEv = evIntervals[defIndex]
        if (hpEv + defEv > MAX_TOTAL_EVS) break
        if (bestSolution && hpEv + defEv >= bestSolution.totalEvs) break

        const minSpdIndex = this.findMinStatIndexForDouble(doubleAttacker1, doubleAttacker2, defender, field, threshold, hpEv, "def", defEv, "spd", evIntervals, tempDefender, rollIndex)

        if (minSpdIndex !== -1) {
          const spdEv = evIntervals[minSpdIndex]
          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs <= MAX_TOTAL_EVS) {
            if (!bestSolution || totalEvs < bestSolution.totalEvs) {
              bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
            }
          }
        }
      }
    }

    if (bestSolution) {
      return { hp: bestSolution.hp, atk: 0, def: bestSolution.def, spa: 0, spd: bestSolution.spd, spe: 0 }
    }

    return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
  }

  tryCombineSpecialWithDouble(
    specialSolution: Stats,
    doubleSolution: Stats,
    defender: Pokemon,
    field: Field,
    specialAttacker: Pokemon | null,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    threshold: SurvivalThreshold,
    rollIndex = 15
  ): Stats {
    if (!specialAttacker || !doubleAttacker1 || !doubleAttacker2) {
      return doubleSolution
    }

    const isDoubleSolutionInvalid = doubleSolution.hp === 0 && doubleSolution.def === 0 && doubleSolution.spd === 0

    if (isDoubleSolutionInvalid) {
      return { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    let bestSolution: (Stats & { totalEvs: number }) | null = null
    const tempDefender = defender.clone()

    for (const hpEv of evIntervals) {
      if (bestSolution && hpEv >= bestSolution.totalEvs) break

      const minSpdIndex = this.findMinStatIndex([specialAttacker], defender, field, threshold, hpEv, "spd", evIntervals, tempDefender, rollIndex)
      if (minSpdIndex === -1) continue

      for (let spdIndex = minSpdIndex; spdIndex < evIntervals.length; spdIndex++) {
        const spdEv = evIntervals[spdIndex]
        if (hpEv + spdEv > MAX_TOTAL_EVS) break
        if (bestSolution && hpEv + spdEv >= bestSolution.totalEvs) break

        const minDefIndex = this.findMinStatIndexForDouble(doubleAttacker1, doubleAttacker2, defender, field, threshold, hpEv, "spd", spdEv, "def", evIntervals, tempDefender, rollIndex)

        if (minDefIndex !== -1) {
          const defEv = evIntervals[minDefIndex]
          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs <= MAX_TOTAL_EVS) {
            if (!bestSolution || totalEvs < bestSolution.totalEvs) {
              bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
            }
          }
        }
      }
    }

    if (bestSolution) {
      return { hp: bestSolution.hp, atk: 0, def: bestSolution.def, spa: 0, spd: bestSolution.spd, spe: 0 }
    }

    return { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
  }

  private checkSurvivalAgainstAll(attackers: Pokemon[], defender: Pokemon, field: Field, threshold: SurvivalThreshold, rollIndex = 15): boolean {
    for (const attacker of attackers) {
      if (!this.survivalChecker.checkSurvival(attacker, defender, field, threshold, rollIndex)) {
        return false
      }
    }
    return true
  }
}
