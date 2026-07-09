import { Component, computed, effect, ElementRef, inject, OnDestroy, QueryList, signal, ViewChild, ViewChildren } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { CalcStore } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { BackNavigationService } from "@app/services/back-navigation.service"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
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

@Component({
  selector: "app-probability-calc-mobile",
  templateUrl: "./probability-calc-mobile.component.html",
  styleUrl: "./probability-calc-mobile.component.scss",
  imports: [
    NgClass,
    MatIcon,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
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
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, { provide: FIELD_CONTEXT, useValue: "probability" }]
})
export class ProbabilityCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChildren("pokemonInput") pokemonInputs?: QueryList<ElementRef<HTMLInputElement>>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>
  store = inject(CalcStore)
  private backNavigation = inject(BackNavigationService)
  overlay = inject(MobileTableOverlayService)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("detailed"))

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
  private scrollPositions = new Map<string, number>()
  pokemonOnEditId = signal<string | null>(null)
  addingPokemon = signal<boolean>(false)
  lastNonDefaultPokemon = signal<Pokemon | undefined>(this.store.team().activePokemon())

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  activeTabPokemonIsDefault = computed(() => {
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

  isAddMode = computed(() => false)

  editingPokemonName = computed(() => {
    if (this.isAddMode()) return SELECT_POKEMON_LABEL

    return this.editingPokemon()?.name ?? ""
  })
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")
  editingMoveIndex = computed(() => Math.max(0, this.editingPokemon()?.activeMoveIndex ?? 0))

  switchTab(newTab: "general" | "detailed" | "teams" | "build") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    this.overlay.close()

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    if (newTab === "detailed") {
      this.backNavigation.pop()
    } else if (currentTab === "detailed") {
      this.backNavigation.push()
    }

    setTimeout(() => {
      const targetScroll = this.scrollPositions.get(newTab) || 0
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTo({ top: targetScroll, behavior: "instant" })
      }
    }, 0)
  }

  onTeamSelected(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("detailed")
  }

  onNewTeamCreated(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("build")
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
    if (this.addingPokemon()) {
      const newId = this.store.addPokemonToTeam(name)
      this.addingPokemon.set(false)
      this.pokemonOnEditId.set(newId)
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
    this.overlay.close()
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
