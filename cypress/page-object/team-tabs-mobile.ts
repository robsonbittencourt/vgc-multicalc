export class TeamTabsMobile {
  addTeamMember(): TeamTabsMobile {
    cy.get(".team-tab.add-tab:visible").first().click({ force: true })
    return this
  }

  activateTeamMember(position: number): TeamTabsMobile {
    cy.get(".team-tab").eq(position).click({ force: true })
    return this
  }

  longPressTeamMember(position: number): TeamTabsMobile {
    cy.get(".team-tab").eq(position).should("be.visible")
    cy.get(".team-tab")
      .eq(position)
      .trigger("touchstart", { force: true, touches: [{ clientX: 60, clientY: 120 }] })
    cy.wait(800)
    cy.get(".team-tab").eq(position).trigger("touchend", { force: true })

    return this
  }

  teamSizeIs(size: number) {
    cy.get(".team-tab").not(".add-tab").should("have.length", size)
  }

  actionMenuIsVisible() {
    cy.get(".action-menu-box").should("be.visible")
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

  secondAttackerBadgeIsOn(position: number) {
    cy.get(".team-tab").eq(position).should("have.class", "second-attacker")
    cy.get(".team-tab").eq(position).find(".combine-badge").should("exist")
  }

  noSecondAttackerBadge() {
    cy.get(".team-tab .combine-badge").should("not.exist")
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
