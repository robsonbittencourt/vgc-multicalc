import { Component, computed, inject, input, output } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { AbilityComboBoxComponent } from "@app/shared/pokemon-build/ability-combo-box/ability-combo-box.component"
import { EvSliderComponent } from "@app/shared/pokemon-build/ev-slider/ev-slider.component"
import { ItemComboBoxComponent } from "@app/shared/pokemon-build/item-combo-box/item-combo-box.component"
import { MultiHitComboBoxComponent } from "@app/shared/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"
import { NatureComboBoxComponent } from "@app/shared/pokemon-build/nature-combo-box/nature-combo-box.component"
import { StatusComboBoxComponent } from "@app/shared/pokemon-build/status-combo-box/status-combo-box.component"
import { TeraComboBoxComponent } from "@app/shared/pokemon-build/tera-combo-box/tera-combo-box.component"
import { MOVE_DETAILS } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-pokemon-build-mobile",
  templateUrl: "./pokemon-build-mobile.component.html",
  styleUrls: ["./pokemon-build-mobile.component.scss"],
  imports: [MatChipListbox, MatChipOption, MatIcon, InputAutocompleteComponent, AbilityComboBoxComponent, EvSliderComponent, TeraComboBoxComponent, MultiHitComboBoxComponent, StatusComboBoxComponent, ItemComboBoxComponent, NatureComboBoxComponent]
})
export class PokemonBuildMobileComponent {
  pokemonId = input.required<string>()

  pokemonChangedEvent = output<Pokemon>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allMoveNames = computed(() => {
    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.pokemon().name)!
    return pokemonDetails.learnset.map(move => MOVE_DETAILS[move].name)
  })

  editAttacks = false

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
}
