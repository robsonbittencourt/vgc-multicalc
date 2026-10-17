import { DatePipe, DOCUMENT, isPlatformBrowser, Location, NgTemplateOutlet } from "@angular/common"
import { afterNextRender, Component, computed, DestroyRef, effect, inject, Injector, linkedSignal, PLATFORM_ID, resource, signal, untracked } from "@angular/core"
import { toSignal } from "@angular/core/rxjs-interop"
import { MatButton } from "@angular/material/button"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { ActivatedRoute, Router } from "@angular/router"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { PastePageComponent } from "@pages/paste/paste-page.component"
import { calcTeamPokemon, CommunityTeamView, pasteCalcPokemon, toCommunityTeamView, toSubmittedTeamView } from "@pages/community-teams/community-team-view"
import { CommunityTeamSubmitComponent } from "@pages/community-teams/community-team-submit.component"
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
import { ActionSheetComponent } from "@shared/action-sheet/action-sheet.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CommunityTeamSummary, SubmittedTeam, VgcPastesTeam } from "@data/community-teams/community-team-data"
import { getItemData } from "@data/item-data"
import {
  CommunityTeamOrigin,
  CommunityTeamPlacement,
  CommunityTeamsRepository,
  CommunityTeamListParams,
  communityTeamEvents,
  communityTeamListParams,
  communityTeamListState,
  communityTeamPokemon,
  filterCommunityTeams,
  isSubmittedTeam,
  matchesSearch,
  mergeCommunityTeams,
  mostUsedTeams,
  pageCount,
  pageItems
} from "@multicalc/community-teams"
import { CommunityTeamsService } from "@app/services/community-teams.service"
import { TeamUsageService } from "@app/services/team-usage.service"
import { PasteService } from "@app/services/paste.service"
import { isSharedTeam, SharedTeam } from "@store/paste/shared-team"

type TeamsView = "compact" | "detailed"

