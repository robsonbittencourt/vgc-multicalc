import { Component, computed, inject, input } from "@angular/core"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { Items } from "@data/items"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-item-combo-box",
  imports: [InputAutocompleteComponent],
  templateUrl: "./item-combo-box.component.html",
  styleUrl: "./item-combo-box.component.scss"
})
export class ItemComboBoxComponent {
  pokemonId = input.required<string>()

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allItemsNames = Items.instance.items
}
