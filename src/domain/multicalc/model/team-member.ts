import { Pokemon } from "@multicalc/model/pokemon"

export class TeamMember {
  pokemon: Pokemon
  active: boolean

  constructor(pokemon: Pokemon, active = false) {
    this.pokemon = pokemon
    this.active = active
  }
}
