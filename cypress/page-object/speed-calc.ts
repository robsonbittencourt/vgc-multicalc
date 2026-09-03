export class SpeedCalc {
  emptyMessageIsVisible() {
    cy.get('[data-cy="no-pokemon-message"]').filter(":visible").should("have.length.at.least", 1).and("contain.text", "You don't have any Pokémon yet")
  }

  filtersAreVisible() {
    this.settingsTab().contains("Filters").should("be.visible")
    this.settingsTab().contains("Opponent Side").should("be.visible")
    this.settingsTab().should($el => {
      const rect = $el[0].getBoundingClientRect()

      expect(rect.left).to.be.closeTo(0, 2)
    })
  }

  filtersAreHidden() {
    this.settingsTab().should($el => {
      const rect = $el[0].getBoundingClientRect()

      expect(Math.abs(rect.left)).to.be.greaterThan(2)
    })
  }

  private settingsTab() {
    return cy.get('[data-cy="scrollable-content-settings"]')
  }

  speedModifier(modifier: string) {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="speed-calc-spe-modifier"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(modifier).click()
    cy.get("mat-option").should("not.exist")
  }

  icyWind() {
    cy.get(`[data-cy="speed-calc-icy-wind"] button`).click({ force: true })
  }

  paralyzed() {
    cy.get(`[data-cy="speed-calc-paralyzed"] button`).click({ force: true })
  }

  actualSpeedIs(pokemon: string, speed: number) {
    this.pokemonBox(pokemon).find('[data-cy="speed-box-up-actual"]').find('[data-cy="speed-box-value"]').should("have.text", speed)
  }

  speedInOrder() {
    cy.get('[data-cy="speed-box-value"]').should($values => {
      const speeds = [...$values].map(el => Number(el.innerText))
      const sorted = [...speeds].sort((a, b) => a - b)
      expect(speeds).to.deep.equal(sorted)
    })
  }

  speedInRerverseOrder() {
    cy.get('[data-cy="speed-box-value"]').should($values => {
      const speeds = [...$values].map(el => Number(el.innerText))
      const sorted = [...speeds].sort((a, b) => b - a)
      expect(speeds).to.deep.equal(sorted)
    })
  }

  topUsage(usage: "30" | "60" | "100" | "125" | "All") {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="speed-calc-top-usage"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(usage).click()
    cy.get("mat-option").should("not.exist")
  }

  mode(mode: "Stats and Meta" | "Stats" | "Meta" | "Base") {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="speed-calc-mode"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(mode).click()
    cy.get("mat-option").should("not.exist")
  }

  filter(value: string) {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="speed-calc-filter"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(value).click()
    cy.get("mat-option").should("not.exist")
  }

  availableModesAre(modes: string[]) {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="speed-calc-mode"]').find('[data-cy="input-select"]').click()

    cy.get("mat-option").should($options => {
      const labels = [...$options].map(option => option.textContent!.trim())

      expect(labels).to.deep.eq(modes)
    })

    cy.get("body").type("{esc}")
    cy.get("mat-option").should("not.exist")
  }

  modeIs(mode: string) {
    cy.get('[data-cy="speed-calc-mode"]').find('[data-cy="input-select"]').should("contain.text", mode)
  }

  selectTarget(pokemon: string) {
    cy.get('[data-cy="speed-calc-target"]').find("input").click().clear().type(pokemon)
    cy.get("mat-option").contains(pokemon).click()
    cy.get("mat-option").should("not.exist")
  }

  clearTarget() {
    cy.get('[data-cy="speed-calc-target"]').find("mat-icon").click()
  }

  targetIs(pokemon: string) {
    cy.get('[data-cy="speed-calc-target"]').find("input").should("have.value", pokemon)
  }

  toggleMyWholeTeam() {
    cy.get('[data-cy="speed-calc-show-my-team"] button').click({ force: true })
  }

  distinctPokemonInScale(): Cypress.Chainable<string[]> {
    return cy.get('[data-cy="speed-box"]').then($boxes => {
      const names = [...$boxes].map(el => el.querySelector('[data-cy="speed-box-pokemon"] img')!.getAttribute("alt")!)

      return [...new Set(names)]
    })
  }

  scaleSettles() {
    cy.wait(600)
  }

  selectTier(pokemon: string) {
    this.pokemonBox(pokemon).first().find(".speed-box-down").click({ force: true })
  }

  activePokemonName(): Cypress.Chainable<string> {
    return cy
      .get('[data-cy="pokemon-select"]:visible')
      .first()
      .invoke("val")
      .then(value => String(value))
  }

  clickOutspeed() {
    cy.get('[data-cy="outspeed-button"]').click({ force: true })
  }

  outspeedButtonIs(pokemon: string) {
    cy.get('[data-cy="outspeed-button"]').scrollIntoView()
    cy.get('[data-cy="outspeed-button"]').should("be.visible").and("have.text", `Outspeed ${pokemon}`)
  }

  tierIsSelected(pokemon: string) {
    this.pokemonBox(pokemon).first().find(".speed-box-down").should("have.class", "actual")
  }

  outspeedButtonIsHidden() {
    cy.get('[data-cy="outspeed-button"]').should("not.exist")
  }

  speedValueOf(pokemon: string): Cypress.Chainable<number> {
    return this.pokemonBox(pokemon)
      .first()
      .find('[data-cy="speed-box-value"]')
      .then($v => Number($v.text().trim()))
  }

  scalePokemonAre(expected: string[]) {
    cy.get('[data-cy="speed-box"]').should($boxes => {
      const names = [...new Set([...$boxes].map(el => el.querySelector('[data-cy="speed-box-pokemon"] img')!.getAttribute("alt")!))]

      expect(names).to.deep.eq(expected)
    })
  }

  pokemonBox(pokemon: string) {
    return cy.get('[data-cy="speed-box"]').filter((_, el) => el.querySelector(`[data-cy="speed-box-pokemon"] img[alt="${pokemon}"]`) != null)
  }

  topUsageIsHidden() {
    cy.get('[data-cy="speed-calc-top-usage"]').should("not.exist")
  }

  topUsageIsVisible() {
    cy.get('[data-cy="speed-calc-top-usage"]').should("exist")
  }

  speedModifierIs(modifier: string) {
    cy.get('[data-cy="speed-calc-spe-modifier"]').find('[data-cy="input-select"]').should("contain.text", modifier)
  }

  pokemonBoxHasDescription(pokemon: string, description: string) {
    this.pokemonBox(pokemon).find('[data-cy="speed-box-description"]').should("include.text", description)
  }

  pokemonBoxHasNoDescription(pokemon: string, description: string) {
    this.pokemonBox(pokemon).find('[data-cy="speed-box-description"]').should("not.include.text", description)
  }

  yourTeamBoxIsHighlighted(pokemon: string) {
    this.yourTeamBox(pokemon).should("have.class", "actual")
  }

  private yourTeamBox(pokemon: string) {
    return this.pokemonBox(pokemon)
      .filter((_, el) => (el.querySelector('[data-cy="speed-box-description"]')?.textContent ?? "").includes("Yours"))
      .find(".speed-box-down")
  }
}
