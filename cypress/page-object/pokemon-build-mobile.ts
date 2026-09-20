import { BottomNav } from "./bottom-nav"
import { ImportModal } from "./import-modal"

export class PokemonBuildMobile {
  activateLeftPokemon(): PokemonBuildMobile {
    this.activateSide("side-tab-left")

    return this
  }

  activateRightPokemon(): PokemonBuildMobile {
    this.activateSide("side-tab-right")

    return this
  }

  private activateSide(dataCy: string) {
    cy.get(`[data-cy="${dataCy}"]`).click()
    cy.get(`[data-cy="${dataCy}"]`).then($tab => {
      if (!$tab.hasClass("active-tab")) {
        cy.wrap($tab).click()
      }
    })
    cy.get(`[data-cy="${dataCy}"]`).should("have.class", "active-tab")
  }

  leftPokemonIsActive() {
    cy.get('[data-cy="side-tab-left"]').should("have.class", "active-tab")
  }

  rightPokemonIsActive() {
    cy.get('[data-cy="side-tab-right"]').should("have.class", "active-tab")
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
      .get("app-mobile-table-overlay .table-container:visible")
      .find('[data-cy^="table-entry-"]')
      .first()
      .scrollIntoView()
      .invoke("attr", "data-cy")
      .then(attr => {
        const name = String(attr).replace("table-entry-", "")

        return cy
          .get("app-mobile-table-overlay .table-container:visible")
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
    cy.get("body").find("app-mobile-table-overlay .table-container:visible").should("have.length", 0)
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
    cy.get("app-pokemon-build-mobile app-pokemon-moves-mobile").filter(":visible").should("have.length.at.least", 1)
  }

  pokemonTableIsVisible() {
    cy.get("app-mobile-table-overlay .table-container").should("be.visible")
  }

  clickTableHeader(header: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-header-${header}"]`).click({ force: true })
    return this
  }

  filterListIsVisible(): PokemonBuildMobile {
    cy.get(".filter-list-section").should("be.visible")
    return this
  }

  selectFilterOption(value: string): PokemonBuildMobile {
    cy.get(".filter-option").contains(value).click({ force: true })
    return this
  }

  filterTagsAre(values: string[]): PokemonBuildMobile {
    cy.get(".filter-tag").should("have.length", values.length)
    values.forEach((value, index) => cy.get(".filter-tag").eq(index).should("contain.text", value))

    return this
  }

  hasNoFilterTag(): PokemonBuildMobile {
    cy.get(".filter-tag").should("not.exist")
    return this
  }

  removeFilterTagOf(value: string): PokemonBuildMobile {
    cy.get(".filter-tag").contains(value).parent().find(".remove-filter").click({ force: true })
    return this
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

  toggleAllAbilities(): PokemonBuildMobile {
    cy.get('[data-cy="all-abilities-toggle"] button').click({ force: true })
    return this
  }

  allAbilitiesToggleIsOn(): PokemonBuildMobile {
    cy.get('[data-cy="all-abilities-toggle"] button').should("have.attr", "aria-checked", "true")
    return this
  }

  allAbilitiesToggleIsOff(): PokemonBuildMobile {
    cy.get('[data-cy="all-abilities-toggle"] button').should("have.attr", "aria-checked", "false")
    return this
  }

  allAbilitiesToggleIsDisabled(): PokemonBuildMobile {
    cy.get('[data-cy="all-abilities-toggle"] button').should("be.disabled")
    return this
  }

  searchAbility(filter: string): PokemonBuildMobile {
    cy.get('[data-cy="ability-search"]').clear().type(filter)
    return this
  }

  abilitySearchIsVisible(): PokemonBuildMobile {
    cy.get('[data-cy="ability-search"]').should("be.visible")
    return this
  }

  abilitySearchDoesNotExist(): PokemonBuildMobile {
    cy.get('[data-cy="ability-search"]').should("not.exist")
    return this
  }

  tableGroupIsVisible(groupName: string): PokemonBuildMobile {
    cy.get(".entries-section-title").contains(groupName).should("be.visible")
    return this
  }

  tableHasNoGroups(): PokemonBuildMobile {
    cy.get(".entries-section-title").should("not.exist")
    return this
  }

  tableEntryIsVisible(abilityName: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-entry-${abilityName}"]`).should("exist")
    return this
  }

  tableEntryDoesNotExist(abilityName: string): PokemonBuildMobile {
    cy.get(`[data-cy="table-entry-${abilityName}"]`).should("not.exist")
    return this
  }

  editMoves(): PokemonBuildMobile {
    cy.get(".edit-button:visible").first().click({ force: true })
    return this
  }

  closeMoves(): PokemonBuildMobile {
    cy.get('[data-cy="close-moves-table"]').first().click({ force: true })
    return this
  }

  searchMove(moveName: string): PokemonBuildMobile {
    cy.get('[data-cy="move-search"]:visible')
      .filter((_, el) => {
        const rect = el.getBoundingClientRect()

        return rect.left >= 0 && rect.right <= el.ownerDocument.defaultView!.innerWidth
      })
      .first()
      .clear()
      .type(moveName)
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

  spsAreHidden() {
    cy.get(".sps").should("not.exist")
  }

  hitsSelectIsVisible() {
    cy.get('[data-cy="hits-taken"]').should("exist")
  }

  hitsSelectIsHidden() {
    cy.get('[data-cy="hits-taken"]').should("not.exist")
  }

  inputSp(stat: string, value: number): PokemonBuildMobile {
    this.spInput(stat).clear().type(value.toString(), { force: true }).blur()
    return this
  }

  spValueIs(stat: string, value: number) {
    this.spInput(stat).should("have.value", `${value}`)
  }

  spMaxAttributeIs(stat: string, max: number) {
    this.spInput(stat).should("have.attr", "max", `${max}`)
  }

  private spInput(stat: string) {
    return cy.get(`app-sp-slider[stat="${stat}"] [data-cy="sp-value"]`)
  }

  clearSps(): PokemonBuildMobile {
    cy.get('[data-cy="clear-sps-mobile"]').click({ force: true })
    return this
  }

  remainingIs(remaining: number) {
    cy.get('[data-cy="remaining-sps-mobile"]').should("have.text", `${remaining}`)
  }

  toggleSpsMode(): PokemonBuildMobile {
    cy.get('[data-cy="sps-evs-toggle-mobile"] button').click({ force: true })
    return this
  }

  ensureEvMode(): PokemonBuildMobile {
    cy.get('[data-cy="sps-evs-toggle-mobile"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") === "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })

    return this
  }

  focusSpInput(stat: string): PokemonBuildMobile {
    this.spInput(stat).focus()
    return this
  }

  spInputIsFocused(stat: string) {
    this.spInput(stat).should("be.focused")
  }

  spInputIsNotFocused(stat: string) {
    this.spInput(stat).should("not.be.focused")
  }

  touchSpsArea(): PokemonBuildMobile {
    cy.get(".sps").first().trigger("touchstart", { force: true })
    return this
  }

  spLabelIs(stat: string, label: string) {
    cy.get(`app-sp-slider[stat="${stat}"]`).find("mat-label").should("have.text", label)
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
    cy.get('[data-cy="optimize-sps-mobile"]').should("be.visible")
    return this
  }

  optimizeBulk(): PokemonBuildMobile {
    cy.get('[data-cy="optimize-sps-mobile"]').click({ force: true })
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

  okNotNeeded(): PokemonBuildMobile {
    cy.get('[data-cy="ok-not-needed-mobile"]').click({ force: true })
    return this
  }

  selectSurvivalThreshold(threshold: "OHKO" | "2HKO" | "3HKO" | "4HKO"): PokemonBuildMobile {
    cy.get('[data-cy="survival-threshold-select-mobile"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(threshold).click()
    cy.get("mat-option").should("not.exist")
    return this
  }

  selectOptimizeMode(mode: "Bulk" | "Damage"): PokemonBuildMobile {
    cy.get(`[data-cy="optimize-mode-${mode.toLowerCase()}-mobile"]`).click({ force: true })
    return this
  }

  optimizeModeIs(mode: "Bulk" | "Damage"): PokemonBuildMobile {
    cy.get(`[data-cy="optimize-mode-${mode.toLowerCase()}-mobile"]`).should("have.class", "selected")
    return this
  }

  optimizationImpossibleIsVisible(): PokemonBuildMobile {
    cy.get('[data-cy="offensive-impossible-label-mobile"]').should("be.visible")
    return this
  }

  okOptimizationImpossible(): PokemonBuildMobile {
    cy.get('[data-cy="ok-offensive-impossible-mobile"]').click({ force: true })
    return this
  }

  optimizationButtonsAreHidden() {
    cy.get('[data-cy="apply-optimization-mobile"]').should("not.exist")
    cy.get('[data-cy="discard-optimization-mobile"]').should("not.exist")
  }

  optimizedStats(stats: string[]) {
    stats.forEach(stat => cy.get(`app-sp-slider[stat="${stat}"]`).find(".sp-slider").should("have.class", "optimized"))
  }

  bestEffortLabelIs(text: string) {
    cy.get('[data-cy="best-effort-label-mobile"]').should("have.text", text)
  }

  pendingTargetIs(target: string, chance: string) {
    cy.get('[data-cy="out-of-reach-label-mobile"] .pending-target-name').should("have.text", target)
    cy.get('[data-cy="out-of-reach-label-mobile"] .pending-target-chance').should("have.text", chance)
  }

  pendingTargetIsOnTwoLines() {
    cy.get('[data-cy="out-of-reach-label-mobile"] .pending-target-name').then($name => {
      cy.get('[data-cy="out-of-reach-label-mobile"] .pending-target-chance').then($chance => {
        expect($chance[0].getBoundingClientRect().top).to.be.greaterThan($name[0].getBoundingClientRect().top)
      })
    })
  }

  outOfReachLabelIs(text: string) {
    cy.get('[data-cy="out-of-reach-label-mobile"]').should("have.text", text)
  }

  outOfReachLabelIsHidden() {
    cy.get('[data-cy="out-of-reach-label-mobile"]').should("not.exist")
  }

  perAttackerOptionsAreVisible() {
    cy.get('[data-cy="per-attacker-options-mobile"]').should("be.visible")
  }

  perAttackerOptionsAreHidden() {
    cy.get('[data-cy="per-attacker-options-mobile"]').should("not.exist")
  }

  attackerRowNames(names: string[]) {
    cy.get('[data-cy="per-attacker-options-mobile"] .attacker-name')
      .should("have.length", names.length)
      .each(($name, index) => expect($name.text().trim()).to.equal(names[index]))
  }

  currentAttackerRowIs(name: string) {
    cy.get('[data-cy="per-attacker-options-mobile"] .attacker-group-current .attacker-name').should("have.text", name)
  }

  optimizationCostIs(text: string) {
    cy.get(".optimizer-cost").should("have.text", text)
  }

  optimizationVerdictIs(text: string) {
    cy.get('[data-cy="optimization-notes-mobile"] .optimizer-verdict label').should("have.text", text)
  }

  optimizationImpossibleLabelIs(text: string) {
    cy.get('[data-cy="offensive-impossible-label-mobile"]').should("have.text", text)
  }

  combinedCostsAreVisible() {
    cy.get('[data-cy="optimizer-combined-costs-mobile"]').should("be.visible")
  }

  noSolutionNeededIsVisible() {
    cy.get('[data-cy="ok-not-needed-mobile"]').should("be.visible")
    cy.get(".optimizer-verdict").should("contain.text", "with no")
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
    cy.get('[data-cy="scrollable-content-build"]').find('[data-cy="pokemon-select"]:visible').should("have.length", count)
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
