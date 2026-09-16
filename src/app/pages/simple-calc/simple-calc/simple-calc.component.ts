import { Component, computed, effect, inject, signal, viewChild } from "@angular/core"
import { spsToEvs } from "@multicalc/utils"
import { WidgetComponent } from "@shared/widget/widget.component"
import { CalcStore } from "@store/calc-store"
import { FieldStore } from "@store/field-store"
import { FIELD_CONTEXT } from "@store/tokens/field-context.token"
import { ExportPokemonButtonComponent } from "@features/buttons/export-pokemon-button/export-pokemon-button.component"
import { ImportPokemonButtonComponent } from "@features/buttons/import-pokemon-button/import-pokemon-button.component"
import { SaveSetButtonComponent } from "@features/buttons/save-set-button/save-set-button.component"
import { FieldComponent } from "@features/field/field.component"
import { PokemonBuildComponent } from "@features/pokemon-build/pokemon-build/pokemon-build.component"
import { AutomaticFieldService } from "@store/automatic-field/automatic-field-service"
import { DamageResult, RollLevelConfig } from "@multicalc/damage-calc"
import { KoThreshold, OPTIMIZABLE_STATS, OptimizationStatus, SurvivalThreshold } from "@multicalc/sp-optimizer"
import { Pokemon } from "@multicalc/model"
import { Stats } from "@multicalc/types"
import { DamageResultComponent } from "@pages/simple-calc/damage-result/damage-result.component"
import { SimpleCalcService } from "@pages/simple-calc/simple-calc.service"

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
  private simpleCalcService = inject(SimpleCalcService)
  private automaticFieldService = inject(AutomaticFieldService)

  leftDamageResults = computed(() => this.simpleCalcService.damageAllAttacks(this.store.leftPokemon(), this.store.rightPokemon(), this.fieldStore.field(), true, this.store.useSpsMode()))
  rightDamageResults = computed(() => this.simpleCalcService.damageAllAttacks(this.store.rightPokemon(), this.store.leftPokemon(), this.fieldStore.field(), false, this.store.useSpsMode()))

  leftDamageResult = computed(() => this.leftDamageResults()[this.store.leftPokemon().activeMoveIndex])
  rightDamageResult = computed(() => this.rightDamageResults()[this.store.rightPokemon().activeMoveIndex])

  leftRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcLeftRollLevel()))
  rightRollLevel = signal(RollLevelConfig.fromConfigString(this.store.simpleCalcRightRollLevel()))

  leftPokemonBuild = viewChild<PokemonBuildComponent>("leftPokemonBuild")
  rightPokemonBuild = viewChild<PokemonBuildComponent>("rightPokemonBuild")

  activeSide = signal<"left" | "right">("left")

  leftOptimizationStatus = signal<OptimizationStatus | "idle">("idle")
  leftOffensiveImpossible = signal<boolean>(false)
  rightOptimizationStatus = signal<OptimizationStatus | "idle">("idle")
  rightOffensiveImpossible = signal<boolean>(false)
  leftOptimizationKoChance = signal<number | null>(null)
  rightOptimizationKoChance = signal<number | null>(null)

  leftOptimizedEvs = signal<Stats | null>(null)
  leftOptimizedNature = signal<string | null>(null)
  leftOriginalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  leftOriginalNature = signal<string>("")

  rightOptimizedEvs = signal<Stats | null>(null)
  rightOptimizedNature = signal<string | null>(null)
  rightOriginalEvs = signal<Stats>({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  rightOriginalNature = signal<string>("")

  constructor() {
    effect(() => {
      this.automaticFieldService.handlePokemonChange(this.store.leftPokemon(), this.store.rightPokemon(), "attacker", "defender")
    })

    effect(() => {
      const optimized = this.leftOptimizedEvs()
      const current = this.store.leftPokemon().sps
      const optimizedNature = this.leftOptimizedNature()
      const currentNature = this.store.leftPokemon().nature

      if (optimized !== null) {
        const evsChanged = OPTIMIZABLE_STATS.some(stat => optimized[stat] !== current[stat])
        const natureChanged = optimizedNature !== null && optimizedNature !== currentNature

        if (evsChanged || natureChanged) {
          this.leftOptimizedEvs.set(null)
          this.leftOptimizedNature.set(null)
          this.leftOptimizationStatus.set("idle")
          this.leftOffensiveImpossible.set(false)
        }
      }
    })

    effect(() => {
      const optimized = this.rightOptimizedEvs()
      const current = this.store.rightPokemon().sps
      const optimizedNature = this.rightOptimizedNature()
      const currentNature = this.store.rightPokemon().nature

      if (optimized !== null) {
        const evsChanged = OPTIMIZABLE_STATS.some(stat => optimized[stat] !== current[stat])
        const natureChanged = optimizedNature !== null && optimizedNature !== currentNature

        if (evsChanged || natureChanged) {
          this.rightOptimizedEvs.set(null)
          this.rightOptimizedNature.set(null)
          this.rightOptimizationStatus.set("idle")
          this.rightOffensiveImpossible.set(false)
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

  handleLeftOptimizeRequest(event: { updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.store.leftPokemon()
    const attacker = this.store.rightPokemon()
    const field = this.fieldStore.field()

    this.leftOriginalEvs.set({ ...defender.sps })
    this.leftOriginalNature.set(defender.nature)

    const result = this.simpleCalcService.optimizeDefensiveSps(defender, attacker, field, event.updateNature, event.keepOffensiveSps, event.survivalThreshold, this.rightRollLevel().toRollIndex(), false)

    this.leftOptimizedNature.set(result.nature)
    this.leftOptimizationStatus.set(result.status)
    this.leftOptimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)

    if (result.status !== "not-needed") {
      this.store.evs(defender.id, spsToEvs(result.sps))
      this.leftOptimizedEvs.set(result.sps)
    } else {
      this.leftOptimizedEvs.set(null)
    }

    if (result.status !== "not-needed" && result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleRightOptimizeRequest(event: { updateNature: boolean; keepOffensiveSps: boolean; survivalThreshold: SurvivalThreshold }) {
    const defender = this.store.rightPokemon()
    const attacker = this.store.leftPokemon()
    const field = this.fieldStore.field()

    this.rightOriginalEvs.set({ ...defender.sps })
    this.rightOriginalNature.set(defender.nature)

    const result = this.simpleCalcService.optimizeDefensiveSps(defender, attacker, field, event.updateNature, event.keepOffensiveSps, event.survivalThreshold, this.leftRollLevel().toRollIndex(), true)

    this.rightOptimizedNature.set(result.nature)
    this.rightOptimizationStatus.set(result.status)
    this.rightOptimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)

    if (result.status !== "not-needed") {
      this.store.evs(defender.id, spsToEvs(result.sps))
      this.rightOptimizedEvs.set(result.sps)
    } else {
      this.rightOptimizedEvs.set(null)
    }

    if (result.status !== "not-needed" && result.nature) {
      this.store.nature(defender.id, result.nature)
    }
  }

  handleLeftOffensiveOptimizeRequest(event: { koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean }) {
    const attacker = this.store.leftPokemon()
    const defender = this.store.rightPokemon()

    this.leftOriginalEvs.set({ ...attacker.sps })
    this.leftOriginalNature.set(attacker.nature)

    const result = this.simpleCalcService.optimizeOffensiveSps(attacker, defender, this.fieldStore.field(), event.koThreshold, this.leftRollLevel().toRollIndex(), true, event.keepOtherSps, event.updateNature)

    this.leftOptimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)
    this.leftOffensiveImpossible.set(result.status === "impossible")
    this.leftOptimizationStatus.set(result.status === "impossible" ? "idle" : result.status)

    const proposal = result.proposals.find(candidate => candidate.pokemonId === attacker.id)

    if ((result.status === "success" || result.status === "best-effort") && proposal) {
      const sps = proposal.sps
      this.store.evs(attacker.id, spsToEvs(sps))
      this.leftOptimizedEvs.set(sps)
      this.leftOptimizedNature.set(proposal.nature)

      if (proposal.nature) {
        this.store.nature(attacker.id, proposal.nature)
      }
    } else {
      this.leftOptimizedEvs.set(null)
      this.leftOptimizedNature.set(null)
    }
  }

  handleLeftOptimizationApplied() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
    this.leftOptimizationStatus.set("idle")
    this.leftOffensiveImpossible.set(false)
  }

  handleLeftOptimizationDiscarded() {
    this.leftOptimizedEvs.set(null)
    this.leftOptimizedNature.set(null)
    this.leftOptimizationStatus.set("idle")
    this.leftOffensiveImpossible.set(false)
  }

  handleRightOffensiveOptimizeRequest(event: { koThreshold: KoThreshold; keepOtherSps: boolean; updateNature: boolean }) {
    const attacker = this.store.rightPokemon()
    const defender = this.store.leftPokemon()

    this.rightOriginalEvs.set({ ...attacker.sps })
    this.rightOriginalNature.set(attacker.nature)

    const result = this.simpleCalcService.optimizeOffensiveSps(attacker, defender, this.fieldStore.field(), event.koThreshold, this.rightRollLevel().toRollIndex(), false, event.keepOtherSps, event.updateNature)

    this.rightOptimizationKoChance.set(result.status === "best-effort" ? result.koChance : null)
    this.rightOffensiveImpossible.set(result.status === "impossible")
    this.rightOptimizationStatus.set(result.status === "impossible" ? "idle" : result.status)

    const proposal = result.proposals.find(candidate => candidate.pokemonId === attacker.id)

    if ((result.status === "success" || result.status === "best-effort") && proposal) {
      const sps = proposal.sps
      this.store.evs(attacker.id, spsToEvs(sps))
      this.rightOptimizedEvs.set(sps)
      this.rightOptimizedNature.set(proposal.nature)

      if (proposal.nature) {
        this.store.nature(attacker.id, proposal.nature)
      }
    } else {
      this.rightOptimizedEvs.set(null)
      this.rightOptimizedNature.set(null)
    }
  }

  handleRightOptimizationApplied() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
    this.rightOptimizationStatus.set("idle")
    this.rightOffensiveImpossible.set(false)
  }

  handleRightOptimizationDiscarded() {
    this.rightOptimizedEvs.set(null)
    this.rightOptimizedNature.set(null)
    this.rightOptimizationStatus.set("idle")
    this.rightOffensiveImpossible.set(false)
  }
}
