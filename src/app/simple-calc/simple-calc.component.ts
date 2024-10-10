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

  leftDamageResults: DamageResult[]
  rightDamageResults: DamageResult[]

  leftDamageTaken: number
  rightDamageTaken: number

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

  leftMoveActivated() {
    this.rightDamageTaken = this.calculateDamageTaken(this.leftPokemon, this.leftDamageResults)
  }

  rightPokemonChanged() {
    this.calculateDamageRightPokemon()
    this.dataChangedEvent.emit()
  }

   rightMoveActivated() {
    this.leftDamageTaken = this.calculateDamageTaken(this.rightPokemon, this.rightDamageResults)
  }

  fieldChanged() {
    this.calculateDamageLeftPokemon()
    this.calculateDamageRightPokemon()
    this.dataChangedEvent.emit()
  }

  private calculateDamageLeftPokemon() {
    this.leftDamageResults = this.damageCalculator.calcDamageAllAttacks(this.leftPokemon, this.rightPokemon)
    this.rightDamageTaken = this.calculateDamageTaken(this.leftPokemon, this.leftDamageResults)
  }

  private calculateDamageRightPokemon() {
    this.rightDamageResults = this.damageCalculator.calcDamageAllAttacks(this.rightPokemon, this.leftPokemon)
    this.leftDamageTaken = this.calculateDamageTaken(this.rightPokemon, this.rightDamageResults)
  }

  private calculateDamageTaken(attackerPokemon: Pokemon, damageResults: DamageResult[]) {
    const damageResult = damageResults.find(result => result.move == attackerPokemon.move.name)!
    return damageResult.rolls![15]
  } 

}
