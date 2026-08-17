import { CoverageTable } from "./coverage-table"

export class OffensiveCoverage extends CoverageTable {
  protected componentSelector = "app-offensive-coverage"
  protected tableSelector = "offensive-coverage-table"

  attackerRowsAre(pokemonNames: string[]) {
    this.pokemonRowsAre(pokemonNames)
  }

  targetColumnsAre(pokemonNames: string[]) {
    this.container()
      .find(`[data-cy="${this.tableSelector}"] thead th.pokemon-header`)
      .should(headers => {
        const names = [...headers].map(h => h.querySelector('[data-cy="pokemon-image-small"] img')!.getAttribute("alt"))

        expect(names).to.deep.eq(pokemonNames)
      })
  }

  cellForAttackerIs(attackerName: string, targetIndex: number, expectedValue: string) {
    this.rows().should(rows => {
      expect(this.cellForPokemonRow(rows, attackerName, targetIndex)).to.eq(expectedValue)
    })
  }

  totalSuperEffectiveForTypeIs(typeName: string, expectedValue: number) {
    this.totalForTypeIs(typeName, "total-cell-super-effective", expectedValue)
  }

  teraTypeToggleIsHidden() {
    this.toggleIsHidden("consider-tera-type-toggle-offensive")
  }

  teraTypeToggleIsVisible() {
    this.toggleIsVisible("consider-tera-type-toggle-offensive")
  }

  toggleTeraType() {
    this.clickToggle("consider-tera-type-toggle-offensive")
  }

  teraBlastToggleIsHidden() {
    this.toggleIsHidden("consider-tera-blast-toggle-offensive")
  }

  teraBlastToggleIsVisible() {
    this.toggleIsVisible("consider-tera-blast-toggle-offensive")
  }

  toggleTeraBlast() {
    this.clickToggle("consider-tera-blast-toggle-offensive")
  }
}
