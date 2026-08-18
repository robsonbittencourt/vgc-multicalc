import { TYPE_CHART } from "@data/type-chart-data"
import { PokemonType } from "@multicalc/types"

export type TypeEffectiveness = 0 | 0.25 | 0.5 | 1 | 2 | 4

export type AbilityName = "Eelevate" | "Levitate" | "Flash Fire" | "Volt Absorb" | "Water Absorb" | "Motor Drive" | "Lightning Rod" | "Storm Drain" | "Sap Sipper" | "Dry Skin" | "Well-Baked Body" | "Wonder Guard" | "Earth Eater" | "Klutz"

export interface DefenderInput {
  ability?: AbilityName
  item?: string
}

export interface AttackerInput {
  ignoresGhostImmunity?: boolean
  moveName?: string
}

const ABILITY_IMMUNITIES: Partial<Record<AbilityName, PokemonType>> = {
  Eelevate: "Ground",
  Levitate: "Ground",
  "Flash Fire": "Fire",
  "Volt Absorb": "Electric",
  "Water Absorb": "Water",
  "Motor Drive": "Electric",
  "Lightning Rod": "Electric",
  "Storm Drain": "Water",
  "Sap Sipper": "Grass",
  "Dry Skin": "Water",
  "Well-Baked Body": "Fire",
  "Earth Eater": "Ground"
}

export class TypeChart {
  private readonly typeChart = TYPE_CHART

  getEffectiveness(attackType: PokemonType, defenseType1: PokemonType, defenseType2?: PokemonType, ability?: AbilityName, defender?: DefenderInput, attacker?: AttackerInput): TypeEffectiveness {
    if ((attackType as string) === "Stellar") {
      return 1
    }

    if (attackType === "Ground" && defender?.item === "Air Balloon" && !this.hasKlutz(defender)) {
      return 0
    }

    if (ability) {
      const immuneType = ABILITY_IMMUNITIES[ability]

      if (immuneType && immuneType === attackType && !this.isGrounded(ability, defender)) {
        return 0
      }

      if (ability === "Wonder Guard") {
        const base = this.getEffectiveness(attackType, defenseType1, defenseType2)
        return base === 2 || base === 4 ? base : 0
      }
    }

    const ignoresGhost = attacker?.ignoresGhostImmunity && (attackType === "Normal" || attackType === "Fighting")
    const ringTarget = this.hasRingTarget(defender)

    const freezeDry = attacker?.moveName === "Freeze-Dry"

    const effectiveness1 = this.typeEffectivenessAgainst(attackType, defenseType1, ignoresGhost, ringTarget, freezeDry)
    const effectiveness2 = defenseType2 ? this.typeEffectivenessAgainst(attackType, defenseType2, ignoresGhost, ringTarget, freezeDry) : 1

    const multiplier = effectiveness1 * effectiveness2

    if (multiplier === 0.25) return 0.25
    if (multiplier === 0.5) return 0.5
    if (multiplier === 1) return 1
    if (multiplier === 2) return 2
    if (multiplier === 4) return 4

    return 0
  }

  private typeEffectivenessAgainst(attackType: PokemonType, defenseType: PokemonType, ignoresGhost?: boolean, ringTarget?: boolean, freezeDry?: boolean): number {
    if (ignoresGhost && defenseType === "Ghost") {
      return 1
    }

    if (freezeDry && defenseType === "Water") {
      return 2
    }

    const effectiveness = this.typeChart[attackType][defenseType]

    if (effectiveness === 0 && ringTarget) {
      return 1
    }

    return effectiveness
  }

  private isGrounded(ability: AbilityName, defender?: DefenderInput): boolean {
    if (ability !== "Levitate" && ability !== "Eelevate") return false

    return defender?.item === "Iron Ball" && !this.hasKlutz(defender)
  }

  private hasRingTarget(defender?: DefenderInput): boolean {
    return defender?.item === "Ring Target" && !this.hasKlutz(defender)
  }

  private hasKlutz(defender?: DefenderInput): boolean {
    return defender?.ability === "Klutz"
  }

  formatEffectiveness(effectiveness: TypeEffectiveness): string {
    if (effectiveness === 0.25) return "1/4"
    if (effectiveness === 0.5) return "1/2"
    if (effectiveness === 1) return ""
    if (effectiveness === 2) return "2x"
    if (effectiveness === 4) return "4x"

    return "immune"
  }

  isWeakness(effectiveness: TypeEffectiveness): boolean {
    return effectiveness === 2 || effectiveness === 4
  }

  isResistance(effectiveness: TypeEffectiveness): boolean {
    return effectiveness === 0.25 || effectiveness === 0.5
  }

  isImmune(effectiveness: TypeEffectiveness): boolean {
    return effectiveness === 0
  }
}
