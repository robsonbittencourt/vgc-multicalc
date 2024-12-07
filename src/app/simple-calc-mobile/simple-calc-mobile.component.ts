import { Component, computed, inject, signal } from '@angular/core'
import { DataStore } from 'src/data/data-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { DamageResult } from 'src/lib/damage-result'
import { PokemonComboBoxComponent } from '../pokemon-combo-box/pokemon-combo-box.component'
import { PokemonTabComponent } from '../pokemon-tab/pokemon-tab.component'

import { MatIcon } from '@angular/material/icon'
import { FieldStore } from 'src/data/store/field-store'
import { FieldComponent } from '../field/field.component'
import { PokemonBuildMobileComponent } from '../pokemon-build-mobile/pokemon-build-mobile.component'

@Component({
  selector: 'app-simple-calc-mobile',
  templateUrl: './simple-calc-mobile.component.html',
  styleUrls: ['./simple-calc-mobile.component.scss'],
  standalone: true,
  imports: [PokemonComboBoxComponent, PokemonTabComponent, MatIcon, PokemonBuildMobileComponent, FieldComponent]
})
export class SimpleCalcMobileComponent {
  
  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  attacker = signal(this.data.leftPokemon())
 
  leftIsAttacker = computed(() => this.attacker().id === this.data.leftPokemon().id)
  rightIsAttacker = computed(() => this.attacker().id === this.data.rightPokemon().id)

  damageResult = computed(() => {
    if(this.leftIsAttacker()) {
      return this.damageCalculator.calcDamage(this.data.leftPokemon(), this.data.rightPokemon(), this.fieldStore.field())
    } else {
      return this.damageCalculator.calcDamage(this.data.rightPokemon(), this.data.leftPokemon(), this.fieldStore.field())
    }
  })

  copyMessageEnabled = false

  copyDamageResult(damageResult: DamageResult) {
    this.copyMessageEnabled = true
    navigator.clipboard.writeText(damageResult.description)

    setTimeout(() => {
      this.copyMessageEnabled = false
    }, 2000)
  }

  activatePokemon() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.data.rightPokemon())
    } else {
      this.attacker.set(this.data.leftPokemon())
    }    
  }

  pokemonChanged() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.data.leftPokemon())
    } else {
      this.attacker.set(this.data.rightPokemon())
    }
  }

}
