import { NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { MatTooltip } from "@angular/material/tooltip"
import { RouterOutlet } from "@angular/router"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { AllPokemon } from "@data/all-pokemon"
import { Items } from "@data/items"
import { Natures } from "@data/natures"
import { CalculatorStore } from "@data/store/calculator-store"
import { Status } from "@lib/model/status"
import { MOVES, TYPE_CHART } from "@robsonbittencourt/calc"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [PokemonComboBoxComponent, NgStyle, InputAutocompleteComponent, MatTooltip, MatCheckbox, ReactiveFormsModule, FormsModule, AbilityComboBoxComponent, EvSliderComponent, RouterOutlet]
})
export class PokemonBuildComponent {
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allMoveNames = Object.keys(MOVES[9]).splice(1).sort()
  allNatureNames = Natures.instance.natures
  allItemsNames = Items.instance.allItems()
  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]
  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]

  statusConditions = Status.allDescriptions()

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }

  terastalyzePokemon() {
    this.store.toogleTeraTypeActive(this.pokemonId())
  }

  typeStyle(type?: TypeName): any {
    switch (type) {
      case "Normal": {
        return { "background-color": "#9FA19F" }
      }
      case "Fighting": {
        return { "background-color": "#FF8000" }
      }
      case "Flying": {
        return { "background-color": "#81B9EF" }
      }
      case "Poison": {
        return { "background-color": "#9141CB" }
      }
      case "Ground": {
        return { "background-color": "#915121" }
      }
      case "Rock": {
        return { "background-color": "#AFA981" }
      }
      case "Bug": {
        return { "background-color": "#91A119" }
      }
      case "Ghost": {
        return { "background-color": "#704170" }
      }
      case "Steel": {
        return { "background-color": "#60A1B8" }
      }
      case "Fire": {
        return { "background-color": "#E62829" }
      }
      case "Water": {
        return { "background-color": "#2980EF" }
      }
      case "Grass": {
        return { "background-color": "#3FA129" }
      }
      case "Electric": {
        return { "background-color": "#FAC000" }
      }
      case "Psychic": {
        return { "background-color": "#EF4179" }
      }
      case "Ice": {
        return { "background-color": "#3DCEF3" }
      }
      case "Dragon": {
        return { "background-color": "#5060E1" }
      }
      case "Dark": {
        return { "background-color": "#624D4E" }
      }
      case "Fairy": {
        return { "background-color": "#EF70EF" }
      }

      default: {
        break
      }
    }
  }
}
