import { AfterViewInit, booleanAttribute, Component, computed, inject, input, output, viewChild } from "@angular/core"
import { InputAutocompleteComponent } from "@basic/input-autocomplete/input-autocomplete.component"
import { AllPokemon } from "@data/pokemon-details"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-pokemon-combo-box",
  templateUrl: "./pokemon-combo-box.component.html",
  styleUrls: ["./pokemon-combo-box.component.scss"],
  imports: [InputAutocompleteComponent]
})
export class PokemonComboBoxComponent implements AfterViewInit {
  store = inject(CalculatorStore)

  pokemonId = input.required<string>()

  autoFocus = input(false, { transform: booleanAttribute })

  pokemonChanged = output()

  name = computed(() => this.store.findPokemonById(this.pokemonId()).name)

  autoCompleteInput = viewChild<InputAutocompleteComponent>("autoCompleteInput")

  allPokemonNames = AllPokemon.instance.allPokemonNames

  ngAfterViewInit() {
    if (this.autoFocus()) {
      this.autoCompleteInput()?.focus()
    }
  }

  onValueManuallySelected(pokemonName: string) {
    this.store.loadPokemonInfo(this.pokemonId(), pokemonName)
    this.pokemonChanged.emit()
  }
}
