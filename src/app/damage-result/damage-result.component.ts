import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';
import { RollLevelConfig } from 'src/lib/roll-level-config';
import { NgStyle, NgFor, NgIf } from '@angular/common';
import { PokemonHpBadgeComponent } from '../pokemon-hp-badge/pokemon-hp-badge.component';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-damage-result',
    templateUrl: './damage-result.component.html',
    styleUrls: ['./damage-result.component.scss'],
    standalone: true,
    imports: [NgStyle, PokemonHpBadgeComponent, MatButtonToggleGroup, MatButtonToggle, MatChipListbox, ReactiveFormsModule, FormsModule, NgFor, MatChipOption, MatIcon, MatTooltip, NgIf]
})
export class DamageResultComponent {

  selectedMove: string

  activeDamageResult: DamageResult
  _opponentDamageResult: DamageResult

  _damageResults: DamageResult[]
  damageTaken: number
    
  actualHp: number
  hpPercentage: number
  hpBarColor: string

  copyMessageEnabled = false
  imageScale: number = 1.2

  timeoutId: any

  @Input()
  pokemon: Pokemon

  @Input()
  reverse: boolean

  @Input()
  rollLevelConfig: RollLevelConfig

  @Input()
  get damageResults(): DamageResult[] {
    return this._damageResults
  }

  public set damageResults(damageResults: DamageResult[]) {
    if (this._damageResults) {
      clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => this.setResults(damageResults), 80)   
    } else {
      this.setResults(damageResults)
    }
  }

  @Input()
  get opponentDamageResult(): DamageResult {
    return this._opponentDamageResult
  }

  public set opponentDamageResult(opponentDamageResult: DamageResult) {
    this._opponentDamageResult = opponentDamageResult
    this.damageTaken = this.damageTakenByRoll(opponentDamageResult)
  }

  @Output() 
  moveActivatedEvent = new EventEmitter<any>()

  @Output() 
  rollLevelChangedEvent = new EventEmitter<any>()

  private setResults(damageResults: DamageResult[]) {
    this._damageResults = damageResults
    this.activeDamageResult = damageResults.find(result => result.move == this.pokemon.move.name)!
  }

  moveActivated(moveName: string) {
    this.pokemon.moveSet.activeMoveByName(moveName)
    this.activeDamageResult = this.damageResults.find(result => result.move == moveName)!
    this.moveActivatedEvent.emit()
  }

  moveChanged() {
    setTimeout(() => {
      if (!this.selectedMove) {
        this.selectedMove = this.activeDamageResult.move
      }
    }, 0)
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  activeHighRoll() {
    this.rollLevelConfig.high = true
    this.rollLevelConfig.medium = false
    this.rollLevelConfig.low = false
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)
    
    this.rollLevelChangedEvent.emit()
  }

  activeMediumRoll() {
    this.rollLevelConfig.high = false
    this.rollLevelConfig.medium = true
    this.rollLevelConfig.low = false
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)

    this.rollLevelChangedEvent.emit()
  }

  activeLowRoll() {
    this.rollLevelConfig.high = false
    this.rollLevelConfig.medium = false
    this.rollLevelConfig.low = true
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)

    this.rollLevelChangedEvent.emit()
  }

  private damageTakenByRoll(damageResult: DamageResult): number {
    if(this.rollLevelConfig.high) {
      return damageResult.rolls![15]
    }

    if(this.rollLevelConfig.medium) {
      return damageResult.rolls![7]
    }

    return damageResult.rolls![0]    
  }

}
