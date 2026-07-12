import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("StaminaBoostSimulator — resist berry consumption across multiple turns", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("should consume the defender's resist berry across turns while Stamina keeps boosting Defense", () => {
    const a1 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const a2 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 252 }, nature: "Bold", ability: "Stamina", item: "Occa Berry" })

    const result = calculateMulti([a1, a2], defender, [new Move("Ember"), new Move("Ember")], field())

    expect(result.description()).toEqual("0 SpA Magikarp Ember AND 0 SpA Magikarp Ember vs. 252 HP / 0 SpD Occa Berry Ferrothorn (Stamina considered): 20-24 (11 - 13.2%) -- guaranteed 5HKO")
    expect(result.getHKO()).toBe("guaranteed 5HKO")

    const afterTurn = result.afterTurn().afterTurnData

    expect(afterTurn.map(t => t.hp)).toEqual([145, 97, 49, 1, 0])
  })
})
