export class HowToUse {
  open(): HowToUse {
    cy.get('[data-cy="how-to-use-button"]').click({ force: true })
    return this
  }

  openCard(cardName: string): HowToUse {
    cy.get(`[data-cy="how-to-card-${cardName}"]`).click({ force: true })
    return this
  }

  back(): HowToUse {
    cy.get('[data-cy="how-to-use-back"]').click({ force: true })
    return this
  }

  pathIs(path: string) {
    cy.location("pathname").should("eq", path)
  }

  cardsCountIsAtLeast(count: number) {
    cy.get('[data-cy^="how-to-card-"]').should("have.length.at.least", count)
  }

  indexIsVisible() {
    cy.get('[data-cy^="how-to-card-"]').should("exist")
  }

  subpageTitleIs(title: string) {
    cy.get('[data-cy="how-to-use-subpage-title"]').should("have.text", title)
  }

  subpageHasTitle() {
    cy.get('[data-cy="how-to-use-subpage-title"]').should("exist")
  }

  scrollToBottom(): HowToUse {
    cy.scrollTo("bottom")
    return this
  }

  pageScrollIsAtTop() {
    cy.window().its("scrollY").should("eq", 0)
  }

  pageIsScrolled() {
    cy.window().its("scrollY").should("be.greaterThan", 0)
  }
}
