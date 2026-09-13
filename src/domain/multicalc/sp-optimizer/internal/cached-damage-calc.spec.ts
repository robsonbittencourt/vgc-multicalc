import { CachedDamageCalc } from "./cached-damage-calc"
import { Ability } from "@multicalc/model/ability"
import { Field } from "@multicalc/model/field"
import { Move } from "@multicalc/model/move"
import { MoveSet } from "@multicalc/model/moveset"
import { Pokemon } from "@multicalc/model/pokemon"

describe("CachedDamageCalc", () => {
  const kingambit = () => new Pokemon("Kingambit", { nature: "Adamant", sps: { atk: 32 }, moveSet: new MoveSet(new Move("Assurance"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
  const flutterMane = () => new Pokemon("Flutter Mane", { nature: "Timid", sps: { spa: 32, spe: 32 }, moveSet: new MoveSet(new Move("Moonblast"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })

  it("should reuse the cached ally damage answer across different Assurance users with the same faster ally", () => {
    const calc = new CachedDamageCalc()
    const ally = flutterMane()
    const target = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
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
    const target = new Pokemon("Amoonguss", { sps: { hp: 32, def: 1 } })
    const field = new Field()

    const first = calc.calcDamageValueForTwoAttackers(attacker, secondAttacker, target, field, true)

    calc.clear()

    const afterClear = calc.calcDamageValueForTwoAttackers(attacker, secondAttacker, target, field, true)

    expect(afterClear.description()).toEqual(first.description())
  })

  it("should keep the follow-up hits without Multiscale when another HP reuses the cached damage", () => {
    const calc = new CachedDamageCalc()
    const garchomp = new Pokemon("Garchomp", { nature: "Modest", sps: { spa: 32 }, moveSet: new MoveSet(new Move("Ice Beam"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const dragonite = (hp: number) => new Pokemon("Dragonite", { nature: "Bold", ability: new Ability("Multiscale"), sps: { hp, spd: 3 } })
    const field = new Field()

    calc.calculateResult(garchomp, dragonite(0), garchomp.move, field, true)
    const reused = calc.calculateResult(garchomp, dragonite(29), garchomp.move, field, true)

    expect(reused.koChance().text).toEqual("guaranteed 2HKO")
    expect(reused.koChanceWithin(2)).toBe(1)
  })

  it("should not reuse the second hit of a pair computed against another HP", () => {
    const calc = new CachedDamageCalc()
    const kartana = new Pokemon("Kartana", { nature: "Adamant", item: "Choice Band", sps: { atk: 32 }, moveSet: new MoveSet(new Move("Leaf Blade"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const miraidon = new Pokemon("Miraidon", { nature: "Modest", item: "Choice Specs", sps: { spa: 32 }, moveSet: new MoveSet(new Move("Draco Meteor"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const dragonite = (hp: number) => new Pokemon("Dragonite", { nature: "Bold", ability: new Ability("Multiscale"), sps: { hp, spd: 32 } })
    const field = new Field()

    calc.calcDamageValueForTwoAttackers(kartana, miraidon, dragonite(0), field, true)
    const reused = calc.calcDamageValueForTwoAttackers(kartana, miraidon, dragonite(32), field, true)

    expect(reused.getHKO()).toEqual("70.3% chance to OHKO")
    expect(reused.koChanceWithin(1)).toBe(0.703125)
  })

  it("should not reuse a damage that halves the current HP of a target with another HP", () => {
    const calc = new CachedDamageCalc()
    const rattata = new Pokemon("Rattata", { nature: "Adamant", sps: { atk: 32 }, moveSet: new MoveSet(new Move("Super Fang"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const snorlax = (hp: number) => new Pokemon("Snorlax", { nature: "Careful", sps: { hp } })
    const field = new Field()

    calc.calculateResult(rattata, snorlax(0), rattata.move, field, true)
    const reused = calc.calculateResult(rattata, snorlax(32), rattata.move, field, true)

    expect(reused.damage).toEqual(Array(16).fill(133))
  })

  it("should not reuse a damage that closes the HP gap to a target with another HP", () => {
    const calc = new CachedDamageCalc()
    const rattata = new Pokemon("Rattata", { nature: "Adamant", sps: { atk: 32 }, moveSet: new MoveSet(new Move("Endeavor"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const snorlax = (hp: number) => new Pokemon("Snorlax", { nature: "Careful", sps: { hp } })
    const field = new Field()

    calc.calculateResult(rattata, snorlax(0), rattata.move, field, true)
    const reused = calc.calculateResult(rattata, snorlax(32), rattata.move, field, true)

    expect(reused.damage).toEqual(Array(16).fill(162))
    expect(reused.koChance().text).toEqual("guaranteed 2HKO")
  })

  it("should not reuse the second hit of a pair whose base power follows the remaining HP", () => {
    const calc = new CachedDamageCalc()
    const chiYu = new Pokemon("Chi-Yu", { nature: "Modest", sps: { spa: 32 }, moveSet: new MoveSet(new Move("Overheat"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const regigigas = new Pokemon("Regigigas", { nature: "Adamant", sps: { atk: 32 }, moveSet: new MoveSet(new Move("Crush Grip"), new Move("Protect"), new Move("Protect"), new Move("Protect")) })
    const snorlax = (hp: number) => new Pokemon("Snorlax", { nature: "Careful", sps: { hp } })
    const field = new Field()

    calc.calcDamageValueForTwoAttackers(chiYu, regigigas, snorlax(0), field, true)
    const reused = calc.calcDamageValueForTwoAttackers(chiYu, regigigas, snorlax(32), field, true)

    expect((reused.results[1].damage as number[]).slice(0, 4)).toEqual([70, 72, 72, 73])
  })
})
