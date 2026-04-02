import { Component, computed, effect, inject, input, OnInit, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton, MatIconButton } from "@angular/material/button"
import { MatFormField } from "@angular/material/form-field"
import { MatIcon } from "@angular/material/icon"
import { MatInput } from "@angular/material/input"
import { HiddenDirective } from "@basic/hidden-keepiing/hidden.directive"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { TeamBoxComponent } from "@features/team/team-box/team-box.component"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamsService } from "@features/team/teams.service"

@Component({
  selector: "app-teams-desktop",
  templateUrl: "./teams-desktop.component.html",
  styleUrls: ["./teams-desktop.component.scss"],
  imports: [WidgetComponent, MatFormField, MatInput, FormsModule, MatButton, MatIconButton, MatIcon, TeamBoxComponent, ImportPokemonButtonComponent, HiddenDirective]
})
export class TeamsDesktopComponent implements OnInit {
  store = inject(CalculatorStore)
  private teamsService = inject(TeamsService)

  pokemonSelected = output<string>()
  useTeam = output<string>()
  secondTeamSelected = output<Team | null>()
  allowSecondTeamSelection = input<boolean>(false)

  secondTeamId = signal<string | null>(null)
  currentPage = signal(0)

  teamsCurrentPage = computed(() => this.store.teams().slice(this.currentPage() * 4, (this.currentPage() + 1) * 4))
  hiddenPrevButton = computed(() => this.currentPage() === 0)
  hiddenNextButton = computed(() => (this.currentPage() + 1) * 4 >= this.store.teams().length)

  constructor() {
    effect(() => {
      const teams = this.store.teams()
      const emptyTeamsGroups = teams.filter(t => t.onlyHasDefaultPokemon())

      if (emptyTeamsGroups.length < 2) {
        this.teamsService.ensureCorrectTeamCount()
      }
    })
  }

  ngOnInit() {
    const orderedTeams = [...this.store.teams()].sort(this.teamsService.moveEmptyListsToEnd)
    const newTeams = this.teamsService.cleanTeamsInChunks(orderedTeams)
    this.store.updateTeams(newTeams)
    this.teamsService.ensureCorrectTeamCount()
  }

  nextPage() {
    this.currentPage.set(this.currentPage() + 1)
    this.activateFirstTeamByPage()
  }

  prevPage() {
    this.currentPage.set(this.currentPage() - 1)
    this.activateFirstTeamByPage()
  }

  pokemonImported(pokemon: Pokemon | Pokemon[]) {
    const result = this.teamsService.pokemonImported(pokemon, false)
    this.currentPage.set(Math.floor(result.teamIndex / 4))
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
    const activePokemonId = this.teamsService.deleteTeam(false)
    this.pokemonSelected.emit(activePokemonId)
  }

  private activateFirstTeamByPage() {
    const team = this.store.teams()[this.currentPage() * 4]
    this.activateTeam(team)
  }
}
