export class DamageResult {
  constructor(private selector: string) {}

  damageIs(position: number, minPercentage: number, maxPercentage: number, minRoll: number, maxRoll: number) {
    const moves = this.baseElement().find('[data-cy="moves"]').find('[data-cy="move-damage"]').eq(position)
    moves.contains(`${minPercentage} - ${maxPercentage}%`)

    const description = this.baseElement().find('[data-cy="move-damage-description"]')
    description.contains(`${minPercentage} - ${maxPercentage}`)

    const rolls = this.baseElement().find('[data-cy="damage-rolls"]')

    if (minRoll == 0 && maxRoll == 0) {
      rolls.contains(`${minRoll}`)
    } else {
      rolls.contains(`${minRoll},`)
      rolls.contains(`,${maxRoll}`)
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

  baseElement(): any {
    return cy.get(`[data-cy="${this.selector}"]`)
  }
}
