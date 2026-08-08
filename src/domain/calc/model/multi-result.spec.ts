import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("MultiResult", () => {
  const magikarp = () => new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
  const tackle = () => new Move("Tackle")

  const afterTurnOf = (defender: Pokemon) => calculateMulti(magikarp(), magikarp(), tackle(), tackle(), defender, new Field()).afterTurn()

  describe("afterTurn", () => {
    it("caps the recovered HP at the defender's maximum", () => {
      const defender = new Pokemon("Blissey", { item: "Leftovers", evs: { hp: 252, def: 252 } })

      const afterTurn = afterTurnOf(defender)

      expect(afterTurn.afterTurnData.slice(0, 3)).toEqual([
        { turn: 1, residualDelta: 22, hp: 362 },
        { turn: 2, residualDelta: 22, hp: 362 },
        { turn: 3, residualDelta: 22, hp: 362 }
      ])
    })

    it("stops on the turn the defender faints from the burn instead of the attacks", () => {
      const defender = new Pokemon("Blissey", { status: "brn", evs: { hp: 0, def: 252 }, curHP: 30 })

      const afterTurn = afterTurnOf(defender)

      expect(afterTurn.afterTurnData).toEqual([{ turn: 1, residualDelta: -20, hp: -8 }])
    })

    it("stops on the turn the defender faints from poison damage", () => {
      const defender = new Pokemon("Blissey", { status: "tox", evs: { hp: 0, def: 252 }, curHP: 20 })

      const afterTurn = afterTurnOf(defender)

      expect(afterTurn.afterTurnData).toEqual([
        { turn: 1, residualDelta: 0, hp: 2 },
        { turn: 2, residualDelta: 0, hp: 0 }
      ])
    })
  })
})
