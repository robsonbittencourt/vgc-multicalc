import { extractMegaStoneLetter, getBaseName, getMegaFormName, isMega, isMegaStone, isMegaStoneCompatible } from "@multicalc/model/mega-stone"

describe("isMegaStone", () => {
  it("returns true for a known mega stone", () => {
    expect(isMegaStone("Garchompite")).toBe(true)
  })

  it("returns false for an item that is not a mega stone", () => {
    expect(isMegaStone("Leftovers")).toBe(false)
  })

  it("returns false for an item that does not exist", () => {
    expect(isMegaStone("Not A Real Item")).toBe(false)
  })
})

describe("isMega", () => {
  it("returns true for a dual mega form suffix", () => {
    expect(isMega("Charizard-Mega-X")).toBe(true)
  })

  it("returns true for a simple mega form suffix", () => {
    expect(isMega("Garchomp-Mega")).toBe(true)
  })

  it("returns false for a non-mega Pokémon name", () => {
    expect(isMega("Garchomp")).toBe(false)
  })
})

describe("getBaseName", () => {
  it("returns the base name for a simple mega form", () => {
    expect(getBaseName("Garchomp-Mega")).toBe("Garchomp")
  })

  it("returns the base name for a dual mega form", () => {
    expect(getBaseName("Charizard-Mega-X")).toBe("Charizard")
  })

  it("uses the reverse mapping for Floette-Mega instead of the generic suffix regex", () => {
    expect(getBaseName("Floette-Mega")).toBe("Floette-Eternal")
  })

  it("uses the reverse mapping for the male Meowstic mega form", () => {
    expect(getBaseName("Meowstic-M-Mega")).toBe("Meowstic")
  })

  it("uses the reverse mapping for the female Meowstic mega form", () => {
    expect(getBaseName("Meowstic-F-Mega")).toBe("Meowstic-F")
  })

  it("returns the name unchanged when it is not a mega form", () => {
    expect(getBaseName("Garchomp")).toBe("Garchomp")
  })
})

describe("extractMegaStoneLetter", () => {
  it("extracts the trailing uppercase letter from a dual mega stone name", () => {
    expect(extractMegaStoneLetter("Charizardite X")).toBe("X")
  })

  it("returns null when the item name has no trailing uppercase letter", () => {
    expect(extractMegaStoneLetter("Garchompite")).toBeNull()
  })
})

describe("getMegaFormName", () => {
  it("appends the mega stone letter for a dual-mega Pokémon", () => {
    expect(getMegaFormName("Charizard", "Charizardite X")).toBe("Charizard-Mega-X")
  })

  it("appends only -Mega when the item has no trailing letter", () => {
    expect(getMegaFormName("Garchomp", "Garchompite")).toBe("Garchomp-Mega")
  })

  it("uses the special mapping for Floette-Eternal instead of the generic suffix", () => {
    expect(getMegaFormName("Floette-Eternal", "Floettite")).toBe("Floette-Mega")
  })

  it("uses the special mapping for Meowstic instead of the generic suffix", () => {
    expect(getMegaFormName("Meowstic", "Meowsticite")).toBe("Meowstic-M-Mega")
  })
})

describe("isMegaStoneCompatible", () => {
  it("returns false when the item is not a mega stone", () => {
    expect(isMegaStoneCompatible("Garchomp", "Leftovers")).toBe(false)
  })

  it("returns false when the item does not exist in the dataset", () => {
    expect(isMegaStoneCompatible("Garchomp", "Not A Real Mega Stone")).toBe(false)
  })

  it("returns false when the Pokémon's base name does not match the mega stone's Pokémon", () => {
    expect(isMegaStoneCompatible("Pikachu", "Garchompite")).toBe(false)
  })

  it("returns true for the base form matching its own mega stone", () => {
    expect(isMegaStoneCompatible("Garchomp", "Garchompite")).toBe(true)
  })

  it("returns true for the already-mega form matching its own mega stone", () => {
    expect(isMegaStoneCompatible("Garchomp-Mega", "Garchompite")).toBe(true)
  })

  it("returns true for a dual-mega base form matching either of its mega stones", () => {
    expect(isMegaStoneCompatible("Charizard", "Charizardite X")).toBe(true)
  })

  it("returns true for a dual-mega already-mega form matching its specific mega stone letter", () => {
    expect(isMegaStoneCompatible("Charizard-Mega-X", "Charizardite X")).toBe(true)
  })

  it("returns false for a dual-mega form that does not match the mega stone's letter", () => {
    expect(isMegaStoneCompatible("Charizard-Mega-Y", "Charizardite X")).toBe(false)
  })

  it("returns false when a differently-named Pokémon happens to share a partial name prefix", () => {
    expect(isMegaStoneCompatible("Ogerpon-Wellspring", "Garchompite")).toBe(false)
  })

  it("returns true for Meowstic using the special mega form mapping", () => {
    expect(isMegaStoneCompatible("Meowstic", "Meowsticite")).toBe(true)
  })

  it("returns true for the mapped Meowstic mega form using the special mapping", () => {
    expect(isMegaStoneCompatible("Meowstic-M-Mega", "Meowsticite")).toBe(true)
  })
})
