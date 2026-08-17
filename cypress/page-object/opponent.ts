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
    cy.get(`[data-cy="move-card-${sourcePokemonName}"]`).realMouseDown({ button: "left", position: "center" }).realMouseMove(0, 10, { position: "center" })
    cy.get(`[data-cy="pokemon-card-${targetPokemonName}"]`).realMouseMove(0, 0, { position: "center" }).realHover().realMouseUp().wait(600)
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

  bestMoveToggleIsHidden() {
    cy.get("mat-slide-toggle:contains('Best Move')").should("not.exist")
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
