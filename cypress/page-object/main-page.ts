import { Team } from "./team";
import { OpponentPokemon } from "./opponent-pokemon";
import { Opponents } from "./opponents";
import { TeamMember } from "./team-member";

export class MainPage {

  _team: Team = new Team()
  _opponents: Opponents = new Opponents()

  constructor() {
    cy.visit('http://localhost:4200/')
  }

  selectTeamMember(pokemonName: string): TeamMember {
    return this._team.selectTeamMember(pokemonName)  
  }
  
  getOpponent(pokemonName: string): OpponentPokemon {
    return this._opponents.getOpponent(pokemonName)
  }

  addNewTeamMember(pokemonName: string) {
    return this._team.addNewTeamMember(pokemonName)
  }

  selectTeam(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).click({force: true})
  }

  deleteTeam(teamName: string) {
    this.selectTeam(teamName)
    cy.get('[data-cy="delete-team-button"]').click({force: true})
  }

  teamIs(pokemonNames: string[]) {
    pokemonNames.forEach((pokemon) => {
      this._team.verifyIfExists(pokemon)  
    })   
  }

  teamIsEmpty(teamName: string) {
    this.selectTeam(teamName)
    this._team.isEmpty()
  }

}