import { PokemonBuild } from "./pokemon-build"

export class TeamMember {
  constructor(private pokemonName: string) {}

  private element() {
    return cy.get('[data-cy="team-member-tab"]').filter(`:contains(${this.pokemonName})`).first()
  }

  select() {
    this.element().click({ force: true })
    this.element().should("have.class", "active-tab")
  }

  ctrlSelect() {
    this.element().click({ force: true, ctrlKey: true })
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
