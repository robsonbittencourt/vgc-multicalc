import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatFormField } from "@angular/material/form-field"
import { MatOption, MatSelect } from "@angular/material/select"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { InputAutocompleteComponent } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Regulation } from "@lib/types"

@Component({
  selector: "app-speed-list",
  templateUrl: "./speed-list.component.html",
  styleUrl: "./speed-list.component.scss",
  imports: [WidgetComponent, InputAutocompleteComponent, MatFormField, MatSelect, MatOption, MatButtonToggleGroup, MatButtonToggle, SpeedScaleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpeedListComponent {
  store = inject(CalculatorStore)
  optionsStore = inject(SpeedCalcOptionsStore)

  pokemonId = computed(() => this.store.team().activePokemon().id)

  regulationsList: Regulation[] = ["G", "H"]

  statsModifiers = [
    { value: 6, viewValue: "+6" },
    { value: 5, viewValue: "+5" },
    { value: 4, viewValue: "+4" },
    { value: 3, viewValue: "+3" },
    { value: 2, viewValue: "+2" },
    { value: 1, viewValue: "+1" },
    { value: 0, viewValue: "--" },
    { value: -1, viewValue: "-1" },
    { value: -2, viewValue: "-2" },
    { value: -3, viewValue: "-3" },
    { value: -4, viewValue: "-4" },
    { value: -5, viewValue: "-5" },
    { value: -6, viewValue: "-6" }
  ]
}
