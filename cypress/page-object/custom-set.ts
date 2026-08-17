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

  saveSetButtonIsVisible(): CustomSet {
    cy.get('[data-cy="save-set-button"]').should("be.visible")
    return this
  }

  setNameInputIs(name: string): CustomSet {
    cy.get('[data-cy="set-name-input"]').should("have.value", name)
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

  activeSetNameIsDisplayed(): CustomSet {
    cy.get('[data-cy="set-name-display"]').should("exist")
    return this
  }

  noActiveSetNameIsDisplayed(): CustomSet {
    cy.get('[data-cy="set-name-display"]').should("not.exist")
    return this
  }

  rowsCountIs(count: number): CustomSet {
    cy.get('[data-cy^="custom-set-row-"]').should("have.length", count)
    return this
  }

  selectFirstRow(): CustomSet {
    cy.get('[data-cy^="custom-set-row-"]').first().click({ force: true })
    return this
  }

  duplicateRowAt(index: number): CustomSet {
    return this.actionOnRowAt(index, "duplicate")
  }

  deleteRowAt(index: number): CustomSet {
    return this.actionOnRowAt(index, "delete")
  }

  editRowAt(index: number): CustomSet {
    return this.actionOnRowAt(index, "edit")
  }

  private actionOnRowAt(index: number, action: "duplicate" | "delete" | "edit"): CustomSet {
    cy.get('[data-cy^="custom-set-row-"]')
      .eq(index)
      .invoke("attr", "data-cy")
      .then(attr => {
        const setId = attr!.replace("custom-set-row-", "")
        cy.get(`[data-cy="${action}-custom-set-${setId}"]`).click({ force: true })
      })

    return this
  }

  updateButtonIsHidden(): CustomSet {
    cy.get('[data-cy="update-set-button"]').should("not.exist")
    return this
  }

  firstRowNameIs(name: string): CustomSet {
    cy.get('[data-cy^="custom-set-name-"]').first().should("have.text", name)
    return this
  }

  firstRowContains(text: string): CustomSet {
    cy.get('[data-cy^="custom-set-row-"]').first().should("contain.text", text)
    return this
  }

  setTabIsOpen(): CustomSet {
    cy.get('[data-cy="close-edit-custom-set-tab"]').should("exist")
    return this
  }

  setTabIsClosed(): CustomSet {
    cy.get('[data-cy="close-edit-custom-set-tab"]').should("not.exist")
    return this
  }

  customSetNameIs(setId: string, name: string): CustomSet {
    cy.get(`[data-cy="custom-set-name-${setId}"]`).should("have.text", name)
    return this
  }
}
