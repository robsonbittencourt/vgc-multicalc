import { MobileShell } from "@page-object/mobile-shell"

export class MobileCalcShell extends MobileShell {
  expandOpponentCard(pokemonName: string): this {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="toggle-card-expansion"]').click()
    return this
  }

  deleteOpponentCard(pokemonName: string): this {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="delete-opponent-pokemon"]').click()
    return this
  }

  toggleFirstCardExpansion(): this {
    cy.get('[data-cy="toggle-card-expansion"]').first().click()
    return this
  }

  expansionTogglesCountIsAtLeast(count: number) {
    cy.get('[data-cy="toggle-card-expansion"]').should("have.length.at.least", count)
  }

  cardIsCollapsed(position: number) {
    cy.get('[data-cy^="pokemon-card-"]').eq(position).should("have.class", "is-collapsed")
  }

  cardIsExpanded(position: number) {
    cy.get('[data-cy^="pokemon-card-"]').eq(position).should("not.have.class", "is-collapsed")
  }
}
