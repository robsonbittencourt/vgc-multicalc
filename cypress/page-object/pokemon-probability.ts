export class PokemonProbability {
  verifyAccuracy(accuracy: string) {
    cy.get('[data-cy="pokemon-probability-accuracy"]').should("contain", `Accuracy: ${accuracy}%`)
  }
}
