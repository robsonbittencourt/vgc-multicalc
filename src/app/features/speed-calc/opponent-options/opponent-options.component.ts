import { Component, inject } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { KeyValuePair } from "@app/shared/input-autocomplete/input-autocomplete.component"
import { InputSelectComponent } from "@app/shared/input-select/input-select.component"
import { SpeedCalcOptionsStore } from "@data/store/speed-calc-options-store"

@Component({
  selector: "app-opponent-options",
  imports: [MatButtonToggleGroup, MatButtonToggle, InputSelectComponent],
  templateUrl: "./opponent-options.component.html",
  styleUrl: "./opponent-options.component.scss"
})
export class OpponentOptionsComponent {
  optionsStore = inject(SpeedCalcOptionsStore)

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
