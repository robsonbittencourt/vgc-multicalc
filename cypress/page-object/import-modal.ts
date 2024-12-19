export class ImportModal {
  import(pokemonData: string) {
    cy.get('[data-cy="import-paste-textarea"]').type(pokemonData, { force: true, delay: 0 })
    cy.get('[data-cy="confirm-import"]').click({ force: true }).wait(100)
  }
}
