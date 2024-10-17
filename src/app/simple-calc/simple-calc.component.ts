import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Move } from 'src/lib/move';
import { Pokemon } from 'src/lib/pokemon';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss']
})
export class SimpleCalcComponent {

  leftPokemon: Pokemon = this.data.leftPokemon
  rightPokemon: Pokemon = this.data.rightPokemon

  leftDamageResults: DamageResult[]
  rightDamageResults: DamageResult[]

  leftDamageResult: DamageResult
  rightDamageResult: DamageResult

  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  constructor(public data: DataStore, private damageCalculator: DamageCalculatorService) {}

  ngOnInit() {
    this.calculateDamage()
  }

  leftPokemonChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  leftMoveActivated() {
    this.leftDamageResult = this.findResultByMove(this.leftDamageResults, this.leftPokemon.move)
    this.dataChangedEvent.emit()
  }

  rightPokemonChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  rightMoveActivated() {
    this.rightDamageResult = this.findResultByMove(this.rightDamageResults, this.rightPokemon.move)
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  private calculateDamage() {
    this.leftDamageResults = this.damageCalculator.calcDamageAllAttacks(this.leftPokemon, this.rightPokemon)
    this.leftDamageResult = this.findResultByMove(this.leftDamageResults, this.leftPokemon.move)
    
    this.rightDamageResults = this.damageCalculator.calcDamageAllAttacks(this.rightPokemon, this.leftPokemon)
    this.rightDamageResult = this.findResultByMove(this.rightDamageResults, this.rightPokemon.move)
  }

  private findResultByMove(damageResults: DamageResult[], move: Move): DamageResult {
    return damageResults?.find(result => result.move == move.name)!
  }

}
