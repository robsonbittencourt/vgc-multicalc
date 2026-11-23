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

  openTeams(): Header {
    return this.openMenuOption("teams")
  }

  openCreatePaste(): Header {
    cy.get('[data-cy="create-paste"]').click({ force: true })
    cy.url().should("include", "/paste")

    return this
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

  openThemeMenu(): Header {
    cy.get("[data-cy=theme-button]").realClick()
    cy.wait(300)

    cy.get("body").then($body => {
      if ($body.find(".menu-item").length === 0) {
        cy.get("[data-cy=theme-button]").realClick()
      }
    })

    cy.get(".menu-item").should("exist")

    return this
  }

  openLanguageMenu(): Header {
    cy.get("[data-cy=language-button]").realClick()
    cy.wait(300)

    cy.get("body").then($body => {
      if ($body.find("[data-cy^=language-]:not([data-cy=language-button])").length === 0) {
        cy.get("[data-cy=language-button]").realClick()
      }
    })

    cy.get("[data-cy=language-en]").should("exist")

    return this
  }

  selectLanguage(language: string): Header {
    this.openLanguageMenu()
    cy.get(`[data-cy=language-${language}]`).click({ force: true })
    return this
  }

  languageButtonIs(label: string) {
    cy.get("[data-cy=language-button]").should("contain.text", label)
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
    cy.get("[data-cy=theme-button]").should("have.text", icon)
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
