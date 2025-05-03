export class SpeedCalculator {
  speedModifier(modifier: string) {
    cy.get('[data-cy="speed-calc-spe-modifier"]').find('[data-cy="input-select"]').click().get("mat-option").contains(modifier).click()
  }

  iceWind() {
    cy.get(`[data-cy="speed-calc-ice-wind"] button`).click({ force: true })
  }

  paralyzed() {
    cy.get(`[data-cy="speed-calc-paralyzed"] button`).click({ force: true })
  }

  choiceScarf() {
    cy.get(`[data-cy="speed-calc-choice-scarf"] button`).click({ force: true })
  }

  speedTierIs(position: number, pokemon: string, speed: number, description: string) {
    cy.get('[data-cy="speed-box"]').eq(position).find('[data-cy="speed-box-pokemon"]').should("have.attr", "alt", pokemon)
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
}
