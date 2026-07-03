import { Component, computed, ElementRef, inject, OnDestroy, signal, ViewChild } from "@angular/core"
import { NgClass } from "@angular/common"
import { MatIcon, MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { CalculatorStore } from "@store/calculator-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { BackNavigationService } from "@lib/back-navigation.service"
import { TeamTabsMobileComponent } from "@features/team/team-tabs-mobile/team-tabs-mobile.component"
import { TeamsMobileComponent } from "@features/team/teams-mobile/teams-mobile.component"
import { PokemonBuildMobileComponent } from "@features/pokemon-build/pokemon-build-mobile/pokemon-build-mobile.component"
import { TypeCoverageInsightsMobileComponent } from "@pages/type-calc/type-coverage-insights-mobile/type-coverage-insights-mobile.component"
import { OffensiveCoverageMobileComponent } from "@pages/type-calc/offensive-coverage-mobile/offensive-coverage-mobile.component"
import { DefensiveCoverageMobileComponent } from "@pages/type-calc/defensive-coverage-mobile/defensive-coverage-mobile.component"
import { MobileTableOverlayComponent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.component"
import { MobileTableOverlayService, TableSelectEvent } from "@features/pokemon-build/tables/mobile-table-overlay/mobile-table-overlay.service"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { Team } from "@lib/model/team"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-type-calc-mobile",
  templateUrl: "./type-calc-mobile.component.html",
  styleUrl: "./type-calc-mobile.component.scss",
  imports: [
    NgClass,
    MatIcon,
    TeamTabsMobileComponent,
    TeamsMobileComponent,
    PokemonBuildMobileComponent,
    TypeCoverageInsightsMobileComponent,
    OffensiveCoverageMobileComponent,
    DefensiveCoverageMobileComponent,
    MobileTableOverlayComponent,
    ImportPokemonButtonComponent,
    SaveSetButtonComponent,
    ExportPokemonButtonComponent
  ],
  providers: [FieldStore, AutomaticFieldService, MobileTableOverlayService, { provide: FIELD_CONTEXT, useValue: "type" }]
})
export class TypeCalcMobileComponent implements OnDestroy {
  @ViewChild("scrollContainer") scrollContainer?: ElementRef<HTMLDivElement>
  @ViewChild("pokemonInput") pokemonInput?: ElementRef<HTMLInputElement>
  @ViewChild("itemInput") itemInput?: ElementRef<HTMLInputElement>
  store = inject(CalculatorStore)
  private backNavigation = inject(BackNavigationService)
  overlay = inject(MobileTableOverlayService)

  constructor() {
    const iconRegistry = inject(MatIconRegistry)
    const sanitizer = inject(DomSanitizer)
    iconRegistry.addSvgIcon("pokeball", sanitizer.bypassSecurityTrustResourceUrl("assets/icons/pokeball.svg"))
    this.backNavigation.register(() => this.activeBottomTab.set("coverage"))
  }

  activeBottomTab = signal<"insights" | "coverage" | "teams" | "build">("coverage")
  private scrollPositions = new Map<string, number>()
  pokemonOnEditId = signal<string | null>(null)
  secondTeam = signal<Team | null>(null)

  activePokemonId = computed(() => {
    const members = this.store.team().teamMembers
    if (members.length === 0) return null

    const activeMember = members.find(m => m.active)

    return activeMember ? activeMember.pokemon.id : members[0].pokemon.id
  })

  hasValidPokemon = computed(() => {
    return this.store.team().teamMembers.some(m => !m.pokemon.isDefault)
  })

  effectiveEditingId = computed(() => this.pokemonOnEditId() || this.activePokemonId())

  ngOnDestroy() {
    this.backNavigation.unregister()
  }

  editingPokemon = computed(() => {
    const id = this.effectiveEditingId()
    return id ? this.store.findNullablePokemonById(id) : undefined
  })

  editingPokemonName = computed(() => this.editingPokemon()?.name ?? "")
  editingPokemonItem = computed(() => this.editingPokemon()?.item ?? "")
  editingMoveIndex = computed(() => Math.max(0, this.editingPokemon()?.activeMoveIndex ?? 0))

  switchTab(newTab: "insights" | "coverage" | "teams" | "build") {
    const currentTab = this.activeBottomTab()
    if (currentTab === newTab) return

    this.overlay.close()

    const currentScroll = this.scrollContainer?.nativeElement.scrollTop || 0
    this.scrollPositions.set(currentTab, currentScroll)

    this.activeBottomTab.set(newTab)

    if (newTab === "coverage") {
      this.backNavigation.pop()
    } else if (currentTab === "coverage") {
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
    this.switchTab("insights")
  }

  onNewTeamCreated(pokemonId: string) {
    this.pokemonOnEditId.set(pokemonId)
    this.switchTab("build")
  }

  onSecondTeamSelected(team: Team | null) {
    this.secondTeam.set(team)
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

  onPokemonClick() {
    if (this.justOpenedTable) {
      this.justOpenedTable = false
      return
    }

    if (this.pokemonInput) {
      this.pokemonInput.nativeElement.value = ""
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
    this.overlay.close()
    this.pokemonInput?.nativeElement.blur()
  }

  onClosePokemonTable() {
    this.overlay.close()

    if (this.pokemonInput) {
      this.pokemonInput.nativeElement.value = this.editingPokemonName()
    }

    this.pokemonInput?.nativeElement.blur()
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
