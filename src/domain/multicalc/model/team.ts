import { Pokemon } from "@multicalc/model/pokemon"
import { TeamMember } from "@multicalc/model/team-member"

const MAX_TEAM_SIZE = 6

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

  activePokemon(): Pokemon | undefined {
    return this.teamMembers.find(t => t.active)?.pokemon
  }

  activePokemonIndex(): number {
    return this.teamMembers.findIndex(t => t.active)
  }

  isFull(): boolean {
    return this.teamMembers.length >= MAX_TEAM_SIZE
  }

  isEmpty(): boolean {
    return this.teamMembers.length === 0
  }

  addMember(pokemon: Pokemon): Team {
    if (this.isFull()) {
      throw new Error(`Team already has the maximum of ${MAX_TEAM_SIZE} Pokémon`)
    }

    const shouldActivate = !this.teamMembers.some(t => t.active)
    const newMember = new TeamMember(pokemon, shouldActivate)

    return new Team(this.id, this.active, this.name, [...this.teamMembers, newMember])
  }

  removeMember(id: string): Team {
    const remainingMembers = this.teamMembers.filter(t => t.pokemon.id !== id)

    if (remainingMembers.length === 0) {
      return new Team(this.id, this.active, this.name, remainingMembers)
    }

    const reactivatedMembers = remainingMembers.map((t, index) => new TeamMember(t.pokemon, index === 0))

    return new Team(this.id, this.active, this.name, reactivatedMembers)
  }

  duplicateMember(id: string): Team {
    if (this.isFull()) {
      throw new Error(`Team already has the maximum of ${MAX_TEAM_SIZE} Pokémon`)
    }

    const memberToDuplicate = this.teamMembers.find(t => t.pokemon.id === id)!
    const duplicatedMember = new TeamMember(memberToDuplicate.pokemon.clone(), false)

    return new Team(this.id, this.active, this.name, [...this.teamMembers, duplicatedMember])
  }
}
