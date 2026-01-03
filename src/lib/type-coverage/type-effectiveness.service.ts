import { Injectable } from "@angular/core"
import { PokemonType } from "@lib/types"

export type TypeEffectiveness = 0 | 0.25 | 0.5 | 1 | 2 | 4

@Injectable({
  providedIn: "root"
})
export class TypeEffectivenessService {
  private readonly typeChart: Record<PokemonType, Record<PokemonType, number>> = {
    Normal: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 0.5,
      Ghost: 0,
      Dragon: 1,
      Steel: 0.5,
      Dark: 1,
      Fairy: 1
    },
    Fire: {
      Normal: 1,
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Electric: 1,
      Ice: 2,
      Fighting: 1,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 2,
      Rock: 0.5,
      Ghost: 1,
      Dragon: 0.5,
      Steel: 2,
      Dark: 1,
      Fairy: 1
    },
    Water: {
      Normal: 1,
      Fire: 2,
      Water: 0.5,
      Grass: 0.5,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 1,
      Ground: 2,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 2,
      Ghost: 1,
      Dragon: 0.5,
      Steel: 1,
      Dark: 1,
      Fairy: 1
    },
    Grass: {
      Normal: 1,
      Fire: 0.5,
      Water: 2,
      Grass: 0.5,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 0.5,
      Ground: 2,
      Flying: 0.5,
      Psychic: 1,
      Bug: 0.5,
      Rock: 2,
      Ghost: 1,
      Dragon: 0.5,
      Steel: 0.5,
      Dark: 1,
      Fairy: 1
    },
    Electric: {
      Normal: 1,
      Fire: 1,
      Water: 2,
      Grass: 0.5,
      Electric: 0.5,
      Ice: 1,
      Fighting: 1,
      Poison: 1,
      Ground: 0,
      Flying: 2,
      Psychic: 1,
      Bug: 1,
      Rock: 1,
      Ghost: 1,
      Dragon: 0.5,
      Steel: 1,
      Dark: 1,
      Fairy: 1
    },
    Ice: {
      Normal: 1,
      Fire: 0.5,
      Water: 0.5,
      Grass: 2,
      Electric: 1,
      Ice: 0.5,
      Fighting: 1,
      Poison: 1,
      Ground: 2,
      Flying: 2,
      Psychic: 1,
      Bug: 1,
      Rock: 1,
      Ghost: 1,
      Dragon: 2,
      Steel: 0.5,
      Dark: 1,
      Fairy: 1
    },
    Fighting: {
      Normal: 2,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 2,
      Fighting: 1,
      Poison: 0.5,
      Ground: 1,
      Flying: 0.5,
      Psychic: 0.5,
      Bug: 0.5,
      Rock: 2,
      Ghost: 0,
      Dragon: 1,
      Steel: 2,
      Dark: 2,
      Fairy: 0.5
    },
    Poison: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 2,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 0.5,
      Ground: 0.5,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 0.5,
      Ghost: 0.5,
      Dragon: 1,
      Steel: 0,
      Dark: 1,
      Fairy: 2
    },
    Ground: {
      Normal: 1,
      Fire: 2,
      Water: 1,
      Grass: 0.5,
      Electric: 2,
      Ice: 1,
      Fighting: 1,
      Poison: 2,
      Ground: 1,
      Flying: 0,
      Psychic: 1,
      Bug: 0.5,
      Rock: 2,
      Ghost: 1,
      Dragon: 1,
      Steel: 2,
      Dark: 1,
      Fairy: 1
    },
    Flying: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 2,
      Electric: 0.5,
      Ice: 1,
      Fighting: 2,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 2,
      Rock: 0.5,
      Ghost: 1,
      Dragon: 1,
      Steel: 0.5,
      Dark: 1,
      Fairy: 1
    },
    Psychic: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 2,
      Poison: 2,
      Ground: 1,
      Flying: 1,
      Psychic: 0.5,
      Bug: 1,
      Rock: 1,
      Ghost: 1,
      Dragon: 1,
      Steel: 0.5,
      Dark: 0,
      Fairy: 1
    },
    Bug: {
      Normal: 1,
      Fire: 0.5,
      Water: 1,
      Grass: 2,
      Electric: 1,
      Ice: 1,
      Fighting: 0.5,
      Poison: 0.5,
      Ground: 1,
      Flying: 0.5,
      Psychic: 2,
      Bug: 1,
      Rock: 1,
      Ghost: 0.5,
      Dragon: 1,
      Steel: 0.5,
      Dark: 2,
      Fairy: 0.5
    },
    Rock: {
      Normal: 1,
      Fire: 2,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 2,
      Fighting: 0.5,
      Poison: 1,
      Ground: 0.5,
      Flying: 2,
      Psychic: 1,
      Bug: 2,
      Rock: 1,
      Ghost: 1,
      Dragon: 1,
      Steel: 0.5,
      Dark: 1,
      Fairy: 1
    },
    Ghost: {
      Normal: 0,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 2,
      Bug: 1,
      Rock: 1,
      Ghost: 2,
      Dragon: 1,
      Steel: 1,
      Dark: 0.5,
      Fairy: 1
    },
    Dragon: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 1,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 1,
      Ghost: 1,
      Dragon: 2,
      Steel: 0.5,
      Dark: 1,
      Fairy: 0
    },
    Steel: {
      Normal: 1,
      Fire: 0.5,
      Water: 0.5,
      Grass: 1,
      Electric: 0.5,
      Ice: 2,
      Fighting: 1,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 2,
      Ghost: 1,
      Dragon: 1,
      Steel: 0.5,
      Dark: 1,
      Fairy: 2
    },
    Dark: {
      Normal: 1,
      Fire: 1,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 0.5,
      Poison: 1,
      Ground: 1,
      Flying: 1,
      Psychic: 2,
      Bug: 1,
      Rock: 1,
      Ghost: 2,
      Dragon: 1,
      Steel: 1,
      Dark: 0.5,
      Fairy: 0.5
    },
    Fairy: {
      Normal: 1,
      Fire: 0.5,
      Water: 1,
      Grass: 1,
      Electric: 1,
      Ice: 1,
      Fighting: 2,
      Poison: 0.5,
      Ground: 1,
      Flying: 1,
      Psychic: 1,
      Bug: 1,
      Rock: 1,
      Ghost: 1,
      Dragon: 2,
      Steel: 0.5,
      Dark: 2,
      Fairy: 1
    }
  }

  getEffectiveness(attackType: PokemonType, defenseType1: PokemonType, defenseType2?: PokemonType): TypeEffectiveness {
    const effectiveness1 = this.typeChart[attackType][defenseType1]
    const effectiveness2 = defenseType2 ? this.typeChart[attackType][defenseType2] : 1

    const multiplier = effectiveness1 * effectiveness2

    if (multiplier === 0.25) return 0.25
    if (multiplier === 0.5) return 0.5
    if (multiplier === 1) return 1
    if (multiplier === 2) return 2
    if (multiplier === 4) return 4

    return 0
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
