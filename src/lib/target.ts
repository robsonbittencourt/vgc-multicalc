import { v4 as uuidv4 } from 'uuid'
import { DamageResult } from "./damage-result"
import { Pokemon } from "./pokemon"
export class Target {
  
  id: string
  active: boolean
  pokemon: Pokemon
  position: number
  damageResult: DamageResult

  constructor(pokemon: Pokemon, position: number) {
    this.id = uuidv4()
    this.active = false
    this.pokemon = pokemon
    this.position = position
  }

  setDamageResult(damageResult: DamageResult) {
    this.damageResult = damageResult
  }
}