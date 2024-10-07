import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';
import { DataStore } from '../data-store.service';

@Component({
  selector: 'app-simple-calc-mobile',
  templateUrl: './simple-calc-mobile.component.html',
  styleUrls: ['./simple-calc-mobile.component.scss']
})
export class SimpleCalcMobileComponent {

  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  
  attacker: Pokemon
  leftTeamMember: TeamMember
  rightTeamMember: TeamMember

  damageResult: DamageResult

  copyMessageEnabled = false
  
  constructor(public data: DataStore, private damageCalculator: DamageCalculatorService) {}
  
  @Output() 
  dataChangedEvent = new EventEmitter<any>()

  ngOnInit() {
    this.leftTeamMember = this.data.activeTeam().teamMembers()[0]
    this.rightTeamMember = this.data.targets[0]
    this.attacker = this.leftTeamMember.pokemon
    this.calculateDamage(this.attacker)
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.calculateDamage(pokemon)    
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamage(this.attacker)
    this.dataChangedEvent.emit()
  }

  private calculateDamage(pokemon: Pokemon) {
    if(this.leftIsAttacker()) {
      this.damageResult = this.damageCalculator.calcDamage(pokemon, this.data.targets[0].pokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    } else {
      this.damageResult = this.damageCalculator.calcDamage(this.data.targets[0].pokemon, pokemon, this.data.field, this.data.extraFieldOptions.criticalHit)
    }
  }

  leftIsAttacker() {
    return this.attacker == this.leftTeamMember.pokemon
  }

  rightIsAttacker() {
    return this.attacker == this.rightTeamMember.pokemon
  }

  copyDamageResult(damageResult: DamageResult) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(damageResult.description)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  activatePokemon(teamMember: TeamMember) {
    teamMember.active = true
    this.attacker = teamMember.pokemon

    this.pokemonOnEditChanged(teamMember.pokemon)    
    teamMember.active = true
  }

}
