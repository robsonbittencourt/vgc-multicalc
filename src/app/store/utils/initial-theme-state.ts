import { ThemeState } from "@store/theme-store"
import { readUserData } from "@store/utils/user-data-storage"

export function initialThemeState(): ThemeState {
  const themeUserData = readUserData()?.themeData
  return themeUserData ? { ...defaultThemeState(), ...themeUserData } : defaultThemeState()
}

function defaultThemeState(): ThemeState {
  return {
    theme: "system",
    color: "purple"
  }
}
