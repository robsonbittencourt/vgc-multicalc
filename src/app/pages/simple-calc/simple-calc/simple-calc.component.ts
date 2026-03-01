import { Component, computed, effect, inject, signal } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalculatorStore } from "@data/store/calculator-store"
import { FieldStore } from "@data/store/field-store"
import { FIELD_CONTEXT } from "@data/store/tokens/field-context.token"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { AutomaticFieldService } from "@lib/automatic-field-service"
import { DamageCalculatorService } from "@lib/damage-calculator/damage-calculator.service"
import { DamageResult } from "@lib/damage-calculator/damage-result"
import { RollLevelConfig } from "@lib/damage-calculator/roll-level-config"
import { DefensiveEvOptimizerService } from "@lib/ev-optimizer/defensive-ev-optimizer.service"
import { Pokemon } from "@lib/model/pokemon"
import { Target } from "@lib/model/target"
import { Stats, SurvivalThreshold } from "@lib/types"
import { DamageResultComponent } from "@pages/simple-calc/damage-result/damage-result.component"

@Component({
  selector: "app-simple-calc",
  templateUrl: "./simple-calc.component.html",
  styleUrls: ["./simple-calc.component.scss"],
  imports: [WidgetComponent, DamageResultComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, PokemonBuildComponent, FieldComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcComponent {
  store = inject(CalculatorStore)
  fieldStore = inject(FieldStore)
  private damageCalculator = inject(DamageCalculatorService)
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = inject(DefensiveEvOptimizerService)

  leftDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field(), true))
  rightDamageResults = computed(() => this.damageCalculator.calcDamageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field(), false))

  leftDamageResult = computed(() => this.leftDamageResults()[this.store.leftPokemon().activeMoveIndex])
  rightDamageResult = computed(() => this.rightDamageResults()[this.store.rightPokemon().activeMoveIndex])

  leftRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcLeftRollLevel()))
  rightRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcRightRollLevel()))

  activeSide = signal<"left" | "right">("left")

  leftOptimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")
  rightOptimizationStatus = signal<"idle" | "success" | "no-solution" | "not-needed">("idle")

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
          this.leftOptimizationStatus.set("idle")
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
          this.rightOptimizationStatus.set("idle")
        }
      }
    })
  }

  leftMoveActivated(index: number) {
    this.store.activateMove(this.store.leftPokemon().id, index)
  }

  rightMoveActivated(index: number) {
    this.store.activateMove(this.store.rightPokemon().id, index)
  }

  setLeftRollLevel(rollLevel: RollLevelConfig) {
    this.leftRollLevel.set(rollLevel)
    this.store.updateSimpleCalcLeftRollLevel(rollLevel.toConfigString())
  }

  setRightRollLevel(rollLevel: RollLevelConfig) {
    this.rightRollLevel.set(rollLevel)
    this.store.updateSimpleCalcRightRollLevel(rollLevel.toConfigString())
  }

  leftPokemonImported(pokemon: Pokemon | Pokemon[]) {
    this.store.changeLeftPokemon(pokemon as Pokemon)
  }

  rightPokemonImported(pokemon: Pokemon | Pokemon[]) {
    this.store.changeRightPokemon(pokemon as Pokemon)
  }

  private findResultByIndex(damageResults: DamageResult[], index: number): DamageResult {
    return damageResults[index]!
  }

  handleLeftOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.store.leftPokemon()
    const attacker = this.store.rightPokemon()
    const field = this.fieldStore.field()

    this.leftOriginalEvs.set({ ...defender.evs })
    this.leftOriginalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, this.rightRollLevel().toRollIndex(), false)

    this.leftOptimizedNature.set(result.nature)

    if (result.evs) {
      if (result.evs.hp === 0 && result.evs.def === 0 && result.evs.spd === 0) {
        this.leftOptimizationStatus.set("not-needed")
        this.leftOptimizedEvs.set(null)
      } else {
        this.store.evs(defender.id, result.evs)
        this.leftOptimizationStatus.set("success")
        this.leftOptimizedEvs.set(result.evs)
      }
    } else {
      this.leftOptimizationStatus.set("no-solution")
      this.leftOptimizedEvs.set(null)
    }

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleRightOptimizeRequest(event: { updateNature: boolean; keepOffensiveEvs: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.store.rightPokemon()
    const attacker = this.store.leftPokemon()
    const field = this.fieldStore.field()

    this.rightOriginalEvs.set({ ...defender.evs })
    this.rightOriginalNature.set(defender.nature)

    const result = this.defensiveEvOptimizer.optimize(defender, [new Target(attacker)], field, event.updateNature, event.keepOffensiveEvs, event.survivalThreshold, this.leftRollLevel().toRollIndex(), true)

    this.rightOptimizedNature.set(result.nature)

    if (result.evs) {
      if (result.evs.hp === 0 && result.evs.def === 0 && result.evs.spd === 0) {
        this.rightOptimizationStatus.set("not-needed")
        this.rightOptimizedEvs.set(null)
      } else {
        this.store.evs(defender.id, result.evs)
        this.rightOptimizationStatus.set("success")
        this.rightOptimizedEvs.set(result.evs)
      }
    } else {
      this.rightOptimizationStatus.set("no-solution")
      this.rightOptimizedEvs.set(null)
    }

    if (result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleLeftOptimizationApplied() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
    this.leftOptimizationStatus.set("idle")
  }

  handleLeftOptimizationDiscarded() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
    this.leftOptimizationStatus.set("idle")
  }

  handleRightOptimizationApplied() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
    this.rightOptimizationStatus.set("idle")
  }

  handleRightOptimizationDiscarded() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
    this.rightOptimizationStatus.set("idle")
  }
}
