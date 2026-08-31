export class Header {
  openOneVsOne(): Header {
    return this.openMenuOption("one-vs-one")
  }

  openTeamVsMany(): Header {
    return this.openMenuOption("team-vs-many")
  }

  openManyVsTeam(): Header {
    return this.openMenuOption("many-vs-team")
  }

  openSpeedCalc(): Header {
    return this.openMenuOption("speed-calc")
  }

  openProbabilityCalc(): Header {
    return this.openMenuOption("probability-calc")
  }

  openTypeCalc(): Header {
    return this.openMenuOption("type-calc")
  }

  private openMenuOption(selector: string): Header {
    cy.get(`[data-cy=${selector}]`).click({ force: true })

    cy.url().should("include", selector)
    cy.get(`[data-cy=${selector}]`).should("have.class", "active-menu-option")

    return this
  }

  onlyActiveMenuOptionIs(selector: string) {
    cy.get(".menu .menu-option").should($options => {
      const active = [...$options].filter(option => option.classList.contains("active-menu-option")).map(option => option.getAttribute("data-cy"))

      expect(active).to.deep.eq([selector])
    })
  }

  urlIs(path: string) {
    cy.url().should("include", path)
  }

  shareCalcs(): Header {
    cy.get('[data-cy="share-calcs-button"]').click({ force: true })
    return this
  }

  copyShareLink(): Header {
    cy.get('app-header [data-cy="copy-button"]').click({ force: true })
    return this
  }

  shareLinkIsVisible(fragment: string) {
    cy.get('[data-cy="user-data-link"]').should("be.visible").and("have.attr", "href").and("contain", fragment)
  }

  openThemeMenu(): Header {
    cy.get(".right-header mat-icon").realClick()
    cy.wait(300)

    cy.get("body").then($body => {
      if ($body.find(".menu-item").length === 0) {
        cy.get(".right-header mat-icon").realClick()
      }
    })

    cy.get(".menu-item").should("exist")

    return this
  }

  selectTheme(themeName: string): Header {
    cy.get(".menu-item").contains(themeName).click({ force: true })
    return this
  }

  selectChampionsMode(): Header {
    cy.get("[data-cy=mode-champions]").click({ force: true })
    cy.get("[data-cy=mode-champions]").should("have.class", "selected")

    return this
  }

  selectNationalDexMode(): Header {
    cy.get("[data-cy=mode-national-dex]").click({ force: true })
    cy.get("[data-cy=mode-national-dex]").should("have.class", "selected")

    return this
  }

  selectedModeIs(mode: "champions" | "national-dex") {
    cy.get(`[data-cy=mode-${mode}]`).should("have.class", "selected")
  }

  selectColor(colorName: string): Header {
    cy.get(".menu-item").contains(colorName).click({ force: true })
    return this
  }

  themeIconIs(icon: string) {
    cy.get(".right-header mat-icon").should("have.text", icon)
  }

  colorSchemeIs(scheme: string) {
    cy.get("body").should($body => {
      expect($body[0].style.colorScheme).to.eq(scheme)
    })
  }

  bodyHasColorTheme(color: string) {
    cy.get("body").should("have.class", `${color}-theme`)
  }
}
