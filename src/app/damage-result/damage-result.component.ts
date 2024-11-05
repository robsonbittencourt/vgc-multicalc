import { NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatChipListbox, MatChipListboxChange, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';
import { RollLevelConfig } from 'src/lib/roll-level-config';
import { PokemonHpBadgeComponent } from '../pokemon-hp-badge/pokemon-hp-badge.component';

@Component({
  selector: 'app-damage-result',
  templateUrl: './damage-result.component.html',
  styleUrls: ['./damage-result.component.scss'],
  standalone: true,
  imports: [NgStyle, PokemonHpBadgeComponent, MatButtonToggleGroup, MatButtonToggle, MatChipListbox, ReactiveFormsModule, FormsModule, MatChipOption, MatIcon, MatTooltip]
})
export class DamageResultComponent {

  pokemon = input.required<Pokemon>()
  damageResults = input.required<DamageResult[]>()
  opponentDamageResult = input.required<DamageResult>()
  rollLevelConfig = input.required<RollLevelConfig>()

  reverse = input(false)

  moveSetChange = output<string>()
  rollLevelChange = output<RollLevelConfig>()

  activeDamageResult = computed(() => {
    const active = this.damageResults().find(result => result.move == this.pokemon().activeMoveName)
    return active ? active : this.damageResults()[0]
  })

  damageTaken = computed(() => this.damageTakenByRoll(this.opponentDamageResult(), this.rollLevelConfig()))

  selectedMove = ""
  copyMessageEnabled = false
  
  ngOnInit() {
    this.selectedMove = this.pokemon().activeMoveName
  }

  moveSelected(event: MatChipListboxChange) {
    if (!event.value || event.value == this.selectedMove) {
      event.source.value = this.selectedMove
    } else {
      this.selectedMove = event.value
      this.moveSetChange.emit(this.selectedMove)
    }
  }
  
  activateHighRoll() {
    this.rollLevelChange.emit(RollLevelConfig.high())
  }

  activateMediumRoll() {
    this.rollLevelChange.emit(RollLevelConfig.medium())
  }

  activateLowRoll() {
    this.rollLevelChange.emit(RollLevelConfig.low())
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  private damageTakenByRoll(damageResult: DamageResult, rollLevelConfig: RollLevelConfig): number {
    if(rollLevelConfig.high) {
      return damageResult.rolls![15]
    }

    if(rollLevelConfig.medium) {
      return damageResult.rolls![7]
    }

    return damageResult.rolls![0]    
  }

}
