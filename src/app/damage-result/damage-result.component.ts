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
  _damageResults: DamageResult[]
  _damageTaken: number
  actualHp: number
  hpPercentage: number
  hpBarColor: string

  copyMessageEnabled = false

  @Input()
  pokemon: Pokemon

  @Input()
  get damageTaken(): number {
    return this._damageTaken
  }

  @Output() 
  moveActivatedEvent = new EventEmitter<any>()

  public set damageTaken(damageTaken: number) {
    this._damageTaken = damageTaken
    this.setActualHp()
    this.setHpPercentage()
    this.setHpBarColor()
  }

  @Input()
  get damageResults(): DamageResult[] {
    return this._damageResults
  }

  public set damageResults(damageResults: DamageResult[]) {
    this._damageResults = damageResults
    this.activeDamageResult = damageResults.find(result => result.move == this.pokemon.move.name)!
  }

  moveActivated(moveName: string) {
    this.pokemon.moveSet.activeMoveByName(moveName)
    this.activeDamageResult = this.damageResults.find(result => result.move == moveName)!
    this.moveActivatedEvent.emit()
  }

  private setActualHp() {
    const hp = this.pokemon.hp - this._damageTaken
    this.actualHp = Math.max(hp, 0)
  }

  private setHpPercentage() {
    const percentage = 100 - ((this._damageTaken / this.pokemon.hp) * 100)
    this.hpPercentage = Math.max(percentage, 0)
  }

  private setHpBarColor() {
    if (this.hpPercentage < 20) {
      this.hpBarColor = "#f33d42" //red
    } else if (this.hpPercentage <= 50) {
      this.hpBarColor = "#fe9901" //yellow
    } else {
      this.hpBarColor = "#30ca2e" //green
    }    
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

}
