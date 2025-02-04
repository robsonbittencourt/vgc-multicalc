import { Component, computed, inject } from "@angular/core"
import { DamageResultComponent } from "@app/features/simple-calc/damage-result/damage-result.component"
import { FieldComponent } from "@app/shared/field/field.component"
import { PokemonBuildComponent } from "@app/shared/pokemon-build/pokemon-build/pokemon-build.component"
import { ExportPokemonButtonComponent } from "@app/shared/team/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@app/shared/team/import-pokemon-button/import-pokemon-button.component"
import { WidgetComponent } from "@app/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { Move } from "@lib/model/move"

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
