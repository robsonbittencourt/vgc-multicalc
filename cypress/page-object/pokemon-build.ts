import { ImportModal } from "./import-modal"

export class PokemonBuild {
  constructor(private selector: string) {}

  selectPokemon(pokemonName: string): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').click({ force: true })
    this.scrollAndSearch(pokemonName)

    return this
  }

  selectPokemonByFilter(filter: string, pokemonName: string): PokemonBuild {
    this.inputPokemonName(filter)
    cy.get(`[data-cy="table-entry-${pokemonName}"]`).click({ force: true })

    return this
  }

  inputPokemonName(filter: string): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').click({ force: true }).type(filter)
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
    this.container().find('[data-cy="pokemon-attack-1"] input').click()
    this.scrollAndSearch(attackName)
    return this
  }

  changeAttackOneByFilter(filter: string, attackName: string): PokemonBuild {
    return this.changeAttackByFilter(filter, attackName, 1)
  }

  changeAttackTwoByFilter(filter: string, attackName: string): PokemonBuild {
    return this.changeAttackByFilter(filter, attackName, 2)
  }

  changeAttackThreeByFilter(filter: string, attackName: string): PokemonBuild {
    return this.changeAttackByFilter(filter, attackName, 3)
  }

  changeAttackFourByFilter(filter: string, attackName: string): PokemonBuild {
    return this.changeAttackByFilter(filter, attackName, 4)
  }

  private changeAttackByFilter(filter: string, attackName: string, position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().type(filter)
    cy.get(`[data-cy="table-entry-${attackName}"]`).click({ force: true })
    return this
  }

  inputPokemonAttackOne(filter: string): PokemonBuild {
    return this.inputPokemonMove(filter, 1)
  }

  inputPokemonAttackTwo(filter: string): PokemonBuild {
    return this.inputPokemonMove(filter, 2)
  }

  inputPokemonAttackThree(filter: string): PokemonBuild {
    return this.inputPokemonMove(filter, 3)
  }

  inputPokemonAttackFour(filter: string): PokemonBuild {
    return this.inputPokemonMove(filter, 4)
  }

  private inputPokemonMove(filter: string, position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().type(filter)
    return this
  }

  selectItem(itemName: string): PokemonBuild {
    this.closeTable()
    this.container().find('[data-cy="item"] input').click()
    this.scrollAndSearch(itemName)
    return this
  }

  selectItemByFilter(filter: string, itemName: string): PokemonBuild {
    this.container().find('[data-cy="item"] input').click().type(filter)
    cy.get(`[data-cy="table-entry-${itemName}"]`).click({ force: true })
    return this
  }

  inputPokemonItem(filter: string): PokemonBuild {
    this.container().find('[data-cy="item"] input').click({ force: true }).type(filter)
    return this
  }

  selectStatsModifier(stat: string, modifier: string): PokemonBuild {
    this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modifier"]').click().get("mat-option").contains(modifier).scrollIntoView().click()
    return this
  }

  terastalyze(): PokemonBuild {
    this.container().find('[data-cy="terastal-button"]').click({ force: true })
    return this
  }

  isTerastalyzed(): PokemonBuild {
    this.container().find('[data-cy="terastal-button"]').find('[data-cy="terastal-activated"]').should("exist")
    return this
  }

  isNotTerastalyzed(): PokemonBuild {
    this.container().find('[data-cy="terastal-button"]').find('[data-cy="terastal-deactivated"]').should("exist")
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
    this.container().find('[data-cy="ability"] input').click()
    cy.get(`[data-cy="table-entry-${name}"]`).click()
    return this
  }

  selectAbilityByFilter(filter: string, abilityName: string): PokemonBuild {
    this.container().find('[data-cy="ability"] input').click().type(filter)
    cy.get(`[data-cy="table-entry-${abilityName}"]`).click({ force: true })
    return this
  }

  inputPokemonAbility(filter: string): PokemonBuild {
    this.container().find('[data-cy="ability"] input').click({ force: true }).type(filter)
    return this
  }

  activateAbility() {
    this.container().find('[data-cy="activate-ability"] input').click({ force: true })
  }

  activateCommander() {
    this.container().find('[data-cy="commander"]').click({ force: true })
  }

  commanderNotActivated() {
    this.closeTable()
    this.container().find('[data-cy="commander-deactivated"]')
  }

  nameIs(pokemonName: string) {
    this.container().find('[data-cy="pokemon-select"] input').invoke("val").should("eq", `${pokemonName}`)
  }

  abilityIs(abilityName: string) {
    this.container().find('[data-cy="ability"] input').invoke("val").should("eq", `${abilityName}`)
  }

  itemIs(itemName: string) {
    this.container().find('[data-cy="item"] input').invoke("val").should("eq", `${itemName}`)
  }

  itemIsDisabled() {
    this.container().find('[data-cy="item"] input').should("be.disabled")
  }

  teraIsDisabled() {
    this.container().find('[data-cy="tera-type"]').find('[data-cy="input-select"]').should("have.attr", "aria-disabled", "true")
  }

  selectTeraType(teraType: string): PokemonBuild {
    this.container().find('[data-cy="tera-type"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(teraType).click()
    return this
  }

  evsIs(hp: number, atk: number, def: number, spa: number, spd: number, spe: number) {
    cy.get(`[data-cy="stat-hp"]`).find('[data-cy="ev-value"]').should("have.value", hp)
    cy.get(`[data-cy="stat-atk"]`).find('[data-cy="ev-value"]').should("have.value", atk)
    cy.get(`[data-cy="stat-def"]`).find('[data-cy="ev-value"]').should("have.value", def)
    cy.get(`[data-cy="stat-spa"]`).find('[data-cy="ev-value"]').should("have.value", spa)
    cy.get(`[data-cy="stat-spd"]`).find('[data-cy="ev-value"]').should("have.value", spd)
    cy.get(`[data-cy="stat-spe"]`).find('[data-cy="ev-value"]').should("have.value", spe)
  }

  boostsIs(atk: number, def: number, spa: number, spd: number, spe: number) {
    this.closeTable()
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
    this.closeTable()
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
    this.closeTable()
    this.container().find('[data-cy="import-pokemon"]').click({ force: true })
    new ImportModal().import(pokemonData)

    return this
  }

  clearEvs() {
    this.container().find('[data-cy="clear-evs"]').click({ force: true })
  }

  delete(): PokemonBuild {
    cy.get('[data-cy="delete-team-button"]').click({ force: true })
    return this
  }

  closeTable() {
    cy.get("body").type("{esc}")
  }

  statModifiedIs(stat: string, statValue: string) {
    this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modified"]').contains(statValue)
  }

  private container() {
    return cy.get(`[data-cy="${this.selector}"]`)
  }

  private scrollAndSearch(pokemonName: string) {
    const firstLetter = pokemonName[0].toLowerCase()
    const firstAlphabetHalf = "abcdefghijklm"

    if (firstAlphabetHalf.includes(firstLetter)) {
      cy.get('[data-cy="table-header-Name"]').click()
    } else {
      cy.get('[data-cy="table-header-Name"]').dblclick()
    }

    let currentOffset = 0
    const scrollStep = 220

    function tryScroll() {
      const $el = Cypress.$(`[data-cy="table-entry-${pokemonName}"]`)

      if ($el.length) {
        cy.wrap($el).click()
      } else {
        currentOffset += scrollStep

        cy.get("[data-cy='scroll-viewport']")
          .scrollTo(0, currentOffset)
          .wait(10)
          .then(() => tryScroll())
      }
    }

    cy.get("[data-cy='scroll-viewport']").scrollTo(0, currentOffset)
    tryScroll()
  }
}
