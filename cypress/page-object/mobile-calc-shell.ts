export class MobileCalcShell {
  isReady(): MobileCalcShell {
    cy.get(".mobile-calc-container").should("exist")
    return this
  }

  scrollContentTo(offset: number): MobileCalcShell {
    cy.get(".scrollable-content").scrollTo(0, offset)
    return this
  }

  contentScrollIs(offset: number) {
    cy.get(".scrollable-content").invoke("scrollTop").should("eq", offset)
  }

  tableOverlayIsOpen(): MobileCalcShell {
    cy.get("app-mobile-table-overlay").children().should("have.length.greaterThan", 0)
    return this
  }

  tableOverlayIsClosed(): MobileCalcShell {
    cy.get("app-mobile-table-overlay").children().should("have.length", 0)
    return this
  }

  expandOpponentCard(pokemonName: string): MobileCalcShell {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="toggle-card-expansion"]').click()
    return this
  }

  deleteOpponentCard(pokemonName: string): MobileCalcShell {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).find('[data-cy="delete-opponent-pokemon"]').click()
    return this
  }

  toggleFirstCardExpansion(): MobileCalcShell {
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

  pageDoesNotOverflowHorizontally() {
    cy.get(".mobile-calc-container").then($container => {
      const width = $container[0].clientWidth

      cy.get("body").should($body => {
        expect($body[0].scrollWidth).to.be.at.most(width + 1)
      })
    })
  }
}
