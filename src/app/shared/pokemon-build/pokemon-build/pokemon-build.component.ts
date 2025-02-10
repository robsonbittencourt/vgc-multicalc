import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { MatCheckbox } from "@angular/material/checkbox"
import { RouterOutlet } from "@angular/router"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@app/shared/pokemon-build/item-combo-box/item-combo-box.component"
import { MultiHitComboBoxComponent } from "@app/shared/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { PokemonComboBoxComponent } from "@app/shared/pokemon-build/pokemon-combo-box/pokemon-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@app/shared/pokemon-build/tera-combo-box/tera-combo-box.component"
import { AllPokemon } from "@data/all-pokemon"
import { Moves } from "@data/moves"
import { Natures } from "@data/natures"
import { CalculatorStore } from "@data/store/calculator-store"
import { TypeName } from "@robsonbittencourt/calc/dist/data/interface"

@Component({
  selector: "app-pokemon-build",
  templateUrl: "./pokemon-build.component.html",
  styleUrls: ["./pokemon-build.component.scss"],
  imports: [
    NgStyle,
    NgClass,
    MatCheckbox,
    FormsModule,
    RouterOutlet,
    InputAutocompleteComponent,
    PokemonComboBoxComponent,
    AbilityComboBoxComponent,
    EvSliderComponent,
    TeraComboBoxComponent,
    MultiHitComboBoxComponent,
    StatusComboBoxComponent,
    ItemComboBoxComponent
  ]
})
export class PokemonBuildComponent {
  pokemonId = input.required<string>()
  reverse = input<boolean>(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  MAX_EVS = 508

  allMoveNames = Moves.instance.allMoves()
  allNatureNames = Natures.instance.natures
  allPokemonNames = AllPokemon.instance.allPokemonNames
  availableAbilities: string[]

  moveSelectorDisabled(move: string): boolean {
    return !move || move == this.pokemon().activeMoveName
  }

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
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
