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
import { TypeComboBoxComponent } from "../type-combo-box/type-combo-box.component"

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
    ItemComboBoxComponent,
    TypeComboBoxComponent
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
}
