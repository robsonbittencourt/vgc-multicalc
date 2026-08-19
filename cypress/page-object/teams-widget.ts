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

  secondTeamHelpIsVisible() {
    cy.get('[data-cy="multi-selection-help"]').should("be.visible")
  }

  secondTeamHelpIsHidden() {
    cy.get('[data-cy="multi-selection-help"]').should("not.exist")
  }

  dragTeamOntoActive(teamName: string) {
    cy.get('[data-cy="team-box"].active-team').then($target => {
      const target = $target[0].getBoundingClientRect()
      const toX = target.x + target.width / 2
      const toY = target.y + target.height / 2

      this.teamBoxOf(teamName)
        .find(".drag-handle mat-icon")
        .then($handle => {
          const handle = $handle[0].getBoundingClientRect()
          const fromX = handle.x + handle.width / 2
          const fromY = handle.y + handle.height / 2

          const touchAt = (x: number, y: number) => [{ clientX: x, clientY: y, pageX: x, pageY: y, screenX: x, screenY: y, identifier: 0, target: $handle[0] }]

          cy.wrap($handle).trigger("touchstart", { force: true, touches: touchAt(fromX, fromY), targetTouches: touchAt(fromX, fromY) })

          for (let step = 1; step <= 12; step++) {
            const x = fromX + ((toX - fromX) * step) / 12
            const y = fromY + ((toY - fromY) * step) / 12

            cy.wrap($handle).trigger("touchmove", { force: true, touches: touchAt(x, y), targetTouches: touchAt(x, y) })
          }

          cy.wrap($handle).trigger("touchend", { force: true, touches: [], changedTouches: touchAt(toX, toY) })
        })
    })
  }

  separateSecondTeam() {
    cy.get('[data-cy="team-box"].has-second-team').find(".drag-handle").click({ force: true })
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
