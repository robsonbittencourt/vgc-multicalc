import { inject, Injectable } from "@angular/core"
import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Category } from "@lib/types"
import { SurvivalChecker } from "./survival-checker"

export type AttackerPriorityResult = {
  prioritizePhysical: boolean
  physicalStrongestAttacker: Pokemon | null
  specialStrongestAttacker: Pokemon | null
  natureUsed: string | null
}

@Injectable({
  providedIn: "root"
})
export class AttackerSelector {
  private survivalChecker = inject(SurvivalChecker)

  getPhysicalAttackers(attackers: Pokemon[]): Pokemon[] {
    return this.getAttackersByCategory(attackers, "Physical")
  }

  getSpecialAttackers(attackers: Pokemon[]): Pokemon[] {
    return this.getAttackersByCategory(attackers, "Special")
  }

  private getAttackersByCategory(attackers: Pokemon[], category: Category): Pokemon[] {
    return attackers.filter(attacker => {
      if (attacker.isDefault) return false

      return attacker.moveSet.activeMove.category === category
    })
  }

  determinePriority(physicalAttackers: Pokemon[], specialAttackers: Pokemon[], defender: Pokemon, field: Field, updateNature = false): AttackerPriorityResult {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    const defenderWithMaxPhysical = defender.clone({ evs: { hp: 252, def: 252, spd: 0 } })
    const defenderWithMaxSpecial = defender.clone({ evs: { hp: 252, def: 0, spd: 252 } })

    let physicalSurvivingCount = 0
    let specialSurvivingCount = 0
    let physicalStrongestAttacker: Pokemon | null = null
    let specialStrongestAttacker: Pokemon | null = null
    let physicalMaxDamage = 0
    let specialMaxDamage = 0

    for (const attacker of physicalAttackers) {
      const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderWithNoEv, field)
      const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderWithMaxPhysical, field)

      if (!survivesWithMin && survivesWithMax) {
        physicalSurvivingCount++
      }

