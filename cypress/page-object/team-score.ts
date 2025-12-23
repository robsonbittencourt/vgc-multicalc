export class TeamScore {
  verifyTeamScore(score: string) {
    cy.get('[data-cy="team-score-donut"]').find('[data-cy="donut-score-text"]').should("contain", score)
  }

  verifyPokemonScore(index: number, score: string) {
    cy.get(`[data-cy="pokemon-score-${index}"]`).should("contain", score)
  }

  verifyTeamScoreDoesNotExist() {
    cy.get('[data-cy="team-score-donut"]').should("not.exist")
  }
}
