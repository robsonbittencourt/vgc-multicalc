import { Component, computed, inject, input, output } from "@angular/core"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { CalculatorStore } from "@store/calculator-store"
import { TerastalButtonComponent } from "@features/buttons/terastal-button/terastal-button.component"
import { TERA_TYPES } from "@calc"

@Component({
  selector: "app-tera-combo-box",
  imports: [InputSelectComponent, TerastalButtonComponent],
  templateUrl: "./tera-combo-box.component.html",
  styleUrl: "./tera-combo-box.component.scss"
})
export class TeraComboBoxComponent {
  pokemonId = input.required<string>()
  haveFocus = input(false)

  selected = output()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  store = inject(CalculatorStore)

  allTeraTypes = [...TERA_TYPES].sort()

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }
}
