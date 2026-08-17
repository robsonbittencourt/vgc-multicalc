export abstract class CoverageTable {
  protected abstract componentSelector: string
  protected abstract tableSelector: string

  protected container() {
    return cy.get(this.componentSelector)
  }

  protected table() {
    return this.container().find(`[data-cy="${this.tableSelector}"]`)
  }

  protected rows() {
    return this.container().find(`[data-cy="${this.tableSelector}"] tbody tr`)
  }

  tableIsVisible() {
    this.table().should("be.visible")
  }

  componentIsHidden() {
    this.container().should("not.exist")
  }

  tableIsHidden() {
    this.container().should("exist")
    this.table().should("not.exist")
  }

  pokemonHeaderContains(pokemonName: string) {
    this.container().find('[data-cy="pokemon-header"]').find('[data-cy="pokemon-image-small"]').find("img").should("have.attr", "alt", pokemonName)
  }

  effectivenessCellsCountIsAtLeast(minCount: number) {
    this.container().find('[data-cy="effectiveness-cell"]').should("have.length.at.least", minCount)
  }

  rowsCountIs(count: number) {
    this.rows().should("have.length", count)
  }

  effectivenessValueIs(rowIndex: number, pokemonIndex: number, expectedValue: string) {
    this.table().find("tbody").find("tr").eq(rowIndex).find('[data-cy="effectiveness-cell"]').eq(pokemonIndex).should("contain", expectedValue)
  }

  cellForTypeIs(typeName: string, pokemonIndex: number, expectedValue: string) {
    this.rows().should(rows => {
      expect(this.cellTextOfType(rows, typeName, '[data-cy="effectiveness-cell"]', pokemonIndex)).to.eq(expectedValue)
    })
  }

  totalForTypeIs(typeName: string, totalSelector: string, expectedValue: number) {
    this.rows().should(rows => {
      expect(this.cellTextOfType(rows, typeName, `[data-cy="${totalSelector}"]`, 0)).to.eq(`${expectedValue}`)
    })
  }

  protected cellTextOfType(rows: JQuery<HTMLElement>, typeName: string, cellSelector: string, index: number): string {
    const row = this.rowOfType(rows, typeName)

    return row.querySelectorAll(cellSelector)[index].textContent!.trim()
  }

  protected rowOfType(rows: JQuery<HTMLElement>, typeName: string): HTMLElement {
    const row = [...rows].find(r => r.querySelector('[data-cy="pokemon-type"]')?.textContent?.trim() === typeName)

    expect(row, `row for type ${typeName}`).to.not.equal(undefined)

    return row!
  }

  protected cellForPokemonRow(rows: JQuery<HTMLElement>, pokemonName: string, cellIndex: number): string {
    const row = [...rows].find(r => r.querySelector('[data-cy="pokemon-image-small"] img')?.getAttribute("alt") === pokemonName)

    expect(row, `row for ${pokemonName}`).to.not.equal(undefined)

    return row!.querySelectorAll('[data-cy="effectiveness-cell"]')[cellIndex].textContent!.trim()
  }

  protected pokemonRowsAre(pokemonNames: string[]) {
    this.rows().should(rows => {
      const names = [...rows].map(r => r.querySelector('[data-cy="pokemon-image-small"] img')!.getAttribute("alt"))

      expect(names).to.deep.eq(pokemonNames)
    })
  }

  protected toggleIsVisible(selector: string) {
    cy.get(`[data-cy="${selector}"]`).should("be.visible")
  }

  protected toggleIsHidden(selector: string) {
    cy.get(`[data-cy="${selector}"]`).should("not.exist")
  }

  protected clickToggle(selector: string) {
    cy.get(`[data-cy="${selector}"]`).click()
  }
}
