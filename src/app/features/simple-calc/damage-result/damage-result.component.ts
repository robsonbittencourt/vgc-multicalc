import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, input, output, signal } from "@angular/core"
import { MatChipListbox, MatChipListboxChange, MatChipOption } from "@angular/material/chips"
import { PokemonHpBadgeComponent } from "@app/features/simple-calc/pokemon-hp-badge/pokemon-hp-badge.component"
import { RollConfigComponent } from "@app/roll-config/roll-config.component"
import { CopyButtonComponent } from "@app/shared/buttons/copy-button/copy-button.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Pokemon } from "@lib/model/pokemon"

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

  moveSetChange = output<string>()
  rollLevelChange = output<RollLevelConfig>()

  rollLevelConfig = signal(RollLevelConfig.high())

  activeMoveName = computed(() => this.pokemon().activeMoveName)

  activeDamageResult = computed(() => {
    const active = this.damageResults().find(result => result.move == this.pokemon().activeMoveName)
    return active ? active : this.damageResults()[0]
  })

  rolls = computed(() => {
    return this.activeDamageResult().attackerRolls
  })

  rollIndexActive = computed(() => {
    if (this.rollLevelConfig().high) return 15
    if (this.rollLevelConfig().medium) return 7
    return 0
  })

  damageInflicted = computed(() => this.activeDamageResult().damageByRollConfig(this.rollLevelConfig()))
  damageTaken = computed(() => this.opponentDamageResult().damageByRollConfig(this.opponentRollLevel()))

  moveSelected(event: MatChipListboxChange) {
    if (!event.value || event.value == this.pokemon().activeMoveName) {
      event.source.value = this.pokemon().activeMoveName
    } else {
      this.moveSetChange.emit(event.value)
    }
  }

  rollLevelChanged(rollLevel: RollLevelConfig) {
    this.rollLevelConfig.set(rollLevel)
    this.rollLevelChange.emit(rollLevel)
  }
}
