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
    this.baseElement().find('[data-cy="high-roll"] button').click({ force: true })
  }

  withMediumRoll() {
    this.baseElement().find('[data-cy="medium-roll"] button').click({ force: true })
  }

  withLowRoll() {
    this.baseElement().find('[data-cy="low-roll"] button').click({ force: true })
  }

  surviveWithThisHpAmmount(hp: number) {
    this.baseElement().find('[data-cy="hp-value"] text').first().should("contain.text", `${hp}`)
  }

  withMaxHpValue(hp: number) {
    this.baseElement().find('[data-cy="hp-value"] text').last().should("contain.text", `/${hp}`)
  }

  withPokemonIcon(iconName: string) {
    this.baseElement().find(`[src="assets/sprites/items/${iconName}.webp"]`)
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

  afterLeechSeedRecovery() {
    this.baseElement().contains("Leech Seed recovery")
    return this
  }

  afterLeechSeedDamage() {
    this.baseElement().contains("Leech Seed damage")
    return this
  }

  moveChipIsDisabled(position: number) {
    this.baseElement()
      .find('[data-cy="moves"] mat-chip-option')
      .eq(position - 1)
      .should("have.class", "mat-mdc-chip-disabled")
    return this
  }

  rollsHaveHits(hits: number) {
    this.baseElement().find('[data-cy="damage-rolls"]').should("contain.text", `( ${hits} hits )`)
    return this
  }

  highlightedRollIs(position: number) {
    this.baseElement().find('[data-cy="damage-rolls"] span.roll-highlight').should("have.length", 1)
    this.baseElement()
      .find('[data-cy="damage-rolls"] span')
      .eq((position - 1) * 2)
      .should("have.class", "roll-highlight")
    return this
  }

  rollLevelIs(level: "low" | "medium" | "high") {
    this.baseElement().find(`[data-cy="${level}-roll"]`).should("have.class", "mat-button-toggle-checked")
    return this
  }

  hpBarColorIs(color: "green" | "yellow" | "red") {
    const gradients = { green: "hpGreen", yellow: "hpYellow", red: "hpRed" }
    this.baseElement().find('[data-cy="hp-bar"]').should("have.attr", "fill").and("contain", gradients[color])
    return this
  }

  hpBarIsEmpty() {
    this.baseElement().find('[data-cy="hp-bar"]').should("have.attr", "d", "M 166,105 L 166,105 L 154,141 L 154,141 Z")
    return this
  }

  remainingHpIsZero() {
    this.baseElement()
      .find('[data-cy="hp-value"] text')
      .first()
      .should(($el: JQuery<HTMLElement>) => expect($el.text().trim()).to.equal("0"))
    return this
  }

  hasStatusIcon() {
    this.baseElement().find("[app-champions-status-icon]").should("exist")
    return this
  }

  copyDescription() {
    this.baseElement().find("app-copy-button .copy-button").click({ force: true })
    return this
  }

  copyWasConfirmed() {
    this.baseElement().find("app-copy-button mat-icon").should("contain.text", "check")
    return this
  }

  descriptionContains(text: string) {
    this.baseElement().find('[data-cy="move-damage-description"]').should("contain.text", text)
    return this
  }

  descriptionNotContains(text: string) {
    this.baseElement().find('[data-cy="move-damage-description"]').should("not.contain.text", text)
    return this
  }

  baseElement(): any {
    return cy.get(`[data-cy="${this.selector}"]`)
  }
}
