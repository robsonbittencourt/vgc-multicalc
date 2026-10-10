import { DatePipe, Location } from "@angular/common"
import { Component, computed, inject, linkedSignal, resource, signal } from "@angular/core"
import { toSignal } from "@angular/core/rxjs-interop"
import { MatButton } from "@angular/material/button"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { ActivatedRoute, Router } from "@angular/router"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { PastePageComponent } from "@pages/paste/paste-page.component"
import { calcTeamPokemon, CommunityTeamView, toCommunityTeamView } from "@pages/community-teams/community-team-view"
import { TeamsService } from "@features/team/teams.service"
import { CalcStore } from "@store/calc-store"
import { DeviceDetectorService } from "@app/services/device-detector.service"
import { SnackbarService } from "@app/services/snackbar.service"
import { CopyButtonComponent } from "@shared/copy-button/copy-button.component"
import { InputComponent } from "@shared/input/input.component"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { PasteCardComponent } from "@shared/paste-card/paste-card.component"
import { SegmentedControlComponent, SegmentedOption } from "@shared/segmented-control/segmented-control.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CommunityTeamSummary } from "@data/community-teams/community-team-data"
import { getItemData } from "@data/item-data"
import { CommunityTeamPlacement, CommunityTeamsRepository, communityTeamEvents, communityTeamPokemon, filterCommunityTeams, pageCount, pageItems } from "@multicalc/community-teams"
import { PasteService } from "@app/services/paste.service"

type TeamsView = "compact" | "detailed"

const COMPACT_PAGE_SIZE = 20
const DETAILED_PAGE_SIZE = 3
const PASTE_PARAM = "paste"
const MAX_POKEMON_FILTERS = 6

@Component({
  selector: "app-community-teams",
  imports: [
    MatCheckbox,
    WidgetComponent,
    InputComponent,
    InputSelectComponent,
    InputAutocompleteComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatButton,
    PokemonSpriteComponent,
    PasteCardComponent,
    CopyButtonComponent,
    SegmentedControlComponent,
    PastePageComponent,
    MatIcon,
    DatePipe
  ],
  templateUrl: "./community-teams.component.html",
  styleUrl: "./community-teams.component.scss"
})
export class CommunityTeamsComponent {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private location = inject(Location)
  private pasteService = inject(PasteService)
  private teamsService = inject(TeamsService)
  private store = inject(CalcStore)
  private deviceDetector = inject(DeviceDetectorService)
  private snackBar = inject(SnackbarService)
  private repository = new CommunityTeamsRepository()

  private queryParams = toSignal(this.route.queryParamMap)
  private openedFromList = false

  openPasteId = computed(() => this.queryParams()?.get(PASTE_PARAM) ?? null)

  readonly regulationOptions = this.repository.regulationIds().map(id => ({ key: `Regulation ${id}`, value: id }))

  readonly viewOptions: SegmentedOption<TeamsView>[] = [
    { value: "compact", label: "Compact", dataCy: "teams-view-compact" },
    { value: "detailed", label: "Detailed", dataCy: "teams-view-detailed" }
  ]

  view = signal<TeamsView>("compact")
  regulation = signal(this.regulationOptions[0].value)
  teamQuery = signal("")
  creatorQuery = signal("")
  event = signal("")
  placement = signal<CommunityTeamPlacement>("all")
  withReplicaCode = signal(false)
  withSps = signal(false)
  pokemonFilters = signal<string[]>([""])

  page = signal(1)

  pageSize = computed(() => (this.view() === "compact" ? COMPACT_PAGE_SIZE : DETAILED_PAGE_SIZE))
  private regulationTeams = resource({
    params: () => this.regulation(),
    loader: ({ params }) => this.repository.teams(params)
  })

  teams = linkedSignal<CommunityTeamSummary[] | undefined, CommunityTeamSummary[]>({
    source: () => (this.regulationTeams.hasValue() ? this.regulationTeams.value() : undefined),
    computation: (teams, previous) => teams ?? previous?.value ?? []
  })

  eventOptions = computed(() => [{ key: "All Events", value: "" }, ...communityTeamEvents(this.teams()).map(event => ({ key: event, value: event }))])

  pokemonOptions = computed(() => communityTeamPokemon(this.teams()))
  canAddPokemonFilter = computed(() => this.pokemonFilters().length < MAX_POKEMON_FILTERS)

  filteredTeams = computed(() =>
    filterCommunityTeams(this.teams(), {
      team: this.teamQuery(),
      creator: this.creatorQuery(),
      event: this.event() || undefined,
      placement: this.placement(),
      withReplicaCode: this.withReplicaCode(),
      withSps: this.withSps(),
      pokemon: this.pokemonFilters().filter(Boolean)
    })
  )

