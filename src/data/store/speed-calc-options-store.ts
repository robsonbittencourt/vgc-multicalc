import { computed, effect, inject, Injectable } from "@angular/core"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { CalculatorStore } from "@data/store/calculator-store"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
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
  topUsage: "All",
  regulation: "I",
  targetName: "",
  mode: SpeedCalculatorMode.Base,
  speedModifier: 0,
  speedDropActive: false,
  paralyzedActive: false,
  choiceScarfActive: false
}

@Injectable({ providedIn: "root" })
export class SpeedCalcOptionsStore extends signalStore({ protectedState: false }, withState(initialState)) {
  private calculatorStore = inject(CalculatorStore)

  constructor() {
    super()

    effect(() => {
      const game = this.calculatorStore.game()
      const newRegulation = game === "champions" ? "M-A" : "I"
      if (this.regulation() !== newRegulation) {
        patchState(this, () => ({ regulation: newRegulation as Regulation }))
      }
    })

    effect(() => {
      const game = this.calculatorStore.game()
      const mode = this.mode()
      if (game === "champions" && (mode === SpeedCalculatorMode.StatsAndMeta || mode === SpeedCalculatorMode.Meta)) {
        patchState(this, () => ({ mode: SpeedCalculatorMode.Stats }))
      }
    })

    effect(() => {
      const game = this.calculatorStore.game()
      if (game === "champions" && this.choiceScarfActive()) {
        patchState(this, () => ({ choiceScarfActive: false }))
      }
    })
  }

  readonly options = computed(
    () =>
      new SpeedCalculatorOptions({
        topUsage: this.topUsage(),
        regulation: this.regulation() as Regulation,
        targetName: this.targetName(),
        mode: this.mode(),
        speedModifier: this.speedModifier(),
        speedDropActive: this.speedDropActive(),
        paralyzedActive: this.paralyzedActive(),
        choiceScarfActive: this.choiceScarfActive()
      })
  )

  readonly regulationsList = computed(() => {
    return this.calculatorStore.game() === "champions" ? ["M-A"] : ["I"]
  })

  readonly availableModes = computed(() => {
    if (this.calculatorStore.game() === "champions") {
      return ["Stats", "Base"]
    }
    return SPEED_CALCULATOR_MODES
  })

  readonly pokemonNamesByReg = computed(() => {
    return pokemonByRegulation(this.regulation() as Regulation, undefined, this.calculatorStore.activeSetdex())
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
    patchState(this, () => ({ regulation }))
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
