import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { MoveSet } from 'src/lib/moveset';
import { Pokemon } from 'src/lib/pokemon';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss']
})
export class SimpleCalcComponent {

  leftPokemon: Pokemon = new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Thunder", "Volt Switch", "Draco Meteor") })
  rightPokemon: Pokemon = new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") })

  leftDamageResult: DamageResult
  leftDamageResults: DamageResult[]

  rightDamageResult: DamageResult
  rightDamageResults: DamageResult[]

  copyMessageEnabled = false

  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  constructor(public data: DataStore, private damageCalculator: DamageCalculatorService) {}

  ngOnInit() {
    this.calculateDamageLeftPokemon()
    this.calculateDamageRightPokemon()
  }

  leftPokemonChanged() {
    this.calculateDamageLeftPokemon()
    this.dataChangedEvent.emit()
  }

  rightPokemonChanged() {
    this.calculateDamageRightPokemon()
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamageLeftPokemon()
    this.calculateDamageRightPokemon()
    this.dataChangedEvent.emit()
  }

  leftMoveWasActivated(moveName: string) {
    this.leftPokemon.moveSet.activeMoveByName(moveName)
    this.leftDamageResult = this.leftDamageResults.find(result => result.move == moveName)!
  }

  copy(text: string) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(text)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  private calculateDamageLeftPokemon() {
    this.leftDamageResults = this.damageCalculator.calcDamageAllAttacks(this.leftPokemon, this.rightPokemon)
    this.leftDamageResult = this.activeDamageResult(this.leftPokemon, this.leftDamageResults)
  }

  private calculateDamageRightPokemon() {
    this.rightDamageResults = this.damageCalculator.calcDamageAllAttacks(this.rightPokemon, this.leftPokemon)
    this.rightDamageResult = this.activeDamageResult(this.rightPokemon, this.rightDamageResults)
  }

  private activeDamageResult(pokemon: Pokemon, damageResults: DamageResult[]): DamageResult {
    return damageResults.find(result => result.move == pokemon.move.name)!
  }

}
