import { Component, computed, inject, input } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { MOVE_DETAILS } from "@data/move-details"
import { POKEMON_DETAILS } from "@data/pokemon-details"
import { POKEMON_DETAILS_CHAMPIONS } from "@data/pokemon-details-champions"
import { CalculatorStore } from "@data/store/calculator-store"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"

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
    const details = this.store.game() === "champions" ? POKEMON_DETAILS_CHAMPIONS : POKEMON_DETAILS
    const pokemonDetails = Object.values(details).find(p => p.name == this.pokemon().name)!
    return pokemonDetails.learnset.map(move => MOVE_DETAILS[move].name)
  })

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }

  editMoves() {
    this.editAttacks = true
  }

  saveMoves() {
    this.editAttacks = false
  }
}
