import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, input, output, signal } from "@angular/core"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatChipListbox, MatChipListboxChange, MatChipOption } from "@angular/material/chips"
import { PokemonHpBadgeComponent } from "@app/features/simple-calc/pokemon-hp-badge/pokemon-hp-badge.component"
import { CopyButtonComponent } from "@app/shared/copy-button/copy-button.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-damage-result",
  templateUrl: "./damage-result.component.html",
  styleUrls: ["./damage-result.component.scss"],
  imports: [WidgetComponent, NgStyle, NgClass, PokemonHpBadgeComponent, MatButtonToggleGroup, MatButtonToggle, MatChipListbox, MatChipOption, WidgetComponent, CopyButtonComponent]
})
export class DamageResultComponent {
  pokemon = input.required<Pokemon>()
  damageResults = input.required<DamageResult[]>()
  opponentDamageResult = input.required<DamageResult>()
  opponentRollLevel = input.required<RollLevelConfig>()
  reverse = input(false)

  moveSetChange = output<string>()
  rollLevelChange = output<RollLevelConfig>()

  rollLevelConfig = signal(RollLevelConfig.high())

  activeMoveName = computed(() => this.pokemon().activeMoveName)

  activeDamageResult = computed(() => {
    const active = this.damageResults().find(result => result.move == this.pokemon().activeMoveName)
    return active ? active : this.damageResults()[0]
  })

  rolls = computed(() => {
    return [...new Set(this.activeDamageResult().rolls)]
  })

  damageInflicted = computed(() => this.damageTakenByRoll(this.activeDamageResult(), this.rollLevelConfig()))
  damageTaken = computed(() => this.damageTakenByRoll(this.opponentDamageResult(), this.opponentRollLevel()))

  moveSelected(event: MatChipListboxChange) {
    if (!event.value || event.value == this.pokemon().activeMoveName) {
      event.source.value = this.pokemon().activeMoveName
    } else {
      this.moveSetChange.emit(event.value)
    }
  }

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

  private damageTakenByRoll(damageResult: DamageResult, rollLevelConfig: RollLevelConfig): number {
    if (rollLevelConfig.high) {
      return damageResult.rolls![15]
    }

    if (rollLevelConfig.medium) {
      return damageResult.rolls![7]
    }

    return damageResult.rolls![0]
  }
}
