import { CoverageTable } from "./coverage-table"

export class DefensiveCoverage extends CoverageTable {
  protected componentSelector = "app-defensive-coverage"
  protected tableSelector = "defensive-coverage-table"

  targetRowsAre(pokemonNames: string[]) {
    this.pokemonRowsAre(pokemonNames)
  }

  cellForTargetIs(targetName: string, pokemonIndex: number, expectedValue: string) {
    this.rows().should(rows => {
      expect(this.cellForPokemonRow(rows, targetName, pokemonIndex)).to.eq(expectedValue)
    })
  }

  cellForTypeHasClass(typeName: string, pokemonIndex: number, expectedClass: string) {
    this.rows().should(rows => {
      const row = this.rowOfType(rows, typeName)

      expect(row.querySelectorAll('[data-cy="effectiveness-cell"]')[pokemonIndex].className).to.contain(expectedClass)
    })
  }

  totalWeakForTypeIs(typeName: string, expectedValue: number) {
    this.totalForTypeIs(typeName, "total-cell-weak", expectedValue)
  }

  totalResistForTypeIs(typeName: string, expectedValue: number) {
    this.totalForTypeIs(typeName, "total-cell-resist", expectedValue)
  }

  teraTypeToggleIsVisible() {
    this.toggleIsVisible("consider-tera-type-toggle")
  }

  toggleTeraType() {
    this.clickToggle("consider-tera-type-toggle")
  }

  teraTypeToggleIsChecked() {
    cy.get('[data-cy="consider-tera-type-toggle"]').should("have.class", "mat-mdc-slide-toggle-checked")
  }

  teraBlastToggleIsHidden() {
    this.toggleIsHidden("consider-tera-blast-toggle-defensive")
  }

  teraBlastToggleIsVisible() {
    this.toggleIsVisible("consider-tera-blast-toggle-defensive")
  }

  toggleTeraBlast() {
    this.clickToggle("consider-tera-blast-toggle-defensive")
  }
}
