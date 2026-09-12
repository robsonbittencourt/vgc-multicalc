import { ExportModal } from "./export-modal"
import { ImportModal } from "./import-modal"
import { OpponentPokemon } from "./opponent-pokemon"
import { PokemonBuild } from "./pokemon-build"

export class Opponent {
  get(pokemonName: string): OpponentPokemon {
    return new OpponentPokemon(pokemonName)
  }

  selectAttacker(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-attacker-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  selectSecondAttacker(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-second-attacker-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  selectDefender(pokemonName: string): PokemonBuild {
    cy.get(`[data-cy="select-defender-${pokemonName}"]`).click({ force: true })
    return new PokemonBuild("your-team")
  }

  add(pokemonName: string): PokemonBuild {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
    const pokemonBuild = new PokemonBuild("your-team")
    pokemonBuild.selectPokemon(pokemonName)
    return new PokemonBuild("your-team")
  }

  clickOnAdd() {
    cy.get('[data-cy="add-opponent-pokemon"]').click({ force: true })
  }

  addIsVisible() {
    cy.get('[data-cy="add-opponent-pokemon"]').should("exist")
  }

  exists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should("exist")
  }

  doesNotExists(pokemonName: string) {
    cy.get(`[data-cy="pokemon-card-${pokemonName}"]`).should("not.exist")
  }

  empty() {
    cy.get(`[data-cy^="pokemon-card"]`).should("not.exist")
  }

  deleteAll() {
    cy.get('[data-cy="delete-opponent-pokemon-button"]').click({ force: true })
  }

  addMeta() {
    cy.get('[data-cy="add-meta-button"]').click({ force: true })
  }

  importPokemon(pokemonData: string, useEvs = true) {
    cy.get('[data-cy="opponent-widget"]').find('[data-cy="import-pokemon"]').click()
    new ImportModal().import(pokemonData, useEvs)
  }

  importPokepaste(pokepaste: string, useEvs = true) {
    cy.get('[data-cy="import-pokepaste-to-team"]').click({ force: true })
    new ImportModal().import(pokepaste, useEvs)
  }

  export(): ExportModal {
    cy.get('[data-cy="export-opponent-pokemon-button"]').click({ force: true })
    return new ExportModal()
  }

  combine(sourcePokemonName: string, targetPokemonName: string) {
    const handleSelector = `[data-cy="move-card-${sourcePokemonName}"]`
    const targetSelector = `[data-cy="pokemon-card-${targetPokemonName}"]`

    cy.get("body").then($body => {
      const isMobile = $body.find('[data-cy="scrollable-content"]').length > 0

      if (isMobile) {
        this.combineOnMobile(handleSelector, targetSelector)

        return
      }

      cy.get(handleSelector).realMouseDown({ button: "left", position: "center" }).realMouseMove(0, 10, { position: "center" })
      cy.get(targetSelector).realMouseMove(0, 0, { position: "center" }).realHover().realMouseUp().wait(600)
    })
  }

  private combineOnMobile(handleSelector: string, targetSelector: string) {
    cy.get(handleSelector).scrollIntoView({ offset: { top: -200, left: 0 } })
    cy.wait(300)

    cy.get(handleSelector).realMouseDown({ button: "left", position: "center", scrollBehavior: false })
    cy.get(handleSelector).realMouseMove(0, 15, { position: "center", scrollBehavior: false })
    cy.get(handleSelector).realMouseMove(0, 30, { position: "center", scrollBehavior: false })

    cy.get(".cdk-drag-preview").should("exist")

    this.scrollMobileTargetIntoView(targetSelector)

    cy.get(targetSelector).then($target => {
      const target = $target[0].getBoundingClientRect()
      const headerBottom = Cypress.$("app-header-mobile")[0]?.getBoundingClientRect().bottom ?? 0
      const x = Math.round(target.left + target.width / 2)
      const y = Math.round(Math.max(target.top + 10, headerBottom + 10))

      cy.get("body").realMouseMove(x, y, { position: "topLeft", scrollBehavior: false }).realMouseUp().wait(600)
    })
  }

  private scrollMobileTargetIntoView(targetSelector: string) {
    cy.get(targetSelector).then($target => {
      const scroller = Cypress.$('[data-cy="scrollable-content"]')[0]
      const targetRect = $target[0].getBoundingClientRect()
      const scrollerRect = scroller.getBoundingClientRect()
      const isVisible = targetRect.top >= scrollerRect.top + 80 && targetRect.bottom <= scrollerRect.bottom

      if (isVisible) return

      scroller.scrollTop += targetRect.top - scrollerRect.top - 200
    })

    cy.wait(400)
  }

  dragShort(sourcePokemonName: string, pixels: number) {
    cy.get(`[data-cy="move-card-${sourcePokemonName}"]`).realMouseDown({ button: "left", position: "center" }).realMouseMove(0, 10, { position: "center" })
    cy.get(`[data-cy="move-card-${sourcePokemonName}"]`).realMouseMove(0, pixels, { position: "center" }).realMouseUp().wait(600)
  }

  combineHandleIsVisible(pokemonName: string) {
    cy.get(`[data-cy="move-card-${pokemonName}"]`).should("exist")
  }

  combineHandleIsHidden(pokemonName: string) {
    cy.get(`[data-cy="move-card-${pokemonName}"]`).should("not.exist")
  }

  separate(targetPokemonName: string) {
    cy.get(`[data-cy="separate-opponent-${targetPokemonName}"]`).click()
  }

  lengthIs(length: number) {
    cy.get('[data-cy^="select-defender-"]').should("have.length", length)
  }

  filterBySet(setLabel: string) {
    cy.get('[data-cy="set-filter"]').find("input").click({ force: true }).type(setLabel)
    cy.get("mat-option").contains(setLabel).click({ force: true })
  }

  setFilterOptions(text: string): Cypress.Chainable {
    cy.get('[data-cy="set-filter"]').find("input").click({ force: true }).type(text)
    return cy.get("mat-option")
  }

  typeSetFilter(text: string) {
    cy.get('[data-cy="set-filter"]').find("input").click({ force: true }).type(text)
  }

  clearSetFilter() {
    cy.get('[data-cy="set-filter"]').find("mat-icon").click({ force: true })
  }

  filterByTeam(teamName: string) {
    cy.get('[data-cy="team-filter"]').find("input").click({ force: true }).type(teamName)
    cy.get("mat-option").contains(teamName).click({ force: true })
  }

  clearTeamFilter() {
    cy.get('[data-cy="team-filter"]').find("mat-icon").click({ force: true })
  }

  teamFilterOptions(): Cypress.Chainable {
    cy.get('[data-cy="team-filter"]').find("input").click({ force: true })
    return cy.get("mat-option")
  }

  toggleOrderByDamage() {
    cy.get("mat-slide-toggle").contains("Order by Damage").click({ force: true })
  }

  toggleBestMove() {
    cy.get("mat-slide-toggle").contains("Best Move").click({ force: true })
  }

  cardOrderIs(pokemonNames: string[]) {
    cy.get('[data-cy^="pokemon-card-"]').should($cards => {
      const names = [...$cards].map(card => card.getAttribute("data-cy")!.replace("pokemon-card-", ""))

      expect(names).to.deep.eq(pokemonNames)
    })
  }

  cardOrderStartsWith(pokemonName: string) {
    cy.get('[data-cy^="pokemon-card-"]').first().should("have.attr", "data-cy", `pokemon-card-${pokemonName}`)
  }

  noRegulationDialogIsShown() {
    cy.get("mat-dialog-container").should("not.exist")
  }

  metaButtonLabelIs(label: string) {
    cy.get('[data-cy="add-meta-button"]').should("have.text", label)
  }

  removeMeta() {
    cy.get('[data-cy="add-meta-button"]').click({ force: true })
  }

  exportCalcs(): ExportModal {
    cy.get('[data-cy="export-calcs-button"]').click({ force: true })
    return new ExportModal()
  }

  filterByPokemon(pokemonName: string) {
    cy.get('[data-cy="pokemon-filter"]').find("input").click({ force: true }).type(pokemonName)
    cy.get("mat-option").contains(pokemonName).click({ force: true })
  }

  clearPokemonFilter() {
    cy.get('[data-cy="pokemon-filter"]').find("mat-icon").click({ force: true })
  }

  filterIsDisabled(filterName: string) {
    cy.get(`[data-cy="${filterName}-filter"]`).find("input").should("be.disabled")
  }

  applyPhysicalBoost(modifier: string) {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="opponent-physical-boost"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(modifier).click()
    cy.get("mat-option").should("not.exist")
  }

  applySpecialBoost(modifier: string) {
    cy.get("mat-option").should("not.exist")
    cy.get('[data-cy="opponent-special-boost"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(modifier).click()
    cy.get("mat-option").should("not.exist")
  }

  physicalBoostLabelIs(label: string) {
    cy.get('[data-cy="opponent-physical-boost"]').find("label").should("have.text", label)
  }

  specialBoostLabelIs(label: string) {
    cy.get('[data-cy="opponent-special-boost"]').find("label").should("have.text", label)
  }

  physicalBoostSelectionIs(modifier: string) {
    cy.get('[data-cy="opponent-physical-boost"]').find('[data-cy="input-select"]').should("have.text", modifier)
  }

  specialBoostSelectionIs(modifier: string) {
    cy.get('[data-cy="opponent-special-boost"]').find('[data-cy="input-select"]').should("have.text", modifier)
  }

  filterIsEnabled(filterName: string) {
    cy.get(`[data-cy="${filterName}-filter"]`).find("input").should("not.be.disabled")
  }

  addIsHidden() {
    cy.get('[data-cy="add-opponent-pokemon"]').should("not.exist")
  }

  isShowingAttackers() {
    cy.get('[data-cy="opponent-widget"]').should("contain.text", "Opponent Attackers")
  }

  isShowingDefenders() {
    cy.get('[data-cy="opponent-widget"]').should("contain.text", "Opponent Defenders")
  }

  selectRollLevel(level: "low" | "medium" | "high") {
    cy.get('[data-cy="opponent-widget"]').find(`[data-cy="${level}-roll"] button`).click({ force: true })
  }

  rollLevelIs(level: "low" | "medium" | "high") {
    cy.get('[data-cy="opponent-widget"]').find(`[data-cy="${level}-roll"]`).should("have.class", "mat-button-toggle-checked")
  }
}
