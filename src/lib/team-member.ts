import { Pokemon } from "./pokemon";

export class TeamMember {
  pokemon: Pokemon
  position: number
  active: boolean
    
  constructor(pokemon: Pokemon, position: number, active: boolean = false) {
    this.pokemon = pokemon
    this.position = position
    this.active = active
  }

}