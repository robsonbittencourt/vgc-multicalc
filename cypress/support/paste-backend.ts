export function watchPasteCreation() {
  cy.intercept("POST", "/api/pastes").as("createPaste")
}

export function createdPaste(): Cypress.Chainable<any> {
  return cy.wait("@createPaste").its("request.body")
}
