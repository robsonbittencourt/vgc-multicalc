import { readCustomSets, readGameData, readUserData, writeCustomSets, writeGameData, writeTopLevel } from "@store/utils/user-data-storage"

describe("user-data-storage", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("readUserData", () => {
    it("should return null when there is no stored user data", () => {
      expect(readUserData()).toBeNull()
    })

    it("should return the parsed user data when it is stored", () => {
      localStorage.setItem("userData", JSON.stringify({ useSpsMode: true }))

      expect(readUserData()).toEqual({ useSpsMode: true })
    })

    it("should return null when localStorage is not available in the environment", () => {
      const originalLocalStorage = globalThis.localStorage
      // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
      delete globalThis.localStorage

      try {
        expect(readUserData()).toBeNull()
      } finally {
        globalThis.localStorage = originalLocalStorage
      }
    })
  })

  describe("readGameData", () => {
    it("should return null when there is no champions data stored", () => {
      expect(readGameData()).toBeNull()
    })

    it("should return the stored champions data", () => {
      localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Charizard" } } }))

      expect(readGameData()).toEqual({ leftPokemon: { name: "Charizard" } })
    })
  })

  describe("writeGameData", () => {
    it("should merge new game data into existing champions data", () => {
      localStorage.setItem("userData", JSON.stringify({ champions: { leftPokemon: { name: "Charizard" } } }))

      writeGameData({ rightPokemon: { name: "Dragonite" } })

      expect(readGameData()).toEqual({ leftPokemon: { name: "Charizard" }, rightPokemon: { name: "Dragonite" } })
    })

    it("should create the userData object when none is stored yet", () => {
      writeGameData({ rightPokemon: { name: "Dragonite" } })

      expect(readGameData()).toEqual({ rightPokemon: { name: "Dragonite" } })
    })

    it("should do nothing when localStorage is not available in the environment", () => {
      const originalLocalStorage = globalThis.localStorage
      // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
      delete globalThis.localStorage

      try {
        expect(() => writeGameData({ rightPokemon: { name: "Dragonite" } })).not.toThrow()
      } finally {
        globalThis.localStorage = originalLocalStorage
      }
    })
  })

  describe("writeTopLevel", () => {
    it("should merge a patch into the top-level user data", () => {
      localStorage.setItem("userData", JSON.stringify({ useSpsMode: false }))

      writeTopLevel({ useSpsMode: true })

      expect(readUserData()).toEqual({ useSpsMode: true })
    })

    it("should create the userData object when none is stored yet", () => {
      writeTopLevel({ useSpsMode: true })

      expect(readUserData()).toEqual({ useSpsMode: true })
    })

    it("should do nothing when localStorage is not available in the environment", () => {
      const originalLocalStorage = globalThis.localStorage
      // @ts-expect-error simulating an environment without localStorage (e.g. SSR)
      delete globalThis.localStorage

      try {
        expect(() => writeTopLevel({ useSpsMode: true })).not.toThrow()
      } finally {
        globalThis.localStorage = originalLocalStorage
      }
    })
  })

  describe("readCustomSets", () => {
    it("should return an empty array when there are no stored custom sets", () => {
      expect(readCustomSets()).toEqual([])
    })

    it("should return the stored custom sets", () => {
      localStorage.setItem("userData", JSON.stringify({ champions: { customSets: [{ id: "1", setName: "My Set" }] } }))

      expect(readCustomSets()).toEqual([{ id: "1", setName: "My Set" }])
    })
  })

  describe("writeCustomSets", () => {
    it("should persist custom sets under the champions game data", () => {
      writeCustomSets([{ id: "1", setName: "My Set" } as never])

      expect(readCustomSets()).toEqual([{ id: "1", setName: "My Set" }])
    })
  })
})
