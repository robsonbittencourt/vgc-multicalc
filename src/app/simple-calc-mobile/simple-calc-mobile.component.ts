import { Component, computed, inject, signal } from '@angular/core'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator/damage-calculator.service'
import { DamageResult } from 'src/lib/damage-calculator/damage-result'
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
    imports: [PokemonComboBoxComponent, PokemonTabComponent, MatIcon, PokemonBuildMobileComponent, FieldComponent]
})
export class SimpleCalcMobileComponent {
  
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  attacker = signal(this.store.leftPokemon())
 
  leftIsAttacker = computed(() => this.attacker().id === this.store.leftPokemon().id)
  rightIsAttacker = computed(() => this.attacker().id === this.store.rightPokemon().id)

  activeMoveName = computed(() => this.leftIsAttacker() ? this.store.leftPokemon().activeMoveName : this.store.rightPokemon().activeMoveName)

  damageResult = computed(() => {
    if(this.leftIsAttacker()) {
      return this.damageCalculator.calcDamage(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field())
    } else {
      return this.damageCalculator.calcDamage(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field())
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
      this.attacker.set(this.store.rightPokemon())
    } else {
      this.attacker.set(this.store.leftPokemon())
    }    
  }

  pokemonChanged() {
    if (this.leftIsAttacker()) {
      this.attacker.set(this.store.leftPokemon())
    } else {
      this.attacker.set(this.store.rightPokemon())
    }
  }

}
