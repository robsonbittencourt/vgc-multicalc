import { ImportModal } from "./import-modal"

export class PokemonBuild {
  constructor(private selector: string) {}

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
    cy.get('[data-cy="pokemon-status"] input').type("Burn", { force: true }).type("{downArrow}").type("{enter}")
  }

  paralyzed() {
    cy.get('[data-cy="pokemon-status"] input').type("Paralysis", { force: true }).type("{downArrow}").type("{enter}")
  }

  poisoned() {
    cy.get('[data-cy="pokemon-status"] input').type("Poison", { force: true }).type("{downArrow}").type("{enter}")
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

  activateBoosterEnergy() {
    this.container().find('[data-cy="booster-energy"]').click({ force: true })
  }

  activateCommander() {
    this.container().find('[data-cy="commander"]').click({ force: true })
  }

  hpPercentage(hpPercentage: number) {
    this.container().find(`[data-cy="stat-hp"]`).find('[data-cy="hp-percentage-value"]').clear().clear().type(hpPercentage.toString(), { force: true })
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
