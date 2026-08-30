export class StickyHeadersMobile {
  scrollDown(offset: number): this {
    for (const step of [Math.round(offset / 2), offset]) {
      cy.get('[data-cy="scrollable-content"]').scrollTo(0, step)
      cy.get('[data-cy="scrollable-content"]').trigger("scroll")
    }

    return this
  }

  scrollToTop(): this {
    for (const offset of [300, 200, 100, 0]) {
      cy.get('[data-cy="scrollable-content"]').scrollTo(0, offset)
      cy.get('[data-cy="scrollable-content"]').trigger("scroll")
    }

    return this
  }

  teamTabsAreStuckToTop() {
    cy.get('[data-cy="scrollable-content"]').then($container => {
      const containerTop = $container[0].getBoundingClientRect().top

      cy.get(".team-tabs").should($tabs => {
        expect($tabs[0].getBoundingClientRect().top).to.be.closeTo(containerTop, 2)
      })
    })
  }

  movesAreStuckBelowTeamTabs() {
    cy.get("app-pokemon-moves-mobile.sticky").should($moves => {
      const tabsBottom = Cypress.$(".team-tabs")[0].getBoundingClientRect().bottom
      const movesTop = $moves[0].getBoundingClientRect().top
      const gap = movesTop - tabsBottom

      expect(gap).to.be.at.least(-4)
      expect(gap).to.be.at.most(20)
    })
  }

  movesAreNotSticky() {
    cy.get("app-pokemon-moves-mobile.sticky").should("not.exist")
  }

  movesEditButtonIsVisible() {
    cy.get("app-pokemon-moves-mobile .edit-button").should("be.visible")
  }

  movesEditButtonIsHidden() {
    cy.get("app-pokemon-moves-mobile .edit-button").should("not.be.visible")
  }

  headerIsHidden() {
    cy.get(".header").should("have.class", "hidden")
  }

  headerIsVisible() {
    cy.get(".header").should("not.have.class", "hidden")
  }

  contentUsesFullHeight(pageSelector: string) {
    cy.get(pageSelector).should("have.class", "header-hidden")
  }

  contentReservesHeaderSpace(pageSelector: string) {
    cy.get(pageSelector).should("not.have.class", "header-hidden")
  }
}
