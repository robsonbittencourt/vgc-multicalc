/// <reference types="cypress" />

Cypress.Commands.add("setGameModeToSV", () => {
  cy.window().then(win => {
    const rawData = win.localStorage.getItem("userData")
    const userData = rawData ? JSON.parse(rawData) : {}
    userData.game = "sv"
    win.localStorage.setItem("userData", JSON.stringify(userData))
  })
})

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      setGameModeToSV(): Chainable<Subject>
    }
  }
}

export {}
