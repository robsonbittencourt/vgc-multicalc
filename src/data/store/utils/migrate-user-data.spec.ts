import { migrateUserData } from "@data/store/utils/migrate-user-data"

describe("migrateUserData", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should do nothing when there is no stored user data", () => {
    migrateUserData()

    expect(localStorage.getItem("userData")).toBeNull()
  })

  it("should migrate legacy flat data into champions", () => {
    localStorage.setItem("userData", JSON.stringify({ leftPokemon: { name: "Charizard" }, teams: [{ name: "Team 1" }] }))

    migrateUserData()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Charizard")
    expect(result.champions.teams[0].name).toBe("Team 1")
  })

  it("should keep themeData at top level when migrating legacy flat data", () => {
    localStorage.setItem("userData", JSON.stringify({ leftPokemon: { name: "Charizard" }, themeData: { theme: "dark" } }))

    migrateUserData()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.themeData.theme).toBe("dark")
    expect(result.champions.leftPokemon.name).toBe("Charizard")
    expect(result.champions.themeData).toBeUndefined()
  })

  it("should promote sv data into champions when only sv exists", () => {
    localStorage.setItem("userData", JSON.stringify({ game: "sv", sv: { leftPokemon: { name: "Garchomp" } } }))

    migrateUserData()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Garchomp")
    expect(result.sv).toBeUndefined()
    expect(result.game).toBeUndefined()
  })

  it("should discard sv and keep champions when both exist", () => {
    localStorage.setItem("userData", JSON.stringify({ game: "sv", sv: { leftPokemon: { name: "Garchomp" } }, champions: { leftPokemon: { name: "Charizard" } } }))

    migrateUserData()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Charizard")
    expect(result.sv).toBeUndefined()
    expect(result.game).toBeUndefined()
  })

  it("should be idempotent for already migrated data", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Charizard" } }, themeData: { theme: "dark" } }))

    migrateUserData()
    migrateUserData()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Charizard")
    expect(result.themeData.theme).toBe("dark")
    expect(result.sv).toBeUndefined()
  })
})
