import { fixInvalidPokemon, migrateUserData } from "./migrate-user-data"

describe("migrateUserData", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should do nothing when there is no stored user data", () => {
    migrateUserData()

    expect(localStorage.getItem("userData")).toBeNull()
  })

  it("should do nothing when localStorage is not available in the environment", () => {
    const originalLocalStorage = globalThis.localStorage
    // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
    delete globalThis.localStorage

    try {
      expect(() => migrateUserData()).not.toThrow()
      expect(() => fixInvalidPokemon()).not.toThrow()
    } finally {
      globalThis.localStorage = originalLocalStorage
    }
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

  it("should leave the stored data untouched when there is nothing to migrate", () => {
    localStorage.setItem("userData", JSON.stringify({ themeData: { theme: "dark" }, game: "sv" }))

    migrateUserData()

    expect(JSON.parse(localStorage.getItem("userData")!)).toEqual({ themeData: { theme: "dark" }, game: "sv" })
  })

  it("should leave the stored data untouched when champions is an empty object", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: {}, game: "sv" }))

    migrateUserData()

    expect(JSON.parse(localStorage.getItem("userData")!)).toEqual({ champions: {}, game: "sv" })
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

describe("fixInvalidPokemon", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("should do nothing when there is no stored user data", () => {
    fixInvalidPokemon()

    expect(localStorage.getItem("userData")).toBeNull()
  })

  it("should leave the stored data untouched when there is no champions data", () => {
    localStorage.setItem("userData", JSON.stringify({ themeData: { theme: "dark" } }))

    fixInvalidPokemon()

    expect(JSON.parse(localStorage.getItem("userData")!)).toEqual({ themeData: { theme: "dark" } })
  })

  it("should rename a top level Floette to Floette-Eternal", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Floette" } } }))

    fixInvalidPokemon()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Floette-Eternal")
  })

  it("should rename every nested Floette across teams and members", () => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        champions: {
          teams: [{ teamMembers: [{ pokemon: { name: "Floette" } }, { pokemon: { name: "Garchomp" } }] }, { teamMembers: [{ pokemon: { name: "Floette" } }] }]
        }
      })
    )

    fixInvalidPokemon()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.teams[0].teamMembers[0].pokemon.name).toBe("Floette-Eternal")
    expect(result.champions.teams[0].teamMembers[1].pokemon.name).toBe("Garchomp")
    expect(result.champions.teams[1].teamMembers[0].pokemon.name).toBe("Floette-Eternal")
  })

  it("should leave a name that is not Floette untouched", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Floette-Eternal" }, rightPokemon: { name: "Charizard" } } }))

    fixInvalidPokemon()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon.name).toBe("Floette-Eternal")
    expect(result.champions.rightPokemon.name).toBe("Charizard")
  })

  it("should walk past null and primitive values without failing", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: null, activeIndex: 3, game: "champions", teams: [], target: { name: "Floette" } } }))

    fixInvalidPokemon()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.champions.leftPokemon).toBeNull()
    expect(result.champions.activeIndex).toBe(3)
    expect(result.champions.target.name).toBe("Floette-Eternal")
  })

  it("should preserve data outside champions", () => {
    localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Floette" } }, themeData: { theme: "dark" } }))

    fixInvalidPokemon()

    const result = JSON.parse(localStorage.getItem("userData")!)

    expect(result.themeData.theme).toBe("dark")
    expect(result.champions.leftPokemon.name).toBe("Floette-Eternal")
  })
})
