import { computed, effect, inject, signal, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { InputAutocompleteComponent } from "@shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { MobileCreationFlowService } from "@features/team/creation-flow/mobile-creation-flow.service"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { Pokemon } from "@multicalc/model"
import { SnackbarService } from "@app/services/snackbar.service"
import { SpeedCalcService } from "@pages/speed-calc/speed-calc.service"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { HeaderVisibilityService } from "@app/services/header-visibility.service"

const SCROLL_DIRECTION_THRESHOLD = 8
const SCROLL_TOP_ZONE = 50
const SCROLL_REACTION_SUPPRESSION_MS = 400
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { MobileBuildEditingService } from "@features/pokemon-build/mobile-build-editing/mobile-build-editing.service"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { MobileCalcShellComponent } from "@shared/mobile-calc-shell/mobile-calc-shell.component"
import { PokemonSearchInputComponent } from "@shared/pokemon-search-input/pokemon-search-input.component"
import { CloseTableButtonComponent } from "@shared/close-table-button/close-table-button.component"

type SpeedCalcTab = "main" | "speed-insights" | "settings" | "teams"

@Component({
  selector: "app-speed-calc-mobile",
  templateUrl: "./speed-calc-mobile.component.html",
  styleUrls: ["./speed-calc-mobile.component.scss"],
  host: { "[class.header-hidden]": "headerVisibility.hidden()" },
  imports: [
    MobileCalcShellComponent,
    PokemonSearchInputComponent,
    CloseTableButtonComponent,
    InputSelectComponent,
    InputAutocompleteComponent,
    PokemonBuildMobileComponent,
    SpeedScaleComponent,
    FieldComponent,
    SpeedInsightsComponent,
    WidgetComponent,
    OpponentOptionsComponent,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    PokemonSpriteComponent,
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent,
    MobileTableOverlayComponent,
    MatSlideToggle
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileBuildEditingService, MobileCreationFlowService, { provide: FIELD_CONTEXT, useValue: "speed" }]
})
export class SpeedCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: PokemonSearchInputComponent
  @ViewChild("pokemonInputInsights") pokemonInputInsights?: PokemonSearchInputComponent
  @ViewChild("itemInput") itemInput?: PokemonSearchInputComponent

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  overlay = inject(MobileTableOverlayService)
  readonly buildEditing = inject(MobileBuildEditingService)
  creationFlow = inject(MobileCreationFlowService)
  private automaticFieldService = inject(AutomaticFieldService)
  private backNavigation = inject(BackNavigationService)
  headerVisibility = inject(HeaderVisibilityService)

  showBottomNav = signal(true)

  private lastScrollTop = 0
  private suppressScrollReactionUntil = 0
  private speedMatch = inject(SpeedMatchService)
  private speedCalcService = inject(SpeedCalcService)
  private snackbar = inject(SnackbarService)

  activeBottomTab = signal<SpeedCalcTab>("main")

  readonly tabs: CalcTab<SpeedCalcTab>[] = [
    { id: "main", label: "Speed", icon: "bolt" },
    { id: "speed-insights", label: "Insights", icon: "insights" },
    { id: "teams", label: "Teams", icon: "pokeball", svgIcon: true },
    { id: "settings", label: "Modifiers", icon: "exposure" }
  ]

  readonly homeTab = this.tabs[0].id

  onTabSelected(tab: string) {
    this.switchTab(tab as SpeedCalcTab)
  }
  pokemonOnEditId = signal<string | null>(null)
  addingPokemon = this.creationFlow.adding

  modifiedSpe = signal<number>(0)

  selectedPokemon = signal<Pokemon | undefined>(undefined)

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  overlayPokemonId = this.creationFlow.overlayPokemonId

  hidingContentForAdd = this.creationFlow.hidingContent

  hasNoTeamPokemon = this.creationFlow.hasNoTeamPokemon

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => {
    if (this.creationFlow.isCreating()) return SELECT_POKEMON_LABEL

    return this.editingPokemon()?.name ?? ""
  })

  noPokemonSelected = computed(() => {
    const pokemon = this.editingPokemon() ?? this.store.team().activePokemon()

    return pokemon == undefined
  })
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")

  pokemon = computed(() => (this.editingPokemon() ?? this.store.team().activePokemon())!)

  insightsPokemon = computed(() => this.selectedPokemon() ?? this.editingPokemon() ?? this.store.team().activePokemon())

  teamMembers = computed(() => this.store.team().teamMembers)

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const secondAttackerId = this.store.secondAttackerId()
    const activeMember = members.find(m => m.active && m.pokemon.id !== secondAttackerId)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  shouldShowBuild = computed(() => {
    const editId = this.effectiveEditingId()
    if (!editId) return false

    const source = this.store.findNullablePokemonById(editId)
    return !!source
  })

  constructor() {
    this.buildEditing.track({
      editingId: () => this.effectiveEditingId(),
      moveIndex: () => 0,
      pokemonInput: () => this.activePokemonInputEl(),
      itemInput: () => this.itemInput,
      pokemonSelected: name => this.onPokemonSelected(name)
    })

    this.backNavigation.register({
      tab: () => this.activeBottomTab.set(this.homeTab),
      overlay: () => this.overlay.closeWithoutHistory(),
      creation: step => this.cancelCreation(step.originTab),
      exhausted: () => this.activeBottomTab.set(this.homeTab)
    })
    this.creationFlow.trackEditingId(this.effectiveEditingId)

    effect(() => {
      const activatedPokemon = this.editingPokemon() ?? this.store.team().activePokemon()

      if (this.fieldStore.field() && activatedPokemon != undefined) {
        this.modifiedSpe.set(this.speedCalcService.modifiedSpeed(activatedPokemon, this.fieldStore.field(), true))
      }
    })

    effect(() => {
      const pokemon = this.editingPokemon() ?? this.store.team().activePokemon()

      if (pokemon == undefined) return

      this.automaticFieldService.handlePokemonChange(pokemon)
    })
  }

  private activePokemonInputEl(): PokemonSearchInputComponent | undefined {
    return this.activeBottomTab() === "speed-insights" ? this.pokemonInputInsights : this.pokemonInput
  }

  onPokemonSelected(name: string) {
    if (this.creationFlow.isCreating()) {
      this.pokemonOnEditId.set(this.creationFlow.commit(name))
      this.overlay.close()
      this.activePokemonInputEl()?.blur()

      return
    }

    const id = this.effectiveEditingId()
    if (!id) return
    this.selectedPokemon.set(undefined)
    this.store.loadPokemonInfo(id, name)
    this.overlay.close()
    this.activePokemonInputEl()?.blur()
  }

  onClosePokemonTable() {
    if (this.creationFlow.startedFromAnotherTab()) {
      this.activePokemonInputEl()?.blur()
      this.backNavigation.pop()
      this.cancelCreation(this.creationFlow.currentOrigin())

      return
    }

    this.overlay.close()

    if (this.creationFlow.isCreating()) {
      this.pokemonOnEditId.set(this.creationFlow.cancel().pokemonId)
    }

    this.activePokemonInputEl()?.setValue(this.editingPokemonName())
    this.activePokemonInputEl()?.blur()
  }

  onHeaderImport(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon

    if (!singlePokemon) return

    const id = this.effectiveEditingId()
    if (!id) return

    this.store.changePokemon(id, singlePokemon)
  }

  topUsageList: string[] = ["30", "60", "100", "125", "All"]

  ngOnDestroy() {
    this.backNavigation.unregister()
    this.headerVisibility.reset()
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement
    const currentScroll = target.scrollTop
    const delta = currentScroll - this.lastScrollTop

    this.lastScrollTop = currentScroll

    if (Date.now() < this.suppressScrollReactionUntil) return

    if (currentScroll <= SCROLL_TOP_ZONE) {
      this.showBottomNav.set(true)
      this.headerVisibility.show()

      return
    }

    if (Math.abs(delta) < SCROLL_DIRECTION_THRESHOLD) return

    if (delta > 0) {
      this.showBottomNav.set(false)
      this.headerVisibility.hide()
    } else if (delta < 0) {
      this.showBottomNav.set(true)
      this.headerVisibility.show()
    }
  }

  switchTab(newTab: SpeedCalcTab) {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    this.activeBottomTab.set(newTab)

    if (newTab === "teams") {
      this.creationFlow.enterTeamsTab()
    }

    if (newTab === this.homeTab) {
      this.backNavigation.pop()
    } else if (currentTab === this.homeTab) {
      this.backNavigation.push({ kind: "tab", tab: newTab })
    }
  }

  onSpeedTierSelected(pokemon: Pokemon | undefined) {
    this.selectedPokemon.set(pokemon)
  }

  applyOutspeed(pokemon: Pokemon) {
    const outcome = this.speedMatch.matchSpeed(this.effectiveEditingId()!, pokemon, this.fieldStore.field())

    if (outcome.message) {
      this.snackbar.open(outcome.message)
    }
  }

  private cancelCreation(originTab: string | null) {
    this.overlay.closeWithoutHistory()
    this.creationFlow.cancel()
    this.activeBottomTab.set((originTab ?? this.homeTab) as SpeedCalcTab)
  }

  onTeamSelected(pokemonId: string) {
    this.selectedPokemon.set(undefined)
    this.pokemonOnEditId.set(pokemonId)

    if (pokemonId) {
      this.switchTab("main")

      return
    }

    this.creationFlow.start(this.activeBottomTab())
    this.activeBottomTab.set("main")
    setTimeout(() => this.overlay.openWithoutHistory("pokemon"))
  }

  onCustomSetSelected(set: CustomSet) {
    if (!this.creationFlow.isCreating()) return

    this.pokemonOnEditId.set(this.creationFlow.commitCustomSet(set))
  }

  onPokemonOnEditIdChange(pokemonId: string | null) {
    this.selectedPokemon.set(undefined)
    this.pokemonOnEditId.set(pokemonId)
    this.suppressScrollReactionUntil = Date.now() + SCROLL_REACTION_SUPPRESSION_MS
  }

  focusPokemonComboBox() {
    this.overlay.open("pokemon")
  }
}
