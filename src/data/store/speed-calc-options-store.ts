import { computed } from "@angular/core"
import { SpeedCalculatorOptions } from "@lib/speed-calculator/speed-calculator-options"
import { speedMeta } from "@lib/speed-calculator/speed-meta"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"

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

export const SpeedCalcOptionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ regulation, targetName, speedModifier, speedDropActive, paralyzedActive, choiceScarfActive }) => ({
    options: computed(() => new SpeedCalculatorOptions({
      regulation: regulation(), targetName: targetName(), speedModifier: speedModifier(), speedDropActive: speedDropActive(),
      paralyzedActive: paralyzedActive(), choiceScarfActive: choiceScarfActive()
    })),

    pokemonNamesByReg: computed(() => speedMeta(regulation()).map(s => s.name).sort())
  })),
  withMethods((store) => ({
    toogleIceWind(enabled: boolean) {
      const speedModifier = enabled ? -1 : 0
      patchState(store, () => ({ speedModifier: speedModifier }))
      patchState(store, () => ({ speedDropActive: enabled }))
    },

    toogleParalyze(enabled: boolean) {
      patchState(store, () => ({ paralyzedActive: enabled }))
    },

    toogleChoiceScarf(enabled: boolean) {
      patchState(store, () => ({ choiceScarfActive: enabled }))
    },

    updateSpeedModifier(speedModifier: number) {
      patchState(store, () => ({ speedModifier }))
    },

    updateRegulation(regulation: string) {
      patchState(store, () => ({ regulation }))
      this.clearTargetName()
    },

    updateTargetName(targetName: string) {
      patchState(store, () => ({ targetName }))
    },

    clearTargetName() {
      this.updateTargetName("")
    }
  }))
)