import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, effect, inject, input, output, signal, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatIcon } from "@angular/material/icon"
import { MatSlideToggle } from "@angular/material/slide-toggle"
import { MatTooltip } from "@angular/material/tooltip"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { InputComponent } from "@shared/input/input.component"
import { CalcStore } from "@store/calc-store"
import { SELECT_POKEMON_LABEL } from "@store/utils/select-pokemon-label"
import { CustomSet } from "@store/custom-set"
import { FieldStore } from "@store/field-store"
import { MenuStore } from "@store/menu-store"
import { remainingSps, spToEv } from "@multicalc/utils/ev-sp-converter"
import { AbilityComboBoxComponent } from "@features/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@features/pokemon-build/ev-slider/ev-slider.component"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@features/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@features/pokemon-build/status-combo-box/status-combo-box.component"
import { AbilitiesTableComponent } from "@features/pokemon-build/tables/abilities-table/abilities-table.component"
import { ItemsTableComponent } from "@features/pokemon-build/tables/items-table/items-table.component"
import { MovesTableComponent } from "@features/pokemon-build/tables/moves-table/moves-table.component"
import { PokemonTableComponent } from "@features/pokemon-build/tables/pokemon-table/pokemon-table.component"
import { TeraComboBoxComponent } from "@features/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@features/pokemon-build/type-combo-box/type-combo-box.component"
import { MegaStoneService } from "@features/pokemon-build/utils/mega-stone.service"
import { FEATURES } from "@configuration/feature-flags"
import { getFinalAttack, getFinalSpecialAttack, getFinalDefense, getFinalSpecialDefense, getFinalSpeed } from "@multicalc/stat-calc"
import { Stats } from "@multicalc/types"
import { SurvivalThreshold } from "@multicalc/ev-optimizer"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [
    NgStyle,
    NgClass,
    MatButton,
    MatCheckbox,
    MatIcon,
    MatSlideToggle,
    MatTooltip,
    FormsModule,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    MultiHitComboBoxComponent,
    StatusComboBoxComponent,
    TypeComboBoxComponent,
    NatureComboBoxComponent,
    MovesTableComponent,
    InputComponent,
    InputSelectComponent,
    AbilitiesTableComponent,
    ItemsTableComponent,
    PokemonTableComponent
  ]
})
export class PokemonBuildComponent {
  features = FEATURES

