import { animate, style, transition, trigger } from "@angular/animations"
import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, effect, inject, input, output, signal, viewChild } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { AbilitiesTableComponent } from "@app/abilities-table/abilities-table.component"
import { InputComponent } from "@app/input/input.component"
import { ItemsTableComponent } from "@app/items-table/items-table.component"
import { MovesTableComponent } from "@app/moves-table/moves-table.component"
import { PokemonTableComponent } from "@app/pokemon-table/pokemon-table.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { MultiHitComboBoxComponent } from "@app/shared/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@app/shared/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@app/shared/pokemon-build/tera-combo-box/tera-combo-box.component"
import { TypeComboBoxComponent } from "@app/shared/pokemon-build/type-combo-box/type-combo-box.component"
import { SETDEX_SV } from "@data/movesets"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  animations: [trigger("fadeInOut", [transition(":enter", [style({ opacity: 0 }), animate("200ms ease-in", style({ opacity: 1 }))])])],
  imports: [
    NgStyle,
    NgClass,
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
    AbilitiesTableComponent,
    ItemsTableComponent,
    PokemonTableComponent
  ]
})
export class PokemonBuildComponent {
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)
  hasFocus = input<boolean>(true)

  selected = output()

  store = inject(CalculatorStore)

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

  someMoveHasFocus = computed(() => {
    return this.move1HasFocus() || this.move2HasFocus() || this.move3HasFocus() || this.move4HasFocus()
  })

  tableWasActive = computed(() => {
    return this.hasFocus() && (this.someMoveHasFocus() || this.pokemonHasFocus() || this.itemHasFocus() || this.abilityHasFocus())
  })

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  pokemonInput = viewChild<InputComponent>("pokemonInput")
  itemInput = viewChild<InputComponent>("itemInput")
  abilityInput = viewChild<InputComponent>("abilityInput")
  move4Input = viewChild<InputComponent>("move4Input")

  MAX_EVS = 508

  moveWasSelected = false

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
    if (this.moveDataFilter() != "" && !this.moveWasSelected) {
      this.store.updateMove(this.pokemonId(), this.firstMoveFromList(), position - 1)
      this.store.activateMoveByPosition(this.pokemonId(), position + 1)
    }

    this.moveDataFilter.set("")
    this.moveWasSelected = false
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
    if (this.abilityDataFilter() != "") {
      this.store.ability(this.pokemonId(), this.firstAbilityFromList())
      this.abilityDataFilter.set("")
    }
  }

  itemSelected(item: string) {
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
    if (this.itemDataFilter() != "") {
      this.store.item(this.pokemonId(), this.firstItemFromList())
      this.itemDataFilter.set("")
    }
  }

  pokemonSelected(pokemon: string) {
    this.pokemonDataFilter.set("")
    this.updatePokemon(pokemon)
    this.showDefaultView()
    this.pokemonInput()?.blur()
  }

  pokemonSelectorOnClick() {
    this.removeFocusFromAllFields()
    this.pokemonHasFocus.set(true)
    this.activeTable.set("pokemon")
    this.selected.emit()
  }

  pokemonSelectorLostFocus() {
    if (this.pokemonDataFilter() != "") {
      this.updatePokemon(this.firstPokemonFromList())
      this.pokemonDataFilter.set("")
    }
  }

  newPokemonSelectorLostFocus() {
    this.pokemonSelectorLostFocus()
    if (this.pokemonDataFilter() != "") {
      this.showDefaultView()
      this.pokemonInput()?.blur()
    }
  }

  private updatePokemon(pokemonName: string) {
    const poke = SETDEX_SV[pokemonName]

    if (poke) {
      this.store.name(this.pokemonId(), pokemonName)
      this.store.nature(this.pokemonId(), poke.nature)
      this.store.item(this.pokemonId(), poke.items[0])
      this.store.ability(this.pokemonId(), poke.ability)
      this.store.teraType(this.pokemonId(), poke.teraType)
      this.store.teraTypeActive(this.pokemonId(), false)
      this.store.evs(this.pokemonId(), poke.evs)
      this.store.moveOne(this.pokemonId(), poke.moves[0])
      this.store.moveTwo(this.pokemonId(), poke.moves[1])
      this.store.moveThree(this.pokemonId(), poke.moves[2])
      this.store.moveFour(this.pokemonId(), poke.moves[3])
      this.store.activateMoveByPosition(this.pokemonId(), 1)
    } else {
      this.store.name(this.pokemonId(), pokemonName)
      this.store.nature(this.pokemonId(), "Docile")
      this.store.item(this.pokemonId(), "Leftovers")
      this.store.ability(this.pokemonId(), "Hustle")
      this.store.teraType(this.pokemonId(), "Normal")
      this.store.evs(this.pokemonId(), { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
      this.store.moveOne(this.pokemonId(), "Tackle")
      this.store.moveTwo(this.pokemonId(), "")
      this.store.moveThree(this.pokemonId(), "")
      this.store.moveFour(this.pokemonId(), "")
      this.store.activateMoveByPosition(this.pokemonId(), 1)
    }

    this.store.commander(this.pokemonId(), false)
    this.store.hpPercentage(this.pokemonId(), 100)

    this.adjustBoosts(pokemonName)
  }

  adjustBoosts(pokemonName: string) {
    if (pokemonName.startsWith("Zacian")) {
      this.store.boosts(this.pokemonId(), { atk: 1, def: 0, spa: 0, spd: 0, spe: 0 })
      return
    }

    if (pokemonName.startsWith("Zamazenta")) {
      this.store.boosts(this.pokemonId(), { atk: 0, def: 1, spa: 0, spd: 0, spe: 0 })
      return
    }

    this.store.boosts(this.pokemonId(), { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
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
}
