export class DefensiveCoverage {
  private container() {
    return cy.get("app-defensive-coverage")
  }

  verifyTableNotExists() {
    cy.get("app-defensive-coverage", { timeout: 10000 }).should("exist")
    cy.get("app-defensive-coverage").find('[data-cy="defensive-coverage-table"]').should("not.exist")
  }

  verifyTableVisible() {
    this.container().find('[data-cy="defensive-coverage-table"]').should("be.visible")
  }

  verifyPokemonHeaderContains(pokemonName: string) {
    this.container().find('[data-cy="pokemon-header"]').find('[data-cy="pokemon-image-small"]').should("have.attr", "alt", pokemonName)
  }

  verifyPokemonHeadersCount(expectedCount: number) {
    this.container().find('[data-cy="defensive-coverage-table"]').find("thead").find('[data-cy="pokemon-header"]').should("have.length", expectedCount)
  }

  verifyEffectivenessCellsCount(minCount: number) {
    this.container().find('[data-cy="effectiveness-cell"]').should("have.length.at.least", minCount)
  }

  verifyEffectivenessValue(rowIndex: number, pokemonIndex: number, expectedValue: string) {
    this.container().find('[data-cy="defensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="effectiveness-cell"]').eq(pokemonIndex).should("contain", expectedValue)
  }

  verifyEffectivenessValue2x(rowIndex: number, pokemonIndex: number) {
    this.verifyEffectivenessValue(rowIndex, pokemonIndex, "2x")
  }

  verifyEffectivenessValue4x(rowIndex: number, pokemonIndex: number) {
    this.verifyEffectivenessValue(rowIndex, pokemonIndex, "4x")
  }

  verifyEffectivenessValueHalf(rowIndex: number, pokemonIndex: number) {
    this.verifyEffectivenessValue(rowIndex, pokemonIndex, "1/2")
  }

  verifyEffectivenessValueImmune(rowIndex: number, pokemonIndex: number) {
    this.verifyEffectivenessValue(rowIndex, pokemonIndex, "immune")
  }

  verifyTotalWeak(rowIndex: number, expectedValue: number) {
    this.container().find('[data-cy="defensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="total-cell-weak"]').should("contain", expectedValue.toString())
  }

  verifyTotalResist(rowIndex: number, expectedValue: number) {
    this.container().find('[data-cy="defensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="total-cell-resist"]').should("contain", expectedValue.toString())
  }

  verifyTeraTypeToggleVisible() {
    cy.get('[data-cy="consider-tera-type-toggle"]').should("be.visible")
  }

  toggleTeraType() {
    cy.get('[data-cy="consider-tera-type-toggle"]').click()
  }

  verifyTeraTypeToggleChecked() {
    cy.get('[data-cy="consider-tera-type-toggle"]').should("have.class", "mat-mdc-slide-toggle-checked")
  }

  verifyTeraBlastToggleNotExists() {
    cy.get('[data-cy="consider-tera-blast-toggle-defensive"]').should("not.exist")
  }

  verifyTeraBlastToggleVisible() {
    cy.get('[data-cy="consider-tera-blast-toggle-defensive"]').should("be.visible")
  }

  toggleTeraBlast() {
    cy.get('[data-cy="consider-tera-blast-toggle-defensive"]').click()
  }

  verifyTeraBlastToggleChecked() {
    cy.get('[data-cy="consider-tera-blast-toggle-defensive"]').should("have.class", "mat-mdc-slide-toggle-checked")
  }
}
