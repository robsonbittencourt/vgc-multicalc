import { Component, Input } from '@angular/core';
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

  copyMessageEnabled = false

  @Input()
  pokemon: Pokemon

  @Input()
  get damageResults(): DamageResult[] {
    return this._damageResults
  }

  public set damageResults(damageResults: DamageResult[]) {
    this._damageResults = damageResults
    this.activeDamageResult = damageResults.find(result => result.move == this.pokemon.move.name)!
  }

  moveWasActivated(moveName: string) {
    this.pokemon.moveSet.activeMoveByName(moveName)
    this.activeDamageResult = this.damageResults.find(result => result.move == moveName)!
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

}
