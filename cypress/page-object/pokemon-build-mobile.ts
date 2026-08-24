import { BottomNav } from "./bottom-nav"
import { ImportModal } from "./import-modal"

export class PokemonBuildMobile {
  activateLeftPokemon(): PokemonBuildMobile {
    cy.get(".team-tabs .team-tab").eq(0).click({ force: true })
    return this
  }

  activateRightPokemon(): PokemonBuildMobile {
    cy.get(".team-tabs .team-tab").eq(1).click({ force: true })
    return this
  }

  leftPokemonIsActive() {
    cy.get(".team-tabs .team-tab").eq(0).should("have.class", "active-tab")
  }

  rightPokemonIsActive() {
    cy.get(".team-tabs .team-tab").eq(1).should("have.class", "active-tab")
  }

  importPokemon(pokemonData: string, useEvs = true): PokemonBuildMobile {
    cy.get(".attacker-actions").find('[data-cy="import-pokemon"]').click({ force: true })
    new ImportModal().import(pokemonData, useEvs)

    return this
  }

  nameIs(pokemonName: string) {
    cy.get('[data-cy="pokemon-select"]').should("have.value", pokemonName)
  }

  openPokemonTable(): PokemonBuildMobile {
    this.visiblePokemonSelect().click({ force: true })
    return this
  }

  private visiblePokemonSelect() {
    return cy.get('[data-cy="pokemon-select"]:visible').first()
  }

  selectPokemonFromTable(pokemonName: string): PokemonBuildMobile {
    this.visiblePokemonSelect().click({ force: true }).clear().type(pokemonName)
    cy.get(`[data-cy="table-entry-${pokemonName}"]:visible`).first().click({ force: true })

    return this
  }

  selectPokemonFromOpenTable(pokemonName: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-entry-${pokemonName}"]:visible`).first().scrollIntoView().click({ force: true })
    return this
  }

  selectFirstPokemonFromOpenTable(): Cypress.Chainable<string> {
    return cy
      .get(".table-container:visible")
      .find('[data-cy^="table-entry-"]')
      .first()
      .scrollIntoView()
      .invoke("attr", "data-cy")
      .then(attr => {
        const name = String(attr).replace("table-entry-", "")

        return cy
          .get(".table-container:visible")
          .find(`[data-cy="${attr}"]`)
          .first()
          .click({ force: true })
          .then(() => name)
      })
  }

  selectFirstCustomSetFromOpenTable(): PokemonBuildMobile {
    cy.get('[data-cy^="custom-set-row-"]:visible').first().click({ force: true })
    return this
  }

  visibleNameIs(pokemonName: string) {
    cy.get('[data-cy="pokemon-select"]:visible').first().should("have.value", pokemonName)
  }

  customSetRowIsVisible() {
    cy.get('[data-cy^="custom-set-row-"]').should("be.visible")
  }

  closeOpenPokemonTable(): PokemonBuildMobile {
    cy.go("back")
    return this
  }

  pokemonTableIsHidden() {
    cy.get("body").find(".table-container:visible").should("have.length", 0)
  }

  pokemonSearchInputIsVisible() {
    cy.get('[data-cy="pokemon-select"]:visible').should("have.length.at.least", 1)
  }

  closeButtonIsVisible() {
    cy.get('[data-cy="close-pokemon-table"]:visible').should("have.length.at.least", 1)
  }

  pokemonSearchInputIs(value: string) {
    cy.get('[data-cy="pokemon-select"]:visible').first().should("have.value", value)
  }

  buildIsVisible() {
    cy.get("app-pokemon-build-mobile").filter(":visible").should("have.length.at.least", 1)
  }

  pokemonTableIsVisible() {
    cy.get(".table-container").should("be.visible")
  }

  closePokemonTable(): PokemonBuildMobile {
    cy.get(".close-table-button").first().click({ force: true })
    return this
  }

  openItemTable(): PokemonBuildMobile {
    cy.get(".item-mobile-trigger").click({ force: true })
    return this
  }

