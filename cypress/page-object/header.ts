export class Header {
  selectChampions() {
    cy.window().then(win => {
      win.localStorage.setItem("gameOverride", "champions")
    })
    cy.reload()
  }

  selectSv() {
    cy.window().then(win => {
      win.localStorage.setItem("gameOverride", "sv")
    })
    cy.reload()
  }
}
