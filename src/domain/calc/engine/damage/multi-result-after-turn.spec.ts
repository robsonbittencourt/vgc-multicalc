import { calculateMulti, Field, Move, Pokemon } from "@calc"

describe("MultiResult.afterTurn", () => {
  const field = () => new Field({ gameType: "Doubles" })

  it("tracks HP across turns for a non-KO combined hit with no end-of-turn effects", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 }, nature: "Calm" })

    const result = calculateMulti([a1, a2], defender, [new Move("Hyper Voice"), new Move("Hyper Voice")], field())

    const afterTurn = result.afterTurn()

    expect(afterTurn.afterTurnData.length).toBeGreaterThan(0)
    expect(afterTurn.afterTurnData[0].hp).toBeLessThan(defender.maxHp())
  })

  it("consumes a generic recovery berry across turns and caps at max HP", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 }, nature: "Calm", item: "Sitrus Berry" })

    const result = calculateMulti([a1, a2], defender, [new Move("Hyper Voice"), new Move("Hyper Voice")], field())

    const afterTurn = result.afterTurn()

    expect(afterTurn.afterTurnData.some(t => t.residualDelta > 0)).toBe(true)
  })

  it("consumes a resist berry on the first hit and applies unreduced damage from the second turn onward", () => {
    const a1 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const a2 = new Pokemon("Magikarp", { evs: { atk: 0 }, nature: "Bold" })
    const defender = new Pokemon("Ferrothorn", { evs: { hp: 252, def: 252 }, nature: "Bold", item: "Occa Berry" })

    const result = calculateMulti([a1, a2], defender, [new Move("Ember"), new Move("Ember")], field())

    const afterTurn = result.afterTurn()

    expect(afterTurn.afterTurnData.length).toBeGreaterThan(1)
  })

  it("reaches a KO turn and stops with hp at 0", () => {
    const a1 = new Pokemon("Rillaboom", { evs: { atk: 252 }, nature: "Adamant" })
    const a2 = new Pokemon("Incineroar", { evs: { atk: 252 }, nature: "Adamant" })
    const defender = new Pokemon("Dondozo", { evs: { hp: 252, def: 4 } })

    const result = calculateMulti([a1, a2], defender, [new Move("Wood Hammer"), new Move("Flare Blitz")], field())

    const afterTurn = result.afterTurn()

    const lastTurn = afterTurn.afterTurnData[afterTurn.afterTurnData.length - 1]
    expect(lastTurn.hp).toBe(0)
  })

  it("caps end-of-turn recovery at the defender's max HP instead of overflowing", () => {
    const a1 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const a2 = new Pokemon("Sylveon", { evs: { spa: 4 }, nature: "Modest" })
    const defender = new Pokemon("Blissey", { evs: { hp: 252, spd: 252 }, nature: "Calm", curHP: 700, item: "Leftovers" })

    const result = calculateMulti([a1, a2], defender, [new Move("Hyper Voice"), new Move("Hyper Voice")], field())

    const afterTurn = result.afterTurn()

    expect(afterTurn.afterTurnData[0].hp).toBeLessThanOrEqual(defender.maxHp())
  })

  it("a Stamina defender uses the stamina simulator's per-turn damage progression", () => {
    const a1 = new Pokemon("Cinccino", { evs: { atk: 100 }, nature: "Jolly" })
    const a2 = new Pokemon("Rillaboom", { evs: { atk: 100 }, nature: "Adamant" })
    const defender = new Pokemon("Mudsdale", { evs: { hp: 252, def: 4 }, ability: "Stamina" })

    const result = calculateMulti([a1, a2], defender, [new Move("Tail Slap"), new Move("Wood Hammer")], field())

    const afterTurn = result.afterTurn()

    expect(afterTurn.afterTurnData.length).toBeGreaterThan(0)
  })
})
