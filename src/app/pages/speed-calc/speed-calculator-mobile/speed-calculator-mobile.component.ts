import { Component, computed, effect, ElementRef, inject, signal, ViewChild, viewChild } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { FieldComponent } from "@features/field/field.component"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@features/pokemon-build/item-combo-box/item-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { PokemonComboBoxComponent } from "@features/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { defaultPokemon } from "@lib/default-pokemon"
import { TeamMember } from "@lib/model/team-member"
import { Team } from "@lib/model/team"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { SPEED_CALCULATOR_MODES } from "@lib/speed-calculator/speed-calculator-mode"
import { Regulation } from "@lib/types"
import { OpponentOptionsComponent } from "@pages/speed-calc/opponent-options/opponent-options.component"
import { SpeedInsightsComponent } from "@pages/speed-calc/speed-insights/speed-insights.component"
import { SpeedScaleComponent } from "@pages/speed-calc/speed-scale/speed-scale.component"
import { NATURES } from "@robsonbittencourt/calc"

@Component({
  selector: "app-speed-calculator-mobile",
  templateUrl: "./speed-calculator-mobile.component.html",
  styleUrls: ["./speed-calculator-mobile.component.scss"],
  imports: [
    NgClass,
    MatIcon,
    InputSelectComponent,
    InputAutocompleteComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent,
    EvSliderComponent,
    SpeedScaleComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent,
    NatureComboBoxComponent,
    FieldComponent,
    SpeedInsightsComponent,
    WidgetComponent,
    OpponentOptionsComponent,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    ImportPokemonButtonComponent,
    ExportPokemonButtonComponent
  ],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "speed" }]
})
export class SpeedCalculatorMobileComponent {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  pokemonComboBox = viewChild<PokemonComboBoxComponent>(PokemonComboBoxComponent)

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  optionsStore = inject(SpeedCalcOptionsStore)
  private automaticFieldService = inject(AutomaticFieldService)

  activeBottomTab = signal<"main" | "speed-insights" | "settings" | "teams">("main")
  showBottomNav = signal(true)
  private scrollPositions = new Map<string, number>()
  private lastScrollTop = 0
  pokemonOnEditId = signal<string | null>(null)

  modifiedSpe = signal<number>(0)

  selectedPokemon = signal<Pokemon>(this.store.team().activePokemon())

  pokemonId = computed(() => this.store.team().activePokemon().id)
  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  teamMembers = computed(() => this.store.team().teamMembers)

  canImportPokemon = computed(() => this.teamMembers().length < 6)

  teamMemberOnEdit = computed(() => {
    const editId = this.pokemonId()

    if (!editId) return false

    return this.teamMembers().some(m => m.pokemon.id === editId)
  })

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  hasModifiedStat = computed(() => {
    return this.modifiedSpe() != this.pokemon().spe
  })

  lastHandledPokemonName = ""
  lastHandledAbilityName = ""

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))

    effect(() => {
      if (this.fieldStore.field()) {
        const id = this.pokemonId()
        const activatedPokemon = this.store.findPokemonById(id)

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

  allNatureNames = Object.keys(NATURES)

  statusConditions = [Status.HEALTHY.description, Status.PARALYSIS.description]

  regulationsList: Regulation[] = ["I", "F"]

  topUsageList: string[] = ["30", "60", "100", "125", "All"]

  speedCalculatorModes: string[] = SPEED_CALCULATOR_MODES

  updateRegulation(regulation: string) {
    this.optionsStore.updateRegulation(regulation as Regulation)
  }

  switchTab(newTab: "main" | "speed-insights" | "settings" | "teams") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)
    this.showBottomNav.set(true)

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("main")
  }

  importPokemon(pokemon: Pokemon | Pokemon[]) {
    if (Array.isArray(pokemon)) {
      if (pokemon.length > 0) {
        const teamMembers = pokemon.map((p, index) => new TeamMember(p, index === 0))
        const newTeam = new Team(crypto.randomUUID(), true, "Imported Team", teamMembers)
        this.store.replaceActiveTeam(newTeam)
      }

      return
    }

    if (this.canImportPokemon()) {
      this.store.addTeamMember(pokemon)
    }
  }

  removeActivePokemon() {
    const idToRemove = this.pokemonId()

    if (!idToRemove) return

    if (this.teamMembers().length > 1) {
      const nextId = this.teamMembers().find(m => m.pokemon.id !== idToRemove)?.pokemon.id || null

      if (nextId) {
        const nextIndex = this.teamMembers().findIndex(m => m.pokemon.id === nextId)
        this.store.activateTeamMember(nextIndex)
      }

      this.store.removeTeamMember(idToRemove)
      this.pokemonOnEditId.set(nextId)
    } else {
      this.store.changePokemon(idToRemove, defaultPokemon())
      this.pokemonOnEditId.set(idToRemove)
    }
  }

  focusPokemonComboBox() {
    setTimeout(() => {
      this.pokemonComboBox()?.focus()
    }, 50)
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement
    const currentScroll = target.scrollTop

    if (currentScroll > this.lastScrollTop && currentScroll > 50) {
      this.showBottomNav.set(false)
    } else if (currentScroll < this.lastScrollTop) {
      this.showBottomNav.set(true)
    }

    this.lastScrollTop = currentScroll
  }
}
