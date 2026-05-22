export class Header {
  selectChampions() {
    cy.contains("mat-button-toggle", "Champions").find("button").click({ force: true }).wait(200)
  }

  selectSv() {
    cy.contains("mat-button-toggle", "SV").find("button").click({ force: true }).wait(200)
  }
}
