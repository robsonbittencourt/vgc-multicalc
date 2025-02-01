import { ThemeState } from "@data/store/theme-store"

export function initialThemeState(): ThemeState {
  const themeUserData = JSON.parse(localStorage.getItem("userData")!)?.themeData
  return themeUserData ? { ...defaultThemeState(), ...themeUserData } : defaultThemeState()
}

function defaultThemeState(): ThemeState {
  return {
    theme: "system",
    color: "purple"
  }
}
