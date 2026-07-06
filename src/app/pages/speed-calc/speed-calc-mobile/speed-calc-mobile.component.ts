import { NgClass } from "@angular/common"
import { Component, computed, effect, ElementRef, inject, OnDestroy, signal, ViewChild } from "@angular/core"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { DomSanitizer } from "@angular/platform-browser"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { FieldStore } from "@store/field-store"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { Pokemon } from "@multicalc/model"
import { SnackbarService } from "@core/services/snackbar.service"
import { getFinalSpeed } from "@multicalc/stat-calc"
import { BackNavigationService } from "@core/services/back-navigation.service"
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"

@Component({
  selector: "app-speed-calc-mobile",
  templateUrl: "./speed-calc-mobile.component.html",
  styleUrls: ["./speed-calc-mobile.component.scss"],
  imports: [
    NgClass,
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
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent,
    MobileTableOverlayComponent,
    MatSlideToggle
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, { provide: FIELD_CONTEXT, useValue: "speed" }]
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
  private automaticFieldService = inject(AutomaticFieldService)
  private backNavigation = inject(BackNavigationService)
  private speedMatch = inject(SpeedMatchService)
  private snackbar = inject(SnackbarService)

  activeBottomTab = signal<"main" | "speed-insights" | "settings" | "teams">("main")
  private scrollPositions = new Map<string, number>()
  pokemonOnEditId = signal<string | null>(null)
  addingPokemon = signal<boolean>(false)

  modifiedSpe = signal<number>(0)

  selectedPokemon = signal<Pokemon | undefined>(this.store.team().activePokemon())

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => {
    if (this.isAddMode()) return SELECT_POKEMON_LABEL

    return this.editingPokemon()?.name ?? ""
  })

  isAddMode = computed(() => false)

  noPokemonSelected = computed(() => {
    const pokemon = this.editingPokemon() ?? this.store.team().activePokemon()

    return pokemon == undefined
  })
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")

  pokemon = computed(() => (this.editingPokemon() ?? this.store.team().activePokemon())!)

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

  lastHandledPokemonName = "\0"
  lastHandledAbilityName = "\0"

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("main"))

    effect(() => {
      const activatedPokemon = this.editingPokemon() ?? this.store.team().activePokemon()

      if (this.fieldStore.field() && activatedPokemon != undefined) {
        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), true))
      }
    })

    effect(() => {
      const pokemon = this.editingPokemon() ?? this.store.team().activePokemon()

      if (pokemon == undefined) return

      const pokemonChanged = this.lastHandledPokemonName != pokemon.name || this.lastHandledAbilityName != pokemon.ability.name

      if (pokemonChanged) {
        this.lastHandledPokemonName = pokemon.name
        this.lastHandledAbilityName = pokemon.ability.name

        this.automaticFieldService.checkAutomaticField(pokemon, pokemonChanged)
      }
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
    if (this.addingPokemon()) {
      const newId = this.store.addPokemonToTeam(name)
      this.addingPokemon.set(false)
      this.pokemonOnEditId.set(newId)
      this.overlay.close()
      this.activePokemonInputEl()?.blur()
      return
    }

    const id = this.effectiveEditingId()
    if (!id) return
    this.store.loadPokemonInfo(id, name)
    this.overlay.close()
    this.activePokemonInputEl()?.blur()
  }

  onClosePokemonTable() {
    this.overlay.close()
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

  switchTab(newTab: "main" | "speed-insights" | "settings" | "teams") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    if (newTab === "main") {
      this.backNavigation.pop()
    } else if (currentTab === "main") {
      this.backNavigation.push()
    }

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onSpeedTierSelected(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)

    const outcome = this.speedMatch.matchSpeed(this.effectiveEditingId()!, pokemon, this.fieldStore.field())

    if (outcome.message) {
      this.snackbar.open(outcome.message)
    }
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("main")
  }

  onPokemonOnEditIdChange(pokemonId: string | null) {
    this.pokemonOnEditId.set(pokemonId)
  }

  focusPokemonComboBox() {
    this.overlay.open("pokemon")
  }
}
