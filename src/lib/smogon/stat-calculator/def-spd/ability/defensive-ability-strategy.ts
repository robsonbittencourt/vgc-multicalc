import { Field } from "@lib/model/field"
import { Pokemon } from "@lib/model/pokemon"
import { BeadsOfRuin } from "./beads-of-ruin"
import { FurCoat } from "./fur-coat"
import { GrassPelt } from "./grass-pelt"
import { MarvelScale } from "./marvel-scale"
import { Paradox } from "./paradox"
import { SwordOfRuin } from "./sword-of-ruin"

export interface DefensiveAbilityStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon, field: Field): boolean
  getModifier(): number
}

export const abilityStrategies: DefensiveAbilityStrategy[] = [new BeadsOfRuin(), new FurCoat(), new GrassPelt(), new MarvelScale(), new Paradox(), new SwordOfRuin()]
