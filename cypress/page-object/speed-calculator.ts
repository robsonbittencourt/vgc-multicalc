export class SpeedCalculator {
  speedModifier(modifier: string) {
    cy.get('[data-cy="speed-calc-spe-modifier"]').click()
    cy.get("mat-option").contains(modifier).click()
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
    cy.get('[data-cy="speed-box"]').eq(position).find('[data-cy="speed-box-description"]').should("have.text", description)
  }
}
