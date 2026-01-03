export class OffensiveCoverage {
  private container() {
    return cy.get("app-offensive-coverage")
  }

  verifyTableNotExists() {
    this.container().find('[data-cy="offensive-coverage-table"]').should("not.exist")
  }

  verifyTableVisible() {
    this.container().find('[data-cy="offensive-coverage-table"]').should("be.visible")
  }

  verifyPokemonHeaderContains(pokemonName: string) {
    this.container().find('[data-cy="pokemon-header"]').find('[data-cy="pokemon-image-small"]').should("have.attr", "alt", pokemonName)
  }

  verifyPokemonHeadersCount(expectedCount: number) {
    this.container().find('[data-cy="pokemon-header"]').should("have.length", expectedCount)
  }

  verifyEffectivenessCellsCount(minCount: number) {
    this.container().find('[data-cy="effectiveness-cell"]').should("have.length.at.least", minCount)
  }

  verifyEffectivenessValue(rowIndex: number, pokemonIndex: number, expectedValue: string) {
    this.container().find('[data-cy="offensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="effectiveness-cell"]').eq(pokemonIndex).should("contain", expectedValue)
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

  verifyTotalNotVeryEffective(rowIndex: number, expectedValue: number) {
    this.container().find('[data-cy="offensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="total-cell-not-very-effective"]').should("contain", expectedValue.toString())
  }

  verifyTotalSuperEffective(rowIndex: number, expectedValue: number) {
    this.container().find('[data-cy="offensive-coverage-table"]').find("tbody").find("tr").eq(rowIndex).find('[data-cy="total-cell-super-effective"]').should("contain", expectedValue.toString())
  }

  verifyTeraTypeToggleNotExists() {
    cy.get('[data-cy="consider-tera-type-toggle-offensive"]').should("not.exist")
  }

  verifyTeraTypeToggleVisible() {
    cy.get('[data-cy="consider-tera-type-toggle-offensive"]').should("be.visible")
  }

  toggleTeraType() {
    cy.get('[data-cy="consider-tera-type-toggle-offensive"]').click()
  }

  verifyTeraTypeToggleChecked() {
    cy.get('[data-cy="consider-tera-type-toggle-offensive"]').should("have.class", "mat-mdc-slide-toggle-checked")
  }

  verifyTeraBlastToggleNotExists() {
    cy.get('[data-cy="consider-tera-blast-toggle-offensive"]').should("not.exist")
  }

  verifyTeraBlastToggleVisible() {
    cy.get('[data-cy="consider-tera-blast-toggle-offensive"]').should("be.visible")
  }

  toggleTeraBlast() {
    cy.get('[data-cy="consider-tera-blast-toggle-offensive"]').click()
  }

  verifyTeraBlastToggleChecked() {
    cy.get('[data-cy="consider-tera-blast-toggle-offensive"]').should("have.class", "mat-mdc-slide-toggle-checked")
  }
}
