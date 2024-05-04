export class PokemonCard {

  private _card: any
  
  constructor(card: any) {
    this._card = card
  }

  select() {
    this._card.click()
  }

  selectAttackOne(): PokemonCard {
    cy.get('[data-cy="attack1"]').click()
    return this
  }

  selectAttackTwo(): PokemonCard {
    cy.get('[data-cy="attack2"]').click()
    return this
  }

  selectStatsModifier(stat: string, modifier: string): PokemonCard {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click().get('mat-option').contains(modifier).click()
    return this
  }

  terastalyze(): PokemonCard {
    this._card.parent().parent().parent().parent().find('.icon-tera').click()
    return this
  }

  doesNotCauseAnyDamage() {
    this.contains(`Damage: 0 - 0%`)
    this.contains(`Does not cause any damage`)
  }

  damageIs(min: number, max: number): PokemonCard {
    this.contains(`Damage: ${min} - ${max}%`)
    return this
  }

  causeOHKO(): PokemonCard {
    this.contains("guaranteed OHKO")
    return this
  }

  cause2OHKO(): PokemonCard {
    this.contains("guaranteed 2HKO")
    return this
  }

  haveChanceOfToCauseOHKO(chance: number): PokemonCard {
    this.contains(`${chance}% chance to OHKO`)
    return this
  }

  haveChanceOfToCause2HKO(chance: number): PokemonCard {
    this.contains(`${chance}% chance to 2HKO`)
    return this
  }

  haveChanceOfToCause3HKO(chance: number): PokemonCard {
    this.contains(`${chance}% chance to 3HKO`)
    return this
  }

  haveChanceOfToCause4HKO(chance: number): PokemonCard {
    this.contains(`${chance}% chance to 4HKO`)
    return this
  }

  possible7HKO(): PokemonCard {
    this.contains("possible 7HKO")
    return this
  }

  possible8HKO(): PokemonCard {
    this.contains("possible 8HKO")
    return this
  }
  
  private contains(text: string) {
    this._card.parent().parent().parent().contains(text)
  }

}