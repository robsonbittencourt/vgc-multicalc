export class Snackbar {
  messageIs(message: string) {
    cy.get(".mat-mdc-snack-bar-label").should("exist").and("contain.text", message)
  }
}
