import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Stats } from "@lib/types"
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

  combineThreeSolutions(
    physicalSolution: Stats | null,
    specialSolution: Stats | null,
    doubleSolution: Stats | null,
    defender: Pokemon,
    field: Field,
    physicalAttacker: Pokemon | null,
    specialAttacker: Pokemon | null,
    doubleAttacker1: Pokemon | null,
    doubleAttacker2: Pokemon | null,
    physicalAttackers: Pokemon[] = [],
    specialAttackers: Pokemon[] = []
  ): Stats {
    if (!doubleSolution) {
      const prioritizePhysical = physicalSolution && specialSolution ? physicalSolution.hp >= specialSolution.hp : true
      return this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers)
    }

    const testDefenderDouble = defender.clone({ evs: doubleSolution })

    if (physicalSolution && physicalAttacker) {
      const survivesPhysicalWithDouble = this.survivalChecker.checkSurvival(physicalAttacker, testDefenderDouble, field)

      if (survivesPhysicalWithDouble) {
        physicalSolution = null
        physicalAttacker = null
      }
    }

    if (specialSolution && specialAttacker) {
      const survivesSpecialWithDouble = this.survivalChecker.checkSurvival(specialAttacker, testDefenderDouble, field)

      if (survivesSpecialWithDouble) {
        specialSolution = null
        specialAttacker = null
      }
    }

    if (!physicalSolution && !specialSolution) {
      return doubleSolution
    }

    if (physicalSolution && specialSolution) {
      const optimizedCombined = this.findOptimizedCombinedSolution(physicalSolution, specialSolution, doubleSolution, defender, field, physicalAttacker, specialAttacker, doubleAttacker1, doubleAttacker2)

      if (optimizedCombined) {
        return optimizedCombined
      }
    }

    if (physicalSolution && specialSolution) {
      const prioritizePhysical = physicalSolution.hp >= specialSolution.hp
      const twoSolutionResult = this.combineSolutions(physicalSolution, specialSolution, prioritizePhysical, defender, field, physicalAttacker, specialAttacker, physicalAttackers, specialAttackers)

      const finalResult = this.tryAddDoubleSolution(twoSolutionResult, doubleSolution, defender, field, doubleAttacker1, doubleAttacker2)
      if (finalResult) {
        return finalResult
      }
    }

    if (physicalSolution && !specialSolution) {
      return this.tryCombinePhysicalWithDouble(physicalSolution, doubleSolution, defender, field, physicalAttacker, doubleAttacker1, doubleAttacker2)
    }

    if (specialSolution && !physicalSolution) {
      return this.tryCombineSpecialWithDouble(specialSolution, doubleSolution, defender, field, specialAttacker, doubleAttacker1, doubleAttacker2)
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
    specialAttackers: Pokemon[]
  ): Stats {
    if (!physicalSolution && !specialSolution) {
      return { ...defender.evs }
    }

    if (!physicalSolution) {
      return { hp: specialSolution!.hp, atk: 0, def: 0, spa: 0, spd: specialSolution!.spd, spe: 0 }
    }

    if (!specialSolution) {
      return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
    }

    const optimizedCombined = this.findOptimizedCombinedSolution(physicalSolution, specialSolution, null, defender, field, physicalAttacker, specialAttacker, null, null)

    if (optimizedCombined) {
      return optimizedCombined
    }

    if (prioritizePhysical) {
      const remainingEvs = 508 - physicalSolution.hp - physicalSolution.def
      const spdToApply = Math.min(specialSolution.spd, remainingEvs)
      const result = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: spdToApply, spe: 0 }

      if (physicalAttacker && specialAttacker) {
        const testDefender = defender.clone({ evs: result })
        const survivesPhysical = this.survivalChecker.checkSurvival(physicalAttacker, testDefender, field)
        const survivesSpecial = this.survivalChecker.checkSurvival(specialAttacker, testDefender, field)

        if (survivesPhysical && survivesSpecial) {
          return result
        } else {
          if (!survivesSpecial) {
            const baseResult = { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
            return this.tryOptimizeForSecondStrongest(baseResult, false, specialAttackers, specialAttacker, defender, field)
          }
        }
      }

      return result
    } else {
      const remainingEvs = 508 - specialSolution.hp - specialSolution.spd
      const minDefNeeded = this.singleAttackerOptimizer.findMinDefForPhysicalAttacker(specialSolution.hp, physicalAttacker, defender, field)

      if (minDefNeeded === null) {
        const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
        return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field)
      }

      const defToApply = Math.min(minDefNeeded, remainingEvs)
      const result = { hp: specialSolution.hp, atk: 0, def: defToApply, spa: 0, spd: specialSolution.spd, spe: 0 }

      if (physicalAttacker && specialAttacker) {
        const testDefender = defender.clone({ evs: result })
        const survivesPhysical = this.survivalChecker.checkSurvival(physicalAttacker, testDefender, field)
        const survivesSpecial = this.survivalChecker.checkSurvival(specialAttacker, testDefender, field)

        if (survivesPhysical && survivesSpecial) {
          return result
        } else {
          if (!survivesPhysical) {
            const baseResult = { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
            return this.tryOptimizeForSecondStrongest(baseResult, true, physicalAttackers, physicalAttacker, defender, field)
          }
        }
      }

      return result
    }
  }

  private tryOptimizeForSecondStrongest(baseResult: Stats, isPhysical: boolean, attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field): Stats {
    const orderedAttackers = this.attackerSelector.findAllAttackersOrderedByStrength(attackers, strongestAttacker, defender, field, isPhysical)

    if (orderedAttackers.length === 0) {
      return baseResult
    }

    const totalEvsUsed = baseResult.hp + baseResult.def + baseResult.spd
    const remainingEvs = 508 - totalEvsUsed

    if (remainingEvs <= 0) {
      return baseResult
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()

    for (const attacker of orderedAttackers) {
      if (isPhysical) {
        for (const defEv of evIntervals) {
          if (totalEvsUsed + defEv > 508) break

          const testResult = { ...baseResult, def: defEv }
          const testDefender = defender.clone({ evs: testResult })

          if (this.survivalChecker.checkSurvival(attacker, testDefender, field)) {
            return testResult
          }
        }
      } else {
        for (const spdEv of evIntervals) {
          if (totalEvsUsed + spdEv > 508) break

          const testResult = { ...baseResult, spd: spdEv }
          const testDefender = defender.clone({ evs: testResult })

          if (this.survivalChecker.checkSurvival(attacker, testDefender, field)) {
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
    doubleAttacker2: Pokemon | null
  ): Stats | null {
    if (!physicalAttacker || !specialAttacker) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const minHp = Math.max(physicalSolution.hp, specialSolution.hp, doubleSolution?.hp || 0)
    const minHpIndex = evIntervals.indexOf(minHp)

    let bestSolution: (Stats & { totalEvs: number }) | null = null

    for (let hpIndex = minHpIndex; hpIndex < evIntervals.length; hpIndex++) {
      const hpEv = evIntervals[hpIndex]

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

      if (minDefIndex === -1) {
        continue
      }

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

      if (minSpdIndex === -1) {
        continue
      }

      if (doubleSolution && doubleAttacker1 && doubleAttacker2) {
        const defEv = evIntervals[minDefIndex]
        const spdEv = evIntervals[minSpdIndex]
        const totalEvs = hpEv + defEv + spdEv

        if (totalEvs > 508) continue

        const testDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })

        const survivesPhysical = this.survivalChecker.checkSurvival(physicalAttacker, testDefender, field)
        const survivesSpecial = this.survivalChecker.checkSurvival(specialAttacker, testDefender, field)
        const survivesDouble = this.survivalChecker.checkSurvivalAgainstTwoAttackers(doubleAttacker1, doubleAttacker2, testDefender, field)

        if (survivesPhysical && survivesSpecial && survivesDouble) {
          if (!bestSolution || totalEvs < bestSolution.totalEvs) {
            bestSolution = { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0, totalEvs }
          }
        }
      } else {
        const defEv = evIntervals[minDefIndex]
        const spdEv = evIntervals[minSpdIndex]
        const totalEvs = hpEv + defEv + spdEv

        if (totalEvs > 508) continue

        const testDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })

        const survivesPhysical = this.survivalChecker.checkSurvival(physicalAttacker, testDefender, field)
        const survivesSpecial = this.survivalChecker.checkSurvival(specialAttacker, testDefender, field)

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

  tryAddDoubleSolution(currentSolution: Stats, doubleSolution: Stats, defender: Pokemon, field: Field, doubleAttacker1: Pokemon | null, doubleAttacker2: Pokemon | null): Stats | null {
    if (!doubleAttacker1 || !doubleAttacker2) {
      return null
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const currentTotalEvs = currentSolution.hp + currentSolution.def + currentSolution.spd
    const remainingEvs = 508 - currentTotalEvs

    if (remainingEvs <= 0) {
      const testDefender = defender.clone({ evs: currentSolution })
      if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(doubleAttacker1, doubleAttacker2, testDefender, field)) {
        return currentSolution
      }
      return null
    }

    const minHp = Math.max(currentSolution.hp, doubleSolution.hp)
    const minHpIndex = evIntervals.indexOf(minHp)

    for (let hpIndex = minHpIndex; hpIndex < evIntervals.length; hpIndex++) {
      const hpEv = evIntervals[hpIndex]

      for (const defEv of evIntervals) {
        for (const spdEv of evIntervals) {
          const totalEvs = hpEv + defEv + spdEv

          if (totalEvs > 508) continue

          const testDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })

          if (this.survivalChecker.checkSurvivalAgainstTwoAttackers(doubleAttacker1, doubleAttacker2, testDefender, field)) {
            return { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0 }
          }
        }
      }
    }

    return null
  }

  tryCombinePhysicalWithDouble(physicalSolution: Stats, doubleSolution: Stats, defender: Pokemon, field: Field, physicalAttacker: Pokemon | null, doubleAttacker1: Pokemon | null, doubleAttacker2: Pokemon | null): Stats {
    if (!physicalAttacker || !doubleAttacker1 || !doubleAttacker2) {
      return doubleSolution
    }

    const isDoubleSolutionInvalid = doubleSolution.hp === 0 && doubleSolution.def === 0 && doubleSolution.spd === 0

    if (isDoubleSolutionInvalid) {
      return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const minHp = Math.max(physicalSolution.hp, doubleSolution.hp)

    for (const hpEv of evIntervals) {
      if (hpEv < minHp) continue

      for (const defEv of evIntervals) {
        if (hpEv + defEv > 508) continue

        for (const spdEv of evIntervals) {
          if (hpEv + defEv + spdEv > 508) continue

          const testDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })

          const survivesPhysical = this.survivalChecker.checkSurvival(physicalAttacker, testDefender, field)
          const survivesDouble = this.survivalChecker.checkSurvivalAgainstTwoAttackers(doubleAttacker1, doubleAttacker2, testDefender, field)

          if (survivesPhysical && survivesDouble) {
            return { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0 }
          }
        }
      }
    }

    return { hp: physicalSolution.hp, atk: 0, def: physicalSolution.def, spa: 0, spd: 0, spe: 0 }
  }

  tryCombineSpecialWithDouble(specialSolution: Stats, doubleSolution: Stats, defender: Pokemon, field: Field, specialAttacker: Pokemon | null, doubleAttacker1: Pokemon | null, doubleAttacker2: Pokemon | null): Stats {
    if (!specialAttacker || !doubleAttacker1 || !doubleAttacker2) {
      return doubleSolution
    }

    const isDoubleSolutionInvalid = doubleSolution.hp === 0 && doubleSolution.def === 0 && doubleSolution.spd === 0

    if (isDoubleSolutionInvalid) {
      return { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
    }

    const evIntervals = this.evIntervalsCalculator.getEvIntervals()
    const minHp = Math.max(specialSolution.hp, doubleSolution.hp)

    for (const hpEv of evIntervals) {
      if (hpEv < minHp) continue

      for (const defEv of evIntervals) {
        if (hpEv + defEv > 508) continue

        for (const spdEv of evIntervals) {
          if (hpEv + defEv + spdEv > 508) continue

          const testDefender = defender.clone({ evs: { hp: hpEv, def: defEv, spd: spdEv } })

          const survivesSpecial = this.survivalChecker.checkSurvival(specialAttacker, testDefender, field)
          const survivesDouble = this.survivalChecker.checkSurvivalAgainstTwoAttackers(doubleAttacker1, doubleAttacker2, testDefender, field)

          if (survivesSpecial && survivesDouble) {
            return { hp: hpEv, atk: 0, def: defEv, spa: 0, spd: spdEv, spe: 0 }
          }
        }
      }
    }

    return { hp: specialSolution.hp, atk: 0, def: 0, spa: 0, spd: specialSolution.spd, spe: 0 }
  }
}
