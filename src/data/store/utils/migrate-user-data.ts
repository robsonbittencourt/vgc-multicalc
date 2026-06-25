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

function legacyFlatData(userData: any): any {
  const flatData = { ...userData }
  delete flatData.champions
  delete flatData.sv
  delete flatData.game
  delete flatData.themeData

  return flatData
}

export function migrateUserData() {
  if (typeof localStorage === "undefined") return
  const raw = localStorage.getItem("userData")
  if (!raw) return

  const userData = JSON.parse(raw)

  const themeData = userData.themeData
  const championsData = userData.champions ?? userData.sv ?? legacyFlatData(userData)

  if (!championsData || Object.keys(championsData).length === 0) return

  const migrated = {
    ...(themeData && { themeData }),
    champions: championsData
  }

  localStorage.setItem("userData", JSON.stringify(migrated))
}

export function fixInvalidPokemon() {
  if (typeof localStorage === "undefined") return
  const raw = localStorage.getItem("userData")
  if (!raw) return

  const userData = JSON.parse(raw)
  const gameData = userData.champions

  if (!gameData) return

  replacePokemonName(gameData, "Floette", "Floette-Eternal")

  userData.champions = gameData
  localStorage.setItem("userData", JSON.stringify(userData))
}
