import { CombinedProbability } from "./combined-probability"
import { DefensiveCoverage } from "./defensive-coverage"
import { OffensiveCoverage } from "./offensive-coverage"
import { PokemonBuild } from "./pokemon-build"
import { PokemonProbability } from "./pokemon-probability"
import { ProbabilityCard } from "./probability-card"
import { Team } from "./team"
import { TeamScore } from "./team-score"
import { TeamsWidget } from "./teams-widget"
import { TypeCoverageInsights } from "./type-coverage-insights"

declare module "./team" {
  interface Team {
    delete(teamName: string): void
    selectTeam(teamName: string): Team
    selectSecondTeam(teamName: string): Team
    importPokepaste(pokepaste: string, useEvs?: boolean): void
    exportTeam(teamName: string): ReturnType<TeamsWidget["exportTeam"]>
    updateTeamName(teamName: string): void
    goToRightPage(): void
    goToLeftPage(): void
    pokemonOnEditNameIs(pokemonName: string): void
    pokemonOnEditItemIs(itemName: string): void
    pokemonOnEditAbilityIs(abilityName: string): void
    pokemonOnEditIs(pokemonName: string, ability: string, teraType: string | undefined, item: string, nature?: string): void
    pokemonOnEditAttacksIs(attackOne: string, attackTwo: string, attackThree: string, attackFour: string): void
    pokemonOnEditEvsIs(hp: number, atk: number, def: number, spa: number, spd: number, spe: number): void
    haveSomeEvs(): void
    natureIsNot(nature: string): void
  }
}

const teamsWidget = new TeamsWidget()

Team.prototype.delete = teamName => teamsWidget.delete(teamName)

Team.prototype.selectTeam = function (teamName: string) {
  teamsWidget.selectTeam(teamName)
  return this
}

Team.prototype.selectSecondTeam = function (teamName: string) {
  teamsWidget.selectSecondTeam(teamName)
  return this
}

Team.prototype.importPokepaste = (pokepaste, useEvs = true) => teamsWidget.importPokepaste(pokepaste, useEvs)
Team.prototype.exportTeam = teamName => teamsWidget.exportTeam(teamName)
Team.prototype.updateTeamName = teamName => teamsWidget.updateTeamName(teamName)
Team.prototype.goToRightPage = () => teamsWidget.goToRightPage()
Team.prototype.goToLeftPage = () => teamsWidget.goToLeftPage()

Team.prototype.pokemonOnEditNameIs = function (pokemonName: string) {
  cy.get('[data-cy="pokemon-select"] input').should("have.value", pokemonName)
}

Team.prototype.pokemonOnEditItemIs = function (itemName: string) {
  cy.get('[data-cy="item"] input').should("have.value", itemName)
}

Team.prototype.pokemonOnEditAbilityIs = function (abilityName: string) {
  cy.get('[data-cy="ability"] input').should("have.value", abilityName)
}

Team.prototype.pokemonOnEditIs = function (pokemonName: string, ability: string, teraType: string | undefined, item: string, nature?: string) {
  cy.get("body").type("{esc}")
  this.pokemonOnEditNameIs(pokemonName)
  cy.get('[data-cy="ability"] input').should("have.value", ability)

  if (teraType) {
    cy.get('[data-cy="tera-type"]').contains(teraType)
  }

  cy.get('[data-cy="item"] input').should("have.value", item)

  if (nature) {
    cy.get('[data-cy="nature"]').contains(nature)
  }
}

Team.prototype.pokemonOnEditAttacksIs = function (attackOne: string, attackTwo: string, attackThree: string, attackFour: string) {
  cy.get('[data-cy="pokemon-attack-1"] input').should("have.value", attackOne)
  cy.get('[data-cy="pokemon-attack-2"] input').should("have.value", attackTwo)
  cy.get('[data-cy="pokemon-attack-3"] input').should("have.value", attackThree)
  cy.get('[data-cy="pokemon-attack-4"] input').should("have.value", attackFour)
}

Team.prototype.pokemonOnEditEvsIs = function (hp: number, atk: number, def: number, spa: number, spd: number, spe: number) {
  new PokemonBuild("your-team").ensureEvMode()
  const values: Record<string, number> = { hp, atk, def, spa, spd, spe }

  Object.entries(values).forEach(([stat, value]) => {
    cy.get(`[data-cy="stat-${stat}"]`).find('[data-cy="ev-value"]').should("have.value", value)
  })
}

Team.prototype.haveSomeEvs = function () {
  cy.get('[data-cy="remaining-evs"]').should("not.have.value", 508)
}

Team.prototype.natureIsNot = function (nature: string) {
  cy.get('[data-cy="nature"]').should("not.contain", nature)
}

declare module "./team-score" {
  interface TeamScore {
    verifyTeamScore(score: string): void
    verifyPokemonScore(index: number, score: string): void
    verifyTeamScoreDoesNotExist(): void
  }
}

TeamScore.prototype.verifyTeamScore = function (score: string) {
  this.teamScoreIs(score)
}

