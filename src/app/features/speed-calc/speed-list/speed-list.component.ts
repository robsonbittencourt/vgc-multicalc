import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, output } from "@angular/core"
import { OpponentOptionsComponent } from "@app/features/speed-calc/opponent-options/opponent-options.component"
import { SpeedScaleComponent } from "@app/features/speed-calc/speed-scale/speed-scale.component"
import { InputAutocompleteComponent, KeyValuePair } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"
import { Pokemon } from "@lib/model/pokemon"
import { Regulation } from "@lib/types"

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

  regulationsList: Regulation[] = ["G", "H"]

  statsModifiers: KeyValuePair[] = [
    { key: "+6", value: "6" },
    { key: "+5", value: "5" },
    { key: "+4", value: "4" },
    { key: "+3", value: "3" },
    { key: "+2", value: "2" },
    { key: "+1", value: "1" },
    { key: "--", value: "0" },
    { key: "-1", value: "-1" },
    { key: "-2", value: "-2" },
    { key: "-3", value: "-3" },
    { key: "-4", value: "-4" },
    { key: "-5", value: "-5" },
    { key: "-6", value: "-6" }
  ]

  updateSpeedModifier(event: string) {
    this.optionsStore.updateSpeedModifier(parseInt(event))
  }
}
