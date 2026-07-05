import { Component, computed, inject, input, output } from "@angular/core"
import { InputSelectComponent } from "@basic/input-select/input-select.component"
import { CalculatorStore } from "@store/calculator-store"
import { TerastalButtonComponent } from "@features/buttons/terastal-button/terastal-button.component"
import { TypeName } from "@data/types"

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

  allTeraTypes: TypeName[] = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Stellar", "Water"]

  isTeraDisabled() {
    return this.pokemon().name.startsWith("Ogerpon")
  }
}