  noTeamsMatch = computed(() => !this.filteredTeams().length && !!this.teams().length)
  pageCount = computed(() => pageCount(this.filteredTeams().length, this.pageSize()))
  pageTeams = computed(() => pageItems(this.filteredTeams(), this.page(), this.pageSize()))

  private pageSets = resource({
    params: () => (this.view() === "detailed" && this.pageTeams().length ? { regulation: this.regulation(), teams: this.pageTeams() } : undefined),
    loader: ({ params }) => this.repository.sets(params.regulation, params.teams)
  })

  detailedTeams = linkedSignal<CommunityTeamView[] | undefined, CommunityTeamView[]>({
    source: () => {
      const sets = this.pageSets.hasValue() ? this.pageSets.value() : undefined
      const teams = this.pageTeams()

      return sets && teams.every(team => sets[team.id]) ? teams.map(team => toCommunityTeamView(team, sets[team.id])) : undefined
    },
    computation: (teams, previous) => teams ?? previous?.value ?? []
  })

  loadFailed = computed(() => this.regulationTeams.status() === "error" || this.pageSets.status() === "error")

  itemSprite(item: string | undefined): string | undefined {
    return item ? getItemData(item)?.sprite : undefined
  }

  async copyToMyTeams(team: CommunityTeamSummary) {
    const pokemon = await this.calcPokemon(team)
    const isMobile = !this.deviceDetector.isDesktop()

    if (!isMobile) this.teamsService.ensureCorrectTeamCount()

    this.teamsService.pokemonImported(pokemon, isMobile, team.description)
    this.snackBar.open("Team added to My Teams")
  }

  private async calcPokemon(team: CommunityTeamSummary) {
    const sets = await this.repository.sets(this.regulation(), [team])

    return calcTeamPokemon(team, sets[team.id] ?? [])
  }

  async copyToOpponents(team: CommunityTeamSummary) {
    const imported = this.store.transientTeams().find(transient => transient.name === team.description)

    if (imported) {
      this.store.setTeamFilter(imported.id)
    } else {
      this.teamsService.pokemonImportedAsOpponents(await this.calcPokemon(team), team.description)
    }

    this.snackBar.open("Team added to Opponents")
  }

  pasteLink(pasteId: string): string {
    return this.pasteService.link(pasteId)
  }

  changeRegulation(regulation: string) {
    this.regulation.set(regulation)
    this.event.set("")
    this.pokemonFilters.set([""])
    this.page.set(1)
  }

  changeTeamQuery(query: string) {
    this.teamQuery.set(query)
    this.page.set(1)
  }

  changeCreatorQuery(query: string) {
    this.creatorQuery.set(query)
    this.page.set(1)
  }

  changeEvent(event: string) {
    this.event.set(event)
    this.page.set(1)
  }

  changePlacement(placement: CommunityTeamPlacement) {
    this.placement.set(placement)
    this.page.set(1)
  }

  changeWithReplicaCode(checked: boolean) {
    this.withReplicaCode.set(checked)
    this.page.set(1)
  }

  changeWithSps(checked: boolean) {
    this.withSps.set(checked)
    this.page.set(1)
  }

  changePokemonFilter(index: number, pokemon: string) {
    this.pokemonFilters.set(this.pokemonFilters().map((current, position) => (position === index ? pokemon : current)))
    this.page.set(1)
  }

  addPokemonFilter() {
    if (this.canAddPokemonFilter()) this.pokemonFilters.set([...this.pokemonFilters(), ""])
  }

  removePokemonFilter(index: number) {
    const filters = this.pokemonFilters()

    this.pokemonFilters.set(filters.length > 1 ? filters.filter((_, position) => position !== index) : [""])
    this.page.set(1)
  }

  changeView(view: TeamsView) {
    const firstIndex = (this.page() - 1) * this.pageSize()

    this.view.set(view)
    this.page.set(Math.floor(firstIndex / this.pageSize()) + 1)
  }

  openPaste(team: Pick<CommunityTeamSummary, "pasteId">) {
    this.openedFromList = true
    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: team.pasteId }, queryParamsHandling: "merge" })
  }

  closePaste() {
    if (this.openedFromList) {
      this.openedFromList = false
      this.location.back()
      return
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: null }, queryParamsHandling: "merge", replaceUrl: true })
  }

  previousPage() {
    this.page.set(Math.max(1, this.page() - 1))
  }

  nextPage() {
    this.page.set(Math.min(this.pageCount(), this.page() + 1))
  }
}
