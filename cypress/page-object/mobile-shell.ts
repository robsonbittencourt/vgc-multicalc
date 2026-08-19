export class MobileShell {
  isReady(): this {
    cy.get(".mobile-calc-container").should("exist")
    return this
  }

  scrollContentTo(offset: number): this {
    cy.get('[data-cy="scrollable-content"]').scrollTo(0, offset)
    return this
  }

  contentScrollIs(offset: number) {
    cy.get('[data-cy="scrollable-content"]').invoke("scrollTop").should("eq", offset)
  }

  tableOverlayIsOpen(): this {
    cy.get("app-mobile-table-overlay").children().should("have.length.greaterThan", 0)
    return this
  }

  tableOverlayIsClosed(): this {
    cy.get("app-mobile-table-overlay").children().should("have.length", 0)
    return this
  }

  closePokemonTable(): this {
    cy.get('[data-cy="close-pokemon-table"]:visible').first().click({ force: true })
    return this
  }

  closeItemsTable(): this {
    cy.get('[data-cy="close-items-table"]:visible').first().click({ force: true })
    return this
  }

  pageDoesNotOverflowHorizontally() {
    cy.get(".mobile-calc-container").then($container => {
      const width = $container[0].clientWidth

      cy.get("body").should($body => {
        expect($body[0].scrollWidth).to.be.at.most(width + 1)
      })
    })
  }

  elementFitsTheViewport(selector: string) {
    cy.get(".mobile-calc-container").then($container => {
      const width = $container[0].clientWidth

      cy.get(selector).should($element => {
        expect($element[0].getBoundingClientRect().width).to.be.at.most(width + 1)
      })
    })
  }
}
