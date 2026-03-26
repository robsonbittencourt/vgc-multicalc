import { Component, computed, inject, input, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatFormField } from "@angular/material/form-field"
import { MatIcon } from "@angular/material/icon"
import { MatInput } from "@angular/material/input"
import { CalculatorStore } from "@data/store/calculator-store"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { TeamBoxComponent } from "@features/team/team-box/team-box.component"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamsService } from "@features/team/teams.service"

@Component({
  selector: "app-teams-mobile",
  templateUrl: "./teams-mobile.component.html",
  styleUrls: ["./teams-mobile.component.scss"],
  imports: [MatFormField, MatInput, FormsModule, MatButton, MatIcon, TeamBoxComponent, ImportPokemonButtonComponent]
})
export class TeamsMobileComponent {
  store = inject(CalculatorStore)
  private teamsService = inject(TeamsService)

  pokemonSelected = output<string>()
  useTeam = output<string>()
  secondTeamSelected = output<Team | null>()
  allowSecondTeamSelection = input<boolean>(false)

  secondTeamId = signal<string | null>(null)

  canDelete = computed(() => {
    const activeTeam = this.store.team()
    const teams = this.store.teams()

    if (!activeTeam.onlyHasDefaultPokemon()) return true

    return teams.length > 1
  })

  visibleTeams = computed(() => {
    return this.store.teams()
  })

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const result = this.teamsService.pokemonImported(pokemon, true)
    this.pokemonSelected.emit(result.activePokemonId)
  }

  activateTeam(team: Team) {
    if (this.allowSecondTeamSelection() && this.secondTeamId() !== null) {
      this.secondTeamId.set(null)
      this.secondTeamSelected.emit(null)
    }

    const activePokemonId = this.teamsService.activateTeam(team)
    this.pokemonSelected.emit(activePokemonId)
  }

  activateSecondTeam(team: Team) {
    const secondTeam = this.teamsService.activateSecondTeam(team, this.allowSecondTeamSelection(), id => this.secondTeamId.set(id))

    if (secondTeam) {
      this.secondTeamSelected.emit(secondTeam)
    }
  }

  isSecondTeam(team: Team): boolean {
    return this.allowSecondTeamSelection() && this.secondTeamId() === team.id
  }

  updateTeamName(event: Event) {
    const teamName = (event.target as HTMLInputElement).value
    this.teamsService.updateTeamName(teamName)
  }

  export() {
    this.teamsService.export(this.store.team())
  }

  deleteTeam() {
    const activePokemonId = this.teamsService.deleteTeam(true)
    this.pokemonSelected.emit(activePokemonId)
  }

  addNewTeam() {
    const activePokemonId = this.teamsService.addNewTeam()
    this.pokemonSelected.emit(activePokemonId)
    this.useTeam.emit(activePokemonId)
  }
}
