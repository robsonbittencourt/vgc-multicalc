import { Component, computed, inject } from '@angular/core'
import { DataStore } from 'src/data/data-store'
import { FieldStore } from 'src/data/store/field-store'
import { DamageCalculatorService } from 'src/lib/damage-calculator.service'
import { DamageResult } from 'src/lib/damage-result'
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
  
  data = inject(DataStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  
  leftDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.data.leftPokemon(), this.data.rightPokemon(), this.fieldStore.field()))
  rightDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.data.rightPokemon(), this.data.leftPokemon(), this.fieldStore.field()))

  leftDamageResult = computed(() => this.findResultByMove(this.leftDamageResults(), this.data.leftPokemon().activeMoveName))
  rightDamageResult = computed(() => this.findResultByMove(this.rightDamageResults(), this.data.rightPokemon().activeMoveName))

  leftMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.data.activateMove(this.data.leftPokemon().id, activatedMove)
  }

  rightMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.data.activateMove(this.data.rightPokemon().id, activatedMove)
  }

  private findResultByMove(damageResults: DamageResult[], moveName: string): DamageResult {
    return damageResults.find(result => result.move == moveName)!
  }

}
