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

  leftPokemon: Pokemon = new Pokemon("Miraidon", { nature: "Timid", item: "Choice Specs", teraType: "Electric", evs: { hp: 4, spa: 252, spe: 252 }, moveSet: new MoveSet("Electro Drift", "Parabolic Charge", "Volt Switch", "Draco Meteor") })
  rightPokemon: Pokemon = new Pokemon('Koraidon', { nature: "Adamant", item: "Clear Amulet", teraType: "Fire", evs: { hp: 36, atk: 220, spe: 252 }, moveSet: new MoveSet("Flame Charge", "Collision Course", "Flare Blitz", "Protect") })

  leftDamageResult: DamageResult
  rightDamageResult: DamageResult

  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  constructor(public data: DataStore, private damageCalculator: DamageCalculatorService) {}

  leftPokemonChanged() {
    this.leftDamageResult = this.damageCalculator.calcDamage(this.leftPokemon, this.rightPokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    this.dataChangedEvent.emit()
  }

  rightPokemonChanged() {
    this.rightDamageResult = this.damageCalculator.calcDamage(this.rightPokemon, this.leftPokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.leftDamageResult = this.damageCalculator.calcDamage(this.leftPokemon, this.rightPokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    this.rightDamageResult = this.damageCalculator.calcDamage(this.rightPokemon, this.leftPokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    this.dataChangedEvent.emit()
  }

}
