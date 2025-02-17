import { PokemonBuild } from "./pokemon-build"

export class TeamMember {
  private _element: any

  constructor(pokemonName: string) {
    this._element = cy.get('[data-cy="team-member-tab"]').contains(pokemonName)
  }

  select() {
    this._element.click({ force: true })
  }

  pokemon(): PokemonBuild {
    return new PokemonBuild("your-team")
  }

  delete() {
    cy.get('[data-cy="delete-from-team-button"]').click({ force: true })
  }

  combineDamage() {
    cy.get('[data-cy="damage-combined-button"]').click({ force: true })
  }

  disableCombineDamage() {
    cy.get('[data-cy="disable-damage-combined-button"]').click({ force: true })
  }
}
