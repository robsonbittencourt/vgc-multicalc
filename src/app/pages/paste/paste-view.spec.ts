import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { buildPasteCards, sharedTeamPokemon, unlockErrorMessage, unreadablePasteMessage } from "@pages/paste/paste-view"

describe("paste view", () => {
  function incineroar(item = "Sitrus Berry"): Pokemon {
    return new Pokemon("Incineroar", {
      ability: new Ability("Intimidate"),
      nature: "Careful",
      item,
      teraType: "Grass",
      moveSet: new MoveSet(new Move("Fake Out"), new Move("Knock Off"), new Move(""), new Move("Parting Shot")),
      sps: { hp: 32, atk: 0, def: 2, spa: 0, spd: 16, spe: 15 }
    })
  }

  describe("buildPasteCards", () => {
    it("should describe each Pokémon of the team with its spread in SP", () => {
      const [card] = buildPasteCards([incineroar()], true, [true])

      expect(card).toEqual({
        name: "Incineroar",
        item: "Sitrus Berry",
        itemSprite: "sitrus-berry",
        ability: "Intimidate",
        nature: "Careful",
        natureBoost: "SpD",
        natureDrop: "SpA",
        teraType: "Grass",
        type1: "Fire",
        type2: "Dark",
        moves: [
          { name: "Fake Out", type: "normal" },
          { name: "Knock Off", type: "dark" },
          { name: "Parting Shot", type: "dark" }
        ],
        spread: "32\u00a0HP\u00a0/ 2\u00a0Def\u00a0/ 16\u00a0SpD\u00a0/ 15\u00a0Spe"
      })
    })

    it("should leave the tera type out when the text does not declare it", () => {
      const [card] = buildPasteCards([incineroar()], true, [false])

      expect("teraType" in card).toBe(false)
    })

    it("should show the points in EV when the team was shared in EV", () => {
      const [card] = buildPasteCards([incineroar()], false, [false])

      expect(card.spread).toBe("252\u00a0HP\u00a0/ 12\u00a0Def\u00a0/ 124\u00a0SpD\u00a0/ 116\u00a0Spe")
    })

    it("should leave the type out of an unknown move", () => {
      const pokemon = new Pokemon("Incineroar", { moveSet: new MoveSet(new Move("Made Up Move"), new Move(""), new Move(""), new Move("")) })

      const [card] = buildPasteCards([pokemon], true, [false])

      expect(card.moves).toEqual([{ name: "Made Up Move", type: undefined }])
    })

    it("should leave the item sprite out for an unknown item", () => {
      const [card] = buildPasteCards([incineroar("Unknown Thing")], true, [false])

      expect(card.itemSprite).toBeUndefined()
    })

    it("should leave the nature effect out for a neutral nature", () => {
      const [card] = buildPasteCards([new Pokemon("Incineroar", { nature: "Hardy" })], true, [false])

      expect(card.natureBoost).toBeUndefined()
      expect(card.natureDrop).toBeUndefined()
    })

    it("should show the base form of a Mega Evolved Pokémon with its Mega form as an alternative", () => {
      const floetteMega = new Pokemon("Floette-Mega", { ability: new Ability("Fairy Aura"), item: "Floettite", nature: "Timid", sps: { hp: 2, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 } })

      const [card] = buildPasteCards([floetteMega], true, [false])

      expect(card.name).toBe("Floette-Eternal")
      expect(card.ability).toBe("Flower Veil")
      expect(card.mega!.name).toBe("Floette-Mega")
      expect(card.mega!.ability).toBe("Fairy Aura")
      expect(card.mega!.type1).toBe("Fairy")
      expect(card.spread).toBe("2\u00a0HP\u00a0/ 32\u00a0SpA\u00a0/ 32\u00a0Spe")
    })

    it("should have no Mega form without a Mega Stone", () => {
      const [card] = buildPasteCards([incineroar()], true, [false])

      expect(card.mega).toBeUndefined()
    })
  })

  describe("sharedTeamPokemon", () => {
    it("should rebuild the Pokémon of the team from the Showdown text in SP", async () => {
      const pokemon = await sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: true, showdown: "Incineroar @ Sitrus Berry\nEVs: 32 HP / 2 Def / 32 SpD\n- Fake Out\n\nAmoonguss @ Rocky Helmet\n- Spore\n- Rage Powder\n" })

      expect(pokemon.map(p => p.name)).toEqual(["Incineroar", "Amoonguss"])
      expect(pokemon[0].sps).toEqual({ hp: 32, atk: 0, def: 2, spa: 0, spd: 32, spe: 0 })
      expect(pokemon[1].moveSet.moves.map(m => m.name)).toEqual(["Spore", "Rage Powder", "", ""])
    })

    it("should convert EVs back to SPs", async () => {
      const pokemon = await sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: false, showdown: "Incineroar @ Sitrus Berry\nEVs: 252 HP / 12 Def / 252 SpD\n- Fake Out" })

      expect(pokemon[0].sps).toEqual({ hp: 32, atk: 0, def: 2, spa: 0, spd: 32, spe: 0 })
    })

    it("should reject a team with more than 6 Pokémon", async () => {
      const showdown = Array.from({ length: 7 }, () => "Pikachu @ Light Ball\n- Thunderbolt").join("\n\n")

      await expect(sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: true, showdown })).rejects.toThrow("A paste team has 1 to 6 Pokémon")
    })

    it("should reject a team without Pokémon", async () => {
      await expect(sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: true, showdown: "\n\n" })).rejects.toThrow("A paste team has 1 to 6 Pokémon")
    })
  })

  describe("unreadablePasteMessage", () => {
    it("should name the Pokémon that the calc does not know", async () => {
      const error = await sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: true, showdown: "Fakemon @ Leftovers\n- Tackle" }).catch(e => e)

      expect(unreadablePasteMessage(error)).toBe("This paste has Pokémon that the calc does not know. Unknown Pokémon: Fakemon.")
    })

    it("should fall back to a general message for any other failure", async () => {
      const error = await sharedTeamPokemon({ kind: "team", version: 1, useSpsMode: true, showdown: "\n\n" }).catch(e => e)

      expect(unreadablePasteMessage(error)).toBe("The calc could not read this paste.")
    })
  })

  describe("unlockErrorMessage", () => {
    it("should tell a wrong password", () => {
      expect(unlockErrorMessage(true)).toBe("Wrong password.")
    })

    it("should add the wait when a wrong password starts a lock", () => {
      expect(unlockErrorMessage(true, 60)).toBe("Wrong password. Too many attempts. Try again in 1 minute.")
    })

    it("should round the wait of a locked paste up to minutes", () => {
      expect(unlockErrorMessage(false, 181)).toBe("Too many attempts. Try again in 4 minutes.")
    })
  })
})
