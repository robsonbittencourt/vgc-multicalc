import { CachedDamageCalc } from "./cached-damage-calc"
import { SpreadSearch } from "./spread-search"
import { SurvivalContext, Threat } from "./threat"
import { SurvivalThreshold } from "./ev-optimizer-types"
import { SurvivalMemo } from "./survival-memo"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

describe("SpreadSearch", () => {
  const context = (threshold: SurvivalThreshold = 2): SurvivalContext => ({ field: new Field(), threshold, rollIndex: 15, rightIsDefender: true })

  const attacker = (name: string, moveName: string) => new Pokemon(name, { moveSet: new MoveSet(new Move(moveName), new Move(""), new Move(""), new Move("")), evs: { hp: 0, atk: 252, def: 0, spa: 252, spd: 0, spe: 0 } } as never)

  const threatOf = (name: string, moveName: string) => new Threat(new CachedDamageCalc(), attacker(name, moveName), null, new SurvivalMemo())

  it("should return no spread when there is no threat to protect against", () => {
    const search = new SpreadSearch(new Pokemon("Incineroar"), context())

    expect(search.minimalSpread([])).toBeNull()
  })

  it("should not invest any EVs when the defender already survives the threat", () => {
    const search = new SpreadSearch(new Pokemon("Incineroar"), context())

    const spread = search.minimalSpread([threatOf("Flutter Mane", "Moonblast")])

    expect(spread).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
  })

  it("should find the minimal spread that survives a threat needing real investment", () => {
    const search = new SpreadSearch(new Pokemon("Incineroar"), context(3))

    const spread = search.minimalSpread([threatOf("Miraidon", "Electro Drift")])

    expect(spread).toEqual({ hp: 52, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 })
  })

  it("should return no spread when no amount of EVs survives the threat", () => {
    const search = new SpreadSearch(new Pokemon("Amoonguss"), context())

    expect(search.minimalSpread([threatOf("Chi-Yu", "Overheat")])).toBeNull()
  })

  it("should reject a coupled candidate that the single threats alongside it do not survive", () => {
    const calc = new CachedDamageCalc()
    const memo = new SurvivalMemo()
    const pair = new Threat(calc, attacker("Miraidon", "Electro Drift"), attacker("Rillaboom", "Wood Hammer"), memo)
    const single = new Threat(calc, attacker("Flutter Mane", "Moonblast"), null, memo)
    const search = new SpreadSearch(new Pokemon("Rillaboom", { item: "Sitrus Berry" } as never), context(3))

    const spread = search.minimalSpread([pair, single])

    expect(spread).toEqual({ hp: 228, atk: 0, def: 0, spa: 0, spd: 60, spe: 0 })
  })

  it("should reuse the memoized result for the same set of threats", () => {
    const search = new SpreadSearch(new Pokemon("Incineroar"), context(3))
    const threats = [threatOf("Miraidon", "Electro Drift")]

    const first = search.minimalSpread(threats)
    const second = search.minimalSpread(threats)

    expect(second).toBe(first)
  })
})
