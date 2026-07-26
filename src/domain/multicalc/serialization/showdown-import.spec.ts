import { InvalidSpsError, parseShowdownText } from "@multicalc/serialization"

describe("parseShowdownText", () => {
  it("should collapse an accented alternative form to its base form", async () => {
    const paste = "Flabébé-Blue (F) @ Leftovers\nAbility: Flower Veil\nTera Type: Fairy\nEVs: 252 HP / 252 SpA\nModest Nature\n- Alluring Voice\n- Chilling Water\n- Baton Pass\n- Calm Mind"

    const { pokemon } = await parseShowdownText(paste, false)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].name).toBe("Flabébé")
  })

  it("should reject a paste whose values exceed the SP limit when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 252 HP / 252 SpA\nModest Nature\n- Dazzling Gleam"

    await expect(parseShowdownText(paste, true)).rejects.toBeInstanceOf(InvalidSpsError)
  })

  it("should accept a paste with valid SP values when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 32 HP / 32 SpA\nModest Nature\n- Dazzling Gleam"

    const { pokemon } = await parseShowdownText(paste, true)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].evs.hp).toBe(252)
    expect(pokemon[0].evs.spa).toBe(252)
  })
})
