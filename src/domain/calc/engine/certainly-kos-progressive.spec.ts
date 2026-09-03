import { calculate, calculateMulti, Field, Move, Pokemon } from "@calc"

describe("certainlyKOs — Stamina makes later turns weaker than the first", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const rillaboom = () => new Pokemon("Rillaboom", { nature: "Adamant", evs: { atk: 252 } })
  const mudsdale = (ability: string, def = 0) => new Pokemon("Mudsdale", { evs: { hp: 252, def: 252 }, nature: "Impish", ability, boosts: { def } } as never)

  const combined = () => calculateMulti(rillaboom(), rillaboom(), new Move("Body Slam"), new Move("Body Slam"), mudsdale("Stamina"), field())

  it("cannot reach the target's HP in three turns even on the luckiest rolls", () => {
    const ladder = [0, 1, 2, 3, 4, 5].map(def => calculate(rillaboom(), mudsdale("Own Tempo", def), new Move("Body Slam"), field()).range()[1])

    expect(ladder).toEqual([45, 31, 23, 19, 16, 14])

    const bestCaseThreeTurns = ladder.reduce((total, damage) => total + damage, 0)

    expect(bestCaseThreeTurns).toEqual(148)
    expect(mudsdale("Stamina").currentHp()).toEqual(207)
    expect(bestCaseThreeTurns).toBeLessThan(mudsdale("Stamina").currentHp())
  })

  it("only drops the target at turn 6, never at turn 3", () => {
    expect(
      combined()
        .afterTurn(15)
        .afterTurnData.map(turn => turn.hp)
    ).toEqual([131, 89, 59, 35, 11, 0])
  })

  it("does not claim a certain KO that the damage cannot deliver", () => {
    const result = combined()

    expect(result.survivesHits(3)).toBe(true)
    expect(result.certainlyKOs(3)).toBe(false)
  })
})

describe("certainlyKOs — a target defensive drop makes later turns stronger than the first", () => {
  const field = () => new Field({ gameType: "Doubles" })
  const sylveon = () => new Pokemon("Sylveon", { nature: "Modest", evs: { spa: 252 } })
  const dondozo = (spd = 0) => new Pokemon("Dondozo", { evs: { hp: 252, spd: 252 }, nature: "Careful", ability: "Unaware", boosts: { spd } })

  const combined = () => calculateMulti(sylveon(), sylveon(), new Move("Acid Spray"), new Move("Acid Spray"), dondozo(), field())

  it("passes the target's HP in three turns even on the unluckiest rolls", () => {
    const ladder = [0, -2, -4, -6, -6, -6].map(spd => calculate(sylveon(), dondozo(spd), new Move("Acid Spray"), field()).range()[0])

    expect(ladder).toEqual([22, 42, 64, 84, 84, 84])

    const worstCaseThreeTurns = ladder.reduce((total, damage) => total + damage, 0)

    expect(worstCaseThreeTurns).toEqual(380)
    expect(dondozo().currentHp()).toEqual(257)
    expect(worstCaseThreeTurns).toBeGreaterThan(dondozo().currentHp())
  })

  it("recognises the certain KO that the growing damage delivers", () => {
    const result = combined()

    expect(result.survivesHits(3)).toBe(false)
    expect(result.certainlyKOs(3)).toBe(true)
  })
})
