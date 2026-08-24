import { computed, effect, inject, signal, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from "@angular/core"
import { MatIcon } from "@angular/material/icon"
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
import { GeneralProbabilityComponent } from "@app/pages/probability-calc/general-probability/general-probability.component"
import { CombinedProbabilityComponent } from "@app/pages/probability-calc/combined-probability/combined-probability.component"
import { PokemonProbabilityComponent } from "@app/pages/probability-calc/pokemon-probability/pokemon-probability.component"
import { TeamProbabilityComponent } from "@app/pages/probability-calc/team-probability/team-probability.component"
import { ProbabilityFieldComponent } from "@app/pages/probability-calc/probability-field/probability-field.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { Pokemon } from "@multicalc/model"
import { CalcTab } from "@shared/mobile-calc-shell/calc-tab"
import { MobileCalcShellComponent } from "@shared/mobile-calc-shell/mobile-calc-shell.component"

type ProbabilityCalcTab = "general" | "detailed" | "teams" | "build"

@Component({
  selector: "app-probability-calc-mobile",
  templateUrl: "./probability-calc-mobile.component.html",
  styleUrl: "./probability-calc-mobile.component.scss",
  imports: [
    MobileCalcShellComponent,
    MatIcon,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    PokemonSpriteComponent,
    PokemonBuildMobileComponent,
    GeneralProbabilityComponent,
    CombinedProbabilityComponent,
    PokemonProbabilityComponent,
    TeamProbabilityComponent,
    ProbabilityFieldComponent,
    MobileTableOverlayComponent,
    ImportPokemonButtonComponent,
    SaveSetButtonComponent,
    ExportPokemonButtonComponent
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, MobileCreationFlowService, { provide: FIELD_CONTEXT, useValue: "probability" }]
})
export class ProbabilityCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChildren("pokemonInput") pokemonInputs?: QueryList<ElementRef<HTMLInputElement>>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>
  store = inject(CalcStore)
  private backNavigation = inject(BackNavigationService)
  overlay = inject(MobileTableOverlayService)
  creationFlow = inject(MobileCreationFlowService)

  constructor() {
    this.backNavigation.register({
      tab: () => this.activeBottomTab.set(this.homeTab),
      overlay: () => this.overlay.closeWithoutHistory(),
      creation: step => this.cancelCreation(step.originTab),
      exhausted: () => this.activeBottomTab.set(this.homeTab)
    })
    this.creationFlow.trackEditingId(this.effectiveEditingId)

    effect(() => {
      const id = this.effectiveEditingId()

      if (id == undefined) return

      const current = this.store.findNullablePokemonById(id)

      if (current) {
        this.lastNonDefaultPokemon.set(current)
      }
    })
  }

  activeBottomTab = signal<"general" | "detailed" | "teams" | "build">("detailed")

  readonly tabs: CalcTab<ProbabilityCalcTab>[] = [
    { id: "detailed", label: "Detailed", icon: "analytics" },
    { id: "general", label: "General", icon: "show_chart" },
    { id: "build", label: "Build", icon: "edit" },
    { id: "teams", label: "Teams", icon: "pokeball", svgIcon: true }
  ]

  readonly homeTab = this.tabs[0].id

  onTabSelected(tab: string) {
    this.switchTab(tab as ProbabilityCalcTab)
  }
  pokemonOnEditId = signal<string | null>(null)
  addingPokemon = this.creationFlow.adding
  lastNonDefaultPokemon = signal<Pokemon | undefined>(this.store.team().activePokemon())

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  overlayPokemonId = this.creationFlow.overlayPokemonId

  hidingContentForAdd = this.creationFlow.hidingContent

  hasNoTeamPokemon = this.creationFlow.hasNoTeamPokemon

  activeTabPokemonIsDefault = computed(() => {
    if (this.creationFlow.isCreating()) return true

    const id = this.effectiveEditingId()
    if (!id) return true
    return this.store.findNullablePokemonById(id) == undefined
  })

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

  switchTab(newTab: ProbabilityCalcTab) {
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
    this.activeBottomTab.set((originTab ?? this.homeTab) as ProbabilityCalcTab)
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

  onCustomSetSelected(set: CustomSet) {
    if (!this.creationFlow.isCreating()) return

    this.pokemonOnEditId.set(this.creationFlow.commitCustomSet(set))
  }

  onMemberAdded() {
    this.switchTab("build")
    this.overlay.open("pokemon")
  }

  private justOpenedTable = false

  onPokemonMouseDown(event: MouseEvent) {
    if (!this.overlay.isAnyOpen()) {
      event.preventDefault()
      this.justOpenedTable = true
      this.overlay.open("pokemon")
    }
  }

  private visiblePokemonInput(): HTMLInputElement | undefined {
    return this.pokemonInputs?.toArray().find(ref => ref.nativeElement.offsetParent !== null)?.nativeElement
  }

  onPokemonClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    const input = this.visiblePokemonInput()

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
      this.visiblePokemonInput()?.blur()

      return
    }

    const id = this.effectiveEditingId()
    if (!id) return
    this.store.loadPokemonInfo(id, name)
    this.overlay.close()
    this.visiblePokemonInput()?.blur()
  }

  onClosePokemonTable() {
    if (this.creationFlow.startedFromAnotherTab()) {
      this.visiblePokemonInput()?.blur()
      this.backNavigation.pop()
      this.cancelCreation(this.creationFlow.currentOrigin())

      return
    }

    this.overlay.close()

    if (this.creationFlow.isCreating()) {
      this.pokemonOnEditId.set(this.creationFlow.cancel().pokemonId)
    }

    const input = this.visiblePokemonInput()

    if (input) {
      input.value = this.editingPokemonName()
    }

    input?.blur()
  }

  openMovesTable() {
    this.overlay.open("moves")
  }

  onMoveSelected(move: string) {
    const id = this.effectiveEditingId()
    if (!id) return
    const index = this.editingMoveIndex()
    this.store.updateMove(id, move, index)
  }

  onCloseMovesTable() {
    this.overlay.close()
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

  onHeaderImport(pokemon: Pokemon | Pokemon[]) {
    const singlePokemon = Array.isArray(pokemon) ? pokemon[0] : pokemon
    if (!singlePokemon) return

    const id = this.effectiveEditingId()
    if (!id) return

    this.store.changePokemon(id, singlePokemon)
  }

  onTableSelect(event: TableSelectEvent) {
    switch (event.kind) {
      case "pokemon":
        this.onPokemonSelected(event.value)
        break
      case "moves":
        this.onMoveSelected(event.value)
        break
      case "abilities":
        this.onAbilitySelected(event.value)
        break
      case "items":
        this.onItemSelected(event.value)
        break
    }
  }
}
