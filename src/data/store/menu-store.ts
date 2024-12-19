import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"

type MenuState = {
  oneVsOneActivated: boolean
  oneVsManyActivated: boolean
  manyVsOneActivated: boolean
  speedCalculatorActivated: boolean
}

const initialState: MenuState = {
  oneVsOneActivated: true,
  oneVsManyActivated: false,
  manyVsOneActivated: false,
  speedCalculatorActivated: false
}

export const MenuStore = signalStore(
  { providedIn: "root" },
  withState(initialState),

  withMethods(store => ({
    enableOneVsOne() {
      patchState(store, () => ({ ...this._allOptionsTurnedOff(), oneVsOneActivated: true }))
    },

    enableOneVsMany() {
      patchState(store, () => ({ ...this._allOptionsTurnedOff(), oneVsManyActivated: true }))
    },

    enableManyVsOne() {
      patchState(store, () => ({ ...this._allOptionsTurnedOff(), manyVsOneActivated: true }))
    },

    enableSpeedCalculator() {
      patchState(store, () => ({ ...this._allOptionsTurnedOff(), speedCalculatorActivated: true }))
    },

    _allOptionsTurnedOff() {
      return Object.fromEntries(Object.keys(initialState).map(key => [key, false])) as MenuState
    }
  }))
)
