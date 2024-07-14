import { Team } from "./team";
import { OpponentPokemon } from "./opponent-pokemon";
import { Opponents } from "./opponents";
import { TeamMember } from "./team-member";
import { Pokemon } from "./pokemon";

export class MainPage {

  _team: Team = new Team()
  _opponents: Opponents = new Opponents()

  constructor() {
    cy.visit('http://localhost:4200/')
  }

  selectTeamMember(pokemonName: string): TeamMember {
    return this._team.selectTeamMember(pokemonName)  
  }

  selectPokemonFromTeam(pokemonName: string): Pokemon {
    return this._team.selectTeamMember(pokemonName).pokemon()
  }
  
  addNewTeamMember(pokemonName: string): Pokemon {
    return this._team.addNewTeamMember(pokemonName)
  }

  pokemonOnEditIs(pokemonName: string) {
    cy.get('[data-cy="pokemon-select"] input').should('have.value', pokemonName)
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

  getOpponent(pokemonName: string): OpponentPokemon {
    return this._opponents.getOpponent(pokemonName)
  }

  addNewPokemonToOpponent(pokemonName: string): Pokemon {
    return this._opponents.addNewPokemon(pokemonName)
  }

  opponentExists(pokemonName: string) {
    this._opponents.exists(pokemonName)
  }

  opponentDoesNotExists(pokemonName: string) {
    this._opponents.doesNotExists(pokemonName)
  }

  deleteAllPokemonFromOpponent() {
    cy.get('[data-cy="delete-opponent-pokemon-button"]').click({force: true})
  }

  opponentSideIsEmpty() {
    this._opponents.empty()
  }

}