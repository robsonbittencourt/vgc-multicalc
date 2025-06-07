import { Component, output, signal } from "@angular/core"
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

  rollLevelConfig = signal(RollLevelConfig.high())

  activateHighRoll() {
    this.rollLevelConfig.set(RollLevelConfig.high())
    this.rollLevelChange.emit(this.rollLevelConfig())
  }

  activateMediumRoll() {
    this.rollLevelConfig.set(RollLevelConfig.medium())
    this.rollLevelChange.emit(this.rollLevelConfig())
  }

  activateLowRoll() {
    this.rollLevelConfig.set(RollLevelConfig.low())
    this.rollLevelChange.emit(this.rollLevelConfig())
  }
}
