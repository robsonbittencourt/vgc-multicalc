import { getBasePokemonNameFromItem, getMegaEvolutionName, MEGA_FORM_MAPPING, MEGA_FORM_REVERSE_MAPPING, MEGA_STONE_TO_POKEMON_NAME } from "@data/mega-stone-data"

describe("getMegaEvolutionName", () => {
  it("appends the mega stone letter for a dual-mega Pokemon", () => {
    expect(getMegaEvolutionName("Charizard", "X")).toBe("Charizard-Mega-X")
  })

  it("appends only -Mega when there is no mega stone letter", () => {
    expect(getMegaEvolutionName("Garchomp", null)).toBe("Garchomp-Mega")
  })
})

describe("getBasePokemonNameFromItem", () => {
  it("resolves the base Pokemon name for a known mega stone regardless of spacing or case", () => {
    expect(getBasePokemonNameFromItem("Garchompite")).toBe("Garchomp")
    expect(getBasePokemonNameFromItem("Charizardite X")).toBe("Charizard")
  })

  it("returns null for an item that is not a mega stone", () => {
    expect(getBasePokemonNameFromItem("Leftovers")).toBeNull()
  })
})

describe("special mega form mappings", () => {
  it("maps Floette-Eternal's mega stone to Floette-Mega instead of Floette-Eternal-Mega", () => {
    expect(MEGA_STONE_TO_POKEMON_NAME["floettite"]).toBe("Floette-Eternal")
    expect(MEGA_FORM_MAPPING["Floette-Eternal"]).toBe("Floette-Mega")
    expect(MEGA_FORM_REVERSE_MAPPING["Floette-Mega"]).toBe("Floette-Eternal")
  })

  it("maps the male Meowstic mega form without a gender suffix", () => {
    expect(MEGA_FORM_MAPPING["Meowstic"]).toBe("Meowstic-M-Mega")
    expect(MEGA_FORM_REVERSE_MAPPING["Meowstic-M-Mega"]).toBe("Meowstic")
  })

  it("maps the female Meowstic mega form with its gender suffix preserved", () => {
    expect(MEGA_FORM_MAPPING["Meowstic-F"]).toBe("Meowstic-F-Mega")
    expect(MEGA_FORM_REVERSE_MAPPING["Meowstic-F-Mega"]).toBe("Meowstic-F")
  })

  it("maps the Charizard and Raichu dual mega stones to the same base Pokemon", () => {
    expect(MEGA_STONE_TO_POKEMON_NAME["charizarditex"]).toBe("Charizard")
    expect(MEGA_STONE_TO_POKEMON_NAME["charizarditey"]).toBe("Charizard")
    expect(MEGA_STONE_TO_POKEMON_NAME["raichunitex"]).toBe("Raichu")
    expect(MEGA_STONE_TO_POKEMON_NAME["raichunitey"]).toBe("Raichu")
  })
})
