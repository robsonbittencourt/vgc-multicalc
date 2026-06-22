export class Header {
  selectChampions() {
    cy.window().then(win => {
      win.localStorage.setItem("gameOverride", "champions")
    })
    this.reloadCurrentRoute()
  }

  selectSv() {
    cy.window().then(win => {
      win.localStorage.setItem("gameOverride", "sv")
    })
    this.reloadCurrentRoute()
  }

  private reloadCurrentRoute() {
    cy.location("pathname").then(pathname => {
      cy.visit(`http://localhost:4200${pathname}`)
    })
  }
}
