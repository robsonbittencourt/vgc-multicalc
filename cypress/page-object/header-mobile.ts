export class HeaderMobile {
  openMenu(): HeaderMobile {
    cy.get(".menu-icon").click({ force: true })
    return this
  }

  goToScreen(label: string): HeaderMobile {
    this.openMenu()
    cy.get(".menu-item-button").contains(label).click({ force: true })
    cy.wait(300)

    return this
  }

  goToTeamVsMany(): HeaderMobile {
    this.openMenu()
    cy.get(".menu-item-button").contains("Team vs Many").click({ force: true })
    cy.get(".team-tab.add-tab").should("exist")

    return this
  }

  menuIsOpen() {
    cy.get(".menu-overlay").should("exist")
  }

  menuIsClosed() {
    cy.get(".menu-overlay").should("not.exist")
  }

  touchMenuOverlay(): HeaderMobile {
    cy.get(".menu-overlay").click({ force: true })
    return this
  }

  bodyScrollIsLocked() {
    cy.get("body").should("have.class", "menu-open")
  }

  bodyScrollIsFree() {
    cy.get("body").should("not.have.class", "menu-open")
  }

  selectChampionsMode(): HeaderMobile {
    this.openMenu()
    cy.get("[data-cy=mode-champions]").click({ force: true })
    cy.get("[data-cy=mode-champions]").should("have.class", "selected")

    return this
  }

  selectNationalDexMode(): HeaderMobile {
    this.openMenu()
    cy.get("[data-cy=mode-national-dex]").click({ force: true })
    cy.get("[data-cy=mode-national-dex]").should("have.class", "selected")

    return this
  }

  selectThemeFromMenu(themeName: string): HeaderMobile {
    cy.get(".menu-item").contains(themeName).click({ force: true })
    return this
  }

  themeIsHighlighted(themeName: string) {
    cy.get(".menu-item").contains(themeName).parent().should("have.class", "active-menu-option")
  }

  installAppIsAvailable() {
    cy.get("button.share-button").contains("Install app").should("be.visible")
  }

  installAppIsUnavailable() {
    cy.get("button.share-button:contains('Install app')").should("not.exist")
  }

  firePwaInstallPrompt(): HeaderMobile {
    cy.window().then(win => {
      const event: any = new Event("beforeinstallprompt")
      event.prompt = () => undefined
      event.userChoice = Promise.resolve({ outcome: "accepted" })
      win.dispatchEvent(event)
    })

    return this
  }

  firePwaAppInstalled(): HeaderMobile {
    cy.window().then(win => win.dispatchEvent(new Event("appinstalled")))
    return this
  }

  androidBack(): HeaderMobile {
    cy.go("back")
    cy.wait(400)

    return this
  }
}
