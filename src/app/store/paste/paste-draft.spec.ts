import { Ability, Move, MoveSet, Pokemon } from "@multicalc/model"
import { buildPasteDraft, isPasteDraft } from "@store/paste/paste-draft"

describe("paste draft", () => {
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

  describe("buildPasteDraft", () => {
    it("should carry the team id, the team name, the Showdown text and the unit", async () => {
      const draft = await buildPasteDraft("e3b1c2d4", "Sun Balance", [incineroar()], true, false)

      expect(draft).toEqual({
        teamId: "e3b1c2d4",
        source: "Sun Balance",
        name: "Sun Balance",
        showdown: "Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCareful Nature\n- Fake Out\n- Knock Off\n- Flare Blitz\n- Parting Shot\n",
        useSpsMode: true
      })
    })

    it("should keep a default team name and the Tera type when asked", async () => {
      const draft = await buildPasteDraft("9f8a7b6c", "Team 3", [incineroar()], false, true)

      expect(draft.source).toBe("Team 3")
      expect(draft.name).toBe("Team 3")
      expect(draft.useSpsMode).toBe(false)
      expect(draft.showdown).toContain("Tera Type: Grass\n")
      expect(draft.showdown).toContain("EVs: 252 HP / 12 Def / 252 SpD\n")
    })
  })

  describe("isPasteDraft", () => {
    const draft = { teamId: "9f8a7b6c", source: "Team 3", name: "", showdown: "Incineroar", useSpsMode: true }

    it("should accept a draft", () => {
      expect(isPasteDraft(draft)).toBe(true)
    })

    it("should reject values that are not a draft", () => {
      expect(isPasteDraft(undefined)).toBe(false)
      expect(isPasteDraft("draft")).toBe(false)
      expect(isPasteDraft({ ...draft, teamId: undefined })).toBe(false)
      expect(isPasteDraft({ ...draft, source: 1 })).toBe(false)
      expect(isPasteDraft({ ...draft, name: null })).toBe(false)
      expect(isPasteDraft({ ...draft, showdown: [] })).toBe(false)
      expect(isPasteDraft({ ...draft, useSpsMode: "true" })).toBe(false)
    })
  })
})
