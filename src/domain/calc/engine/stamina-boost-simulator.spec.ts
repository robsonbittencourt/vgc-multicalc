import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("StaminaBoostSimulator — resist berry consumption across multiple turns", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("should consume the defender's resist berry on the first hit only while Stamina keeps boosting Defense", () => {
    const a1 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const a2 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 252 }, nature: "Bold", ability: "Stamina", item: "Occa Berry" })

    const result = calculateMulti(a1, a2, new Move("Ember"), new Move("Ember"), defender, field())

    expect(result.description()).toEqual("0 SpA Magikarp Ember AND 0 SpA Magikarp Ember vs. 252 HP / 0 SpD Occa Berry Ferrothorn (Stamina considered): 30-36 (16.5 - 19.8%) -- guaranteed 5HKO")
    expect(result.getHKO()).toBe("guaranteed 5HKO")

    const afterTurn = result.afterTurn().afterTurnData

    expect(afterTurn.map(t => t.hp)).toEqual([145, 97, 49, 1, 0])
  })
})

describe("StaminaBoostSimulator — Chilan Berry against a neutral Normal move", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const snorlax = () => new Pokemon("Snorlax", { evs: { atk: 252 }, nature: "Adamant" })
  const mudsdale = (item?: "Chilan Berry") => new Pokemon("Mudsdale", { ability: "Stamina", item, evs: { hp: 252, def: 252 }, nature: "Impish" })

  it("consumes the Chilan Berry even though the Normal move is not super effective", () => {
    const result = calculateMulti(snorlax(), snorlax(), new Move("Body Slam"), new Move("Body Slam"), mudsdale("Chilan Berry"), field())

    expect(result.description()).toEqual("252+ Atk Snorlax Body Slam AND 252+ Atk Snorlax Body Slam vs. 252 HP / 252+ Def Chilan Berry Mudsdale (Stamina considered): 76-91 (36.7 - 43.9%) -- 83.1% chance to 5HKO")
    expect(result.afterTurn().afterTurnData.map(t => t.hp)).toEqual([135, 79, 38, 6, 0])
  })

  it("takes the full damage without the berry", () => {
    const result = calculateMulti(snorlax(), snorlax(), new Move("Body Slam"), new Move("Body Slam"), mudsdale(), field())

    expect(result.description()).toEqual("252+ Atk Snorlax Body Slam AND 252+ Atk Snorlax Body Slam vs. 252 HP / 252+ Def Mudsdale (Stamina considered): 102-122 (49.2 - 58.9%) -- 77.5% chance to 4HKO")
    expect(result.afterTurn().afterTurnData.map(t => t.hp)).toEqual([104, 48, 7, 0])
  })
})
