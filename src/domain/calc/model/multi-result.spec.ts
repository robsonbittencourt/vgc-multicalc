import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("MultiResult", () => {
  const magikarp = () => new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
  const tackle = () => new Move("Tackle")

  const afterTurnOf = (defender: Pokemon) => calculateMulti(magikarp(), magikarp(), tackle(), tackle(), defender, new Field()).afterTurn()

  describe("badly poison across combined attackers", () => {
    const pikachu = () => new Pokemon("Pikachu")
    const quickAttack = () => new Move("Quick Attack")
    const badlyPoisonedBlissey = () => new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "tox", toxicCounter: 1 })

    it("counts the toxic residual once per turn, not once per attacker", () => {
      const single = calculateMulti(pikachu(), pikachu(), quickAttack(), new Move("Splash"), badlyPoisonedBlissey(), new Field())
      const combined = calculateMulti(pikachu(), pikachu(), quickAttack(), quickAttack(), badlyPoisonedBlissey(), new Field())

      expect(single.getHKO()).toEqual("guaranteed 5HKO after toxic damage")
      expect(combined.getHKO()).toEqual("guaranteed 4HKO after toxic damage")
    })

    it("advances the toxic counter per turn, not per damage row", () => {
      const combined = calculateMulti(pikachu(), pikachu(), quickAttack(), quickAttack(), badlyPoisonedBlissey(), new Field())

      expect(combined.survivesHits(3)).toBe(true)
      expect(combined.survivesHits(4)).toBe(false)
    })

    it("drains the HP over turns with the growing toxic residual", () => {
      const defender = new Pokemon("Blissey", { evs: { hp: 252, def: 252 }, status: "tox", toxicCounter: 1 })

      const afterTurn = calculateMulti(pikachu(), pikachu(), quickAttack(), quickAttack(), defender, new Field()).afterTurn()

      expect(afterTurn.afterTurnData.slice(0, 3)).toEqual([
        { turn: 1, residualDelta: -22, hp: 294 },
        { turn: 2, residualDelta: -44, hp: 204 },
        { turn: 3, residualDelta: -66, hp: 92 }
      ])
    })
  })

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

    it("stops on the turn the defender faints from toxic damage", () => {
      const defender = new Pokemon("Blissey", { status: "tox", toxicCounter: 1, evs: { hp: 0, def: 252 }, curHP: 20 })

      const afterTurn = afterTurnOf(defender)

      expect(afterTurn.afterTurnData).toEqual([{ turn: 1, residualDelta: -20, hp: -18 }])
    })

    it("leaves the defender alone while the toxic counter has not started", () => {
      const defender = new Pokemon("Blissey", { status: "tox", evs: { hp: 0, def: 252 }, curHP: 20 })

      const afterTurn = afterTurnOf(defender)

      expect(afterTurn.afterTurnData).toEqual([
        { turn: 1, residualDelta: 0, hp: 2 },
        { turn: 2, residualDelta: 0, hp: 0 }
      ])
    })
  })
})
