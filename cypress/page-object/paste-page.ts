export class PastePage {
  visit(id: string): PastePage {
    cy.visit(`/paste/${id}`, { failOnStatusCode: false })
    return this
  }

  teamNameIs(name: string): PastePage {
    cy.get('[data-cy="paste-team-name"]').should("have.text", name)
    return this
  }

  pokemonAre(names: string[]): PastePage {
    cy.get('[data-cy="paste-pokemon-name"]').should($names => {
      expect([...$names].map(name => name.textContent!.trim())).to.deep.eq(names)
    })
    return this
  }

  cardsContain(text: string): PastePage {
    cy.get('[data-cy="paste-pokemon-card"]').should("contain.text", text)
    return this
  }

  cardsDoNotContain(text: string): PastePage {
    cy.get('[data-cy="paste-pokemon-card"]').should("not.contain.text", text)
    return this
  }

  isNotFound(): PastePage {
    cy.get('[data-cy="paste-not-found"]').should("contain.text", "This paste does not exist.")
    return this
  }

  isLocked(): PastePage {
    cy.get('[data-cy="paste-locked"]').should("contain.text", "This paste is protected")
    return this
  }

  unlock(password: string): PastePage {
    cy.get('[data-cy="paste-password"] input').clear().type(password)
    cy.get('[data-cy="paste-unlock"]').click()
    return this
  }

  unlockErrorIs(message: string): PastePage {
    cy.get('[data-cy="paste-unlock-error"]').should("have.text", message)
    return this
  }

  openInCalcAsMyTeam() {
    this.openInNewCalcTab('[data-cy="paste-open-in-calc"]')
  }

  openInCalcAsOpponents() {
    this.openInNewCalcTab('[data-cy="paste-open-as-opponents"]')
  }

  openInCalcAsMyTeamOnMobile() {
    cy.get('[data-cy="paste-open-in-calc"]').click()
    cy.url().should("include", "/team-vs-many")
  }

  private openInNewCalcTab(selector: string) {
    cy.window().then(win => {
      cy.stub(win, "open").as("openCalcTab").returns({ opener: win })
    })

    cy.get(selector).click()

    cy.url().should("include", "/paste/")
    cy.get("@openCalcTab").should("have.been.calledOnceWith", Cypress.sinon.match(/^\/team-vs-many\?import=/), "_blank")
    cy.get("@openCalcTab")
      .its("firstCall.args.0")
      .then(url => cy.visit(url as unknown as string))

    cy.url().should("include", "/team-vs-many").and("not.include", "import=")
  }
}
