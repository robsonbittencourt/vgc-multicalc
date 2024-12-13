import { Component, computed, inject } from '@angular/core'
import { CalculatorStore } from 'src/data/store/calculator-store'
import { FieldStore } from 'src/data/store/field-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator/damage-calculator.service'
import { DamageResult } from 'src/lib/damage-calculator/damage-result'
import { Move } from 'src/lib/move'
import { DamageResultComponent } from '../damage-result/damage-result.component'
import { ExportPokemonButtonComponent } from '../export-pokemon-button/export-pokemon-button.component'
import { FieldComponent } from '../field/field.component'
import { ImportPokemonButtonComponent } from '../import-pokemon-button/import-pokemon-button.component'
import { PokemonBuildComponent } from '../pokemon-build/pokemon-build.component'

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss'],
  standalone: true,
  imports: [DamageResultComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, PokemonBuildComponent, FieldComponent]
})
export class SimpleCalcComponent {
  
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  
  leftDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field()))
  rightDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field()))

  leftDamageResult = computed(() => this.findResultByMove(this.leftDamageResults(), this.store.leftPokemon().activeMoveName))
  rightDamageResult = computed(() => this.findResultByMove(this.rightDamageResults(), this.store.rightPokemon().activeMoveName))

  leftMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.store.activateMove(this.store.leftPokemon().id, activatedMove)
  }

  rightMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.store.activateMove(this.store.rightPokemon().id, activatedMove)
  }

  private findResultByMove(damageResults: DamageResult[], moveName: string): DamageResult {
    return damageResults.find(result => result.move == moveName)!
  }

}
