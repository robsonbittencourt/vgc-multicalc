export class ProbabilityField {
  toggleRain() {
    cy.get('[data-cy="probability-field-weather-rain"]').click()
  }

  toggleSun() {
    cy.get('[data-cy="probability-field-weather-sun"]').click()
  }

  toggleSand() {
    cy.get('[data-cy="probability-field-weather-sand"]').click()
  }

  toggleSnow() {
    cy.get('[data-cy="probability-field-weather-snow"]').click()
  }

  toggleGravity() {
    cy.get('[data-cy="probability-field-gravity"]').click()
  }
}
