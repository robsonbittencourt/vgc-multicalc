import { NgStyle } from "@angular/common"
import { Component, computed, input, output, signal } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
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
  imports: [WidgetComponent, NgStyle, PokemonHpBadgeComponent, MatButtonToggleGroup, MatButtonToggle, MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, WidgetComponent, CopyButtonComponent]
})
export class DamageResultComponent {
  pokemon = input.required<Pokemon>()
  damageResults = input.required<DamageResult[]>()
  opponentDamageResult = input.required<DamageResult>()
  reverse = input(false)

  moveSetChange = output<string>()

  rollLevelConfig = signal(RollLevelConfig.high())

  activeMoveName = computed(() => this.pokemon().activeMoveName)

  activeDamageResult = computed(() => {
    const active = this.damageResults().find(result => result.move == this.pokemon().activeMoveName)
    return active ? active : this.damageResults()[0]
  })

  rolls = computed(() => {
    return [...new Set(this.activeDamageResult().rolls)]
  })

  damageTaken = computed(() => this.damageTakenByRoll(this.opponentDamageResult(), this.rollLevelConfig()))

  moveSelected(event: MatChipListboxChange) {
    if (!event.value || event.value == this.pokemon().activeMoveName) {
      event.source.value = this.pokemon().activeMoveName
    } else {
      this.moveSetChange.emit(event.value)
    }
  }

  activateHighRoll() {
    this.rollLevelConfig.set(RollLevelConfig.high())
  }

  activateMediumRoll() {
    this.rollLevelConfig.set(RollLevelConfig.medium())
  }

  activateLowRoll() {
    this.rollLevelConfig.set(RollLevelConfig.low())
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
