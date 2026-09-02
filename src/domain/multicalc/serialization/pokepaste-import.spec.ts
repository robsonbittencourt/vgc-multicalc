import { InvalidSpsError, parsePokepasteText } from "@multicalc/serialization"

describe("parsePokepasteText", () => {
  const togepi = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 32 HP / 32 SpA\nModest Nature\n- Dazzling Gleam"

  it("should read the team name from the paste header", async () => {
    const { name } = await parsePokepasteText(`=== [gen9vgc2024] My Team ===\n\n${togepi}`, false)

    expect(name).toBe("My Team")
  })

  it("should treat the placeholder Untitled header as no team name", async () => {
    const { name } = await parsePokepasteText(`=== [gen9vgc2024] Untitled ===\n\n${togepi}`, false)

    expect(name).toBe("")
  })

  it("should fall back to an empty team name when the paste has no header", async () => {
    const { name } = await parsePokepasteText(togepi, false)

    expect(name).toBe("")
  })

  it("should collapse an accented alternative form to its base form", async () => {
    const paste = "Flabébé-Blue (F) @ Leftovers\nAbility: Flower Veil\nTera Type: Fairy\nEVs: 252 HP / 252 SpA\nModest Nature\n- Alluring Voice\n- Chilling Water\n- Baton Pass\n- Calm Mind"

    const { pokemon } = await parsePokepasteText(paste, false)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].name).toBe("Flabébé")
  })

  it("should reject a paste whose values exceed the SP limit when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 252 HP / 252 SpA\nModest Nature\n- Dazzling Gleam"

    await expect(parsePokepasteText(paste, true)).rejects.toBeInstanceOf(InvalidSpsError)
  })

  it("should accept a paste that spends the whole SP budget when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 1 HP / 32 Def / 32 SpA / 1 SpD\nModest Nature\n- Dazzling Gleam"

    const { pokemon } = await parsePokepasteText(paste, true)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].evs.hp).toBe(4)
    expect(pokemon[0].evs.def).toBe(252)
    expect(pokemon[0].evs.spa).toBe(252)
    expect(pokemon[0].evs.spd).toBe(4)
  })

  it("should reject a paste whose single stat exceeds the SP limit per stat when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 40 Atk / 20 Spe\nModest Nature\n- Dazzling Gleam"

    await expect(parsePokepasteText(paste, true)).rejects.toBeInstanceOf(InvalidSpsError)
  })

  it("should accept a paste with valid SP values when SP mode is on", async () => {
    const paste = "Togepi @ Leftovers\nAbility: Serene Grace\nTera Type: Fairy\nEVs: 32 HP / 32 SpA\nModest Nature\n- Dazzling Gleam"

    const { pokemon } = await parsePokepasteText(paste, true)

    expect(pokemon.length).toBe(1)
    expect(pokemon[0].evs.hp).toBe(252)
    expect(pokemon[0].evs.spa).toBe(252)
  })

  describe("defaults for fields the paste omits", () => {
    const miloticWithoutEvs = "Milotic @ Leftovers\nAbility: Competitive\nModest Nature\n- Ice Beam\n- Scald\n- Icy Wind\n- Protect"

    it("should keep the nature declared in the paste when the paste has no EVs", async () => {
      const { pokemon } = await parsePokepasteText(miloticWithoutEvs, true)

      expect(pokemon[0].nature).toBe("Modest")
    })

    it("should keep the EVs zeroed when the paste has no EVs", async () => {
      const { pokemon } = await parsePokepasteText(miloticWithoutEvs, true)

      expect(pokemon[0].evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    })

    it("should fill the nature from the default set when the paste declares no nature", async () => {
      const paste = "Milotic @ Leftovers\nAbility: Competitive\n- Ice Beam\n- Scald\n- Icy Wind\n- Protect"

      const { pokemon } = await parsePokepasteText(paste, true)

      expect(pokemon[0].nature).toBe("Calm")
    })

    it("should keep the EVs declared in the paste when the paste declares no nature", async () => {
      const paste = "Milotic @ Leftovers\nAbility: Competitive\nEVs: 20 HP / 4 SpA\n- Ice Beam\n- Scald\n- Icy Wind\n- Protect"

      const { pokemon } = await parsePokepasteText(paste, true)

      expect(pokemon[0].nature).toBe("Calm")
      expect(pokemon[0].evs).toEqual({ hp: 156, atk: 0, def: 0, spa: 28, spd: 0, spe: 0 })
    })

    it("should fill item, ability and tera type from the default set when the paste omits them", async () => {
      const { pokemon } = await parsePokepasteText("Milotic\n- Ice Beam", true)

      expect(pokemon[0].item).toBe("Leftovers")
      expect(pokemon[0].ability.name).toBe("Competitive")
      expect(pokemon[0].teraType).toBe("Water")
    })

    it("should keep the declared fields of a species whose name uses a different apostrophe than the default set", async () => {
      const paste = "Farfetch'd @ Leek\nAbility: Defiant\nEVs: 4 HP / 32 Atk\nAdamant Nature\n- Brave Bird"

      const { pokemon } = await parsePokepasteText(paste, false)

      expect(pokemon[0].nature).toBe("Adamant")
      expect(pokemon[0].ability.name).toBe("Defiant")
      expect(pokemon[0].item).toBe("Leek")
    })

    it("should fill the defaults of a species whose name uses a different apostrophe than the default set", async () => {
      const paste = "Farfetch'd\n- Brave Bird"

      const { pokemon } = await parsePokepasteText(paste, false)

      expect(pokemon[0].nature).toBe("Jolly")
      expect(pokemon[0].ability.name).toBe("Keen Eye")
      expect(pokemon[0].item).toBe("Leftovers")
    })

    it("should not replace any field of a paste that declares all of them", async () => {
      const paste = "Milotic @ Sitrus Berry\nAbility: Marvel Scale\nTera Type: Grass\nEVs: 4 HP / 32 Spe\nTimid Nature\n- Ice Beam"

      const { pokemon } = await parsePokepasteText(paste, true)

      expect(pokemon[0].nature).toBe("Timid")
      expect(pokemon[0].item).toBe("Sitrus Berry")
      expect(pokemon[0].ability.name).toBe("Marvel Scale")
      expect(pokemon[0].teraType).toBe("Grass")
      expect(pokemon[0].evs).toEqual({ hp: 28, atk: 0, def: 0, spa: 0, spd: 0, spe: 252 })
    })
  })
})
