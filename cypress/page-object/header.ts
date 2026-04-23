export class Header {
  selectChampions() {
    cy.contains("mat-button-toggle", "Champions").find("button").click({ force: true })
  }

  selectSv() {
    cy.contains("mat-button-toggle", "SV").find("button").click({ force: true })
  }
}
