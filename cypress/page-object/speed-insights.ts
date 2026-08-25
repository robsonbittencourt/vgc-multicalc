export class SpeedInsights {
  cardIsVisible() {
    cy.get('[data-cy="speed-insights-card"]').should("be.visible")
  }

  emptyMessageIsVisible() {
    cy.get('[data-cy="speed-insights-empty"]').should("be.visible")
  }

  emptyMessageIsHidden() {
    cy.get('[data-cy="speed-insights-empty"]').should("not.exist")
  }

  cardIsHidden() {
    cy.get('[data-cy="speed-insights-card"]').should("not.exist")
  }

  nameIs(pokemon: string) {
    cy.get('[data-cy="speed-insights-name"]').should("have.text", pokemon)
  }

  baseIs(speed: number) {
    cy.get('[data-cy="speed-insights-base"]').should("have.text", `${speed}`)
  }

  private numberOf(name: string): Cypress.Chainable<number> {
    return cy.get(`[data-cy="speed-insights-${name}"]`).then($v => Number($v.text().trim()))
  }

  neutralRangeIsConsistent() {
    let min = 0

    this.numberOf("min").then(value => {
      min = value
    })

    this.numberOf("max").should(max => {
      expect(max).to.be.greaterThan(min)
    })
  }

  positiveNatureBeatsNeutralMax() {
    let max = 0

    this.numberOf("max").then(value => {
      max = value
    })

    this.numberOf("positive").should(positive => {
      expect(positive).to.be.greaterThan(max)
    })
  }

  negativeNatureIsBelowNeutralMin() {
    let min = 0

    this.numberOf("min").then(value => {
      min = value
    })

    this.numberOf("negative").should(negative => {
      expect(negative).to.be.lessThan(min)
    })
  }

  positiveLabelIs(label: string) {
    cy.get('[data-cy="speed-insights-positive-row"]').should("contain.text", label)
  }

  negativeLabelIs(label: string) {
    cy.get('[data-cy="speed-insights-negative-row"]').should("contain.text", label)
  }

  usageListIsVisible() {
    cy.get('[data-cy="speed-insights-usage"]').should("be.visible")
  }

  usageListIsHidden() {
    cy.get('[data-cy="speed-insights-usage"]').should("not.exist")
  }

  mostCommonSpeedIsHighlighted() {
    cy.get('[data-cy="speed-insights-usage"]').should("contain.text", "most common")
  }

  mostCommonSpeedIsHighlightedOnce() {
    cy.get('[data-cy="speed-insights-usage"] li').should($items => {
      const highlighted = [...$items].filter(item => item.textContent!.includes("most common"))

      expect(highlighted).to.have.length(1)
    })
  }

  scarfInsightIsVisible(pokemon: string) {
    cy.get('[data-cy="speed-insights-scarf"]').should("be.visible").and("contain.text", `${pokemon} can reach`).and("contain.text", "Choice Scarf")
  }

  scarfInsightIsHidden() {
    cy.get('[data-cy="speed-insights-scarf"]').should("not.exist")
  }

  scarfIsTheMostUsedItem() {
    cy.get('[data-cy="speed-insights-scarf"]').should("contain.text", "most common item")
  }

  scarfIsNotTheMostUsedItem() {
    cy.get('[data-cy="speed-insights-scarf"]').should("not.contain.text", "most common item")
  }
}
