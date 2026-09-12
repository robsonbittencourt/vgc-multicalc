import { Component, inject } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { InputSelectComponent } from "@shared/input-select/input-select.component"
import { STAT_MODIFIERS } from "@shared/input-select/stat-modifiers"
import { SpeedCalcOptionsStore } from "@store/speed-calc-options-store"

@Component({
  selector: "app-opponent-options",
  imports: [MatButtonToggleGroup, MatButtonToggle, InputSelectComponent],
  templateUrl: "./opponent-options.component.html",
  styleUrl: "./opponent-options.component.scss"
})
export class OpponentOptionsComponent {
  optionsStore = inject(SpeedCalcOptionsStore)

  statsModifiers = STAT_MODIFIERS

  updateSpeedModifier(event: string) {
    this.optionsStore.updateSpeedModifier(parseInt(event))
  }
}
