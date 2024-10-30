import { ChangeDetectorRef, Component, inject, output } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Move } from 'src/lib/move';
import { Pokemon } from 'src/lib/pokemon';
import { DataStore } from '../../lib/data-store.service';
import { DamageResultComponent } from '../damage-result/damage-result.component';
import { ExportPokemonButtonComponent } from '../export-pokemon-button/export-pokemon-button.component';
import { FieldComponent } from '../field/field.component';
import { ImportPokemonButtonComponent } from '../import-pokemon-button/import-pokemon-button.component';
import { PokemonBuildComponent } from '../pokemon-build/pokemon-build.component';

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss'],
  standalone: true,
  imports: [DamageResultComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, PokemonBuildComponent, FieldComponent]
})
export class SimpleCalcComponent {
  
  dataChangedEvent = output()
  
  data = inject(DataStore)
  private damageCalculator = inject(DamageCalculatorService)
  private cdr = inject(ChangeDetectorRef)

  leftDamageResults: DamageResult[]
  rightDamageResults: DamageResult[]

  leftDamageResult: DamageResult
  rightDamageResult: DamageResult

  ngOnInit() {
    this.calculateDamage()
  }

  leftPokemonImported(pokemon: Pokemon) {
    this.data.leftPokemon = pokemon
    this.dataChangedEvent.emit()
  }

  leftPokemonChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  leftMoveActivated() {
    this.leftDamageResult = this.findResultByMove(this.leftDamageResults, this.data.leftPokemon.move)
    this.dataChangedEvent.emit()
  }

  rightPokemonImported(pokemon: Pokemon) {
    this.data.rightPokemon = pokemon
    this.dataChangedEvent.emit()
  }

  rightPokemonChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  rightMoveActivated() {
    this.rightDamageResult = this.findResultByMove(this.rightDamageResults, this.data.rightPokemon.move)
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  rollLevelChanged() {
    this.dataChangedEvent.emit()
  }

  private calculateDamage() {
    this.leftDamageResults = this.damageCalculator.calcDamageAllAttacks(this.data.leftPokemon, this.data.rightPokemon)
    this.leftDamageResult = this.findResultByMove(this.leftDamageResults, this.data.leftPokemon.move)
    
    this.rightDamageResults = this.damageCalculator.calcDamageAllAttacks(this.data.rightPokemon, this.data.leftPokemon)
    this.rightDamageResult = this.findResultByMove(this.rightDamageResults, this.data.rightPokemon.move)

    this.cdr.detectChanges()
  }

  private findResultByMove(damageResults: DamageResult[], move: Move): DamageResult {
    return damageResults?.find(result => result.move == move.name)!
  }

}
