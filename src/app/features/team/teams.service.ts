import { inject, Injectable } from "@angular/core"
import { CalculatorStore } from "@data/store/calculator-store"
import { defaultPokemon } from "@lib/default-pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { Pokemon } from "@lib/model/pokemon"
import { SnackbarService } from "@lib/snackbar.service"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { v4 as uuidv4 } from "uuid"

@Injectable({
  providedIn: "root"
})
export class TeamsService {
  private store = inject(CalculatorStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  activateTeam(team: Team) {
    this.store.activateTeam(team.id)
    return team.activePokemon().id
  }

  activateSecondTeam(team: Team, allowSecondTeamSelection: boolean, secondTeamIdSetter: (id: string | null) => void) {
    if (allowSecondTeamSelection && !this.store.team().onlyHasDefaultPokemon()) {
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
    this.exportPokeService.export(team.name, ...pokemon)
  }

  addNewTeam() {
    const teams = this.store.teams()
    const lastTeam = teams.length > 0 ? teams[teams.length - 1] : null

    if (lastTeam && lastTeam.onlyHasDefaultPokemon()) {
      this.activateTeam(lastTeam)
    } else {
      const newTeam = new Team(uuidv4(), false, `Team ${teams.length + 1}`, [new TeamMember(defaultPokemon(), true)])
      this.store.addTeam(newTeam)
      this.activateTeam(newTeam)
    }

    return this.store.team().activePokemon().id
  }

  deleteTeam(isMobile: boolean) {
    if (isMobile) {
      const activeTeamId = this.store.team().id
      const allTeams = this.store.teams()
      const newTeams = allTeams.filter(t => t.id !== activeTeamId)

      if (newTeams.length === 0) {
        const newTeam = new Team(uuidv4(), true, `Team ${newTeams.length + 1}`, [new TeamMember(defaultPokemon(), true)])
        this.store.updateTeams([newTeam])
      } else {
        this.store.updateTeams(newTeams)
        const teamToActivate = newTeams[0]
        this.store.activateTeam(teamToActivate.id)
      }
    } else {
      const pokemon = defaultPokemon()
      const activeIndex = this.store.teams().findIndex(t => t.active)
      const inactiveTeams = this.store.teams().filter(t => !t.active)
      const newTeam = new Team(uuidv4(), true, `Team ${activeIndex + 1}`, [new TeamMember(pokemon, true)])
      inactiveTeams.splice(activeIndex, 0, newTeam)

      this.store.updateTeams(inactiveTeams)
    }

    if (!isMobile) {
      this.snackBar.open("Team deleted")
    }

    return this.store.team().activePokemon().id
  }

  pokemonImported(pokemon: Pokemon | Pokemon[], isMobile: boolean) {
    const pokemonList = Array.isArray(pokemon) ? pokemon : [pokemon]
    const teamMembers: TeamMember[] = []

    for (let index = 0; index < pokemonList.length; index++) {
      const pokemon = pokemonList[index]
      const active = index === 0
      teamMembers.push(new TeamMember(pokemon, active))
    }

    if (teamMembers.length < 6) {
      teamMembers.push(new TeamMember(defaultPokemon()))
    }

    if (isMobile) {
      const newTeam = new Team(uuidv4(), false, `Team ${this.store.teams().length + 1}`, teamMembers)
      this.store.addTeam(newTeam)
      this.activateTeam(newTeam)
    } else {
      const teamSlotToImport = this.store.teams().find(t => t.onlyHasDefaultPokemon())!
      const teamToImport = new Team(uuidv4(), teamSlotToImport.active, teamSlotToImport.name, teamMembers)
      this.store.replaceTeam(teamToImport, teamSlotToImport.id)
      this.activateTeam(teamToImport)
    }

    if (!isMobile) {
      this.snackBar.open("Team imported from PokePaste")
    }

    return {
      activePokemonId: this.store.team().activePokemon().id,
      teamIndex: this.store.teams().findIndex(t => t.id === this.store.team().id)
    }
  }

  ensureCorrectTeamCount() {
    const remainder = this.store.teams().length % 4

    if (remainder !== 0) {
      const teamsToAdd = 4 - remainder
      const teamNumber = this.store.teams().length + 1

      for (let index = 0; index < teamsToAdd; index++) {
        this.store.addTeam(new Team(uuidv4(), false, `Team ${teamNumber + index}`, [new TeamMember(defaultPokemon(), true)]))
      }
    }
  }

  moveEmptyListsToEnd(a: Team, b: Team): number {
    if (a.onlyHasDefaultPokemon() === b.onlyHasDefaultPokemon()) return 0

    return a.onlyHasDefaultPokemon() ? 1 : -1
  }

  cleanTeamsInChunks(teams: Team[]): Team[] {
    const result = [...teams]

    for (let i = 0; i <= result.length - 4; ) {
      const chunk = result.slice(i, i + 4)
      const allDefault = chunk.every(team => team.onlyHasDefaultPokemon())

      const hasMoreAfterChunk = i + 4 < result.length

      const hasPrevChunk = i >= 4
      const prevChunk = hasPrevChunk ? result.slice(i - 4, i) : []
      const prevHasNonDefault = prevChunk.some(team => team.onlyHasDefaultPokemon())

      if (allDefault && (hasMoreAfterChunk || (hasPrevChunk && prevHasNonDefault))) {
        result.splice(i, 4)
      } else {
        i += 4
      }
    }

    return result
  }
}
