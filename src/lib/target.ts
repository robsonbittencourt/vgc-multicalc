import { TargetState } from 'src/data/data-store'
import { DamageResult } from "./damage-result"
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

  toState(): TargetState {
    return {
      active: this.active,
      pokemon: this.pokemon.toState()
    }
  }
}