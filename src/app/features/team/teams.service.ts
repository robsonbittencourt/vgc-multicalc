import { inject, Injectable } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { Team, Pokemon } from "@multicalc/model"
import { SnackbarService } from "@core/services/snackbar.service"
import { ExportPokeService } from "@store/user-data/export-poke.service"
import { PdfExportService } from "@store/user-data/pdf-export.service"
import { uuid } from "@multicalc/utils/uuid"

@Injectable({
  providedIn: "root"
})
export class TeamsService {
  private store = inject(CalcStore)
  private exportPokeService = inject(ExportPokeService)
  private pdfExportService = inject(PdfExportService)
  private snackBar = inject(SnackbarService)

  activateTeam(team: Team) {
    this.store.activateTeam(team.id)
    return team.activePokemon()?.id
  }

  activateSecondTeam(team: Team, allowSecondTeamSelection: boolean, secondTeamIdSetter: (id: string | null) => void) {
    if (allowSecondTeamSelection && !this.store.team().isEmpty()) {
      secondTeamIdSetter(team.id)
      return team
    }

    return null
  }

  updateTeamName(name: string) {
    this.store.updateActiveTeamName(name)
  }

  export(team: Team) {
    const pokemon = team.teamMembers.map(tm => tm.pokemon)
    const shouldUseSps = this.store.useSpsMode()
    this.exportPokeService.export(team.name, pokemon, shouldUseSps)
  }

  exportPdf(team: Team) {
    this.pdfExportService.export(team)
  }

  addNewTeam() {
    const teams = this.store.teams()
    const lastTeam = teams.length > 0 ? teams[teams.length - 1] : null

    if (lastTeam && lastTeam.isEmpty()) {
      this.activateTeam(lastTeam)
    } else {
      const newTeam = new Team(uuid(), false, `Team ${teams.length + 1}`, [])
      this.store.addTeam(newTeam)
      this.activateTeam(newTeam)
    }

    return this.store.team().activePokemon()?.id
  }

  deleteTeam(isMobile: boolean) {
    if (isMobile) {
      const activeTeamId = this.store.team().id
      const allTeams = this.store.teams()
      const newTeams = allTeams.filter(t => t.id !== activeTeamId)

      if (newTeams.length === 0) {
        const newTeam = new Team(uuid(), true, `Team ${newTeams.length + 1}`, [])
        this.store.updateTeams([newTeam])
      } else {
        this.store.updateTeams(newTeams)
        const teamToActivate = newTeams[0]
        this.store.activateTeam(teamToActivate.id)
      }
    } else {
      const activeIndex = this.store.teams().findIndex(t => t.active)
      const inactiveTeams = this.store.teams().filter(t => !t.active)
      const newTeam = new Team(uuid(), true, `Team ${activeIndex + 1}`, [])
      inactiveTeams.splice(activeIndex, 0, newTeam)

      this.store.updateTeams(inactiveTeams)
    }

    if (!isMobile) {
      this.snackBar.open("Team deleted")
    }

    return this.store.team().activePokemon()?.id
  }

  pokemonImported(pokemon: Pokemon | Pokemon[], isMobile: boolean, teamName?: string) {
    const pokemonList = Array.isArray(pokemon) ? pokemon : [pokemon]

    const emptyTeam = new Team(uuid(), false, "", [])
    const importedTeam = pokemonList.reduce((team, p) => team.addMember(p), emptyTeam)
    const teamMembers = importedTeam.teamMembers

    if (isMobile) {
      const name = teamName || `Team ${this.store.teams().length + 1}`
      const newTeam = new Team(uuid(), false, name, teamMembers)
      this.store.addTeam(newTeam)
      this.activateTeam(newTeam)
    } else {
      const teamSlotToImport = this.store.teams().find(t => t.isEmpty())!
      const name = teamName || teamSlotToImport.name
      const teamToImport = new Team(uuid(), teamSlotToImport.active, name, teamMembers)
      this.store.replaceTeam(teamToImport, teamSlotToImport.id)
      this.activateTeam(teamToImport)
    }

    if (!isMobile) {
      this.snackBar.open("Team imported from PokePaste")
    }

    return {
      activePokemonId: this.store.team().activePokemon()?.id,
      teamIndex: this.store.teams().findIndex(t => t.id === this.store.team().id)
    }
  }

  ensureCorrectTeamCount() {
    const teams = this.store.teams()
    const remainder = teams.length % 4
    let teamsToAdd = 0

    if (remainder !== 0) {
      teamsToAdd = 4 - remainder
    } else if (teams.filter(t => t.isEmpty()).length < 2) {
      teamsToAdd = 4
    }

    if (teamsToAdd > 0) {
      const teamNumber = teams.length + 1

      for (let index = 0; index < teamsToAdd; index++) {
        this.store.addTeam(new Team(uuid(), false, `Team ${teamNumber + index}`, []))
      }
    }
  }

  moveEmptyListsToEnd(a: Team, b: Team): number {
    if (!a.isEmpty() === !b.isEmpty()) return 0

    return a.isEmpty() ? 1 : -1
  }

  cleanTeamsInChunks(teams: Team[]): Team[] {
    const result = [...teams]

    for (let i = 0; i <= result.length - 4;) {
      const chunk = result.slice(i, i + 4)
      const allDefault = chunk.every(team => team.isEmpty())

      const hasMoreAfterChunk = i + 4 < result.length

      const hasPrevChunk = i >= 4
      const prevChunk = hasPrevChunk ? result.slice(i - 4, i) : []
      const prevHasDefault = prevChunk.some(team => team.isEmpty())

      if (allDefault && (hasMoreAfterChunk || (hasPrevChunk && prevHasDefault))) {
        result.splice(i, 4)
      } else {
        i += 4
      }
    }

    return result
  }
}
