export class TeamScore {
  teamScoreIs(score: string) {
    this.donut().find('[data-cy="donut-score-text"]').should("contain", score)
  }

  pokemonScoreIs(index: number, score: string) {
    cy.get(`[data-cy="pokemon-score-${index}"]`).should("contain", score)
  }

  teamScoreValue(): Cypress.Chainable<number> {
    return this.donut()
      .find('[data-cy="donut-score-text"]')
      .then($s => Number($s.text().trim().replace("%", "")))
  }

  pokemonScoreValue(index: number): Cypress.Chainable<number> {
    return cy.get(`[data-cy="pokemon-score-${index}"]`).then($s => Number($s.text().trim().replace("%", "")))
  }

  teamScoreIsHidden() {
    this.donut().should("not.exist")
  }

  private donut() {
    return cy.get('[data-cy="team-score-donut"]')
  }
}
