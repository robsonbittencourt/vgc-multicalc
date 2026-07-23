import { parseShowdownText } from "@multicalc/serialization"

describe("parseShowdownText", () => {
  it("should collapse an accented alternative form to its base form", async () => {
    const paste = "Flabébé-Blue (F) @ Leftovers\nAbility: Flower Veil\nTera Type: Fairy\nEVs: 252 HP / 252 SpA\nModest Nature\n- Alluring Voice\n- Chilling Water\n- Baton Pass\n- Calm Mind"

    const { pokemon } = await parseShowdownText(paste, true)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].name).toBe("Flabébé")
  })
})
