import { Component, computed, inject, input } from "@angular/core"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-multi-hit-combo-box",
  imports: [InputAutocompleteComponent],
  templateUrl: "./multi-hit-combo-box.component.html",
  styleUrl: "./multi-hit-combo-box.component.scss"
})
export class MultiHitComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
  multiHitLabel = computed(() => (this.pokemon().activeMoveName !== "Rage Fist" ? "Hits" : "Hits Taken"))

  alliesFainted = ["0", "1", "2", "3", "4", "5", "6", "7"]

  alliesFaintedChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.alliesFainted(this.pokemonId(), event, activeMovePosition)
  }

  hitsChanged(event: string) {
    const activeMovePosition = this.pokemon().moveSet.activeMovePosition
    this.store.hits(this.pokemonId(), event, activeMovePosition)
  }
}
