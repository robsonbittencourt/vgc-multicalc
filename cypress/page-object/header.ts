export class Header {
  selectChampions() {
    cy.contains("mat-button-toggle", "Champions").find("button").click({ force: true })
    cy.contains("mat-button-toggle", "Champions").should("have.class", "mat-button-toggle-checked")
  }

  selectSv() {
    cy.contains("mat-button-toggle", "SV").find("button").click({ force: true })
    cy.contains("mat-button-toggle", "SV").should("have.class", "mat-button-toggle-checked")
  }
}
