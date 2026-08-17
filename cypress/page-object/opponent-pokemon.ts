export class OpponentPokemon {
  private pokemonName: string

  constructor(pokemonName: string) {
    this.pokemonName = pokemonName
  }

  private get _element(): any {
    return cy.get(`[data-cy="pokemon-card-${this.pokemonName}"]`)
  }

  terastalyze(): OpponentPokemon {
    this._element.find(`[data-cy="terastal-button"]`).click({ force: true })
    return this
  }

  hasStatusIconsRow(): OpponentPokemon {
    this._element.find(".status-icons").should("exist")
    return this
  }

  hasNoStatusIconsRow(): OpponentPokemon {
    this._element.find(".status-icons").should("not.exist")
    return this
  }

  commanderIsActivated(): OpponentPokemon {
    this._element.find('[data-cy="commander-activated"]').should("exist")
    return this
  }

  activateCommander(): OpponentPokemon {
    this._element.find('[data-cy="commander"]').click({ force: true })
    return this
  }

  toggleMega(): OpponentPokemon {
    this._element.find(".mega-icon-button").click({ force: true })
    return this
  }

  megaIconIsVisible(): OpponentPokemon {
    this._element.find(".mega-icon").should("exist")
    return this
  }

  megaIsActive(): OpponentPokemon {
    this._element.find(".mega-icon").should("have.class", "mega-active")
    return this
  }

  megaIsNotActive(): OpponentPokemon {
    this._element.find(".mega-icon").should("not.have.class", "mega-active")
    return this
  }

  doesNotCauseAnyDamage() {
    this.contains(`0 - 0%`)
    this.contains(`possibly the worst move ever`)
  }

  setLabelIs(setName: string): OpponentPokemon {
    this._element.find('[data-cy="custom-set-label"]').should("have.text", `Set: ${setName}`)
    return this
  }

  hasNoSetLabel(): OpponentPokemon {
    this._element.find('[data-cy="custom-set-label"]').should("not.exist")
    return this
  }

  damageIs(min: number, max: number): OpponentPokemon {
    this.contains(`${min} - ${max}%`)
    return this
  }

  causeOHKO(): OpponentPokemon {
    this.contains("guaranteed OHKO")
    return this
  }

  cause2HKO(): OpponentPokemon {
    this.contains("guaranteed 2HKO")
    return this
  }

  cause3HKO(): OpponentPokemon {
    this.contains("guaranteed 3HKO")
    return this
  }

  cause4HKO(): OpponentPokemon {
    this.contains("guaranteed 4HKO")
    return this
  }

  afterLeechSeedRecovery(): OpponentPokemon {
    this.contains("Leech Seed recovery")
    return this
  }

  afterLeechSeedDamage(): OpponentPokemon {
    this.contains("Leech Seed damage")
    return this
  }

  haveChanceOfToCauseOHKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to OHKO`)
    return this
  }

  haveChanceOfToCause2HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 2HKO`)
    return this
  }

  haveChanceOfToCause3HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 3HKO`)
    return this
  }

  haveChanceOfToCause4HKO(chance: number): OpponentPokemon {
    this.contains(`${chance}% chance to 4HKO`)
    return this
  }

  descriptionContains(text: string): OpponentPokemon {
    this.contains(text)
    return this
  }

  attackerSpritesAre(pokemonNames: string[]): OpponentPokemon {
    this._element.find(".left-pokemon app-pokemon-sprite img").should(($sprites: JQuery<HTMLElement>) => {
      const names = [...$sprites].map(sprite => sprite.getAttribute("alt"))

      expect(names).to.deep.eq(pokemonNames)
    })
    return this
  }

  descriptionDoesNotContain(text: string): OpponentPokemon {
    this._element.parent().find(".damage-result").should("not.contain.text", text)
    return this
  }

  delete() {
    this._element.find(`[data-cy="delete-opponent-pokemon"]`).click({ force: true })
  }

  private contains(text: string) {
    this._element.parent().contains(text)
  }
}
