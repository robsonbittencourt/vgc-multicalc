import { computed, Injectable } from "@angular/core"
import { pokemonByRegulation } from "@data/regulation-pokemon"
import { SpeedCalculatorMode } from "@lib/speed-calculator/speed-calculator-mode"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { Regulation } from "@lib/types"
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
  topUsage: "30",
  regulation: "F",
  targetName: "",
  mode: SpeedCalculatorMode.StatsAndMeta,
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

  readonly pokemonNamesByReg = computed(() =>
    pokemonByRegulation(this.regulation() as Regulation)
      .map(s => s.name)
      .sort()
  )

  toogleIcyWind(enabled: boolean) {
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
