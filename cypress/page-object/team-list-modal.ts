export class TeamListModal {
  fieldIs(label: string, value: string): TeamListModal {
    this.field(label).should("have.value", value)
    return this
  }

  fillField(label: string, value: string): TeamListModal {
    this.field(label).clear()
    this.field(label).type(value)
    return this
  }

  private field(label: string) {
    return this.dialog().find(`input[aria-label="${label}"]`)
  }

  private dialog() {
    return cy.get(".mat-mdc-dialog-container").filter(":visible").first()
  }

  dateOfBirthIs(value: string): TeamListModal {
    this.dateOfBirth().should("have.value", value)
    return this
  }

  typeDateOfBirth(digits: string): TeamListModal {
    this.dateOfBirth().clear()
    this.dateOfBirth().type(digits)
    return this
  }

  private dateOfBirth() {
    return this.dialog().find('[data-cy="date-of-birth"]')
  }

  datePlaceholderIs(placeholder: string): TeamListModal {
    this.dateOfBirth().should("have.attr", "placeholder", placeholder)
    return this
  }

  export(): TeamListModal {
    this.dialog().find('[data-cy="team-list-export"]').click({ force: true })
    return this
  }

  cancel(): TeamListModal {
    this.dialog().find('[data-cy="team-list-cancel"]').click({ force: true })
    return this
  }

  isOpen(): TeamListModal {
    cy.get('[data-cy="date-of-birth"]').should("exist")
    return this
  }

  isClosed(): TeamListModal {
    cy.get('[data-cy="date-of-birth"]').should("not.exist")
    return this
  }
}