  pokemonId = input<string>()
  reverse = input<boolean>(false)
  hasFocus = input<boolean>(true)
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)
  showOptimization = input<boolean>(true)

  selected = output()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()
  pokemonAdded = output<string>()

  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)
  megaStoneService = inject(MegaStoneService)

  originalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  originalNature = signal<string>("")
  updateNature = signal<boolean>(false)
  keepOffensiveEvs = signal<boolean>(false)
  survivalThreshold = signal<string>("2")

  thresholdOptions = [
    { key: "2HKO", value: "2" },
    { key: "3HKO", value: "3" },
    { key: "4HKO", value: "4" }
  ]

  activeMoveIndex = signal<number | null>(null)

  firstMoveFromList = signal<string>("")
  firstAbilityFromList = signal<string>("")
  firstItemFromList = signal<string>("")
  firstPokemonFromList = signal<string>("")

  activeTable = signal<string>("evs")

  showPokemonTable = computed(() => this.activeTable() == "pokemon")
  showItemsTable = computed(() => !this.isAddMode() && this.activeTable() == "items")
  showAbilitiesTable = computed(() => !this.isAddMode() && this.activeTable() == "abilities")
  showMovesTable = computed(() => !this.isAddMode() && this.activeTable() == "moves")
  showEvsTable = computed(() => !this.isAddMode() && this.activeTable() == "evs")

  pokemonTabIndex = computed(() => (this.reverse() ? 14 : 1))
  itemTabIndex = computed(() => (this.reverse() ? 13 : 2))
  abilityTabIndex = computed(() => (this.reverse() ? 12 : 3))

  tabIndexMove1 = computed(() => (this.reverse() ? 8 : 4))
  tabIndexMove2 = computed(() => (this.reverse() ? 9 : 5))
  tabIndexMove3 = computed(() => (this.reverse() ? 10 : 6))
  tabIndexMove4 = computed(() => (this.reverse() ? 11 : 7))

  pokemonDataFilter = signal<string>("")
  itemDataFilter = signal<string>("")
  abilityDataFilter = signal<string>("")
  moveDataFilter = signal<string>("")

  pokemonHasFocus = signal(false)
  itemHasFocus = signal(false)
  abilityHasFocus = signal(false)
  move1HasFocus = signal(false)
  move2HasFocus = signal(false)
  move3HasFocus = signal(false)
  move4HasFocus = signal(false)
  statusHaveFocus = signal(false)
  multiHitHasFocus = signal(false)
  teraHasFocus = signal(false)
  moveWasTyped = signal(false)

  shouldAnimate = signal(false)

  modifiedAtk = signal<number>(0)
  modifiedDef = signal<number>(0)
  modifiedSpa = signal<number>(0)
  modifiedSpd = signal<number>(0)
  modifiedSpe = signal<number>(0)

  someMoveHasFocus = computed(() => {
    return this.move1HasFocus() || this.move2HasFocus() || this.move3HasFocus() || this.move4HasFocus()
  })

  tableWasActive = computed(() => {
    return this.hasFocus() && (this.someMoveHasFocus() || this.pokemonHasFocus() || this.itemHasFocus() || this.abilityHasFocus())
  })

  editingId = computed(() => this.pokemonId()!)
  private resolvedPokemon = computed(() => {
    const id = this.pokemonId()

    return id != undefined ? this.store.findNullablePokemonById(id) : undefined
  })
  pokemon = computed(() => this.resolvedPokemon()!)
  isAddMode = computed(() => this.resolvedPokemon() == undefined)
  selectPokemonLabel = SELECT_POKEMON_LABEL
  isTeamMember = computed(() => this.store.team().teamMembers.some(member => member.pokemon.id === this.editingId()))
  hasDuplicateItem = computed(() => this.isTeamMember() && this.store.duplicateItemPokemonIds().has(this.editingId()))
  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  showEvsSpsToggle = signal(true)
  MAX_EVS = 66
  evLabel = computed(() => {
    if (this.store.useSpsMode()) {
      return "SPs"
    }
    return "EVs"
  })
  remainingLabel = computed(() => "Remaining:")
  remainingPoints = computed(() => {
    const remaining = remainingSps(this.pokemon().evs)

    if (this.store.useSpsMode()) {
      return remaining
    } else {
      return spToEv(remaining)
    }
  })

  hasNoSolution = computed(() => {
    return this.optimizationStatus() === "no-solution"
  })

  isSolutionNotNeeded = computed(() => {
    return this.optimizationStatus() === "not-needed"
  })

  isOptimizationSupported = computed(() => {
    const isOneVsOne = this.menuStore.oneVsOneActivated()
    const isManyVsOne = this.menuStore.manyVsOneActivated()
    const isTeamMember = this.isTeamMember()

    return isOneVsOne || (isManyVsOne && isTeamMember)
  })

  showOptimizeOptions = computed(() => {
    if (!this.isOptimizationSupported()) return false

    const isOptimizing = this.optimizedEvs() !== null
    const noSolution = this.hasNoSolution()
    const solutionNotNeeded = this.isSolutionNotNeeded()

    return !(isOptimizing || noSolution || solutionNotNeeded)
  })

  showOptimizationSuccess = computed(() => {
    return this.isOptimizationSupported() && this.optimizedEvs() !== null && !this.hasNoSolution() && !this.isSolutionNotNeeded()
  })

  showNoSolution = computed(() => {
    return this.isOptimizationSupported() && this.hasNoSolution()
  })

  showSolutionNotNeeded = computed(() => {
    return this.isOptimizationSupported() && this.isSolutionNotNeeded()
  })

  modifiedHp = computed(() => this.pokemon().modifiedHp)

  hasModifiedStat = computed(() => {
    return (
      this.modifiedHp() != this.pokemon().hp ||
      this.modifiedAtk() != this.pokemon().atk ||
      this.modifiedDef() != this.pokemon().def ||
      this.modifiedSpa() != this.pokemon().spa ||
      this.modifiedSpd() != this.pokemon().spd ||
      this.modifiedSpe() != this.pokemon().spe
    )
  })

  isHpOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()

    return optimized !== null && optimized.hp !== 0 && !noSolution
  })

  isDefOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()

    return optimized !== null && optimized.def !== 0 && !noSolution
  })

  isSpdOptimized = computed(() => {
    const optimized = this.optimizedEvs()
    const noSolution = this.hasNoSolution()

    return optimized !== null && optimized.spd !== 0 && !noSolution
  })

  pokemonInput = viewChild<InputComponent>("pokemonInput")
  itemInput = viewChild<InputComponent>("itemInput")
  abilityInput = viewChild<InputComponent>("abilityInput")
  move4Input = viewChild<InputComponent>("move4Input")

  moveWasSelected = false
  withoutItem = "(none)"

  constructor() {
    queueMicrotask(() => {
      this.shouldAnimate.set(true)
    })

    effect(() => {
      if (!this.showMovesTable() && !this.showAbilitiesTable() && !this.showItemsTable() && !this.showPokemonTable()) {
        this.activeTable.set("evs")
      }

      if (!this.hasFocus()) {
        this.showDefaultView()
      }
    })

    effect(() => {
      const id = this.pokemonId()
      const activatedPokemon = id != undefined ? this.store.findNullablePokemonById(id) : undefined

      if (this.fieldStore.field() && activatedPokemon != undefined) {
        this.modifiedAtk.set(getFinalAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedDef.set(getFinalDefense(activatedPokemon, this.fieldStore.field(), this.reverse()))
        this.modifiedSpa.set(getFinalSpecialAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedSpd.set(getFinalSpecialDefense(activatedPokemon, this.fieldStore.field(), !this.reverse()))
        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), !this.reverse()))
      }
    })
  }

  focusPokemonSelector() {
    this.pokemonHasFocus.set(true)
    this.pokemonInput()?.focus()
  }

  openPokemonTable() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  scrollToPokemonSelector() {
    this.pokemonInput()?.scrollTo()
  }

  toggleSpsMode() {
    this.store.toggleSpsMode()
  }

  showDefaultView() {
    this.removeFocusFromAllFields()
    this.activeTable.set("evs")
  }

  moveSelectorDisabled(index: number): boolean {
    return this.pokemon().activeMoveIndex !== index
  }

  activateMove(position: number) {
    this.activeMoveIndex.set(null)
    this.store.activateMoveByPosition(this.editingId(), position)
    this.showDefaultView()
  }

  moveSelectorOnClick(position: number) {
    this.setMoveSelectorFocus(position - 1)
    this.store.activateMoveByPosition(this.editingId(), position)
    this.activeMoveIndex.set(position - 1)
    this.selected.emit()
  }

  selectMoveOnly(position: number) {
    this.store.activateMoveByPosition(this.editingId(), position)
    this.activeMoveIndex.set(position - 1)
  }

  onMoveValueChange(value: string) {
    this.moveWasTyped.set(true)
    this.moveDataFilter.set(value)
  }

  moveSelected(move: string) {
    this.moveWasSelected = true
    this.setMoveSelectorFocus(this.activeMoveIndex()!)
    this.store.updateMove(this.editingId(), move, this.activeMoveIndex()!)
    this.store.activateMove(this.editingId(), this.activeMoveIndex()!)
    this.moveDataFilter.set("")

    if (this.activeMoveIndex() == 3) {
      this.showDefaultView()
      this.move4Input()?.blur()
    } else {
      this.focusNextTabIndex()
    }
  }

  private focusNextTabIndex() {
    let nextMoveIndex = this.activeMoveIndex()! + 1

    switch (nextMoveIndex) {
      case 1:
        nextMoveIndex = this.tabIndexMove2()
        break
      case 2:
        nextMoveIndex = this.tabIndexMove3()
        break
      default:
        nextMoveIndex = this.tabIndexMove4()
        break
    }

    const nextElement = document.querySelector<HTMLElement>(`[tabindex="${nextMoveIndex}"]`)
    nextElement?.focus()
  }

  moveSelectorLostFocus(position: number) {
    const filter = this.moveDataFilter()
    const firstMove = this.firstMoveFromList()

    if (!this.moveWasSelected && this.moveWasTyped()) {
      if (filter === "") {
        this.store.updateMove(this.editingId(), "", position - 1)
      } else {
        this.store.updateMove(this.editingId(), firstMove, position - 1)

        if (this.activeMoveIndex() === position - 1) {
          this.store.activateMove(this.editingId(), position - 1)
        }
      }
    }

    this.moveDataFilter.set("")
    this.moveWasSelected = false
    this.moveWasTyped.set(false)
  }

  private setMoveSelectorFocus(moveIndex: number) {
    this.removeFocusFromAllFields()
    this.activeTable.set("moves")

    switch (moveIndex) {
      case 0:
        this.move1HasFocus.set(true)
        break
      case 1:
        this.move2HasFocus.set(true)
        break
      case 2:
        this.move3HasFocus.set(true)
        break
      default:
        this.move4HasFocus.set(true)
        break
    }
  }

  abilitySelected(ability: string) {
    this.abilityDataFilter.set("")
    this.store.ability(this.editingId(), ability)
    this.showDefaultView()
    this.abilityInput()?.blur()
  }

  abilitySelectorOnClick() {
    this.removeFocusFromAllFields()
    this.abilityHasFocus.set(true)
    this.activeTable.set("abilities")
    this.selected.emit()
  }

  abilitySelectorLostFocus() {
    if (this.abilityDataFilter() != "") {
      this.store.ability(this.editingId(), this.firstAbilityFromList())
      this.abilityDataFilter.set("")
    }
  }

  itemSelected(item: string) {
    this.itemDataFilter.set("")

    if (!this.isItemDisabled()) {
      this.store.item(this.editingId(), item)
    }

    this.showDefaultView()
    this.itemInput()?.blur()
  }

  itemSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.itemHasFocus.set(true)
    this.activeTable.set("items")
    this.selected.emit()
  }

  itemSelectorLostFocus() {
    if (this.itemDataFilter() != "") {
      this.store.item(this.editingId(), this.firstItemFromList())
      this.itemDataFilter.set("")
    }
  }

  pokemonSelected(pokemon: string) {
    this.pokemonDataFilter.set("")

    if (this.isAddMode()) {
      this.pokemonAdded.emit(pokemon)
    } else {
      this.store.loadPokemonInfo(this.editingId(), pokemon)
    }

    this.showDefaultView()
    this.pokemonInput()?.blur()
  }

  onCustomSetEditRequested(set: CustomSet) {
    this.store.enterCustomSetEditMode(this.editingId(), set.id)
    this.showDefaultView()
  }

  pokemonSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  pokemonSelectorLostFocus() {
    if (this.pokemonDataFilter() != "") {
      this.store.loadPokemonInfo(this.editingId(), this.firstPokemonFromList())
      this.pokemonDataFilter.set("")
    }
  }

  newPokemonSelectorLostFocus() {
    if (this.pokemonDataFilter() != "") {
      if (this.isAddMode()) {
        this.pokemonAdded.emit(this.firstPokemonFromList())
      } else {
        this.store.loadPokemonInfo(this.editingId(), this.firstPokemonFromList())
      }

      this.pokemonDataFilter.set("")
      this.showDefaultView()
      this.pokemonInput()?.blur()
    }
  }

  private removeFocusFromAllFields() {
    this.pokemonHasFocus.set(false)
    this.itemHasFocus.set(false)
    this.abilityHasFocus.set(false)
    this.move1HasFocus.set(false)
    this.move2HasFocus.set(false)
    this.move3HasFocus.set(false)
    this.move4HasFocus.set(false)
    this.statusHaveFocus.set(false)
    this.multiHitHasFocus.set(false)
    this.teraHasFocus.set(false)
  }

  statusOnClick() {
    this.removeFocusFromAllFields()
    this.showDefaultView()
    this.selected.emit()
  }

  multiHitOnClick() {
    this.multiHitHasFocus.set(true)
    this.showDefaultView()
    this.selected.emit()
  }

  teraOnClick() {
    this.teraHasFocus.set(true)
    this.showDefaultView()
    this.selected.emit()
  }

  isItemDisabled() {
    const ogerponForms = ["Ogerpon-Wellspring", "Ogerpon-Hearthflame", "Ogerpon-Cornerstone"]
    return ogerponForms.includes(this.pokemon().name) || this.pokemon().name.includes("-Mega")
  }

  hasMegaForm() {
    return this.megaStoneService.hasMegaForm(this.pokemon().name, this.pokemon().item)
  }

  toggleMega() {
    this.megaStoneService.toggleMega(this.editingId(), this.pokemon().name, this.pokemon().item)
  }

  isMegaStone() {
    return this.megaStoneService.isMegaStone(this.pokemon().item)
  }

  isMegaStoneCompatible() {
    return this.megaStoneService.isMegaStoneCompatible(this.pokemon().name, this.pokemon().item)
  }

  getMegaStoneSprite() {
    return this.megaStoneService.getMegaStoneSprite(this.pokemon().item)
  }

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }

  gridTemplateColumns(): any {
    return { "grid-template-columns": this.hasModifiedStat() ? "64px 64px 67px 64px 1fr 64px 30px" : "64px 64px 67px 64px 1fr 64px" }
  }

  clearEvs() {
    this.store.evs(this.editingId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  optimizeEvs() {
    const defender = this.store.findPokemonById(this.editingId())
    this.originalEvs.set({ ...defender.evs })
    this.originalNature.set(defender.nature)

    this.optimizeRequested.emit({
      updateNature: this.updateNature(),
      keepOffensiveEvs: this.keepOffensiveEvs(),
      survivalThreshold: Number(this.survivalThreshold()) as SurvivalThreshold
    })
  }

  applyOptimization() {
    const optimized = this.optimizedEvs()

    if (optimized) {
      this.store.evs(this.editingId(), { ...optimized })
    }

    this.optimizationApplied.emit()
  }

  discardOptimization() {
    const original = this.originalEvs()
    this.store.evs(this.editingId(), original)

    const originalNature = this.originalNature()
    this.store.nature(this.editingId(), originalNature)

    this.optimizationDiscarded.emit()
  }
}
