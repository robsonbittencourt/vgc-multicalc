import { effect, Injectable } from "@angular/core"
import { initialMenuState } from "./utils/initial-menu-state"
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"

type MenuState = {
  oneVsOneActivated: boolean
  oneVsManyActivated: boolean
  manyVsOneActivated: boolean
  speedCalculatorActivated: boolean
  probabilityCalcActivated: boolean
  typeCalcActivated: boolean
  howToUseActivated: boolean
  oneVsManyBestMoveActivated: boolean
  orderByDamage: boolean
}

const navigationState = {
  oneVsOneActivated: true,
  oneVsManyActivated: false,
  manyVsOneActivated: false,
  speedCalculatorActivated: false,
  probabilityCalcActivated: false,
  typeCalcActivated: false,
  howToUseActivated: false
}

const initialState: MenuState = {
  ...navigationState,
  ...initialMenuState()
}

@Injectable({ providedIn: "root" })
export class MenuStore extends signalStore(
  { protectedState: false },
  withState(initialState),
  withHooks(store => ({
    onInit() {
      effect(() => {
        if (typeof localStorage === "undefined") return
        const userData = JSON.parse(localStorage.getItem("userData")!)
        const menuData = {
          orderByDamage: store.orderByDamage(),
          oneVsManyBestMoveActivated: store.oneVsManyBestMoveActivated()
        }

        localStorage.setItem("userData", JSON.stringify({ ...userData, menuData }))
      })
    }
  }))
) {
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

  enableProbabilityCalculator() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), probabilityCalcActivated: true }))
  }

  enableTypeCalculator() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), typeCalcActivated: true }))
  }

  enableHowToUse() {
    patchState(this, () => ({ ...this.allOptionsTurnedOff(), howToUseActivated: true }))
  }

  toggleOneVsManyBestMove() {
    patchState(this, state => ({ oneVsManyBestMoveActivated: !state.oneVsManyBestMoveActivated }))
  }

  toggleOrderByDamage() {
    patchState(this, state => ({ orderByDamage: !state.orderByDamage }))
  }

  private allOptionsTurnedOff() {
    return Object.fromEntries(Object.keys(navigationState).map(key => [key, false])) as MenuState
  }
}
