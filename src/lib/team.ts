import { Pokemon } from "./pokemon"
import { TeamMember } from "./team-member"

export class Team {
  private _active: boolean
  private _name: string
  private _teamMembers: TeamMember[]

  constructor(active: boolean, name: string, teamMembers: TeamMember[]) {
    this._active = active
    this._name = name
    this._teamMembers = teamMembers
  }

  get active(): boolean {
    return this._active
  }

  set active(active: boolean) {
    this._active = active
  }

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  teamMembers(): TeamMember[] {
    return this._teamMembers
  }

  activeTeamMember(): TeamMember {
    return this._teamMembers.find(t => t.active)!
  }

  activePokemon(): Pokemon {
    return this.activeTeamMember().pokemon
  }

  activateFirstTeamMember() {
    this._teamMembers[0].active = true
  }

  addTeamMember(teamMember: TeamMember) {
    this._teamMembers.push(teamMember)
  }

  first() {
    return this._teamMembers[0]
  }

  size(): number {
    return this._teamMembers.length
  }

  isFull(): boolean {
    return this.size() == 6
  }

  deleteAll() {
    this._teamMembers = []
  }

  deactivateAll() {
    this._teamMembers.forEach(t => t.active = false)
  }

  haveDefaultPokemon(): boolean {
    return this._teamMembers.find(t => t.pokemon.isDefault()) != null
  }

  removeActiveTeamMember(): TeamMember {
    const removedTeamMember = this.activeTeamMember()
    this._teamMembers = this._teamMembers.filter(teamMember => !teamMember.active)

    return removedTeamMember
  }

  isEmpty(): boolean {
    return this.size() == 0
  }
}