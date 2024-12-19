import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Pokemon } from "@lib/model/pokemon"
export class Target {

  active: boolean
  pokemon: Pokemon
  damageResult: DamageResult

  constructor(pokemon: Pokemon, active: boolean = false) {
    this.active = active
    this.pokemon = pokemon
  }

}