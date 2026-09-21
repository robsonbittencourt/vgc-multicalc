export class TeamTabsMobile {
  addTeamMember(): TeamTabsMobile {
    cy.get(".team-tab.add-tab").filter(":visible").should("have.length.at.least", 1)
    cy.get(".team-tab.add-tab").filter(":visible").first().click({ force: true })

    return this
  }

  activateTeamMember(position: number): TeamTabsMobile {
    cy.get(".team-tab").eq(position).click({ force: true })
    return this
  }

  longPressTeamMember(position: number): TeamTabsMobile {
    return this.longPress(position, () => this.actionMenuIsVisible())
  }

  longPressTeamMemberToCombine(position: number): TeamTabsMobile {
    return this.longPress(position, () => this.secondAttackerBadgeIsOn(position))
  }

  private longPress(position: number, pressTookEffect: () => void): TeamTabsMobile {
    cy.get(".team-tab").eq(position).should("be.visible")
    cy.get(".team-tab")
      .eq(position)
      .trigger("touchstart", { force: true, touches: [{ clientX: 60, clientY: 120 }] })

    pressTookEffect()

    cy.get(".team-tab").eq(position).trigger("touchend", { force: true })

    return this
  }

  noPokemonMessageIsVisible() {
    cy.get('[data-cy="no-pokemon-message"]').should("be.visible")
  }

  noPokemonMessageIsHidden() {
    cy.get('[data-cy="no-pokemon-message"]').should("not.exist")
  }

  addTabIsVisible() {
    cy.get(".team-tab.add-tab:visible").should("exist")
  }

  addTabIsActive() {
    cy.get(".team-tab.add-tab").should("have.class", "active-tab")
  }

  activeTabHasSprite(pokemonName: string) {
    cy.get(".team-tab.active-tab").find(`img[alt="${pokemonName}"]`).should("exist")
  }

  visibleActiveTabHasSprite(pokemonName: string) {
    cy.get("app-team-tabs-mobile").filter(":visible").first().find(".team-tab.active-tab").find(`img[alt="${pokemonName}"]`).should("exist")
  }

  visibleTabsHaveSprite(pokemonName: string) {
    cy.get("app-team-tabs-mobile").filter(":visible").first().find(`img[alt="${pokemonName}"]`).should("exist")
  }

  teamSizeIs(size: number) {
    cy.get(".team-tab").not(".add-tab").should("have.length", size)
  }

  activateVisibleTeamMember(position: number): TeamTabsMobile {
    cy.get(".team-tab:visible").eq(position).click({ force: true })
    return this
  }

  visibleTeamSizeIs(size: number) {
    cy.get("app-team-tabs-mobile").filter(":visible").first().find(".team-tab").not(".add-tab").should("have.length", size)
  }

  actionMenuIsVisible() {
    cy.get(".action-menu-box").should("be.visible")
  }

  actionMenuIsInsideViewport() {
    cy.window().then(win => {
      cy.get(".action-menu-box").should($box => {
        const rect = $box[0].getBoundingClientRect()

        expect(rect.left, "menu left inside viewport").to.be.at.least(0)
        expect(rect.right, "menu right inside viewport").to.be.at.most(win.innerWidth)
      })
    })
  }

  actionMenuIsAboveBottomNav() {
    cy.window().then(win => {
      cy.get(".action-menu-box").should($box => {
        const navEl = win.document.querySelector('[data-cy="bottom-nav"]')!
        const menu = $box[0].getBoundingClientRect()
        const nav = navEl.getBoundingClientRect()
        const overlaps = menu.bottom > nav.top && menu.top < nav.bottom

        if (!overlaps) return

        const menuZ = Number(win.getComputedStyle($box[0].closest(".cdk-overlay-container")!).zIndex)
        const navZ = Number(win.getComputedStyle(navEl).zIndex)

        expect(menuZ, "action menu stacked above the bottom nav").to.be.greaterThan(navZ)
      })
    })
  }

  actionMenuIsRenderedOutsideTheSwipeTrack() {
    cy.get(".action-menu-box").closest(".swipe-track").should("not.exist")
  }

  actionMenuIsHidden() {
    cy.get(".action-menu-box").should("not.exist")
  }

  actionMenuDuplicateIsEnabled() {
    cy.get('[data-cy="duplicate-from-team-menu"]').should("be.visible").and("not.be.disabled")
  }

  actionMenuDuplicateIsDisabled() {
    cy.get('[data-cy="duplicate-from-team-menu"]').should("be.visible").and("be.disabled")
  }

  actionMenuDeleteIsEnabled() {
    cy.get('[data-cy="delete-from-team-menu"]').should("be.visible").and("not.be.disabled")
  }

  duplicateFromTeamMenu(): TeamTabsMobile {
    cy.get('[data-cy="duplicate-from-team-menu"]').click({ force: true })
    return this
  }

  deleteFromTeamMenu(): TeamTabsMobile {
    cy.get('[data-cy="delete-from-team-menu"]').click({ force: true })
    return this
  }

  touchActionMenuBackdrop(): TeamTabsMobile {
    cy.get(".action-menu-backdrop").click("top", { force: true })
    return this
  }

  actionMenuReorderIsEnabled() {
    cy.get('[data-cy="reorder-from-team-menu"]').should("be.visible").and("not.be.disabled")
  }

  actionMenuReorderIsDisabled() {
    cy.get('[data-cy="reorder-from-team-menu"]').should("be.visible").and("be.disabled")
  }

  reorderFromTeamMenu(): TeamTabsMobile {
    cy.get('[data-cy="reorder-from-team-menu"]').click({ force: true })
    return this
  }

  reorderBarIsVisible() {
    cy.get(".reorder-bar").should("be.visible")
  }

  reorderBarIsHidden() {
    cy.get(".reorder-bar").should("not.exist")
  }

  doneReordering(): TeamTabsMobile {
    cy.get('[data-cy="done-reorder-team"]').click({ force: true })
    return this
  }

  tabOrderIs(pokemonNames: string[]) {
    cy.get("app-team-tabs-mobile")
      .filter(":visible")
      .first()
      .find(".team-tab")
      .not(".add-tab")
      .should($tabs => {
        const names = [...$tabs].map(tab => tab.querySelector("img")?.getAttribute("alt") ?? "")

        expect(names).to.have.length(pokemonNames.length)

        pokemonNames.forEach((name, index) => {
          expect(names[index], `tab at position ${index}`).to.equal(name)
        })
      })
  }

  dragTabToPosition(fromPosition: number, toPosition: number): TeamTabsMobile {
    cy.get(".team-tab")
      .not(".add-tab")
      .eq(toPosition)
      .then($target => {
        const target = $target[0].getBoundingClientRect()
        const toX = Math.round(target.left + target.width / 2)
        const toY = Math.round(target.top + target.height / 2)

        cy.get(".team-tab")
          .not(".add-tab")
          .eq(fromPosition)
          .then($source => {
            const source = $source[0].getBoundingClientRect()
            const fromX = Math.round(source.left + source.width / 2)
            const fromY = Math.round(source.top + source.height / 2)

            const touchAt = (x: number, y: number) => [{ clientX: x, clientY: y, pageX: x, pageY: y, screenX: x, screenY: y, identifier: 0, target: $source[0] }]

            cy.wrap($source).trigger("touchstart", { force: true, touches: touchAt(fromX, fromY), targetTouches: touchAt(fromX, fromY) })

            for (let step = 1; step <= 12; step++) {
              const x = Math.round(fromX + ((toX - fromX) * step) / 12)
              const y = Math.round(fromY + ((toY - fromY) * step) / 12)

              cy.wrap($source).trigger("touchmove", { force: true, touches: touchAt(x, y), targetTouches: touchAt(x, y) })
            }

            cy.wrap($source).trigger("touchend", { force: true, touches: [], changedTouches: touchAt(toX, toY) })
          })
      })

    return this
  }

  secondAttackerBadgeIsOn(position: number) {
    cy.get(".team-tab").eq(position).should("have.class", "second-attacker")
    cy.get(".team-tab").eq(position).find(".combine-badge").should("exist")
  }

  noSecondAttackerBadge() {
    cy.get(".team-tab .combine-badge").should("not.exist")
  }

  noCombinedPairExists() {
    cy.get(".team-tab.second-attacker").should("not.exist")
    cy.get(".team-tab.combined-attacker").should("not.exist")
  }

  combinedPairIsOn(primaryPosition: number, secondPosition: number) {
    cy.get(".team-tab").eq(primaryPosition).should("have.class", "combined-attacker")
    cy.get(".team-tab").eq(secondPosition).should("have.class", "second-attacker")
  }

  combineHintIsVisible() {
    cy.get(".combine-hint").should("be.visible").and("contain.text", "Hold a Pokémon")
  }

  combineHintIsHidden() {
    cy.get(".combine-hint").should("not.exist")
  }

  dismissCombineHint(): TeamTabsMobile {
    cy.get(".combine-hint-dismiss").click({ force: true })
    return this
  }
}
