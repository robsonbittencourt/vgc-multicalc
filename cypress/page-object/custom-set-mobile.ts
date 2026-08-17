export class CustomSetMobile {
  longPressRow(): CustomSetMobile {
    this.firstRow().trigger("touchstart", { force: true, touches: [{ clientX: 100, clientY: 300 }] })
    cy.wait(700)
    this.firstRow().trigger("touchend", { force: true })

    return this
  }

  longPressRowMoving(distance: number): CustomSetMobile {
    this.firstRow().trigger("touchstart", { force: true, touches: [{ clientX: 100, clientY: 300 }] })
    this.firstRow().trigger("touchmove", { force: true, touches: [{ clientX: 100 + distance, clientY: 300 }] })
    cy.wait(700)
    this.firstRow().trigger("touchend", { force: true })

    return this
  }

  private firstRow() {
    return cy.get('[data-cy^="custom-set-row-"]').first()
  }

  menuIsVisible() {
    cy.get(".action-menu-box").should("be.visible")
    cy.get('[data-cy^="edit-custom-set-menu-"]').should("exist")
    cy.get('[data-cy^="duplicate-custom-set-menu-"]').should("exist")
    cy.get('[data-cy^="delete-custom-set-menu-"]').should("exist")
  }

  menuIsHidden() {
    cy.get('[data-cy^="edit-custom-set-menu-"]').should("not.exist")
  }

  editFromMenu(): CustomSetMobile {
    cy.get('[data-cy^="edit-custom-set-menu-"]').click({ force: true })
    return this
  }

  duplicateFromMenu(): CustomSetMobile {
    cy.get('[data-cy^="duplicate-custom-set-menu-"]').click({ force: true })
    return this
  }

  deleteFromMenu(): CustomSetMobile {
    cy.get('[data-cy^="delete-custom-set-menu-"]').click({ force: true })
    return this
  }

  rowsCountIs(count: number) {
    cy.get('[data-cy^="custom-set-row-"]').should("have.length", count)
  }

  exitEditMode(): CustomSetMobile {
    cy.get('[data-cy="close-edit-custom-set-tab-mobile"]').click({ force: true })
    return this
  }

  editTabIsOpen() {
    cy.get('[data-cy="close-edit-custom-set-tab-mobile"]').should("exist")
  }
}
