import { buildSharedTeamFromText, InvalidPasteTextError, PasteTextOptions, unknownPokemonList } from "@store/paste/paste-from-text"
import { UnknownPokemonError } from "@store/user-data/pokepaste-import"

describe("buildSharedTeamFromText", () => {
  const options: PasteTextOptions = { useSpsMode: true, includePoints: true }
  const incineroar = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot"
  const incineroarExport = "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot\n"

  it("should build the paste from the Showdown text", async () => {
    const team = await buildSharedTeamFromText("Sun Balance", incineroar, options)

    expect(team).toEqual({ kind: "team", version: 1, useSpsMode: true, name: "Sun Balance", showdown: incineroarExport })
  })

  it("should read EVs and leave the spreads out when asked", async () => {
    const team = await buildSharedTeamFromText("", incineroar.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 252 SpD"), { ...options, useSpsMode: false, includePoints: false })

    expect(team).toEqual({ kind: "team", version: 1, useSpsMode: false, showdown: incineroarExport.replace("EVs: 32 HP / 2 Def / 32 SpD\n", "") })
  })

  it("should keep the tera type only of the Pokémon that declare one in the text", async () => {
    const text = `${incineroar.replace("Ability: Intimidate", "Ability: Intimidate\nTera Type: Grass")}\n\nAmoonguss @ Rocky Helmet\nAbility: Regenerator\n- Spore`

    const team = await buildSharedTeamFromText("", text, options)

    expect(team.showdown).toBe(`${incineroarExport.replace("Level: 50\n", "Level: 50\nTera Type: Grass\n")}\nAmoonguss @ Rocky Helmet\nAbility: Regenerator\nLevel: 50\nCalm Nature\n- Spore\n`)
  })

  it("should reject a text without Pokémon", async () => {
    await expect(buildSharedTeamFromText("", "\n\n", options)).rejects.toThrow(new InvalidPasteTextError("Add at least one Pokémon in the Showdown format."))
  })

  it("should reject more than 6 Pokémon", async () => {
    const text = Array.from({ length: 7 }, () => incineroar).join("\n\n")

    await expect(buildSharedTeamFromText("", text, options)).rejects.toThrow(new InvalidPasteTextError("A paste has at most 6 Pokémon."))
  })

  it("should reject a team name over 60 characters", async () => {
    await expect(buildSharedTeamFromText("x".repeat(61), incineroar, options)).rejects.toThrow(new InvalidPasteTextError("The team name has more than 60 characters."))
  })

  it("should reject a team name with a link", async () => {
    await expect(buildSharedTeamFromText("Free stuff at https://example.com", incineroar, options)).rejects.toThrow(new InvalidPasteTextError("The team name cannot have links."))
    await expect(buildSharedTeamFromText("join discord.gg/abc", incineroar, options)).rejects.toThrow(new InvalidPasteTextError("The team name cannot have links."))
  })

  it("should accept a team name with dots that is not a link", async () => {
    const team = await buildSharedTeamFromText("Mr. Mime Trick Room v1.2", incineroar, options)

    expect(team.name).toBe("Mr. Mime Trick Room v1.2")
  })

  it("should tell which unit has invalid spreads", async () => {
    const evs = incineroar.replace("32 HP / 2 Def / 32 SpD", "252 HP / 12 Def / 252 SpD")

    await expect(buildSharedTeamFromText("", evs, options)).rejects.toThrow(new InvalidPasteTextError("Invalid SPs. Check the spreads and the SP/EV option."))
    await expect(buildSharedTeamFromText("", evs.replace("252 HP", "400 HP").replace("252 SpD", "400 SpD"), { ...options, useSpsMode: false })).rejects.toThrow(new InvalidPasteTextError("Invalid EVs. Check the spreads and the SP/EV option."))
  })

  it("should name the Pokémon that the calc does not know", async () => {
    const text = `${incineroar}\n\nMissingno @ Leftovers\n- Tackle\n\nPikachuu @ Light Ball\n- Thunderbolt`

    await expect(buildSharedTeamFromText("", text, options)).rejects.toThrow(new InvalidPasteTextError("Unknown Pokémon: Missingno, Pikachuu. Check the names."))
  })

  it("should point out a set without a Pokémon name", async () => {
    await expect(buildSharedTeamFromText("", "@ Leftovers\n- Tackle", options)).rejects.toThrow(new InvalidPasteTextError("Unknown Pokémon: (no name). Check the names."))
  })

  it("should let an unexpected failure through", async () => {
    await expect(buildSharedTeamFromText("", null as unknown as string, options)).rejects.toBeInstanceOf(TypeError)
  })
})

describe("unknownPokemonList", () => {
  it("should list the unknown names in the order of the text", () => {
    expect(unknownPokemonList(new UnknownPokemonError(["Garchompp", " "]))).toBe("Unknown Pokémon: Garchompp, (no name)")
  })
})
