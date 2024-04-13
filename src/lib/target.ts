import { DamageResult } from "./damage-result";
import { Pokemon } from "./pokemon";

export class Target {
  active: boolean
  pokemon: Pokemon
  position: number
  damageResult: DamageResult

  constructor(pokemon: Pokemon, position: number) {
    this.active = false
    this.pokemon = pokemon
    this.position = position
  }

  setDamageResult(damageResult: DamageResult) {
    this.damageResult = damageResult
  }
}