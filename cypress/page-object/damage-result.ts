export class DamageResult {
  constructor(private selector: string) {}

  damageIs(position: number, minPercentage: number, maxPercentage: number, minRoll: number, maxRoll: number) {
    const moves = this.baseElement().find('[data-cy="moves"]').find('[data-cy="move-damage"]').eq(position)
    moves.contains(`${minPercentage} - ${maxPercentage}%`)

    const description = this.baseElement().find('[data-cy="move-damage-description"]')
    description.contains(`${minPercentage} - ${maxPercentage}`)

    const rolls = this.baseElement().find('[data-cy="damage-rolls"]')

    if (minRoll == 0 && maxRoll == 0) {
      rolls.should("contains.text", `${minRoll}`)
    } else {
      rolls.should("contains.text", `${minRoll}`)
      rolls.should("contains.text", `${maxRoll}`)
    }
  }

  isFainted() {
    this.baseElement().find('[data-cy="fainted-badge"]')
  }

  withHighRoll() {
    this.baseElement().find('[data-cy="high-roll"]').click()
  }

  withMediumRoll() {
    this.baseElement().find('[data-cy="medium-roll"]').click()
  }

  withLowRoll() {
    this.baseElement().find('[data-cy="low-roll"]').click()
  }

  surviveWithThisHpAmmount(hp: number) {
    this.baseElement().find('[data-cy="hp-value"]').contains(`${hp}/`)
  }

  withMaxHpValue(hp: number) {
    this.baseElement().find('[data-cy="hp-value"]').contains(`/${hp}`)
  }

  withPokemonIcon(iconName: string) {
    this.baseElement().find(`[src="assets/sprites/items/${iconName}.png"]`)
  }

  causeOHKO() {
    this.baseElement().contains("guaranteed OHKO")
    return this
  }

  cause2HKO() {
    this.baseElement().contains("guaranteed 2HKO")
    return this
  }

  cause3HKO() {
    this.baseElement().contains("guaranteed 3HKO")
    return this
  }

  cause4HKO() {
    this.baseElement().contains("guaranteed 4HKO")
    return this
  }

  haveChanceOfToCauseOHKO(chance: number) {
    this.baseElement().contains(`${chance}% chance to OHKO`)
    return this
  }

  haveChanceOfToCause2HKO(chance: number) {
    this.baseElement().contains(`${chance}% chance to 2HKO`)
    return this
  }

  haveChanceOfToCause3HKO(chance: number) {
    this.baseElement().contains(`${chance}% chance to 3HKO`)
    return this
  }

  haveChanceOfToCause4HKO(chance: number) {
    this.baseElement().contains(`${chance}% chance to 4HKO`)
    return this
  }

  baseElement(): any {
    return cy.get(`[data-cy="${this.selector}"]`)
  }
}
