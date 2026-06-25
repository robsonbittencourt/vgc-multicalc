export class ImportModal {
  import(pokemonData: string) {
    cy.get('[data-cy="import-paste-textarea"]').type(pokemonData, { force: true, delay: 0 })
    this.useEvMode()
    cy.get('[data-cy="confirm-import"]').click({ force: true })
    cy.get('[data-cy="import-paste-textarea"]').should("not.exist")
    cy.get(".mat-mdc-snack-bar-label").should("be.visible")
  }

  private useEvMode() {
    cy.get('[data-cy="import-evs-sps-toggle"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") === "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })
  }
}
