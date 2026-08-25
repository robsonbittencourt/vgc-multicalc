import { computed, effect, inject, signal, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
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
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { MobileCalcShellComponent } from "@shared/mobile-calc-shell/mobile-calc-shell.component"

type SpeedCalcTab = "main" | "speed-insights" | "settings" | "teams"

@Component({
  selector: "app-speed-calc-mobile",
  templateUrl: "./speed-calc-mobile.component.html",
  styleUrls: ["./speed-calc-mobile.component.scss"],
  imports: [
    MobileCalcShellComponent,
    MatIcon,
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
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileCreationFlowService, { provide: FIELD_CONTEXT, useValue: "speed" }]
})
export class SpeedCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: ElementRef<HTMLInputElement>
  @ViewChild("pokemonInputInsights") pokemonInputInsights?: ElementRef<HTMLInputElement>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  overlay = inject(MobileTableOverlayService)
  creationFlow = inject(MobileCreationFlowService)
  private automaticFieldService = inject(AutomaticFieldService)
  private backNavigation = inject(BackNavigationService)
  private speedMatch = inject(SpeedMatchService)
  private speedCalcService = inject(SpeedCalcService)
  private snackbar = inject(SnackbarService)

  activeBottomTab = signal<SpeedCalcTab>("main")

  readonly tabs: CalcTab<SpeedCalcTab>[] = [
    { id: "main", label: "Speed", icon: "bolt" },
    { id: "speed-insights", label: "Insights", icon: "insights" },
    { id: "teams", label: "Teams", icon: "pokeball", svgIcon: true },
    { id: "settings", label: "Settings", icon: "settings" }
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

  private justOpenedTable = false

  private activePokemonInputEl(): HTMLInputElement | undefined {
    return this.activeBottomTab() === "speed-insights" ? this.pokemonInputInsights?.nativeElement : this.pokemonInput?.nativeElement
  }

  onPokemonMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("pokemon")
    }
  }

  onPokemonClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    const input = this.activePokemonInputEl()

    if (input) {
      input.value = ""
      this.overlay.setFilter("")
    }
  }

  onPokemonInput(value: string) {
    this.overlay.setFilter(value)
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

    const input = this.activePokemonInputEl()

    if (input) {
      input.value = this.editingPokemonName()
    }

    input?.blur()
  }

  openAbilitiesTable() {
    this.overlay.open("abilities")
  }

  onAbilitySelected(ability: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.ability(id, ability)
    this.overlay.close()
  }

  openItemsTable() {
    this.overlay.open("items")
  }

  onItemMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("items")
    }
  }

  onItemClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    if (this.itemInput) {
      this.itemInput.nativeElement.value = ""
      this.overlay.setFilter("")
    }
  }

  onItemInput(value: string) {
    this.overlay.setFilter(value)
  }

  onItemSelected(name: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.item(id, name)
    this.overlay.close()
    this.itemInput?.nativeElement.blur()
  }

  onCloseItemsTable() {
    this.overlay.close()
    this.itemInput?.nativeElement.blur()
  }

  onTableSelect(event: TableSelectEvent) {
    switch (event.kind) {
      case "pokemon":
        this.onPokemonSelected(event.value)
        break
      case "abilities":
        this.onAbilitySelected(event.value)
        break
      case "items":
        this.onItemSelected(event.value)
        break
    }
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
  }

  focusPokemonComboBox() {
    this.overlay.open("pokemon")
  }
}
