export class TypeCoverageInsights {
  private container() {
    return cy.get("app-type-coverage-insights")
  }

  verifyEmptyMessage() {
    cy.get('[data-cy="type-coverage-insights-empty-message"]').should("be.visible")
    cy.get('[data-cy="type-coverage-insights-empty-message"]').should("contain", "Select a Team")
  }

  verifyInsightsContainerVisible() {
    this.container().find('[data-cy="type-coverage-insights-container"]').should("be.visible")
  }

  verifyOffensiveSectionVisible() {
    this.container().find('[data-cy="insight-section-offensive"]').should("be.visible")
    this.container().find('[data-cy="section-title-offensive"]').should("contain", "Offensive")
  }

  verifyDefensiveSectionVisible() {
    this.container().find('[data-cy="insight-section-defensive"]').should("be.visible")
    this.container().find('[data-cy="section-title-defensive"]').should("contain", "Defensive")
  }

  verifyOffensiveContentVisible() {
    this.container().find('[data-cy="offensive-content"]').should("be.visible")
  }

  verifyDefensiveContentVisible() {
    this.container().find('[data-cy="defensive-content"]').should("be.visible")
  }

  verifySummarySuperEffectiveExists() {
    this.container().find('[data-cy="summary-super-effective"]').should("exist")
  }

  verifySummarySuperEffectiveNotExists() {
    this.container().find('[data-cy="summary-super-effective"]').should("not.exist")
  }

  verifySummaryNotVeryEffectiveExists() {
    this.container().find('[data-cy="summary-not-very-effective"]').should("exist")
  }

  verifySummaryNotVeryEffectiveNotExists() {
    this.container().find('[data-cy="summary-not-very-effective"]').should("not.exist")
  }

  verifySummaryResistanceExists() {
    this.container().find('[data-cy="summary-resistance"]').should("exist")
  }

  verifySummaryResistanceNotExists() {
    this.container().find('[data-cy="summary-resistance"]').should("not.exist")
  }

  verifySummaryWeaknessExists() {
    this.container().find('[data-cy="summary-weakness"]').should("exist")
  }

  verifySummaryWeaknessNotExists() {
    this.container().find('[data-cy="summary-weakness"]').should("not.exist")
  }

  verifyPokemonIconsCount(minCount: number) {
    this.container().find('[data-cy="pokemon-icon"]').should("have.length.at.least", minCount)
  }

  verifyExplanationsCount(minCount: number) {
    this.container().find('[data-cy="explanation"]').should("have.length.at.least", minCount)
  }

  verifyPokemonInsightCardsCount(minCount: number) {
    this.container().find('[data-cy="pokemon-insight-card"]').should("have.length.at.least", minCount)
  }

  verifyTypeSummariesNotExist() {
    this.verifySummarySuperEffectiveNotExists()
    this.verifySummaryNotVeryEffectiveNotExists()
    this.verifySummaryResistanceNotExists()
    this.verifySummaryWeaknessNotExists()
  }

  verifyOffensiveSuperEffectiveCount2x(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="offensive-super-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="offensive-super-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("super effective").should("contain", expectedCount.toString())
  }

  verifyOffensiveSuperEffectiveCount4x(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="offensive-super-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="offensive-super-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("super effective x4").should("contain", expectedCount.toString())
  }

  verifyOffensiveNotVeryEffectiveCount(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="offensive-not-very-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="offensive-not-very-effective-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').should("contain", expectedCount.toString())
  }

  verifyDefensiveResistCount(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="defensive-positive-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="defensive-positive-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("resistance").should("contain", expectedCount.toString())
  }

  verifyDefensiveImmuneCount(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="defensive-positive-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="defensive-positive-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("immunity").should("contain", expectedCount.toString())
  }

  verifyDefensiveWeakCount2x(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("weakness").should("contain", expectedCount.toString())
  }

  verifyDefensiveWeakCount4x(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("weakness x4").should("contain", expectedCount.toString())
  }

  verifyDefensiveWeaknessesCoveredByTera(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-icon"]').should("have.attr", "alt", pokemonName)
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="explanation"]').contains("covered by tera").should("contain", expectedCount.toString())
  }

  verifySummarySuperEffectiveCount(expectedCount: number, expectedType: string) {
    this.container().find('[data-cy="summary-super-effective-count"]').should("contain", expectedCount.toString())
    this.container().find('[data-cy="summary-super-effective"]').find('[data-cy="pokemon-type"]').should("contain", expectedType)
  }

  verifySummaryNotVeryEffectiveCount(expectedCount: number, expectedType: string) {
    this.container().find('[data-cy="summary-not-very-effective-count"]').should("contain", expectedCount.toString())
    this.container().find('[data-cy="summary-not-very-effective"]').find('[data-cy="pokemon-type"]').should("contain", expectedType)
  }

  verifySummaryResistanceCount(expectedCount: number, expectedType: string) {
    this.container().find('[data-cy="summary-resistance-count"]').should("contain", expectedCount.toString())
    this.container().find('[data-cy="summary-resistance"]').find('[data-cy="pokemon-type"]').should("contain", expectedType)
  }

  verifySummaryWeaknessCount(expectedCount: number, expectedType: string) {
    this.container().find('[data-cy="summary-weakness-count"]').should("contain", expectedCount.toString())
    this.container().find('[data-cy="summary-weakness"]').find('[data-cy="pokemon-type"]').should("contain", expectedType)
  }
}
