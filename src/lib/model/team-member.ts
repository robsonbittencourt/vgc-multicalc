import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Pokemon } from "@lib/model/pokemon"

export class TeamMember {
  pokemon: Pokemon
  active: boolean
  damageResult: DamageResult

  constructor(pokemon: Pokemon, active = false) {
    this.pokemon = pokemon
    this.active = active
  }
}
