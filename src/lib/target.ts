import { DamageResult } from "./damage-result";
import { Pokemon } from "./pokemon";

export class Target {
  pokemon: Pokemon
  damageResult: DamageResult

  constructor(pokemon: Pokemon) {
    this.pokemon = pokemon
  }

  setDamageResult(damageResult: DamageResult) {
    this.damageResult = damageResult
  }
}