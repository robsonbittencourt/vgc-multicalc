import { PastePage } from "./paste-page"

export class CreatePaste {
  isOpen(): CreatePaste {
    cy.get('[data-cy="create-paste-page"]').should("be.visible")
    return this
  }

  isClosed() {
    cy.get('[data-cy="create-paste-page"]').should("not.exist")
  }

  sourceIs(teamName: string): CreatePaste {
    cy.get('[data-cy="create-paste-source"]').should("contain.text", `Loaded from ${teamName}`)
    return this
  }

  nameIs(name: string): CreatePaste {
    cy.get('[data-cy="create-paste-name"] input').should("have.value", name)
    return this
  }

  typeName(name: string): CreatePaste {
    cy.get('[data-cy="create-paste-name"] input').clear().type(name)
    return this
  }

  textContains(line: string): CreatePaste {
    cy.get('[data-cy="create-paste-text"]').should("contain.value", line)
    return this
  }

  typeText(text: string): CreatePaste {
    cy.get('[data-cy="create-paste-text"]').clear().invoke("val", text).trigger("input")
    return this
  }

  useEvs(): CreatePaste {
    cy.get('[data-cy="create-paste-points-mode-ev"]').click({ force: true })
    cy.get('[data-cy="create-paste-points-mode-ev"]').should("have.attr", "aria-pressed", "true")
    return this
  }

  hideSpreads(): CreatePaste {
    cy.get('[data-cy="create-paste-show-points"] button').click({ force: true })
    cy.get('[data-cy="create-paste-show-points"] button').should("have.attr", "aria-checked", "false")
    return this
  }

  protectWith(password: string): CreatePaste {
    cy.get('[data-cy="create-paste-password-toggle"] button').click({ force: true })
    cy.get('[data-cy="create-paste-password"] input').type(password)
    return this
  }

  typePassword(text: string): CreatePaste {
    cy.get('[data-cy="create-paste-password"] input').type(text)
    return this
  }

  passwordHintIsVisible(): CreatePaste {
    cy.get('[data-cy="create-paste-password-hint"]').should("contain.text", "At least 4 characters.")
    return this
  }

  createIsDisabled(): CreatePaste {
    cy.get('[data-cy="create-paste-button"]').should("be.disabled")
    return this
  }

  create(): CreatePaste {
    cy.get('[data-cy="create-paste-button"]').should("be.enabled").click()
    return this
  }

  linkId(): Cypress.Chainable<string> {
    return cy
      .get('[data-cy="create-paste-link"] a.link-text')
      .should("be.visible")
      .invoke("attr", "href")
      .then(href => href!.split("/").pop()!)
  }

  openCreatedPaste(): PastePage {
    this.linkId().then(id => {
      cy.visit(`/paste/${id}`)
    })

    return new PastePage()
  }

  errorIs(message: string): CreatePaste {
    cy.get('[data-cy="create-paste-error"]').should("have.text", message)
    return this
  }

  copy(): CreatePaste {
    cy.get('[data-cy="create-paste-copy"]').click({ force: true })
    return this
  }

  copyButtonIs(label: string): CreatePaste {
    cy.get('[data-cy="create-paste-copy"]').should("contain.text", label)
    return this
  }

  back() {
    cy.get('[data-cy="create-paste-back"]').click({ force: true })
  }
}
