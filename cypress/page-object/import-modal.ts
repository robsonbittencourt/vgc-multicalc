export class ImportModal {
  import(pokemonData: string, useEvs = true) {
    cy.get('[data-cy="import-paste-textarea"]').type(pokemonData, { force: true, delay: 0 })

    if (useEvs) {
      this.useEvMode()
    }

    cy.get('[data-cy="confirm-import"]').click({ force: true })
    cy.get('[data-cy="import-paste-textarea"]').should("not.exist")
    cy.get(".mat-mdc-snack-bar-label").should("exist")
  }

  useEvMode(): ImportModal {
    cy.get('[data-cy="import-evs-sps-toggle"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") === "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })

    return this
  }

  typePaste(pokemonData: string): ImportModal {
    cy.get('[data-cy="import-paste-textarea"]').type(pokemonData, { force: true, delay: 0 })
    return this
  }

  useSpMode(): ImportModal {
    cy.get('[data-cy="import-evs-sps-toggle"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") !== "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })
    return this
  }

  confirm(): ImportModal {
    cy.get('[data-cy="confirm-import"]').click({ force: true })
    return this
  }

  errorIs(message: string): ImportModal {
    cy.get('[data-cy="import-error"]').should("have.text", message)
    return this
  }

  isOpen(): ImportModal {
    cy.get('[data-cy="import-paste-textarea"]').should("exist")
    return this
  }

  isClosed(): ImportModal {
    cy.get('[data-cy="import-paste-textarea"]').should("not.exist")
    return this
  }

  confirmIsDisabled(): ImportModal {
    cy.get('[data-cy="confirm-import"]').should("be.disabled")
    return this
  }

  confirmIsEnabled(): ImportModal {
    cy.get('[data-cy="confirm-import"]').should("not.be.disabled")
    return this
  }

  cancel(): ImportModal {
    cy.get('[data-cy="import-paste-textarea"]').parents(".mat-mdc-dialog-container").find("button").contains("Cancel").click({ force: true })
    return this
  }
}