      const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderWithMaxPhysical, field)

      if (damage < defenderWithMaxPhysical.hp && damage > physicalMaxDamage) {
        physicalMaxDamage = damage
        physicalStrongestAttacker = attacker
      }
    }

    for (const attacker of specialAttackers) {
      const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderWithNoEv, field)
      const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderWithMaxSpecial, field)

      if (!survivesWithMin && survivesWithMax) {
        specialSurvivingCount++
      }

      const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderWithMaxSpecial, field)

      if (damage < defenderWithMaxSpecial.hp && damage > specialMaxDamage) {
        specialMaxDamage = damage
        specialStrongestAttacker = attacker
      }
    }

    let defNaturePhysicalSurvivingCount = 0
    let defNatureSpecialSurvivingCount = 0
    let defNaturePhysicalStrongestAttacker: Pokemon | null = null
    let defNatureSpecialStrongestAttacker: Pokemon | null = null
    let defNaturePhysicalMaxDamage = 0
    let defNatureSpecialMaxDamage = 0

    let spdNaturePhysicalSurvivingCount = 0
    let spdNatureSpecialSurvivingCount = 0
    let spdNaturePhysicalStrongestAttacker: Pokemon | null = null
    let spdNatureSpecialStrongestAttacker: Pokemon | null = null
    let spdNaturePhysicalMaxDamage = 0
    let spdNatureSpecialMaxDamage = 0

    if (updateNature) {
      const { defNature, spdNature } = this.getDefensiveNatures(defender)

      const defenderDefNoEv = defender.clone({ nature: defNature, evs: { hp: 0, def: 0, spd: 0 } })
      const defenderDefMaxPhysical = defender.clone({ nature: defNature, evs: { hp: 252, def: 252, spd: 0 } })
      const defenderDefMaxSpecial = defender.clone({ nature: defNature, evs: { hp: 252, def: 0, spd: 252 } })

      for (const attacker of physicalAttackers) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderDefNoEv, field)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderDefMaxPhysical, field)

        if (!survivesWithMin && survivesWithMax) {
          defNaturePhysicalSurvivingCount++
        }

        const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderDefMaxPhysical, field)

        if (damage < defenderDefMaxPhysical.hp && damage > defNaturePhysicalMaxDamage) {
          defNaturePhysicalMaxDamage = damage
          defNaturePhysicalStrongestAttacker = attacker
        }
      }

      for (const attacker of specialAttackers) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderDefNoEv, field)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderDefMaxSpecial, field)

        if (!survivesWithMin && survivesWithMax) {
          defNatureSpecialSurvivingCount++
        }

        const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderDefMaxSpecial, field)

        if (damage < defenderDefMaxSpecial.hp && damage > defNatureSpecialMaxDamage) {
          defNatureSpecialMaxDamage = damage
          defNatureSpecialStrongestAttacker = attacker
        }
      }

      const defenderSpdNoEv = defender.clone({ nature: spdNature, evs: { hp: 0, def: 0, spd: 0 } })
      const defenderSpdMaxPhysical = defender.clone({ nature: spdNature, evs: { hp: 252, def: 252, spd: 0 } })
      const defenderSpdMaxSpecial = defender.clone({ nature: spdNature, evs: { hp: 252, def: 0, spd: 252 } })

      for (const attacker of physicalAttackers) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderSpdNoEv, field)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderSpdMaxPhysical, field)

        if (!survivesWithMin && survivesWithMax) {
          spdNaturePhysicalSurvivingCount++
        }

        const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderSpdMaxPhysical, field)

        if (damage < defenderSpdMaxPhysical.hp && damage > spdNaturePhysicalMaxDamage) {
          spdNaturePhysicalMaxDamage = damage
          spdNaturePhysicalStrongestAttacker = attacker
        }
      }

      for (const attacker of specialAttackers) {
        const survivesWithMin = this.survivalChecker.checkSurvival(attacker, defenderSpdNoEv, field)
        const survivesWithMax = this.survivalChecker.checkSurvival(attacker, defenderSpdMaxSpecial, field)

        if (!survivesWithMin && survivesWithMax) {
          spdNatureSpecialSurvivingCount++
        }

        const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderSpdMaxSpecial, field)

        if (damage < defenderSpdMaxSpecial.hp && damage > spdNatureSpecialMaxDamage) {
          spdNatureSpecialMaxDamage = damage
          spdNatureSpecialStrongestAttacker = attacker
        }
      }
    }

    const currentTotalSurviving = physicalSurvivingCount + specialSurvivingCount
    const defNatureTotalSurviving = defNaturePhysicalSurvivingCount + defNatureSpecialSurvivingCount
    const spdNatureTotalSurviving = spdNaturePhysicalSurvivingCount + spdNatureSpecialSurvivingCount

    let natureUsed: string | null = null
    let finalPhysicalSurvivingCount = physicalSurvivingCount
    let finalSpecialSurvivingCount = specialSurvivingCount
    let finalPhysicalStrongestAttacker = physicalStrongestAttacker
    let finalSpecialStrongestAttacker = specialStrongestAttacker

    if (updateNature) {
      const { defNature, spdNature } = this.getDefensiveNatures(defender)
      const maxSurviving = Math.max(currentTotalSurviving, defNatureTotalSurviving, spdNatureTotalSurviving)

      if (defNatureTotalSurviving === maxSurviving && defNatureTotalSurviving >= currentTotalSurviving) {
        natureUsed = defNature
        finalPhysicalSurvivingCount = defNaturePhysicalSurvivingCount
        finalSpecialSurvivingCount = defNatureSpecialSurvivingCount
        finalPhysicalStrongestAttacker = defNaturePhysicalStrongestAttacker
        finalSpecialStrongestAttacker = defNatureSpecialStrongestAttacker
      } else if (spdNatureTotalSurviving === maxSurviving && spdNatureTotalSurviving >= currentTotalSurviving) {
        natureUsed = spdNature
        finalPhysicalSurvivingCount = spdNaturePhysicalSurvivingCount
        finalSpecialSurvivingCount = spdNatureSpecialSurvivingCount
        finalPhysicalStrongestAttacker = spdNaturePhysicalStrongestAttacker
        finalSpecialStrongestAttacker = spdNatureSpecialStrongestAttacker
      }
    }

    const prioritizePhysical = finalPhysicalSurvivingCount >= finalSpecialSurvivingCount

    return {
      prioritizePhysical,
      physicalStrongestAttacker: finalPhysicalStrongestAttacker,
      specialStrongestAttacker: finalSpecialStrongestAttacker,
      natureUsed
    }
  }

  private getDefensiveNatures(defender: Pokemon): { defNature: string; spdNature: string } {
    const moves = [defender.moveSet.move1, defender.moveSet.move2, defender.moveSet.move3, defender.moveSet.move4]

    const physicalMoves = moves.filter(move => move.category === "Physical").length
    const specialMoves = moves.filter(move => move.category === "Special").length

    const hasMorePhysicalMoves = physicalMoves > specialMoves

    return {
      defNature: hasMorePhysicalMoves ? "Impish" : "Bold",
      spdNature: hasMorePhysicalMoves ? "Careful" : "Calm"
    }
  }

  findSecondStrongestAttacker(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean): Pokemon | null {
    if (!strongestAttacker || attackers.length <= 1) {
      return null
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    let secondStrongestAttacker: Pokemon | null = null
    let secondMaxDamage = 0

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderWithMax, field)

      if (damage < defenderWithMax.hp && damage > secondMaxDamage) {
        secondMaxDamage = damage
        secondStrongestAttacker = attacker
      }
    }

    return secondStrongestAttacker
  }

  findAllAttackersOrderedByStrength(attackers: Pokemon[], strongestAttacker: Pokemon | null, defender: Pokemon, field: Field, isPhysical: boolean): Pokemon[] {
    if (!strongestAttacker || attackers.length <= 1) {
      return []
    }

    const defenderWithMax = defender.clone({ evs: { hp: 252, def: isPhysical ? 252 : 0, spd: isPhysical ? 0 : 252 } })
    const attackersWithDamage: { attacker: Pokemon; damage: number }[] = []

    for (const attacker of attackers) {
      if (attacker === strongestAttacker) continue

      const damage = this.survivalChecker.calculateMaxDamage(attacker, defenderWithMax, field)

      if (damage < defenderWithMax.hp) {
        attackersWithDamage.push({ attacker, damage })
      }
    }

    attackersWithDamage.sort((a, b) => b.damage - a.damage)

    return attackersWithDamage.map(item => item.attacker)
  }

  findStrongestDoubleTarget(defender: Pokemon, targets: Target[], field: Field): { attacker1: Pokemon; attacker2: Pokemon; maxDamage: number } | null {
    const defenderWithNoEv = defender.clone({ evs: { hp: 0, def: 0, spd: 0 } })
    let strongestAttacker1: Pokemon | null = null
    let strongestAttacker2: Pokemon | null = null
    let maxDamage = 0

    for (const target of targets) {
      if (target.pokemon.isDefault) continue

      if (target.secondPokemon && !target.secondPokemon.isDefault) {
        const combinedDamage = this.survivalChecker.calculateMaxCombinedDamage(target.pokemon, target.secondPokemon, defenderWithNoEv, field)

        if (combinedDamage > maxDamage) {
          maxDamage = combinedDamage
          strongestAttacker1 = target.pokemon
          strongestAttacker2 = target.secondPokemon
        }
      }
    }

    if (!strongestAttacker1 || !strongestAttacker2) return null

    return {
      attacker1: strongestAttacker1,
      attacker2: strongestAttacker2,
      maxDamage
    }
  }
}
