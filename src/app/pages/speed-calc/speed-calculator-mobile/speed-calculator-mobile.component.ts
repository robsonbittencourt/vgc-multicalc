import { NgClass } from "@angular/common"
import { Component, computed, effect, ElementRef, inject, OnDestroy, signal, ViewChild } from "@angular/core"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { DomSanitizer } from "@angular/platform-browser"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { Pokemon } from "@lib/model/pokemon"
import { SnackbarService } from "@lib/snackbar.service"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { BackNavigationService } from "@lib/back-navigation.service"
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedMatchService } from "@pages/speed-calc/speed-match.service"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"

@Component({
  selector: "app-speed-calculator-mobile",
  templateUrl: "./speed-calculator-mobile.component.html",
  styleUrls: ["./speed-calculator-mobile.component.scss"],
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
export class SpeedCalculatorMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: ElementRef<HTMLInputElement>
  @ViewChild("pokemonInputInsights") pokemonInputInsights?: ElementRef<HTMLInputElement>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>

  store = inject(CalculatorStore)
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

  modifiedSpe = signal<number>(0)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => this.editingPokemon()?.name ?? "")
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")

  speedCalcPokemonId = computed(() => this.store.speedCalcPokemon().id)

  pokemon = computed(() => this.store.speedCalcPokemon())

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
    return !!source && !source.isDefault
  })

  lastHandledPokemonName = "\0"
  lastHandledAbilityName = "\0"

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("main"))

    const initialSourceId = this.effectiveEditingId()
    if (initialSourceId) this.store.loadSpeedCalcPokemonFrom(initialSourceId)

    effect(() => {
      const sourceId = this.effectiveEditingId()
      if (!sourceId) return

      const sourcePokemon = this.store.findNullablePokemonById(sourceId)
      if (!sourcePokemon) return

      const currentScratch = this.store.speedCalcPokemon()
      if (sourcePokemon.isDefault !== currentScratch.isDefault || sourcePokemon.name !== currentScratch.name || sourcePokemon.ability.name !== currentScratch.ability.name) {
        this.store.loadSpeedCalcPokemonFrom(sourceId)
      }
    })

    effect(() => {
      if (this.fieldStore.field()) {
        const activatedPokemon = this.pokemon()

        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), true))
      }
    })

    effect(() => {
      const pokemonChanged = this.lastHandledPokemonName != this.pokemon().name || this.lastHandledAbilityName != this.pokemon().ability.name

      if (pokemonChanged) {
        this.lastHandledPokemonName = this.pokemon().name
        this.lastHandledAbilityName = this.pokemon().ability.name

        this.automaticFieldService.checkAutomaticField(this.pokemon(), pokemonChanged)
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
    const id = this.effectiveEditingId()
    if (!id) return
    this.store.loadPokemonInfo(id, name)
    this.store.loadSpeedCalcPokemonFrom(id)
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
    this.store.loadSpeedCalcPokemonFrom(id)
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
    this.store.loadSpeedCalcPokemonFrom(id)
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
    this.store.loadSpeedCalcPokemonFrom(id)
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

    const outcome = this.speedMatch.matchSpeed(this.speedCalcPokemonId(), pokemon, this.fieldStore.field())

    if (outcome.message) {
      this.snackbar.open(outcome.message)
    }
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.store.loadSpeedCalcPokemonFrom(pokemonId)
    this.switchTab("main")
  }

  onPokemonOnEditIdChange(pokemonId: string | null) {
    this.pokemonOnEditId.set(pokemonId)
    if (pokemonId) this.store.loadSpeedCalcPokemonFrom(pokemonId)
  }

  focusPokemonComboBox() {
    const editId = this.effectiveEditingId()
    if (editId) this.store.loadSpeedCalcPokemonFrom(editId)
    this.overlay.open("pokemon")
  }
}
