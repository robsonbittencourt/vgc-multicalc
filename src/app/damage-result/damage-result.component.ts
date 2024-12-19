import { NgStyle } from "@angular/common"
import { Component, computed, input, output, signal } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle"
import { MatChipListbox, MatChipListboxChange, MatChipOption } from "@angular/material/chips"
import { MatIcon } from "@angular/material/icon"
import { MatTooltip } from "@angular/material/tooltip"
import { PokemonHpBadgeComponent } from "@app/pokemon-hp-badge/pokemon-hp-badge.component"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-damage-result",
  templateUrl: "./damage-result.component.html",
  styleUrls: ["./damage-result.component.scss"],
  imports: [NgStyle, PokemonHpBadgeComponent, MatButtonToggleGroup, MatButtonToggle, MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, MatTooltip]
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

  damageTaken = computed(() => this.damageTakenByRoll(this.opponentDamageResult(), this.rollLevelConfig()))

  copyMessageEnabled = false

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

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
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
