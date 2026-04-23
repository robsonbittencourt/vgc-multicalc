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

export function migrateUserData() {
  const raw = localStorage.getItem("userData")
  if (!raw) return

  const userData = JSON.parse(raw)

  if (userData.sv || userData.champions) return

  const { game, themeData, ...gameSpecificData } = userData

  const migrated = {
    game: game ?? "champions",
    ...(themeData && { themeData }),
    sv: gameSpecificData
  }

  localStorage.setItem("userData", JSON.stringify(migrated))
}

export function fixInvalidPokemon() {
  const raw = localStorage.getItem("userData")
  if (!raw) return

  const userData = JSON.parse(raw)
  const game = userData.game ?? "champions"
  const gameData = userData[game]

  if (!gameData) return

  if (game === "champions") {
    replacePokemonName(gameData, "Floette", "Floette-Eternal")
  }

  userData[game] = gameData
  localStorage.setItem("userData", JSON.stringify(userData))
}
