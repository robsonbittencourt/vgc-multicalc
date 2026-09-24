import { computed, inject, signal, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core"
import { CalcStore } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { MobileCreationFlowService } from "@features/team/creation-flow/mobile-creation-flow.service"
import { PokemonSpriteComponent } from "@features/pokemon-sprite/pokemon-sprite.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { TypeCoverageInsightsComponent } from "@pages/type-calc/type-coverage-insights/type-coverage-insights.component"
import { OffensiveCoverageComponent } from "@pages/type-calc/offensive-coverage/offensive-coverage.component"
import { DefensiveCoverageComponent } from "@pages/type-calc/defensive-coverage/defensive-coverage.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { MobileBuildEditingService } from "@features/pokemon-build/mobile-build-editing/mobile-build-editing.service"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { Team, Pokemon } from "@multicalc/model"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { MobileCalcShellComponent } from "@shared/mobile-calc-shell/mobile-calc-shell.component"
import { PokemonSearchInputComponent } from "@shared/pokemon-search-input/pokemon-search-input.component"
import { CloseTableButtonComponent } from "@shared/close-table-button/close-table-button.component"

type TypeCalcTab = "insights" | "coverage" | "teams" | "build"

@Component({
  selector: "app-type-calc-mobile",
  templateUrl: "./type-calc-mobile.component.html",
  styleUrl: "./type-calc-mobile.component.scss",
  imports: [
    MobileCalcShellComponent,
    PokemonSearchInputComponent,
    CloseTableButtonComponent,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    PokemonSpriteComponent,
    PokemonBuildMobileComponent,
    TypeCoverageInsightsComponent,
    OffensiveCoverageComponent,
    DefensiveCoverageComponent,
    MobileTableOverlayComponent,
    ImportPokemonButtonComponent,
    SaveSetButtonComponent,
    ExportPokemonButtonComponent
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileBuildEditingService, MobileCreationFlowService, { provide: FIELD_CONTEXT, useValue: "type" }]
})
export class TypeCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: PokemonSearchInputComponent
  @ViewChild("itemInput") itemInput?: PokemonSearchInputComponent
  store = inject(CalcStore)
  private backNavigation = inject(BackNavigationService)
  overlay = inject(MobileTableOverlayService)
  readonly buildEditing = inject(MobileBuildEditingService)
  creationFlow = inject(MobileCreationFlowService)

  constructor() {
    this.buildEditing.track({
      editingId: () => this.effectiveEditingId(),
      moveIndex: () => this.editingMoveIndex(),
      pokemonInput: () => this.pokemonInput,
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
  }

  activeBottomTab = signal<TypeCalcTab>("coverage")

  readonly tabs: CalcTab<TypeCalcTab>[] = [
    { id: "coverage", label: "Coverage", icon: "shield" },
    { id: "insights", label: "Insights", icon: "insights" },
    { id: "build", label: "Build", icon: "edit" },
    { id: "teams", label: "Teams", icon: "pokeball", svgIcon: true }
  ]

  readonly homeTab = this.tabs[0].id

  onTabSelected(tab: string) {
    this.switchTab(tab as TypeCalcTab)
  }
  pokemonOnEditId = signal<string | null>(null)
  addingPokemon = this.creationFlow.adding
  secondTeam = signal<Team | null>(null)

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  hasValidPokemon = computed(() => {
    return !this.store.team().isEmpty()
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  overlayPokemonId = this.creationFlow.overlayPokemonId

  hidingContentForAdd = this.creationFlow.hidingContent

  shouldShowBuild = computed(() => {
    if (this.creationFlow.isCreating()) return false

    const editId = this.effectiveEditingId()

    if (!editId) return false

    return this.store.findNullablePokemonById(editId) !== undefined
  })

  hasNoTeamPokemon = this.creationFlow.hasNoTeamPokemon

  ngOnDestroy() {
    this.backNavigation.unregister()
  }

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => {
    if (this.creationFlow.isCreating()) return SELECT_POKEMON_LABEL

    return this.editingPokemon()?.name ?? ""
  })

  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")
  editingMoveIndex = computed(() => Math.max(0, this.editingPokemon()?.activeMoveIndex ?? 0))

  switchTab(newTab: TypeCalcTab) {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    this.overlay.close()

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

  private cancelCreation(originTab: string | null) {
    this.overlay.closeWithoutHistory()
    this.creationFlow.cancel()
    this.activeBottomTab.set((originTab ?? this.homeTab) as TypeCalcTab)
  }

  onNewTeamCreated(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)

    if (pokemonId) {
      this.switchTab("build")

      return
    }

    this.creationFlow.start(this.activeBottomTab())
    this.activeBottomTab.set("build")
    setTimeout(() => this.overlay.openWithoutHistory("pokemon"))
  }

  onSecondTeamSelected(team: Team | null) {
    this.secondTeam.set(team ? team : null)
  }

  onCustomSetSelected(set: CustomSet) {
    if (!this.creationFlow.isCreating()) return

    this.pokemonOnEditId.set(this.creationFlow.commitCustomSet(set))
  }

  onMemberAdded() {
    this.switchTab("build")
    this.overlay.open("pokemon")
  }

  onPokemonSelected(name: string) {
    if (this.creationFlow.isCreating()) {
      this.pokemonOnEditId.set(this.creationFlow.commit(name))
      this.overlay.close()
      this.pokemonInput?.blur()

      return
    }

    const id = this.effectiveEditingId()
    if (!id) return
    this.store.loadPokemonInfo(id, name)
    this.overlay.close()
    this.pokemonInput?.blur()
  }

  onClosePokemonTable() {
    if (this.creationFlow.startedFromAnotherTab()) {
      this.pokemonInput?.blur()
      this.backNavigation.pop()
      this.cancelCreation(this.creationFlow.currentOrigin())

      return
    }

    this.overlay.close()

    if (this.creationFlow.isCreating()) {
      this.pokemonOnEditId.set(this.creationFlow.cancel().pokemonId)
    }

    this.pokemonInput?.setValue(this.editingPokemonName())

    this.pokemonInput?.blur()
  }

  onHeaderImport(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon
    if (!singlePokemon) return

    const id = this.effectiveEditingId()
    if (!id) return

    this.store.changePokemon(id, singlePokemon)
  }
}
