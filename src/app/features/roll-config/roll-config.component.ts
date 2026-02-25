import { Component, model, output } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"

@Component({
  selector: "app-roll-config",
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: "./roll-config.component.html",
  styleUrl: "./roll-config.component.scss"
})
export class RollConfigComponent {
  rollLevelChange = output<RollLevelConfig>()
  config = model<RollLevelConfig>(RollLevelConfig.high())

  activateHighRoll() {
    this.config.set(RollLevelConfig.high())
    this.rollLevelChange.emit(this.config())
  }

  activateMediumRoll() {
    this.config.set(RollLevelConfig.medium())
    this.rollLevelChange.emit(this.config())
  }

  activateLowRoll() {
    this.config.set(RollLevelConfig.low())
    this.rollLevelChange.emit(this.config())
  }
}
