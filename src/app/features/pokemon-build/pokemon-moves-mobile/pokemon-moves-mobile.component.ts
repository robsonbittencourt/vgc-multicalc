import { Component, computed, inject, input, output } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { CalculatorStore } from "@data/store/calculator-store"
import { MultiHitComboBoxComponent } from "@features/pokemon-build/multi-hit-combo-box/multi-hit-combo-box.component"

@Component({
  selector: "app-pokemon-moves-mobile",
  templateUrl: "./pokemon-moves-mobile.component.html",
  styleUrl: "./pokemon-moves-mobile.component.scss",
  imports: [MatChipListbox, MatChipOption, MatIcon, MultiHitComboBoxComponent]
})
export class PokemonMovesMobileComponent {
  pokemonId = input.required<string>()
  showEdit = input<boolean>(true)
  showHits = input<boolean>(true)
  editingMoves = input<boolean>(false)

  editMovesRequested = output()
  closeMovesRequested = output()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  hasPossibleHits = computed(() => this.showHits() && this.pokemon().moveSet.activeMove.possibleHits.length > 0)

  activateMove(position: number) {
    this.store.activateMoveByPosition(this.pokemonId(), position)
  }
}
