import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { baseForm, buildSharedTeam, declaredTera, isSharedTeam, megaForm, SharedTeam } from "@store/paste/shared-team"

describe("SharedTeam", () => {
  function incineroar(): Pokemon {
    return new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Careful",
      item: "Sitrus Berry",
      teraType: "Grass",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move("Flare Blitz"), new Move("Parting Shot")),
      sps: { hp: 32, atk: 0, def: 2, spa: 0, spd: 32, spe: 0 }
    })
  }

  function amoonguss(): Pokemon {
    return new Pokemon("Amoonguss", {
      ability: new Ability("Regenerator"),
      nature: "Relaxed",
      item: "Rocky Helmet",
      moveSet: new MoveSet(new Move("Spore"), new Move("Rage Powder"), new Move(""), new Move("")),
      sps: { hp: 32, atk: 0, def: 20, spa: 0, spd: 14, spe: 0 }
    })
  }

  const SP_SHOWDOWN =
    "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot\n" +
    "\n" +
    "Amoonguss @ Rocky Helmet\nAbility: Regenerator\nLevel: 50\nEVs: 32 HP / 20 Def / 14 SpD\nRelaxed Nature\n- Spore\n- Rage Powder\n"

  describe("buildSharedTeam", () => {
    it("should keep the team name and join the Showdown sets of the team", async () => {
      const team = await buildSharedTeam("Sun Balance", [incineroar(), amoonguss()], { useSpsMode: true, withTera: [false, false], includePoints: true })

      expect(team).toEqual({ kind: "team", version: 1, name: "Sun Balance", useSpsMode: true, showdown: SP_SHOWDOWN })
    })

    it("should leave the points out when they are hidden", async () => {
      const team = await buildSharedTeam("Sun Balance", [incineroar()], { useSpsMode: true, withTera: [false], includePoints: false })

      expect(team.showdown).toBe("Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot\n")
    })

    it("should keep a default team name", async () => {
      const team = await buildSharedTeam("Team 7", [incineroar()], { useSpsMode: true, withTera: [false], includePoints: true })

      expect(team.name).toBe("Team 7")
    })

    it("should omit a blank team name", async () => {
      const team = await buildSharedTeam("   ", [incineroar()], { useSpsMode: true, withTera: [false], includePoints: true })

      expect("name" in team).toBe(false)
    })

    it("should export EVs and the tera type of the Pokémon that carry one", async () => {
      const team = await buildSharedTeam(" Trick Room ", [incineroar()], { useSpsMode: false, withTera: [true], includePoints: true })

      expect(team).toEqual({
        kind: "team",
        version: 1,
        name: "Trick Room",
        useSpsMode: false,
        showdown: "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nTera Type: Grass\nEVs: 252 HP / 12 Def / 252 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot\n"
      })
    })
  })

  describe("isSharedTeam", () => {
    const valid: SharedTeam = { kind: "team", version: 1, useSpsMode: true, showdown: "Incineroar" }

    it("should accept a team payload", () => {
      expect(isSharedTeam(valid)).toBe(true)
      expect(isSharedTeam({ ...valid, name: "Rain", createdAt: "2026-09-27T12:00:00Z" })).toBe(true)
      expect(isSharedTeam({ ...valid, mode: "national-dex" })).toBe(true)
      expect(isSharedTeam({ ...valid, name: "x".repeat(60) })).toBe(true)
    })

    it("should reject values that are not a team payload", () => {
      expect(isSharedTeam(null)).toBe(false)
      expect(isSharedTeam("team")).toBe(false)
      expect(isSharedTeam({ ...valid, kind: "calc" })).toBe(false)
      expect(isSharedTeam({ ...valid, version: 2 })).toBe(false)
      expect(isSharedTeam({ ...valid, useSpsMode: "true" })).toBe(false)
      expect(isSharedTeam({ ...valid, showdown: 42 })).toBe(false)
      expect(isSharedTeam({ ...valid, name: 42 })).toBe(false)
      expect(isSharedTeam({ ...valid, name: "x".repeat(61) })).toBe(false)
    })
  })

  describe("declaredTera", () => {
    it("should tell which sets of the text declare a tera type", () => {
      const text = "Incineroar @ Sitrus Berry\nTera Type: Grass\n- Fake Out\n\nAmoonguss @ Rocky Helmet\n- Spore\n\nPelipper @ Damp Rock\nTera Type: Water\n- Hurricane"

      expect(declaredTera(text)).toEqual([true, false, true])
    })
  })

  function floette(name: string, ability: string, baseFormAbility?: string): Pokemon {
    return new Pokemon(name, {
      ability: new Ability(ability),
      baseFormAbility,
      nature: "Timid",
      item: "Floettite",
      moveSet: new MoveSet(new Move("Light of Ruin"), new Move("Moonblast"), new Move("Dazzling Gleam"), new Move("Protect")),
      sps: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 }
    })
  }

  describe("Mega Evolution", () => {
    it("should share a Mega Evolved Pokémon in its base form with the ability it had before evolving", async () => {
      const team = await buildSharedTeam("Fairies", [floette("Floette-Mega", "Fairy Aura", "Symbiosis")], { useSpsMode: true, withTera: [false], includePoints: true })

      expect(team.showdown).toBe("Floette-Eternal @ Floettite\nAbility: Symbiosis\nLevel: 50\nEVs: 2 HP / 32 SpA / 32 Spe\nTimid Nature\n- Light of Ruin\n- Moonblast\n- Dazzling Gleam\n- Protect\n")
    })

    it("should use the default ability of the base form when the one before evolving is unknown", () => {
      const base = baseForm(floette("Floette-Mega", "Fairy Aura"))

      expect(base.name).toBe("Floette-Eternal")
      expect(base.ability.name).toBe("Flower Veil")
    })

    it("should keep a Pokémon that is not Mega Evolved", () => {
      const pokemon = incineroar()

      expect(baseForm(pokemon)).toBe(pokemon)
    })

    it("should Mega Evolve a base form holding its Mega Stone, with the ability of the Mega form", () => {
      const mega = megaForm(floette("Floette-Eternal", "Flower Veil"))!

      expect(mega.name).toBe("Floette-Mega")
      expect(mega.ability.name).toBe("Fairy Aura")
      expect(mega.moveSet.moves.map(m => m.name)).toEqual(["Light of Ruin", "Moonblast", "Dazzling Gleam", "Protect"])
    })

    it("should pick the Mega form of the lettered Mega Stone", () => {
      const charizard = new Pokemon("Charizard", { ability: new Ability("Blaze"), item: "Charizardite X" })

      expect(megaForm(charizard)!.name).toBe("Charizard-Mega-X")
    })

    it("should not Mega Evolve a Pokémon without a compatible Mega Stone", () => {
      expect(megaForm(incineroar())).toBeUndefined()
      expect(megaForm(new Pokemon("Incineroar", { item: "Floettite" }))).toBeUndefined()
    })
  })
})