TeamScore.prototype.verifyPokemonScore = function (index: number, score: string) {
  this.pokemonScoreIs(index, score)
}

TeamScore.prototype.verifyTeamScoreDoesNotExist = function () {
  this.teamScoreIsHidden()
}

declare module "./pokemon-probability" {
  interface PokemonProbability {
    verifyAccuracy(accuracy: string): void
  }
}

PokemonProbability.prototype.verifyAccuracy = function (accuracy: string) {
  this.accuracyIs(accuracy)
}

declare module "./combined-probability" {
  interface CombinedProbability {
    verifyResult(expectedValue: string): void
    verifyInputValue(index: number, expectedValue: string): void
    verifyContainerVisible(): void
    verifyCalcTypeSelected(type: "at-least-one" | "all" | "none"): void
  }
}

CombinedProbability.prototype.verifyResult = function (expectedValue: string) {
  this.resultIs(expectedValue)
}

CombinedProbability.prototype.verifyInputValue = function (index: number, expectedValue: string) {
  this.inputValueIs(index, expectedValue)
}

CombinedProbability.prototype.verifyContainerVisible = function () {
  this.containerIsVisible()
}

CombinedProbability.prototype.verifyCalcTypeSelected = function (type: "at-least-one" | "all" | "none") {
  this.calcTypeIs(type)
}

declare module "./probability-card" {
  interface ProbabilityCard {
    verifyTurn1SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string): void
    verifyTurn2SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string): void
    verifyTurn3SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string): void
    verifyTurn4SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string): void
    verifyTurn5SingleTarget(hitAllTurns: string, hitAtLeastOne: string, missAllTurns: string, missAtLeastOne: string): void
    verifyTurn1SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string): void
    verifyTurn2SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string): void
    verifyTurn3SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string): void
    verifyTurn4SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string): void
    verifyTurn5SpreadTarget(hitBoth: string, hitAtLeastOne: string, missBoth: string): void
    verifyEffectAtLeastOnce(turn: number, value: string): void
    verifyEffectAllTurns(turn: number, value: string): void
    verifyEffectOnePlus(turn: number, value: string): void
    verifyEffectBoth(turn: number, value: string): void
  }
}

for (const turn of [1, 2, 3, 4, 5]) {
  ;(ProbabilityCard.prototype as any)[`verifyTurn${turn}SingleTarget`] = function (this: ProbabilityCard, ...values: string[]) {
    this.singleTargetTurnIs(turn, values[0], values[1], values[2], values[3])
  }
  ;(ProbabilityCard.prototype as any)[`verifyTurn${turn}SpreadTarget`] = function (this: ProbabilityCard, ...values: string[]) {
    this.spreadTargetTurnIs(turn, values[0], values[1], values[2])
  }
}

ProbabilityCard.prototype.verifyEffectAtLeastOnce = function (turn: number, value: string) {
  this.effectAtLeastOnceIs(turn, value)
}

ProbabilityCard.prototype.verifyEffectAllTurns = function (turn: number, value: string) {
  this.effectAllTurnsIs(turn, value)
}

ProbabilityCard.prototype.verifyEffectOnePlus = function (turn: number, value: string) {
  this.effectOnePlusIs(turn, value)
}

ProbabilityCard.prototype.verifyEffectBoth = function (turn: number, value: string) {
  this.effectBothIs(turn, value)
}

declare module "./coverage-table" {
  interface CoverageTable {
    verifyTableVisible(): void
    verifyTableNotExists(): void
    verifyPokemonHeaderContains(pokemonName: string): void
    verifyEffectivenessCellsCount(minCount: number): void
    verifyEffectivenessValue(rowIndex: number, pokemonIndex: number, expectedValue: string): void
  }
}

declare module "./offensive-coverage" {
  interface OffensiveCoverage {
    verifyTotalSuperEffective(rowIndex: number, expectedValue: number): void
    verifyTotalNotVeryEffective(rowIndex: number, expectedValue: number): void
    verifyTeraTypeToggleVisible(): void
    verifyTeraTypeToggleNotExists(): void
    verifyTeraBlastToggleVisible(): void
    verifyTeraBlastToggleNotExists(): void
  }
}

declare module "./defensive-coverage" {
  interface DefensiveCoverage {
    verifyPokemonHeadersCount(expectedCount: number): void
    verifyTotalWeak(rowIndex: number, expectedValue: number): void
    verifyTotalResist(rowIndex: number, expectedValue: number): void
    verifyTeraTypeToggleVisible(): void
    verifyTeraTypeToggleChecked(): void
    verifyTeraBlastToggleVisible(): void
    verifyTeraBlastToggleNotExists(): void
  }
}

