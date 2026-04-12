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
