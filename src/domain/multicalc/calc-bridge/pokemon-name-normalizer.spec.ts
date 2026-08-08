import { normalizePokemonNameForCalc, normalizePokemonNameForExport } from "@calc-bridge/pokemon-name-normalizer"

describe("normalizePokemonNameForCalc", () => {
  it("keeps Aegislash-Blade as the blade forme", () => {
    expect(normalizePokemonNameForCalc("Aegislash-Blade")).toBe("Aegislash-Blade")
  })

  it("maps the base Aegislash name to the shield forme", () => {
    expect(normalizePokemonNameForCalc("Aegislash")).toBe("Aegislash-Shield")
  })

  it("keeps Aegislash-Shield as the shield forme", () => {
    expect(normalizePokemonNameForCalc("Aegislash-Shield")).toBe("Aegislash-Shield")
  })

  it("leaves an unrelated Pokémon name untouched", () => {
    expect(normalizePokemonNameForCalc("Rillaboom")).toBe("Rillaboom")
  })
})

describe("normalizePokemonNameForExport", () => {
  it("collapses the shield forme to the base name", () => {
    expect(normalizePokemonNameForExport("Aegislash-Shield")).toBe("Aegislash")
  })

  it("collapses the blade forme to the base name", () => {
    expect(normalizePokemonNameForExport("Aegislash-Blade")).toBe("Aegislash")
  })

  it("leaves an unrelated Pokémon name untouched", () => {
    expect(normalizePokemonNameForExport("Incineroar")).toBe("Incineroar")
  })
})
