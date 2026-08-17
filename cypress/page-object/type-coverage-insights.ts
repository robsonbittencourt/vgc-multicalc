export class TypeCoverageInsights {
  private container() {
    return cy.get("app-type-coverage-insights")
  }

  emptyMessageIsVisible() {
    cy.get('[data-cy="type-coverage-insights-empty-message"]').should("be.visible")
    cy.get('[data-cy="type-coverage-insights-empty-message"]').should("contain", "Select a Team")
  }

  insightsContainerIsVisible() {
    this.container().find('[data-cy="type-coverage-insights-container"]').should("be.visible")
  }

  offensiveSectionIsVisible() {
    this.container().find('[data-cy="insight-section-offensive"]').should("be.visible")
    this.container().find('[data-cy="section-title-offensive"]').should("contain", "Offensive")
  }

  defensiveSectionIsVisible() {
    this.container().find('[data-cy="insight-section-defensive"]').should("be.visible")
    this.container().find('[data-cy="section-title-defensive"]').should("contain", "Defensive")
  }

  summarySuperEffectiveIsHidden() {
    this.summary("super-effective").should("not.exist")
  }

  summaryNotVeryEffectiveIsHidden() {
    this.summary("not-very-effective").should("not.exist")
  }

  summaryResistanceIsVisible() {
    this.summary("resistance").should("exist")
  }

  summaryResistanceIsHidden() {
    this.summary("resistance").should("not.exist")
  }

  summaryWeaknessIsHidden() {
    this.summary("weakness").should("not.exist")
  }

  private summary(name: string) {
    return this.container().find(`[data-cy="summary-${name}"]`)
  }

  typeSummariesAreHidden() {
    this.summarySuperEffectiveIsHidden()
    this.summaryNotVeryEffectiveIsHidden()
    this.summaryResistanceIsHidden()
    this.summaryWeaknessIsHidden()
  }

  summaryResistanceCountIs(expectedCount: number) {
    this.container().find('[data-cy="summary-resistance-count"]').should("contain", expectedCount.toString())
  }

  pokemonIconsCountIsAtLeast(minCount: number) {
    this.container().find('[data-cy="pokemon-icon"]').should("have.length.at.least", minCount)
  }

  explanationsCountIsAtLeast(minCount: number) {
    this.container().find('[data-cy="explanation"]').should("have.length.at.least", minCount)
  }

  defensiveResistCountIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("defensive-positive", pokemonIndex, pokemonName, "resistance", expectedCount)
  }

  defensiveImmuneCountIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("defensive-positive", pokemonIndex, pokemonName, "immunity", expectedCount)
  }

  defensiveWeakCount2xIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("defensive-weak", pokemonIndex, pokemonName, "weakness", expectedCount)
  }

  defensiveWeakCount4xIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("defensive-weak", pokemonIndex, pokemonName, "weakness x4", expectedCount)
  }

  defensiveWeaknessesCoveredByTeraIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("defensive-weak", pokemonIndex, pokemonName, "covered by tera", expectedCount)
  }

  offensiveSuperEffectiveCount2xIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightExplanationIs("offensive-super-effective", pokemonIndex, pokemonName, "super effective", expectedCount)
  }

  offensiveNotVeryEffectiveCountIs(pokemonIndex: number, pokemonName: string, expectedCount: number) {
    this.insightCard("offensive-not-very-effective", pokemonIndex, pokemonName).find('[data-cy="explanation"]').should("contain", expectedCount.toString())
  }

  private insightExplanationIs(section: string, pokemonIndex: number, pokemonName: string, label: string, expectedCount: number) {
    this.insightCard(section, pokemonIndex, pokemonName).find('[data-cy="explanation"]').contains(label).should("contain", expectedCount.toString())
  }

  private insightCard(section: string, pokemonIndex: number, pokemonName: string) {
    const card = this.container().find(`[data-cy="${section}-pokemon-${pokemonIndex}"]`)

    card.find('[data-cy="pokemon-icon"]').find("img").should("have.attr", "alt", pokemonName)

    return this.container().find(`[data-cy="${section}-pokemon-${pokemonIndex}"]`)
  }

  defensiveWeakCardIsAllCovered(pokemonIndex: number) {
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-insight-card"]').should("have.class", "weak-all-covered")
  }

  defensiveWeakCardIsNotAllCovered(pokemonIndex: number) {
    this.container().find(`[data-cy="defensive-weak-pokemon-${pokemonIndex}"]`).find('[data-cy="pokemon-insight-card"]').should("have.class", "weak").and("not.have.class", "weak-all-covered")
  }

  summarySuperEffectiveCountIs(expectedCount: number, expectedType: string) {
    this.summaryCountIs("super-effective", expectedCount, expectedType)
  }

  summaryNotVeryEffectiveCountIs(expectedCount: number, expectedType: string) {
    this.summaryCountIs("not-very-effective", expectedCount, expectedType)
  }

  summaryResistanceCountAndTypeIs(expectedCount: number, expectedType: string) {
    this.summaryCountIs("resistance", expectedCount, expectedType)
  }

  summaryWeaknessCountIs(expectedCount: number, expectedType: string) {
    this.summaryCountIs("weakness", expectedCount, expectedType)
  }

  private summaryCountIs(name: string, expectedCount: number, expectedType: string) {
    this.container().find(`[data-cy="summary-${name}-count"]`).should("contain", expectedCount.toString())
    this.container().find(`[data-cy="summary-${name}"]`).find('[data-cy="pokemon-type"]').should("contain", expectedType)
  }
}
