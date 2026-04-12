import { Component, computed, inject, input } from "@angular/core"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { AVAILABLE_ITEMS } from "@data/available-items"
import { ITEM_DETAILS } from "@data/item-details"
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

  allItemsNames = computed(() => {
    const game = this.store.game()
    const availableItemKeys = AVAILABLE_ITEMS[game]
    return availableItemKeys.map(key => {
      const itemDetail = ITEM_DETAILS[key]
      return itemDetail?.name || key
    })
  })

  isItemDisabled() {
    const ogerponForms = ["Ogerpon-Wellspring", "Ogerpon-Hearthflame", "Ogerpon-Cornerstone"]
    return ogerponForms.includes(this.pokemon().name) || this.pokemon().name.includes("-Mega")
  }
}
