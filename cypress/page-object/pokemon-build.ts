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

  openPokemonTable(): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').click({ force: true })
    return this
  }

  pokemonSelectorIsFocused(): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').should("be.focused")
    return this
  }

  inputPokemonName(filter: string): PokemonBuild {
    this.container().find('[data-cy="pokemon-select"] input').click({ force: true }).type(filter)
    return this
  }

  tableEntryIsSelected(name: string): PokemonBuild {
    cy.get(`[data-cy="table-entry-${name}"]`).should("have.class", "entry-active")
    return this
  }

  pressArrowDown(times = 1): PokemonBuild {
    for (let i = 0; i < times; i++) {
      cy.realPress("ArrowDown")
    }

    return this
  }

  pressArrowUp(times = 1): PokemonBuild {
    for (let i = 0; i < times; i++) {
      cy.realPress("ArrowUp")
    }

    return this
  }

  pressEnter(): PokemonBuild {
    cy.realPress("Enter")
    return this
  }

  tableEntryIsVisible(name: string): PokemonBuild {
    cy.get(`[data-cy="table-entry-${name}"]`).should("be.visible")
    return this
  }

  openMoveTable(position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click({ force: true })
    return this
  }

  openItemTable(): PokemonBuild {
    this.container().find('[data-cy="item"] input').click({ force: true })
    return this
  }

  openAbilityTable(): PokemonBuild {
    this.container().find('[data-cy="ability"] input').click({ force: true })
    return this
  }

  tableIsClosed(): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']").should("not.exist")
    return this
  }

  moveHasFocus(position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).should("be.focused")
    return this
  }

  noMoveHasFocus(): PokemonBuild {
    this.container().find('[data-cy^="pokemon-attack-"] input').should("not.be.focused")
    return this
  }

  firstGroupsAre(groups: string[]): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']")
      .find(".entries-section-title")
      .then($titles => {
        const rendered = [...$titles].map(el => el.textContent!.trim())
        expect(rendered.slice(0, groups.length)).to.deep.eq(groups)
      })

    return this
  }

  clickTableHeader(header: string): PokemonBuild {
    cy.get(`[data-cy="table-header-${header}"]`).click({ force: true })
    return this
  }

  storeFirstTableEntry(alias: string): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']")
      .find(".entry")
      .first()
      .then($entry => cy.wrap($entry.attr("data-cy")).as(alias))

    return this
  }

  firstTableEntryIsNotTheStored(alias: string): PokemonBuild {
    cy.get(`@${alias}`).then(stored => {
      cy.get("[data-cy='scroll-viewport']").find(".entry").first().should("not.have.attr", "data-cy", String(stored))
    })

    return this
  }

  firstTableEntryIsNot(name: string): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']").find(".entry").first().should("not.have.attr", "data-cy", `table-entry-${name}`)
    return this
  }

  filterTagIs(value: string): PokemonBuild {
    cy.get(".filter-tag").should("contain.text", value)
    return this
  }

  hasNoFilterTag(): PokemonBuild {
    cy.get(".filter-tag").should("not.exist")
    return this
  }

  removeFilterTag(): PokemonBuild {
    cy.get(".filter-tag .remove-filter").first().click({ force: true })
    return this
  }

  selectFilterOption(value: string): PokemonBuild {
    cy.get(".filter-option").contains(value).click({ force: true })
    return this
  }

  filterListIsVisible(): PokemonBuild {
    cy.get(".filter-list-section").should("be.visible")
    return this
  }

  backFromFilterList(): PokemonBuild {
    cy.get(".filter-list-header button").click({ force: true })
    return this
  }

  tableIsVisible(): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']").should("be.visible")
    return this
  }

  noResultsMessageIsVisible(): PokemonBuild {
    cy.get(".no-types").should("have.text", "No results found for the selected filters.")
    return this
  }

  expandTable(): PokemonBuild {
    cy.get(".expand-icon mat-icon").click({ force: true })
    return this
  }

  storeVisibleTableEntriesCount(alias: string): PokemonBuild {
    this.countEntriesInsideViewport().then(count => cy.wrap(count).as(alias))
    return this
  }

  private countEntriesInsideViewport() {
    return cy.get("[data-cy='scroll-viewport']").then($viewport => {
      const viewport = $viewport[0].getBoundingClientRect()

      return $viewport
        .find(".entry")
        .toArray()
        .filter(entry => {
          const rect = entry.getBoundingClientRect()

          return rect.top >= viewport.top - 1 && rect.bottom <= viewport.bottom + 1
        }).length
    })
  }

  showsMoreTableEntriesThan(alias: string): PokemonBuild {
    cy.get(`@${alias}`).then(previous => {
      this.countEntriesInsideViewport().should(count => {
        expect(count).to.be.greaterThan(Number(previous))
      })
    })

    return this
  }

  closeTableByHeaderButton(): PokemonBuild {
    cy.get(".close-button-desktop").click({ force: true })
    return this
  }

  scrollTableToBottom(): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']").scrollTo("bottom", { ensureScrollable: false })
    return this
  }

  abilityIsActivated(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"] input').should("be.checked")
    return this
  }

  abilityIsNotActivated(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"] input').should("not.be.checked")
    return this
  }

  abilityCheckIsVisible(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"]').should("exist")
    return this
  }

  abilityCheckIsHidden(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"]').should("not.exist")
    return this
  }

  abilityCheckIsDisabled(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"] input').should("be.disabled")
    return this
  }

  abilityCheckIsEnabled(): PokemonBuild {
    this.container().find('[data-cy="activate-ability"] input').should("not.be.disabled")
    return this
  }

  paradoxStatSelectIsVisible(): PokemonBuild {
    this.container().find('[data-cy="paradox-stat-select"]').should("exist")
    return this
  }

  tableIsScrolled(): PokemonBuild {
    cy.get("[data-cy='scroll-viewport']").invoke("scrollTop").should("be.greaterThan", 0)
    return this
  }

  selectAttackOne(): PokemonBuild {
    this.container().find('[data-cy="attack1"] input').click({ force: true })
    this.closeTable()
    return this
  }

  selectAttackTwo(): PokemonBuild {
    this.container().find('[data-cy="attack2"] input').click({ force: true })
    this.closeTable()
    return this
  }

  selectAttackThree(): PokemonBuild {
    this.container().find('[data-cy="attack3"] input').click({ force: true })
    this.closeTable()
    return this
  }

  selectAttackFour(): PokemonBuild {
    this.container().find('[data-cy="attack4"] input').click({ force: true })
    this.closeTable()
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

  changeAttackFourByFilter(filter: string, attackName: string): PokemonBuild {
    return this.changeAttackByFilter(filter, attackName, 4)
  }

  private changeAttackByFilter(filter: string, attackName: string, position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().type(filter)
    cy.get(`[data-cy="table-entry-${attackName}"]`).click({ force: true })
    return this
  }

  private inputPokemonMove(filter: string, position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().type(filter)
    return this
  }

  typeAttack(position: number, moveName: string): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().clear().type(moveName)
    return this
  }

  clearAttack(position: number): PokemonBuild {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).click().clear()
    return this
  }

  tab(): PokemonBuild {
    cy.realPress("Tab")
    return this
  }

  clickOutside(): PokemonBuild {
    cy.get("body").click(0, 0)
    return this
  }

  selectItem(itemName: string): PokemonBuild {
    this.closeTable()
    this.container().find('[data-cy="item"] input').click()
    this.scrollAndSearch(itemName)
    return this
  }

  cleanItem(): PokemonBuild {
    this.closeTable()
    ;(this.container().find('[data-cy="item"] input').click().clear() as any).realPress("Tab")
    return this
  }

  selectItemByFilter(filter: string, itemName: string): PokemonBuild {
    this.container().find('[data-cy="item"] input').click().type(filter)
    cy.get(`[data-cy="table-entry-${itemName}"]`).click({ force: true })
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
    this.container().find('[data-cy="pokemon-status"]').click().get("mat-option").contains("Burn").click()
  }

  paralyzed() {
    this.container().find('[data-cy="pokemon-status"]').click().get("mat-option").contains("Paralysis").click()
  }

  selectNature(name: string): PokemonBuild {
    this.container().find('[data-cy="nature"]').click()
    cy.get("mat-option").contains(name).click()
    cy.get("mat-option").should("not.exist")

    return this
  }

  selectAbility(name: string): PokemonBuild {
    this.container().find('[data-cy="ability"] input').click()
    cy.get(`[data-cy="table-entry-${name}"]`).click()
    return this
  }

  selectParadoxStat(stat: string): PokemonBuild {
    this.container().find('[data-cy="paradox-stat-select"]').click().get("mat-option").contains(stat).click({ force: true }).wait(100)
    return this
  }

  selectAbilityByFilter(filter: string, abilityName: string): PokemonBuild {
    this.container().find('[data-cy="ability"] input').click().type(filter)
    cy.get(`[data-cy="table-entry-${abilityName}"]`).click({ force: true })
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

  attackIs(position: number, attackName: string) {
    this.container().find(`[data-cy="pokemon-attack-${position}"] input`).invoke("val").should("eq", `${attackName}`)
  }

  itemIsDisabled() {
    this.container().find('[data-cy="item"] input').should("be.disabled")
  }

  teraIsDisabled() {
    this.container().find('[data-cy="tera-type"]').find('[data-cy="input-select"]').should("have.attr", "aria-disabled", "true")
  }

  teraControlsAreHidden() {
    this.container().find('[data-cy="tera-type"]').should("not.exist")
    this.container().find('[data-cy="terastal-button"]').should("not.exist")
  }

  statModifiedTooltipIs(stat: string, tooltip: string) {
    const modified = () => this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modified"]')

    modified().trigger("mouseenter", { force: true })
    cy.get("mat-tooltip-component").should("contain.text", tooltip)

    modified().trigger("mouseleave", { force: true })
    cy.get("mat-tooltip-component").should("not.exist")
  }

  selectTeraType(teraType: string): PokemonBuild {
    this.container().find('[data-cy="tera-type"]').find('[data-cy="input-select"]').click()
    cy.get("mat-option").contains(teraType).click()
    return this
  }

  evsIs(hp: number, atk: number, def: number, spa: number, spd: number, spe: number) {
    this.ensureEvMode()
    this.container().find(`[data-cy="stat-hp"]`).find('[data-cy="ev-value"]').should("have.value", hp)
    this.container().find(`[data-cy="stat-atk"]`).find('[data-cy="ev-value"]').should("have.value", atk)
    this.container().find(`[data-cy="stat-def"]`).find('[data-cy="ev-value"]').should("have.value", def)
    this.container().find(`[data-cy="stat-spa"]`).find('[data-cy="ev-value"]').should("have.value", spa)
    this.container().find(`[data-cy="stat-spd"]`).find('[data-cy="ev-value"]').should("have.value", spd)
    this.container().find(`[data-cy="stat-spe"]`).find('[data-cy="ev-value"]').should("have.value", spe)
  }

  boostsIs(atk: number, def: number, spa: number, spd: number, spe: number) {
    this.closeTable()
    this.boostIs("atk", atk)
    this.boostIs("def", def)
    this.boostIs("spa", spa)
    this.boostIs("spd", spd)
    this.boostIs("spe", spe)
  }

  private boostIs(stat: string, statValue: number) {
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

  atkEvs(atkEvs: number): PokemonBuild {
    this.container().find(`[data-cy="stat-atk"]`).find('[data-cy="ev-value"]').clear().clear().type(atkEvs.toString(), { force: true }).blur()
    return this
  }

  defEvs(defEvs: number): PokemonBuild {
    this.container().find(`[data-cy="stat-def"]`).find('[data-cy="ev-value"]').clear().clear().type(defEvs.toString(), { force: true }).blur()
    return this
  }

  spaEvs(spaEvs: number): PokemonBuild {
    this.container().find(`[data-cy="stat-spa"]`).find('[data-cy="ev-value"]').clear().clear().type(spaEvs.toString(), { force: true }).blur()
    return this
  }

  speedEvs(speedEvs: number): PokemonBuild {
    this.ensureEvMode()
    this.container().find(`[data-cy="stat-spe"]`).find('[data-cy="ev-value"]').clear().clear().type(speedEvs.toString(), { force: true }).blur()
    return this
  }

  allieFainted(alliesFainted: number) {
    this.container().find(`[data-cy="allies-fainted-${alliesFainted}"]`).click()
  }

  hitsTaken(hitsTaken: number) {
    this.container().find(`[data-cy="hits-taken"]`).click().get("mat-option").contains(hitsTaken.toString()).click()
  }

  lastMoveFailed() {
    this.container().find(`[data-cy="last-move-failed"]`).click()
  }

  importPokemon(pokemonData: string, useEvs = true): PokemonBuild {
    this.closeTable()
    this.container().find('[data-cy="import-pokemon"]').should("be.visible").click()
    new ImportModal().import(pokemonData, useEvs)

    return this
  }

  clearEvs() {
    this.ensureEvMode()
    this.container().find('[data-cy="clear-evs"]').click({ force: true })
  }

  ensureEvMode(): PokemonBuild {
    cy.get('[data-cy="evs-sps-toggle"] button')
      .first()
      .then($toggle => {
        if ($toggle.attr("aria-checked") === "true") {
          cy.wrap($toggle).click({ force: true })
        }
      })

    return this
  }

  optimizeBulk() {
    this.container().find('[data-cy="optimize-evs"]').click({ force: true })
  }

  optimizeBulkIsVisible() {
    this.container().find('[data-cy="optimize-evs"]').should("be.visible")
  }

  optimizeBulkIsHidden() {
    this.container().find('[data-cy="optimize-evs"]').should("not.exist")
  }

  toggleUpdateNature() {
    this.container().find('[data-cy="update-nature-checkbox"] input').click({ force: true })
  }

  toggleKeepOffensiveEvs() {
    this.container().find('[data-cy="keep-offensive-evs-checkbox"] input').click({ force: true })
  }

  applyOptimization() {
    this.container().find('[data-cy="apply-optimization"]').click({ force: true })
  }

  okNoSolution() {
    this.container().find('[data-cy="ok-no-solution"]').click({ force: true })
  }

  discardOptimization() {
    this.container().find('[data-cy="discard-optimization"]').click({ force: true })
  }

  selectSurvivalThreshold(threshold: "2HKO" | "3HKO" | "4HKO") {
    this.container().find('[data-cy="survival-threshold-select"]').click().get("mat-option").contains(threshold).click()
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

  statModifiedIsHidden(stat: string) {
    this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="stat-modified"]').should("not.exist")
  }

  statValueIs(stat: string, statValue: string) {
    this.container().find(`[data-cy="stat-${stat}"]`).find(".stat-value label").first().should("have.text", statValue)
  }

  remainingIs(remaining: number) {
    this.container().find('[data-cy="remaining-evs"]').should("have.text", `${remaining}`)
  }

  evLabelIs(label: string) {
    this.container().find(".evs-titles .evs-title").should("have.text", label)
  }

  toggleSpsMode(): PokemonBuild {
    this.container().find('[data-cy="evs-sps-toggle"] button').click({ force: true })
    return this
  }

  evValueIs(stat: string, value: number) {
    this.container().find(`[data-cy="stat-${stat}"]`).find('[data-cy="ev-value"]').should("have.value", `${value}`)
  }

  dragEvSlider(stat: string, statName: string, offsetX: number): PokemonBuild {
    this.sliderThumb(stat, statName).trigger("mousedown", { button: 0, force: true }).trigger("mousemove", { clientX: offsetX, force: true }).trigger("mouseup", { force: true })

    return this
  }

  setEvSliderValue(stat: string, statName: string, value: number): PokemonBuild {
    this.sliderThumb(stat, statName).invoke("val", value).trigger("input", { force: true }).trigger("change", { force: true })

    return this
  }

  pressEvSliderArrowRight(stat: string, statName: string): PokemonBuild {
    this.sliderThumb(stat, statName).focus().trigger("keydown", { key: "ArrowRight", force: true })
    return this
  }

  touchEvSliderToRight(stat: string, statName: string): PokemonBuild {
    this.sliderThumb(stat, statName)
      .trigger("touchstart", { touches: [{ clientX: 10 }], force: true })
      .trigger("touchmove", { touches: [{ clientX: 400 }], force: true })
      .trigger("touchend", { force: true })

    return this
  }

  private sliderThumb(stat: string, statName: string) {
    return this.container().find(`[data-cy="stat-${stat}"]`).find(`mat-slider input[aria-label="${statName} EVs"]`)
  }

  hasJumps(stat: string) {
    this.container().find(`[data-cy="stat-${stat}"]`).find(".slider-pipe").should("exist")
  }

  hasNoJumps(stat: string) {
    this.container().find(`[data-cy="stat-${stat}"]`).find(".slider-pipe").should("not.exist")
  }

  moveBpIs(position: number, bp: string) {
    this.container()
      .find(".move-bp")
      .eq(position - 1)
      .find("label")
      .should("have.text", bp)
  }

  moveIsActive(position: number) {
    this.container().find(`[data-cy="attack${position}"] input`).should("be.checked")
  }

  moveIsNotActive(position: number) {
    this.container().find(`[data-cy="attack${position}"] input`).should("not.be.checked")
  }

  hitsSelectIsVisible() {
    this.container().find('[data-cy="hits-taken"]').should("exist")
  }

  hitsSelectIsHidden() {
    this.container().find('[data-cy="hits-taken"]').should("not.exist")
  }

  hitsLabelIs(label: string) {
    this.container().find('[data-cy="hits-taken"]').find("label").should("contain.text", label)
  }

  alliesFaintedIsVisible() {
    this.container().find('[data-cy="allies-fainted-1"]').should("exist")
  }

  lastMoveFailedIsVisible() {
    this.container().find('[data-cy="last-move-failed"]').should("exist")
  }

  hasDuplicateItemWarning() {
    this.container().find('[data-cy="duplicate-item-warning"]').should("exist")
  }

  hasNoDuplicateItemWarning() {
    this.container().find('[data-cy="duplicate-item-warning"]').should("not.exist")
  }

  toggleAegislashForm(): PokemonBuild {
    this.container().find('[data-cy="aegislash-form-toggle"]').click({ force: true })
    return this
  }

  aegislashToggleIsHidden() {
    this.container().find('[data-cy="aegislash-form-toggle"]').should("not.exist")
  }

  togglePalafinForm(): PokemonBuild {
    this.container().find('[data-cy="palafin-form-toggle"]').click({ force: true })
    return this
  }

  commanderIsActivated() {
    this.container().find('[data-cy="commander-activated"]').should("exist")
  }

  toggleMega(): PokemonBuild {
    this.container().find(".mega-icon").click({ force: true })
    return this
  }

  megaIconIsVisible() {
    this.container().find(".mega-icon").should("exist")
  }

  megaIconIsHidden() {
    this.container().find(".mega-icon").should("not.exist")
  }

  optimizedStats(stats: string[]) {
    stats.forEach(stat => this.container().find(`[data-cy="stat-${stat}"]`).find(".ev-slider").should("have.class", "optimized"))
  }

  noSolutionFoundIsVisible() {
    this.container().find(".no-solution").should("contain.text", "No solution found")
  }

  noSolutionNeededIsVisible() {
    this.container().find(".no-solution").should("contain.text", "No solution needed")
  }

  optimizationButtonsAreHidden() {
    this.container().find('[data-cy="apply-optimization"]').should("not.exist")
    this.container().find('[data-cy="discard-optimization"]').should("not.exist")
  }

  natureIs(name: string) {
    this.container().find('[data-cy="nature"]').should("contain.text", name)
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
    const maxOffset = 400000

    function tryScroll() {
      const $el = Cypress.$(`[data-cy="table-entry-${pokemonName}"]`)

      if ($el.length) {
        cy.wrap($el).click()
      } else if (currentOffset > maxOffset) {
        throw new Error(`Entry "${pokemonName}" was not found in the table after scrolling ${maxOffset}px`)
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
