import { Component, computed, inject, signal } from "@angular/core"
import { DamageResultComponent } from "@app/features/simple-calc/damage-result/damage-result.component"
import { ExportPokemonButtonComponent } from "@app/shared/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@app/shared/buttons/import-pokemon-button/import-pokemon-button.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { PokemonBuildComponent } from "@app/shared/pokemon-build/pokemon-build/pokemon-build.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"

@Component({
  selector: "app-simple-calc",
  templateUrl: "./simple-calc.component.html",
  styleUrls: ["./simple-calc.component.scss"],
  imports: [WidgetComponent, DamageResultComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, PokemonBuildComponent, FieldComponent]
})
export class SimpleCalcComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)

  leftDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field()))
  rightDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field()))

  leftDamageResult = computed(() => this.findResultByMove(this.leftDamageResults(), this.store.leftPokemon().activeMoveName))
  rightDamageResult = computed(() => this.findResultByMove(this.rightDamageResults(), this.store.rightPokemon().activeMoveName))

  leftRollLevel = signal(RollLevelConfig.high())
  rightRollLevel = signal(RollLevelConfig.high())

  leftMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.store.activateMove(this.store.leftPokemon().id, activatedMove)
  }

  rightMoveActivated(move: string) {
    const activatedMove = new Move(move)
    this.store.activateMove(this.store.rightPokemon().id, activatedMove)
  }

  setLeftRollLevel(rollLevel: RollLevelConfig) {
    this.leftRollLevel.set(rollLevel)
  }

  setRigthRollLevel(rollLevel: RollLevelConfig) {
    this.rightRollLevel.set(rollLevel)
  }

  leftPokemonImported(pokemon: Pokemon | Pokemon[]) {
    this.store.changeLeftPokemon(pokemon as Pokemon)
  }

  rightPokemonImported(pokemon: Pokemon | Pokemon[]) {
    this.store.changeRightPokemon(pokemon as Pokemon)
  }

  private findResultByMove(damageResults: DamageResult[], moveName: string): DamageResult {
    return damageResults.find(result => result.move == moveName)!
  }
}
