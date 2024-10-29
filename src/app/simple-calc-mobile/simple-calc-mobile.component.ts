import { Component, EventEmitter, Output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';
import { DataStore } from '../../lib/data-store.service';
import { PokemonComboBoxComponent } from '../pokemon-combo-box/pokemon-combo-box.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PokemonBuildMobileComponent } from '../pokemon-build-mobile/pokemon-build-mobile.component';
import { FieldComponent } from '../field/field.component';

@Component({
    selector: 'app-simple-calc-mobile',
    templateUrl: './simple-calc-mobile.component.html',
    styleUrls: ['./simple-calc-mobile.component.scss'],
    standalone: true,
    imports: [PokemonComboBoxComponent, PokemonTabComponent, NgIf, MatIcon, PokemonBuildMobileComponent, FieldComponent]
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
    this.calculateDamage()
  }

  pokemonOnEditChanged(pokemon: Pokemon) {
    this.calculateDamage()    
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  private calculateDamage() {
    if(this.leftIsAttacker()) {
      this.damageResult = this.damageCalculator.calcDamage(this.leftTeamMember.pokemon, this.rightTeamMember.pokemon)
    } else {
      this.damageResult = this.damageCalculator.calcDamage(this.rightTeamMember.pokemon, this.leftTeamMember.pokemon)
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
