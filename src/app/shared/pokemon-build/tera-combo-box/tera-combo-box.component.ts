import { Component, computed, inject, input, output } from "@angular/core"
import { TerastalButtonComponent } from "@app/shared/buttons/terastal-button/terastal-button.component"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TYPE_CHART } from "@robsonbittencourt/calc"

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

  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }
}
