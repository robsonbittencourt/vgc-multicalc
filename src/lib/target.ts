import { DamageResult } from "./damage-calculator/damage-result"
import { Pokemon } from "./pokemon"
export class Target {
  
  active: boolean
  pokemon: Pokemon
  damageResult: DamageResult

  constructor(pokemon: Pokemon, active: boolean = false) {
    this.active = active
    this.pokemon = pokemon
  }

  setDamageResult(damageResult: DamageResult) {
    this.damageResult = damageResult
  }

}