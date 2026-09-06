import { ScrollableContent } from "@page-object/scrollable-content"

export class MobileShell {
  private readonly content = new ScrollableContent()

  isReady(): this {
    cy.get(".mobile-calc-container").should("exist")
    return this
  }

  scrollContentTo(offset: number): this {
    this.content.scrollTo(offset)

    return this
  }

  contentScrollIs(offset: number) {
    this.content.scrollIs(offset)
  }

  contentIsScrolledDown() {
    this.content.scrollIsDown()
  }

  rememberContentScroll(alias: string): this {
    this.content.currentScroll().as(alias)

    return this
  }

  contentScrollIsTheRememberedOne(alias: string) {
    cy.get(`@${alias}`).then(remembered => {
      this.content.scrollIs(remembered as unknown as number)
    })
  }

  tabScrollIs(dataCy: string, offset: number) {
    cy.get(`[data-cy="${dataCy}"]`).invoke("scrollTop").should("eq", offset)
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
