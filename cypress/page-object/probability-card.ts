export class ProbabilityCard {
  constructor(private cardType: "single-target" | "spread-target") {}

  private container() {
    return cy.get(`[data-cy="probability-card-${this.cardType}"]`)
  }

  verifyTurn1SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.container()
      .find('[data-cy="probability-turn-1"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitAllTurns)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missAllTurns)
        cy.get(".cell").eq(4).should("contain", missAtLeastOne)
      })
  }

  verifyTurn2SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.container()
      .find('[data-cy="probability-turn-2"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitAllTurns)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missAllTurns)
        cy.get(".cell").eq(4).should("contain", missAtLeastOne)
      })
  }

  verifyTurn3SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.container()
      .find('[data-cy="probability-turn-3"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitAllTurns)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missAllTurns)
        cy.get(".cell").eq(4).should("contain", missAtLeastOne)
      })
  }

  verifyTurn4SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.container()
      .find('[data-cy="probability-turn-4"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitAllTurns)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missAllTurns)
        cy.get(".cell").eq(4).should("contain", missAtLeastOne)
      })
  }

  verifyTurn5SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.container()
      .find('[data-cy="probability-turn-5"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitAllTurns)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missAllTurns)
        cy.get(".cell").eq(4).should("contain", missAtLeastOne)
      })
  }

  verifyEffectAtLeastOnce(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-at-least-once-${turn}"]`).should("contain", value)
  }

  verifyEffectAllTurns(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-all-turns-${turn}"]`).should("contain", value)
  }

  verifyTurn1SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.container()
      .find('[data-cy="probability-turn-1"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitBoth)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missBoth)
      })
  }

  verifyTurn2SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.container()
      .find('[data-cy="probability-turn-2"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitBoth)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missBoth)
      })
  }

  verifyTurn3SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.container()
      .find('[data-cy="probability-turn-3"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitBoth)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missBoth)
      })
  }

  verifyTurn4SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.container()
      .find('[data-cy="probability-turn-4"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitBoth)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missBoth)
      })
  }

  verifyTurn5SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.container()
      .find('[data-cy="probability-turn-5"]')
      .within(() => {
        cy.get(".cell").eq(1).should("contain", hitBoth)
        cy.get(".cell").eq(2).should("contain", hitAtLeastOne)
        cy.get(".cell").eq(3).should("contain", missBoth)
      })
  }

  verifyEffectOnePlus(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-one-plus-${turn}"]`).should("contain", value)
  }

  verifyEffectBoth(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-both-${turn}"]`).should("contain", value)
  }
}
