import { DamageResult } from "./damage-result"
import { Pokemon } from "./pokemon"

import { v4 as uuidv4 } from 'uuid'

export class TeamMember {
  id: string
  pokemon: Pokemon
  active: boolean
  damageResult: DamageResult
    
  constructor(pokemon: Pokemon, active: boolean = false) {
    this.id = uuidv4()
    this.pokemon = pokemon
    this.active = active
  }

}