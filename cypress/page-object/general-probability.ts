export class GeneralProbability {
  cardCountIs(count: number) {
    cy.get('[data-cy="general-probability-card"]').should("have.length", count)
  }

  cardTitlesAre(titles: string[]) {
    cy.get('[data-cy="general-probability-card-title"]').should($titles => {
      const found = [...$titles].map(title => title.textContent!.trim())

      expect(found).to.deep.eq(titles)
    })
  }

  private card(title: string) {
    return cy.get('[data-cy="general-probability-card"]').filter((_, el) => el.querySelector('[data-cy="general-probability-card-title"]')!.textContent!.trim() === title)
  }

  cardHeadersAre(title: string, headers: string[]) {
    this.card(title)
      .find('[data-cy="general-probability-card-header"] .cell')
      .should($cells => {
        const found = [...$cells].map(cell => cell.textContent!.trim())

        expect(found).to.deep.eq(headers)
      })
  }

  cardHasRows(title: string) {
    this.card(title).find(".probability-row").should("have.length.above", 1)
  }

  cardRowIs(title: string, rowIndex: number, cells: string[]) {
    this.card(title)
      .find(".probability-row")
      .eq(rowIndex + 1)
      .should($row => {
        const found = [...$row.find(".cell")].map(cell => cell.textContent!.trim())

        expect(found).to.deep.eq(cells)
      })
  }
}
