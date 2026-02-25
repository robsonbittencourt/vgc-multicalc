import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, effect, inject, input, output, signal, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatButton } from "@angular/material/button"
import { MatCheckbox } from "@angular/material/checkbox"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { InputComponent } from "@basic/input/input.component"
import { Items } from "@data/items"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { MenuStore } from "@data/store/menu-store"
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
import { getFinalAttack, getFinalSpecialAttack } from "@lib/smogon/stat-calculator/atk-spa/modified-atk-spa"
import { getFinalDefense, getFinalSpecialDefense } from "@lib/smogon/stat-calculator/def-spd/modified-def-spd"
import { getFinalSpeed } from "@lib/smogon/stat-calculator/spe/modified-spe"
import { Stats, SurvivalThreshold } from "@lib/types"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [
    NgStyle,
    NgClass,
    MatButton,
    MatCheckbox,
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
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)
  hasFocus = input<boolean>(true)
  optimizationStatus = input<"idle" | "success" | "no-solution" | "not-needed">("idle")
  optimizedEvs = input<Stats | null>(null)
  optimizedNature = input<string | null>(null)

  selected = output()
  optimizeRequested = output<{ updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }>()
  optimizationApplied = output<void>()
  optimizationDiscarded = output<void>()

  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  menuStore = inject(MenuStore)

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
  showItemsTable = computed(() => this.activeTable() == "items")
  showAbilitiesTable = computed(() => this.activeTable() == "abilities")
  showMovesTable = computed(() => this.activeTable() == "moves")
  showEvsTable = computed(() => this.activeTable() == "evs")

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

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  currentEvs = computed(() => {
    const pokemon = this.pokemon()
    return { ...pokemon.evs }
  })

  hasNoSolution = computed(() => {
    return this.optimizationStatus() === "no-solution"
  })

  isSolutionNotNeeded = computed(() => {
    return this.optimizationStatus() === "not-needed"
  })

  hasModifiedStat = computed(() => {
    return this.modifiedAtk() != this.pokemon().atk || this.modifiedDef() != this.pokemon().def || this.modifiedSpa() != this.pokemon().spa || this.modifiedSpd() != this.pokemon().spd || this.modifiedSpe() != this.pokemon().spe
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

  MAX_EVS = 508

  moveWasSelected = false
  blurTimeout: any = null
  withoutItem = Items.instance.withoutItem()

  constructor() {
    queueMicrotask(() => this.shouldAnimate.set(true))

    effect(() => {
      if (!this.showMovesTable() && !this.showAbilitiesTable() && !this.showItemsTable() && !this.showPokemonTable()) {
        this.activeTable.set("evs")
      }

      if (!this.hasFocus()) {
        this.showDefaultView()
      }
    })

    effect(() => {
      if (this.fieldStore.field()) {
        const id = this.pokemonId()
        const activatedPokemon = this.store.findPokemonById(id)

        this.modifiedAtk.set(getFinalAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedDef.set(getFinalDefense(activatedPokemon, this.fieldStore.field(), this.reverse()))
        this.modifiedSpa.set(getFinalSpecialAttack(activatedPokemon, activatedPokemon.move, this.fieldStore.field()))
        this.modifiedSpd.set(getFinalSpecialDefense(activatedPokemon, this.fieldStore.field(), !this.reverse()))
        this.modifiedSpe.set(getFinalSpeed(activatedPokemon, this.fieldStore.field(), !this.reverse()))
      }
    })
  }

  focusPokemonSelector() {
    this.pokemonInput()?.focus()
  }

  scrollToPokemonSelector() {
    this.pokemonInput()?.scrollTo()
  }

  showDefaultView() {
    this.removeFocusFromAllFields()
    this.activeTable.set("evs")
  }

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.activeMoveIndex.set(null)
    this.store.activateMoveByPosition(this.pokemonId(), position)
    this.showDefaultView()
  }

  moveSelectorOnClick(position: number) {
    this.setMoveSelectorFocus(position - 1)
    this.store.activateMoveByPosition(this.pokemonId(), position)
    this.activeMoveIndex.set(position - 1)
    this.selected.emit()
  }

  moveSelected(move: string) {
    this.clearBlurTimeout()
    this.moveWasSelected = true
    this.setMoveSelectorFocus(this.activeMoveIndex()!)
    this.store.updateMove(this.pokemonId(), move, this.activeMoveIndex()!)
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
    this.blurTimeout = setTimeout(() => {
      if (this.moveDataFilter() != "" && !this.moveWasSelected) {
        this.store.updateMove(this.pokemonId(), this.firstMoveFromList(), position - 1)
        this.store.activateMoveByPosition(this.pokemonId(), position + 1)
      }

      this.moveDataFilter.set("")
      this.moveWasSelected = false
    }, 200)
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
    this.clearBlurTimeout()
    this.abilityDataFilter.set("")
    this.store.ability(this.pokemonId(), ability)
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
    this.blurTimeout = setTimeout(() => {
      if (this.abilityDataFilter() != "") {
        this.store.ability(this.pokemonId(), this.firstAbilityFromList())
        this.abilityDataFilter.set("")
      }
    }, 200)
  }

  itemSelected(item: string) {
    this.clearBlurTimeout()
    this.itemDataFilter.set("")
    this.store.item(this.pokemonId(), item)
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
    this.blurTimeout = setTimeout(() => {
      if (this.itemDataFilter() != "") {
        this.store.item(this.pokemonId(), this.firstItemFromList())
        this.itemDataFilter.set("")
      }
    }, 200)
  }

  pokemonSelected(pokemon: string) {
    this.clearBlurTimeout()
    this.pokemonDataFilter.set("")
    this.store.loadPokemonInfo(this.pokemonId(), pokemon)
    this.showDefaultView()
    this.pokemonInput()?.blur()
  }

  pokemonSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  async pokemonSelectorLostFocus() {
    this.blurTimeout = setTimeout(() => {
      if (this.pokemonDataFilter() != "") {
        this.store.loadPokemonInfo(this.pokemonId(), this.firstPokemonFromList())
        this.pokemonDataFilter.set("")
      }
    }, 200)
  }

  async newPokemonSelectorLostFocus() {
    await this.pokemonSelectorLostFocus()
    if (this.pokemonDataFilter() != "") {
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
    return ogerponForms.includes(this.pokemon().name)
  }

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }

  gridTemplateColumns(): any {
    if (this.hasModifiedStat()) {
      return { "grid-template-columns": "64px 64px 67px 64px 1fr 64px 40px 30px" }
    }

    return { "grid-template-columns": "64px 64px 67px 64px 1fr 64px 40px" }
  }

  clearEvs() {
    this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  }

  optimizeEvs() {
    const defender = this.store.findPokemonById(this.pokemonId())
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
      this.store.evs(this.pokemonId(), { ...optimized })
    }

    this.optimizationApplied.emit()
  }

  discardOptimization() {
    const original = this.originalEvs()
    this.store.evs(this.pokemonId(), original)

    const originalNature = this.originalNature()
    this.store.nature(this.pokemonId(), originalNature)

    this.optimizationDiscarded.emit()
  }

  private clearBlurTimeout() {
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout)
      this.blurTimeout = null
    }
  }
}
