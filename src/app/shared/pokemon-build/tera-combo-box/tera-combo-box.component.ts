import { Component, computed, inject, input } from "@angular/core"
import { MatTooltip } from "@angular/material/tooltip"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { TYPE_CHART } from "@robsonbittencourt/calc"

@Component({
  selector: "app-tera-combo-box",
  imports: [MatTooltip, InputAutocompleteComponent],
  templateUrl: "./tera-combo-box.component.html",
  styleUrl: "./tera-combo-box.component.scss"
})
export class TeraComboBoxComponent {
  pokemonId = input.required<string>()

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))

  store = inject(CalculatorStore)

  allTeraTypes = Object.keys(TYPE_CHART[9]).splice(1).sort()

  terastalyzePokemon() {
    this.store.toogleTeraTypeActive(this.pokemonId())
  }
}