const PAGE_SIZE_OPTIONS: Record<TeamsView, number[]> = { compact: [20, 50, 100], detailed: [5, 10, 50] }
const PASTE_PARAM = "paste"
const SUBMIT_PARAM = "submit"
const FILTERS_PARAM = "filters"
const MAX_POKEMON_FILTERS = 6
const MOBILE_PAGE_SIZE = 10
const SIDE_TEAMS = 3
const RECENT_EVENTS = 4
const ORIGIN_LABELS: Record<CommunityTeamOrigin, string> = { all: "", vgcpastes: "VGCPastes", community: "Community" }
const PLACEMENT_LABELS: Record<CommunityTeamPlacement, string> = { all: "", top8: "Top 8", winners: "Winners" }

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
    CommunityTeamSubmitComponent,
    ActionSheetComponent,
    MatIcon,
    NgTemplateOutlet,
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
  communityTeams = inject(CommunityTeamsService)
  private teamUsage = inject(TeamUsageService)
  private teamsService = inject(TeamsService)
  private store = inject(CalcStore)
  private deviceDetector = inject(DeviceDetectorService)
  private snackBar = inject(SnackbarService)
  private repository = new CommunityTeamsRepository()

  private queryParams = toSignal(this.route.queryParamMap)
  private openedFromList = false
  private injector = inject(Injector)
  private document = inject(DOCUMENT)
  private listScrollY: number | null = null
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  openPasteId = computed(() => this.queryParams()?.get(PASTE_PARAM) ?? null)
  submitOpen = computed(() => !this.openPasteId() && !!this.queryParams()?.has(SUBMIT_PARAM))
  detailOpen = computed(() => !!this.openPasteId() || this.submitOpen())

  readonly regulationOptions = this.repository.regulationIds().map(id => ({ key: `Regulation ${id}`, value: id }))

  readonly submissionRegulation = this.regulationOptions[0].value

  private readonly linkedFilters = communityTeamListState(this.route.snapshot.queryParams, this.repository.regulationIds())
  private readonly openedOnMobile = !this.deviceDetector.isDesktop()

  readonly viewOptions: SegmentedOption<TeamsView>[] = [
    { value: "compact", label: "Compact", dataCy: "teams-view-compact" },
    { value: "detailed", label: "Detailed", dataCy: "teams-view-detailed" }
  ]

  view = signal<TeamsView>("compact")
  regulation = signal(this.linkedFilters.regulation)
  teamQuery = signal(this.openedOnMobile ? "" : this.linkedFilters.team || this.linkedFilters.search)
  creatorQuery = signal(this.openedOnMobile ? "" : this.linkedFilters.creator)
  origin = signal<CommunityTeamOrigin>(this.linkedFilters.origin)
  event = signal(this.linkedFilters.event)
  placement = signal<CommunityTeamPlacement>(this.linkedFilters.placement)
  withReplicaCode = signal(this.linkedFilters.withReplicaCode)
  withSps = signal(this.linkedFilters.withSps)
  pokemonFilters = signal<string[]>(this.linkedFilters.pokemon)

  page = signal(1)

  confirmingDelete = signal<string | null>(null)
  removing = signal(false)

  private recentSubmissions = signal<SubmittedTeam[]>([])
  private removedPasteIds = signal<string[]>([])

  pageSizes = signal<Record<TeamsView, number>>({ compact: PAGE_SIZE_OPTIONS.compact[0], detailed: PAGE_SIZE_OPTIONS.detailed[0] })
  pageSize = computed(() => this.pageSizes()[this.view()])
  pageSizeOptions = computed(() => PAGE_SIZE_OPTIONS[this.view()].map(size => String(size)))
  private regulationTeams = resource({
    params: () => this.regulation(),
    loader: async ({ params }) => {
      const [vgcPastesTeams, submittedTeams] = await Promise.all([this.repository.teams(params), this.communityTeams.submittedTeams(params)])

      return mergeCommunityTeams(vgcPastesTeams, submittedTeams)
    }
  })

  teams = linkedSignal<CommunityTeamSummary[] | undefined, CommunityTeamSummary[]>({
    source: () => (this.regulationTeams.hasValue() ? this.visibleTeams(this.regulationTeams.value()) : undefined),
    computation: (teams, previous) => teams ?? previous?.value ?? []
  })

  private visibleTeams(teams: CommunityTeamSummary[]): CommunityTeamSummary[] {
    const removed = this.removedPasteIds()
    const recent = this.recentSubmissions().filter(team => team.regulation === this.regulation() && !teams.some(current => current.pasteId === team.pasteId))
    const submittedTeams = [...teams.filter(isSubmittedTeam), ...recent].filter(team => !removed.includes(team.pasteId))

    return mergeCommunityTeams(
      teams.filter(team => !isSubmittedTeam(team)),
      submittedTeams
    )
  }

  eventOptions = computed(() => [{ key: "All Events", value: "" }, ...communityTeamEvents(this.teams()).map(event => ({ key: event, value: event }))])

  recentTeams = computed(() =>
    this.teams()
      .filter(isSubmittedTeam)
      .sort((first, second) => second.date.localeCompare(first.date))
      .slice(0, SIDE_TEAMS)
  )

  recentEvents = computed(() => communityTeamEvents(this.teams().filter(team => !isSubmittedTeam(team))).slice(0, RECENT_EVENTS))
  private allTeams = resource({
    params: () => (this.teams().length ? true : undefined),
    loader: async () => (await Promise.all(this.repository.regulationIds().map(async regulation => mergeCommunityTeams(await this.repository.teams(regulation), await this.communityTeams.submittedTeams(regulation))))).flat()
  })

  private mostViewedUses = resource({
    loader: () => this.teamUsage.mostViewed()
  })

  submissionEvents = computed(() => {
    const teams = this.allTeams.hasValue() ? this.allTeams.value() : this.teams()

    return communityTeamEvents(teams.filter(team => team.regulation === this.submissionRegulation))
  })

  mostViewedTeams = computed(() => {
    const removed = this.removedPasteIds()
    const teams = [...(this.allTeams.hasValue() ? this.allTeams.value() : []), ...this.recentSubmissions()].filter(team => !removed.includes(team.pasteId))

    return mostUsedTeams(this.mostViewedUses.hasValue() ? this.mostViewedUses.value() : [], teams, SIDE_TEAMS)
  })

  pokemonOptions = computed(() => communityTeamPokemon(this.teams()))
  canAddPokemonFilter = computed(() => this.pokemonFilters().length < MAX_POKEMON_FILTERS)

  isMobile = computed(() => !this.deviceDetector.isDesktop())
  searchQuery = signal(this.openedOnMobile ? this.linkedFilters.search || this.linkedFilters.creator || this.linkedFilters.team : "")
  filtersOpen = computed(() => this.isMobile() && !this.detailOpen() && !!this.queryParams()?.has(FILTERS_PARAM))
  private filtersOpenedHere = false

  filteredTeams = computed(() => {
    const filter = {
      team: this.isMobile() ? "" : this.teamQuery(),
      creator: this.isMobile() ? "" : this.creatorQuery(),
      origin: this.origin(),
      event: this.event() || undefined,
      placement: this.placement(),
      withReplicaCode: this.withReplicaCode(),
      withSps: this.withSps(),
      pokemon: this.pokemonFilters().filter(Boolean)
    }

    const teams = filterCommunityTeams(this.teams(), filter)

    return this.isMobile() && this.searchQuery() ? teams.filter(team => matchesSearch(team, this.searchQuery())) : teams
  })

  mobileTeams = computed(() => this.filteredTeams().slice(0, this.page() * MOBILE_PAGE_SIZE))
  canShowMore = computed(() => this.mobileTeams().length < this.filteredTeams().length)

  activeFilterCount = computed(() => [this.origin() !== "all", !!this.event(), this.placement() !== "all", this.withReplicaCode(), this.withSps()].filter(Boolean).length + this.pokemonFilters().filter(Boolean).length)

  filterSummary = computed(() =>
    [`Regulation ${this.regulation()}`, ORIGIN_LABELS[this.origin()], this.event(), PLACEMENT_LABELS[this.placement()], this.withReplicaCode() ? "Replica Code" : "", this.withSps() ? "SPs" : "", ...this.pokemonFilters()].filter(Boolean).join(", ")
  )

  private listParams = computed(() =>
    communityTeamListParams(
      {
        regulation: this.regulation(),
        team: this.isMobile() ? "" : this.teamQuery(),
        creator: this.isMobile() ? "" : this.creatorQuery(),
        search: this.isMobile() ? this.searchQuery() : "",
        origin: this.origin(),
        event: this.event(),
        placement: this.placement(),
        withReplicaCode: this.withReplicaCode(),
        withSps: this.withSps(),
        pokemon: this.pokemonFilters()
      },
      this.submissionRegulation
    )
  )

  noTeamsMatch = computed(() => !this.filteredTeams().length && !!this.teams().length)
  pageCount = computed(() => pageCount(this.filteredTeams().length, this.pageSize()))
  pageTeams = computed(() => pageItems(this.filteredTeams(), this.page(), this.pageSize()))

  private pageViews = resource({
    params: () => (this.view() === "detailed" && this.pageTeams().length ? { regulation: this.regulation(), teams: this.pageTeams() } : undefined),
    loader: ({ params }) => this.teamViews(params.regulation, params.teams)
  })

  detailedTeams = linkedSignal<CommunityTeamView[] | undefined, CommunityTeamView[]>({
    source: () => {
      const views = this.pageViews.hasValue() ? this.pageViews.value() : undefined
      const teams = this.pageTeams()

      return views && teams.every(team => views[team.id]) ? teams.map(team => views[team.id]) : undefined
    },
    computation: (teams, previous) => teams ?? previous?.value ?? []
  })

  loadFailed = computed(() => this.regulationTeams.status() === "error" || this.pageViews.status() === "error")

  private async teamViews(regulation: string, teams: CommunityTeamSummary[]): Promise<Record<string, CommunityTeamView>> {
    const vgcPastesTeams = teams.filter((team): team is VgcPastesTeam => !isSubmittedTeam(team))
    const sets = vgcPastesTeams.length ? await this.repository.sets(regulation, vgcPastesTeams) : {}
    const submittedViews = await Promise.all(teams.filter(isSubmittedTeam).map(async team => toSubmittedTeamView(team, await this.sharedTeam(team.pasteId))))

    return Object.fromEntries([...vgcPastesTeams.map(team => toCommunityTeamView(team, sets[team.id])), ...submittedViews].map(view => [view.id, view]))
  }

  private async sharedTeam(pasteId: string): Promise<SharedTeam | null> {
    const paste = await this.pasteService.get(pasteId).catch(() => null)

    return isSharedTeam(paste) ? paste : null
  }

  itemSprite(item: string | undefined): string | undefined {
    return item ? getItemData(item)?.sprite : undefined
  }

  cardDetails(team: CommunityTeamSummary): string {
    return [team.event, team.hasSps ? "SPs" : "", team.replicaCode ? "Replica" : ""].filter(Boolean).join(", ")
  }

  recordUse(pasteId: string) {
    this.teamUsage.recordUse(pasteId)
  }

  async copyToMyTeams(teamId: string) {
    const team = this.summary(teamId)

    this.recordUse(team.pasteId)
    const pokemon = await this.calcPokemon(team)
    const isMobile = !this.deviceDetector.isDesktop()

    if (!isMobile) this.teamsService.ensureCorrectTeamCount()

    this.teamsService.pokemonImported(pokemon, isMobile, team.description)
    this.snackBar.open("Team added to My Teams")
  }

  private summary(teamId: string): CommunityTeamSummary {
    return this.teams().find(team => team.id === teamId)!
  }

  private async calcPokemon(team: CommunityTeamSummary) {
    if (isSubmittedTeam(team)) {
      const paste = await this.sharedTeam(team.pasteId)

      return paste ? pasteCalcPokemon(paste) : []
    }

    const sets = await this.repository.sets(this.regulation(), [team])

    return calcTeamPokemon(team, sets[team.id] ?? [])
  }

  async copyToOpponents(teamId: string) {
    const team = this.summary(teamId)

    this.recordUse(team.pasteId)
    const imported = this.store.transientTeams().find(transient => transient.name === team.description)

    if (imported) {
      this.store.selectOpponentSource(imported.id)
    } else {
      this.teamsService.pokemonImportedAsOpponents(await this.calcPokemon(team), team.description)
    }

    this.snackBar.open("Team added to Opponents")
  }

  pasteLink(pasteId: string): string {
    return this.pasteService.link(pasteId)
  }

  showdownText(pasteId: string): () => Promise<string> {
    return async () => {
      this.recordUse(pasteId)

      const paste = await this.pasteService.get(pasteId)

      return paste && "showdown" in paste ? paste.showdown : ""
    }
  }

  changeRegulation(regulation: string) {
    this.regulation.set(regulation)
    this.event.set("")
    this.pokemonFilters.set([""])
    this.page.set(1)
  }

  changeSearch(query: string) {
    this.searchQuery.set(query)
    this.page.set(1)
  }

  closeKeyboard(event: Event) {
    ;(event.target as HTMLElement).blur()
  }

  openFilters() {
    this.filtersOpenedHere = true
    this.router.navigate([], { relativeTo: this.route, queryParams: { [FILTERS_PARAM]: "" }, queryParamsHandling: "merge" })
  }

  closeFilters() {
    if (this.filtersOpenedHere) {
      this.filtersOpenedHere = false
      this.location.back()
      return
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: { [FILTERS_PARAM]: null }, queryParamsHandling: "merge", replaceUrl: true })
  }

  clearFilters() {
    this.origin.set("all")
    this.event.set("")
    this.placement.set("all")
    this.withReplicaCode.set(false)
    this.withSps.set(false)
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

  changeOrigin(origin: CommunityTeamOrigin) {
    this.origin.set(origin)
    this.page.set(1)
  }

  changeEvent(event: string) {
    this.event.set(event)
    this.page.set(1)
  }

  eventLink(event: string): string {
    const queryParams = { reg: this.regulation() === this.submissionRegulation ? null : this.regulation(), event }

    return this.location.prepareExternalUrl(this.router.serializeUrl(this.router.createUrlTree(["/teams"], { queryParams })))
  }

  selectRecentEvent(click: MouseEvent, event: string) {
    if (click.ctrlKey || click.metaKey || click.shiftKey || click.button !== 0) return

    click.preventDefault()
    this.changeEvent(event)

    if (this.isMobile()) this.document.defaultView?.scrollTo({ top: 0 })
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
    this.keepFirstVisibleTeam(() => this.view.set(view))
  }

  private keepFirstVisibleTeam(change: () => void) {
    const firstIndex = (this.page() - 1) * this.pageSize()

    change()
    this.page.set(Math.floor(firstIndex / this.pageSize()) + 1)
  }

  changePageSize(size: string) {
    this.keepFirstVisibleTeam(() => this.pageSizes.update(sizes => ({ ...sizes, [this.view()]: Number(size) })))
  }

  constructor() {
    effect(() => this.lockPageScroll(this.filtersOpen()))
    effect(() => this.keepFiltersInUrl(this.listParams()))
    inject(DestroyRef).onDestroy(() => this.lockPageScroll(false))

    effect(() => {
      if (this.detailOpen() || this.listScrollY === null) return

      const top = this.listScrollY

      this.listScrollY = null
      afterNextRender(() => window.scrollTo({ top }), { injector: this.injector })
    })
  }

  private keepFiltersInUrl(params: CommunityTeamListParams) {
    const current = this.queryParams()

    if (!this.isBrowser || !current || Object.entries(params).every(([key, value]) => current.get(key) === value)) return

    untracked(() => this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: "merge", replaceUrl: true }))
  }

  private lockPageScroll(locked: boolean) {
    const overflow = locked ? "hidden" : ""

    this.document.documentElement.style.overflow = overflow
    this.document.body.style.overflow = overflow
  }

  openPaste(team: Pick<CommunityTeamSummary, "pasteId">) {
    this.recordUse(team.pasteId)
    this.openedFromList = true

    if (this.isMobile()) this.listScrollY = window.scrollY

    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: team.pasteId }, queryParamsHandling: "merge" }).then(() => {
      if (this.isMobile()) window.scrollTo({ top: 0 })
    })
  }

  openSubmit() {
    this.openedFromList = true
    this.router.navigate([], { relativeTo: this.route, queryParams: { [SUBMIT_PARAM]: "" }, queryParamsHandling: "merge" })
  }

  teamSubmitted(team: SubmittedTeam) {
    this.recentSubmissions.update(teams => [...teams, team])
    this.regulation.set(team.regulation)
    this.teamQuery.set("")
    this.creatorQuery.set(team.player)
    this.searchQuery.set(team.player)
    this.origin.set("community")
    this.event.set("")
    this.placement.set("all")
    this.withReplicaCode.set(false)
    this.withSps.set(false)
    this.pokemonFilters.set([""])
    this.page.set(1)
    this.snackBar.open("Team submitted")
    this.closeDetail()
  }

  canDelete(team: Pick<CommunityTeamSummary, "source" | "pasteId">): boolean {
    return team.source === "community" && this.communityTeams.canDelete(team.pasteId)
  }

  askDelete(pasteId: string) {
    this.confirmingDelete.set(pasteId)
  }

  cancelDelete() {
    this.confirmingDelete.set(null)
  }

  async deleteTeam(pasteId: string) {
    this.removing.set(true)

    try {
      await this.communityTeams.delete(pasteId)
      this.removedPasteIds.update(pasteIds => [...pasteIds, pasteId])
      this.snackBar.open("Team removed")
    } catch (error) {
      console.error(error)
      this.snackBar.open("Could not remove the team. Try again.")
    } finally {
      this.removing.set(false)
      this.confirmingDelete.set(null)
    }
  }

  closeDetail() {
    if (this.openedFromList) {
      this.openedFromList = false
      this.location.back()
      return
    }

    this.router.navigate([], { relativeTo: this.route, queryParams: { [PASTE_PARAM]: null, [SUBMIT_PARAM]: null }, queryParamsHandling: "merge", replaceUrl: true })
  }

  previousPage() {
    this.page.set(Math.max(1, this.page() - 1))
  }

  showMore() {
    this.page.update(page => page + 1)
  }

  nextPage() {
    this.page.set(Math.min(this.pageCount(), this.page() + 1))
  }
}
