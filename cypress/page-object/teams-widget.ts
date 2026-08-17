import { ExportModal } from "./export-modal"
import { ImportModal } from "./import-modal"
import { TeamListModal } from "./team-list-modal"

export class TeamsWidget {
  selectTeam(teamName: string): TeamsWidget {
    this.teamBoxOf(teamName).click({ force: true })
    return this
  }

  selectSecondTeam(teamName: string): TeamsWidget {
    this.teamBoxOf(teamName).click({ ctrlKey: true, force: true })
    return this
  }

  private teamBoxOf(teamName: string) {
    return cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).first()
  }

  delete(teamName: string) {
    this.selectTeam(teamName)
    cy.get('[data-cy="delete-team-button"]').click({ force: true })
  }

  createTeam() {
    cy.get('[data-cy="add-team-button"]').click({ force: true })
  }

  deleteActiveTeam() {
    cy.get('[data-cy="delete-team-button"]').click({ force: true })
  }

  deleteIsDisabled() {
    cy.get('[data-cy="delete-team-button"]').should("have.class", "disabled")
  }

  deleteIsEnabled() {
    cy.get('[data-cy="delete-team-button"]').should("not.have.class", "disabled")
  }

  updateTeamName(teamName: string) {
    cy.get('[data-cy="team-name"]').clear().type(teamName)
  }

  teamNameIs(teamName: string) {
    cy.get('[data-cy="team-name"]').should("have.value", teamName)
  }

  activeTeamNameIs(teamName: string) {
    cy.get('[data-cy="team-box"].active-team').find(".team-name-label").should("have.text", teamName)
  }

  activeTeamCountIs(count: number) {
    cy.get('[data-cy="team-box"].active-team').should("have.length", count)
  }

  teamBoxExists(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).should("exist")
  }

  teamBoxDoesNotExist(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).should("not.exist")
  }

  teamBoxIsEmpty(teamName: string) {
    cy.get('[data-cy="team-box"]').filter(`:contains(${teamName})`).find("app-pokemon-sprite").should("not.exist")
  }

  teamsCountIs(count: number) {
    cy.get('[data-cy="team-box"]').should("have.length", count)
  }

  teamBoxesAre(teamNames: string[]) {
    cy.get('[data-cy="team-box"]').should($boxes => {
      const names = [...$boxes].map(box => box.querySelector(".team-name-label")!.textContent!.trim())

      expect(names).to.deep.eq(teamNames)
    })
  }

  activeTeamSpritesAre(spriteNames: string[]) {
    cy.get('[data-cy="team-box"].active-team app-pokemon-sprite img').should($sprites => {
      const names = [...$sprites].map(sprite => sprite.getAttribute("src")!.split("/").pop())

      expect(names).to.deep.eq(spriteNames)
    })
  }

  selectTeamAt(position: number) {
    cy.get('[data-cy="team-box"]').eq(position).click({ force: true })
  }

  nextPageIsAvailable() {
    cy.get('[data-cy="teams-to-right-button"]').should("be.visible")
  }

  nextPageIsUnavailable() {
    cy.get('[data-cy="teams-to-right-button"]').should("not.be.visible")
  }

  previousPageIsAvailable() {
    cy.get('[data-cy="teams-to-left-button"]').should("be.visible")
  }

  previousPageIsUnavailable() {
    cy.get('[data-cy="teams-to-left-button"]').should("not.be.visible")
  }

  goToRightPage() {
    cy.get('[data-cy="teams-to-right-button"]').click({ force: true })
  }

  goToLeftPage() {
    cy.get('[data-cy="teams-to-left-button"]').click({ force: true })
  }

  openImportModal(): ImportModal {
    cy.get('[data-cy="teams-widget"]').find('[data-cy="import-pokemon"]').click()
    return new ImportModal()
  }

  importPokepaste(pokepaste: string, useEvs = true) {
    this.openImportModal().import(pokepaste, useEvs)
    cy.get('[data-cy="team-box"].active-team').find("app-pokemon-sprite").should("exist")
  }

  exportTeam(teamName: string): ExportModal {
    this.selectTeam(teamName)
    cy.get('[data-cy="export-team-button"]').click({ force: true })

    return new ExportModal()
  }

  dragTeamOnto(sourceTeamName: string, targetTeamName: string) {
    this.teamBoxOf(sourceTeamName).find(".drag-handle").realMouseDown({ button: "left", position: "center" }).realMouseMove(0, 10, { position: "center" })
    this.teamBoxOf(targetTeamName).realMouseMove(0, 0, { position: "center" }).realHover().realMouseUp().wait(600)
  }

  separateSecondTeam(teamName: string) {
    this.teamBoxOf(teamName).find(".drag-handle").click({ force: true })
  }

  secondTeamHelpIsVisible() {
    cy.get('[data-cy="multi-selection-help"]').should("be.visible")
  }

  secondTeamHelpIsHidden() {
    cy.get('[data-cy="multi-selection-help"]').should("not.exist")
  }

  hasStackedSecondTeam() {
    cy.get('[data-cy="team-box"].has-second-team').should("exist")
  }

  hasNoStackedSecondTeam() {
    cy.get('[data-cy="team-box"].has-second-team').should("not.exist")
  }

  openTeamList(): TeamListModal {
    cy.get('[data-cy="teams-widget"]').find('[data-cy="export-pdf-button"]').click({ force: true })
    return new TeamListModal()
  }

  teamListIsDisabled() {
    cy.get('[data-cy="teams-widget"]').find('[data-cy="export-pdf-button"]').should("be.disabled")
  }

  teamListIsEnabled() {
    cy.get('[data-cy="teams-widget"]').find('[data-cy="export-pdf-button"]').should("not.be.disabled")
  }
}