  selectItemFromTable(itemName: string): PokemonBuildMobile {
    cy.get('[data-cy="item-select"]').click({ force: true }).clear().type(itemName)
    cy.get(`[data-cy="table-entry-${itemName}"]`).click({ force: true })

    return this
  }

  itemIs(itemName: string) {
    cy.get(".item-mobile-trigger").find("mat-select-trigger").should("have.text", itemName)
  }

  openAbilityTable(): PokemonBuildMobile {
    cy.get(".ability-mobile-trigger").click({ force: true })
    return this
  }

  selectAbilityFromTable(abilityName: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-entry-${abilityName}"]`).click({ force: true })
    return this
  }

  abilityIs(abilityName: string) {
    cy.get(".ability-mobile-trigger").find("mat-select-trigger").should("have.text", abilityName)
  }

  editMoves(): PokemonBuildMobile {
    cy.get(".edit-button:visible").first().click({ force: true })
    return this
  }

  closeMoves(): PokemonBuildMobile {
    cy.get(".close-button:visible").first().click({ force: true })
    return this
  }

  searchMove(moveName: string): PokemonBuildMobile {
    cy.get('[data-cy="move-search"]:visible').first().clear().type(moveName)
    return this
  }

  selectMoveFromTable(moveName: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-entry-${moveName}"]:visible`).first().click({ force: true })
    return this
  }

  activateMoveChip(position: number): PokemonBuildMobile {
    cy.get("mat-chip-option")
      .eq(position - 1)
      .click({ force: true })
    return this
  }

  moveChipIsActive(position: number) {
    cy.get("mat-chip-option")
      .eq(position - 1)
      .should("have.class", "mat-mdc-chip-selected")
  }

  moveChipIsNotActive(position: number) {
    cy.get("mat-chip-option")
      .eq(position - 1)
      .should("not.have.class", "mat-mdc-chip-selected")
  }

  moveChipIs(position: number, moveName: string) {
    cy.get("mat-chip-option")
      .eq(position - 1)
      .should("contain.text", moveName)
  }

  movesAreVisible() {
    cy.get("mat-chip-option").should("exist")
  }

  movesAreHidden() {
    cy.get("mat-chip-option").should("not.exist")
  }

  evsAreHidden() {
    cy.get(".evs").should("not.exist")
  }

  hitsSelectIsVisible() {
    cy.get('[data-cy="hits-taken"]').should("exist")
  }

  hitsSelectIsHidden() {
    cy.get('[data-cy="hits-taken"]').should("not.exist")
  }

  inputEv(stat: string, value: number): PokemonBuildMobile {
    this.evInput(stat).clear().type(value.toString(), { force: true }).blur()
    return this
  }

  evValueIs(stat: string, value: number) {
    this.evInput(stat).should("have.value", `${value}`)
  }

  private evInput(stat: string) {
    return cy.get(`app-ev-slider[stat="${stat}"] [data-cy="ev-value"]`)
  }

  clearEvs(): PokemonBuildMobile {
    cy.get('[data-cy="clear-evs-mobile"]').click({ force: true })
    return this
  }

  remainingIs(remaining: number) {
    cy.get('[data-cy="remaining-evs-mobile"]').should("have.text", `${remaining}`)
  }

  toggleSpsMode(): PokemonBuildMobile {
    cy.get('[data-cy="evs-sps-toggle-mobile"] button').click({ force: true })
    return this
  }

