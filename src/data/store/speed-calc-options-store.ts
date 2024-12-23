import { computed, Injectable } from "@angular/core"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { speedMeta } from "@lib/speed-calculator/speed-meta"
import { patchState, signalStore, withState } from "@ngrx/signals"

type SpeedCalcOptionsState = {
  regulation: string
  targetName: string
  speedModifier: number
  speedDropActive: boolean
  paralyzedActive: boolean
  choiceScarfActive: boolean
}

const initialState: SpeedCalcOptionsState = {
  regulation: "Reg H",
  targetName: "",
  speedModifier: 0,
  speedDropActive: false,
  paralyzedActive: false,
  choiceScarfActive: false
}

@Injectable({ providedIn: "root" })
export class SpeedCalcOptionsStore extends signalStore({ protectedState: false }, withState(initialState)) {
  readonly options = computed(
    () =>
      new SpeedCalculatorOptions({
        regulation: this.regulation(),
        targetName: this.targetName(),
        speedModifier: this.speedModifier(),
        speedDropActive: this.speedDropActive(),
        paralyzedActive: this.paralyzedActive(),
        choiceScarfActive: this.choiceScarfActive()
      })
  )

  readonly pokemonNamesByReg = computed(() =>
    speedMeta(this.regulation())
      .map(s => s.name)
      .sort()
  )

  toogleIceWind(enabled: boolean) {
    const speedModifier = enabled ? -1 : 0
    patchState(this, () => ({ speedModifier: speedModifier }))
    patchState(this, () => ({ speedDropActive: enabled }))
  }

  toogleParalyze(enabled: boolean) {
    patchState(this, () => ({ paralyzedActive: enabled }))
  }

  toogleChoiceScarf(enabled: boolean) {
    patchState(this, () => ({ choiceScarfActive: enabled }))
  }

  updateSpeedModifier(speedModifier: number) {
    patchState(this, () => ({ speedModifier }))
  }

  updateRegulation(regulation: string) {
    patchState(this, () => ({ regulation }))
    this.clearTargetName()
  }

  updateTargetName(targetName: string) {
    patchState(this, () => ({ targetName }))
  }

  clearTargetName() {
    this.updateTargetName("")
  }
}
