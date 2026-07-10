import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"
import { Target } from "@multicalc/model/target"
import { DefensiveEvOptimizer } from "@multicalc/ev-optimizer/defensive-ev-optimizer"

describe("DefensiveEvOptimizer — edge and fallback paths", () => {
  let service: DefensiveEvOptimizer

  beforeEach(() => {
    service = new DefensiveEvOptimizer()
  })

  it("returns the defender's existing EVs when there are no targets", () => {
    const defender = new Pokemon("Flutter Mane", { evs: { hp: 100, def: 20 } })

    const result = service.optimize(defender, [], new Field())

    expect(result.evs).toEqual(defender.evs)
    expect(result.status).toEqual("success")
  })

  it("returns zeroed EVs when the defender already survives without investment", () => {
    const defender = new Pokemon("Blissey")
    const attacker = new Pokemon("Pichu", {
      nature: "Modest",
      moveSet: new MoveSet(new Move("Thunder Shock"), new Move(""), new Move(""), new Move("")),
      evs: { spa: 0 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field())

    expect(result.evs).toEqual({ hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 })
    expect(result.status).toEqual("not-needed")
  })

  it("returns no solution when the attack cannot be survived at any spread", () => {
    const defender = new Pokemon("Flutter Mane")
    const attacker = new Pokemon("Rayquaza", {
      nature: "Adamant",
      teraType: "Flying",
      teraTypeActive: true,
      moveSet: new MoveSet(new Move("Dragon Ascent"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

    const result = service.optimize(defender, [new Target(attacker)], new Field())

    expect(result.evs).toBeNull()
    expect(result.status).toEqual("no-solution")
  })

  it("optimizes a mix of a double-attacker target and single-attacker targets", () => {
    const defender = new Pokemon("Gholdengo", { nature: "Bold" })

    const a1 = new Pokemon("Urshifu-Rapid-Strike", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Surging Strikes"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })
    const a2 = new Pokemon("Flutter Mane", {
      nature: "Modest",
      moveSet: new MoveSet(new Move("Moonblast"), new Move(""), new Move(""), new Move("")),
      evs: { spa: 252 }
    })
    const single = new Pokemon("Iron Hands", {
      nature: "Adamant",
      moveSet: new MoveSet(new Move("Drain Punch"), new Move(""), new Move(""), new Move("")),
      evs: { atk: 252 }
    })

    const targets = [new Target(a1, a2), new Target(single)]

    const result = service.optimize(defender, targets, new Field())

    expect(result.status).toEqual("success")
  })
})
