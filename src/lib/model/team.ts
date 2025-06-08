import { Pokemon } from "@lib/model/pokemon"
import { TeamMember } from "@lib/model/team-member"

export class Team {
  readonly id: string
  readonly active: boolean
  readonly name: string
  readonly teamMembers: TeamMember[]

  constructor(id: string, active: boolean, name: string, teamMembers: TeamMember[]) {
    this.id = id
    this.active = active
    this.name = name
    this.teamMembers = teamMembers
  }

  activePokemon(): Pokemon {
    return this.teamMembers.find(t => t.active)!.pokemon
  }

  activePokemonIndex(): number {
    return this.teamMembers.findIndex(t => t.active)
  }

  isFull(): boolean {
    return this.teamMembers.filter(t => !t.pokemon.isDefault).length == 6
  }

  hasDefaultPokemon(): boolean {
    return this.teamMembers.find(t => t.pokemon.isDefault) != null
  }

  onlyHasDefaultPokemon() {
    return this.size() == 1 && this.activePokemon().isDefault
  }

  private size(): number {
    return this.teamMembers.length
  }
}
