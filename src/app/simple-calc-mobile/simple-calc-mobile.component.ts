import { Component, effect, inject, output, signal } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Pokemon } from 'src/lib/pokemon';
import { TeamMember } from 'src/lib/team-member';
import { DataStore } from '../../lib/data-store.service';
import { PokemonComboBoxComponent } from '../pokemon-combo-box/pokemon-combo-box.component';
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component';

import { MatIcon } from '@angular/material/icon';
import { FieldStore } from 'src/data/field-store';
import { Field } from 'src/lib/field';
import { FieldComponent } from '../field/field.component';
import { PokemonBuildMobileComponent } from '../pokemon-build-mobile/pokemon-build-mobile.component';

@Component({
  selector: 'app-simple-calc-mobile',
  templateUrl: './simple-calc-mobile.component.html',
  styleUrls: ['./simple-calc-mobile.component.scss'],
  standalone: true,
  imports: [PokemonComboBoxComponent, PokemonTabComponent, MatIcon, PokemonBuildMobileComponent, FieldComponent]
})
export class SimpleCalcMobileComponent {
  
  dataChangedEvent = output()

  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  activeOnEditPokemon: Pokemon
  activeAttackerPokemon: Pokemon
  
  attacker: Pokemon
  leftTeamMember: TeamMember
  rightTeamMember: TeamMember

  damageResult = signal(new DamageResult("", "", "", 0, "", []))

  copyMessageEnabled = false

  constructor() {
    effect(() => {
      this.calculateDamage(this.fieldStore.field())
    },
    {
      allowSignalWrites: true //temporary during refactory
    })
  }
  
  ngOnInit() {
    this.leftTeamMember = this.data.activeTeam().teamMembers()[0]
    this.rightTeamMember = this.data.targets[0]
    this.attacker = this.leftTeamMember.pokemon
    this.calculateDamage(this.fieldStore.field())
  }

  pokemonOnEditChanged() {
    this.calculateDamage(this.fieldStore.field())    
    this.dataChangedEvent.emit()
  }

  private calculateDamage(field: Field) {
    if(this.leftIsAttacker()) {
      this.damageResult.set(this.damageCalculator.calcDamage(this.leftTeamMember.pokemon, this.rightTeamMember.pokemon, field))
    } else {
      this.damageResult.set(this.damageCalculator.calcDamage(this.rightTeamMember.pokemon, this.leftTeamMember.pokemon, field))
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

    this.pokemonOnEditChanged()    
    teamMember.active = true
  }

}
