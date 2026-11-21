import { DESCRIPTIONS as DESCRIPTIONS_ES, NAMES as NAMES_ES } from "@data/i18n/es"
import { DESCRIPTIONS as DESCRIPTIONS_EN } from "@data/i18n/en"
import { localizedDescription } from "@data/i18n/descriptions"
import { localizedName, pokemonDisplayName, pokemonDisplayNameWithoutSuffix, registerDescriptions, registerNames } from "@data/i18n/localized-names"

describe("names registry", () => {
  it("should keep the English names until the names of a language are registered", async () => {
    vi.resetModules()
    const fresh = await import("@data/i18n/localized-names")

    const before = fresh.localizedName("moves", "Trick Room", "es")
    fresh.registerNames("es", NAMES_ES)
    const after = fresh.localizedName("moves", "Trick Room", "es")

    expect(before).toBe("Trick Room")
    expect(after).toBe("Espacio Raro")
  })
})

describe("localizedName", () => {
  beforeAll(() => registerNames("es", NAMES_ES))

  it("should keep the English name when the language is English", () => {
    const name = localizedName("moves", "Trick Room", "en")

    expect(name).toBe("Trick Room")
  })

  it("should translate each kind of name to Spanish", () => {
    const names = [
      localizedName("pokemon", "Flutter Mane", "es"),
      localizedName("moves", "Trick Room", "es"),
      localizedName("abilities", "Intimidate", "es"),
      localizedName("items", "Choice Scarf", "es"),
      localizedName("natures", "Adamant", "es"),
      localizedName("types", "Stellar", "es")
    ]

    expect(names).toEqual(["Melenaleteo", "Espacio Raro", "Intimidación", "Pañuelo Elección", "Firme", "Astral"])
  })

  it("should find the name regardless of casing and separators", () => {
    const name = localizedName("moves", "trick-room", "es")

    expect(name).toBe("Espacio Raro")
  })

  it("should keep the English name when there is no translation", () => {
    const name = localizedName("moves", "G-Max Wildfire", "es")

    expect(name).toBe("G-Max Wildfire")
  })
})

describe("pokemonDisplayName", () => {
  beforeAll(() => registerNames("es", NAMES_ES))

  it("should show the form the way the game names it", () => {
    const names = [pokemonDisplayName("Rotom-Wash", "en"), pokemonDisplayName("Rotom-Wash", "es"), pokemonDisplayName("Meowstic-F-Mega", "es")]

    expect(names).toEqual(["Rotom Wash", "Rotom Lavado", "Mega-Meowstic H"])
  })

  it("should put Mega before the name and the letter after it", () => {
    const names = [pokemonDisplayName("Charizard-Mega-X", "es"), pokemonDisplayName("Garchomp-Mega", "es"), pokemonDisplayName("Charizard-Mega-X", "en")]

    expect(names).toEqual(["Mega-Charizard X", "Mega-Garchomp", "Charizard Mega X"])
  })

  it("should show a name without translation like in English", () => {
    const name = pokemonDisplayName("Missing-Form", "es")

    expect(name).toBe("Missing Form")
  })

  it("should keep the hyphen of a name that has one", () => {
    const names = [pokemonDisplayName("Ho-Oh", "es"), pokemonDisplayName("Chien-Pao", "en")]

    expect(names).toEqual(["Ho-Oh", "Chien-Pao"])
  })
})

describe("pokemonDisplayNameWithoutSuffix", () => {
  beforeAll(() => registerNames("es", NAMES_ES))

  it("should drop the form of the name", () => {
    const names = [pokemonDisplayNameWithoutSuffix("Rotom-Wash", "es"), pokemonDisplayNameWithoutSuffix("Mr. Mime-Galar", "es"), pokemonDisplayNameWithoutSuffix("Charizard-Mega-X", "en")]

    expect(names).toEqual(["Rotom", "Mr. Mime", "Charizard"])
  })

  it("should keep a name without form or with its own hyphen", () => {
    const names = [pokemonDisplayNameWithoutSuffix("Flutter Mane", "es"), pokemonDisplayNameWithoutSuffix("Ho-Oh", "en")]

    expect(names).toEqual(["Melenaleteo", "Ho-Oh"])
  })
})

describe("localizedDescription", () => {
  beforeAll(() => registerDescriptions("es", DESCRIPTIONS_ES))

  it("should describe a move, an ability and an item in the registered language", () => {
    const descriptions = [localizedDescription("moves", "Absorb", "es"), localizedDescription("abilities", "Intimidate", "es"), localizedDescription("items", "Choice Scarf", "es")]

    expect(descriptions).toEqual([
      "El usuario recupera el 50% del daño causado.",
      "Reduce un nivel el Ataque del rival cuando el Pokémon entra en combate.",
      "Aumenta un 50 % la Velocidad del portador, pero, una vez que haya utilizado un movimiento, solo podrá usar el mismo hasta que sea cambiado por otro Pokémon."
    ])
  })

  it("should describe in English", () => {
    const description = localizedDescription("moves", "Absorb", "en")

    expect(description).toBe("User recovers 50% of the damage dealt.")
  })

  it("should have no description for an unknown name", () => {
    const description = localizedDescription("moves", "Not A Move", "es")

    expect(description).toBe("")
  })
})

describe("descriptions registry", () => {
  it("should keep the English descriptions until the descriptions of a language are registered", async () => {
    vi.resetModules()
    const fresh = await import("@data/i18n/descriptions")

    const description = fresh.localizedDescription("moves", "Absorb", "es")

    expect(description).toBe("User recovers 50% of the damage dealt.")
  })
})

describe("translations", () => {
  it("should translate every English description to Spanish", () => {
    const missing = (["moves", "abilities", "items"] as const).flatMap(kind =>
      Object.keys(DESCRIPTIONS_EN[kind])
        .filter(id => !(id in DESCRIPTIONS_ES[kind]))
        .map(id => `${kind}.${id}`)
    )
    const unknown = (["moves", "abilities", "items"] as const).flatMap(kind =>
      Object.keys(DESCRIPTIONS_ES[kind])
        .filter(id => !(id in DESCRIPTIONS_EN[kind]))
        .map(id => `${kind}.${id}`)
    )

    expect({ missing, unknown }).toEqual({ missing: [], unknown: [] })
  })
})
