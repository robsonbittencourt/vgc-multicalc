import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, input, model, output } from "@angular/core"
import { MatChipListbox, MatChipOption } from "@angular/material/chips"
import { CopyButtonComponent } from "@basic/copy-button/copy-button.component"
import { WidgetComponent } from "@basic/widget/widget.component"
import { RollConfigComponent } from "@features/roll-config/roll-config.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Pokemon } from "@lib/model/pokemon"
import { PokemonHpBadgeComponent } from "@pages/simple-calc/pokemon-hp-badge/pokemon-hp-badge.component"

@Component({
  selector: "app-damage-result",
  templateUrl: "./damage-result.component.html",
  styleUrls: ["./damage-result.component.scss"],
  imports: [NgStyle, NgClass, MatChipListbox, MatChipOption, WidgetComponent, PokemonHpBadgeComponent, CopyButtonComponent, RollConfigComponent]
})
export class DamageResultComponent {
  pokemon = input.required<Pokemon>()
  damageResults = input.required<DamageResult[]>()
  opponentDamageResult = input.required<DamageResult>()
  opponentRollLevel = input.required<RollLevelConfig>()
  reverse = input(false)
  rollLevel = model(RollLevelConfig.high())

  moveSetChange = output<number>()
  rollLevelChange = output<RollLevelConfig>()

  activeMoveIndex = computed(() => this.pokemon().activeMoveIndex)

  activeDamageResult = computed(() => {
    return this.damageResults()[this.activeMoveIndex()] || this.damageResults()[0]
  })

  rolls = computed(() => {
    return this.activeDamageResult().attackerRolls
  })

  rollIndexActive = computed(() => {
    if (this.rollLevel().high) return RollLevelConfig.HIGH_ROLL_INDEX
    if (this.rollLevel().medium) return RollLevelConfig.MEDIUM_ROLL_INDEX

    return RollLevelConfig.LOW_ROLL_INDEX
  })

  damageInflicted = computed(() => this.activeDamageResult().damageByRollConfig(this.rollLevel()))
  damageTaken = computed(() => this.opponentDamageResult().damageByRollConfig(this.opponentRollLevel()))

  moveSelected(index: number) {
    if (index !== this.activeMoveIndex()) {
      this.moveSetChange.emit(index)
    }
  }

  rollLevelChanged(rollLevel: RollLevelConfig) {
    this.rollLevel.set(rollLevel)
    this.rollLevelChange.emit(rollLevel)
  }
}
