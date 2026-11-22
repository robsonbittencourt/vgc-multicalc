import { DESCRIPTIONS as DESCRIPTIONS_ES, NAMES as NAMES_ES } from "@data/i18n/es"
import { DESCRIPTIONS as DESCRIPTIONS_EN } from "@data/i18n/en"
import { DESCRIPTIONS as DESCRIPTIONS_ES_419, NAMES as NAMES_ES_419 } from "@data/i18n/es-419"
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

  it("should show the form with its translated suffix", () => {
    const names = [pokemonDisplayName("Rotom-Wash", "en"), pokemonDisplayName("Rotom-Wash", "es"), pokemonDisplayName("Meowstic-F-Mega", "es")]

    expect(names).toEqual(["Rotom Wash", "Rotom Lavado", "Meowstic H Mega"])
  })

  it("should keep Mega after the name like in English", () => {
    const names = [pokemonDisplayName("Charizard-Mega-X", "es"), pokemonDisplayName("Garchomp-Mega", "es"), pokemonDisplayName("Charizard-Mega-X", "en")]

    expect(names).toEqual(["Charizard Mega X", "Garchomp Mega", "Charizard Mega X"])
  })

  it("should keep the hyphens of the form in the name like in English", () => {
    const names = [localizedName("pokemon", "Charizard-Mega-X", "es"), localizedName("pokemon", "Rotom-Wash", "es"), localizedName("pokemon", "Meowstic-F-Mega", "es")]

    expect(names).toEqual(["Charizard-Mega-X", "Rotom-Lavado", "Meowstic-H-Mega"])
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

    expect(descriptions).toEqual(["El usuario recupera el 50% del daño causado.", "Al entrar al combate, este Pokémon baja 1 nivel el Ataque de los rivales.", "La Velocidad del portador es x1.5, pero solo puede elegir el primer movimiento que use."])
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
  it.each([
    ["Spanish", DESCRIPTIONS_ES],
    ["Latin American Spanish", DESCRIPTIONS_ES_419]
  ])("should translate every English description to %s", (_, descriptions) => {
    const missing = (["moves", "abilities", "items"] as const).flatMap(kind =>
      Object.keys(DESCRIPTIONS_EN[kind])
        .filter(id => !(id in descriptions[kind]))
        .map(id => `${kind}.${id}`)
    )
    const unknown = (["moves", "abilities", "items"] as const).flatMap(kind =>
      Object.keys(descriptions[kind])
        .filter(id => !(id in DESCRIPTIONS_EN[kind]))
        .map(id => `${kind}.${id}`)
    )

    expect({ missing, unknown }).toEqual({ missing: [], unknown: [] })
  })
})

describe("Latin American Spanish names", () => {
  beforeAll(() => registerNames("es-419", NAMES_ES_419))

  it("should use the Latin American names where they differ from Spain", () => {
    const names = [localizedName("items", "Sitrus Berry", "es-419"), localizedName("items", "Sitrus Berry", "es"), localizedName("types", "Fighting", "es-419"), localizedName("natures", "Quirky", "es-419"), pokemonDisplayName("Rotom-Mow", "es-419")]

    expect(names).toEqual(["Baya Citrón", "Baya Zidra", "Pelea", "Extravagante", "Rotom Podadora"])
  })
})
