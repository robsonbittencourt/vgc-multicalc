import { DamageResult } from "../damage-calculator/damage-result"
import { Pokemon } from "./pokemon"


export class TeamMember {
  pokemon: Pokemon
  active: boolean
  damageResult: DamageResult

  constructor(pokemon: Pokemon, active: boolean = false) {
    this.pokemon = pokemon
    this.active = active
  }

}