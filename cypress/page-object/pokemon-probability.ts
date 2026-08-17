export class PokemonProbability {
  accuracyIs(accuracy: string) {
    cy.get('[data-cy="pokemon-probability-accuracy"]', { timeout: 15000 }).should("contain", `Accuracy: ${accuracy}%`)
  }

  emptyMessageIsVisible() {
    cy.get('[data-cy="pokemon-probability-empty-message"]').should("be.visible").and("contain", "Select a Pokémon")
  }

  multiHitIsVisible() {
    cy.get('[data-cy="pokemon-probability-multi-hit"]').should("be.visible").and("contain.text", "hits:")
  }

  multiHitIsHidden() {
    cy.get('[data-cy="pokemon-probability-multi-hit"]').should("not.exist")
  }

  multiHitListsHits(hits: number) {
    cy.get('[data-cy="pokemon-probability-multi-hit"]').should("contain.text", `${hits} hits:`)
  }

  activateMoveChip(moveName: string) {
    cy.get("app-pokemon-probability .chips-row mat-chip-option").contains(moveName).click({ force: true })
  }

  moveChipsAreVisible() {
    cy.get("app-pokemon-probability .chips-row mat-chip-option").should("have.length.at.least", 1)
  }

  hitsSelectIsHidden() {
    cy.get('app-pokemon-probability [data-cy="hits-taken"]').should("not.exist")
  }

  editButtonIsHidden() {
    cy.get("app-pokemon-probability .edit-button").should("not.exist")
  }

  teamEmptyMessageIsVisible() {
    cy.get('[data-cy="team-probability-empty-message"]').should("be.visible").and("contain", "Select a Pokémon")
  }
}
