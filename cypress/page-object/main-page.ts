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

}