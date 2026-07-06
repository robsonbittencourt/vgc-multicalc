export class SpeedCalc {
  speedModifier(modifier: string) {
    cy.get('[data-cy="speed-calc-spe-modifier"]').find('[data-cy="input-select"]').click().get("mat-option").contains(modifier).click()
  }

  icyWind() {
    cy.get(`[data-cy="speed-calc-icy-wind"] button`).click({ force: true })
  }

  paralyzed() {
    cy.get(`[data-cy="speed-calc-paralyzed"] button`).click({ force: true })
  }

  speedTierIs(position: number, pokemon: string, speed: number, description: string) {
    cy.get('[data-cy="speed-box"]').eq(position).find('[data-cy="speed-box-pokemon"]').find("img").should("have.attr", "alt", pokemon)
    cy.get('[data-cy="speed-box"]').eq(position).find('[data-cy="speed-box-value"]').should("have.text", speed)
    cy.get('[data-cy="speed-box"]').eq(position).find('[data-cy="speed-box-description"]').should("include.text", description)
  }

  speedInOrder() {
    cy.get('[data-cy="speed-box-value"]').then($values => {
      const speeds = [...$values].map(el => Number(el.innerText))
      const sorted = [...speeds].sort((a, b) => a - b)
      expect(speeds).to.deep.equal(sorted)
    })
  }

  speedInRerverseOrder() {
    cy.get('[data-cy="speed-box-value"]').then($values => {
      const speeds = [...$values].map(el => Number(el.innerText))
      const sorted = [...speeds].sort((a, b) => b - a)
      expect(speeds).to.deep.equal(sorted)
    })
  }

  topUsage(usage: "30" | "60" | "100" | "125" | "All") {
    cy.get('[data-cy="speed-calc-top-usage"]').find('[data-cy="input-select"]').click().get("mat-option").contains(usage).click()
  }

  mode(mode: "Stats and Meta" | "Stats" | "Meta" | "Base") {
    cy.get('[data-cy="speed-calc-mode"]').find('[data-cy="input-select"]').click().get("mat-option").contains(mode).click()
  }

  filter(value: string) {
    cy.get('[data-cy="speed-calc-filter"]').find('[data-cy="input-select"]').click().get("mat-option").contains(value).click()
  }

  toggleMyWholeTeam() {
    cy.get('[data-cy="speed-calc-show-my-team"] button').click({ force: true })
  }

  speedBoxCount() {
    return cy.get('[data-cy="speed-box"]').find('[data-cy="speed-box-pokemon"]')
  }

  pokemonBox(pokemon: string) {
    return cy.get('[data-cy="speed-box"]').filter((_, el) => el.querySelector(`[data-cy="speed-box-pokemon"] img[alt="${pokemon}"]`) != null)
  }

  pokemonBoxHasDescription(pokemon: string, description: string) {
    this.pokemonBox(pokemon).find('[data-cy="speed-box-description"]').should("include.text", description)
  }

  pokemonBoxHasNoDescription(pokemon: string, description: string) {
    this.pokemonBox(pokemon).find('[data-cy="speed-box-description"]').should("not.include.text", description)
  }
}
