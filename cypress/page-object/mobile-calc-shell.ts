import { MobileShell } from "@page-object/mobile-shell"

export class MobileCalcShell extends MobileShell {
  useCardsView(): this {
    cy.get('[data-cy="multi-calc-view-cards"]').click({ force: true })
    cy.get('[data-cy^="pokemon-card-"]').should("exist")

    return this
  }

  expandOpponentCard(pokemonName: string): this {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="toggle-card-expansion"]').click({ scrollBehavior: "center" })
    return this
  }

  deleteOpponentCard(pokemonName: string): this {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="delete-opponent-pokemon"]').click()
    return this
  }

  toggleFirstCardExpansion(): this {
    cy.get('[data-cy="toggle-card-expansion"]').first().click({ scrollBehavior: "center" })
    return this
  }

  expansionTogglesCountIsAtLeast(count: number) {
    cy.get('[data-cy="toggle-card-expansion"]').should("have.length.at.least", count)
  }

  addOpponent(): this {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
    return this
  }

  opponentCardIsInsideTheViewport(pokemonName: string) {
    cy.get('[data-cy="scrollable-content"]').then($container => {
      const containerBounds = $container[0].getBoundingClientRect()

      cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should($card => {
        const cardBounds = $card[0].getBoundingClientRect()

        expect(cardBounds.top).to.be.at.least(containerBounds.top)
        expect(cardBounds.bottom).to.be.at.most(containerBounds.bottom)
      })
    })
  }

  opponentsAreHidden() {
    cy.get(".results-list").should("not.be.visible")
  }

  opponentsAreVisible() {
    cy.get(".results-list").should("be.visible")
  }

  cardIsCollapsed(position: number) {
    cy.get('[data-cy^="pokemon-card-"]').eq(position).should("have.class", "is-collapsed")
  }

  cardIsExpanded(position: number) {
    cy.get('[data-cy^="pokemon-card-"]').eq(position).should("not.have.class", "is-collapsed")
  }
}
