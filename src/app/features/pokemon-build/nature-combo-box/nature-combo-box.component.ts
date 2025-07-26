import { Component, computed, inject, input } from "@angular/core"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { Natures } from "@data/natures"
import { CalculatorStore } from "@data/store/calculator-store"

@Component({
  selector: "app-nature-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./nature-combo-box.component.html",
  styleUrl: "./nature-combo-box.component.scss"
})
export class NatureComboBoxComponent {
  pokemonId = input.required<string>()
  leftLabel = input(false)

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  allNatureNames = Natures.instance.natures
}
