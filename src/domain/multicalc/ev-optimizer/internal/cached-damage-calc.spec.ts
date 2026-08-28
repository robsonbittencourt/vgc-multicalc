import { CachedDamageCalc } from "./cached-damage-calc"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

describe("CachedDamageCalc", () => {
  const kingambit = () => new Pokemon("Kingambit", { nature: "Adamant", evs: { atk: 252 }, moveSet: new MoveSet(new Move("Assurance"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
  const flutterMane = () => new Pokemon("Flutter Mane", { nature: "Timid", evs: { spa: 252, spe: 252 }, moveSet: new MoveSet(new Move("Moonblast"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })

  it("should reuse the cached ally damage answer across different Assurance users with the same faster ally", () => {
    const calc = new CachedDamageCalc()
    const ally = flutterMane()
    const target = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const field = new Field()

    const first = calc.calcDamageValueForTwoAttackers(ally, kingambit(), target, field, true)
    const second = calc.calcDamageValueForTwoAttackers(ally, kingambit(), target, field, true)

    expect(first.description()).toContain("Assurance (120 BP)")
    expect(second.description()).toContain("Assurance (120 BP)")
  })

  it("should recompute the ally damage answer after the cache is cleared", () => {
    const calc = new CachedDamageCalc()
    const attacker = flutterMane()
    const secondAttacker = kingambit()
    const target = new Pokemon("Amoonguss", { evs: { hp: 252, def: 4 } })
    const field = new Field()

    const first = calc.calcDamageValueForTwoAttackers(attacker, secondAttacker, target, field, true)

    calc.clear()

    const afterClear = calc.calcDamageValueForTwoAttackers(attacker, secondAttacker, target, field, true)

    expect(afterClear.description()).toEqual(first.description())
  })
})
