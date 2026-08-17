export class ProbabilityCard {
  constructor(private cardType: "single-target" | "spread-target") {}

  private container() {
    return cy.get(`[data-cy="probability-card-${this.cardType}"]`)
  }

  singleTargetTurnIs(turn: number, hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string) {
    this.turnCellsAre(turn, [hitAllTurns, hitAtLeastOne, missAllTurns, missAtLeastOne])
  }

  spreadTargetTurnIs(turn: number, hitBoth: string, hitAtLeastOne: string, missBoth: string) {
    this.turnCellsAre(turn, [hitBoth, hitAtLeastOne, missBoth])
  }

  private turnCellsAre(turn: number, expectedValues: string[]) {
    this.container()
      .find(`[data-cy="probability-turn-${turn}"]`)
      .within(() => {
        expectedValues.forEach((value, index) => {
          cy.get(".cell")
            .eq(index + 1)
            .should("contain", value)
        })
      })
  }

  effectAtLeastOnceIs(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-at-least-once-${turn}"]`).should("contain", value)
  }

  effectAllTurnsIs(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-all-turns-${turn}"]`).should("contain", value)
  }

  effectOnePlusIs(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-one-plus-${turn}"]`).should("contain", value)
  }

  effectBothIs(turn: number, value: string) {
    cy.get(`[data-cy="probability-cell-effect-both-${turn}"]`).should("contain", value)
  }
}
