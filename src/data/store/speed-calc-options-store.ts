import { computed, effect, inject, Injectable } from "@angular/core"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { SpeedCalculatorService } from "@lib/speed-calculator/speed-calculator-service"
import { Regulation } from "@lib/types"
import { SPEED_CALCULATOR_MODES } from "@lib/speed-calculator/speed-calculator-mode"
import { patchState, signalStore, withState } from "@ngrx/signals"

type SpeedCalcOptionsState = {
  topUsage: string
  regulation: Regulation
  targetName: string
  mode: SpeedCalculatorMode
  speedModifier: number
  speedDropActive: boolean
  paralyzedActive: boolean
  choiceScarfActive: boolean
}

const initialState: SpeedCalcOptionsState = {
  topUsage: "60",
  regulation: "I",
  targetName: "",
  mode: SpeedCalculatorMode.StatsAndMeta,
  speedModifier: 0,
  speedDropActive: false,
  paralyzedActive: false,
  choiceScarfActive: false
}

@Injectable({ providedIn: "root" })
export class SpeedCalcOptionsStore extends signalStore({ protectedState: false }, withState(initialState)) {
  private calculatorStore = inject(CalculatorStore)
  private speedCalculatorService = inject(SpeedCalculatorService)

  constructor() {
    super()

    const initialRegulation = (this.calculatorStore.game() === "champions" ? "MB" : "I") as Regulation
    const initialMode = this.speedCalculatorService.hasStatisticsForRegulation(initialRegulation) ? SpeedCalculatorMode.StatsAndMeta : SpeedCalculatorMode.Stats
    patchState(this, () => ({ regulation: initialRegulation, mode: initialMode }))

    effect(() => {
      const game = this.calculatorStore.game()
      const newRegulation = (game === "champions" ? "MB" : "I") as Regulation
      const newMode = this.speedCalculatorService.hasStatisticsForRegulation(newRegulation) ? SpeedCalculatorMode.StatsAndMeta : SpeedCalculatorMode.Stats

      patchState(this, () => ({ regulation: newRegulation, mode: newMode }))

      if (game === "champions" && this.choiceScarfActive()) {
        patchState(this, () => ({ choiceScarfActive: false }))
      }
    })
  }

  readonly options = computed(
    () =>
      new SpeedCalculatorOptions({
        topUsage: this.topUsage(),
        regulation: this.regulation(),
        targetName: this.targetName(),
        mode: this.mode(),
        speedModifier: this.speedModifier(),
        speedDropActive: this.speedDropActive(),
        paralyzedActive: this.paralyzedActive(),
        choiceScarfActive: this.choiceScarfActive()
      })
  )

  readonly regulationsList = computed(() => {
    return this.calculatorStore.game() === "champions" ? ["MB", "MA"] : ["I"]
  })

  readonly availableModes = computed(() => {
    if (!this.speedCalculatorService.hasStatisticsForRegulation(this.regulation())) {
      return SPEED_CALCULATOR_MODES.filter(m => m !== SpeedCalculatorMode.StatsAndMeta && m !== SpeedCalculatorMode.Meta)
    }

    return SPEED_CALCULATOR_MODES
  })

  readonly pokemonNamesByReg = computed(() => {
    const includeAll = this.topUsage() === "All"
    return pokemonByRegulation(this.regulation() as Regulation, undefined, this.calculatorStore.activeSetdex(), includeAll, this.calculatorStore.isChampions())
      .map(s => s.name)
      .sort()
  })

  toggleIcyWind(enabled: boolean) {
    const speedModifier = enabled ? -1 : 0
    patchState(this, () => ({ speedModifier: speedModifier }))
    patchState(this, () => ({ speedDropActive: enabled }))
  }

  toggleParalyze(enabled: boolean) {
    patchState(this, () => ({ paralyzedActive: enabled }))
  }

  toggleChoiceScarf(enabled: boolean) {
    patchState(this, () => ({ choiceScarfActive: enabled }))
  }

  updateSpeedModifier(speedModifier: number) {
    patchState(this, () => ({ speedModifier }))
  }

  updateRegulation(regulation: Regulation) {
    const hasStatistics = this.speedCalculatorService.hasStatisticsForRegulation(regulation)
    const currentModeNeedsStatistics = this.mode() === SpeedCalculatorMode.StatsAndMeta || this.mode() === SpeedCalculatorMode.Meta

    patchState(this, () => ({ regulation, ...(!hasStatistics && currentModeNeedsStatistics ? { mode: SpeedCalculatorMode.Stats } : {}) }))
    this.clearTargetName()
  }

  updateTopUsage(topUsage: string) {
    patchState(this, () => ({ topUsage }))
    this.clearTargetName()
  }

  updateMode(mode: string) {
    patchState(this, () => ({ mode: mode as SpeedCalculatorMode }))
    this.clearTargetName()
  }

  updateTargetName(targetName: string) {
    patchState(this, () => ({ targetName }))
  }

  clearTargetName() {
    this.updateTargetName("")
  }
}