  ensureEvMode(): PokemonBuildMobile {
    cy.get('[data-cy="evs-sps-toggle-mobile"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") === "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })

    return this
  }

  focusEvInput(stat: string): PokemonBuildMobile {
    this.evInput(stat).focus()
    return this
  }

  evInputIsFocused(stat: string) {
    this.evInput(stat).should("be.focused")
  }

  evInputIsNotFocused(stat: string) {
    this.evInput(stat).should("not.be.focused")
  }

  touchEvsArea(): PokemonBuildMobile {
    cy.get(".evs").first().trigger("touchstart", { force: true })
    return this
  }

  evLabelIs(stat: string, label: string) {
    cy.get(`app-ev-slider[stat="${stat}"]`).find("mat-label").should("have.text", label)
  }

  selectHighRoll(): PokemonBuildMobile {
    const bottomNav = new BottomNav()

    bottomNav.goTo("Settings")
    cy.get('[data-cy="high-roll"]').click({ force: true })
    bottomNav.goTo("Results")

    return this
  }

  toggleUpdateNature(): PokemonBuildMobile {
    cy.get('[data-cy="update-nature-checkbox-mobile"] input').click({ force: true })
    return this
  }

  optimizeBulkIsVisible(): PokemonBuildMobile {
    cy.get('[data-cy="optimize-evs-mobile"]').should("be.visible")
    return this
  }

  optimizeBulk(): PokemonBuildMobile {
    cy.get('[data-cy="optimize-evs-mobile"]').click({ force: true })
    return this
  }

  discardOptimization(): PokemonBuildMobile {
    cy.get('[data-cy="discard-optimization-mobile"]').click({ force: true })
    return this
  }

  applyOptimization(): PokemonBuildMobile {
    cy.get('[data-cy="apply-optimization-mobile"]').click({ force: true })
    return this
  }

  okNoSolution(): PokemonBuildMobile {
    cy.get('[data-cy="ok-no-solution-mobile"]').click({ force: true })
    return this
  }

  selectSurvivalThreshold(threshold: "2HKO" | "3HKO" | "4HKO"): PokemonBuildMobile {
    cy.get('[data-cy="survival-threshold-select-mobile"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(threshold).click()
    cy.get("mat-option").should("not.exist")
    return this
  }

  optimizationButtonsAreHidden() {
    cy.get('[data-cy="apply-optimization-mobile"]').should("not.exist")
    cy.get('[data-cy="discard-optimization-mobile"]').should("not.exist")
  }

  optimizedStats(stats: string[]) {
    stats.forEach(stat => cy.get(`app-ev-slider[stat="${stat}"]`).find(".ev-slider").should("have.class", "optimized"))
  }

  noSolutionFoundIsVisible() {
    cy.get(".no-solution").should("contain.text", "No solution found")
  }

  noSolutionNeededIsVisible() {
    cy.get(".no-solution").should("contain.text", "No solution needed")
  }

  natureIs(name: string) {
    cy.get('[data-cy="nature"]').should("contain.text", name)
  }

  toggleRole(role: "attacker" | "defender"): PokemonBuildMobile {
    cy.get("mat-button-toggle")
      .contains(role === "attacker" ? "Attacker" : "Defender")
      .click({ force: true })
    return this
  }

  hasDuplicateItemWarning() {
    cy.get('[data-cy="duplicate-item-warning"]').should("exist")
  }

  clickDuplicateItemWarning(): PokemonBuildMobile {
    cy.get('[data-cy="duplicate-item-warning"]').click({ force: true })
    return this
  }

  duplicateItemTooltipIsVisible() {
    cy.get("mat-tooltip-component").should("contain.text", "already used by another")
  }

  closeTableButtonIsVisible() {
    this.closeTableButton().should("be.visible").and("contain.text", "Close")
  }

  closeTableButtonIsHidden() {
    this.closeTableButton().should("not.exist")
  }

  private closeTableButton() {
    return cy.get('[data-cy="pokemon-select"]').parents(".attacker-header").first().find(".close-table-button")
  }

  nameColumnIsFrozen() {
    cy.get("[data-cy='scroll-viewport']").find(".frozen-cell").first().should("have.css", "position", "sticky")
  }

  visiblePokemonSelectCountIs(count: number) {
    cy.get('[data-cy="pokemon-select"]:visible').should("have.length", count)
  }

  visibleTableEntriesCountIsAtLeast(count: number) {
    cy.get('[data-cy^="table-entry-"]:visible').should("have.length.at.least", count)
  }

  cardDescription(): any {
    return cy.get(".damage-result").first().invoke("text")
  }

  cardDescriptionIsNot(text: string) {
    cy.get(".damage-result").first().invoke("text").should("not.eq", text)
  }
}
