export class MultiCalcLayout {
  useSideBySide() {
    cy.get('[data-cy="multi-calc-layout-side-by-side"]').click()
  }

  useStacked() {
    cy.get('[data-cy="multi-calc-layout-stacked"]').click()
  }

  isSideBySide() {
    cy.get('[data-cy="multi-calc-layout-side-by-side"]').should("have.attr", "aria-pressed", "true")
    cy.scrollTo(0, 0)

    cy.get('[data-cy="your-team"]').then($team => {
      cy.get('[data-cy="opponent-widget"]').should($opponents => {
        const team = $team[0].getBoundingClientRect()
        const opponents = $opponents[0].getBoundingClientRect()

        expect(opponents.left).to.be.greaterThan(team.right)
        expect(opponents.top).to.be.closeTo(team.top, 1)
      })
    })
  }

  isStacked() {
    cy.get('[data-cy="multi-calc-layout-stacked"]').should("have.attr", "aria-pressed", "true")

    cy.get('[data-cy="your-team"]').then($team => {
      cy.get('[data-cy="opponent-widget"]').should($opponents => {
        expect($opponents[0].getBoundingClientRect().top).to.be.greaterThan($team[0].getBoundingClientRect().bottom)
      })
    })
  }

  opponentsStayOnScreenWhenPageScrolls() {
    cy.scrollTo(0, 500)

    cy.window().its("scrollY").should("be.greaterThan", 0)
    cy.get('[data-cy="opponent-widget"]').should($opponents => {
      const opponents = $opponents[0].getBoundingClientRect()

      expect(opponents.top).to.be.within(0, 20)
      expect(opponents.bottom).to.be.at.most(Cypress.config("viewportHeight"))
    })
  }

  cardsPerRowIs(count: number) {
    cy.get('[data-cy^="pokemon-card-"]').should($cards => {
      const firstRowTop = $cards[0].getBoundingClientRect().top
      const firstRow = [...$cards].filter(card => Math.abs(card.getBoundingClientRect().top - firstRowTop) < 1)

      expect(firstRow).to.have.length(count)
    })
  }

  toggleCalcOptions() {
    cy.get('[data-cy="calc-options-toggle"]').click()
  }

  calcOptionsAreHidden() {
    cy.get('[data-cy="calc-options-toggle"]').should("have.attr", "aria-expanded", "false")
    cy.get('[data-cy="opponent-widget"]').find('[data-cy="low-roll"]').should("not.exist")
    cy.get('[data-cy="opponent-physical-boost"]').should("not.exist")
  }

  calcOptionsAreVisible() {
    cy.get('[data-cy="calc-options-toggle"]').should("have.attr", "aria-expanded", "true")
    cy.get('[data-cy="opponent-widget"]').find('[data-cy="low-roll"]').should("be.visible")
    cy.get('[data-cy="opponent-physical-boost"]').should("be.visible")
  }
}
