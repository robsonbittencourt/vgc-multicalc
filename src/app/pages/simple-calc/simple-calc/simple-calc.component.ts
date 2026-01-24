import { Component, computed, effect, inject, signal } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Move } from "@lib/model/move"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats } from "@lib/types"
import { DamageResultComponent } from "@pages/simple-calc/damage-result/damage-result.component"

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
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  leftDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field(), true))
  rightDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field(), false))

  leftDamageResult = computed(() => this.findResultByMove(this.leftDamageResults(), this.store.leftPokemon().activeMoveName))
  rightDamageResult = computed(() => this.findResultByMove(this.rightDamageResults(), this.store.rightPokemon().activeMoveName))

  leftRollLevel = signal(RollLevelConfig.high())
  rightRollLevel = signal(RollLevelConfig.high())

  activeSide = signal<"left" | "right">("left")

  leftOptimizedEvs = signal<Stats | null>(null)
  leftOptimizedNature = signal<string | null>(null)
  leftOriginalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  leftOriginalNature = signal<string>("")

  rightOptimizedEvs = signal<Stats | null>(null)
  rightOptimizedNature = signal<string | null>(null)
  rightOriginalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  rightOriginalNature = signal<string>("")

  lastHandledLeftPokemonName = ""
  lastHandledLeftAbilityName = ""
  lastHandledRightPokemonName = ""
  lastHandledRightAbilityName = ""

  constructor() {
    effect(() => {
      const leftPokemonChanged = this.lastHandledLeftPokemonName != this.store.leftPokemon().name || this.lastHandledLeftAbilityName != this.store.leftPokemon().ability.name
      const rightPokemonChanged = this.lastHandledRightPokemonName != this.store.rightPokemon().name || this.lastHandledRightAbilityName != this.store.rightPokemon().ability.name

      if (leftPokemonChanged || rightPokemonChanged) {
        this.lastHandledLeftPokemonName = this.store.leftPokemon().name
        this.lastHandledLeftAbilityName = this.store.leftPokemon().ability.name

        this.lastHandledRightPokemonName = this.store.rightPokemon().name
        this.lastHandledRightAbilityName = this.store.rightPokemon().ability.name

        this.automaticFieldService.checkAutomaticField(this.store.leftPokemon(), leftPokemonChanged, this.store.rightPokemon(), rightPokemonChanged)
      }
    })

    effect(() => {
      const optimized = this.leftOptimizedEvs()
      const current = this.store.leftPokemon().evs
      const optimizedNature = this.leftOptimizedNature()
      const currentNature = this.store.leftPokemon().nature

      if (optimized !== null) {
        const evsChanged = optimized.hp !== current.hp || optimized.def !== current.def || optimized.spd !== current.spd
        const natureChanged = optimizedNature !== null && optimizedNature !== currentNature

        if (evsChanged || natureChanged) {
          this.leftOptimizedEvs.set(null)
          this.leftOptimizedNature.set(null)
        }
      }
    })

    effect(() => {
      const optimized = this.rightOptimizedEvs()
      const current = this.store.rightPokemon().evs
      const optimizedNature = this.rightOptimizedNature()
      const currentNature = this.store.rightPokemon().nature

      if (optimized !== null) {
        const evsChanged = optimized.hp !== current.hp || optimized.def !== current.def || optimized.spd !== current.spd
        const natureChanged = optimizedNature !== null && optimizedNature !== currentNature

        if (evsChanged || natureChanged) {
          this.rightOptimizedEvs.set(null)
          this.rightOptimizedNature.set(null)
        }
      }
    })
  }

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

  setRightRollLevel(rollLevel: RollLevelConfig) {
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

  handleLeftOptimizeRequest(event: { updateNature: boolean }) {
    const defender = this.store.leftPokemon()
    const attacker = this.store.rightPokemon()
    const field = this.fieldStore.field()

    this.leftOriginalEvs.set({ ...defender.evs })
    this.leftOriginalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature)

    this.leftOptimizedEvs.set(result.evs)
    this.leftOptimizedNature.set(result.nature)

    this.store.evs(defender.id, result.evs)

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleRightOptimizeRequest(event: { updateNature: boolean }) {
    const defender = this.store.rightPokemon()
    const attacker = this.store.leftPokemon()
    const field = this.fieldStore.field()

    this.rightOriginalEvs.set({ ...defender.evs })
    this.rightOriginalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature)

    this.rightOptimizedEvs.set(result.evs)
    this.rightOptimizedNature.set(result.nature)

    this.store.evs(defender.id, result.evs)

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleLeftOptimizationApplied() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
  }

  handleLeftOptimizationDiscarded() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
  }

  handleRightOptimizationApplied() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
  }

  handleRightOptimizationDiscarded() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
  }
}
