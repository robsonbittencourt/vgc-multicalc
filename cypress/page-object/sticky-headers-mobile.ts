import { ScrollableContent } from "@page-object/scrollable-content"

export class StickyHeadersMobile {
  private readonly content = new ScrollableContent()

  scrollDown(offset: number): this {
    for (const step of [Math.round(offset / 2), offset]) {
      this.scrollStepTo(step)
    }

    return this
  }

  private scrollStepTo(offset: number): this {
    this.content.scrollTo(offset)

    cy.get('[data-cy="scrollable-content"]').trigger("scroll")

    return this
  }

  scrollToTop(): this {
    this.content.currentScroll().then(current => {
      for (const ratio of [0.75, 0.5, 0.25, 0]) {
        this.scrollStepTo(Math.round(current * ratio))
      }
    })

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
