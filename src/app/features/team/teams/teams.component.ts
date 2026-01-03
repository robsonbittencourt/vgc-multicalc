import { animate, style, transition, trigger } from "@angular/animations"
import { Component, computed, effect, HostListener, inject, input, OnInit, output, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatIcon } from "@angular/material/icon"
import { MatFormField, MatInput } from "@angular/material/input"
import { HiddenDirective } from "@basic/hidden-keepiing/hidden.directive"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { TeamBoxComponent } from "@features/team/team-box/team-box.component"
import { defaultPokemon } from "@lib/default-pokemon"
import { Pokemon } from "@lib/model/pokemon"
import { Team } from "@lib/model/team"
import { TeamMember } from "@lib/model/team-member"
import { SnackbarService } from "@lib/snackbar.service"
import { ExportPokeService } from "@lib/user-data/export-poke.service"
import { v4 as uuidv4 } from "uuid"

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
  imports: [WidgetComponent, MatFormField, MatInput, FormsModule, MatButton, MatIcon, TeamBoxComponent, WidgetComponent, ImportPokemonButtonComponent, HiddenDirective],
  animations: [trigger("fadeInAnimation", [transition(":increment", [style({ opacity: 0 }), animate("300ms ease-in", style({ opacity: 1 }))]), transition(":decrement", [style({ opacity: 0 }), animate("300ms ease-in", style({ opacity: 1 }))])])]
})
export class TeamsComponent implements OnInit {
  store = inject(CalculatorStore)
  private exportPokeService = inject(ExportPokeService)
  private snackBar = inject(SnackbarService)

  pokemonSelected = output<string>()
  secondTeamSelected = output<Team | null>()
  allowSecondTeamSelection = input<boolean>(false)

  secondTeamId = signal<string | null>(null)

  currentPage = signal(0)

  allTeamsFilled = computed(() => this.store.teams().filter(t => t.onlyHasDefaultPokemon()).length == 0)
  teamsCurrentPage = computed(() => this.store.teams().slice(this.currentPage() * 4, (this.currentPage() + 1) * 4))

  hiddenPrevButton = computed(() => this.currentPage() === 0)
  hiddenNextButton = computed(() => (this.currentPage() + 1) * 4 >= this.store.teams().length)

  constructor() {
    effect(() => {
      if (this.allTeamsFilled()) {
        const teamNumber = this.store.teams().length

        for (let index = 1; index < 5; index++) {
          this.store.addTeam(new Team(uuidv4(), false, `Team ${teamNumber + index}`, [new TeamMember(defaultPokemon(), true)]))
        }
      }
    })
  }

  ngOnInit() {
    const orderedTeams = this.store.teams().sort(this.moveEmptyListsToEnd)
    const newTeams = this.cleanTeamsInChunks(orderedTeams)
    this.store.updateTeams(newTeams)
    this.ensureCorrectTeamCount()
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
    const pokemonList = pokemon as Pokemon[]

    const teamSlotToImport = this.store.teams().find(t => t.onlyHasDefaultPokemon())!

    const teamMembers: TeamMember[] = []

    for (let index = 0; index < pokemonList.length; index++) {
      const pokemon = pokemonList[index]
      const active = index == 0
      teamMembers.push(new TeamMember(pokemon, active))
    }

    if (teamMembers.length < 6) {
      teamMembers.push(new TeamMember(defaultPokemon()))
    }

    const teamToImport = new Team(uuidv4(), teamSlotToImport.active, teamSlotToImport.name, teamMembers)
    this.store.replaceTeam(teamToImport, teamSlotToImport.id)

    const teamIndex = this.store.teams().findIndex(t => t.id == teamToImport.id)
    this.currentPage.set(Math.floor(teamIndex / 4))
    this.activateTeam(teamToImport)

    this.pokemonSelected.emit(teamToImport.activePokemon().id)

    this.snackBar.open("Team imported from PokePaste")
  }

  activateTeam(team: Team) {
    if (this.allowSecondTeamSelection() && this.secondTeamId() !== null) {
      this.secondTeamId.set(null)
      this.secondTeamSelected.emit(null)
    }
    this.store.activateTeam(team.id)
    this.pokemonSelected.emit(team.activePokemon().id)
  }

  activateSecondTeam(team: Team) {
    if (this.allowSecondTeamSelection() && !this.store.team().onlyHasDefaultPokemon()) {
      this.secondTeamId.set(team.id)
      this.secondTeamSelected.emit(team)
    }
  }

  isSecondTeam(team: Team): boolean {
    return this.allowSecondTeamSelection() && this.secondTeamId() === team.id
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && this.allowSecondTeamSelection() && this.secondTeamId() !== null) {
      this.secondTeamId.set(null)
      this.secondTeamSelected.emit(null)
    }
  }

  updateTeamName(event: Event) {
    const teamName = (event.target as HTMLInputElement).value
    this.store.updateActiveTeamName(teamName)
  }

  export() {
    const pokemon = this.store.team().teamMembers.map(tm => tm.pokemon)
    this.exportPokeService.export(this.store.team().name, ...pokemon)
  }

  deleteTeam() {
    const pokemon = defaultPokemon()
    const activeIndex = this.store.teams().findIndex(t => t.active)
    const inactiveTeams = this.store.teams().filter(t => !t.active)
    const newTeam = new Team(uuidv4(), true, `Team ${activeIndex + 1}`, [new TeamMember(pokemon, true)])
    inactiveTeams.splice(activeIndex, 0, newTeam)

    this.store.updateTeams(inactiveTeams)
    this.pokemonSelected.emit(newTeam.activePokemon().id)

    this.snackBar.open("Team deleted")
  }

  private ensureCorrectTeamCount() {
    const remainder = this.store.teams().length % 4

    if (remainder !== 0) {
      const teamsToAdd = 4 - remainder
      const teamNumber = this.store.teams().length + 1

      for (let index = 0; index < teamsToAdd; index++) {
        this.store.addTeam(new Team(uuidv4(), false, `Team ${teamNumber + index}`, [new TeamMember(defaultPokemon(), true)]))
      }
    }
  }

  private activateFirstTeamByPage() {
    const team = this.store.teams()[this.currentPage() * 4]
    this.activateTeam(team)
  }

  private moveEmptyListsToEnd(a: Team, b: Team): number {
    if (a.onlyHasDefaultPokemon() === b.onlyHasDefaultPokemon()) return 0

    return a.onlyHasDefaultPokemon() ? 1 : -1
  }

  private cleanTeamsInChunks(teams: Team[]): Team[] {
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
