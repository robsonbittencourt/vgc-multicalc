import { Component, computed, inject, input, output } from "@angular/core"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { CalcStore } from "@store/calc-store"
import { Status } from "@multicalc/model"

@Component({
  selector: "app-status-combo-box",
  imports: [InputSelectComponent],
  templateUrl: "./status-combo-box.component.html",
  styleUrl: "./status-combo-box.component.scss"
})
export class StatusComboBoxComponent {
  pokemonId = input.required<string>()
  statusConditions = input(Status.allDescriptions())
  haveFocus = input(false)

  selected = output()

  store = inject(CalcStore)

  pokemon = computed(() => this.store.findPokemonById(this.pokemonId()))
}
