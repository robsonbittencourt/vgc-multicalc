import { Component, computed, effect, inject, signal, viewChild } from "@angular/core"
import { WidgetComponent } from "@basic/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageCalc, DamageResult, RollLevelConfig } from "@multicalc/damage-calc"
import { DefensiveEvOptimizer, DEFENSIVE_STATS, SurvivalThreshold } from "@multicalc/ev-optimizer"
import { Pokemon, Target } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { DamageResultComponent } from "@pages/simple-calc/damage-result/damage-result.component"

@Component({
  selector: "app-simple-calc",
  templateUrl: "./simple-calc.component.html",
  styleUrls: ["./simple-calc.component.scss"],
  imports: [WidgetComponent, DamageResultComponent, ImportPokemonButtonComponent, ExportPokemonButtonComponent, SaveSetButtonComponent, PokemonBuildComponent, FieldComponent],
  providers: [FieldStore, AutomaticFieldService, { provide: FIELD_CONTEXT, useValue: "simple" }]
})
export class SimpleCalcComponent {
  store = inject(CalcStore)
  fieldStore = inject(FieldStore)
  private damageCalc = new DamageCalc()
  private automaticFieldService = inject(AutomaticFieldService)
  private defensiveEvOptimizer = new DefensiveEvOptimizer()

  leftDamageResults = computed(() => this.damageCalc.calcDamageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field(), true, this.store.useSpsMode()))
  rightDamageResults = computed(() => this.damageCalc.calcDamageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field(), false, this.store.useSpsMode()))

  leftDamageResult = computed(() => this.leftDamageResults()[this.store.leftPokemon().activeMoveIndex])
  rightDamageResult = computed(() => this.rightDamageResults()[this.store.rightPokemon().activeMoveIndex])

  leftRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcLeftRollLevel()))
  rightRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcRightRollLevel()))

  leftPokemonBuild = viewChild<PokemonBuildComponent>("leftPokemonBuild")
  rightPokemonBuild = viewChild<PokemonBuildComponent>("rightPokemonBuild")

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

  lastHandledLeftPokemonName = "\0"
  lastHandledLeftAbilityName = "\0"
  lastHandledRightPokemonName = "\0"
  lastHandledRightAbilityName = "\0"

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
        const evsChanged = DEFENSIVE_STATS.some(stat => optimized[stat] !== current[stat])
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
        const evsChanged = DEFENSIVE_STATS.some(stat => optimized[stat] !== current[stat])
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

  openLeftPokemonTable() {
    this.activeSide.set("left")
    setTimeout(() => this.leftPokemonBuild()?.openPokemonTable())
  }

  openRightPokemonTable() {
    this.activeSide.set("right")
    setTimeout(() => this.rightPokemonBuild()?.openPokemonTable())
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
    this.leftOptimizationStatus.set(result.status)

    if (result.status === "success") {
      this.store.evs(defender.id, result.evs!)
      this.leftOptimizedEvs.set(result.evs)
    } else {
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
    this.rightOptimizationStatus.set(result.status)

    if (result.status === "success") {
      this.store.evs(defender.id, result.evs!)
      this.rightOptimizedEvs.set(result.evs)
    } else {
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
