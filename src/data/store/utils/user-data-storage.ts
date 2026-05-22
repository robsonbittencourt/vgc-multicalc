import type { Game } from "@data/store/calculator-store"

export function readUserData() {
  if (typeof localStorage === "undefined") return null
  const raw = localStorage.getItem("userData")
  return raw ? JSON.parse(raw) : null
}

export function readGameData(game: Game) {
  const userData = readUserData()
  return userData?.[game] ?? null
}

export function writeGameData(game: Game, gameData: object) {
  if (typeof localStorage === "undefined") return
  const userData = readUserData() ?? {}
  userData[game] = { ...userData[game], ...gameData }
  localStorage.setItem("userData", JSON.stringify(userData))
}

export function clearGameFields(game: Game) {
  if (typeof localStorage === "undefined") return
  const userData = readUserData() ?? {}
  if (userData[game]) {
    delete userData[game].fields
    localStorage.setItem("userData", JSON.stringify(userData))
  }
}

export function writeTopLevel(patch: object) {
  if (typeof localStorage === "undefined") return
  const userData = readUserData() ?? {}
  Object.assign(userData, patch)
  localStorage.setItem("userData", JSON.stringify(userData))
}
