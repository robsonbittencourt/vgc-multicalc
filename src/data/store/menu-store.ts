import { Injectable } from "@angular/core"
import { patchState, signalStore, withState } from "@ngrx/signals"

type MenuState = {
  oneVsOneActivated: boolean
  oneVsManyActivated: boolean
  manyVsOneActivated: boolean
  speedCalculatorActivated: boolean
  howToUseActivated: boolean
}

const initialState: MenuState = {
  oneVsOneActivated: true,
  oneVsManyActivated: false,
  manyVsOneActivated: false,
  speedCalculatorActivated: false,
  howToUseActivated: false
}

@Injectable({ providedIn: "root" })
export class MenuStore extends signalStore({ protectedState: false }, withState(initialState)) {
  enableOneVsOne() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), oneVsOneActivated: true }))
  }

  enableOneVsMany() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), oneVsManyActivated: true }))
  }

  enableManyVsOne() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), manyVsOneActivated: true }))
  }

  enableSpeedCalculator() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), speedCalculatorActivated: true }))
  }

  enableHowToUse() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), howToUseActivated: true }))
  }

  private allOptionsTurnedOff() {
    return Object.fromEntries(Object.keys(initialState).map(key => [key, false])) as MenuState
  }
}
