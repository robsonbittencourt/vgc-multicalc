export class CommunityTeams {
  visitWithFilters(query: string): CommunityTeams {
    cy.visit(`/teams?${query}`)
    return this
  }

  linkHasFilter(name: string, value: string): CommunityTeams {
    cy.location("search").should(search => expect(new URLSearchParams(search).get(name)).to.eq(value))
    return this
  }

  linkHasNoFilter(name: string): CommunityTeams {
    cy.location("search").should(search => expect(new URLSearchParams(search).has(name)).to.eq(false))
    return this
  }

  compactRowsExist(): CommunityTeams {
    cy.get('[data-cy="community-team-compact"]').should("have.length.greaterThan", 0)
    return this
  }

  pageStatusShowsTeams(): CommunityTeams {
    cy.get('[data-cy="teams-page-status"]')
      .invoke("text")
      .should("match", /Page \d+ of \d+, \d+ Teams?/)
    return this
  }

  useDetailedView(): CommunityTeams {
    cy.get('[data-cy="teams-view-detailed"]').click({ force: true })
    return this
  }

  detailedTeamsHaveCards(): CommunityTeams {
    cy.get('[data-cy="community-team"]').should("have.length.greaterThan", 0)
    cy.get('[data-cy="community-team"]').first().find('[data-cy="paste-pokemon-card"]').should("have.length.greaterThan", 0)
    return this
  }

  filterBySource(source: "all" | "vgcpastes" | "community"): CommunityTeams {
    cy.get(`[data-cy="teams-origin"] mat-button-toggle[value="${source}"] button`).click({ force: true })
    return this
  }

  sourceIs(source: "all" | "vgcpastes" | "community"): CommunityTeams {
    cy.get(`[data-cy="teams-origin"] mat-button-toggle[value="${source}"]`).should("have.class", "mat-button-toggle-checked")
    return this
  }

  creatorFilterIs(creator: string): CommunityTeams {
    cy.get('[data-cy="teams-search-creator"] input').should("have.value", creator)
    return this
  }

  emptyResultIsShown(): CommunityTeams {
    cy.get('[data-cy="teams-empty-result"]').should("be.visible")
    return this
  }

  everyOriginIs(origin: string): CommunityTeams {
    cy.get('[data-cy="community-team-compact"] [data-cy="community-team-origin"]').each(cell => expect(cell.text().trim()).to.eq(origin))
    return this
  }

  firstRowCreatorIs(creator: string): CommunityTeams {
    cy.get('[data-cy="community-team-compact"]').first().find('[data-cy="community-team-creator"]').should("contain.text", creator)
    return this
  }

  firstPasteId(): Cypress.Chainable<string> {
    return cy
      .get('[data-cy="community-team-paste-open"]')
      .first()
      .invoke("attr", "href")
      .then(href => String(href).split("/paste/")[1])
  }

  openFirstRow(): CommunityTeams {
    cy.get('[data-cy="community-team-compact"]').first().click()
    cy.get('[data-cy="teams-paste-detail"]').should("be.visible")
    return this
  }

  backToTeams(): CommunityTeams {
    cy.get('[data-cy="teams-back-to-list"]').click()
    cy.get('[data-cy="teams-compact-list"]').should("be.visible")
    return this
  }

  openSubmit(): CommunityTeams {
    cy.get('[data-cy="teams-open-submit"]').click()
    cy.get('[data-cy="submit-team-form"]').should("be.visible")
    return this
  }

  fillTeam(fields: { name?: string; player?: string; handle?: string; event?: string; placement?: string; replicaCode?: string }): CommunityTeams {
    const inputs: [string | undefined, string][] = [
      [fields.name, "submit-team-name"],
      [fields.player, "submit-team-player"],
      [fields.handle, "submit-team-handle"],
      [fields.event, "submit-team-event"],
      [fields.replicaCode, "submit-team-replica-code"]
    ]

    inputs.filter(([value]) => value !== undefined).forEach(([value, dataCy]) => cy.get(`[data-cy="${dataCy}"] input`).clear().type(value!))

    if (fields.placement !== undefined) cy.get('[data-cy="submit-team-placement"] input').clear().type(fields.placement).blur()

    return this
  }

  typeShowdown(text: string): CommunityTeams {
    cy.get('[data-cy="submit-team-text"]').invoke("val", text).trigger("input")
    return this
  }

  submit(): CommunityTeams {
    cy.get('[data-cy="submit-team-button"]').click()
    return this
  }

  submitErrorIs(message: string): CommunityTeams {
    cy.get('[data-cy="submit-team-error"]').should("contain.text", message)
    return this
  }

  listIsShown(): CommunityTeams {
    cy.get('[data-cy="teams-compact-list"]').should("be.visible")
    return this
  }

  askToDeleteFirstTeam(): CommunityTeams {
    cy.get('[data-cy="teams-delete-team"]').first().click()
    cy.get('[data-cy="teams-confirm-delete"]').should("be.visible")
    return this
  }

  confirmDelete(): CommunityTeams {
    cy.get('[data-cy="teams-confirm-delete"]').click()
    return this
  }

  cancelDelete(): CommunityTeams {
    cy.get('[data-cy="teams-cancel-delete"]').click()
    cy.get('[data-cy="teams-confirm-delete"]').should("not.exist")
    cy.get('[data-cy="teams-delete-team"]').should("be.visible")
    return this
  }

  recentTeamsContain(teamName: string): CommunityTeams {
    cy.get('[data-cy="teams-recent"]').should("contain.text", teamName)
    return this
  }

  recentTeamsAreEmpty(): CommunityTeams {
    cy.get('[data-cy="teams-recent"]').should("contain.text", "No teams submitted yet.")
    return this
  }

  mostViewedHasTeams(count: number): CommunityTeams {
    cy.get('[data-cy="teams-most-viewed"] [data-cy="side-team"]').should("have.length", count)
    return this
  }

  mostViewedIsEmpty(): CommunityTeams {
    cy.get('[data-cy="teams-most-viewed"]').should("contain.text", "No views yet.")
    return this
  }

  mobileCardsAre(count: number): CommunityTeams {
    cy.get('[data-cy="community-team-mobile"]').should("have.length", count)
    return this
  }

  mobileCardsExist(): CommunityTeams {
    cy.get('[data-cy="community-team-mobile"]').should("have.length.greaterThan", 0)
    return this
  }

  mobileStatusShowsTeams(): CommunityTeams {
    cy.get('[data-cy="teams-page-status"]')
      .invoke("text")
      .should("match", /^\d+ Teams?$/)
    return this
  }

  everyMobileOriginIs(origin: string): CommunityTeams {
    cy.get('[data-cy="community-team-mobile"] [data-cy="community-team-origin"]').each(cell => expect(cell.text().trim()).to.eq(origin))
    return this
  }

  firstMobileCardCreatorIs(creator: string): CommunityTeams {
    cy.get('[data-cy="community-team-mobile"]').first().should("contain.text", creator)
    return this
  }

  searchMobile(text: string): CommunityTeams {
    cy.get('[data-cy="teams-mobile-search"] input').clear().type(text)
    return this
  }

  clearMobileSearch(): CommunityTeams {
    cy.get('[data-cy="teams-mobile-search"] input').clear()
    return this
  }

  mobileSearchIs(text: string): CommunityTeams {
    cy.get('[data-cy="teams-mobile-search"] input').should("have.value", text)
    return this
  }

  showMore(): CommunityTeams {
    cy.get('[data-cy="teams-show-more"]').click()
    return this
  }

  openFiltersSheet(): CommunityTeams {
    cy.get('[data-cy="teams-open-filters"]').click()
    cy.get('[data-cy="teams-apply-filters"]').should("be.visible")
    return this
  }

  filtersButtonIs(label: string): CommunityTeams {
    cy.get('[data-cy="teams-open-filters"]').should("contain.text", label)
    return this
  }

  applyFilters(): CommunityTeams {
    cy.get('[data-cy="teams-apply-filters"]').click()
    return this
  }

  clearAllFilters(): CommunityTeams {
    cy.get('[data-cy="teams-clear-filters"]').click()
    return this
  }

  filtersSheetIsClosed(): CommunityTeams {
    cy.get('[data-cy="teams-filters-sheet"]').should("not.exist")
    return this
  }

  pageScrollIsLocked(): CommunityTeams {
    cy.document().its("body.style.overflow").should("eq", "hidden")
    return this
  }

  pageScrollIsFree(): CommunityTeams {
    cy.document().its("body.style.overflow").should("eq", "")
    return this
  }

  openFirstMobileCard(): CommunityTeams {
    cy.get('[data-cy="community-team-mobile"] .mobile-team-name').first().click()
    cy.get('[data-cy="teams-paste-detail"]').should("be.visible")
    return this
  }

  backToMobileList(): CommunityTeams {
    cy.get('[data-cy="teams-back-to-list"]').click()
    cy.get('[data-cy="teams-mobile-list"]').should("be.visible")
    return this
  }

  mobileListIsShown(): CommunityTeams {
    cy.get('[data-cy="teams-mobile-list"]').should("be.visible")
    return this
  }
}
