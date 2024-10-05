import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { Pokemon } from 'src/lib/pokemon';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-simple-calc-mobile',
  templateUrl: './simple-calc-mobile.component.html',
  styleUrls: ['./simple-calc-mobile.component.scss']
})
export class SimpleCalcMobileComponent {

  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  activeSecondAttacker?: Pokemon
  
  constructor(public data: DataStore, private damageCalculator: DamageCalculatorService) {}
  
  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.activeOnEditPokemon = pokemon
    const activeTargets = this.data.targets.filter(t => t.active)
    
    if (pokemon != activeTargets[0]?.pokemon && pokemon != activeTargets[1]?.pokemon) {
      this.activeAttackerPokemon = pokemon
      this.calculateDamageForAll()
    } else {
      this.calculateDamageForAll(false)
    }
    
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamageForAll()
    this.dataChangedEvent.emit()
  }

  private calculateDamageForAll(order: boolean = true) {
    this.damageCalculator.calculateDamageForAll(this.activeAttackerPokemon, order, this.activeSecondAttacker)
  }

  mobileAttackerChanged(isLeftAttacker: boolean) {
    if (isLeftAttacker) {
      this.data.oneVsManyActivated = true
      this.data.manyVsOneActivated = false
    } else {
      this.data.oneVsManyActivated = false
      this.data.manyVsOneActivated = true
    }
  }

}
