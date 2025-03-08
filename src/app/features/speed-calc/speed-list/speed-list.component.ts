import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, output } from "@angular/core"
import { OpponentOptionsComponent } from "@app/features/speed-calc/opponent-options/opponent-options.component"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Pokemon } from "@lib/model/pokemon"
import { SPEED_CALCULATOR_MODES } from "@lib/speed-calculator/speed-calculator-mode"

@Component({
  selector: "app-speed-list",
  templateUrl: "./speed-list.component.html",
  styleUrl: "./speed-list.component.scss",
  imports: [WidgetComponent, InputAutocompleteComponent, InputSelectComponent, SpeedScaleComponent, OpponentOptionsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeedListComponent {
  store = inject(CalculatorStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonSelected = output<Pokemon>()

  pokemonId = computed(() => this.store.team().activePokemon().id)

  topUsageList: string[] = ["60", "100", "125", "All"]

  speedCalculatorModes: string[] = SPEED_CALCULATOR_MODES
}
