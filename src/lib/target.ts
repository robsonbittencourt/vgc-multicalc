import { DamageResult } from "./damage-result";
import { Pokemon } from "./pokemon";

export class Target {
  active: boolean
  pokemon: Pokemon
  damageResult: DamageResult

  constructor(pokemon: Pokemon) {
    this.active = false
    this.pokemon = pokemon
  }

  setDamageResult(damageResult: DamageResult) {
    this.damageResult = damageResult
  }
}