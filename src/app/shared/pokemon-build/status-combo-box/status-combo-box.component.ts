import { Component, computed, inject, input } from "@angular/core"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { Status } from "@lib/model/status"

@Component({
  selector: "app-status-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./status-combo-box.component.html",
  styleUrl: "./status-combo-box.component.scss"
})
export class StatusComboBoxComponent {
  pokemonId = input.required<string>()
  statusConditions = input(Status.allDescriptions())

  store = inject(CalculatorStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
}
