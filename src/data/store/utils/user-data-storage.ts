import type { CustomSet } from "@data/store/custom-set"

export function readUserData() {
  if (typeof localStorage === "undefined") return null
  const raw = localStorage.getItem("userData")
  return raw ? JSON.parse(raw) : null
}

export function readGameData() {
  const userData = readUserData()
  return userData?.["champions"] ?? null
}

export function writeGameData(gameData: object) {
  if (typeof localStorage === "undefined") return
  const userData = readUserData() ?? {}
  userData["champions"] = { ...userData["champions"], ...gameData }
  localStorage.setItem("userData", JSON.stringify(userData))
}

export function writeTopLevel(patch: object) {
  if (typeof localStorage === "undefined") return
  const userData = readUserData() ?? {}
  Object.assign(userData, patch)
  localStorage.setItem("userData", JSON.stringify(userData))
}

export function readCustomSets(): CustomSet[] {
  const gameData = readGameData()
  return gameData?.customSets ?? []
}

export function writeCustomSets(customSets: CustomSet[]) {
  writeGameData({ customSets })
}
