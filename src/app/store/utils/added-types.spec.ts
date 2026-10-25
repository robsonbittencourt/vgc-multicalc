import { Move, MoveSet, Pokemon } from "@multicalc/model"
import { appliedAddedType, multiCalcAddedTypeOffers, sameAddedTypeOffers, simpleCalcAddedTypeOffers } from "@store/utils/added-types"
import { pokemonToState } from "@store/utils/state-mapper"

function state(id: string, name: string, moves: string[] = [], options: { typeAddingMove?: string; addedTypeOn?: boolean } = {}) {
  const [move1, move2, move3, move4] = [...moves, "", "", "", ""].map(move => new Move(move))

  return pokemonToState(new Pokemon(name, { id, moveSet: new MoveSet(move1, move2, move3, move4), ...options }))
}

describe("Added types", () => {
  describe("Simple Calc", () => {
    it("should offer the Ghost type to the right Pokémon when the left one used Trick-or-Treat", () => {
      const left = state("left", "Gourgeist", ["Trick-or-Treat"], { typeAddingMove: "Trick-or-Treat" })
      const right = state("right", "Garchomp")

      const offers = simpleCalcAddedTypeOffers(left, right)

      expect([...offers]).toEqual([["right", { type: "Ghost", optional: false }]])
    })

    it("should offer the Grass type to the left Pokémon when the right one used Forest's Curse", () => {
      const left = state("left", "Garchomp")
      const right = state("right", "Trevenant", ["Forest's Curse"], { typeAddingMove: "Forest's Curse" })

      const offers = simpleCalcAddedTypeOffers(left, right)

      expect([...offers]).toEqual([["left", { type: "Grass", optional: false }]])
    })

    it("should offer nothing when the type adding move is not marked as used", () => {
      const left = state("left", "Gourgeist", ["Trick-or-Treat"])
      const right = state("right", "Garchomp")

      expect(simpleCalcAddedTypeOffers(left, right).size).toBe(0)
    })

    it("should offer nothing when the move marked as used is no longer in the moveset", () => {
      const left = state("left", "Gourgeist", ["Shadow Ball"], { typeAddingMove: "Trick-or-Treat" })
      const right = state("right", "Garchomp")

      expect(simpleCalcAddedTypeOffers(left, right).size).toBe(0)
    })

    it("should offer nothing when the move marked as used does not add a type", () => {
      const left = state("left", "Gourgeist", ["Shadow Ball"], { typeAddingMove: "Shadow Ball" })
      const right = state("right", "Garchomp")

      expect(simpleCalcAddedTypeOffers(left, right).size).toBe(0)
    })
  })

  describe("Multi Calc", () => {
    it("should offer the type automatically to the opponents and optionally to the teammates when a team member used the move", () => {
      const gourgeist = state("gourgeist", "Gourgeist", ["Trick-or-Treat"], { typeAddingMove: "Trick-or-Treat" })
      const teammate = state("teammate", "Incineroar")
      const opponent = state("opponent", "Garchomp")

      const offers = multiCalcAddedTypeOffers({ team: [gourgeist, teammate], opponents: [opponent] })

      expect(offers.get("opponent")).toEqual({ type: "Ghost", optional: false })
      expect(offers.get("teammate")).toEqual({ type: "Ghost", optional: true })
      expect(offers.has("gourgeist")).toBe(false)
    })

    it("should offer the type only to the team when an opponent used the move", () => {
      const teamMember = state("member", "Incineroar")
      const trevenant = state("trevenant", "Trevenant", ["Forest's Curse"], { typeAddingMove: "Forest's Curse" })
      const otherOpponent = state("other", "Garchomp")

      const offers = multiCalcAddedTypeOffers({ team: [teamMember], opponents: [trevenant, otherOpponent] })

      expect([...offers]).toEqual([["member", { type: "Grass", optional: false }]])
    })

    it("should keep the first offer when a Pokémon is reached by more than one source", () => {
      const gourgeist = state("gourgeist", "Gourgeist", ["Trick-or-Treat"], { typeAddingMove: "Trick-or-Treat" })
      const trevenant = state("trevenant", "Trevenant", ["Forest's Curse"], { typeAddingMove: "Forest's Curse" })
      const opponent = state("opponent", "Garchomp")

      const offers = multiCalcAddedTypeOffers({ team: [gourgeist, trevenant], opponents: [opponent] })

      expect(offers.get("opponent")).toEqual({ type: "Ghost", optional: false })
    })
  })

  describe("Applied added type", () => {
    it("should apply an automatic offer", () => {
      expect(appliedAddedType(state("id", "Garchomp"), { type: "Ghost", optional: false })).toBe("Ghost")
    })

    it("should not apply an optional offer that is turned off", () => {
      expect(appliedAddedType(state("id", "Garchomp"), { type: "Ghost", optional: true })).toBeUndefined()
    })

    it("should apply an optional offer that is turned on", () => {
      expect(appliedAddedType(state("id", "Garchomp", [], { addedTypeOn: true }), { type: "Grass", optional: true })).toBe("Grass")
    })

    it("should apply nothing without an offer", () => {
      expect(appliedAddedType(state("id", "Garchomp", [], { addedTypeOn: true }), undefined)).toBeUndefined()
    })
  })

  describe("Same offers", () => {
    it("should be the same when both have the same entries", () => {
      expect(sameAddedTypeOffers(new Map([["id", { type: "Ghost", optional: true }]]), new Map([["id", { type: "Ghost", optional: true }]]))).toBe(true)
    })

    it("should differ when the sizes differ", () => {
      expect(sameAddedTypeOffers(new Map([["id", { type: "Ghost", optional: true }]]), new Map())).toBe(false)
    })

    it("should differ when a Pokémon is missing", () => {
      expect(sameAddedTypeOffers(new Map([["id", { type: "Ghost", optional: true }]]), new Map([["other", { type: "Ghost", optional: true }]]))).toBe(false)
    })

    it("should differ when the type differs", () => {
      expect(sameAddedTypeOffers(new Map([["id", { type: "Ghost", optional: true }]]), new Map([["id", { type: "Grass", optional: true }]]))).toBe(false)
    })

    it("should differ when the optional flag differs", () => {
      expect(sameAddedTypeOffers(new Map([["id", { type: "Ghost", optional: true }]]), new Map([["id", { type: "Ghost", optional: false }]]))).toBe(false)
    })
  })
})
