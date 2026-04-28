import type { Game } from "@data/store/calculator-store"

export function readUserData() {
  const raw = localStorage.getItem("userData")
  return raw ? JSON.parse(raw) : null
}

export function readGameData(game: Game) {
  const userData = readUserData()
  return userData?.[game] ?? null
}

export function writeGameData(game: Game, gameData: object) {
  const userData = readUserData() ?? {}
  userData[game] = { ...userData[game], ...gameData }
  localStorage.setItem("userData", JSON.stringify(userData))
}

export function clearGameFields(game: Game) {
  const userData = readUserData() ?? {}
  if (userData[game]) {
    delete userData[game].fields
    localStorage.setItem("userData", JSON.stringify(userData))
  }
}

export function writeTopLevel(patch: object) {
  const userData = readUserData() ?? {}
  Object.assign(userData, patch)
  localStorage.setItem("userData", JSON.stringify(userData))
}
