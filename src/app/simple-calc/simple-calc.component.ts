import { Component, computed, inject, output, signal } from '@angular/core';
import { DamageCalculatorService } from 'src/lib/damage-calculator.service';
import { DamageResult } from 'src/lib/damage-result';
import { Move } from 'src/lib/move';
import { Pokemon } from 'src/lib/pokemon';
import { RollLevelConfig } from 'src/lib/roll-level-config';
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
  
  leftDamageResults = signal<DamageResult[]>([])
  rightDamageResults = signal<DamageResult[]>([])

  leftDamageResult = computed(() => this.findResultByMove(this.leftDamageResults(), this.data.leftPokemon.move))
  rightDamageResult = computed(() => this.findResultByMove(this.rightDamageResults(), this.data.rightPokemon.move))

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

  leftMoveActivated(move: string) {
    this.data.leftPokemon = this.data.leftPokemon.activateMove(move)
    this.dataChangedEvent.emit()
  }

  leftRollLevelChanged(config: RollLevelConfig) {
    this.data.leftRollLevelConfig = config
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

  rightMoveActivated(move: string) {
    this.data.rightPokemon = this.data.rightPokemon.activateMove(move)
    this.dataChangedEvent.emit()
  }

  rightRollLevelChanged(config: RollLevelConfig) {
    this.data.rightRollLevelConfig = config
    this.dataChangedEvent.emit()
  }

  fieldChanged() {
    this.calculateDamage()
    this.dataChangedEvent.emit()
  }

  private calculateDamage() {
    this.leftDamageResults.set(this.damageCalculator.calcDamageAllAttacks(this.data.leftPokemon, this.data.rightPokemon))
    this.rightDamageResults.set(this.damageCalculator.calcDamageAllAttacks(this.data.rightPokemon, this.data.leftPokemon))
  }

  private findResultByMove(damageResults: DamageResult[], move: Move): DamageResult {
    return damageResults.find(result => result.move == move.name)!
  }

}
