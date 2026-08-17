import { readUserData } from "@store/utils/user-data-storage"

function replacePokemonName(obj: any, oldName: string, newName: string): void {
  if (!obj || typeof obj !== "object") return

  for (const key in obj) {
    if (key === "name" && obj[key] === oldName) {
      obj[key] = newName
    } else if (typeof obj[key] === "object") {
      replacePokemonName(obj[key], oldName, newName)
    }
  }
}

const preservedTopLevelKeys = ["themeData", "menuData"]

function legacyFlatData(userData: any): any {
  const flatData = { ...userData }
  delete flatData.champions
  delete flatData.sv
  delete flatData.game

  for (const key of preservedTopLevelKeys) {
    delete flatData[key]
  }

  return flatData
}

export function migrateUserData() {
  const userData = readUserData()

  if (!userData) return

  if (userData.champions && !userData.sv && !userData.game) return

  const championsData = userData.champions ?? userData.sv ?? legacyFlatData(userData)

  if (!championsData || Object.keys(championsData).length === 0) return

  const migrated: any = { champions: championsData }

  for (const key of preservedTopLevelKeys) {
    if (userData[key]) migrated[key] = userData[key]
  }

  localStorage.setItem("userData", JSON.stringify(migrated))
}

export function fixInvalidPokemon() {
  const userData = readUserData()

  if (!userData) return

  const gameData = userData.champions

  if (!gameData) return

  replacePokemonName(gameData, "Floette", "Floette-Eternal")

  userData.champions = gameData
  localStorage.setItem("userData", JSON.stringify(userData))
}
