import { ImportModal } from "./import-modal"

export class PokemonBuild {
  constructor(private selector: string) {}

  selectPokémon(pokemonName: string): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').clear().type(pokemonName, { force: true }).type("{downArrow}").type("{enter}")
    return this
  }

  selectAttackOne(): PokemonBuild {
    this.container().find('[data-cy="attack1"] input').click({ force: true })
    return this
  }

  selectAttackTwo(): PokemonBuild {
    this.container().find('[data-cy="attack2"] input').click({ force: true })
    return this
  }

  selectAttackThree(): PokemonBuild {
    this.container().find('[data-cy="attack3"] input').click({ force: true })
    return this
  }

  selectAttackFour(): PokemonBuild {
    this.container().find('[data-cy="attack4"] input').click({ force: true })
    return this
  }

  changeAttackOne(attackName: string): PokemonBuild {
    cy.get('[data-cy="pokemon-attack-1"] input').type(attackName, { force: true }).type("{downArrow}").type("{enter}")
    return this
  }

  selectItem(itemName: string): PokemonBuild {
    this.container().find('[data-cy="item"] input').type(itemName, { force: true }).type("{downArrow}").type("{enter}")
    return this
  }

  selectStatsModifier(stat: string, modifier: string): PokemonBuild {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click({ force: true }).get("mat-option").contains(modifier).click({ force: true })
    return this
  }

  terastalyze(): PokemonBuild {
    this.container().find('[data-cy="terastal-button"]').click({ force: true })
    return this
  }

  burned() {
    this.container().get('[data-cy="pokemon-status"]').click().get("mat-option").contains("Burn").click()
  }

  paralyzed() {
    this.container().get('[data-cy="pokemon-status"]').click().get("mat-option").contains("Paralysis").click()
  }

  poisoned() {
    this.container().get('[data-cy="pokemon-status"]').click().get("mat-option").contains("Poison").click()
  }

  selectNature(name: string): PokemonBuild {
    this.container().find('[data-cy="nature"]').click().get("mat-option").contains(name).click()
    return this
  }

  selectAbility(name: string): PokemonBuild {
    this.container().find('[data-cy="ability"]').click().get("mat-option").contains(name).click()
    return this
  }

  activateAbility() {
    this.container().find('[data-cy="activate-ability"] input').click({ force: true })
  }

  activateCommander() {
    this.container().find('[data-cy="commander"]').click({ force: true })
  }

  commanderNotActivated() {
    this.container().find('[data-cy="commander-deactivated"]')
  }

  boostsIs(atk: number, def: number, spa: number, spd: number, spe: number) {
    this.verifyBoostIs("atk", atk)
    this.verifyBoostIs("def", def)
    this.verifyBoostIs("spa", spa)
    this.verifyBoostIs("spd", spd)
    this.verifyBoostIs("spe", spe)
  }

  private verifyBoostIs(stat: string, statValue: number) {
    const adjustedStatValue = this.adjustedBoostStat(statValue)
    this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').contains(adjustedStatValue)
  }

  private adjustedBoostStat(stat: number): string {
    return stat == 0 ? "-" : `${stat}`
  }

  hpPercentage(hpPercentage: number) {
    this.container().find(`[data-cy="stat-hp"]`).find('[data-cy="hp-percentage-value"]').clear().clear().type(hpPercentage.toString(), { force: true })
  }

  hpPercentageIs(hpPercentage: number) {
    this.container().find(`[data-cy="stat-hp"]`).find('[data-cy="hp-percentage-value"]').invoke("val").should("eq", `${hpPercentage}`)
  }

  hpEvs(hpEvs: number): PokemonBuild {
    this.container().find(`[data-cy="stat-hp"]`).find('[data-cy="ev-value"]').clear().clear().type(hpEvs.toString(), { force: true }).blur()
    return this
  }

  speedEvs(speedEvs: number): PokemonBuild {
    this.container().find(`[data-cy="stat-spe"]`).find('[data-cy="ev-value"]').clear().clear().type(speedEvs.toString(), { force: true }).blur()
    return this
  }

  speedIvs(speedIvs: number) {
    this.container().find(`[data-cy="stat-spe"]`).find('[data-cy="iv-value"]').clear().clear().type(speedIvs.toString(), { force: true }).blur()
  }

  allieFainted(alliesFainted: number) {
    this.container().find(`[data-cy="allies-fainted"]`).click().get("mat-option").contains(alliesFainted.toString()).click()
  }

  hitsTaken(hitsTaken: number) {
    this.container().find(`[data-cy="hits-taken"]`).click().get("mat-option").contains(hitsTaken.toString()).click()
  }

  importPokemon(pokemonData: string): PokemonBuild {
    this.container().find('[data-cy="import-pokemon"]').click({ force: true })
    new ImportModal().import(pokemonData)

    return this
  }

  private container() {
    return cy.get(`[data-cy="${this.selector}"]`)
  }
}
