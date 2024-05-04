import { Team } from "./team";
import { PokemonCard } from "./pokemon-card";
import { Opponents } from "./opponents";

export class MainPage {

  constructor() {
    cy.visit('http://localhost:4200/')
  }

  team(): Team {
    return new Team()
  }

  opponents(): Opponents {
    return new Opponents()
  }

  selectTeamMember(pokemonName: string): PokemonCard {
    return this.team().selectTeamMember(pokemonName)  
  }
  
  getOpponent(pokemonName: string): PokemonCard {
    return this.opponents().getOpponent(pokemonName)
  }

}