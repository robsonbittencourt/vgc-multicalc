import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';

@Component({
  selector: 'app-damage-result',
  templateUrl: './damage-result.component.html',
  styleUrls: ['./damage-result.component.scss']
})
export class DamageResultComponent {

  activeDamageResult: DamageResult
  _opponentDamageResult: DamageResult

  _damageResults: DamageResult[]
  damageTaken: number
    
  actualHp: number
  hpPercentage: number
  hpBarColor: string

  highRoll: boolean = true
  mediumRoll: boolean = false
  lowRoll: boolean = false

  copyMessageEnabled = false
  imageScale: number = 1.2

  timeoutId: any

  @Input()
  pokemon: Pokemon

  @Input()
  reverse: boolean

  @Output() 
  moveActivatedEvent = new EventEmitter<any>()

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

  private setResults(damageResults: DamageResult[]) {
    this._damageResults = damageResults
    this.activeDamageResult = damageResults.find(result => result.move == this.pokemon.move.name)!
  }

  moveActivated(moveName: string) {
    this.pokemon.moveSet.activeMoveByName(moveName)
    this.activeDamageResult = this.damageResults.find(result => result.move == moveName)!
    this.moveActivatedEvent.emit()
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  activeHighRoll() {
    this.highRoll = true
    this.mediumRoll = false
    this.lowRoll = false
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)
  }

  activeMediumRoll() {
    this.highRoll = false
    this.mediumRoll = true
    this.lowRoll = false
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)
  }

  activeLowRoll() {
    this.highRoll = false
    this.mediumRoll = false
    this.lowRoll = true
    this.damageTaken = this.damageTakenByRoll(this._opponentDamageResult)
  }

  private damageTakenByRoll(damageResult: DamageResult): number {
    if(this.highRoll) {
      return damageResult.rolls![15]
    }

    if(this.mediumRoll) {
      return damageResult.rolls![7]
    }

    return damageResult.rolls![0]    
  }

}
