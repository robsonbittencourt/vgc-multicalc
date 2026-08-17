export class CombinedProbability {
  private container() {
    return cy.get('[data-cy="combined-probability-container"]')
  }

  inputProbability(index: number, value: string) {
    const input = cy.get(`[data-cy="probability-input-${index}"]`).find("input")
    input.clear()
    if (value !== "") {
      input.type(value)
    }
  }

  selectCalcType(type: "at-least-one" | "all" | "none") {
    const typeText = type === "at-least-one" ? "At least one" : type === "all" ? "All" : "None"
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="calc-type-select"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(typeText).should("be.visible").scrollIntoView().click()
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="calc-type-select"]').find('[data-cy="input-select"]').should("contain.text", typeText)
  }

  resultIs(expectedValue: string) {
    cy.get('[data-cy="combined-probability-result"]').within(() => {
      cy.get(".result-value").should("contain", expectedValue)
    })
  }

  inputValueIs(index: number, expectedValue: string) {
    cy.get(`[data-cy="probability-input-${index}"]`).find("input").should("have.value", expectedValue)
  }

  containerIsVisible() {
    this.container().should("be.visible")
  }

  calcTypeIs(type: "at-least-one" | "all" | "none") {
    const typeText = type === "at-least-one" ? "At least one" : type === "all" ? "All" : "None"
    cy.get('[data-cy="calc-type-select"]').find('[data-cy="input-select"]').should("contain.text", typeText)
  }
}
