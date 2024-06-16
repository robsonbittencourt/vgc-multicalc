import { TeamMember } from "./team-member"

export class Team {
  
  selectTeamMember(pokemonName: string): TeamMember {
    const teamMember = new TeamMember(pokemonName)
    teamMember.select()

    return teamMember
  }

}