for (const CoverageClass of [OffensiveCoverage, DefensiveCoverage]) {
  const proto = CoverageClass.prototype as any

  proto.verifyTableVisible = function () {
    this.tableIsVisible()
  }
  proto.verifyTableNotExists = function () {
    this.tableIsHidden()
  }
  proto.verifyPokemonHeaderContains = function (pokemonName: string) {
    this.pokemonHeaderContains(pokemonName)
  }
  proto.verifyEffectivenessCellsCount = function (minCount: number) {
    this.effectivenessCellsCountIsAtLeast(minCount)
  }
  proto.verifyEffectivenessValue = function (rowIndex: number, pokemonIndex: number, expectedValue: string) {
    this.effectivenessValueIs(rowIndex, pokemonIndex, expectedValue)
  }
  proto.verifyTeraTypeToggleVisible = function () {
    this.teraTypeToggleIsVisible()
  }
  proto.verifyTeraBlastToggleVisible = function () {
    this.teraBlastToggleIsVisible()
  }
  proto.verifyTeraBlastToggleNotExists = function () {
    this.teraBlastToggleIsHidden()
  }
}

OffensiveCoverage.prototype.verifyTotalSuperEffective = function (rowIndex: number, expectedValue: number) {
  this.totalSuperEffectiveIs(rowIndex, expectedValue)
}

OffensiveCoverage.prototype.verifyTotalNotVeryEffective = function (rowIndex: number, expectedValue: number) {
  this.totalNotVeryEffectiveIs(rowIndex, expectedValue)
}

OffensiveCoverage.prototype.verifyTeraTypeToggleNotExists = function () {
  this.teraTypeToggleIsHidden()
}

DefensiveCoverage.prototype.verifyPokemonHeadersCount = function (expectedCount: number) {
  this.pokemonHeadersCountIs(expectedCount)
}

DefensiveCoverage.prototype.verifyTotalWeak = function (rowIndex: number, expectedValue: number) {
  this.totalWeakIs(rowIndex, expectedValue)
}

DefensiveCoverage.prototype.verifyTotalResist = function (rowIndex: number, expectedValue: number) {
  this.totalResistIs(rowIndex, expectedValue)
}

DefensiveCoverage.prototype.verifyTeraTypeToggleChecked = function () {
  this.teraTypeToggleIsChecked()
}

declare module "./type-coverage-insights" {
  interface TypeCoverageInsights {
    verifyEmptyMessage(): void
    verifyInsightsContainerVisible(): void
    verifyOffensiveSectionVisible(): void
    verifyDefensiveSectionVisible(): void
    verifyTypeSummariesNotExist(): void
    verifyPokemonIconsCount(minCount: number): void
    verifyExplanationsCount(minCount: number): void
    verifyDefensiveResistCount(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyDefensiveImmuneCount(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyDefensiveWeakCount2x(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyDefensiveWeakCount4x(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyDefensiveWeaknessesCoveredByTera(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyOffensiveSuperEffectiveCount2x(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifyOffensiveNotVeryEffectiveCount(pokemonIndex: number, pokemonName: string, expectedCount: number): void
    verifySummarySuperEffectiveCount(expectedCount: number, expectedType: string): void
    verifySummaryNotVeryEffectiveCount(expectedCount: number, expectedType: string): void
    verifySummaryResistanceCount(expectedCount: number, expectedType: string): void
    verifySummaryWeaknessCount(expectedCount: number, expectedType: string): void
  }
}

const insightsAliases: Record<string, string> = {
  verifyEmptyMessage: "emptyMessageIsVisible",
  verifyInsightsContainerVisible: "insightsContainerIsVisible",
  verifyOffensiveSectionVisible: "offensiveSectionIsVisible",
  verifyDefensiveSectionVisible: "defensiveSectionIsVisible",
  verifyTypeSummariesNotExist: "typeSummariesAreHidden",
  verifyPokemonIconsCount: "pokemonIconsCountIsAtLeast",
  verifyExplanationsCount: "explanationsCountIsAtLeast",
  verifyDefensiveResistCount: "defensiveResistCountIs",
  verifyDefensiveImmuneCount: "defensiveImmuneCountIs",
  verifyDefensiveWeakCount2x: "defensiveWeakCount2xIs",
  verifyDefensiveWeakCount4x: "defensiveWeakCount4xIs",
  verifyDefensiveWeaknessesCoveredByTera: "defensiveWeaknessesCoveredByTeraIs",
  verifyOffensiveSuperEffectiveCount2x: "offensiveSuperEffectiveCount2xIs",
  verifyOffensiveNotVeryEffectiveCount: "offensiveNotVeryEffectiveCountIs",
  verifySummarySuperEffectiveCount: "summarySuperEffectiveCountIs",
  verifySummaryNotVeryEffectiveCount: "summaryNotVeryEffectiveCountIs",
  verifySummaryResistanceCount: "summaryResistanceCountAndTypeIs",
  verifySummaryWeaknessCount: "summaryWeaknessCountIs"
}

Object.entries(insightsAliases).forEach(([legacy, current]) => {
  ;(TypeCoverageInsights.prototype as any)[legacy] = function (this: any, ...args: any[]) {
    return this[current](...args)
  }
})
