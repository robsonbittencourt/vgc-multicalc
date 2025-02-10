import { Component, computed, inject, input, output } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { TeraComboBoxComponent } from "@app/shared/pokemon-build/tera-combo-box/tera-combo-box.component"
import { Items } from "@data/items"
import { Moves } from "@data/moves"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"
import { Status } from "@lib/model/status"
import { NATURES } from "@robsonbittencourt/calc"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, InputAutocompleteComponent, MatTooltip, MatCheckbox, AbilityComboBoxComponent, EvSliderComponent, TeraComboBoxComponent]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()

  pokemonChangedEvent = output<Pokemon>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allItemsNames = Items.instance.allItems()
  allMoveNames = Moves.instance.allMoves()
  allNatureNames = Object.keys(NATURES)
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]

  editAttacks = false

  statusConditions = Status.allDescriptions()

  activateMove1() {
    this.activateMove(1)
  }

  activateMove2() {
    this.activateMove(2)
  }

  activateMove3() {
    this.activateMove(3)
  }

  activateMove4() {
    this.activateMove(4)
  }

  private activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }
}
