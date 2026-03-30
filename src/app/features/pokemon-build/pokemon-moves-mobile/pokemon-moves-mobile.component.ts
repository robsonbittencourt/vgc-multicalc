import { Component, computed, inject, input } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { MOVE_DETAILS } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"
import { MultiHitComboBoxComponent } from "../multi-hit-combo-box/multi-hit-combo-box.component"

@Component({
  selector: "app-pokemon-moves-mobile",
  templateUrl: "./pokemon-moves-mobile.component.html",
  styleUrl: "./pokemon-moves-mobile.component.scss",
  imports: [MatChipListbox, MatChipOption, MatIcon, InputAutocompleteComponent, MultiHitComboBoxComponent]
})
export class PokemonMovesMobileComponent {
  pokemonId = input.required<string>()
  showEdit = input<boolean>(true)

  store = inject(CalculatorStore)

  editAttacks = false

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allMoveNames = computed(() => {
    const pokemonDetails = Object.values(POKEMON_DETAILS).find(p => p.name == this.pokemon().name)!
    return pokemonDetails.learnset.map(move => MOVE_DETAILS[move].name)
  })

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
