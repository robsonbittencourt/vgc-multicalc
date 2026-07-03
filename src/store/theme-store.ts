import { effect, Injectable } from "@angular/core"
import { initialThemeState } from "./utils/initial-theme-state"
import { Color, Theme } from "@lib/theme.service"
import { patchState, signalStore, withHooks, withState } from "@ngrx/signals"

export type ThemeState = {
  theme: Theme
  color: Color
}

@Injectable({ providedIn: "root" })
export class ThemeStore extends signalStore(
  { protectedState: false },
  withState(initialThemeState),
  withHooks(store => ({
    onInit() {
      effect(() => {
        if (typeof localStorage === "undefined") return
        const userData = JSON.parse(localStorage.getItem("userData")!)
        const themeData = {
          theme: store.theme(),
          color: store.color()
        }

        localStorage.setItem("userData", JSON.stringify({ ...userData, themeData }))
      })
    }
  }))
) {
  updateTheme(theme: Theme) {
    patchState(this, () => ({ theme }))
  }

  updateColor(color: Color) {
    patchState(this, () => ({ color }))
  }
}
