export class KoColumnsMobile {
  useDenseView(): this {
    cy.get('[data-cy="multi-calc-view-dense"]').click({ force: true })
    cy.get('[data-cy="ko-columns"]').should("exist")

    return this
  }

  tapPokemon(pokemonName: string): this {
    this.pokemon(pokemonName).click({ force: true })

    return this
  }

  holdPokemon(pokemonName: string): this {
    this.pokemon(pokemonName).trigger("touchstart", { force: true, touches: [{ clientX: 60, clientY: 120 }] })

    this.infoSheetIsVisible()

    this.pokemon(pokemonName).trigger("touchend", { force: true })

    return this
  }

  infoSheetIsVisible() {
    cy.get('[data-cy="ko-pokemon-info"]').should("be.visible")
  }

  infoSheetIsHidden() {
    cy.get('[data-cy="ko-pokemon-info"]').should("not.exist")
  }

  editFromInfoSheet(): this {
    cy.get('[data-cy="ko-pokemon-edit"]').click({ force: true })

    return this
  }

  private pokemon(pokemonName: string) {
    return cy.get(`[data-cy="ko-pokemon-${pokemonName}"]`).first()
  }
}
