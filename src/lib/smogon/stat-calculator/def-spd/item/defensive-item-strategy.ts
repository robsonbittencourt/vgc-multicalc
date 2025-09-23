import { Pokemon } from "@lib/model/pokemon"
import { AssaultVest } from "./assault-vest"
import { Eviolite } from "./eviolite"

export interface DefensiveItemStrategy {
  shouldApply(isDefense: boolean, pokemon: Pokemon): boolean
  getModifier(): number
}

export const itemStrategies: DefensiveItemStrategy[] = [new Eviolite(), new AssaultVest()]
