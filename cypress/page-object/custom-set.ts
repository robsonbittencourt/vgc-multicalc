export class CustomSet {
  saveSet(): CustomSet {
    cy.get('[data-cy="save-set-button"]').click({ force: true })
    return this
  }

  exitEditMode(): CustomSet {
    cy.get('[data-cy="close-edit-custom-set-tab"]').click({ force: true })
    return this
  }

  renameSet(name: string): CustomSet {
    cy.get('[data-cy="set-name-input"]').clear().type(name)
    return this
  }

  selectCustomSetRow(setId: string): CustomSet {
    cy.get(`[data-cy="custom-set-row-${setId}"]`).click({ force: true })
    return this
  }

  editCustomSet(setId: string): CustomSet {
    cy.get(`[data-cy="edit-custom-set-${setId}"]`).click({ force: true })
    return this
  }

  duplicateCustomSet(setId: string): CustomSet {
    cy.get(`[data-cy="duplicate-custom-set-${setId}"]`).click({ force: true })
    return this
  }

  deleteCustomSet(setId: string): CustomSet {
    cy.get(`[data-cy="delete-custom-set-${setId}"]`).click({ force: true })
    return this
  }

  saveSetButtonIsVisible(): CustomSet {
    cy.get('[data-cy="save-set-button"]').should("be.visible")
    return this
  }

  saveSetButtonIsHidden(): CustomSet {
    cy.get('[data-cy="save-set-button"]').should("not.exist")
    return this
  }

  setNameInputIs(name: string): CustomSet {
    cy.get('[data-cy="set-name-input"]').should("have.value", name)
    return this
  }

  customSetRowExists(setId: string): CustomSet {
    cy.get(`[data-cy="custom-set-row-${setId}"]`).should("exist")
    return this
  }

  customSetRowNotExists(setId: string): CustomSet {
    cy.get(`[data-cy="custom-set-row-${setId}"]`).should("not.exist")
    return this
  }

  getFirstCustomSetId(pokemonName: string): Cypress.Chainable<string> {
    return cy
      .get(`[data-cy^="custom-set-row-"]`)
      .filter(`:contains("${pokemonName}")`)
      .first()
      .invoke("attr", "data-cy")
      .then(attr => attr!.replace("custom-set-row-", ""))
  }

  getAllCustomSetIds(): Cypress.Chainable<string[]> {
    return cy.get(`[data-cy^="custom-set-row-"]`).then($rows => {
      return Array.from($rows).map(el => el.getAttribute("data-cy")!.replace("custom-set-row-", ""))
    })
  }

  customSetNameIs(setId: string, name: string): CustomSet {
    cy.get(`[data-cy="custom-set-name-${setId}"]`).should("have.text", name)
    return this
  }
}
